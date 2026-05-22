/**
 * Unified AI Service for Caption Generator
 * Supports Google Gemini and DeepSeek AI APIs
 * Handles API key storage, prompts, and content generation/text polishing
 */

const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const DEEPSEEK_BASE_URL = 'https://api.deepseek.com/chat/completions';

const STORAGE_KEYS = {
  gemini: 'gemini_api_key',
  deepseek: 'deepseek_api_key',
  provider: 'caption_ai_provider',
  geminiModel: 'caption_gemini_model',
  deepseekModel: 'caption_deepseek_model'
};

// Fallback chain for Gemini
const GEMINI_MODELS = [
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash-latest',
];

// Available models for DeepSeek (Official API: api-docs.deepseek.com)
const DEEPSEEK_MODELS = [
  'deepseek-v4-flash',          // DeepSeek-V4 Flash (Fast, cost-effective)
  'deepseek-v4-flash-thinking', // DeepSeek-V4 Flash Thinking Mode (Deep reasoning)
  'deepseek-v4-pro',            // DeepSeek-V4 Pro (Advanced, 1.6T params)
];

/**
 * Get stored API key from localStorage
 */
export function getApiKey(provider) {
  return localStorage.getItem(STORAGE_KEYS[provider]) || '';
}

/**
 * Save API key to localStorage
 */
export function saveApiKey(provider, key) {
  localStorage.setItem(STORAGE_KEYS[provider], key.trim());
}

/**
 * Check if API key is configured
 */
export function hasApiKey(provider) {
  return !!getApiKey(provider);
}

/**
 * Get/Set selected AI provider
 */
export function getStoredProvider() {
  return localStorage.getItem(STORAGE_KEYS.provider) || 'gemini';
}

export function saveStoredProvider(provider) {
  localStorage.setItem(STORAGE_KEYS.provider, provider);
}

/**
 * Get/Set selected models
 */
export function getStoredModel(provider) {
  if (provider === 'gemini') {
    return localStorage.getItem(STORAGE_KEYS.geminiModel) || 'gemini-2.0-flash';
  } else {
    return localStorage.getItem(STORAGE_KEYS.deepseekModel) || 'deepseek-v4-flash';
  }
}

export function saveStoredModel(provider, model) {
  const key = provider === 'gemini' ? STORAGE_KEYS.geminiModel : STORAGE_KEYS.deepseekModel;
  localStorage.setItem(key, model);
}

/**
 * Build a structured prompt from the form data
 */
function buildPrompt({ category, platform, tone, nama, tarikh, lokasi, butiran, rujukan }) {
  const platformGuides = {
    whatsapp: 'Format untuk WhatsApp: gunakan perenggan pendek dan tanda bold (*text*). Jangan terlalu panjang.',
    facebook: 'Format untuk Facebook: penceritaan yang menarik, boleh panjang sedikit dan format yang engaging.',
    instagram: 'Format untuk Instagram: buat caption menarik di 2 baris pertama, sertakan 10-15 hashtag relevan di akhir caption.',
    twitter: 'Format untuk Twitter/X: MESTI di bawah 280 aksara. Pendek, padat dan impactful. Sertakan 1-2 hashtag sahaja.',
    linkedin: 'Format untuk LinkedIn: nada profesional, storytelling style, sertakan 3-5 hashtag profesional di akhir.',
  };

  const toneGuides = {
    ceria: 'Nada ceria dan positif. Bersemangat.',
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

  if (rujukan && rujukan.trim() !== '') {
    prompt += `\nCONTOH RUJUKAN:\n"${rujukan.trim()}"\n`;
  }

  prompt += `\nARAHAN PENTING:
- Tulis terus caption sahaja, JANGAN tambah penjelasan atau nota
- Gunakan Bahasa Malaysia yang natural
- Gunakan emoji yang menarik dan relevan secara bersesuaian dengan platform dan nada. (Hadkan emoji jika nada Rasmi)
- MESTI terus mula dengan caption, JANGAN mulakan dengan tanda petikan (") atau pengenalan seperti "Berikut ialah..."
- Pastikan format sesuai untuk ${platform}
- Jangan guna placeholder seperti [nama] atau [tarikh]`;

  if (rujukan && rujukan.trim() !== '') {
    prompt += `\n- Sila tiru gaya bahasa, nada (tone), struktur ayat, dan 'vibe' dari CONTOH RUJUKAN di atas. Jangan salin bulat-bulat, jadikan ia panduan gaya penyampaian sahaja.`;
  }

  return prompt;
}

/**
 * Clean up wrapping double quotes or formatting issues from AI output
 */
function sanitizeAICaption(caption) {
  if (!caption) return '';
  let cleaned = caption.trim();
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = cleaned.substring(1, cleaned.length - 1).trim();
  } else if (cleaned.startsWith('«') && cleaned.endsWith('»')) {
    cleaned = cleaned.substring(1, cleaned.length - 1).trim();
  }
  return cleaned;
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

    if (response.status === 400 || response.status === 403) {
      if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('API key not valid')) {
        throw { fatal: true, message: 'Google Gemini API key tidak sah. Sila semak API key anda.' };
      }
    }

    if (response.status === 429 || errMsg.includes('quota') || errMsg.includes('RATE_LIMIT')) {
      throw { fatal: false, status: 429, model, message: errMsg };
    }

    throw { fatal: true, message: errMsg || `Gemini API error (${response.status})` };
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
}

