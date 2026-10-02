import { Hono } from 'hono'
import { Env } from '../types'
import { requireOwner, AuthPayload } from '../middleware/auth'
import { getAllContent, isContentKey } from '../utils/content'
import { cleanPostInput, insertPost, uniqueSlug, withParsedTags, PostInput } from '../utils/posts'
import { isAiConfigured } from '../utils/aiClient'
import { computeNextRun, generateDraft, getAiSettings } from '../utils/blogGenerator'

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

// ── AI article drafts: schedule, topic queue, run log ──
studio.get('/ai', async (c) => {
  try {
    const settings = await getAiSettings(c.env)
    const topics = await c.env.DB.prepare('SELECT id, topic, category, used, created_at FROM topic_queue ORDER BY used, created_at LIMIT 100').all()
    const runs = await c.env.DB.prepare(
      `SELECT r.id, r.trigger_type, r.status, r.error, r.duration_ms, r.created_at, p.title AS post_title, p.id AS post_id
       FROM ai_runs r LEFT JOIN posts p ON p.id = r.post_id ORDER BY r.created_at DESC LIMIT 20`
    ).all()
    return c.json({
      success: true,
      configured: isAiConfigured(c.env),
      settings: { ...settings, categories: JSON.parse(settings.categories || '[]') },
      topics: topics.results,
      runs: runs.results,
    })
  } catch (error) {
    console.error('Error loading AI settings:', error)
    return c.json({ success: false, error: 'Failed to load AI settings' }, 500)
  }
})

studio.put('/ai/settings', async (c) => {
  const body = await c.req.json<Record<string, unknown>>().catch(() => ({} as Record<string, unknown>))
  const frequency = body.frequency === 'daily' ? 'daily' : 'weekly'
  const runHour = Number(body.run_hour)
  const runWeekday = Number(body.run_weekday)
  const wordCount = Number(body.word_count)
  if (!Number.isInteger(runHour) || runHour < 0 || runHour > 23) return c.json({ success: false, error: 'run_hour must be 0-23 (UTC)' }, 400)
  if (!Number.isInteger(runWeekday) || runWeekday < 0 || runWeekday > 6) return c.json({ success: false, error: 'run_weekday must be 0-6' }, 400)
  if (!Number.isInteger(wordCount) || wordCount < 300 || wordCount > 2500) return c.json({ success: false, error: 'word_count must be 300-2500' }, 400)

  const categories = Array.isArray(body.categories)
    ? body.categories.filter((v): v is string => typeof v === 'string').map(v => v.trim().slice(0, 40)).filter(Boolean).slice(0, 10)
    : []
  if (categories.length === 0) return c.json({ success: false, error: 'Add at least one category' }, 400)
  const tone = typeof body.tone === 'string' && body.tone.trim() ? body.tone.trim().slice(0, 200) : 'clear, practical, beginner-friendly'
  const enabled = body.enabled ? 1 : 0
  const nextRunAt = enabled ? computeNextRun({ frequency, run_hour: runHour, run_weekday: runWeekday }) : null

  await getAiSettings(c.env)
  await c.env.DB.prepare(
    `UPDATE ai_settings SET enabled = ?, frequency = ?, run_hour = ?, run_weekday = ?, categories = ?, tone = ?,
       word_count = ?, next_run_at = ?, updated_at = datetime('now') WHERE id = 'main'`
  ).bind(enabled, frequency, runHour, runWeekday, JSON.stringify(categories), tone, wordCount, nextRunAt).run()
  return c.json({ success: true, next_run_at: nextRunAt })
})

studio.post('/ai/topics', async (c) => {
  const body = await c.req.json<{ topic?: unknown; category?: unknown }>().catch(() => null)
  const topic = typeof body?.topic === 'string' ? body.topic.trim().slice(0, 300) : ''
  if (!topic) return c.json({ success: false, error: 'Topic is required' }, 400)
  const category = typeof body?.category === 'string' && body.category.trim() ? body.category.trim().slice(0, 40) : null
  await c.env.DB.prepare('INSERT INTO topic_queue (topic, category) VALUES (?, ?)').bind(topic, category).run()
  return c.json({ success: true }, 201)
})

studio.delete('/ai/topics/:id', async (c) => {
  await c.env.DB.prepare('DELETE FROM topic_queue WHERE id = ?').bind(c.req.param('id')).run()
  return c.json({ success: true })
})

// "Generate now" button: runs the same job as the cron and waits for the result
studio.post('/ai/run', async (c) => {
  if (!isAiConfigured(c.env)) {
    return c.json({ success: false, error: 'AI is not configured. Set AI_BASE_URL, AI_MODEL (and AI_API_KEY) with wrangler secret put.' }, 400)
  }
  const result = await generateDraft(c.env, 'manual')
  if (result.error) return c.json({ success: false, error: result.error }, 502)
  return c.json({ success: true, ...result })
})

export default studio
