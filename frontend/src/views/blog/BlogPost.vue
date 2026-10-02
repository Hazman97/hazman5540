<template>
  <div class="min-h-screen bg-[#FAF7F2] dark:bg-[#0F0F0F] text-[#2A2421] dark:text-[#F5F0E8] font-sans">
    <header class="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-6">
      <router-link to="/blog" class="text-sm font-mono text-[#524A45] dark:text-[#9E9E9E] hover:text-[#B5502F] dark:hover:text-[#E8C976] focus-ring rounded">
        ← All posts
      </router-link>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
      <p v-if="loading" class="text-sm text-[#524A45] dark:text-[#9E9E9E] animate-pulse">Loading...</p>

      <div v-else-if="notFound" class="py-16 text-center">
        <h1 class="text-3xl font-serif mb-3">Post not found</h1>
        <router-link to="/blog" class="text-[#B5502F] dark:text-[#E8C976] hover:underline">Back to the blog</router-link>
      </div>

      <p v-else-if="error" class="text-sm text-rose-600 dark:text-rose-400">{{ error }}</p>

      <article v-else-if="post">
        <div class="flex flex-wrap items-center gap-2 text-xs font-mono text-[#524A45] dark:text-[#9E9E9E] mb-4">
          <span class="text-[#B5502F] dark:text-[#E8C976] font-semibold">{{ post.category }}</span>
          <span>·</span>
          <time :datetime="post.published_at">{{ formatDate(post.published_at) }}</time>
          <span>·</span>
          <span>{{ readingTime(post.body_md) }}</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-serif leading-tight mb-4">{{ post.title }}</h1>
        <p v-if="post.excerpt" class="text-lg text-[#524A45] dark:text-[#9E9E9E] mb-8">{{ post.excerpt }}</p>
        <img v-if="post.cover_url" :src="post.cover_url" :alt="post.title" class="w-full rounded-2xl mb-10 border border-[#E6E0D4] dark:border-[#2A2A2A]" />

        <!-- Sanitized by renderMarkdown (DOMPurify) -->
        <div class="blog-prose" v-html="html"></div>

        <div v-if="post.tags.length" class="flex flex-wrap gap-2 mt-12 pt-6 border-t border-[#E6E0D4] dark:border-[#2A2A2A]">
          <span v-for="tag in post.tags" :key="tag" class="text-xs font-mono text-[#524A45] dark:text-[#9E9E9E]">#{{ tag }}</span>
        </div>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { blogApi, type Post } from '@/api/blog';
import { formatDate, readingTime, renderMarkdown } from '@/utils/markdown';

const route = useRoute();
const post = ref<Post | null>(null);
const loading = ref(true);
const notFound = ref(false);
const error = ref('');

const html = computed(() => (post.value ? renderMarkdown(post.value.body_md) : ''));

const setMetaDescription = (content: string) => {
  let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = 'description';
    document.head.appendChild(tag);
  }
  tag.content = content;
};

const load = async () => {
  loading.value = true;
  notFound.value = false;
  error.value = '';
  try {
    const res = await blogApi.get(String(route.params.slug));
    post.value = res.post;
    document.title = `${res.post.seo_title || res.post.title} — Hazman Adanan`;
    setMetaDescription(res.post.seo_description || res.post.excerpt);
  } catch (e) {
    const message = e instanceof Error ? e.message : '';
    if (message.includes('not found')) notFound.value = true;
    else error.value = message || 'Failed to load this post.';
  } finally {
    loading.value = false;
  }
};

watch(() => route.params.slug, (slug) => { if (slug) load(); });
onMounted(load);
onUnmounted(() => { document.title = 'Hazman — Portfolio'; });
</script>

<style scoped>
.blog-prose :deep(h2) { @apply text-2xl font-serif mt-10 mb-4 text-[#B5502F] dark:text-[#E8C976]; }
.blog-prose :deep(h3) { @apply text-xl font-serif mt-8 mb-3; }
.blog-prose :deep(p) { @apply leading-relaxed mb-5 text-[#2A2421]/90 dark:text-[#F5F0E8]/90; }
.blog-prose :deep(ul) { @apply list-disc pl-6 mb-5 space-y-1; }
.blog-prose :deep(ol) { @apply list-decimal pl-6 mb-5 space-y-1; }
.blog-prose :deep(a) { @apply text-[#B5502F] dark:text-[#E8C976] underline; }
.blog-prose :deep(blockquote) { @apply border-l-4 border-[#B5502F] dark:border-[#E8C976] pl-4 italic text-[#524A45] dark:text-[#9E9E9E] mb-5; }
.blog-prose :deep(code) { @apply font-mono text-sm bg-[#F0EBE1] dark:bg-[#242424] px-1.5 py-0.5 rounded; }
.blog-prose :deep(pre) { @apply bg-[#141414] text-[#F5F0E8] p-4 rounded-xl overflow-x-auto mb-5; }
.blog-prose :deep(pre code) { @apply bg-transparent p-0; }
.blog-prose :deep(img) { @apply rounded-xl my-6; }
.blog-prose :deep(table) { @apply w-full text-sm mb-5 border-collapse; }
.blog-prose :deep(th), .blog-prose :deep(td) { @apply border border-[#E6E0D4] dark:border-[#2A2A2A] px-3 py-2 text-left; }
</style>
