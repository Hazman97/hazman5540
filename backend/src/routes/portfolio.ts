import { Hono } from 'hono'
import { D1Database } from '@cloudflare/workers-types'

export const portfolioRoutes = new Hono<{ Bindings: { DB: D1Database } }>()

// Hash the visitor IP to maintain privacy (GDPR compliance)
async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(ip + 'hazman5540-salt')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

portfolioRoutes.post('/visitor', async (c) => {
  try {
    // 1. Get the visitor IP securely from Cloudflare headers
    const ip = c.req.header('cf-connecting-ip') || 'unknown'

    // 2. Hash the IP to maintain privacy (GDPR compliance)
    const ipHash = await hashIp(ip)

    const db = c.env.DB

    // 3. Upsert the visitor into the database
    // Using simple INSERT OR IGNORE since we don't have a UNIQUE constraint except PRIMARY KEY
    await db.prepare(
      `INSERT INTO portfolio_visitors (ip_hash, last_visit)
       VALUES (?, datetime('now'))
       ON CONFLICT(ip_hash) DO UPDATE SET last_visit = datetime('now')`
    ).bind(ipHash).run()

    // 4. Get the total unique visitor count
    const result = await db.prepare('SELECT COUNT(*) as count FROM portfolio_visitors').first()

    return c.json({ success: true, count: result?.count || 0 })
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return c.json({ success: false, error: 'Failed to track visitor' }, 500)
  }
})

// ── Contact form submission (public) ─────────────────────────
const CONTACT_LIMIT_PER_HOUR = 5
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

portfolioRoutes.post('/contact', async (c) => {
  try {
    const body = await c.req.json<{ name?: unknown; email?: unknown; message?: unknown }>().catch(() => null)
    const name = typeof body?.name === 'string' ? body.name.trim() : ''
    const email = typeof body?.email === 'string' ? body.email.trim() : ''
    const message = typeof body?.message === 'string' ? body.message.trim() : ''

    if (!name || !email || !message) {
      return c.json({ success: false, error: 'Name, email and message are required' }, 400)
    }
    if (name.length > 100 || email.length > 254 || message.length > 2000) {
      return c.json({ success: false, error: 'One of the fields is too long' }, 400)
    }
    if (!EMAIL_PATTERN.test(email)) {
      return c.json({ success: false, error: 'Please enter a valid email address' }, 400)
    }

    const ipHash = await hashIp(c.req.header('cf-connecting-ip') || 'unknown')
    const db = c.env.DB

    const recent = await db.prepare(
      `SELECT COUNT(*) as count FROM portfolio_messages
       WHERE ip_hash = ? AND created_at > datetime('now', '-1 hour')`
    ).bind(ipHash).first<{ count: number }>()
    if ((recent?.count || 0) >= CONTACT_LIMIT_PER_HOUR) {
      return c.json({ success: false, error: 'Too many messages. Please try again later.' }, 429)
    }

    await db.prepare(
      'INSERT INTO portfolio_messages (name, email, message, ip_hash) VALUES (?, ?, ?, ?)'
    ).bind(name, email, message, ipHash).run()

    return c.json({ success: true })
  } catch (error) {
    console.error('Error saving contact message:', error)
    return c.json({ success: false, error: 'Failed to send message' }, 500)
  }
})
