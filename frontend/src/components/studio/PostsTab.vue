<template>
  <div class="space-y-6">
    <!-- List -->
    <div v-if="!editing" class="studio-card space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex gap-2">
          <button
            v-for="f in filters"
            :key="f.id"
            class="px-3 py-1 rounded-full text-xs font-mono border focus-ring"
            :class="filter === f.id ? 'bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] border-transparent' : 'border-[#E6E0D4] dark:border-[#2A2A2A]'"
            @click="filter = f.id"
          >
            {{ f.label }} ({{ countFor(f.id) }})
          </button>
        </div>
        <button class="studio-btn" @click="startNew">+ New post</button>
      </div>

      <p v-if="loading" class="text-sm animate-pulse">Loading...</p>
      <p v-else-if="listError" class="studio-error">{{ listError }}</p>
      <p v-else-if="visiblePosts.length === 0" class="text-sm text-[#524A45] dark:text-[#9E9E9E]">No posts here yet.</p>

      <ul v-else class="divide-y divide-[#E6E0D4] dark:divide-[#2A2A2A]">
        <li v-for="post in visiblePosts" :key="post.id" class="py-3 flex flex-wrap items-center justify-between gap-3">
          <div class="min-w-0">
            <button class="text-left font-serif text-lg hover:text-[#B5502F] dark:hover:text-[#E8C976] focus-ring rounded" @click="openPost(post.id)">
              {{ post.title }}
            </button>
            <div class="text-xs font-mono text-[#524A45] dark:text-[#9E9E9E] flex flex-wrap gap-2 mt-0.5">
              <span :class="post.status === 'published' ? 'text-emerald-700 dark:text-emerald-400' : 'text-[#B5502F] dark:text-[#E8C976]'">{{ post.status }}</span>
              <span>· {{ post.category }}</span>
              <span v-if="post.source === 'ai'">· 🤖 AI draft</span>
              <span>· {{ formatDate(post.published_at || post.created_at) }}</span>
            </div>
          </div>
          <router-link v-if="post.status === 'published'" :to="`/blog/${post.slug}`" target="_blank" class="text-xs font-mono hover:underline">View ↗</router-link>
        </li>
      </ul>
    </div>

    <!-- Editor -->
    <form v-else class="studio-card space-y-5" @submit.prevent="save()">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <button type="button" class="studio-btn-ghost" @click="closeEditor">← Back to posts</button>
        <span class="text-xs font-mono" :class="draft.status === 'published' ? 'text-emerald-700 dark:text-emerald-400' : 'text-[#B5502F] dark:text-[#E8C976]'">
          {{ draft.id ? draft.status : 'new draft' }}<template v-if="draft.source === 'ai'"> · 🤖 AI generated — check the facts before publishing</template>
        </span>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="post-title" class="studio-label">Title</label>
          <input id="post-title" v-model="draft.title" required class="studio-input" />
        </div>
        <div>
          <label for="post-slug" class="studio-label">Slug</label>
          <input id="post-slug" v-model="draft.slug" placeholder="auto from title" class="studio-input" />
        </div>
        <div>
          <label for="post-category" class="studio-label">Category</label>
          <input id="post-category" v-model="draft.category" list="post-categories" class="studio-input" />
          <datalist id="post-categories"><option v-for="c in knownCategories" :key="c" :value="c" /></datalist>
        </div>
        <div class="sm:col-span-2">
          <label for="post-excerpt" class="studio-label">Excerpt</label>
          <textarea id="post-excerpt" v-model="draft.excerpt" rows="2" class="studio-input"></textarea>
        </div>
        <div>
          <label for="post-tags" class="studio-label">Tags</label>
          <input id="post-tags" v-model="tagsText" placeholder="mesh, wifi, starlink" class="studio-input" />
        </div>
        <div>
          <label for="post-cover" class="studio-label">Cover image URL</label>
          <input id="post-cover" v-model="draft.cover_url" placeholder="https://... or /img/..." class="studio-input" />
        </div>
        <div>
          <label for="post-seo-title" class="studio-label">SEO title</label>
          <input id="post-seo-title" v-model="draft.seo_title" maxlength="120" class="studio-input" />
          <p class="studio-hint">{{ (draft.seo_title || '').length }}/60 recommended</p>
        </div>
        <div>
          <label for="post-seo-desc" class="studio-label">SEO description</label>
          <input id="post-seo-desc" v-model="draft.seo_description" maxlength="300" class="studio-input" />
          <p class="studio-hint">{{ (draft.seo_description || '').length }}/155 recommended</p>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label for="post-body" class="studio-label mb-0">Body (Markdown)</label>
          <button type="button" class="text-xs font-mono hover:underline" @click="showPreview = !showPreview">
            {{ showPreview ? 'Edit' : 'Preview' }}
          </button>
        </div>
        <textarea v-show="!showPreview" id="post-body" v-model="draft.body_md" rows="20" class="studio-input font-mono text-xs leading-relaxed"></textarea>
        <!-- Sanitized by renderMarkdown (DOMPurify) -->
        <div v-if="showPreview" class="blog-preview studio-input min-h-[20rem] text-sm" v-html="previewHtml"></div>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button type="submit" class="studio-btn" :disabled="busy">{{ busy ? 'Saving...' : 'Save' }}</button>
        <button v-if="draft.status !== 'published'" type="button" class="studio-btn-ghost" :disabled="busy" @click="save('published')">Publish</button>
        <button v-else type="button" class="studio-btn-ghost" :disabled="busy" @click="save('draft')">Unpublish</button>
        <button v-if="draft.id" type="button" class="studio-btn-danger ml-auto" :disabled="busy" @click="remove">Delete</button>
        <span v-if="message" class="studio-ok">{{ message }}</span>
        <span v-if="error" class="studio-error">{{ error }}</span>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { studioApi, type StudioPost } from '@/api/studio';
