import { Hono } from 'hono'
import { Env } from '../types'
import { signToken, verifyGoogleToken, AuthPayload } from '../middleware/auth'
import { hashPassword, verifyPassword } from '../utils/crypto'

const auth = new Hono<{ Bindings: Env }>()

// ── Centralized Google OAuth & RBAC ──────────────────────
auth.post('/google', async (c) => {
  const { idToken } = await c.req.json<{ idToken: string }>()
  if (!idToken) return c.json({ error: 'idToken required' }, 400)

  const googleUser = await verifyGoogleToken(idToken, c.env.GOOGLE_CLIENT_ID)
  if (!googleUser) return c.json({ error: 'Invalid Google token' }, 401)

  const db = c.env.DB

  // 1. Check if the database has ANY system_users. If 0, this first login becomes the superadmin!
  const userCountRes = await db.prepare('SELECT COUNT(*) as c FROM system_users').first<{ c: number }>()
  const isFirstUser = userCountRes && userCountRes.c === 0

  let sysUser = await db.prepare('SELECT * FROM system_users WHERE email = ?').bind(googleUser.email).first<{ id: string, email: string, name: string, is_superadmin: number }>()

  if (isFirstUser) {
    // Auto-create the superadmin
    await db.prepare('INSERT INTO system_users (email, name, picture, is_superadmin) VALUES (?, ?, ?, 1)')
      .bind(googleUser.email, googleUser.name, googleUser.picture).run()
    sysUser = await db.prepare('SELECT * FROM system_users WHERE email = ?').bind(googleUser.email).first<{ id: string, email: string, name: string, is_superadmin: number }>()
  } else if (!sysUser) {
    // Not the first user, and not explicitly added by superadmin -> REJECT
    return c.json({ error: 'Unauthorized email. Please contact the administrator to grant access.' }, 403)
  } else {
    // User exists. Update their name/picture in case it changed on Google's end
    await db.prepare('UPDATE system_users SET name = ?, picture = ? WHERE email = ?')
      .bind(googleUser.name, googleUser.picture, googleUser.email).run()
  }

  // Fetch their allowed projects
  const permsRes = await db.prepare('SELECT project FROM user_permissions WHERE user_id = ?').bind(sysUser!.id).all<{ project: string }>()
  const allowedProjects = permsRes.results.map(p => p.project)

  // Add the superadmin flag to the payload so the frontend can render the Management Dashboard link
  const payload: AuthPayload & { permissions: string[], is_superadmin: boolean } = {
    sub: sysUser!.id,
    role: 'admin', // Deprecated concept, replaced by permissions, but kept for legacy fallback
    name: sysUser!.name,
    email: sysUser!.email,
    permissions: allowedProjects,
    is_superadmin: sysUser!.is_superadmin === 1
  }

  const token = await signToken(payload, c.env.JWT_SECRET)
  
  return c.json({
    token,
    user: { 
      id: sysUser!.id,
      name: sysUser!.name, 
      email: sysUser!.email, 
      picture: googleUser.picture, 
      is_superadmin: sysUser!.is_superadmin === 1,
      permissions: allowedProjects 
    }
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
