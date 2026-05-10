import { Hono } from 'hono'
import { Env } from '../types'
import { AuthPayload, requireAdmin } from '../middleware/auth'

type Variables = { user: AuthPayload }

const birthday = new Hono<{ Bindings: Env; Variables: Variables }>()

// ── Birthday Pages ──────────────────────────────────────────

// Create a new birthday page
birthday.post('/pages', async (c) => {
  const body = await c.req.json<{
    owner_token: string
    slug: string
    title?: string
    person_name?: string
    subtitle?: string
    hero_image_url?: string
    template?: string
    youtube_video_id?: string
    youtube_start_time?: number
    memories_video_id?: string
    use_video_sound?: boolean
    settings?: Record<string, unknown>
    wishes_require_approval?: boolean
  }>()

  if (!body.owner_token || !body.slug) {
    return c.json({ error: 'owner_token and slug required' }, 400)
  }

  // Check slug uniqueness
  const existing = await c.env.DB.prepare('SELECT id FROM birthday_pages WHERE slug = ?').bind(body.slug).first()
  if (existing) return c.json({ error: 'Slug already taken' }, 409)

  const result = await c.env.DB.prepare(`
    INSERT INTO birthday_pages
      (owner_token, slug, title, person_name, subtitle, hero_image_url, template, youtube_video_id, youtube_start_time, memories_video_id, use_video_sound, settings, wishes_require_approval)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING id, slug
  `).bind(
    body.owner_token,
    body.slug,
    body.title ?? null,
    body.person_name ?? null,
    body.subtitle ?? null,
    body.hero_image_url ?? null,
    body.template ?? 'default',
    body.youtube_video_id ?? null,
    body.youtube_start_time ?? 0,
    body.memories_video_id ?? null,
    body.use_video_sound ? 1 : 0,
    JSON.stringify(body.settings ?? {}),
    body.wishes_require_approval ? 1 : 0,
  ).first<{ id: string; slug: string }>()

  return c.json(result, 201)
})

// Get page by slug (public)
birthday.get('/pages/:slug', async (c) => {
  const { slug } = c.req.param()
  const page = await c.env.DB.prepare('SELECT * FROM birthday_pages WHERE slug = ?').bind(slug).first()
  if (!page) return c.json({ error: 'Not found' }, 404)
  return c.json(page)
})

// Update page (owner_token check)
birthday.patch('/pages/:id', async (c) => {
  const { id } = c.req.param()
  const body = await c.req.json<Record<string, unknown> & { owner_token: string }>()

  const page = await c.env.DB.prepare('SELECT owner_token FROM birthday_pages WHERE id = ?').bind(id).first<{ owner_token: string }>()
  if (!page) return c.json({ error: 'Not found' }, 404)
  if (page.owner_token !== body.owner_token) return c.json({ error: 'Forbidden' }, 403)

  const { owner_token: _, ...fields } = body

  // Build dynamic update
  const allowed = ['title', 'person_name', 'subtitle', 'hero_image_url', 'template',
    'youtube_video_id', 'youtube_start_time', 'memories_video_id', 'use_video_sound',
    'settings', 'wishes_require_approval']

  const setClauses: string[] = ["updated_at = datetime('now')"]
  const values: unknown[] = []

  for (const key of allowed) {
    if (key in fields) {
      setClauses.push(`${key} = ?`)
      let val = fields[key]
      if (key === 'settings' && typeof val === 'object') val = JSON.stringify(val)
      if (key === 'use_video_sound' || key === 'wishes_require_approval') val = val ? 1 : 0
      values.push(val)
    }
  }

  values.push(id)
  await c.env.DB.prepare(`UPDATE birthday_pages SET ${setClauses.join(', ')} WHERE id = ?`)
    .bind(...values).run()

  return c.json({ success: true })
})

// Delete page (owner_token check)
birthday.delete('/pages/:id', async (c) => {
  const { owner_token } = await c.req.json<{ owner_token: string }>()
  const page = await c.env.DB.prepare('SELECT owner_token FROM birthday_pages WHERE id = ?')
    .bind(c.req.param('id')).first<{ owner_token: string }>()
  if (!page) return c.json({ error: 'Not found' }, 404)
  if (page.owner_token !== owner_token) return c.json({ error: 'Forbidden' }, 403)
  await c.env.DB.prepare('DELETE FROM birthday_pages WHERE id = ?').bind(c.req.param('id')).run()
  return c.json({ success: true })
})

// Admin: list all pages
birthday.get('/admin', requireAdmin, async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT id, slug, title, person_name, created_at FROM birthday_pages ORDER BY created_at DESC'
  ).all()
  return c.json(results)
})

// ── Birthday Wishes ─────────────────────────────────────────

// Get wishes for a page
birthday.get('/pages/:slug/wishes', async (c) => {
  const { slug } = c.req.param()
  const page = await c.env.DB.prepare('SELECT id, wishes_require_approval FROM birthday_pages WHERE slug = ?')
    .bind(slug).first<{ id: string; wishes_require_approval: number }>()
  if (!page) return c.json({ error: 'Not found' }, 404)

  const { results } = await c.env.DB.prepare(
    'SELECT * FROM birthday_wishes WHERE page_id = ? AND status = ? ORDER BY created_at DESC'
  ).bind(page.id, page.wishes_require_approval ? 'approved' : 'pending').all()

  return c.json(results)
})

// Submit a wish (public)
birthday.post('/pages/:slug/wishes', async (c) => {
  const { slug } = c.req.param()
  const page = await c.env.DB.prepare('SELECT id, wishes_require_approval FROM birthday_pages WHERE slug = ?')
    .bind(slug).first<{ id: string; wishes_require_approval: number }>()
  if (!page) return c.json({ error: 'Not found' }, 404)

  const body = await c.req.json<{ name?: string; message: string }>()
  if (!body.message) return c.json({ error: 'message required' }, 400)

  const status = page.wishes_require_approval ? 'pending' : 'approved'
  const result = await c.env.DB.prepare(
    'INSERT INTO birthday_wishes (page_id, name, message, status) VALUES (?, ?, ?, ?) RETURNING id'
  ).bind(page.id, body.name ?? 'Anonymous', body.message, status).first<{ id: string }>()

  return c.json({ id: result?.id, status }, 201)
})

// Approve or reject a wish (owner_token or admin)
birthday.patch('/wishes/:id', async (c) => {
  const { id } = c.req.param()
  const body = await c.req.json<{ status: 'approved' | 'rejected'; owner_token?: string }>()
  if (!['approved', 'rejected'].includes(body.status)) {
    return c.json({ error: 'status must be approved or rejected' }, 400)
  }

  if (body.owner_token) {
    // Validate owner_token via join
    const wish = await c.env.DB.prepare(`
      SELECT w.id FROM birthday_wishes w
      JOIN birthday_pages p ON p.id = w.page_id
      WHERE w.id = ? AND p.owner_token = ?
    `).bind(id, body.owner_token).first()
    if (!wish) return c.json({ error: 'Forbidden or not found' }, 403)
  }

  await c.env.DB.prepare('UPDATE birthday_wishes SET status = ? WHERE id = ?').bind(body.status, id).run()
  return c.json({ success: true })
})

export default birthday
