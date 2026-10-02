import { Hono } from 'hono'
import { Env } from '../types'
import { requireOwner, AuthPayload } from '../middleware/auth'
import { getAllContent, isContentKey } from '../utils/content'
import { cleanPostInput, insertPost, uniqueSlug, withParsedTags, PostInput } from '../utils/posts'

// Owner-only Studio API (CMS, blog, AI settings). Every route here is locked to OWNER_EMAIL.
const studio = new Hono<{ Bindings: Env; Variables: { user: AuthPayload } }>()

studio.use('*', requireOwner)

const MAX_CONTENT_BYTES = 200_000

// ── Who am I (used by the Studio UI to confirm owner access) ──
studio.get('/me', (c) => {
  const user = c.get('user')
  return c.json({ success: true, user: { id: user.sub, name: user.name, email: user.email } })
})

// ── Site content (including owner-only chatbot fields) ──
studio.get('/content', async (c) => {
  try {
    return c.json({ success: true, content: await getAllContent(c.env.DB) })
  } catch (error) {
    console.error('Error loading studio content:', error)
    return c.json({ success: false, error: 'Failed to load content' }, 500)
  }
})

studio.put('/content/:key', async (c) => {
  const key = c.req.param('key')
  if (!isContentKey(key)) return c.json({ success: false, error: 'Unknown content key' }, 400)

  const body = await c.req.json<{ value?: unknown }>().catch(() => null)
  const value = body?.value
  if (value === null || typeof value !== 'object') {
    return c.json({ success: false, error: 'value must be a JSON object or array' }, 400)
  }

  const json = JSON.stringify(value)
  if (json.length > MAX_CONTENT_BYTES) {
    return c.json({ success: false, error: 'Content is too large' }, 413)
  }

  try {
    await c.env.DB.prepare(
      `INSERT INTO site_content (key, value, updated_at) VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`
    ).bind(key, json).run()
    return c.json({ success: true })
  } catch (error) {
    console.error('Error saving site content:', error)
    return c.json({ success: false, error: 'Failed to save content' }, 500)
  }
})

// ── Contact form inbox ──
studio.get('/messages', async (c) => {
  try {
    const rows = await c.env.DB.prepare(
      'SELECT id, name, email, message, created_at FROM portfolio_messages ORDER BY created_at DESC LIMIT 200'
    ).all()
    return c.json({ success: true, messages: rows.results })
  } catch (error) {
    console.error('Error loading messages:', error)
    return c.json({ success: false, error: 'Failed to load messages' }, 500)
  }
})

studio.delete('/messages/:id', async (c) => {
  try {
    await c.env.DB.prepare('DELETE FROM portfolio_messages WHERE id = ?').bind(c.req.param('id')).run()
    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting message:', error)
    return c.json({ success: false, error: 'Failed to delete message' }, 500)
  }
})

// ── Blog posts (drafts + published) ──
studio.get('/posts', async (c) => {
  try {
    const rows = await c.env.DB.prepare(
      `SELECT id, slug, title, excerpt, category, tags, status, source, published_at, created_at, updated_at
       FROM posts ORDER BY created_at DESC LIMIT 500`
    ).all()
    return c.json({ success: true, posts: rows.results.map(withParsedTags) })
  } catch (error) {
    console.error('Error listing studio posts:', error)
    return c.json({ success: false, error: 'Failed to load posts' }, 500)
  }
})

studio.get('/posts/:id', async (c) => {
  const post = await c.env.DB.prepare('SELECT * FROM posts WHERE id = ?').bind(c.req.param('id')).first()
  if (!post) return c.json({ success: false, error: 'Post not found' }, 404)
  return c.json({ success: true, post: withParsedTags(post) })
})

studio.post('/posts', async (c) => {
  const { post, error } = cleanPostInput((await c.req.json<PostInput>().catch(() => ({}))) as PostInput)
  if (!post) return c.json({ success: false, error }, 400)
  try {
    const created = await insertPost(c.env.DB, post, 'manual')
    return c.json({ success: true, ...created }, 201)
  } catch (err) {
    console.error('Error creating post:', err)
    return c.json({ success: false, error: 'Failed to create post' }, 500)
  }
})

studio.patch('/posts/:id', async (c) => {
  const id = c.req.param('id')
  const body = (await c.req.json<PostInput & { status?: unknown }>().catch(() => ({}))) as PostInput & { status?: unknown }
  const existing = await c.env.DB.prepare('SELECT id, status, published_at FROM posts WHERE id = ?')
    .bind(id).first<{ id: string; status: string; published_at: string | null }>()
  if (!existing) return c.json({ success: false, error: 'Post not found' }, 404)

  const { post, error } = cleanPostInput(body)
  if (!post) return c.json({ success: false, error }, 400)

  const status = body.status === 'published' || body.status === 'draft' ? body.status : existing.status
  // Keep the original publish date when re-saving; set it the first time a post goes live
  const publishedAt = status === 'published' ? (existing.published_at || new Date().toISOString().slice(0, 19).replace('T', ' ')) : existing.published_at

  try {
    const slug = await uniqueSlug(c.env.DB, post.slug, id)
    await c.env.DB.prepare(
      `UPDATE posts SET slug = ?, title = ?, excerpt = ?, body_md = ?, cover_url = ?, category = ?, tags = ?,
         seo_title = ?, seo_description = ?, status = ?, published_at = ?, updated_at = datetime('now')
       WHERE id = ?`
    ).bind(slug, post.title, post.excerpt, post.body_md, post.cover_url, post.category, JSON.stringify(post.tags),
      post.seo_title, post.seo_description, status, publishedAt, id).run()
    return c.json({ success: true, slug, status })
  } catch (err) {
    console.error('Error updating post:', err)
    return c.json({ success: false, error: 'Failed to update post' }, 500)
  }
})

studio.delete('/posts/:id', async (c) => {
  try {
    await c.env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(c.req.param('id')).run()
    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return c.json({ success: false, error: 'Failed to delete post' }, 500)
  }
})

export default studio
