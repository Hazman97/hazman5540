// Centralized API client for hazman5540
// In dev, Vite proxies /api/* → http://localhost:8787
// In production, VITE_API_URL = https://hazman5540.{account}.workers.dev

const BASE_URL = import.meta.env.VITE_API_URL || ''

function getAuthToken(): string | null {
  return localStorage.getItem('hazman_token')
}

export function setAuthToken(token: string): void {
  localStorage.setItem('hazman_token', token)
}

export function clearAuthToken(): void {
  localStorage.removeItem('hazman_token')
  localStorage.removeItem('hazman_user')
}

export function getStoredUser<T = Record<string, unknown>>(): T | null {
  try {
    const u = localStorage.getItem('hazman_user')
    return u ? JSON.parse(u) : null
  } catch {
    return null
  }
}

export function setStoredUser(user: unknown): void {
  localStorage.setItem('hazman_user', JSON.stringify(user))
}

interface RequestOptions extends RequestInit {
  auth?: boolean
}

export async function apiRequest<T = unknown>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { auth = false, headers = {}, ...rest } = options

  const headersObj: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  }

  if (auth) {
    const token = getAuthToken()
    if (token) headersObj['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}/api${path}`, {
    ...rest,
    headers: headersObj,
  })

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
    throw new Error((errBody as { error?: string }).error || `HTTP ${res.status}`)
  }

  // 204 No Content
  if (res.status === 204) return undefined as unknown as T

  return res.json() as Promise<T>
}

export const api = {
  get: <T>(path: string, auth = false) => apiRequest<T>(path, { method: 'GET', auth }),
  post: <T>(path: string, body: unknown, auth = false) =>
    apiRequest<T>(path, { method: 'POST', body: JSON.stringify(body), auth }),
  patch: <T>(path: string, body: unknown, auth = false) =>
    apiRequest<T>(path, { method: 'PATCH', body: JSON.stringify(body), auth }),
  delete: <T>(path: string, body?: unknown, auth = false) =>
    apiRequest<T>(path, { method: 'DELETE', body: body ? JSON.stringify(body) : undefined, auth }),
}
