import { Env } from '../types'

// Thin client for an OpenAI-compatible chat endpoint (self-hosted Gemma via Ollama / LM Studio / vLLM).
// AI_BASE_URL may be the server root (https://host) or already end in /v1.

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatOptions {
  maxTokens?: number
  temperature?: number
  timeoutMs?: number
  retries?: number
}

export function isAiConfigured(env: Env): boolean {
  return Boolean(env.AI_BASE_URL && env.AI_MODEL)
}

function completionsUrl(baseUrl: string): string {
  const base = baseUrl.replace(/\/+$/, '')
  return /\/v1$/.test(base) ? `${base}/chat/completions` : `${base}/v1/chat/completions`
}

export async function chatCompletion(env: Env, messages: ChatMessage[], options: ChatOptions = {}): Promise<string> {
  if (!isAiConfigured(env)) throw new Error('AI is not configured (set AI_BASE_URL and AI_MODEL secrets)')
  const { maxTokens = 1024, temperature = 0.7, timeoutMs = 60_000, retries = 1 } = options

  let lastError: unknown
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(completionsUrl(env.AI_BASE_URL!), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(env.AI_API_KEY ? { Authorization: `Bearer ${env.AI_API_KEY}` } : {}),
        },
        body: JSON.stringify({ model: env.AI_MODEL, messages, max_tokens: maxTokens, temperature, stream: false }),
        signal: controller.signal,
      })

      if (!res.ok) {
        const detail = (await res.text().catch(() => '')).slice(0, 300)
        lastError = new Error(`AI endpoint returned HTTP ${res.status}: ${detail}`)
        // Client errors (bad key, bad model) will not succeed on retry
        if (res.status < 500) throw lastError
        continue
      }

      const data = await res.json() as { choices?: { message?: { content?: string } }[] }
      const content = data.choices?.[0]?.message?.content?.trim()
      if (!content) throw new Error('AI endpoint returned an empty response')
      return content
    } catch (error) {
      lastError = controller.signal.aborted ? new Error(`AI request timed out after ${timeoutMs / 1000}s`) : error
      if (error instanceof Error && /HTTP 4\d\d/.test(error.message)) break
    } finally {
      clearTimeout(timer)
    }
  }
  throw lastError instanceof Error ? lastError : new Error('AI request failed')
}
