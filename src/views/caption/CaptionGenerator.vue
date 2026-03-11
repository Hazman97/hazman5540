<template>
  <div class="caption-app">
    <!-- Animated Background -->
    <div class="bg-shapes">
      <div class="shape s1"></div>
      <div class="shape s2"></div>
      <div class="shape s3"></div>
    </div>

    <div class="layout">
      <!-- LEFT: Input Panel -->
      <aside class="panel input-panel glass">
        <header class="panel-header">
          <div class="brand-icon"></div>
          <div>
            <h1>Penjana Copywriting</h1>
            <p>Caption Generator Tool</p>
          </div>
        </header>

        <!-- Mode Toggle -->
        <div class="mode-toggle">
          <button
            @click="mode = 'template'"
            :class="['mode-btn', { active: mode === 'template' }]"
          >
             Template
          </button>
          <button
            @click="mode = 'ai'"
            :class="['mode-btn ai', { active: mode === 'ai' }]"
          >
             AI (Gemini)
          </button>
        </div>

        <!-- AI API Key Settings -->
        <div v-if="mode === 'ai'" class="api-key-section">
          <div v-if="!showApiKeyInput && apiKeyConfigured" class="api-key-status">
            <span class="key-dot green"></span>
            <span>API Key ditetapkan</span>
            <button @click="showApiKeyInput = true" class="key-edit-btn">Tukar</button>
          </div>
          <div v-else class="api-key-form">
            <label> Gemini API Key</label>
            <div class="key-input-row">
              <input
                v-model="apiKeyInput"
                type="password"
                placeholder="Masukkan API key anda"
                class="text-input"
              />
              <button @click="handleSaveApiKey" class="key-save-btn">Simpan</button>
            </div>
            <a href="https://aistudio.google.com/apikey" target="_blank" class="key-help">
              → Dapatkan API key percuma dari Google AI Studio
            </a>
          </div>
        </div>

        <div class="scroll-area">
          <!-- Category -->
          <section class="section">
            <h3> Kategori</h3>
            <div class="card-grid">
              <button
                v-for="cat in categories"
                :key="cat.id"
                @click="form.category = cat.id"
                :class="['select-card', { active: form.category === cat.id }]"
              >
                <span class="card-emoji">{{ cat.emoji }}</span>
                <span class="card-label">{{ cat.label }}</span>
              </button>
            </div>
          </section>

          <!-- Platform -->
          <section class="section">
            <h3> Platform</h3>
            <div class="platform-row">
              <button
                v-for="p in platforms"
                :key="p.id"
                @click="form.platform = p.id"
                :class="['platform-btn', { active: form.platform === p.id }]"
                :title="p.label"
              >
                <span class="platform-emoji">{{ p.emoji }}</span>
                <span class="platform-name">{{ p.label }}</span>
              </button>
            </div>
          </section>

          <!-- Tone -->
          <section class="section">
            <h3> Nada / Tone</h3>
            <div class="tone-row">
              <button
                v-for="t in tones"
                :key="t.id"
                @click="form.tone = t.id"
                :class="['tone-btn', { active: form.tone === t.id }]"
              >
                <span class="tone-emoji">{{ t.emoji }}</span>
                <span>{{ t.label }}</span>
              </button>
            </div>
          </section>

          <!-- Details -->
          <section class="section">
            <h3> Butiran</h3>

            <div class="input-group">
              <label>Tajuk / Nama</label>
              <input
                v-model="form.nama"
                type="text"
                placeholder="cth: Ahmad, Yayasan XYZ, Hari Raya Aidilfitri"
                class="text-input"
              />
            </div>

            <div class="input-row">
              <div class="input-group">
                <label> Tarikh</label>
                <input v-model="form.tarikh" type="date" class="text-input" />
              </div>
              <div class="input-group">
                <label> Lokasi</label>
                <input
                  v-model="form.lokasi"
                  type="text"
                  placeholder="cth: Kuala Lumpur"
                  class="text-input"
                />
              </div>
            </div>

            <div class="input-group">
              <label>Isi Penting / Info Mentah</label>
              <textarea
                v-model="form.butiran"
                class="text-input textarea"
                rows="4"
                placeholder="Tulis nota ringkas di sini&#10;cth:&#10;- 50 penerima bantuan&#10;- Sumbangan RM500 seorang&#10;- Kerjasama dengan NGO ABC"
              ></textarea>
            </div>
          </section>

          <!-- Reference Collection (Only for AI Mode) -->
          <section v-if="mode === 'ai'" class="section">
            <div class="section-header-row">
              <h3>📚 Koleksi Rujukan</h3>
              <span class="badge ai-badge" style="font-size: 0.65rem; padding: 0.2rem 0.4rem;">Baru</span>
            </div>
            
            <!-- Reference Input -->
            <div class="input-group">
              <label>Tambah Rujukan Baru</label>
              <div class="ref-input-area">
                <textarea
                  v-model="newReferenceInput"
                  class="text-input textarea"
                  rows="2"
                  placeholder="Tampal caption contoh di sini untuk AI tiru gaya bahasanya..."
                ></textarea>
                <button @click="handleAddReference" class="btn-sm mt-2 save-ref-btn" :disabled="!newReferenceInput.trim()">
                  💾 Simpan Rujukan
                </button>
              </div>
            </div>

            <!-- Saved References List -->
            <div v-if="referenceCollection.length > 0" class="input-group mt-3">
              <label>Pilih Rujukan (Pilihan)</label>
              <div class="ref-list">
                <div 
                  v-for="ref in referenceCollection" 
                  :key="ref.id"
                  @click="selectedReferenceId = (selectedReferenceId === ref.id ? null : ref.id)"
                  :class="['ref-card', { active: selectedReferenceId === ref.id }]"
                >
                  <div class="ref-text">{{ ref.text }}</div>
                  <button @click.stop="handleDeleteReference(ref.id)" class="del-ref-btn" title="Padam">🗑️</button>
                </div>
              </div>
            </div>
            <div v-else class="empty-ref-msg">
              Belum ada rujukan disimpan.
            </div>
          </section>

          <!-- Generate Button -->
          <button @click="handleGenerate" class="generate-btn" :disabled="!canGenerate || generating">
            <span v-if="generating" class="spinner"></span>
            <span v-else class="gen-icon">{{ mode === 'ai' ? '' : '' }}</span>
            <span>{{ generating ? 'Menjana...' : mode === 'ai' ? 'Jana dengan AI' : 'Jana Caption' }}</span>
          </button>

          <!-- AI Error -->
          <div v-if="aiError" class="ai-error">
             {{ aiError }}
          </div>
        </div>
      </aside>

      <!-- RIGHT: Output Panel -->
      <main class="panel output-panel glass">
        <!-- Empty State -->
        <div v-if="!result && history.length === 0" class="empty-state">
          <div class="empty-icon"></div>
          <h2>Sedia untuk menjana!</h2>
          <p>Pilih kategori, platform & nada di sebelah kiri, kemudian tekan <strong>"Jana Caption"</strong>.</p>
        </div>

        <!-- Result -->
        <div v-if="result" class="result-section">
          <div class="result-header">
            <h2>{{ result.isAI ? ' Hasil AI' : ' Hasil Caption' }}</h2>
            <div class="result-meta">
              <span class="meta-badge" :class="{ warning: result.maxChars && result.charCount > result.maxChars }">
                {{ result.charCount }} aksara
                <template v-if="result.maxChars"> / {{ result.maxChars }}</template>
              </span>
              <span v-if="result.isAI" class="meta-badge ai-badge"> AI Generated</span>
              <span v-else class="meta-badge neutral">
                Variasi {{ result.templateIndex + 1 }}/{{ result.totalVariations }}
              </span>
            </div>
          </div>

          <!-- Character limit warning -->
          <div v-if="result.maxChars && result.charCount > result.maxChars" class="limit-warning">
             Melebihi had {{ selectedPlatform?.label }}! Sila pendekkan caption anda.
          </div>

          <!-- Caption Output -->
          <div class="caption-output">
            <pre class="caption-text">{{ result.caption }}</pre>
          </div>

          <!-- Action Buttons -->
          <div class="action-row">
            <button @click="copyCaption" :class="['action-btn copy-btn', { copied }]">
              {{ copied ? ' Disalin!' : ' Salin' }}
            </button>
            <button @click="regenerate" class="action-btn regen-btn">
               Jana Semula
            </button>
            <button @click="saveCaption" class="action-btn save-btn" v-if="!justSaved">
               Simpan
            </button>
            <span v-else class="saved-msg"> Disimpan!</span>
          </div>

          <!-- Platform Tip -->
          <div v-if="selectedPlatform?.tip" class="platform-tip">
            <span class="tip-icon"></span>
            <span>{{ selectedPlatform.tip }}</span>
          </div>
        </div>

        <!-- History -->
        <div v-if="history.length > 0" class="history-section">
          <div class="history-header">
            <h3> Sejarah ({{ history.length }})</h3>
            <button @click="handleClearHistory" class="clear-btn">Kosongkan</button>
          </div>
          <div class="history-list">
            <div
              v-for="item in history"
              :key="item.id"
              class="history-card"
              @click="loadFromHistory(item)"
            >
              <div class="history-top">
                <span class="history-cat">{{ getCategoryEmoji(item.category) }} {{ item.category }}</span>
                <span class="history-time">{{ formatHistoryTime(item.savedAt) }}</span>
              </div>
              <p class="history-preview">{{ item.caption.substring(0, 100) }}{{ item.caption.length > 100 ? '...' : '' }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Mobile Generate FAB -->
    <button
      v-if="canGenerate"
      @click="handleGenerate"
      class="mobile-fab"
    >
       Jana
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import {
  categories,
  platforms,
  tones,
  generateCaption,
  formatDate,
  getHistory,
  saveToHistory,
  clearHistory,
  getReferenceCollection,
  saveReference,
  deleteReference
} from './captionTemplates.js';
import {
  generateWithAI,
  getApiKey,
  saveApiKey,
  hasApiKey,
} from './geminiService.js';

// Mode state
const mode = ref('template'); // 'template' | 'ai'
const apiKeyInput = ref('');
const showApiKeyInput = ref(false);
const apiKeyConfigured = ref(false);
const generating = ref(false);
const aiError = ref('');

// Form state
const form = reactive({
  category: 'ziarah',
  platform: 'whatsapp',
  tone: 'ceria',
  nama: '',
  tarikh: new Date().toISOString().split('T')[0],
  lokasi: '',
  butiran: '',
});

// Output & Features state
const result = ref(null);
const copied = ref(false);
const justSaved = ref(false);
const history = ref([]);
const variationCounter = ref(0);

// References State
const referenceCollection = ref([]);
const selectedReferenceId = ref(null);
const newReferenceInput = ref('');

// Computed
const canGenerate = computed(() => {
  if (mode.value === 'ai' && !apiKeyConfigured.value) return false;
  return form.category && form.platform && form.tone;
});
const selectedPlatform = computed(() => platforms.find(p => p.id === form.platform));

// API Key management
const handleSaveApiKey = () => {
  if (!apiKeyInput.value.trim()) return;
  saveApiKey(apiKeyInput.value);
  apiKeyConfigured.value = true;
  showApiKeyInput.value = false;
  apiKeyInput.value = '';
};

// Methods
const handleGenerate = async () => {
  aiError.value = '';
  generating.value = true;

  try {
    if (mode.value === 'ai') {
      // AI mode
      result.value = await generateWithAI({
        category: form.category,
        platform: form.platform,
        tone: form.tone,
        nama: form.nama,
        tarikh: form.tarikh ? formatDate(form.tarikh) : '',
        lokasi: form.lokasi,
        butiran: form.butiran,
        rujukan: selectedReferenceId.value ? referenceCollection.value.find(r => r.id === selectedReferenceId.value)?.text : null,
      });

      // Apply platform max chars
      if (selectedPlatform.value?.maxChars) {
        result.value.maxChars = selectedPlatform.value.maxChars;
      }
    } else {
      // Template mode
      variationCounter.value = Math.floor(Math.random() * 100);
      result.value = generateCaption({
        category: form.category,
        platform: form.platform,
        tone: form.tone,
        nama: form.nama,
        tarikh: form.tarikh ? formatDate(form.tarikh) : '',
        lokasi: form.lokasi,
        butiran: form.butiran,
        variationIndex: variationCounter.value,
      });
    }

    copied.value = false;
    justSaved.value = false;

    // Scroll to result on mobile
    setTimeout(() => {
      const el = document.querySelector('.result-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } catch (err) {
    aiError.value = err.message || 'Gagal menjana caption. Sila cuba lagi.';
  } finally {
    generating.value = false;
  }
};

const regenerate = () => {
  if (mode.value === 'template') variationCounter.value++;
  handleGenerate();
};

const copyCaption = async () => {
  if (!result.value) return;
  try {
    await navigator.clipboard.writeText(result.value.caption);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2500);
  } catch {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = result.value.caption;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2500);
  }
};

const saveCaption = () => {
  if (!result.value) return;
  saveToHistory({
    category: form.category,
    platform: form.platform,
    tone: form.tone,
    caption: result.value.caption,
    nama: form.nama,
  });
  history.value = getHistory();
  justSaved.value = true;
  setTimeout(() => { justSaved.value = false; }, 2000);
};

const loadFromHistory = (item) => {
  result.value = {
    caption: item.caption,
    charCount: item.caption.length,
    maxChars: platforms.find(p => p.id === item.platform)?.maxChars || null,
    templateIndex: 0,
    totalVariations: 1,
  };
  copied.value = false;
};

const handleClearHistory = () => {
  if (!confirm('Kosongkan semua sejarah?')) return;
  clearHistory();
  history.value = [];
};

const getCategoryEmoji = (catId) => {
  return categories.find(c => c.id === catId)?.emoji || '';
};

const formatHistoryTime = (isoStr) => {
  const d = new Date(isoStr);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return 'Baru sahaja';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min lalu`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`;
  return `${d.getDate()}/${d.getMonth() + 1}`;
};

const handleAddReference = () => {
  if (!newReferenceInput.value.trim()) return;
  saveReference(newReferenceInput.value);
  newReferenceInput.value = '';
  referenceCollection.value = getReferenceCollection();
};

const handleDeleteReference = (id) => {
  if (selectedReferenceId.value === id) selectedReferenceId.value = null;
  deleteReference(id);
  referenceCollection.value = getReferenceCollection();
};

onMounted(() => {
  history.value = getHistory();
  referenceCollection.value = getReferenceCollection();
  apiKeyConfigured.value = hasApiKey();
});
</script>

<style scoped>
/* ============================================
   LAYOUT & BACKGROUND
   ============================================ */
.caption-app {
  min-height: 100vh;
  background: #0f172a;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
}

.bg-shapes {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
}

.s1 {
  width: 500px;
  height: 500px;
  background: #6366f1;
  top: -10%;
  right: -5%;
  animation: float 20s ease-in-out infinite;
}

.s2 {
  width: 400px;
  height: 400px;
  background: #06b6d4;
  bottom: -10%;
  left: -5%;
  animation: float 25s ease-in-out infinite reverse;
}

.s3 {
  width: 300px;
  height: 300px;
  background: #a855f7;
  top: 50%;
  left: 40%;
  animation: float 18s ease-in-out infinite 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-40px) scale(1.05); }
}

.layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 440px 1fr;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  gap: 1.5rem;
  padding: 1.5rem;
}

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
    padding: 1rem;
    padding-bottom: 5rem;
  }
}

/* ============================================
   GLASS PANEL
   ============================================ */
.glass {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
}

.panel {
  padding: 1.5rem;
  color: #e2e8f0;
  overflow-y: auto;
}

.input-panel {
  max-height: 100vh;
  position: sticky;
  top: 1.5rem;
}

@media (max-width: 1024px) {
  .input-panel {
    position: static;
    max-height: none;
  }
}

/* ============================================
   HEADER
   ============================================ */
.panel-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-icon {
  font-size: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border-radius: 0.875rem;
}

.panel-header h1 {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.panel-header p {
  font-size: 0.8rem;
  color: #94a3b8;
  margin: 0.125rem 0 0;
}

.scroll-area {
  max-height: calc(100vh - 10rem);
  overflow-y: auto;
  padding-right: 0.5rem;
}

.scroll-area::-webkit-scrollbar {
  width: 4px;
}
.scroll-area::-webkit-scrollbar-track {
  background: transparent;
}
.scroll-area::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.15);
  border-radius: 2px;
}

@media (max-width: 1024px) {
  .scroll-area {
    max-height: none;
    overflow: visible;
  }
}

