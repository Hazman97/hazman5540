import { Hono } from 'hono'
import { Env } from '../types'
import { requireOwner, AuthPayload } from '../middleware/auth'

// Owner-only Studio API (CMS, blog, AI settings). Every route here is locked to OWNER_EMAIL.
const studio = new Hono<{ Bindings: Env; Variables: { user: AuthPayload } }>()

studio.use('*', requireOwner)

// ── Who am I (used by the Studio UI to confirm owner access) ──
studio.get('/me', (c) => {
  const user = c.get('user')
  return c.json({ success: true, user: { id: user.sub, name: user.name, email: user.email } })
})

export default studio
