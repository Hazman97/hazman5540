import { api } from './client'

export interface OrgChart {
  id: string
  slug: string
  title: string | null
  description: string | null
  owner_token: string
  theme: string
  custom_settings: string
  chart_data: string
  created_at: string
  updated_at: string
}

export const orgchartApi = {
  list: () => api.get<Omit<OrgChart, 'chart_data' | 'owner_token' | 'custom_settings'>[]>('/orgchart'),
  create: (data: Partial<OrgChart> & { slug: string; owner_token: string }) =>
    api.post<{ id: string; slug: string }>('/orgchart', data),
  get: (slug: string) => api.get<OrgChart>(`/orgchart/${slug}`),
  update: (slug: string, data: Partial<OrgChart> & { owner_token: string }) =>
    api.patch(`/orgchart/${slug}`, data),
  delete: (slug: string, owner_token: string) =>
    api.delete(`/orgchart/${slug}`, { owner_token }),
}

export default orgchartApi
