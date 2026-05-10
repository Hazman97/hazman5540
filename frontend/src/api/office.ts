import { api } from './client'

export interface OfficeBaju {
  id: string
  name: string
  size: string
  created_at: string
}

export const officeApi = {
  list: () => api.get<OfficeBaju[]>('/office'),
  add: (data: { name: string; size: string }) =>
    api.post<{ id: string; name: string; size: string }>('/office', data),
  update: (id: string, data: { name?: string; size?: string }) => api.patch(`/office/${id}`, data),
  delete: (id: string) => api.delete(`/office/${id}`),
}

export default officeApi
