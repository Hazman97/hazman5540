import { Hono } from 'hono'
import { D1Database } from '@cloudflare/workers-types'

export const portfolioRoutes = new Hono<{ Bindings: { DB: D1Database } }>()

portfolioRoutes.post('/visitor', async (c) => {
  try {
    // 1. Get the visitor IP securely from Cloudflare headers
    const ip = c.req.header('cf-connecting-ip') || 'unknown'
    
    // 2. Hash the IP to maintain privacy (GDPR compliance)
    const encoder = new TextEncoder()
    const data = encoder.encode(ip + 'hazman5540-salt')
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const ipHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

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
