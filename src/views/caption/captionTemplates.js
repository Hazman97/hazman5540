/**
 * Caption Generator — Template Engine
 * Pre-built templates for generating captions by category × tone × platform
 */

// ============================================
// CATEGORIES
// ============================================
export const categories = [
  { id: 'ziarah', label: 'Ziarah', emoji: '', desc: 'Lawatan ke rumah / hospital' },
  { id: 'lawatan', label: 'Lawatan Rasmi', emoji: '', desc: 'Lawatan kerja / rasmi' },
  { id: 'sumbangan', label: 'Agihan Sumbangan', emoji: '', desc: 'Bantuan / derma / sumbangan' },
  { id: 'promosi', label: 'Promosi / Hebahan', emoji: '', desc: 'Iklan / promosi acara' },
  { id: 'ucapan', label: 'Ucapan / Perayaan', emoji: '', desc: 'Hari raya / sambutan' },
  { id: 'umum', label: 'Umum', emoji: '', desc: 'Caption umum / fleksibel' },
];

// ============================================
// PLATFORMS
// ============================================
export const platforms = [
  { id: 'whatsapp', label: 'WhatsApp', emoji: '', maxChars: null, tip: 'Gunakan perenggan pendek, emoji & bold (*text*)' },
  { id: 'facebook', label: 'Facebook', emoji: '', maxChars: null, tip: 'Penceritaan panjang OK, tag orang & tempat' },
  { id: 'instagram', label: 'Instagram', emoji: '', maxChars: 2200, tip: 'Hashtag penting! Max 30 hashtags, caption menarik di 2 baris pertama' },
  { id: 'twitter', label: 'Twitter/X', emoji: '', maxChars: 280, tip: 'Pendek & padat. Thread jika perlu. Hashtag max 2-3' },
  { id: 'linkedin', label: 'LinkedIn', emoji: '', maxChars: 3000, tip: 'Nada profesional, storytelling, tag organisasi' },
];

// ============================================
// TONES
// ============================================
export const tones = [
  { id: 'ceria', label: 'Ceria', emoji: '' },
  { id: 'sedih', label: 'Sedih', emoji: '' },
  { id: 'rasmi', label: 'Rasmi', emoji: '' },
  { id: 'santai', label: 'Santai', emoji: '' },
];

