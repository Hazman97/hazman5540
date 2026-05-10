// Cloudflare Workers Env Bindings
export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  STORAGE_API_URL: string;
  STORAGE_API_KEY?: string;
  ENVIRONMENT?: string;
}
