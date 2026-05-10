// Password hashing using PBKDF2 (Web Crypto API — built into Cloudflare Workers)
// PBKDF2 with 600,000 iterations (OWASP 2024 recommendation)

const ITERATIONS = 600_000
const KEY_LENGTH = 32 // 256 bits
const ALGORITHM = 'SHA-256'

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function hexToBuf(hex: string): Uint8Array {
  const arr = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    arr[i / 2] = parseInt(hex.slice(i, i + 2), 16)
  }
  return arr
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: ALGORITHM, salt, iterations: ITERATIONS },
    keyMaterial,
    KEY_LENGTH * 8
  )
  // Store as: iterations:saltHex:hashHex
  return `${ITERATIONS}:${bufToHex(salt.buffer)}:${bufToHex(derived)}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [itersStr, saltHex, hashHex] = stored.split(':')
  if (!itersStr || !saltHex || !hashHex) return false

  const iterations = parseInt(itersStr, 10)
  const salt = hexToBuf(saltHex)

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: ALGORITHM, salt, iterations },
    keyMaterial,
    KEY_LENGTH * 8
  )

  // Constant-time comparison
  const derivedHex = bufToHex(derived)
  if (derivedHex.length !== hashHex.length) return false
  let diff = 0
  for (let i = 0; i < derivedHex.length; i++) {
    diff |= derivedHex.charCodeAt(i) ^ hashHex.charCodeAt(i)
  }
  return diff === 0
}
