import { D1Database } from '@cloudflare/workers-types'

export interface PostInput {
  title?: unknown
  slug?: unknown
  excerpt?: unknown
  body_md?: unknown
  cover_url?: unknown
  category?: unknown
  tags?: unknown
  seo_title?: unknown
  seo_description?: unknown
}

export interface CleanPost {
  title: string
  slug: string
  excerpt: string
  body_md: string
  cover_url: string | null
  category: string
  tags: string[]
  seo_title: string | null
  seo_description: string | null
}

const LIMITS = { title: 200, slug: 120, excerpt: 500, body_md: 100_000, cover_url: 500, category: 40, seo_title: 120, seo_description: 300 }

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, LIMITS.slug) || 'post'
}

// Append -2, -3 ... until the slug is free (ignoring the post being edited)
export async function uniqueSlug(db: D1Database, base: string, excludeId?: string): Promise<string> {
  let candidate = base
  for (let n = 2; n < 100; n++) {
    const existing = await db.prepare('SELECT id FROM posts WHERE slug = ?').bind(candidate).first<{ id: string }>()
    if (!existing || existing.id === excludeId) return candidate
    candidate = `${base}-${n}`.slice(0, LIMITS.slug)
  }
  return `${base}-${Date.now()}`
}

const str = (value: unknown, max: number): string => (typeof value === 'string' ? value.trim().slice(0, max) : '')
const optional = (value: unknown, max: number): string | null => str(value, max) || null

// Returns a cleaned post or an error message. Only http(s) and site-relative cover URLs are accepted.
export function cleanPostInput(input: PostInput): { post?: CleanPost; error?: string } {
  const title = str(input.title, LIMITS.title)
  if (!title) return { error: 'Title is required' }

  const coverUrl = optional(input.cover_url, LIMITS.cover_url)
  if (coverUrl && !/^(https?:\/\/|\/)/.test(coverUrl)) return { error: 'Cover URL must start with http(s):// or /' }

  const tags = Array.isArray(input.tags)
    ? input.tags.filter((t): t is string => typeof t === 'string').map(t => t.trim().slice(0, 40)).filter(Boolean).slice(0, 10)
    : []

  return {
    post: {
      title,
      slug: slugify(str(input.slug, LIMITS.slug) || title),
      excerpt: str(input.excerpt, LIMITS.excerpt),
      body_md: str(input.body_md, LIMITS.body_md),
      cover_url: coverUrl,
      category: str(input.category, LIMITS.category) || 'general',
      tags,
      seo_title: optional(input.seo_title, LIMITS.seo_title),
      seo_description: optional(input.seo_description, LIMITS.seo_description),
    },
  }
}

export async function insertPost(db: D1Database, post: CleanPost, source: 'manual' | 'ai'): Promise<{ id: string; slug: string }> {
  const slug = await uniqueSlug(db, post.slug)
  const row = await db.prepare(
    `INSERT INTO posts (slug, title, excerpt, body_md, cover_url, category, tags, seo_title, seo_description, source)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`
  ).bind(slug, post.title, post.excerpt, post.body_md, post.cover_url, post.category, JSON.stringify(post.tags),
    post.seo_title, post.seo_description, source).first<{ id: string }>()
  return { id: row!.id, slug }
}

// D1 returns tags as a JSON string; expose them as an array
export function withParsedTags<T extends { tags?: unknown }>(row: T): T & { tags: string[] } {
  let tags: string[] = []
  try {
    const parsed = JSON.parse(String(row.tags ?? '[]'))
    if (Array.isArray(parsed)) tags = parsed
  } catch { /* keep empty */ }
  return { ...row, tags }
}