// ============================================
// TEMPLATE DATABASE
// ============================================
const templates = {
  // ── ZIARAH ──
  ziarah: {
    ceria: [
      'Alhamdulillah, hari ini berkesempatan menziarahi {nama} di {lokasi}. \n\nSemoga {nama} sentiasa diberikan kesihatan yang baik dan dipermudahkan segala urusan. Terima kasih atas layanan yang mesra! \n\n {tarikh}\n {lokasi}',
      'Alhamdulillah, syukur dapat meluangkan masa untuk ziarah ke rumah {nama} di {lokasi} hari ini. \n\nMoment yang penuh bermakna. Semoga silaturrahim ini membawa keberkatan untuk semua. \n\n {tarikh}',
      'Hari yang bermakna! Dapat bertemu dan menziarahi {nama} di {lokasi}. \n\nSemoga ikatan ukhwah ini sentiasa diperkukuhkan. Jazakallahu khairan! \n\n {tarikh}\n {lokasi}',
      'Seronoknya hari ini dapat melawat {nama} kat {lokasi}! \n\nTerima kasih jemput kami. Makanan semua sedap-sedap, borak pun tak ingat dunia. Semoga murah rezeki selalu! \n\n {tarikh}\n {lokasi}',
      'Rezeki hari ini dapat bersua muka dengan {nama} di {lokasi}. Memang riuh rendah jadinya! \n\nInsya-Allah panjang umur kita jumpa lagi. Moga ukhwah kita kekal selamanya. \n\n {tarikh}',
    ],
    sedih: [
      'Hari ini, kami telah menziarahi {nama} di {lokasi}. \n\nSemoga {nama} diberikan kesabaran dan kekuatan dalam menghadapi ujian ini. Kami sentiasa mendoakan yang terbaik.\n\n"Sesungguhnya bersama kesusahan itu ada kemudahan." — Al-Insyirah: 6\n\n {tarikh}\n {lokasi}',
      'Dengan hati yang sebak, kami menziarahi {nama} di {lokasi}. \n\nSemoga Allah permudahkan segala urusan dan berikan kesembuhan yang sempurna. Aamiin.\n\n {tarikh}',
      'Sayu hati melihat keadaan {nama} ketika kami singgah menziarahi di {lokasi} hari ini. \n\nSama-sama kita titipkan doa agar segalanya dipermudahkan dan moga terus kuat menghadapi dugaan ini. Amin YRA. \n\n {tarikh}',
      'Baru berkesempatan melawat {nama} di {lokasi}. Berat mata memandang, berat lagi bahu yang memikul. \n\nSemoga dikurniakan keajaiban dan kesembuhan buat {nama}. Kami sentiasa di sini kalau memerlukan apa-apa bantuan.\n\n {tarikh}\n {lokasi}',
    ],
    rasmi: [
      'Pada {tarikh}, pihak kami telah mengadakan lawatan ziarah ke {lokasi} untuk bertemu {nama}.\n\nLawatan ini bertujuan untuk mengeratkan hubungan silaturrahim serta memberikan sokongan moral kepada yang berkenaan.\n\nSemoga usaha murni ini dapat diteruskan pada masa hadapan.\n\n {tarikh}\n {lokasi}',
      'Makluman:\n\nSatu lawatan ziarah telah diadakan pada {tarikh} di {lokasi} bagi melawat {nama}.\n\nPihak kami mengambil kesempatan ini untuk menyampaikan sokongan dan kata-kata semangat.\n\nTerima kasih kepada semua yang terlibat.',
      'Delegasi kami telah menyantuni {nama} di {lokasi} bersempena lawatan dan ziarah hari ini.\n\nPertemuan ini diharap dapat menyuntik semangat dan memperkukuhkan jalinan ukhuwah yang sedia ada antara semua pihak.\n\n {tarikh}\n {lokasi}',
      'Kunjungan hormat dan ziarah ke atas {nama} telah disempurnakan pada {tarikh} bertempat di {lokasi}.\n\nKami merakamkan ucapan setinggi-tinggi penghargaan atas kesudian menerima kunjungan ini.\n\nSekian, terima kasih.',
    ],
    santai: [
      'Hari ni sempat singgah rumah {nama} kat {lokasi}. \n\nLama tak jumpa, banyak cerita nak share! Alhamdulillah semuanya sihat. \n\n {tarikh}',
      'Jalan-jalan ziarah rumah {nama} \n\nBest sangat dapat jumpa & borak-borak. Kena buat lagi ni! \n\n {lokasi} • {tarikh}',
      'Fuhh, nasib baik {nama} ada kat {lokasi}. Redah je datang ziarah harini! \n\nLayan borak sampai tak sedar jam. Thanks layan kitorang yang bising ni haha! \n\n {tarikh}',
      'Singgah kejap pekena kopi kat tempat {nama} area {lokasi}. \n\nSembang santai je harini, lama gila tak catch up. Next time kita plan lepak lama sikit! \n\n {tarikh} •  {lokasi}',
    ],
  },

  // ── LAWATAN RASMI ──
  lawatan: {
    ceria: [
      'Alhamdulillah, hari ini berjaya mengadakan lawatan rasmi ke {lokasi}! \n\nBertemu dengan {nama} untuk membincangkan peluang kerjasama yang menarik. Insya-Allah banyak manfaat yang bakal diperolehi. \n\n {tarikh}\n {lokasi}',
      'Lawatan yang sangat produktif ke {lokasi} hari ini! \n\nTerima kasih {nama} atas sambutan yang hebat dan perbincangan yang membina. Semoga kerjasama ini berterusan! \n\n {tarikh}',
    ],
    sedih: [
      'Pada {tarikh}, kami telah melawat {lokasi} untuk memahami situasi semasa yang dihadapi.\n\nMelihat keadaan di sana amat menyentuh hati. Semoga bantuan dapat disalurkan dengan segera. \n\n {lokasi}',
    ],
    rasmi: [
      'LAWATAN RASMI\n\nYang Berhormat / Pihak pengurusan telah mengadakan lawatan rasmi ke {lokasi} pada {tarikh}.\n\nAntara perkara yang dibincangkan:\n{butiran}\n\nLawatan ini diharap dapat mempercepatkan pelaksanaan inisiatif yang dirancang.\n\n {tarikh}\n {lokasi}',
      'Satu lawatan kerja telah diadakan pada {tarikh} melibatkan {nama} di {lokasi}.\n\nTujuan: Menilai perkembangan semasa dan merancang tindakan susulan.\n\n{butiran}\n\nTerima kasih kepada semua pihak yang terlibat.',
    ],
    santai: [
      'Hari ni ada lawatan ke {lokasi}. Jumpa {nama} bincang pasal kerja. \n\nBanyak idea baru lepas meeting ni. Productive gila! \n\n {tarikh}',
    ],
  },

  // ── AGIHAN SUMBANGAN ──
  sumbangan: {
    ceria: [
      'Alhamdulillah! \n\nHari ini kami telah berjaya menyalurkan sumbangan kepada {nama} di {lokasi}.\n\nTerima kasih kepada semua penderma dan sukarelawan yang telah menjayakan misi ini! Semoga rezeki ini membawa keberkatan. \n\n {tarikh}\n {lokasi}',
      'Misi agihan sumbangan BERJAYA! \n\nAlhamdulillah, bantuan telah sampai kepada {nama} di {lokasi}. Senyuman mereka adalah hadiah terbaik untuk kami semua. \n\n{butiran}\n\n {tarikh}',
    ],
    sedih: [
      'Kami telah menziarahi dan menyalurkan sumbangan kepada {nama} di {lokasi}. \n\nMelihat keadaan yang dihadapi amat menyentuh hati. Semoga bantuan kecil ini dapat meringankan beban yang ditanggung.\n\nJom sama-sama hulurkan bantuan. Setiap sumbangan amat bermakna. \n\n {tarikh}\n {lokasi}',
    ],
    rasmi: [
      'PROGRAM AGIHAN SUMBANGAN\n\nPada {tarikh}, pihak kami telah mengadakan program agihan sumbangan di {lokasi}.\n\nPenerima: {nama}\n\n{butiran}\n\nProgram ini bertujuan meringankan beban golongan yang memerlukan. Terima kasih kepada semua pihak yang menyumbang.\n\n {tarikh}\n {lokasi}',
    ],
    santai: [
      'Hari ni team pergi agih bantuan ke {lokasi}! \n\nSyukur sangat sebab dapat bantu {nama}. Walaupun kecil, insya-Allah bermakna. \n\nKalau korang nak contribute jugak, jom DM! \n\n {tarikh}',
    ],
  },

  // ── PROMOSI / HEBAHAN ──
  promosi: {
    ceria: [
      ' HEBAHAN!\n\nJom sertai program kami! \n\n {nama}\n {tarikh}\n {lokasi}\n\n{butiran}\n\nJangan lepaskan peluang ini! Slot TERHAD. \n\nUntuk maklumat lanjut, hubungi kami segera! ',
      ' JANGAN TERLEPAS! \n\n{nama} bakal berlangsung tidak lama lagi!\n\n {tarikh}\n {lokasi}\n\n{butiran}\n\nJom ramai-ramai! Yang jauh dikenang, yang dekat dijemput. ',
    ],
    rasmi: [
      'MAKLUMAN RASMI\n\nSukacita dimaklumkan bahawa {nama} akan diadakan seperti berikut:\n\n Tarikh: {tarikh}\n Lokasi: {lokasi}\n\n{butiran}\n\nSemua dijemput hadir. Kerjasama daripada semua pihak amat dihargai.\n\nSekian, terima kasih.',
    ],
    sedih: [
      'Dengan rasa terharu, kami ingin memaklumkan tentang {nama}. \n\nKami memerlukan bantuan dan sokongan daripada semua pihak.\n\n {tarikh}\n {lokasi}\n\n{butiran}\n\nSetiap sumbangan, walaupun kecil, amat bermakna. Terima kasih.',
    ],
    santai: [
      'Eh korang! Ada event best ni! \n\n {nama}\n {tarikh}\n {lokasi}\n\n{butiran}\n\nJom datang ramai-ramai! Ajak kawan sekali. ',
    ],
  },

  // ── UCAPAN / PERAYAAN ──
  ucapan: {
    ceria: [
      ' {nama}! \n\nSemoga hari yang istimewa ini dipenuhi dengan kebahagiaan, keberkatan dan kesejahteraan.\n\nDaripada kami semua, dengan penuh kasih sayang dan doa yang tulus. \n\n {tarikh}',
      ' Selamat {nama}! \n\nSemoga tahun ini lebih indah dari yang sebelumnya. Dipermudahkan segala urusan dan dilimpahi rezeki. \n\nDengan penuh kasih,\n {tarikh}',
    ],
    sedih: [
      'Dalam suasana yang penuh insaf, kami ingin mengucapkan {nama}. \n\nSemoga kita semua diberikan kekuatan dan kesabaran. Marilah kita saling mendoakan kebaikan.\n\n {tarikh}',
    ],
    rasmi: [
      'UCAPAN RASMI\n\nSalam sejahtera dan salam hormat.\n\nSempena {nama}, kami ingin mengucapkan setinggi-tinggi tahniah dan penghargaan.\n\nSemoga sambutan pada {tarikh} ini membawa keberkatan kepada semua.\n\nSekian, terima kasih.',
    ],
    santai: [
      'Happy {nama}! \n\nWishing you all the best! Semoga semuanya berjalan lancar dan penuh kegembiraan. \n\nLet\'s celebrate! \n\n {tarikh}',
    ],
  },

  // ── UMUM ──
  umum: {
    ceria: [
      'Alhamdulillah! \n\n{butiran}\n\nTerima kasih kepada semua yang terlibat. Semoga usaha ini membawa keberkatan dan manfaat kepada semua. \n\n {tarikh}\n {lokasi}',
      '{butiran}\n\nAlhamdulillah, syukur dengan pencapaian ini. Semoga segala usaha baik ini diteruskan! \n\n {tarikh}',
    ],
    sedih: [
      '{butiran}\n\nSemoga kita semua diberikan kekuatan dalam menghadapi dugaan ini. Marilah kita saling mendoakan. \n\n {tarikh}\n {lokasi}',
    ],
    rasmi: [
      'MAKLUMAN\n\n{butiran}\n\nKerjasama semua pihak dalam hal ini amat dihargai.\n\n {tarikh}\n {lokasi}\n\nSekian, terima kasih.',
    ],
    santai: [
      'Hey korang! \n\n{butiran}\n\nThat\'s it for now. Stay tuned! \n\n {tarikh}',
    ],
  },
};

