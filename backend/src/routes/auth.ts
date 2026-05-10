import { Hono } from 'hono'
import { Env } from '../types'
import { signToken, verifyGoogleToken, AuthPayload } from '../middleware/auth'
import { hashPassword, verifyPassword } from '../utils/crypto'

const auth = new Hono<{ Bindings: Env }>()

// ── Google OAuth Login ──────────────────────────────────────
auth.post('/google', async (c) => {
  const { idToken, role } = await c.req.json<{ idToken: string; role?: 'student' | 'admin' }>()
  if (!idToken) return c.json({ error: 'idToken required' }, 400)

  const googleUser = await verifyGoogleToken(idToken, c.env.GOOGLE_CLIENT_ID)
  if (!googleUser) return c.json({ error: 'Invalid Google token' }, 401)

  const payload: AuthPayload = {
    sub: googleUser.sub,
    role: role || 'admin',
    name: googleUser.name,
    email: googleUser.email,
  }

  const token = await signToken(payload, c.env.JWT_SECRET)
  return c.json({
    token,
    user: { name: googleUser.name, email: googleUser.email, picture: googleUser.picture, role: payload.role }
  })
})

// ── Student Login (username + password → JWT) ──
auth.post('/student/login', async (c) => {
  const { username, password } = await c.req.json<{ username: string; password: string }>()
  if (!username || !password) return c.json({ error: 'username and password required' }, 400)

  const student = await c.env.DB.prepare(
    'SELECT * FROM attendance_students WHERE username = ? AND is_active = 1'
  ).bind(username).first<{ id: string; name: string; username: string; password: string; department: string }>()

  if (!student) return c.json({ error: 'Invalid credentials' }, 401)

  const valid = await verifyPassword(password, student.password)
  if (!valid) return c.json({ error: 'Invalid credentials' }, 401)

  const payload: AuthPayload = { sub: student.id, role: 'student', name: student.name }
  const token = await signToken(payload, c.env.JWT_SECRET)
  return c.json({
    token,
    user: { id: student.id, name: student.name, username: student.username, department: student.department, role: 'student' }
  })
})

// ── Admin Login (username + password → JWT) ──
auth.post('/admin/login', async (c) => {
  const { username, password } = await c.req.json<{ username: string; password: string }>()
  if (!username || !password) return c.json({ error: 'username and password required' }, 400)

  const admin = await c.env.DB.prepare(
    'SELECT * FROM attendance_admins WHERE username = ?'
  ).bind(username).first<{ id: string; name: string; username: string; password: string }>()

  if (!admin) return c.json({ error: 'Invalid credentials' }, 401)

  const valid = await verifyPassword(password, admin.password)
  if (!valid) return c.json({ error: 'Invalid credentials' }, 401)

  const payload: AuthPayload = { sub: admin.id, role: 'admin', name: admin.name }
  const token = await signToken(payload, c.env.JWT_SECRET)
  return c.json({
    token,
    user: { id: admin.id, name: admin.name, username: admin.username, role: 'admin' }
  })
})

// ── Seed Admin (only in dev / first-time setup) ──
auth.post('/admin/seed', async (c) => {
  if (c.env.ENVIRONMENT === 'production') {
    return c.json({ error: 'Not available in production' }, 403)
  }
  const { username, password, name } = await c.req.json<{ username: string; password: string; name: string }>()
  const hashed = await hashPassword(password)
  const existing = await c.env.DB.prepare('SELECT id FROM attendance_admins WHERE username = ?').bind(username).first()
  if (existing) return c.json({ error: 'Admin already exists' }, 409)
  const result = await c.env.DB.prepare(
    'INSERT INTO attendance_admins (username, password, name) VALUES (?, ?, ?) RETURNING id'
  ).bind(username, hashed, name).first<{ id: string }>()
  return c.json({ id: result?.id }, 201)
})

export { hashPassword }
export default auth
