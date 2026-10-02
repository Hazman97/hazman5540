import { Hono } from 'hono'
import type { ExecutionContext, ScheduledController } from '@cloudflare/workers-types'
import { Env } from './types'
import { runScheduledDraft } from './utils/blogGenerator'
import { corsMiddleware } from './middleware/cors'
import authRouter from './routes/auth'
import attendanceRouter from './routes/attendance'
import birthdayRouter from './routes/birthday'
import orgchartRouter from './routes/orgchart'
import photocollectionRouter from './routes/photocollection'
import familyRouter from './routes/family'
import officeRouter from './routes/office'
import { portfolioRoutes } from './routes/portfolio'
import { financeRoutes } from './routes/finance'
import systemRouter from './routes/system'
import proxyRouter from './routes/proxy'
import studioRouter from './routes/studio'
import contentRouter from './routes/content'
import blogRouter from './routes/blog'
import chatRouter from './routes/chat'

const app = new Hono<{ Bindings: Env }>()

// ── Global Middleware ──────────────────────────────────────
app.use('*', corsMiddleware)

// ── Health check ───────────────────────────────────────────
app.get('/', (c) => c.json({
  service: 'hazman5540 API',
  version: '2.0.0',
  database: 'hazman5540db (Cloudflare D1)',
  status: 'ok',
  timestamp: new Date().toISOString(),
}))

// ── Route Modules ──────────────────────────────────────────
app.route('/api/auth', authRouter)
app.route('/api/attendance', attendanceRouter)
app.route('/api/birthday', birthdayRouter)
app.route('/api/orgchart', orgchartRouter)
app.route('/api/photos', photocollectionRouter)
app.route('/api/family', familyRouter)
app.route('/api/office', officeRouter)
app.route('/api/portfolio', portfolioRoutes)
app.route('/api/finance', financeRoutes)
app.route('/api/system', systemRouter)
app.route('/api/proxy', proxyRouter)
app.route('/api/studio', studioRouter)
app.route('/api/content', contentRouter)
app.route('/api/blog', blogRouter)
app.route('/api/chat', chatRouter)

// ── 404 Fallback ───────────────────────────────────────────
app.notFound((c) => c.json({ error: 'Route not found', path: c.req.path }, 404))
app.onError((err, c) => {
  console.error('Unhandled error:', err)
  return c.json({ error: 'Internal server error', message: err.message }, 500)
})

export default {
  fetch: app.fetch,
  // Hourly cron (wrangler.toml [triggers]); the draft job checks its own schedule
  scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runScheduledDraft(env))
  },
}
