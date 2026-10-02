<template>
  <div class="space-y-6">
    <p v-if="loading" class="text-sm animate-pulse">Loading...</p>
    <p v-else-if="loadError" class="studio-error">{{ loadError }}</p>

    <template v-else-if="state">
      <div v-if="!state.configured" class="studio-card border-[#B5502F]/50 dark:border-[#E8C976]/50">
        <p class="text-sm font-semibold mb-2">AI is not connected yet</p>
        <p class="text-sm text-[#524A45] dark:text-[#9E9E9E] mb-2">Set these Worker secrets (from the <code>backend</code> folder), then reload this page:</p>
        <pre class="text-xs font-mono bg-[#141414] text-[#F5F0E8] p-3 rounded-lg overflow-x-auto">npx wrangler secret put AI_BASE_URL   # e.g. https://your-gemma-host/v1
npx wrangler secret put AI_MODEL      # e.g. gemma4
npx wrangler secret put AI_API_KEY</pre>
      </div>

      <!-- Schedule -->
      <form class="studio-card space-y-5" @submit.prevent="saveSettings">
        <div class="flex items-center justify-between gap-3">
          <h3 class="font-serif text-lg">Schedule</h3>
          <label class="flex items-center gap-2 text-sm cursor-pointer">
            <input v-model="form.enabled" type="checkbox" class="w-4 h-4 accent-[#B5502F]" />
            Enabled
          </label>
        </div>

        <div class="grid gap-5 sm:grid-cols-3">
          <div>
            <label for="ai-frequency" class="studio-label">Frequency</label>
            <select id="ai-frequency" v-model="form.frequency" class="studio-input">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div v-if="form.frequency === 'weekly'">
            <label for="ai-weekday" class="studio-label">Day</label>
            <select id="ai-weekday" v-model.number="form.weekdayMyt" class="studio-input">
              <option v-for="(day, i) in weekdays" :key="day" :value="i">{{ day }}</option>
            </select>
          </div>
          <div>
            <label for="ai-hour" class="studio-label">Time (Malaysia)</label>
            <select id="ai-hour" v-model.number="form.hourMyt" class="studio-input">
              <option v-for="h in 24" :key="h" :value="h - 1">{{ String(h - 1).padStart(2, '0') }}:00</option>
            </select>
          </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label for="ai-categories" class="studio-label">Categories</label>
            <input id="ai-categories" v-model="form.categoriesText" class="studio-input" placeholder="AI, Networking, Gadgets" />
            <p class="studio-hint">Comma separated. Used when the topic queue is empty.</p>
          </div>
          <div>
            <label for="ai-words" class="studio-label">Length (words)</label>
            <input id="ai-words" v-model.number="form.word_count" type="number" min="300" max="2500" step="100" class="studio-input" />
          </div>
          <div class="sm:col-span-2">
            <label for="ai-tone" class="studio-label">Tone</label>
            <input id="ai-tone" v-model="form.tone" class="studio-input" />
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <button type="submit" class="studio-btn" :disabled="settingsStatus.busy.value">Save schedule</button>
          <span class="text-xs font-mono text-[#524A45] dark:text-[#9E9E9E]">
            Next run: {{ state.settings.enabled && state.settings.next_run_at ? toMytLabel(state.settings.next_run_at) : 'off' }}
          </span>
          <span v-if="settingsStatus.message.value" class="studio-ok">{{ settingsStatus.message.value }}</span>
          <span v-if="settingsStatus.error.value" class="studio-error">{{ settingsStatus.error.value }}</span>
        </div>
        <p class="studio-hint">Generated articles are always saved as drafts. Review them in the Blog tab before publishing.</p>
      </form>

      <!-- Generate now -->
      <div class="studio-card flex flex-wrap items-center gap-3">
        <button class="studio-btn" :disabled="runStatus.busy.value || !state.configured" @click="runNow">
          {{ runStatus.busy.value ? 'Generating (can take a few minutes)...' : 'Generate a draft now' }}
        </button>
        <span v-if="runStatus.message.value" class="studio-ok">{{ runStatus.message.value }}</span>
        <span v-if="runStatus.error.value" class="studio-error">{{ runStatus.error.value }}</span>
      </div>

      <!-- Topic queue -->
      <div class="studio-card space-y-4">
        <h3 class="font-serif text-lg">Topic queue</h3>
        <form class="flex flex-wrap gap-2" @submit.prevent="addTopic">
          <label for="topic-text" class="sr-only">Topic</label>
          <input id="topic-text" v-model="newTopic" placeholder="e.g. How Starlink works for field robots" class="studio-input flex-1 min-w-[14rem]" />
          <label for="topic-category" class="sr-only">Category</label>
          <input id="topic-category" v-model="newTopicCategory" placeholder="Category" class="studio-input w-36" />
          <button type="submit" class="studio-btn" :disabled="!newTopic.trim()">Add</button>
        </form>
        <p v-if="topicError" class="studio-error">{{ topicError }}</p>
        <ul class="divide-y divide-[#E6E0D4] dark:divide-[#2A2A2A]">
          <li v-for="t in state.topics" :key="t.id" class="py-2 flex items-center justify-between gap-3 text-sm">
            <span :class="t.used ? 'line-through text-[#524A45] dark:text-[#9E9E9E]' : ''">
              {{ t.topic }} <span v-if="t.category" class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976]">· {{ t.category }}</span>
            </span>
            <button class="studio-btn-danger" @click="removeTopic(t.id)">Remove</button>
          </li>
          <li v-if="state.topics.length === 0" class="py-2 text-sm text-[#524A45] dark:text-[#9E9E9E]">Empty — the AI will pick topics from your categories.</li>
        </ul>
      </div>

      <!-- Run log -->
      <div class="studio-card space-y-3">
        <h3 class="font-serif text-lg">Recent runs</h3>
        <ul class="text-sm space-y-2">
          <li v-for="r in state.runs" :key="r.id" class="flex flex-wrap gap-2">
            <span class="font-mono text-xs text-[#524A45] dark:text-[#9E9E9E]">{{ toMytLabel(r.created_at) }} · {{ r.trigger_type }}</span>
            <span :class="r.status === 'success' ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
              {{ r.status === 'success' ? `✔ ${r.post_title || 'draft created'}` : `✖ ${r.error}` }}
            </span>
          </li>
          <li v-if="state.runs.length === 0" class="text-[#524A45] dark:text-[#9E9E9E]">No runs yet.</li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { studioApi, type AiState } from '@/api/studio';
