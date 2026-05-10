import { Hono } from 'hono'
import { Env } from '../types'
import { AuthPayload, requireAuth, requireAdmin } from '../middleware/auth'
import { hashPassword, verifyPassword } from '../utils/crypto'

type Variables = { user: AuthPayload }

const attendance = new Hono<{ Bindings: Env; Variables: Variables }>()

// ── Admin Settings ──────────────────────────────────────────

attendance.get('/settings', requireAuth, async (c) => {
  const settings = await c.env.DB.prepare('SELECT * FROM admin_settings WHERE id = ?').bind('main').first()
  return c.json(settings || {})
})

attendance.patch('/settings', requireAdmin, async (c) => {
  const body = await c.req.json<{ office_lat?: number; office_lng?: number; geofence_radius?: number }>()
  await c.env.DB.prepare(
    'UPDATE admin_settings SET office_lat = ?, office_lng = ?, geofence_radius = ?, updated_at = datetime(\'now\') WHERE id = ?'
  ).bind(body.office_lat ?? null, body.office_lng ?? null, body.geofence_radius ?? 200, 'main').run()
  return c.json({ success: true })
})

// ── Student Management (Admin Only) ────────────────────────

attendance.get('/students', requireAdmin, async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT id, name, username, department, is_active, created_at FROM attendance_students ORDER BY created_at DESC'
  ).all()
  return c.json(results)
})

attendance.post('/students', requireAdmin, async (c) => {
  const body = await c.req.json<{ name: string; username: string; password: string; department?: string }>()
  if (!body.name || !body.username || !body.password) {
    return c.json({ error: 'name, username, password required' }, 400)
  }

  // Check username uniqueness
  const existing = await c.env.DB.prepare('SELECT id FROM attendance_students WHERE username = ?').bind(body.username).first()
  if (existing) return c.json({ error: 'Username already exists' }, 409)

  const hashed = await hashPassword(body.password)
  const result = await c.env.DB.prepare(
    'INSERT INTO attendance_students (name, username, password, department) VALUES (?, ?, ?, ?) RETURNING id'
  ).bind(body.name, body.username, hashed, body.department ?? null).first<{ id: string }>()

  return c.json({ id: result?.id, name: body.name, username: body.username, department: body.department }, 201)
})

attendance.patch('/students/:id', requireAdmin, async (c) => {
  const { id } = c.req.param()
  const body = await c.req.json<{ name?: string; department?: string; is_active?: number; password?: string }>()

  let passwordClause = ''
  let hashedPassword: string | undefined
  if (body.password) {
    hashedPassword = await bcrypt.hash(body.password, 10)
    passwordClause = ', password = ?'
  }

  const stmt = c.env.DB.prepare(
    `UPDATE attendance_students SET name = COALESCE(?, name), department = COALESCE(?, department), is_active = COALESCE(?, is_active)${passwordClause} WHERE id = ?`
  )

  if (hashedPassword) {
    await stmt.bind(body.name ?? null, body.department ?? null, body.is_active ?? null, hashedPassword, id).run()
  } else {
    await stmt.bind(body.name ?? null, body.department ?? null, body.is_active ?? null, id).run()
  }

  return c.json({ success: true })
})

