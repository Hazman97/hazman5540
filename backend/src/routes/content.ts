import { Hono } from 'hono'
import { Env } from '../types'
import { getAllContent, toPublicContent } from '../utils/content'

// Public, read-only portfolio content edited from Studio
const content = new Hono<{ Bindings: Env }>()

content.get('/', async (c) => {
  try {
    const all = await getAllContent(c.env.DB)
    c.header('Cache-Control', 'public, max-age=60')
    return c.json({ success: true, content: toPublicContent(all) })
  } catch (error) {
    console.error('Error loading site content:', error)
    return c.json({ success: false, error: 'Failed to load content' }, 500)
  }
})

export default content