import { useSaveStatus } from './useSaveStatus';

const MYT_OFFSET = 8;
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const state = ref<AiState | null>(null);
const loading = ref(true);
const loadError = ref('');
const newTopic = ref('');
const newTopicCategory = ref('');
const topicError = ref('');
const settingsStatus = useSaveStatus();
const runStatus = useSaveStatus();

const form = reactive({
  enabled: false,
  frequency: 'weekly' as 'daily' | 'weekly',
  hourMyt: 9,
  weekdayMyt: 1,
  categoriesText: '',
  tone: '',
  word_count: 900,
});

// The backend schedules in UTC; the form works in Malaysia time
const fromUtc = (hourUtc: number, weekdayUtc: number) => {
  const hour = hourUtc + MYT_OFFSET;
  return { hour: hour % 24, weekday: hour >= 24 ? (weekdayUtc + 1) % 7 : weekdayUtc };
};
const toUtc = (hourMyt: number, weekdayMyt: number) => {
  const hour = hourMyt - MYT_OFFSET;
  return { hour: (hour + 24) % 24, weekday: hour < 0 ? (weekdayMyt + 6) % 7 : weekdayMyt };
};

const toMytLabel = (sqlUtc: string) =>
  new Date(sqlUtc.replace(' ', 'T') + 'Z').toLocaleString('en-MY', {
    timeZone: 'Asia/Kuala_Lumpur', weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  });

const load = async () => {
  loadError.value = '';
  try {
    const res = await studioApi.getAi();
    state.value = res;
    const local = fromUtc(res.settings.run_hour, res.settings.run_weekday);
    Object.assign(form, {
      enabled: Boolean(res.settings.enabled),
      frequency: res.settings.frequency,
      hourMyt: local.hour,
      weekdayMyt: local.weekday,
      categoriesText: res.settings.categories.join(', '),
      tone: res.settings.tone,
      word_count: res.settings.word_count,
    });
  } catch (e) {
    loadError.value = e instanceof Error ? e.message : 'Failed to load AI settings.';
  } finally {
    loading.value = false;
  }
};

const saveSettings = async () => {
  const utc = toUtc(form.hourMyt, form.weekdayMyt);
  const ok = await settingsStatus.run(() => studioApi.saveAiSettings({
    enabled: form.enabled,
    frequency: form.frequency,
    run_hour: utc.hour,
    run_weekday: utc.weekday,
    categories: form.categoriesText.split(',').map((c) => c.trim()).filter(Boolean),
    tone: form.tone,
    word_count: form.word_count,
    next_run_at: null,
  }), 'Schedule saved.');
  if (ok) await load();
};

const runNow = async () => {
  await runStatus.run(() => studioApi.runAiNow(), 'Draft created — open the Blog tab to review it.');
  // Refresh either way so the run log shows the success or the error
  await load();
};

const addTopic = async () => {
  topicError.value = '';
  try {
    await studioApi.addTopic(newTopic.value.trim(), newTopicCategory.value.trim() || undefined);
    newTopic.value = '';
    await load();
  } catch (e) {
    topicError.value = e instanceof Error ? e.message : 'Failed to add topic.';
  }
};

const removeTopic = async (id: string) => {
  try {
    await studioApi.deleteTopic(id);
    await load();
  } catch (e) {
    topicError.value = e instanceof Error ? e.message : 'Failed to remove topic.';
  }
};

onMounted(load);
</script>
