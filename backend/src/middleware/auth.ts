import { Context, Next } from 'hono'
import { SignJWT, jwtVerify, JWTPayload } from 'jose'
import { Env } from '../types'

export interface AuthPayload extends JWTPayload {
  sub: string
  role: 'student' | 'admin'
  name: string
  email?: string
}

function getSecret(secret: string): Uint8Array {
  return new TextEncoder().encode(secret)
}

export async function signToken(payload: AuthPayload, secret: string): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecret(secret))
}

export async function verifyToken(token: string, secret: string): Promise<AuthPayload> {
  const { payload } = await jwtVerify(token, getSecret(secret))
  return payload as AuthPayload
}

// Middleware: require any valid JWT
export const requireAuth = async (c: Context<{ Bindings: Env; Variables: { user: AuthPayload } }>, next: Next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const token = authHeader.slice(7)
  try {
    const payload = await verifyToken(token, c.env.JWT_SECRET)
    c.set('user', payload)
    await next()
  } catch {
    return c.json({ error: 'Invalid or expired token' }, 401)
  }
}

// Middleware: require admin role
export const requireAdmin = async (c: Context<{ Bindings: Env; Variables: { user: AuthPayload } }>, next: Next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const token = authHeader.slice(7)
  try {
    const payload = await verifyToken(token, c.env.JWT_SECRET)
    if (payload.role !== 'admin') {
      return c.json({ error: 'Forbidden: admin only' }, 403)
    }
    c.set('user', payload)
    await next()
  } catch {
    return c.json({ error: 'Invalid or expired token' }, 401)
  }
}

// Middleware: require the site owner (email listed in OWNER_EMAIL + superadmin in DB)
export const requireOwner = async (c: Context<{ Bindings: Env; Variables: { user: AuthPayload } }>, next: Next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const token = authHeader.slice(7)
  let payload: AuthPayload
  try {
    payload = await verifyToken(token, c.env.JWT_SECRET)
  } catch {
    return c.json({ error: 'Invalid or expired token' }, 401)
  }

  // Fail closed: if OWNER_EMAIL is not configured, nobody gets in
  const owners = (c.env.OWNER_EMAIL || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)
  const email = payload.email?.toLowerCase()
  if (!email || !owners.includes(email)) {
    return c.json({ error: 'Forbidden: owner only' }, 403)
  }

  const sysUser = await c.env.DB.prepare('SELECT is_superadmin FROM system_users WHERE id = ? AND lower(email) = ?')
    .bind(payload.sub, email).first<{ is_superadmin: number }>()
  if (!sysUser || sysUser.is_superadmin !== 1) {
    return c.json({ error: 'Forbidden: owner only' }, 403)
  }

  c.set('user', payload)
  await next()
}

// Verify Google ID token via Google's tokeninfo endpoint
export async function verifyGoogleToken(idToken: string, clientId: string): Promise<{ sub: string; email: string; name: string; picture: string } | null> {
  try {
    const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`)
    if (!res.ok) return null
    const data = await res.json() as Record<string, string>
    if (data.aud !== clientId) return null
    return {
      sub: data.sub,
      email: data.email,
      name: data.name,
      picture: data.picture,
    }
  } catch {
    return null
  }
}
