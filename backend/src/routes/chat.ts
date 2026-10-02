import { Hono } from 'hono'
import { Env } from '../types'
import { chatCompletion, isAiConfigured, ChatMessage } from '../utils/aiClient'
import { getAllContent, hashIp } from '../utils/content'

// Public "Ask about Hazman" chatbot, grounded only in Studio content
const chat = new Hono<{ Bindings: Env }>()

const MESSAGES_PER_HOUR = 20
const MAX_TURNS = 10
const MAX_MESSAGE_CHARS = 800
const MAX_KNOWLEDGE_CHARS = 14_000

type Json = Record<string, unknown>
const asObject = (value: unknown): Json => (value && typeof value === 'object' && !Array.isArray(value) ? value as Json : {})
const asArray = (value: unknown): Json[] => (Array.isArray(value) ? value.filter(v => v && typeof v === 'object') as Json[] : [])
const text = (value: unknown): string => (typeof value === 'string' ? value : Array.isArray(value) ? value.filter(v => typeof v === 'string').join(', ') : '')

function buildKnowledge(content: Json): { prompt: string; email: string } {
  const profile = asObject(content.profile)
  const chatbot = asObject(content.chatbot)
  const name = text(profile.name) || 'Hazman Adanan'
  const email = text(profile.email) || 'hazman5001@gmail.com'

  const experience = asArray(content.experience).map(job =>
    `- ${text(job.role)} at ${text(job.company)} (${text(job.period)})\n` +
    asArray(job.bullets).map(b => `  * ${text(b.title)}${text(b.text)}`).join('\n'))

  const projects = asArray(content.projects).map(p =>
    `- ${text(p.title)} [${text(p.status)}]: ${text(p.description)} Tech: ${text(p.tech)}.` +
    (Array.isArray(p.highlights) && p.highlights.length ? ` Highlights: ${text(p.highlights)}` : ''))

  const knowledge = [
    `Name: ${name}`,
    profile.headline ? `Headline: ${text(profile.headline)}` : '',
    profile.aboutIntro ? `About: ${text(profile.aboutIntro)} ${text(profile.aboutBody)}` : '',
    profile.location ? `Location: ${text(profile.location)}` : '',
    `Contact email: ${email}`,
    profile.linkedin ? `LinkedIn: ${text(profile.linkedin)}` : '',
    experience.length ? `Experience:\n${experience.join('\n')}` : '',
    projects.length ? `Projects:\n${projects.join('\n')}` : '',
    chatbot.knowledge ? `Extra notes from ${name}:\n${text(chatbot.knowledge)}` : '',
  ].filter(Boolean).join('\n\n').slice(0, MAX_KNOWLEDGE_CHARS)

  const prompt =
    `You are the assistant on ${name}'s portfolio website. Visitors are usually recruiters or potential clients.\n` +
    `Style: ${text(chatbot.persona) || 'Friendly, concise and honest.'}\n` +
    'Rules:\n' +
    `- Only answer questions about ${name}, his skills, experience, projects and how to contact him.\n` +
    '- Use only the facts below. If the answer is not in them, say you are not sure and suggest emailing him.\n' +
    '- Never invent numbers, employers, dates or achievements.\n' +
    '- Politely decline unrelated requests (general coding help, essays, other people, etc.).\n' +
    '- Keep answers under 120 words.\n\n' +
    `FACTS:\n${knowledge}`

  return { prompt, email }
}

chat.post('/', async (c) => {
  const body = await c.req.json<{ messages?: unknown }>().catch(() => null)
  const history = (Array.isArray(body?.messages) ? body!.messages : [])
    .filter((m): m is { role: string; content: string } =>
      !!m && typeof m === 'object' && typeof (m as Json).content === 'string' && ((m as Json).role === 'user' || (m as Json).role === 'assistant'))
    .slice(-MAX_TURNS)
    .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content.trim().slice(0, MAX_MESSAGE_CHARS) }))
    .filter(m => m.content)

  if (history.length === 0 || history[history.length - 1].role !== 'user') {
    return c.json({ success: false, error: 'Send at least one user message' }, 400)
  }

  const db = c.env.DB
  try {
    const content = await getAllContent(db)
    if (asObject(content.chatbot).enabled === false) {
      return c.json({ success: false, error: 'The chatbot is currently turned off' }, 403)
    }

    const ipHash = await hashIp(c.req.header('cf-connecting-ip') || 'unknown')
    const recent = await db.prepare(
      "SELECT COUNT(*) AS n FROM chat_rate WHERE ip_hash = ? AND created_at > datetime('now', '-1 hour')"
    ).bind(ipHash).first<{ n: number }>()
    if ((recent?.n || 0) >= MESSAGES_PER_HOUR) {
      return c.json({ success: false, error: 'You have reached the chat limit. Please try again in an hour.' }, 429)
    }
    await db.prepare('INSERT INTO chat_rate (ip_hash) VALUES (?)').bind(ipHash).run()
    // Occasionally prune old rate-limit rows so the table stays small
    if (Math.random() < 0.05) {
      c.executionCtx.waitUntil(db.prepare("DELETE FROM chat_rate WHERE created_at < datetime('now', '-1 day')").run())
    }

    const { prompt, email } = buildKnowledge(content)
    const fallback = `Sorry, I can't answer right now. You can reach Hazman directly at ${email}.`
    if (!isAiConfigured(c.env)) return c.json({ success: true, reply: fallback, fallback: true })

    try {
      const messages: ChatMessage[] = [{ role: 'system', content: prompt }, ...history]
      const reply = await chatCompletion(c.env, messages, { maxTokens: 400, temperature: 0.3, timeoutMs: 30_000, retries: 0 })
      return c.json({ success: true, reply })
    } catch (error) {
      console.error('Chatbot AI error:', error instanceof Error ? error.message : error)
      return c.json({ success: true, reply: fallback, fallback: true })
    }
  } catch (error) {
    console.error('Chatbot error:', error)
    return c.json({ success: false, error: 'Chat is unavailable right now' }, 500)
  }
})

export default chat
