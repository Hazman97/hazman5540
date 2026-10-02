<template>
  <div class="studio-card space-y-4">
    <p class="text-sm text-[#524A45] dark:text-[#9E9E9E]">{{ description }}</p>
    <p v-if="!hasSavedValue" class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976]">
      Not saved to the CMS yet — the site is showing the built-in default below. Save to start editing it here.
    </p>

    <label :for="`json-${contentKey}`" class="studio-label">{{ contentKey }} (JSON)</label>
    <textarea
      :id="`json-${contentKey}`"
      v-model="text"
      rows="24"
      spellcheck="false"
      class="studio-input font-mono text-xs leading-relaxed"
    ></textarea>
    <p v-if="parseError" class="studio-error">{{ parseError }}</p>

    <div class="flex flex-wrap items-center gap-3">
      <button class="studio-btn" :disabled="busy || !!parseError" @click="save">{{ busy ? 'Saving...' : 'Save' }}</button>
      <button class="studio-btn-ghost" :disabled="busy" @click="resetToDefault">Reset to default</button>
      <span v-if="message" class="studio-ok">{{ message }}</span>
      <span v-if="error" class="studio-error">{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { studioApi, type ContentKey } from '@/api/studio';
import { useSaveStatus } from './useSaveStatus';

const props = defineProps<{
  contentKey: ContentKey;
  value: unknown;
  defaultValue: unknown[];
  description: string;
}>();
const emit = defineEmits<{ saved: [value: unknown] }>();

const text = ref('');
const { busy, message, error, run } = useSaveStatus();
const hasSavedValue = computed(() => Array.isArray(props.value) && props.value.length > 0);

watch(
  () => props.value,
  (value) => {
    text.value = JSON.stringify(Array.isArray(value) && value.length ? value : props.defaultValue, null, 2);
  },
  { immediate: true },
);

const parsed = computed<{ value?: unknown[]; error?: string }>(() => {
  try {
    const value = JSON.parse(text.value);
    if (!Array.isArray(value)) return { error: 'The top level must be a JSON array [ ... ].' };
    if (value.length === 0) return { error: 'The list cannot be empty (the site would fall back to the default).' };
    return { value };
  } catch (e) {
    return { error: `Invalid JSON: ${e instanceof Error ? e.message : ''}` };
  }
});
const parseError = computed(() => parsed.value.error || '');

const save = async () => {
  const value = parsed.value.value;
  if (!value) return;
  if (await run(() => studioApi.saveContent(props.contentKey, value))) emit('saved', value);
};

const resetToDefault = () => {
  if (window.confirm('Replace the editor contents with the built-in default? (Nothing is saved until you press Save.)')) {
    text.value = JSON.stringify(props.defaultValue, null, 2);
  }
};
</script>
