import { computed, reactive } from 'vue';
import { api } from '@/api/client';
import {
  defaultChatbot,
  defaultExperience,
  defaultProfile,
  defaultProjects,
  type ChatbotConfig,
  type ExperienceItem,
  type Profile,
  type ProjectItem,
} from '@/content/defaults';

interface SiteContent {
  profile?: Partial<Profile>;
  experience?: ExperienceItem[];
  projects?: ProjectItem[];
  chatbot?: Partial<ChatbotConfig>;
}

// Shared across components so the API is called once per page load
const state = reactive<{ content: SiteContent; loaded: boolean }>({ content: {}, loaded: false });
let request: Promise<void> | null = null;

export function loadSiteContent(): Promise<void> {
  if (!request) {
    request = api
      .get<{ content: SiteContent }>('/content')
      .then((res) => {
        state.content = res.content || {};
      })
      .catch((error) => {
        // Keep rendering the built-in defaults if the API is unreachable
        console.warn('Site content unavailable, using defaults:', error);
      })
      .finally(() => {
        state.loaded = true;
      });
  }
  return request;
}

const nonEmptyArray = <T>(value: unknown, fallback: T[]): T[] =>
  Array.isArray(value) && value.length > 0 ? (value as T[]) : fallback;

export function useSiteContent() {
  loadSiteContent();

  return {
    loaded: computed(() => state.loaded),
    profile: computed<Profile>(() => ({ ...defaultProfile, ...(state.content.profile || {}) })),
    experience: computed<ExperienceItem[]>(() => nonEmptyArray(state.content.experience, defaultExperience)),
    projects: computed<ProjectItem[]>(() => nonEmptyArray(state.content.projects, defaultProjects)),
    chatbot: computed<ChatbotConfig>(() => ({ ...defaultChatbot, ...(state.content.chatbot || {}) })),
  };
}
