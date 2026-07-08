import { Hono } from 'hono'
import { Env } from '../types'

const proxyRouter = new Hono<{ Bindings: Env }>()

proxyRouter.post('/ai', async (c) => {
  try {
    const body = await c.req.json()
    const { targetUrl, headers, payload } = body

    if (!targetUrl) {
      return c.json({ error: 'targetUrl is required' }, 400)
    }

    // Forward the request to the target URL
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: headers || {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    // Read the response from the target
    const data = await response.json().catch(() => ({}))

    // Forward the exact status code
    return c.json(data, response.status as any)
  } catch (error: any) {
    console.error('Proxy error:', error)
    return c.json({ error: 'Proxy request failed', details: error.message }, 500)
  }
})

export default proxyRouter
