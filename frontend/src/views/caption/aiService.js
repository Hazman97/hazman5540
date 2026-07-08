/**
 * Unified AI Service for Caption Generator
 * Supports Google Gemini, DeepSeek AI APIs, and Custom OpenAI-compatible endpoints
 * Handles API key storage, prompts, and content generation/text polishing
 */

const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const DEEPSEEK_BASE_URL = 'https://api.deepseek.com/chat/completions';

const STORAGE_KEYS = {
  gemini: 'gemini_api_key',
  deepseek: 'deepseek_api_key',
  custom: 'custom_api_key',
  customEndpoint: 'custom_api_endpoint',
  customModel: 'custom_api_model',
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
 * Get/Set custom API endpoint configuration
 */
export function getCustomEndpoint() {
  return localStorage.getItem(STORAGE_KEYS.customEndpoint) || '';
}

export function saveCustomEndpoint(url) {
  localStorage.setItem(STORAGE_KEYS.customEndpoint, url.trim());
}

export function getCustomModel() {
  return localStorage.getItem(STORAGE_KEYS.customModel) || '';
}

export function saveCustomModel(model) {
  localStorage.setItem(STORAGE_KEYS.customModel, model.trim());
}

export function hasCustomConfig() {
  const hasKey = !!getApiKey('custom');
  const hasEndpoint = !!getCustomEndpoint();
  const hasModel = !!getCustomModel();
  return hasKey && hasEndpoint && hasModel;
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
    threads: 'Format untuk Threads: santai dan conversational seperti Twitter. Maksimum 500 aksara. 1-3 hashtag.',
    tiktok: 'Format untuk TikTok: mula dengan hook kuat dalam 3-5 patah kata pertama. Energetik, trending, hashtag popular.',
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
 * Build a marketing/copywriting prompt using professional marketing psychology frameworks
 * @param {Object} params - Marketing form data
 */
export function buildMarketingPrompt({
  campaignGoal, hookType, threadCount, platform, language,
  postTopic, productLink, extraDetails, rujukan
}) {
  // Platform-specific guides
  const platformGuides = {
    whatsapp: `Platform: WhatsApp. Gunakan perenggan pendek, bold (*text*) untuk emphasis, emoji secukupnya. Jangan terlalu panjang.`,
    facebook: `Platform: Facebook. Boleh lebih panjang dan storytelling. Gunakan line breaks antara perenggan. Engagement lebih tinggi dengan soalan di akhir.`,
    instagram: `Platform: Instagram. Buat hook kuat dalam 1-2 baris pertama (sebelum "more"). Letakkan 10-15 hashtag relevan selepas caption. Max 2200 aksara.`,
    twitter: `Platform: Twitter/X. WAJIB di bawah 280 aksara setiap tweet. Padat, impactful, 1-2 hashtag sahaja.`,
    threads: `Platform: Threads (Meta). Gaya santai dan casual seperti Twitter. Maksimum 500 aksara setiap post. 1-3 hashtag.`,
    tiktok: `Platform: TikTok. MESTI bermula dengan hook kuat dalam 3-5 patah kata pertama untuk tahan perhatian. Energetik, relatable, trending. Sertakan hashtag popular seperti #fyp #viral.`,
    linkedin: `Platform: LinkedIn. Nada profesional tapi human. Mulakan dengan insight atau kisah peribadi. 3-5 hashtag profesional di akhir.`,
  };

  // Language guide
  const languageGuides = {
    melayu: `Bahasa: Bahasa Malaysia yang natural dan bersemangat.`,
    english: `Language: Write entirely in natural, conversational English.`,
    rojak: `Bahasa: Guna Bahasa Rojak / Manglish yang popular di Malaysia (campuran Melayu + English). Natural dan relatable.`,
  };

  // Campaign goal context
  const goalGuides = {
    jualan: `OBJEKTIF: Post Jualan (Sales). Matlamat utama adalah MENJUAL. Perlu ada urgency, nilai produk yang jelas, dan CTA yang kuat untuk membeli/hubungi.`,
    biasa: `OBJEKTIF: Post Biasa (Awareness). Matlamat adalah meningkatkan kesedaran dan engagement organik. Tidak perlu terlalu hard-sell.`,
    engagement: `OBJEKTIF: Post Engagement. Matlamat adalah mendapat KOMEN, SHARE, LIKE, dan interaksi. Galakkan pembaca untuk bertindak balas — soalan, pendapat, atau tag kawan.`,
  };

  // Hook type — the core marketing framework
  const hookFrameworks = {
    fomo: `
RANGKA KERJA HOOK — FOMO (Fear Of Missing Out):
Bina rasa TAKUT TERLEPAS dalam diri pembaca. Gunakan elemen-elemen berikut:
- Scarcity: "Terhad", "Stok hampir habis", "Hanya untuk 50 orang pertama"
- Urgency: "Hari ini sahaja", "Tawaran berakhir malam ini", "Jangan tunggu esok"
- Social proof of demand: "Ramai yang dah order", "Trending sekarang"
- FOMO trigger: "Jangan sampai menyesal kemudian"`,

    'problem-solution': `
RANGKA KERJA HOOK — PROBLEM-SOLUTION (PAS Framework):
Ikuti urutan ini dengan ketat:
1. PAIN (Masalah): Mulakan dengan masalah/kesakitan yang pembaca RASAI secara emosional
2. AGITATE (Perburukkan): Terangkan betapa teruknya masalah itu jika dibiarkan
3. SOLUTION (Penyelesaian): Perkenalkan produk/perkhidmatan sebagai penyelesaian muktamad
Buat pembaca rasa "Ini memang masalah aku!" di perenggan pertama.`,

    storytelling: `
RANGKA KERJA HOOK — STORYTELLING (HOOK → STORY → LESSON → CTA):
Ikuti arc ini:
1. HOOK: Mulakan dengan ayat pembuka yang mengejutkan atau intriguing (bukan "Hai semua!")
2. STORY: Ceritakan kisah pendek yang relatable — watak, konflik, penyelesaian
3. LESSON: Kongsi nilai/pelajaran dari kisah tersebut
4. CTA: Ajak pembaca bertindak balas atau mengambil tindakan
Buat ia rasa PERIBADI dan AUTHENTIC, bukan iklan.`,

    'social-proof': `
RANGKA KERJA HOOK — SOCIAL PROOF (Bukti Sosial):
Bina kepercayaan melalui bukti pihak ketiga:
- Gunakan angka yang spesifik: "1,247 pelanggan", "Rating 4.9 bintang", "7 tahun dalam industri"
- Testimoni ringkas atau quote dari pelanggan
- Pencapaian atau pengiktirafan yang relevan
- Bandingan sebelum-selepas
- Bukti kejayaan atau hasil yang nyata
Buat pembaca rasa SELAMAT untuk membeli/mencuba.`,

    curiosity: `
RANGKA KERJA HOOK — CURIOSITY GAP (Jurang Ingin Tahu):
Buka "gelung" di minda pembaca yang MESTI mereka tutup dengan membaca habis:
- Mulakan dengan fakta mengejutkan: "Kebanyakan orang tidak tahu ini..."
- Tanya soalan provocative: "Apa yang buat XX ini lain dari yang lain?"
- Buat janji tanpa mendedahkan semua: "Rahsia yang ramai seller tidak kongsikan..."
- Gunakan kontra-intuitif: "Benda yang selama ni kita salah faham tentang XX"
Buat pembaca TIDAK BOLEH berhenti baca.`,

    direct: `
RANGKA KERJA HOOK — DIRECT SELL (Jualan Terus / AIDA):
Gaya jual terus tanpa berpusing-pusing:
1. ATTENTION: Tajuk/baris pertama yang terus grab perhatian dengan manfaat terbesar
2. INTEREST: Terangkan ciri-ciri atau USP (Unique Selling Point) dengan jelas
3. DESIRE: Buat mereka MAHU — harga, nilai, perbandingan, atau rasa eksklusif
4. ACTION: CTA yang crystal clear — "DM sekarang", "Klik link", "WhatsApp kami"
Tiada basa-basi. Langsung ke point.`,
  };

  // Thread structure instruction
  let threadInstruction = '';
  if (threadCount > 1) {
    threadInstruction = `
STRUKTUR OUTPUT — ${threadCount} THREAD/BAHAGIAN:
Pecahkan content kepada TEPAT ${threadCount} bahagian yang berasingan.
Format setiap bahagian seperti ini (WAJIB ikut format ini):
===THREAD 1===
[kandungan thread 1]
===THREAD 2===
[kandungan thread 2]
...dan seterusnya hingga ===THREAD ${threadCount}===

Setiap thread mesti boleh berdiri sendiri tetapi ada kesinambungan antara satu sama lain.
Thread 1 = Hook yang kuat. Thread terakhir = CTA yang jelas.`;
  }

  // Product link CTA
  const ctaInstruction = productLink
    ? `\nPRODUCT LINK / CTA LINK: "${productLink}" — Sertakan link ini secara natural dalam CTA di bahagian akhir atau thread terakhir.`
    : '';

  // Extra details
  const extraInstruction = extraDetails && extraDetails.trim()
    ? `\nMAKLUMAT TAMBAHAN / BUTIRAN PRODUK:\n${extraDetails}`
    : '';

  // Reference style
  const referenceInstruction = rujukan && rujukan.trim()
    ? `\nCONTOH GAYA PENULISAN RUJUKAN:\n"${rujukan.trim()}"\n(Tiru gaya, nada, dan struktur ayat ini. Jangan salin bulat-bulat.)`
    : '';

  const singleOrThread = threadCount === 1 ? 'SATU caption/post yang lengkap' : `TEPAT ${threadCount} thread/bahagian`;

  let prompt = `Anda adalah copywriter media sosial profesional yang pakar dalam psikologi pemasaran dan teknik viral content di Malaysia.

${goalGuides[campaignGoal] || goalGuides.biasa}

${platformGuides[platform] || ''}

${languageGuides[language] || languageGuides.melayu}

TOPIK / PRODUK / PERKHIDMATAN:
"${postTopic}"
${extraInstruction}
${ctaInstruction}
${hookFrameworks[hookType] || hookFrameworks.direct}
${threadInstruction}
${referenceInstruction}

ARAHAN WAJIB:
- Tulis terus ${singleOrThread} sahaja, TANPA sebarang penjelasan, nota, atau komen tentang apa yang anda tulis
- JANGAN mulakan dengan "Berikut adalah...", "Sudah tentu...", atau sebarang pengenalan
- JANGAN guna placeholder seperti [nama produk] — guna maklumat yang diberikan
- Pastikan hook di baris PERTAMA adalah assaultingly kuat — pembaca mesti berhenti scroll
- Emoji perlu strategik dan berkesan, bukan semata-mata untuk hiasan
- Output mesti sedia untuk copy-paste dan post terus`;

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
async function callGemini(model, prompt, apiKey, maxTokens = 1024) {
  const url = `${GEMINI_BASE_URL}/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: maxTokens,
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
async function callDeepSeek(model, prompt, apiKey, maxTokens = 1024) {
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
      max_tokens: maxTokens
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
 * Call any OpenAI-compatible custom API endpoint
 */
async function callCustom(endpointUrl, model, prompt, apiKey) {
  // Normalize endpoint: if user provided a chat completions path use as-is, else append
  let url = endpointUrl.trim().replace(/\/$/, '');
  if (!url.endsWith('/chat/completions')) {
    url = url + '/chat/completions';
  }

  const headers = {
    'Content-Type': 'application/json',
  };
  // Only add Authorization header if key is provided (Ollama local doesn't need it)
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 1024
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const errMsg = err.error?.message || '';

    if (response.status === 401 || response.status === 403) {
      throw { fatal: true, message: `Custom API: Akses ditolak (${response.status}). Sila semak API key anda.` };
    }
    if (response.status === 404) {
      throw { fatal: true, message: `Custom API: Endpoint tidak dijumpai (404). Sila semak URL endpoint anda.` };
    }
    if (response.status === 429) {
      throw { fatal: false, status: 429, model, message: errMsg || 'Rate limit untuk custom API.' };
    }

    throw { fatal: true, message: errMsg || `Custom API error (${response.status})` };
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim();
}

/**
 * Generate caption using AI (Gemini, DeepSeek, or Custom)
 * @param {string} provider - 'gemini' | 'deepseek' | 'custom'
 * @param {string} model - Specific model ID
 * @param {Object} params - Caption generation inputs
 * @param {boolean} isMarketingMode - Whether to use the marketing prompt builder
 * @param {Object} marketingParams - Marketing-specific parameters
 * @returns {Promise<Object>} Resulting caption structure
 */
export async function generateWithAI(provider, model, params, isMarketingMode = false, marketingParams = null) {
  const apiKey = getApiKey(provider);

  // Build the prompt — marketing or general
  const promptBuilder = () => isMarketingMode && marketingParams
    ? buildMarketingPrompt(marketingParams)
    : buildPrompt(params);

  // Higher token limit for multi-thread marketing output
  const maxTokens = isMarketingMode && marketingParams?.threadCount > 1
    ? Math.max(1024, marketingParams.threadCount * 600)
    : 1024;

  if (provider === 'custom') {
    const endpoint = getCustomEndpoint();
    const customModel = model || getCustomModel();
    if (!endpoint || !customModel) {
      throw new Error('Konfigurasi Custom API tidak lengkap. Sila isi URL Endpoint dan Nama Model.');
    }
    const prompt = promptBuilder();
    try {
      const rawCaption = await callCustom(endpoint, customModel, prompt, apiKey);
      if (!rawCaption) throw new Error('Custom API tidak berjaya menjana caption.');
      const caption = sanitizeAICaption(rawCaption);
      return {
        caption,
        charCount: caption.length,
        maxChars: null,
        templateIndex: 0,
        totalVariations: '∞',
        isAI: true,
        isMarketing: isMarketingMode,
        provider: 'Custom API',
        model: customModel,
      };
    } catch (err) {
      if (err.fatal !== undefined) throw new Error(err.message);
      throw new Error(err.message || 'Gagal menjana caption menggunakan Custom API.');
    }
  }

  if (!apiKey) {
    throw new Error(`API key untuk ${provider === 'gemini' ? 'Google Gemini' : 'DeepSeek'} belum ditetapkan. Sila masukkan API key anda.`);
  }

  const prompt = promptBuilder();

  if (provider === 'gemini') {
    let lastError = null;
    
    // Fallback chain logic for Gemini if default model fails
    const modelsToTry = model ? [model, ...GEMINI_MODELS.filter(m => m !== model)] : GEMINI_MODELS;
    
    for (const currentModel of modelsToTry) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          if (attempt > 0) await sleep(2000);
          const rawCaption = await callGemini(currentModel, prompt, apiKey, maxTokens);
          if (!rawCaption) throw { fatal: true, message: 'AI tidak berjaya menjana caption.' };
          
          const caption = sanitizeAICaption(rawCaption);
          return {
            caption,
            charCount: caption.length,
            maxChars: null,
            templateIndex: 0,
            totalVariations: '∞',
            isAI: true,
            isMarketing: isMarketingMode,
            provider: 'Google Gemini',
            model: currentModel,
          };
        } catch (err) {
          if (err.fatal) throw new Error(err.message);
          lastError = err;
          if (attempt === 0 && err.status === 429) break;
        }
      }
    }
    throw new Error(lastError?.message || 'Gagal menjana caption menggunakan Google Gemini.');
  } else {
    // DeepSeek AI
    try {
      const rawCaption = await callDeepSeek(model || 'deepseek-v4-flash', prompt, apiKey, maxTokens);
      if (!rawCaption) throw new Error('AI tidak berjaya menjana caption.');
      
      const caption = sanitizeAICaption(rawCaption);
      return {
        caption,
        charCount: caption.length,
        maxChars: null,
        templateIndex: 0,
        totalVariations: '∞',
        isAI: true,
        isMarketing: isMarketingMode,
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
 * @param {string} provider - 'gemini' | 'deepseek' | 'custom'
 * @param {string} model - Specific model ID
 * @param {string} rawText - Unstructured messy details
 * @returns {Promise<string>} Polished bullet points
 */
export async function polishTextWithAI(provider, model, rawText) {
  const apiKey = getApiKey(provider);

  // Validate key for Gemini/DeepSeek (Custom API may have no key for local endpoints)
  if (provider !== 'custom' && !apiKey) {
    throw new Error(`API key untuk ${provider === 'gemini' ? 'Google Gemini' : 'DeepSeek'} diperlukan untuk menggunakan ciri ini.`);
  }

  const prompt = `Anda adalah asisten penulisan profesional. Sila kemas kini dan perkemas butiran mentah di bawah menjadi isi-isi penting (bullet points) yang tersusun, kemas, profesional, dan padat dalam Bahasa Malaysia.\nSila kekalkan semua maklumat penting seperti nama, tarikh, angka, dan lokasi.\nJangan tambah sebarang pengenalan atau kesimpulan, tulis isi-isi penting terus dalam format senarai (bullet points) menggunakan simbol "-".\nJangan gunakan emoji.\n\nTeks Mentah:\n"${rawText}"`;

  if (provider === 'gemini') {
    const selectedModel = model || 'gemini-2.0-flash';
    try {
      const result = await callGemini(selectedModel, prompt, apiKey);
      if (!result) throw new Error('Tiada maklum balas dari AI.');
      return result;
    } catch (err) {
      throw new Error(err.message || 'Gagal mengemaskini teks menggunakan Gemini.');
    }
  } else if (provider === 'custom') {
    const endpoint = getCustomEndpoint();
    const customModel = model || getCustomModel();
    if (!endpoint || !customModel) {
      throw new Error('Konfigurasi Custom API tidak lengkap. Sila isi URL Endpoint dan Nama Model.');
    }
    try {
      const result = await callCustom(endpoint, customModel, prompt, apiKey);
      if (!result) throw new Error('Tiada maklum balas dari Custom API.');
      return result;
    } catch (err) {
      if (err.fatal !== undefined) throw new Error(err.message);
      throw new Error(err.message || 'Gagal mengemaskini teks menggunakan Custom API.');
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
