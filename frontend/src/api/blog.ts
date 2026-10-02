import { api } from './client'

export interface PostSummary {
  slug: string
  title: string
  excerpt: string
  cover_url: string | null
  category: string
  tags: string[]
  published_at: string
}

export interface Post extends PostSummary {
  body_md: string
  seo_title: string | null
  seo_description: string | null
  updated_at: string
}

export interface PostList {
  posts: PostSummary[]
  page: number
  totalPages: number
  categories: { category: string; n: number }[]
}

export const blogApi = {
  list: (page = 1, category?: string) =>
    api.get<PostList>(`/blog/posts?page=${page}${category ? `&category=${encodeURIComponent(category)}` : ''}`),
  get: (slug: string) => api.get<{ post: Post }>(`/blog/posts/${encodeURIComponent(slug)}`),
}

export default blogApi