/* ============================================
   SECTIONS & INPUTS
   ============================================ */
.section {
  margin-bottom: 1.5rem;
}

.section h3 {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  font-weight: 700;
  margin: 0 0 0.75rem;
}

/* Category cards */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.select-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.75rem 0.5rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.7rem;
  font-weight: 600;
}

.select-card:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.select-card.active {
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.5);
  color: white;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.15);
}

.card-emoji {
  font-size: 1.5rem;
}

.card-label {
  text-align: center;
  line-height: 1.2;
}

/* Platform buttons */
.platform-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.platform-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.85rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.75rem;
  font-weight: 600;
}

.platform-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.platform-btn.active {
  background: rgba(6, 182, 212, 0.2);
  border-color: rgba(6, 182, 212, 0.5);
  color: white;
}

.platform-emoji {
  font-size: 1.1rem;
}

/* Tone buttons */
.tone-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tone-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8rem;
  font-weight: 600;
}

.tone-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.tone-btn.active {
  background: rgba(168, 85, 247, 0.2);
  border-color: rgba(168, 85, 247, 0.5);
  color: white;
}

.tone-emoji {
  font-size: 1.2rem;
}

/* Text inputs */
.input-group {
  margin-bottom: 0.75rem;
}

.input-group label {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 0.35rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.text-input {
  width: 100%;
  padding: 0.7rem 0.9rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.85rem;
  outline: none;
  transition: all 0.2s;
  font-family: inherit;
}

.text-input::placeholder {
  color: rgba(148, 163, 184, 0.5);
}

.text-input:focus {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.textarea {
  resize: vertical;
  min-height: 80px;
  line-height: 1.5;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

/* Generate button */
.generate-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.875rem;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
  margin-top: 0.5rem;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.4);
}

.generate-btn:active {
  transform: scale(0.98);
}

.generate-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.gen-icon {
  font-size: 1.2rem;
}

/* ============================================
   OUTPUT PANEL
   ============================================ */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
  padding: 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

.empty-state h2 {
  font-size: 1.5rem;
  color: white;
  margin: 0 0 0.5rem;
}

.empty-state p {
  color: #94a3b8;
  max-width: 320px;
  line-height: 1.6;
}

/* Result section */
.result-section {
  margin-bottom: 2rem;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.result-header h2 {
  font-size: 1.1rem;
  color: white;
  margin: 0;
}

.result-meta {
  display: flex;
  gap: 0.5rem;
}

.meta-badge {
  padding: 0.3rem 0.7rem;
  border-radius: 1rem;
  font-size: 0.7rem;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
}

.meta-badge.warning {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}

.meta-badge.neutral {
  background: rgba(255, 255, 255, 0.06);
  color: #94a3b8;
}

.limit-warning {
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 0.75rem;
  color: #fca5a5;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.caption-output {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.caption-text {
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.9rem;
  line-height: 1.7;
  color: #e2e8f0;
  margin: 0;
}

/* Action buttons */
.action-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
}

.action-btn {
  padding: 0.65rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-1px);
}

