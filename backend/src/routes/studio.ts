import { Hono } from 'hono'
import { Env } from '../types'
import { requireOwner, AuthPayload } from '../middleware/auth'
import { getAllContent, isContentKey } from '../utils/content'

// Owner-only Studio API (CMS, blog, AI settings). Every route here is locked to OWNER_EMAIL.
const studio = new Hono<{ Bindings: Env; Variables: { user: AuthPayload } }>()

studio.use('*', requireOwner)

const MAX_CONTENT_BYTES = 200_000

// ── Who am I (used by the Studio UI to confirm owner access) ──
studio.get('/me', (c) => {
  const user = c.get('user')
  return c.json({ success: true, user: { id: user.sub, name: user.name, email: user.email } })
})

// ── Site content (including owner-only chatbot fields) ──
studio.get('/content', async (c) => {
  try {
    return c.json({ success: true, content: await getAllContent(c.env.DB) })
  } catch (error) {
    console.error('Error loading studio content:', error)
    return c.json({ success: false, error: 'Failed to load content' }, 500)
  }
})

studio.put('/content/:key', async (c) => {
  const key = c.req.param('key')
  if (!isContentKey(key)) return c.json({ success: false, error: 'Unknown content key' }, 400)

  const body = await c.req.json<{ value?: unknown }>().catch(() => null)
  const value = body?.value
  if (value === null || typeof value !== 'object') {
    return c.json({ success: false, error: 'value must be a JSON object or array' }, 400)
  }

  const json = JSON.stringify(value)
  if (json.length > MAX_CONTENT_BYTES) {
    return c.json({ success: false, error: 'Content is too large' }, 413)
  }

  try {
    await c.env.DB.prepare(
      `INSERT INTO site_content (key, value, updated_at) VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`
    ).bind(key, json).run()
    return c.json({ success: true })
  } catch (error) {
    console.error('Error saving site content:', error)
    return c.json({ success: false, error: 'Failed to save content' }, 500)
  }
})

// ── Contact form inbox ──
studio.get('/messages', async (c) => {
  try {
    const rows = await c.env.DB.prepare(
      'SELECT id, name, email, message, created_at FROM portfolio_messages ORDER BY created_at DESC LIMIT 200'
    ).all()
    return c.json({ success: true, messages: rows.results })
  } catch (error) {
    console.error('Error loading messages:', error)
    return c.json({ success: false, error: 'Failed to load messages' }, 500)
  }
})

studio.delete('/messages/:id', async (c) => {
  try {
    await c.env.DB.prepare('DELETE FROM portfolio_messages WHERE id = ?').bind(c.req.param('id')).run()
    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting message:', error)
    return c.json({ success: false, error: 'Failed to delete message' }, 500)
  }
})

export default studio
