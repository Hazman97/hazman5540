import { Hono } from 'hono'
import { Env } from './types'
import { corsMiddleware } from './middleware/cors'
import authRouter from './routes/auth'
import attendanceRouter from './routes/attendance'
import birthdayRouter from './routes/birthday'
import orgchartRouter from './routes/orgchart'
import photocollectionRouter from './routes/photocollection'
import familyRouter from './routes/family'
import officeRouter from './routes/office'

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

// ── 404 Fallback ───────────────────────────────────────────
app.notFound((c) => c.json({ error: 'Route not found', path: c.req.path }, 404))
app.onError((err, c) => {
  console.error('Unhandled error:', err)
  return c.json({ error: 'Internal server error', message: err.message }, 500)
})

export default app
