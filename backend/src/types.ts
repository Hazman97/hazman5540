// Cloudflare Workers Env Bindings
export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  STORAGE_API_URL: string;
  STORAGE_API_KEY?: string;
  ENVIRONMENT?: string;
  OWNER_EMAIL?: string;
  SITE_URL?: string;
  // Self-hosted LLM (OpenAI-compatible), set via wrangler secret put
  AI_BASE_URL?: string;
  AI_API_KEY?: string;
  AI_MODEL?: string;
}
