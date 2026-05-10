import { api } from './client'

export interface Photo {
  id: string
  location_id: string
  url: string
  caption: string | null
  created_at: string
}

export interface Location {
  id: string
  country_id: string
  name: string
  created_at: string
  images: Photo[]
}

export interface Country {
  id: string
  name: string
  created_at: string
  locations: Location[]
}

export const photoApi = {
  getCountries: () => api.get<Country[]>('/photos/countries'),
  addCountry: (name: string) => api.post<{ id: string; name: string }>('/photos/countries', { name }),
  deleteCountry: (id: string) => api.delete(`/photos/countries/${id}`),

  addLocation: (countryId: string, name: string) =>
    api.post<{ id: string; name: string; country_id: string }>(`/photos/countries/${countryId}/locations`, { name }),
  deleteLocation: (id: string) => api.delete(`/photos/locations/${id}`),

  getLocationPhotos: (locationId: string) => api.get<Photo[]>(`/photos/locations/${locationId}/photos`),

  uploadPhoto: (data: { location_id: string; url: string; caption?: string }) =>
    api.post<{ id: string; url: string }>('/photos/upload', data),
  deletePhoto: (id: string) => api.delete<{ success: boolean; url: string }>(`/photos/photos/${id}`),
}

export default photoApi
