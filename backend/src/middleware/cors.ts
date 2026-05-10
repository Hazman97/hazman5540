import { Context, Next } from 'hono'
import { Env } from '../types'

const ALLOWED_ORIGINS = [
  'https://hazman5540.pages.dev',
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:4173',
]

export const corsMiddleware = async (c: Context<{ Bindings: Env }>, next: Next) => {
  const origin = c.req.header('Origin') || ''
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]

  // Handle preflight
  if (c.req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  await next()

  c.res.headers.set('Access-Control-Allow-Origin', allowedOrigin)
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}
