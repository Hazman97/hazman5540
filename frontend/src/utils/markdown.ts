import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Blog bodies can be AI-generated, so the HTML is always sanitized before it is rendered with v-html
export function renderMarkdown(markdown: string): string {
  const html = marked.parse(markdown || '', { async: false, gfm: true, breaks: false }) as string;
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}

export function readingTime(markdown: string): string {
  const words = (markdown || '').trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

// D1 stores "YYYY-MM-DD HH:MM:SS" in UTC
export function formatDate(value: string | null | undefined): string {
  if (!value) return '';
  const date = new Date(value.replace(' ', 'T') + 'Z');
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' });
}
