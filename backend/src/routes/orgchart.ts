import { Hono } from 'hono'
import { Env } from '../types'

const orgchart = new Hono<{ Bindings: Env }>()

// Create org chart
orgchart.post('/', async (c) => {
  const body = await c.req.json<{
    slug: string
    owner_token: string
    title?: string
    description?: string
    theme?: string
    custom_settings?: Record<string, unknown>
    chart_data?: unknown[]
  }>()

  if (!body.slug || !body.owner_token) {
    return c.json({ error: 'slug and owner_token required' }, 400)
  }

  const existing = await c.env.DB.prepare('SELECT id FROM org_charts WHERE slug = ?').bind(body.slug).first()
  if (existing) return c.json({ error: 'Slug already taken' }, 409)

  const result = await c.env.DB.prepare(`
    INSERT INTO org_charts (slug, owner_token, title, description, theme, custom_settings, chart_data)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    RETURNING id, slug
  `).bind(
    body.slug,
    body.owner_token,
    body.title ?? null,
    body.description ?? null,
    body.theme ?? 'default',
    JSON.stringify(body.custom_settings ?? {}),
    JSON.stringify(body.chart_data ?? [])
  ).first<{ id: string; slug: string }>()

  return c.json(result, 201)
})

// Get org chart by slug
orgchart.get('/:slug', async (c) => {
  const { slug } = c.req.param()
  const chart = await c.env.DB.prepare('SELECT * FROM org_charts WHERE slug = ?').bind(slug).first()
  if (!chart) return c.json({ error: 'Not found' }, 404)
  return c.json(chart)
})

// Update org chart (owner_token)
orgchart.patch('/:slug', async (c) => {
  const { slug } = c.req.param()
  const body = await c.req.json<Record<string, unknown> & { owner_token: string }>()

  const chart = await c.env.DB.prepare('SELECT owner_token FROM org_charts WHERE slug = ?')
    .bind(slug).first<{ owner_token: string }>()
  if (!chart) return c.json({ error: 'Not found' }, 404)
  if (chart.owner_token !== body.owner_token) return c.json({ error: 'Forbidden' }, 403)

  const { owner_token: _, ...fields } = body
  const allowed = ['title', 'description', 'theme', 'custom_settings', 'chart_data']

  const setClauses: string[] = ["updated_at = datetime('now')"]
  const values: unknown[] = []

  for (const key of allowed) {
    if (key in fields) {
      setClauses.push(`${key} = ?`)
      let val = fields[key]
      if (key === 'custom_settings' || key === 'chart_data') val = JSON.stringify(val)
      values.push(val)
    }
  }

  values.push(slug)
  await c.env.DB.prepare(`UPDATE org_charts SET ${setClauses.join(', ')} WHERE slug = ?`)
    .bind(...values).run()

  return c.json({ success: true })
})

// Delete org chart (owner_token)
orgchart.delete('/:slug', async (c) => {
  const { slug } = c.req.param()
  const { owner_token } = await c.req.json<{ owner_token: string }>()

  const chart = await c.env.DB.prepare('SELECT owner_token FROM org_charts WHERE slug = ?')
    .bind(slug).first<{ owner_token: string }>()
  if (!chart) return c.json({ error: 'Not found' }, 404)
  if (chart.owner_token !== owner_token) return c.json({ error: 'Forbidden' }, 403)

  await c.env.DB.prepare('DELETE FROM org_charts WHERE slug = ?').bind(slug).run()
  return c.json({ success: true })
})

// List all org charts (public — for demo listing)
orgchart.get('/', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT id, slug, title, description, theme, created_at FROM org_charts ORDER BY created_at DESC'
  ).all()
  return c.json(results)
})

export default orgchart
