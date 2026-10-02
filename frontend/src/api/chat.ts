import { api } from './client'

export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

// `fallback` is true when the AI was unavailable and the reply is the canned contact message
export const sendChat = (messages: ChatTurn[]) =>
  api.post<{ reply: string; fallback?: boolean }>('/chat', { messages })

export default sendChat
