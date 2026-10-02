import { D1Database } from '@cloudflare/workers-types'

// Keys the owner can edit from Studio. Values are stored as JSON in site_content.
export const CONTENT_KEYS = ['profile', 'experience', 'projects', 'chatbot'] as const
export type ContentKey = typeof CONTENT_KEYS[number]

// Chatbot fields that only the backend (and the owner) should see
const PRIVATE_CHATBOT_FIELDS = ['persona', 'knowledge'] as const

export function isContentKey(key: string): key is ContentKey {
  return (CONTENT_KEYS as readonly string[]).includes(key)
}

export async function getAllContent(db: D1Database): Promise<Record<string, unknown>> {
  const rows = await db.prepare('SELECT key, value FROM site_content').all<{ key: string; value: string }>()
  const content: Record<string, unknown> = {}
  for (const row of rows.results) {
    try {
      content[row.key] = JSON.parse(row.value)
    } catch {
      console.error(`site_content.${row.key} is not valid JSON`)
    }
  }
  return content
}

// Strip owner-only fields before content is served publicly
export function toPublicContent(content: Record<string, unknown>): Record<string, unknown> {
  const chatbot = content.chatbot
  if (!chatbot || typeof chatbot !== 'object') return content
  const publicChatbot = { ...(chatbot as Record<string, unknown>) }
  for (const field of PRIVATE_CHATBOT_FIELDS) delete publicChatbot[field]
  return { ...content, chatbot: publicChatbot }
}

export async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip + 'hazman5540-salt')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}