.copy-btn.copied {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.4);
  color: #86efac;
}

.saved-msg {
  color: #86efac;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.65rem 0;
}

.platform-tip {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(6, 182, 212, 0.08);
  border: 1px dashed rgba(6, 182, 212, 0.2);
  border-radius: 0.75rem;
  font-size: 0.78rem;
  color: #67e8f9;
  line-height: 1.5;
}

.tip-icon {
  flex-shrink: 0;
  margin-top: 0.1rem;
}

/* ============================================
   HISTORY
   ============================================ */
.history-section {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 1.5rem;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.history-header h3 {
  font-size: 0.9rem;
  color: #94a3b8;
  margin: 0;
}

.clear-btn {
  background: none;
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  padding: 0.3rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: rgba(239, 68, 68, 0.1);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-card {
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.history-card:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(99, 102, 241, 0.3);
}

.history-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
}

.history-cat {
  font-size: 0.7rem;
  font-weight: 600;
  color: #a5b4fc;
  text-transform: uppercase;
}

.history-time {
  font-size: 0.65rem;
  color: #64748b;
}

.history-preview {
  font-size: 0.78rem;
  color: #94a3b8;
  line-height: 1.4;
  margin: 0;
}

/* ============================================
   MOBILE FAB
   ============================================ */
.mobile-fab {
  display: none;
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 50;
  padding: 1rem 1.5rem;
  border-radius: 2rem;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
  animation: fabPulse 2s ease-in-out infinite;
}

@keyframes fabPulse {
  0%, 100% { box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4); }
  50% { box-shadow: 0 8px 32px rgba(99, 102, 241, 0.6); }
}

