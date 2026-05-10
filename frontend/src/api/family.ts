import { api } from './client'

export interface FamilyMember {
  id: string
  name: string
  group_name: string | null
  family_order: number | null
  role: string | null
  age: number | null
  size: string | null
  gender: string | null
  created_at: string
}

export const familyApi = {
  list: () => api.get<FamilyMember[]>('/family'),
  add: (data: Partial<FamilyMember> & { name: string }) =>
    api.post<{ id: string } & Partial<FamilyMember>>('/family', data),
  update: (id: string, data: Partial<FamilyMember>) => api.patch(`/family/${id}`, data),
  delete: (id: string) => api.delete(`/family/${id}`),
}

export default familyApi
