<template>
  <div class="min-h-screen bg-[#FAF7F2] dark:bg-[#0F0F0F] text-[#2A2421] dark:text-[#F5F0E8] font-sans">
    <header class="border-b border-[#E6E0D4] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A]">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <h1 class="text-xl font-serif text-[#B5502F] dark:text-[#E8C976]">Studio</h1>
          <router-link to="/" target="_blank" class="text-xs font-mono text-[#524A45] dark:text-[#9E9E9E] hover:underline">View site ↗</router-link>
        </div>
        <div v-if="owner" class="flex items-center gap-3 text-sm">
          <span class="hidden sm:inline text-[#524A45] dark:text-[#9E9E9E] font-mono text-xs">{{ owner.email }}</span>
          <button
            @click="logout"
            class="px-3 py-1.5 rounded-full border border-[#E6E0D4] dark:border-[#2A2A2A] hover:border-[#B5502F] dark:hover:border-[#E8C976] transition-colors focus-ring"
          >
            Log out
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-8">
      <p v-if="loading" class="text-sm text-[#524A45] dark:text-[#9E9E9E] animate-pulse">Verifying access...</p>
      <p v-else-if="error" class="studio-error">{{ error }}</p>

      <template v-else>
        <!-- Tabs -->
        <nav class="flex gap-1 overflow-x-auto mb-6 -mx-4 px-4 pb-1" aria-label="Studio sections">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="selectTab(tab.id)"
            class="shrink-0 px-4 py-2 rounded-full text-sm transition-colors focus-ring"
            :class="activeTab === tab.id
              ? 'bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] font-semibold'
              : 'text-[#524A45] dark:text-[#9E9E9E] hover:bg-[#F0EBE1] dark:hover:bg-[#242424]'"
            :aria-current="activeTab === tab.id ? 'page' : undefined"
          >
            {{ tab.label }}
          </button>
        </nav>

        <!-- First-run helper: copy the built-in content into the CMS -->
        <div v-if="missingKeys.length" class="studio-card mb-6 flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm">
            Not in the CMS yet: <span class="font-mono">{{ missingKeys.join(', ') }}</span>.
            The site shows built-in defaults for these, and the chatbot can't see them until they are saved.
          </p>
          <button class="studio-btn" :disabled="seeding" @click="publishDefaults">{{ seeding ? 'Saving...' : 'Publish defaults' }}</button>
        </div>

        <ProfileTab v-if="activeTab === 'profile'" :value="content.profile" @saved="(v) => (content.profile = v)" />
        <JsonContentTab
          v-else-if="activeTab === 'experience'"
          content-key="experience"
          :value="content.experience"
          :default-value="defaultExperience"
          description="Work history shown in the Experience section. Each job has role, company, period, optional location, and bullets (title + text)."
          @saved="(v) => (content.experience = v)"
        />
        <JsonContentTab
          v-else-if="activeTab === 'projects'"
          content-key="projects"
          :value="content.projects"
          :default-value="defaultProjects"
          description="Projects shown in the carousel, in display order (the first 5 are featured). tier is tier1, tier2 or tier3."
          @saved="(v) => (content.projects = v)"
        />
        <PostsTab v-else-if="activeTab === 'blog'" />
        <AiTab v-else-if="activeTab === 'ai'" />
        <ChatbotTab v-else-if="activeTab === 'chatbot'" :value="content.chatbot" @saved="(v) => (content.chatbot = v)" />
        <MessagesTab v-else-if="activeTab === 'messages'" />
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { clearAuthToken } from '@/api/client';
import { studioApi, type ContentKey } from '@/api/studio';
import { defaultChatbot, defaultExperience, defaultProfile, defaultProjects } from '@/content/defaults';
import ProfileTab from '@/components/studio/ProfileTab.vue';
import JsonContentTab from '@/components/studio/JsonContentTab.vue';
import PostsTab from '@/components/studio/PostsTab.vue';
import AiTab from '@/components/studio/AiTab.vue';
import ChatbotTab from '@/components/studio/ChatbotTab.vue';
import MessagesTab from '@/components/studio/MessagesTab.vue';
import '@/components/studio/studio.css';

interface Owner { id: string; name: string; email: string }

const tabs = [
  { id: 'profile', label: 'Profile & Resume' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'ai', label: 'AI & Schedule' },
  { id: 'chatbot', label: 'Chatbot' },
  { id: 'messages', label: 'Messages' },
] as const;
type TabId = typeof tabs[number]['id'];

const router = useRouter();
const route = useRoute();
const owner = ref<Owner | null>(null);
const loading = ref(true);
const error = ref('');
const seeding = ref(false);
const content = reactive<Partial<Record<ContentKey, unknown>>>({});

const isTab = (id: unknown): id is TabId => tabs.some((t) => t.id === id);
const activeTab = ref<TabId>(isTab(route.query.tab) ? route.query.tab : 'profile');

const defaults: Record<ContentKey, unknown> = {
  profile: defaultProfile,
  experience: defaultExperience,
  projects: defaultProjects,
  chatbot: defaultChatbot,
};
const missingKeys = computed(() => (Object.keys(defaults) as ContentKey[]).filter((key) => content[key] === undefined));

const selectTab = (id: TabId) => {
  activeTab.value = id;
  router.replace({ query: { tab: id } });
};

const goToLogin = () => router.replace('/studio/login?redirect=/studio');

const logout = () => {
  clearAuthToken();
  goToLogin();
};

const publishDefaults = async () => {
  seeding.value = true;
  error.value = '';
  try {
    for (const key of missingKeys.value) {
      await studioApi.saveContent(key, defaults[key]);
      content[key] = defaults[key];
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to publish defaults.';
  } finally {
    seeding.value = false;
  }
};

onMounted(async () => {
  // The router guard only checks that a session exists; the server decides who the owner is
  try {
    owner.value = (await studioApi.me()).user;
    Object.assign(content, (await studioApi.getContent()).content);
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