attendance.delete('/students/:id', requireAdmin, async (c) => {
  const { id } = c.req.param()
  await c.env.DB.prepare('DELETE FROM attendance_students WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

// ── Clock In / Clock Out ────────────────────────────────────

attendance.post('/clock-in', requireAuth, async (c) => {
  const user = c.get('user')
  const body = await c.req.json<{
    is_clock_in_outside?: boolean
    clock_in_photo_url?: string
    reason?: string
  }>()

  // Check if already clocked in today without clock out
  const today = new Date().toISOString().slice(0, 10)
  const existing = await c.env.DB.prepare(
    'SELECT id FROM attendance_logs WHERE student_id = ? AND clock_in_time LIKE ? AND clock_out_time IS NULL'
  ).bind(user.sub, `${today}%`).first()

  if (existing) return c.json({ error: 'Already clocked in today' }, 409)

  const result = await c.env.DB.prepare(
    'INSERT INTO attendance_logs (student_id, student_name, clock_in_time, is_clock_in_outside, clock_in_photo_url, reason) VALUES (?, ?, datetime(\'now\'), ?, ?, ?) RETURNING id, clock_in_time'
  ).bind(user.sub, user.name, body.is_clock_in_outside ? 1 : 0, body.clock_in_photo_url ?? null, body.reason ?? null)
    .first<{ id: string; clock_in_time: string }>()

  return c.json(result, 201)
})

attendance.post('/clock-out', requireAuth, async (c) => {
  const user = c.get('user')
  const body = await c.req.json<{ log_id: string; is_clock_out_outside?: boolean; clock_out_photo_url?: string }>()

  const log = await c.env.DB.prepare(
    'SELECT id, clock_in_time FROM attendance_logs WHERE id = ? AND student_id = ? AND clock_out_time IS NULL'
  ).bind(body.log_id, user.sub).first<{ id: string; clock_in_time: string }>()

  if (!log) return c.json({ error: 'Active clock-in not found' }, 404)

  const now = new Date()
  const clockIn = new Date(log.clock_in_time)
  const totalHours = (now.getTime() - clockIn.getTime()) / 3600000

  await c.env.DB.prepare(
    `UPDATE attendance_logs SET clock_out_time = datetime('now'), is_clock_out_outside = ?, clock_out_photo_url = ?, total_hours = ? WHERE id = ?`
  ).bind(body.is_clock_out_outside ? 1 : 0, body.clock_out_photo_url ?? null, Math.round(totalHours * 100) / 100, log.id).run()

  return c.json({ success: true, total_hours: Math.round(totalHours * 100) / 100 })
})

// ── Attendance Logs ─────────────────────────────────────────

attendance.get('/logs', requireAuth, async (c) => {
  const user = c.get('user')
  const { studentId, startDate, endDate } = c.req.query()

  let query: string
  let bindings: unknown[]

  if (user.role === 'admin') {
    // Admin can see all or filter by student
    if (studentId) {
      query = 'SELECT * FROM attendance_logs WHERE student_id = ? ORDER BY clock_in_time DESC'
      bindings = [studentId]
    } else {
      query = 'SELECT * FROM attendance_logs ORDER BY clock_in_time DESC'
      bindings = []
    }
  } else {
    // Student sees only own logs
    query = 'SELECT * FROM attendance_logs WHERE student_id = ? ORDER BY clock_in_time DESC'
    bindings = [user.sub]
  }

  if (startDate && endDate) {
    query = query.replace('ORDER BY', `AND clock_in_time BETWEEN '${startDate}' AND '${endDate} 23:59:59' ORDER BY`)
  }

  const stmt = c.env.DB.prepare(query)
  const { results } = bindings.length ? await stmt.bind(...bindings).all() : await stmt.all()
  return c.json(results)
})

// ── Today's active log (for student dashboard) ─────────────

attendance.get('/today', requireAuth, async (c) => {
  const user = c.get('user')
  const today = new Date().toISOString().slice(0, 10)
  const log = await c.env.DB.prepare(
    'SELECT * FROM attendance_logs WHERE student_id = ? AND clock_in_time LIKE ? ORDER BY clock_in_time DESC LIMIT 1'
  ).bind(user.sub, `${today}%`).first()
  return c.json(log || null)
})

// ── Leave Requests ──────────────────────────────────────────

attendance.get('/leaves', requireAuth, async (c) => {
  const user = c.get('user')
  let results

  if (user.role === 'admin') {
    const { results: r } = await c.env.DB.prepare(
      'SELECT * FROM leave_requests ORDER BY created_at DESC'
    ).all()
    results = r
  } else {
    const { results: r } = await c.env.DB.prepare(
      'SELECT * FROM leave_requests WHERE student_id = ? ORDER BY created_at DESC'
    ).bind(user.sub).all()
    results = r
  }

  return c.json(results)
})

attendance.post('/leaves', requireAuth, async (c) => {
  const user = c.get('user')
  const body = await c.req.json<{
    leave_type: string
    start_date: string
    end_date: string
    reason?: string
  }>()

  if (!body.leave_type || !body.start_date || !body.end_date) {
    return c.json({ error: 'leave_type, start_date, end_date required' }, 400)
  }

  const result = await c.env.DB.prepare(
    'INSERT INTO leave_requests (student_id, student_name, leave_type, start_date, end_date, reason) VALUES (?, ?, ?, ?, ?, ?) RETURNING id'
  ).bind(user.sub, user.name, body.leave_type, body.start_date, body.end_date, body.reason ?? null)
    .first<{ id: string }>()

  return c.json({ id: result?.id }, 201)
})

attendance.patch('/leaves/:id', requireAdmin, async (c) => {
  const { id } = c.req.param()
  const { status } = await c.req.json<{ status: 'approved' | 'rejected' }>()
  if (!['approved', 'rejected'].includes(status)) {
    return c.json({ error: 'status must be approved or rejected' }, 400)
  }
  await c.env.DB.prepare('UPDATE leave_requests SET status = ? WHERE id = ?').bind(status, id).run()
  return c.json({ success: true })
})

export default attendance