@media (max-width: 1024px) {
  .mobile-fab {
    display: block;
  }
}

/* ============================================
   MODE TOGGLE
   ============================================ */
.mode-toggle {
  display: flex;
  gap: 0.35rem;
  padding: 0.25rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 0.75rem;
  margin-bottom: 1rem;
}

.mode-btn {
  flex: 1;
  padding: 0.6rem 0.75rem;
  border-radius: 0.6rem;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
}

.mode-btn.active {
  background: rgba(99, 102, 241, 0.2);
  color: white;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.15);
}

.mode-btn.ai.active {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25));
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);
}

/* ============================================
   API KEY SECTION
   ============================================ */
.api-key-section {
  margin-bottom: 1rem;
  padding: 0.875rem;
  background: rgba(16, 185, 129, 0.06);
  border: 1px solid rgba(16, 185, 129, 0.15);
  border-radius: 0.75rem;
}

.api-key-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #86efac;
}

.key-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.key-dot.green {
  background: #22c55e;
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
}

.key-edit-btn {
  margin-left: auto;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  padding: 0.25rem 0.6rem;
  border-radius: 0.4rem;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s;
}

.key-edit-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.api-key-form label {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 0.4rem;
}

.key-input-row {
  display: flex;
  gap: 0.5rem;
}

