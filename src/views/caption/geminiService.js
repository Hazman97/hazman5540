/**
 * Gemini AI Service for Caption Generator
 * Uses the Gemini API to generate AI-powered captions
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const STORAGE_KEY = 'gemini_api_key';

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
 * Generate caption using Gemini API
 * @param {Object} params - Same params as template generator
 * @returns {Promise<Object>} { caption, charCount }
 */
export async function generateWithAI(params) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API key belum ditetapkan. Sila masukkan Gemini API key anda.');
  }

  const prompt = buildPrompt(params);

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
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
    if (response.status === 400 || response.status === 403) {
      throw new Error('API key tidak sah. Sila semak API key anda.');
    }
    throw new Error(err.error?.message || `Gemini API error (${response.status})`);
  }

  const data = await response.json();
  const caption = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!caption) {
    throw new Error('AI tidak berjaya menjana caption. Sila cuba lagi.');
  }

  return {
    caption,
    charCount: caption.length,
    maxChars: null,
    templateIndex: 0,
    totalVariations: '∞',
    isAI: true,
  };
}
