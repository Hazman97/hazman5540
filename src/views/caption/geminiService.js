/**
 * Gemini AI Service for Caption Generator
 * Uses the Gemini API to generate AI-powered captions
 * Supports auto-retry and model fallback for rate limits
 */

const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const STORAGE_KEY = 'gemini_api_key';

// Models to try in order (fallback chain)
const MODELS = [
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash-latest',
];

/**
 * Get stored API key from localStorage
 */
export function getApiKey() {
  return localStorage.getItem(STORAGE_KEY) || '';
}

/**
 * Save API key to localStorage
 */
export function saveApiKey(key) {
  localStorage.setItem(STORAGE_KEY, key.trim());
}

/**
 * Check if API key is configured
 */
export function hasApiKey() {
  return !!getApiKey();
}

/**
 * Build a structured prompt from the form data
 */
function buildPrompt({ category, platform, tone, nama, tarikh, lokasi, butiran }) {
  const platformGuides = {
    whatsapp: 'Format untuk WhatsApp: gunakan perenggan pendek, emoji, dan tanda bold (*text*). Jangan terlalu panjang.',
    facebook: 'Format untuk Facebook: penceritaan yang menarik, boleh panjang sedikit, gunakan emoji dan format yang engaging.',
    instagram: 'Format untuk Instagram: buat caption menarik di 2 baris pertama, sertakan 10-15 hashtag relevan di akhir caption.',
    twitter: 'Format untuk Twitter/X: MESTI di bawah 280 aksara. Pendek, padat dan impactful. Sertakan 1-2 hashtag sahaja.',
    linkedin: 'Format untuk LinkedIn: nada profesional, storytelling style, sertakan 3-5 hashtag profesional di akhir.',
  };

  const toneGuides = {
    ceria: 'Nada ceria dan positif. Gunakan emoji yang sesuai. Bersemangat.',
    sedih: 'Nada empati dan menyentuh hati. Sensitif dan penuh kasih sayang.',
    rasmi: 'Nada formal dan rasmi. Bahasa baku. Sesuai untuk kenyataan rasmi.',
    santai: 'Nada santai dan mesra. Seperti berkongsi dengan kawan.',
  };

  const categoryLabels = {
    ziarah: 'Ziarah (lawatan ke rumah/hospital)',
    lawatan: 'Lawatan Rasmi',
    sumbangan: 'Agihan Sumbangan / Bantuan',
    promosi: 'Promosi / Hebahan acara',
    ucapan: 'Ucapan / Perayaan',
    umum: 'Caption Umum',
  };

  let prompt = `Anda adalah penulis copywriting profesional untuk media sosial Malaysia. Tulis SATU caption dalam Bahasa Malaysia berdasarkan maklumat berikut:\n\n`;
  prompt += `KATEGORI: ${categoryLabels[category] || category}\n`;
  prompt += `${platformGuides[platform] || ''}\n`;
  prompt += `${toneGuides[tone] || ''}\n\n`;

  if (nama) prompt += `TAJUK/NAMA: ${nama}\n`;
  if (tarikh) prompt += `TARIKH: ${tarikh}\n`;
  if (lokasi) prompt += `LOKASI: ${lokasi}\n`;
  if (butiran) prompt += `ISI PENTING:\n${butiran}\n`;

  prompt += `\nARAHAN PENTING:
- Tulis terus caption sahaja, JANGAN tambah penjelasan atau nota
- Gunakan Bahasa Malaysia yang natural
- Sertakan emoji yang sesuai
- Pastikan format sesuai untuk ${platform}
- Jangan guna placeholder seperti [nama] atau [tarikh]`;

  return prompt;
}

/**
 * Sleep helper for retry delay
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Call Gemini API with a specific model
 */
async function callGemini(model, prompt, apiKey) {
  const url = `${GEMINI_BASE_URL}/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1024,
        topP: 0.9,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const errMsg = err.error?.message || '';

    // Auth errors — no point retrying
    if (response.status === 400 || response.status === 403) {
      if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('API key not valid')) {
        throw { fatal: true, message: 'API key tidak sah. Sila semak API key anda.' };
      }
    }

    // Rate limit / quota exceeded — can retry with different model
    if (response.status === 429 || errMsg.includes('quota') || errMsg.includes('RATE_LIMIT')) {
      throw { fatal: false, status: 429, model, message: errMsg };
    }

    throw { fatal: true, message: errMsg || `Gemini API error (${response.status})` };
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
}

/**
 * Generate caption using Gemini API with auto-retry and model fallback
 * @param {Object} params - Same params as template generator
 * @returns {Promise<Object>} { caption, charCount }
 */
export async function generateWithAI(params) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API key belum ditetapkan. Sila masukkan Gemini API key anda.');
  }

  const prompt = buildPrompt(params);
  let lastError = null;

  // Try each model in the fallback chain
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        // Wait before retry (not on first attempt of first model)
        if (attempt > 0) {
          await sleep(3000);
        }

        const caption = await callGemini(model, prompt, apiKey);

        if (!caption) {
          throw { fatal: true, message: 'AI tidak berjaya menjana caption.' };
        }

        return {
          caption,
          charCount: caption.length,
          maxChars: null,
          templateIndex: 0,
          totalVariations: '∞',
          isAI: true,
          model,
        };
      } catch (err) {
        if (err.fatal) throw new Error(err.message);
        lastError = err;
        // Rate limited — try next model
        if (attempt === 0 && err.status === 429) break;
      }
    }
  }

  // All models exhausted
  throw new Error(
    'Kuota API telah habis untuk semua model. Sila tunggu beberapa minit dan cuba lagi, atau semak kuota anda di https://ai.dev/rate-limit'
  );
}
