import { Hono } from 'hono'
import { Env } from '../types'
import { requireAuth } from '../middleware/auth'

const system = new Hono<{ Bindings: Env }>()

// Apply auth middleware to all system routes
system.use('*', requireAuth)

// Extra middleware to ensure only superadmins can access this
system.use('*', async (c, next) => {
  const user = c.get('user')
  const db = c.env.DB
  
  if (!user || !user.sub) return c.json({ error: 'Unauthorized' }, 401)
  
  const sysUser = await db.prepare('SELECT is_superadmin FROM system_users WHERE id = ?').bind(user.sub).first<{ is_superadmin: number }>()
  if (!sysUser || sysUser.is_superadmin !== 1) {
    return c.json({ error: 'Forbidden: Superadmin access required' }, 403)
  }
  
  await next()
})

// ── Get all users and their permissions ──────────────────────
system.get('/users', async (c) => {
  try {
    const db = c.env.DB
    const users = await db.prepare('SELECT id, email, name, picture, is_superadmin, created_at FROM system_users ORDER BY created_at DESC').all()
    const permissions = await db.prepare('SELECT user_id, project FROM user_permissions').all()

    const usersWithPerms = users.results.map(u => ({
      ...u,
      permissions: permissions.results.filter(p => p.user_id === u.id).map(p => p.project)
    }))

    return c.json({ success: true, users: usersWithPerms })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch users' }, 500)
  }
})

// ── Add a new authorized email ───────────────────────────────
system.post('/users', async (c) => {
  try {
    const { email, name } = await c.req.json<{ email: string, name: string }>()
    if (!email) return c.json({ error: 'Email is required' }, 400)

    const db = c.env.DB
    await db.prepare('INSERT INTO system_users (email, name) VALUES (?, ?)')
      .bind(email, name || email.split('@')[0]).run()
    
    return c.json({ success: true })
  } catch (error: any) {
    if (error.message?.includes('UNIQUE constraint failed')) {
      return c.json({ success: false, error: 'Email already authorized' }, 409)
    }
    return c.json({ success: false, error: 'Failed to add user' }, 500)
  }
})

// ── Toggle a project permission for a user ───────────────────
system.post('/permissions/toggle', async (c) => {
  try {
    const { user_id, project } = await c.req.json<{ user_id: string, project: string }>()
    if (!user_id || !project) return c.json({ error: 'user_id and project required' }, 400)

    const db = c.env.DB
    const existing = await db.prepare('SELECT id FROM user_permissions WHERE user_id = ? AND project = ?')
      .bind(user_id, project).first()

    if (existing) {
      await db.prepare('DELETE FROM user_permissions WHERE user_id = ? AND project = ?')
        .bind(user_id, project).run()
      return c.json({ success: true, status: 'removed' })
    } else {
      await db.prepare('INSERT INTO user_permissions (user_id, project) VALUES (?, ?)')
        .bind(user_id, project).run()
      return c.json({ success: true, status: 'added' })
    }
  } catch (error) {
    return c.json({ success: false, error: 'Failed to toggle permission' }, 500)
  }
})

// ── Delete a user completely ─────────────────────────────────
system.delete('/users/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const user = c.get('user')

    // Prevent deleting oneself
    if (id === user.sub) {
      return c.json({ success: false, error: 'Cannot delete yourself' }, 400)
    }

    const db = c.env.DB
    await db.prepare('DELETE FROM system_users WHERE id = ?').bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete user' }, 500)
  }
})

export default system
