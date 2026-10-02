import { Env } from '../types'
import { chatCompletion } from './aiClient'
import { cleanPostInput, insertPost } from './posts'

export interface AiSettings {
  id: string
  enabled: number
  frequency: 'daily' | 'weekly'
  run_hour: number
  run_weekday: number
  categories: string
  tone: string
  word_count: number
  next_run_at: string | null
}

const toSqlTime = (date: Date) => date.toISOString().slice(0, 19).replace('T', ' ')

// Next run strictly after `from`, at run_hour UTC (and on run_weekday for weekly)
export function computeNextRun(settings: Pick<AiSettings, 'frequency' | 'run_hour' | 'run_weekday'>, from = new Date()): string {
  const next = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate(), settings.run_hour, 0, 0))
  if (next <= from) next.setUTCDate(next.getUTCDate() + 1)
  if (settings.frequency === 'weekly') {
    while (next.getUTCDay() !== settings.run_weekday) next.setUTCDate(next.getUTCDate() + 1)
  }
  return toSqlTime(next)
}

export async function getAiSettings(env: Env): Promise<AiSettings> {
  await env.DB.prepare("INSERT OR IGNORE INTO ai_settings (id) VALUES ('main')").run()
  return (await env.DB.prepare("SELECT * FROM ai_settings WHERE id = 'main'").first<AiSettings>())!
}

function parseCategories(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed.filter((c): c is string => typeof c === 'string' && c.trim() !== '')
  } catch { /* fall through */ }
  return []
}

// The model replies with "KEY: value" header lines, a line with ---, then the markdown body.
// Plain headers survive small models far better than a JSON string holding a long article.
export function parseArticle(raw: string): Record<string, string> {
  const text = raw.replace(/^```[a-z]*\n?/i, '').replace(/\n?```\s*$/, '')
  const divider = text.search(/^\s*---\s*$/m)
  if (divider === -1) throw new Error('AI response is missing the --- divider')

  const fields: Record<string, string> = {}
  for (const line of text.slice(0, divider).split('\n')) {
    const match = line.match(/^\s*\**([A-Z_]+)\**\s*:\s*(.+)$/)
    if (match) fields[match[1].toLowerCase()] = match[2].trim()
  }
  fields.body_md = text.slice(divider).replace(/^\s*---\s*\n?/, '').trim()
  if (!fields.title) throw new Error('AI response is missing TITLE')
  if (fields.body_md.length < 200) throw new Error('AI response body is too short')
  return fields
}

async function pickTopic(env: Env, settings: AiSettings, recentTitles: string[]): Promise<{ topic: string; category: string; queueId?: string }> {
  const queued = await env.DB.prepare('SELECT id, topic, category FROM topic_queue WHERE used = 0 ORDER BY created_at LIMIT 1')
    .first<{ id: string; topic: string; category: string | null }>()
  const categories = parseCategories(settings.categories)
  const fallbackCategory = categories[Math.floor(Math.random() * categories.length)] || 'Technology'

  if (queued) return { topic: queued.topic, category: queued.category || fallbackCategory, queueId: queued.id }

  const suggestion = await chatCompletion(env, [
    { role: 'system', content: 'You suggest blog topics for a Malaysian software & IoT engineer\'s tech blog. Reply with the topic only, one line, no quotes.' },
    {
      role: 'user',
      content: `Suggest one specific, useful article topic in the category "${fallbackCategory}". ` +
        `Avoid these existing titles:\n${recentTitles.map(t => `- ${t}`).join('\n') || '- (none yet)'}`,
    },
  ], { maxTokens: 60, temperature: 0.9 })

  return { topic: suggestion.split('\n')[0].replace(/^["'\s-]+|["'\s]+$/g, ''), category: fallbackCategory }
}

export async function generateDraft(env: Env, trigger: 'cron' | 'manual'): Promise<{ postId?: string; slug?: string; error?: string }> {
  const started = Date.now()
  try {
    const settings = await getAiSettings(env)
    const recent = await env.DB.prepare('SELECT title FROM posts ORDER BY created_at DESC LIMIT 30').all<{ title: string }>()
    const recentTitles = recent.results.map(r => r.title)
    const { topic, category, queueId } = await pickTopic(env, settings, recentTitles)

    const raw = await chatCompletion(env, [
      {
        role: 'system',
        content: 'You write accurate, original technology articles for a personal blog. Never invent statistics, quotes or sources; ' +
          'if you are unsure of a fact, leave it out. Use Markdown with ## headings, short paragraphs and practical examples.',
      },
      {
        role: 'user',
        content: `Write an article about: ${topic}\nCategory: ${category}\nTone: ${settings.tone}\nLength: about ${settings.word_count} words.\n\n` +
          'Reply in exactly this format and nothing else:\n' +
          'TITLE: <compelling title>\nEXCERPT: <one or two sentence summary>\nTAGS: <3-5 comma separated lowercase tags>\n' +
          'SEO_TITLE: <max 60 characters>\nSEO_DESCRIPTION: <max 155 characters>\n---\n<article body in Markdown, without repeating the title>',
      },
    ], { maxTokens: Math.min(4096, Math.round(settings.word_count * 2.2)), temperature: 0.7, timeoutMs: 180_000 })

    const fields = parseArticle(raw)
    const { post, error } = cleanPostInput({
      title: fields.title,
      excerpt: fields.excerpt,
      body_md: fields.body_md,
      category,
      tags: (fields.tags || '').split(',').map(t => t.trim().toLowerCase()),
      seo_title: fields.seo_title,
      seo_description: fields.seo_description,
    })
    if (!post) throw new Error(error || 'Generated post failed validation')

    const created = await insertPost(env.DB, post, 'ai')
    if (queueId) await env.DB.prepare('UPDATE topic_queue SET used = 1 WHERE id = ?').bind(queueId).run()

    await env.DB.prepare('INSERT INTO ai_runs (trigger_type, status, post_id, duration_ms) VALUES (?, ?, ?, ?)')
      .bind(trigger, 'success', created.id, Date.now() - started).run()
    return { postId: created.id, slug: created.slug }
  } catch (error) {
    const message = (error instanceof Error ? error.message : String(error)).slice(0, 500)
    console.error('AI draft generation failed:', message)
    await env.DB.prepare('INSERT INTO ai_runs (trigger_type, status, error, duration_ms) VALUES (?, ?, ?, ?)')
      .bind(trigger, 'error', message, Date.now() - started).run()
    return { error: message }
  }
}

// Called by the hourly cron. Does nothing unless the schedule is enabled and due.
export async function runScheduledDraft(env: Env): Promise<void> {
  const settings = await getAiSettings(env)
  if (!settings.enabled) return

  const now = new Date()
  if (!settings.next_run_at) {
    await env.DB.prepare("UPDATE ai_settings SET next_run_at = ? WHERE id = 'main'").bind(computeNextRun(settings, now)).run()
    return
  }
  if (new Date(settings.next_run_at.replace(' ', 'T') + 'Z') > now) return

  // Move the schedule forward before generating so a slow or failing run is never repeated every hour
  await env.DB.prepare("UPDATE ai_settings SET next_run_at = ? WHERE id = 'main'").bind(computeNextRun(settings, now)).run()
  await generateDraft(env, 'cron')
}
