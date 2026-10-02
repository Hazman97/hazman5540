<template>
  <form class="studio-card space-y-5" @submit.prevent="save">
    <div class="grid gap-5 sm:grid-cols-2">
      <div v-for="field in fields" :key="field.key" :class="field.wide ? 'sm:col-span-2' : ''">
        <label :for="`profile-${field.key}`" class="studio-label">{{ field.label }}</label>
        <textarea
          v-if="field.multiline"
          :id="`profile-${field.key}`"
          v-model="form[field.key]"
          rows="3"
          class="studio-input"
        ></textarea>
        <input v-else :id="`profile-${field.key}`" v-model="form[field.key]" :type="field.type || 'text'" class="studio-input" />
        <p v-if="field.hint" class="studio-hint">{{ field.hint }}</p>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <button type="submit" class="studio-btn" :disabled="busy">{{ busy ? 'Saving...' : 'Save profile' }}</button>
      <span v-if="message" class="studio-ok">{{ message }}</span>
      <span v-if="error" class="studio-error">{{ error }}</span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { studioApi } from '@/api/studio';
import { defaultProfile, type Profile } from '@/content/defaults';
import { useSaveStatus } from './useSaveStatus';

const props = defineProps<{ value: unknown }>();
const emit = defineEmits<{ saved: [value: Profile] }>();

const fields: { key: keyof Profile; label: string; type?: string; multiline?: boolean; wide?: boolean; hint?: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'roleBadge', label: 'Role badge' },
  { key: 'headline', label: 'Headline', wide: true },
  { key: 'subline', label: 'Sub-headline', multiline: true, wide: true },
  { key: 'aboutIntro', label: 'About — intro', multiline: true, wide: true },
  { key: 'aboutBody', label: 'About — body', multiline: true, wide: true },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'phone', label: 'Phone', type: 'tel', hint: 'Leave empty to keep your number off the site.' },
  { key: 'location', label: 'Location' },
  { key: 'resumeUrl', label: 'Resume URL', hint: 'A file in /public (e.g. /resume.pdf) or a full https:// link.' },
  { key: 'github', label: 'GitHub URL', type: 'url' },
  { key: 'linkedin', label: 'LinkedIn URL', type: 'url' },
];

const form = reactive<Profile>({ ...defaultProfile });
const { busy, message, error, run } = useSaveStatus();

watch(
  () => props.value,
  (value) => Object.assign(form, defaultProfile, (value && typeof value === 'object' ? value : {}) as Partial<Profile>),
  { immediate: true },
);

const save = async () => {
  const value = { ...form };
  if (await run(() => studioApi.saveContent('profile', value))) emit('saved', value);
};
</script>
