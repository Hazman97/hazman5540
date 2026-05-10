import { Hono } from 'hono'
import { Env } from '../types'

const office = new Hono<{ Bindings: Env }>()

office.get('/', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM office_baju ORDER BY name ASC'
  ).all()
  return c.json(results)
})

office.post('/', async (c) => {
  const body = await c.req.json<{ name: string; size: string }>()
  if (!body.name || !body.size) return c.json({ error: 'name and size required' }, 400)

  const result = await c.env.DB.prepare(
    'INSERT INTO office_baju (name, size) VALUES (?, ?) RETURNING id'
  ).bind(body.name, body.size).first<{ id: string }>()

  return c.json({ id: result?.id, name: body.name, size: body.size }, 201)
})

office.patch('/:id', async (c) => {
  const { id } = c.req.param()
  const body = await c.req.json<{ name?: string; size?: string }>()

  await c.env.DB.prepare(
    'UPDATE office_baju SET name = COALESCE(?, name), size = COALESCE(?, size) WHERE id = ?'
  ).bind(body.name ?? null, body.size ?? null, id).run()

  return c.json({ success: true })
})

office.delete('/:id', async (c) => {
  const { id } = c.req.param()
  await c.env.DB.prepare('DELETE FROM office_baju WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

export default office
