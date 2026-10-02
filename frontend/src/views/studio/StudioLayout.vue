<template>
  <div class="min-h-screen bg-[#FAF7F2] dark:bg-[#0F0F0F] text-[#2A2421] dark:text-[#F5F0E8] font-sans">
    <header class="border-b border-[#E6E0D4] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A]">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <h1 class="text-xl font-serif text-[#B5502F] dark:text-[#E8C976]">Studio</h1>
        <div v-if="owner" class="flex items-center gap-3 text-sm">
          <span class="text-[#524A45] dark:text-[#9E9E9E] font-mono text-xs">{{ owner.email }}</span>
          <button
            @click="logout"
            class="px-3 py-1.5 rounded-full border border-[#E6E0D4] dark:border-[#2A2A2A] hover:border-[#B5502F] dark:hover:border-[#E8C976] transition-colors focus-ring"
          >
            Log out
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-10">
      <p v-if="loading" class="text-sm text-[#524A45] dark:text-[#9E9E9E] animate-pulse">Verifying access...</p>
      <p v-else-if="error" class="text-sm text-rose-600 dark:text-rose-400">{{ error }}</p>
      <div v-else>
        <h2 class="text-2xl font-serif mb-2">Welcome back, {{ owner?.name }}</h2>
        <p class="text-sm text-[#524A45] dark:text-[#9E9E9E]">Content, blog, AI and chatbot settings will live here.</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api, clearAuthToken } from '@/api/client';

interface Owner { id: string; name: string; email: string }

const router = useRouter();
const owner = ref<Owner | null>(null);
const loading = ref(true);
const error = ref('');

const goToLogin = () => router.replace('/studio/login?redirect=/studio');

const logout = () => {
  clearAuthToken();
  goToLogin();
};

onMounted(async () => {
  // The router guard only checks that a session exists; the server decides who the owner is
  try {
    const res = await api.get<{ user: Owner }>('/studio/me', true);
    owner.value = res.user;
  } catch (e) {
    const message = e instanceof Error ? e.message : '';
    if (message.includes('Unauthorized') || message.includes('expired')) {
      clearAuthToken();
      goToLogin();
      return;
    }
    error.value = message || 'Access denied.';
  } finally {
    loading.value = false;
  }
});
</script>
