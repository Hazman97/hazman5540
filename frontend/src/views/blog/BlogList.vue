<template>
  <div class="min-h-screen bg-[#FAF7F2] dark:bg-[#0F0F0F] text-[#2A2421] dark:text-[#F5F0E8] font-sans">
    <header class="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-6 flex items-center justify-between gap-4">
      <router-link to="/" class="text-sm font-mono text-[#524A45] dark:text-[#9E9E9E] hover:text-[#B5502F] dark:hover:text-[#E8C976] focus-ring rounded">
        ← Portfolio
      </router-link>
      <a :href="rssUrl" class="text-xs font-mono text-[#524A45] dark:text-[#9E9E9E] hover:text-[#B5502F] dark:hover:text-[#E8C976] focus-ring rounded">RSS</a>
    </header>

    <main class="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
      <div class="mb-10">
        <h1 class="text-4xl sm:text-5xl font-serif text-[#B5502F] dark:text-[#E8C976] mb-3">Blog</h1>
        <p class="text-[#524A45] dark:text-[#9E9E9E] max-w-2xl">Notes on AI, networking, gadgets and the things I learn while building.</p>
      </div>

      <!-- Category filter -->
      <div v-if="categories.length" class="flex flex-wrap gap-2 mb-8">
        <button
          v-for="cat in [{ category: '', n: 0 }, ...categories]"
          :key="cat.category || 'all'"
          @click="selectCategory(cat.category)"
          class="px-3 py-1 rounded-full text-xs font-mono border transition-colors focus-ring"
          :class="activeCategory === cat.category
            ? 'bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] border-transparent'
            : 'border-[#E6E0D4] dark:border-[#2A2A2A] text-[#524A45] dark:text-[#9E9E9E] hover:border-[#B5502F] dark:hover:border-[#E8C976]'"
        >
          {{ cat.category || 'All' }}<span v-if="cat.category" class="opacity-70"> · {{ cat.n }}</span>
        </button>
      </div>

      <p v-if="loading" class="text-sm text-[#524A45] dark:text-[#9E9E9E] animate-pulse">Loading posts...</p>
      <p v-else-if="error" class="text-sm text-rose-600 dark:text-rose-400">{{ error }}</p>
      <p v-else-if="posts.length === 0" class="text-sm text-[#524A45] dark:text-[#9E9E9E]">No posts yet. Check back soon.</p>

      <div v-else class="grid gap-6 sm:grid-cols-2">
        <router-link
          v-for="post in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="group block bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all focus-ring"
        >
          <img v-if="post.cover_url" :src="post.cover_url" :alt="post.title" class="w-full h-44 object-cover" loading="lazy" />
          <div class="p-6">
            <div class="flex items-center gap-2 text-xs font-mono text-[#524A45] dark:text-[#9E9E9E] mb-3">
              <span class="text-[#B5502F] dark:text-[#E8C976] font-semibold">{{ post.category }}</span>
              <span>·</span>
              <span>{{ formatDate(post.published_at) }}</span>
            </div>
            <h2 class="text-xl font-serif mb-2 group-hover:text-[#B5502F] dark:group-hover:text-[#E8C976] transition-colors">{{ post.title }}</h2>
            <p class="text-sm text-[#524A45] dark:text-[#9E9E9E] leading-relaxed">{{ post.excerpt }}</p>
          </div>
        </router-link>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-center gap-4 mt-10 text-sm font-mono">
        <button :disabled="page <= 1" @click="goToPage(page - 1)" class="px-3 py-1 rounded-full border border-[#E6E0D4] dark:border-[#2A2A2A] disabled:opacity-40 focus-ring">← Newer</button>
        <span class="text-[#524A45] dark:text-[#9E9E9E]">{{ page }} / {{ totalPages }}</span>
        <button :disabled="page >= totalPages" @click="goToPage(page + 1)" class="px-3 py-1 rounded-full border border-[#E6E0D4] dark:border-[#2A2A2A] disabled:opacity-40 focus-ring">Older →</button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { blogApi, type PostSummary } from '@/api/blog';
import { formatDate } from '@/utils/markdown';

const posts = ref<PostSummary[]>([]);
const categories = ref<{ category: string; n: number }[]>([]);
const activeCategory = ref('');
const page = ref(1);
const totalPages = ref(1);
const loading = ref(true);
const error = ref('');
const rssUrl = `${import.meta.env.VITE_API_URL || ''}/api/blog/rss.xml`;

const load = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await blogApi.list(page.value, activeCategory.value || undefined);
    posts.value = res.posts;
    totalPages.value = res.totalPages;
    // Keep the full category list when a filter is active
    if (!activeCategory.value) categories.value = res.categories;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load posts.';
  } finally {
    loading.value = false;
  }
};

const selectCategory = (category: string) => {
  activeCategory.value = category;
  page.value = 1;
  load();
};

const goToPage = (next: number) => {
  page.value = next;
  load();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(load);
</script>