/**
 * Call DeepSeek API with a specific model
 */
async function callDeepSeek(model, prompt, apiKey) {
  const response = await fetch(DEEPSEEK_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1024
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const errMsg = err.error?.message || '';

    if (response.status === 401 || errMsg.includes('invalid_api_key') || errMsg.includes('Authentication')) {
      throw { fatal: true, message: 'DeepSeek API key tidak sah. Sila semak API key anda.' };
    }

    if (response.status === 429 || errMsg.includes('rate_limit') || errMsg.includes('quota')) {
      throw { fatal: false, status: 429, model, message: errMsg };
    }

    throw { fatal: true, message: errMsg || `DeepSeek API error (${response.status})` };
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim();
}

/**
 * Generate caption using AI (Gemini or DeepSeek)
 * @param {string} provider - 'gemini' | 'deepseek'
 * @param {string} model - Specific model ID
 * @param {Object} params - Caption generation inputs
 * @returns {Promise<Object>} Resulting caption structure
 */
export async function generateWithAI(provider, model, params) {
  const apiKey = getApiKey(provider);
  if (!apiKey) {
    throw new Error(`API key untuk ${provider === 'gemini' ? 'Google Gemini' : 'DeepSeek'} belum ditetapkan. Sila masukkan API key anda.`);
  }

  const prompt = buildPrompt(params);

  if (provider === 'gemini') {
    let lastError = null;
    
    // Fallback chain logic for Gemini if default model fails
    const modelsToTry = model ? [model, ...GEMINI_MODELS.filter(m => m !== model)] : GEMINI_MODELS;
    
    for (const currentModel of modelsToTry) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          if (attempt > 0) await sleep(2000);
          const rawCaption = await callGemini(currentModel, prompt, apiKey);
          if (!rawCaption) throw { fatal: true, message: 'AI tidak berjaya menjana caption.' };
          
          const caption = sanitizeAICaption(rawCaption);
          return {
            caption,
            charCount: caption.length,
            maxChars: null,
            templateIndex: 0,
            totalVariations: '∞',
            isAI: true,
            provider: 'Google Gemini',
            model: currentModel,
          };
        } catch (err) {
          if (err.fatal) throw new Error(err.message);
          lastError = err;
          if (attempt === 0 && err.status === 429) break; // Rate limited, try next model
        }
      }
    }
    throw new Error(lastError?.message || 'Gagal menjana caption menggunakan Google Gemini.');
  } else {
    // DeepSeek AI
    try {
      const rawCaption = await callDeepSeek(model || 'deepseek-v4-flash', prompt, apiKey);
      if (!rawCaption) throw new Error('AI tidak berjaya menjana caption.');
      
      const caption = sanitizeAICaption(rawCaption);
      return {
        caption,
        charCount: caption.length,
        maxChars: null,
        templateIndex: 0,
        totalVariations: '∞',
        isAI: true,
        provider: 'DeepSeek',
        model: model || 'deepseek-v4-flash',
      };
    } catch (err) {
      throw new Error(err.message || 'Gagal menjana caption menggunakan DeepSeek.');
    }
  }
}

/**
 * Polish raw notes into neat bullet points using AI
 * @param {string} provider - 'gemini' | 'deepseek'
 * @param {string} model - Specific model ID
 * @param {string} rawText - Unstructured messy details
 * @returns {Promise<string>} Polished bullet points
 */
export async function polishTextWithAI(provider, model, rawText) {
  const apiKey = getApiKey(provider);
  if (!apiKey) {
    throw new Error(`API key untuk ${provider === 'gemini' ? 'Google Gemini' : 'DeepSeek'} diperlukan untuk menggunakan ciri ini.`);
  }

  const prompt = `Anda adalah asisten penulisan profesional. Sila kemas kini dan perkemas butiran mentah di bawah menjadi isi-isi penting (bullet points) yang tersusun, kemas, profesional, dan padat dalam Bahasa Malaysia.
Sila kekalkan semua maklumat penting seperti nama, tarikh, angka, dan lokasi.
Jangan tambah sebarang pengenalan atau kesimpulan, tulis isi-isi penting terus dalam format senarai (bullet points) menggunakan simbol "-".
Jangan gunakan emoji.

Teks Mentah:
"${rawText}"`;

  if (provider === 'gemini') {
    const selectedModel = model || 'gemini-2.0-flash';
    try {
      const result = await callGemini(selectedModel, prompt, apiKey);
      if (!result) throw new Error('Tiada maklum balas dari AI.');
      return result;
    } catch (err) {
      throw new Error(err.message || 'Gagal mengemaskini teks menggunakan Gemini.');
    }
  } else {
    const selectedModel = model || 'deepseek-chat';
    try {
      const result = await callDeepSeek(selectedModel, prompt, apiKey);
      if (!result) throw new Error('Tiada maklum balas dari AI.');
      return result;
    } catch (err) {
      throw new Error(err.message || 'Gagal mengemaskini teks menggunakan DeepSeek.');
    }
  }
}
