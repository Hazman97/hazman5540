import { api } from './client'

export interface BirthdayPage {
  id: string
  owner_token: string
  slug: string
  title: string | null
  person_name: string | null
  subtitle: string | null
  hero_image_url: string | null
  template: string
  youtube_video_id: string | null
  youtube_start_time: number
  memories_video_id: string | null
  use_video_sound: number
  settings: string
  wishes_require_approval: number
  created_at: string
  updated_at: string
}

export interface BirthdayWish {
  id: string
  page_id: string
  name: string | null
  message: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export const birthdayApi = {
  createPage: (data: Partial<BirthdayPage> & { owner_token: string; slug: string }) =>
    api.post<{ id: string; slug: string }>('/birthday/pages', data),
  getPage: (slug: string) => api.get<BirthdayPage>(`/birthday/pages/${slug}`),
  updatePage: (id: string, data: Partial<BirthdayPage> & { owner_token: string }) =>
    api.patch(`/birthday/pages/${id}`, data),
  deletePage: (id: string, owner_token: string) =>
    api.delete(`/birthday/pages/${id}`, { owner_token }),
  listAdmin: () => api.get('/birthday/admin', true),

  getWishes: (slug: string) => api.get<BirthdayWish[]>(`/birthday/pages/${slug}/wishes`),
  submitWish: (slug: string, data: { name?: string; message: string }) =>
    api.post<{ id: string; status: string }>(`/birthday/pages/${slug}/wishes`, data),
  updateWish: (id: string, status: 'approved' | 'rejected', owner_token?: string) =>
    api.patch(`/birthday/wishes/${id}`, { status, owner_token }),
}

export default birthdayApi