// ============================================
// HASHTAG PRESETS
// ============================================
const hashtagSets = {
  ziarah: ['#Ziarah', '#Silaturrahim', '#KitaJaga', '#Ukhwah', '#KomunitiPrihatin'],
  lawatan: ['#LawatanRasmi', '#Kerjasama', '#Pembangunan', '#Produktif'],
  sumbangan: ['#Sumbangan', '#BantuanPrihatin', '#KitaBantu', '#Derma', '#Amal'],
  promosi: ['#JomSertai', '#EventMalaysia', '#JanganLepas', '#SaveTheDate'],
  ucapan: ['#Ucapan', '#Sambutan', '#Doa', '#Bersyukur'],
  umum: ['#Update', '#Info', '#Malaysia'],
};

// ============================================
// GENERATION ENGINE
// ============================================

/**
 * Generate a caption based on inputs
 * @param {Object} params
 * @param {string} params.category - Category ID
 * @param {string} params.platform - Platform ID
 * @param {string} params.tone - Tone ID
 * @param {string} params.nama - Subject name
 * @param {string} params.tarikh - Date
 * @param {string} params.lokasi - Location
 * @param {string} params.butiran - Details/bullet points
 * @param {number} [params.variationIndex] - Specific template variation to use
 * @returns {Object} { caption, charCount, hashtags }
 */
