<template>
  <div class="studio-card space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="font-serif text-lg">Contact form messages</h3>
      <button class="studio-btn-ghost" @click="load">Refresh</button>
    </div>
    <p v-if="loading" class="text-sm animate-pulse">Loading...</p>
    <p v-else-if="error" class="studio-error">{{ error }}</p>
    <p v-else-if="messages.length === 0" class="text-sm text-[#524A45] dark:text-[#9E9E9E]">No messages yet.</p>
    <ul v-else class="divide-y divide-[#E6E0D4] dark:divide-[#2A2A2A]">
      <li v-for="m in messages" :key="m.id" class="py-4 space-y-2">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="text-sm">
            <span class="font-semibold">{{ m.name }}</span>
            <a :href="`mailto:${m.email}`" class="ml-2 font-mono text-xs text-[#B5502F] dark:text-[#E8C976] hover:underline">{{ m.email }}</a>
          </div>
          <span class="text-xs font-mono text-[#524A45] dark:text-[#9E9E9E]">{{ formatDate(m.created_at) }}</span>
        </div>
        <p class="text-sm whitespace-pre-line text-[#2A2421]/90 dark:text-[#F5F0E8]/90">{{ m.message }}</p>
        <div class="flex gap-2">
          <a :href="`mailto:${m.email}?subject=${encodeURIComponent('Re: your message')}`" class="studio-btn-ghost text-xs py-1">Reply</a>
          <button class="studio-btn-danger" @click="remove(m)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { studioApi, type ContactMessage } from '@/api/studio';
import { formatDate } from '@/utils/markdown';

const messages = ref<ContactMessage[]>([]);
const loading = ref(true);
const error = ref('');

const load = async () => {
  loading.value = true;
  error.value = '';
  try {
    messages.value = (await studioApi.listMessages()).messages;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load messages.';
  } finally {
    loading.value = false;
  }
};

const remove = async (m: ContactMessage) => {
  if (!window.confirm(`Delete the message from ${m.name}?`)) return;
  try {
    await studioApi.deleteMessage(m.id);
    messages.value = messages.value.filter((x) => x.id !== m.id);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to delete message.';
  }
};

onMounted(load);
</script>
