// Cloudflare Pages Function: server-side SEO for /blog/:slug.
// The SPA renders the article in the browser; this injects the title, meta / Open Graph tags,
// JSON-LD and a plain-text copy of the article into index.html so crawlers and link previews see it.

interface Env {
  API_URL?: string
}

interface Post {
  slug: string
  title: string
  excerpt: string
  body_md: string
  cover_url: string | null
  category: string
  tags: string[]
  seo_title: string | null
  seo_description: string | null
  published_at: string
  updated_at: string
}

interface Context {
  request: Request
  env: Env
  params: { slug?: string | string[] }
  next: () => Promise<Response>
}

const DEFAULT_API_URL = 'https://portfolio-hazman5540.hazman5001.workers.dev'
const AUTHOR = 'Hazman Adanan'

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Rough markdown → plain paragraphs; only used as crawler-visible fallback content
const toParagraphs = (markdown: string) =>
  markdown
    .split(/\n{2,}/)
    .map(block => block.replace(/^#{1,6}\s+/gm, '').replace(/[*_`>]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim())
    .filter(Boolean)
    .map(text => `<p>${escapeHtml(text)}</p>`)
    .join('')

const toIso = (sqlUtc: string) => new Date(sqlUtc.replace(' ', 'T') + 'Z').toISOString()

export async function onRequest(context: Context): Promise<Response> {
  const response = await context.next()
  const slug = Array.isArray(context.params.slug) ? context.params.slug[0] : context.params.slug
  if (!slug || !(response.headers.get('content-type') || '').includes('text/html')) return response

  let post: Post
  try {
    const apiUrl = (context.env.API_URL || DEFAULT_API_URL).replace(/\/+$/, '')
    const res = await fetch(`${apiUrl}/api/blog/posts/${encodeURIComponent(slug)}`)
    if (!res.ok) return response
    post = ((await res.json()) as { post: Post }).post
  } catch {
    // If the API is down, still serve the SPA; it will show its own error state
    return response
  }

  const pageUrl = new URL(context.request.url)
  const canonical = `${pageUrl.origin}/blog/${post.slug}`
  const title = `${post.seo_title || post.title} — ${AUTHOR}`
  const description = post.seo_description || post.excerpt
  const image = post.cover_url ? new URL(post.cover_url, pageUrl.origin).toString() : null

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    datePublished: toIso(post.published_at),
    dateModified: toIso(post.updated_at),
    author: { '@type': 'Person', name: AUTHOR },
    mainEntityOfPage: canonical,
    keywords: post.tags.join(', '),
    ...(image ? { image } : {}),
  }).replace(/</g, '\\u003c')

  const meta = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:title" content="${escapeHtml(post.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    image ? `<meta property="og:image" content="${escapeHtml(image)}" />` : '',
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('')

  const article = `<article><h1>${escapeHtml(post.title)}</h1><p>${escapeHtml(post.excerpt)}</p>${toParagraphs(post.body_md)}</article>`

  return new HTMLRewriter()
    .on('title', { element: el => { el.setInnerContent(title) } })
    .on('head', { element: el => { el.append(meta, { html: true }) } })
    // Vue replaces the contents of #app when it mounts, so this is only seen without JavaScript
    .on('#app', { element: el => { el.setInnerContent(article, { html: true }) } })
    .transform(response)
}