export function generateCaption({ category, platform, tone, nama, tarikh, lokasi, butiran, variationIndex }) {
  // Get templates for this combo
  const categoryTemplates = templates[category];
  if (!categoryTemplates) return { caption: 'Kategori tidak dijumpai.', charCount: 0, hashtags: '' };

  const toneTemplates = categoryTemplates[tone];
  if (!toneTemplates || toneTemplates.length === 0) return { caption: 'Tiada template untuk kombinasi ini.', charCount: 0, hashtags: '' };

  // Pick a template (specific or random)
  const idx = variationIndex !== undefined ? variationIndex % toneTemplates.length : Math.floor(Math.random() * toneTemplates.length);
  let caption = toneTemplates[idx];

  // Fill placeholders
  const replacements = {
    '{nama}': nama || '___',
    '{tarikh}': tarikh || '___',
    '{lokasi}': lokasi || '___',
    '{butiran}': butiran || '___',
  };

  Object.entries(replacements).forEach(([key, val]) => {
    caption = caption.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), val);
  });

  // Remove empty placeholder lines
  caption = caption.replace(/\n.*___.*\n/g, '\n');
  caption = caption.replace(/\s*___/g, '').replace(/\s*___/g, '');
  caption = caption.trim();

  // Platform-specific formatting
  const platformDef = platforms.find(p => p.id === platform);
  let hashtags = '';

  if (platform === 'whatsapp') {
    // WhatsApp: use bold markers
    caption = caption.replace(/^([A-Z\s!]+)$/gm, '*$1*');
  } else if (platform === 'instagram') {
    // Instagram: add hashtags
    const tags = hashtagSets[category] || hashtagSets.umum;
    hashtags = '\n\n' + tags.join(' ');
    caption += hashtags;
  } else if (platform === 'twitter') {
    // Twitter: truncate if over 280, add 1-2 hashtags
    const tags = (hashtagSets[category] || []).slice(0, 2);
    if (tags.length) {
      const tagStr = '\n\n' + tags.join(' ');
      if (caption.length + tagStr.length <= 280) {
        caption += tagStr;
        hashtags = tagStr;
      }
    }
    if (caption.length > 280) {
      caption = caption.substring(0, 277) + '...';
    }
  } else if (platform === 'linkedin') {
    // LinkedIn: professional formatting
    const tags = (hashtagSets[category] || []).slice(0, 3);
    if (tags.length) {
      hashtags = '\n\n' + tags.join(' ');
      caption += hashtags;
    }
  }

  return {
    caption,
    charCount: caption.length,
    maxChars: platformDef?.maxChars || null,
    hashtags,
    templateIndex: idx,
    totalVariations: toneTemplates.length,
  };
}

/**
 * Format a date to a readable string
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// ============================================
// HISTORY (localStorage)
// ============================================
const HISTORY_KEY = 'caption_generator_history';
const MAX_HISTORY = 10;

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveToHistory(entry) {
  const history = getHistory();
  history.unshift({
    ...entry,
    id: Date.now(),
    savedAt: new Date().toISOString(),
  });
  if (history.length > MAX_HISTORY) history.pop();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

// ============================================
// REFERENCE COLLECTION (localStorage)
// ============================================
const REFS_KEY = 'caption_generator_references';

export function getReferenceCollection() {
  try {
    return JSON.parse(localStorage.getItem(REFS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveReference(captionText) {
  if (!captionText || !captionText.trim()) return;
  const refs = getReferenceCollection();
  refs.unshift({
    id: Date.now(),
    text: captionText.trim(),
    savedAt: new Date().toISOString(),
  });
  localStorage.setItem(REFS_KEY, JSON.stringify(refs));
}

export function deleteReference(id) {
  const refs = getReferenceCollection();
  const updated = refs.filter(r => r.id !== id);
  localStorage.setItem(REFS_KEY, JSON.stringify(updated));
}
