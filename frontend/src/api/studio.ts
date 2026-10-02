import { api } from './client'

// Owner-only Studio endpoints; every call sends the stored JWT

export type ContentKey = 'profile' | 'experience' | 'projects' | 'chatbot'

export interface StudioPost {
  id: string
  slug: string
  title: string
  excerpt: string
  body_md?: string
  cover_url?: string | null
  category: string
  tags: string[]
  status: 'draft' | 'published'
  source: 'manual' | 'ai'
  seo_title?: string | null
  seo_description?: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export interface AiSettings {
  enabled: number | boolean
  frequency: 'daily' | 'weekly'
  run_hour: number
  run_weekday: number
  categories: string[]
  tone: string
  word_count: number
  next_run_at: string | null
}

export interface AiState {
  configured: boolean
  settings: AiSettings
  topics: { id: string; topic: string; category: string | null; used: number; created_at: string }[]
  runs: { id: string; trigger_type: string; status: string; error: string | null; duration_ms: number; created_at: string; post_title: string | null; post_id: string | null }[]
}

export const studioApi = {
  me: () => api.get<{ user: { id: string; name: string; email: string } }>('/studio/me', true),

  getContent: () => api.get<{ content: Partial<Record<ContentKey, unknown>> }>('/studio/content', true),
  saveContent: (key: ContentKey, value: unknown) => api.put(`/studio/content/${key}`, { value }, true),

  listPosts: () => api.get<{ posts: StudioPost[] }>('/studio/posts', true),
  getPost: (id: string) => api.get<{ post: StudioPost }>(`/studio/posts/${id}`, true),
  createPost: (post: Partial<StudioPost>) => api.post<{ id: string; slug: string }>('/studio/posts', post, true),
  updatePost: (id: string, post: Partial<StudioPost>) => api.patch<{ slug: string; status: string }>(`/studio/posts/${id}`, post, true),
  deletePost: (id: string) => api.delete(`/studio/posts/${id}`, undefined, true),

  listMessages: () => api.get<{ messages: ContactMessage[] }>('/studio/messages', true),
  deleteMessage: (id: string) => api.delete(`/studio/messages/${id}`, undefined, true),

  getAi: () => api.get<AiState>('/studio/ai', true),
  saveAiSettings: (settings: AiSettings) => api.put<{ next_run_at: string | null }>('/studio/ai/settings', settings, true),
  addTopic: (topic: string, category?: string) => api.post('/studio/ai/topics', { topic, category }, true),
  deleteTopic: (id: string) => api.delete(`/studio/ai/topics/${id}`, undefined, true),
  runAiNow: () => api.post<{ postId: string; slug: string }>('/studio/ai/run', {}, true),
}

export default studioApi
