import { Hono } from 'hono'
import { Env } from '../types'

const family = new Hono<{ Bindings: Env }>()

family.get('/', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM family_members ORDER BY family_order ASC, name ASC'
  ).all()
  return c.json(results)
})

family.post('/', async (c) => {
  const body = await c.req.json<{
    name: string
    group_name?: string
    family_order?: number
    role?: string
    age?: number
    size?: string
    gender?: string
  }>()
  if (!body.name) return c.json({ error: 'name required' }, 400)

  const result = await c.env.DB.prepare(`
    INSERT INTO family_members (name, group_name, family_order, role, age, size, gender)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    RETURNING id
  `).bind(
    body.name,
    body.group_name ?? null,
    body.family_order ?? null,
    body.role ?? null,
    body.age ?? null,
    body.size ?? null,
    body.gender ?? null,
  ).first<{ id: string }>()

  return c.json({ id: result?.id, ...body }, 201)
})

family.patch('/:id', async (c) => {
  const { id } = c.req.param()
  const body = await c.req.json<Record<string, unknown>>()
  const allowed = ['name', 'group_name', 'family_order', 'role', 'age', 'size', 'gender']

  const setClauses: string[] = []
  const values: unknown[] = []

  for (const key of allowed) {
    if (key in body) {
      setClauses.push(`${key} = ?`)
      values.push(body[key])
    }
  }

  if (setClauses.length === 0) return c.json({ error: 'No fields to update' }, 400)
  values.push(id)

  await c.env.DB.prepare(`UPDATE family_members SET ${setClauses.join(', ')} WHERE id = ?`)
    .bind(...values).run()

  return c.json({ success: true })
})

family.delete('/:id', async (c) => {
  const { id } = c.req.param()
  await c.env.DB.prepare('DELETE FROM family_members WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

export default family