import { formatDate, renderMarkdown } from '@/utils/markdown';
import { useSaveStatus } from './useSaveStatus';

type Filter = 'all' | 'draft' | 'published';
const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'draft', label: 'Drafts' },
  { id: 'published', label: 'Published' },
];

const emptyDraft = (): Partial<StudioPost> => ({
  title: '', slug: '', excerpt: '', body_md: '', cover_url: '', category: 'AI', tags: [],
  seo_title: '', seo_description: '', status: 'draft', source: 'manual',
});

const posts = ref<StudioPost[]>([]);
const loading = ref(true);
const listError = ref('');
const filter = ref<Filter>('all');
const editing = ref(false);
const showPreview = ref(false);
const draft = reactive<Partial<StudioPost>>(emptyDraft());
const tagsText = ref('');
const { busy, message, error, run } = useSaveStatus();

const visiblePosts = computed(() => (filter.value === 'all' ? posts.value : posts.value.filter((p) => p.status === filter.value)));
const countFor = (id: Filter) => (id === 'all' ? posts.value.length : posts.value.filter((p) => p.status === id).length);
const knownCategories = computed(() => [...new Set(['AI', 'Networking', 'Gadgets', ...posts.value.map((p) => p.category)])]);
const previewHtml = computed(() => renderMarkdown(draft.body_md || ''));

const loadPosts = async () => {
  loading.value = true;
  listError.value = '';
  try {
    posts.value = (await studioApi.listPosts()).posts;
  } catch (e) {
    listError.value = e instanceof Error ? e.message : 'Failed to load posts.';
  } finally {
    loading.value = false;
  }
};

const fillDraft = (post: Partial<StudioPost>) => {
  Object.assign(draft, emptyDraft(), post);
  tagsText.value = (post.tags || []).join(', ');
  message.value = '';
  error.value = '';
  showPreview.value = false;
  editing.value = true;
};

const startNew = () => fillDraft(emptyDraft());

const openPost = async (id: string) => {
  await run(async () => fillDraft((await studioApi.getPost(id)).post), '');
};

const closeEditor = () => {
  editing.value = false;
  loadPosts();
};

const save = async (status?: 'draft' | 'published') => {
  if (status === 'published' && draft.source === 'ai' && !window.confirm('This post was written by AI. Have you checked it for accuracy?')) return;

  const payload: Partial<StudioPost> = {
    ...draft,
    tags: tagsText.value.split(',').map((t) => t.trim()).filter(Boolean),
    status: status || draft.status,
  };
  await run(async () => {
    if (draft.id) {
      const res = await studioApi.updatePost(draft.id, payload);
      draft.slug = res.slug;
      draft.status = res.status as StudioPost['status'];
    } else {
      const res = await studioApi.createPost(payload);
      draft.id = res.id;
      draft.slug = res.slug;
      // New posts are created as drafts; publish in a second step if requested
      if (status === 'published') {
        const updated = await studioApi.updatePost(res.id, payload);
        draft.status = updated.status as StudioPost['status'];
      }
    }
  }, status === 'published' ? 'Published.' : status === 'draft' ? 'Moved back to drafts.' : 'Saved.');
};

const remove = async () => {
  if (!draft.id || !window.confirm(`Delete "${draft.title}"? This cannot be undone.`)) return;
  const id = draft.id;
  if (await run(() => studioApi.deletePost(id), 'Deleted.')) closeEditor();
};

onMounted(loadPosts);
</script>

<style scoped>
.blog-preview :deep(h2) { @apply text-xl font-serif mt-6 mb-3; }
.blog-preview :deep(h3) { @apply text-lg font-serif mt-5 mb-2; }
.blog-preview :deep(p) { @apply mb-3 leading-relaxed; }
.blog-preview :deep(ul) { @apply list-disc pl-6 mb-3; }
.blog-preview :deep(ol) { @apply list-decimal pl-6 mb-3; }
.blog-preview :deep(code) { @apply font-mono text-xs; }
.blog-preview :deep(pre) { @apply bg-[#141414] text-[#F5F0E8] p-3 rounded-lg overflow-x-auto mb-3; }
</style>