.key-input-row .text-input {
  flex: 1;
}

.key-save-btn {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #10b981, #06b6d4);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.key-save-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.key-help {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.65rem;
  color: #10b981;
  text-decoration: none;
}

.key-help:hover {
  text-decoration: underline;
}

/* ============================================
   REFERENCE COLLECTION
   ============================================ */
.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.section-header-row h3 {
  margin-bottom: 0;
}

.badge {
  color: white;
  border-radius: 0.25rem;
  font-weight: bold;
}

.ref-input-area {
  display: flex;
  flex-direction: column;
}

.btn-sm {
  align-self: flex-end;
  padding: 0.4rem 0.8rem;
  font-size: 0.7rem;
  border-radius: 0.4rem;
  cursor: pointer;
  border: none;
  font-weight: 600;
  transition: all 0.2s;
}

.save-ref-btn {
  background: rgba(168, 85, 247, 0.2);
  color: #d8b4fe;
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.save-ref-btn:hover:not(:disabled) {
  background: rgba(168, 85, 247, 0.4);
  color: white;
}

.save-ref-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ref-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.ref-list::-webkit-scrollbar {
  width: 4px;
}
.ref-list::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.15);
  border-radius: 2px;
}

.ref-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.6rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s;
}

.ref-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(99, 102, 241, 0.3);
}

.ref-card.active {
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.1);
}

.ref-text {
  font-size: 0.75rem;
  color: #e2e8f0;
  line-height: 1.4;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.del-ref-btn {
  background: none;
  border: none;
  color: #fca5a5;
  cursor: pointer;
  padding: 0.2rem;
  font-size: 0.8rem;
  opacity: 0.6;
  transition: opacity 0.2s;
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.del-ref-btn:hover {
  opacity: 1;
}

.empty-ref-msg {
  font-size: 0.75rem;
  color: #64748b;
  text-align: center;
  padding: 1rem;
  background: rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  font-style: italic;
}

/* ============================================
   SPINNER & AI STATES
   ============================================ */
.spinner {
  width: 1.1rem;
  height: 1.1rem;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.ai-error {
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 0.75rem;
  color: #fca5a5;
  font-size: 0.8rem;
  line-height: 1.4;
}

.ai-badge {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2));
  color: #5eead4;
}
</style>
