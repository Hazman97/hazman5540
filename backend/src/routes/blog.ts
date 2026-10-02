import { Hono } from 'hono'
import { Env } from '../types'
import { withParsedTags } from '../utils/posts'

// Public blog API: only published posts are ever returned here
const blog = new Hono<{ Bindings: Env }>()

const PAGE_SIZE = 12
const LIST_COLUMNS = 'slug, title, excerpt, cover_url, category, tags, published_at'

const escapeXml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

const siteUrl = (env: Env) => (env.SITE_URL || 'https://hazman5540.pages.dev').replace(/\/+$/, '')

blog.get('/posts', async (c) => {
  try {
    const page = Math.max(1, parseInt(c.req.query('page') || '1', 10) || 1)
    const category = c.req.query('category')
    const where = category ? "WHERE status = 'published' AND category = ?" : "WHERE status = 'published'"
    const binds = category ? [category] : []

    const rows = await c.env.DB.prepare(
      `SELECT ${LIST_COLUMNS} FROM posts ${where} ORDER BY published_at DESC LIMIT ? OFFSET ?`
    ).bind(...binds, PAGE_SIZE, (page - 1) * PAGE_SIZE).all()
    const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM posts ${where}`).bind(...binds).first<{ n: number }>()
    const categories = await c.env.DB.prepare(
      "SELECT category, COUNT(*) AS n FROM posts WHERE status = 'published' GROUP BY category ORDER BY n DESC"
    ).all()

    c.header('Cache-Control', 'public, max-age=60')
    return c.json({
      success: true,
      posts: rows.results.map(withParsedTags),
      page,
      totalPages: Math.max(1, Math.ceil((total?.n || 0) / PAGE_SIZE)),
      categories: categories.results,
    })
  } catch (error) {
    console.error('Error listing posts:', error)
    return c.json({ success: false, error: 'Failed to load posts' }, 500)
  }
})

blog.get('/posts/:slug', async (c) => {
  try {
    const post = await c.env.DB.prepare(
      `SELECT ${LIST_COLUMNS}, body_md, seo_title, seo_description, updated_at FROM posts
       WHERE slug = ? AND status = 'published'`
    ).bind(c.req.param('slug')).first()
    if (!post) return c.json({ success: false, error: 'Post not found' }, 404)
    c.header('Cache-Control', 'public, max-age=60')
    return c.json({ success: true, post: withParsedTags(post) })
  } catch (error) {
    console.error('Error loading post:', error)
    return c.json({ success: false, error: 'Failed to load post' }, 500)
  }
})

blog.get('/sitemap.xml', async (c) => {
  const base = siteUrl(c.env)
  const rows = await c.env.DB.prepare(
    "SELECT slug, updated_at FROM posts WHERE status = 'published' ORDER BY published_at DESC"
  ).all<{ slug: string; updated_at: string }>()

  const urls = [
    `<url><loc>${base}/</loc></url>`,
    `<url><loc>${base}/blog</loc></url>`,
    ...rows.results.map(p =>
      `<url><loc>${base}/blog/${escapeXml(p.slug)}</loc><lastmod>${p.updated_at.slice(0, 10)}</lastmod></url>`),
  ]
  return c.body(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`,
    200,
    { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' }
  )
})

blog.get('/rss.xml', async (c) => {
  const base = siteUrl(c.env)
  const rows = await c.env.DB.prepare(
    "SELECT slug, title, excerpt, published_at FROM posts WHERE status = 'published' ORDER BY published_at DESC LIMIT 30"
  ).all<{ slug: string; title: string; excerpt: string; published_at: string }>()

  const items = rows.results.map(p => {
    const link = `${base}/blog/${escapeXml(p.slug)}`
    const date = new Date(p.published_at.replace(' ', 'T') + 'Z').toUTCString()
    return `<item><title>${escapeXml(p.title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${date}</pubDate><description>${escapeXml(p.excerpt)}</description></item>`
  })
  return c.body(
    `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Hazman Adanan — Blog</title><link>${base}/blog</link><description>Notes on AI, networking and gadgets.</description>${items.join('')}</channel></rss>`,
    200,
    { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' }
  )
})

export default blog
