<template>
  <div class="grid gap-6 lg:grid-cols-2">
    <form class="studio-card space-y-5" @submit.prevent="save">
      <label class="flex items-center gap-2 text-sm cursor-pointer">
        <input v-model="form.enabled" type="checkbox" class="w-4 h-4 accent-[#B5502F]" />
        Show the chatbot on the portfolio
      </label>
      <div>
        <label for="bot-welcome" class="studio-label">Welcome message</label>
        <input id="bot-welcome" v-model="form.welcome" class="studio-input" />
      </div>
      <div>
        <label for="bot-persona" class="studio-label">Persona / style</label>
        <textarea id="bot-persona" v-model="form.persona" rows="3" class="studio-input"></textarea>
      </div>
      <div>
        <label for="bot-knowledge" class="studio-label">Extra knowledge</label>
        <textarea id="bot-knowledge" v-model="form.knowledge" rows="8" class="studio-input" placeholder="e.g. Open to remote roles. Notice period: 1 month. Strongest stack: Vue + Node.js."></textarea>
        <p class="studio-hint">The bot already knows your profile, experience and projects. Add anything else it should be able to answer. Visitors can ask the bot about anything written here.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <button type="submit" class="studio-btn" :disabled="busy">{{ busy ? 'Saving...' : 'Save chatbot' }}</button>
        <span v-if="message" class="studio-ok">{{ message }}</span>
        <span v-if="error" class="studio-error">{{ error }}</span>
      </div>
    </form>

    <!-- Test panel uses the real public endpoint (counts towards your hourly limit) -->
    <div class="studio-card flex flex-col">
      <h3 class="font-serif text-lg mb-3">Test it</h3>
      <div class="flex-1 space-y-3 overflow-y-auto max-h-96 mb-3">
        <div
          v-for="(m, i) in testMessages"
          :key="i"
          class="text-sm px-3 py-2 rounded-xl max-w-[85%]"
          :class="m.role === 'user' ? 'ml-auto bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F]' : 'bg-[#F0EBE1] dark:bg-[#242424]'"
        >
          {{ m.content }}
        </div>
        <p v-if="testError" class="studio-error">{{ testError }}</p>
      </div>
      <form class="flex gap-2" @submit.prevent="sendTest">
        <label for="bot-test" class="sr-only">Test question</label>
        <input id="bot-test" v-model="testInput" placeholder="What has Hazman built?" class="studio-input flex-1" />
        <button type="submit" class="studio-btn" :disabled="testing || !testInput.trim()">{{ testing ? '...' : 'Ask' }}</button>
      </form>
      <p class="studio-hint">Save first — the test uses the saved settings.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { studioApi } from '@/api/studio';
import { sendChat, type ChatTurn } from '@/api/chat';
import { defaultChatbot, type ChatbotConfig } from '@/content/defaults';
import { useSaveStatus } from './useSaveStatus';

const props = defineProps<{ value: unknown }>();
const emit = defineEmits<{ saved: [value: ChatbotConfig] }>();

const form = reactive<Required<ChatbotConfig>>({ enabled: true, welcome: '', persona: '', knowledge: '' });
const { busy, message, error, run } = useSaveStatus();

watch(
  () => props.value,
  (value) => Object.assign(form, { ...defaultChatbot, ...((value && typeof value === 'object' ? value : {}) as Partial<ChatbotConfig>) }),
  { immediate: true },
);

const save = async () => {
  const value = { ...form };
  if (await run(() => studioApi.saveContent('chatbot', value))) emit('saved', value);
};

const testMessages = ref<ChatTurn[]>([]);
const testInput = ref('');
const testing = ref(false);
const testError = ref('');

const sendTest = async () => {
  testError.value = '';
  testMessages.value.push({ role: 'user', content: testInput.value.trim() });
  testInput.value = '';
  testing.value = true;
  try {
    const res = await sendChat(testMessages.value);
    testMessages.value.push({ role: 'assistant', content: res.reply });
  } catch (e) {
    testError.value = e instanceof Error ? e.message : 'Chat failed.';
  } finally {
    testing.value = false;
  }
};
</script>
