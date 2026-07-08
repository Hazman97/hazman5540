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
          <div class="brand-icon">✨</div>
          <div>
            <h1>Penjana Copywriting Pro</h1>
            <p>Advanced Caption & AI Copywriter</p>
          </div>
        </header>

        <!-- Mode Toggle -->
        <div class="mode-toggle">
          <button
            @click="mode = 'template'"
            :class="['mode-btn', { active: mode === 'template' }]"
          >
            📋 Template
          </button>
          <button
            @click="mode = 'ai'"
            :class="['mode-btn ai', { active: mode === 'ai' }]"
          >
            🤖 AI Generator
          </button>
          <button
            @click="mode = 'marketing'"
            :class="['mode-btn marketing', { active: mode === 'marketing' }]"
          >
            🔥 Copywriting Pro
          </button>
        </div>

        <div class="scroll-area">

        <!-- AI API Key Settings -->
        <div v-if="mode === 'ai'" class="api-key-section">
          <!-- Provider Tabs -->
          <div class="provider-tabs">
            <button 
              @click="handleSwitchProvider('gemini')"
              :class="['provider-tab', { active: aiProvider === 'gemini' }]"
            >
              <span :class="['key-dot', apiKeyConfigured.gemini ? 'green' : 'red']"></span>
              Google Gemini
            </button>
            <button 
              @click="handleSwitchProvider('deepseek')"
              :class="['provider-tab', { active: aiProvider === 'deepseek' }]"
            >
              <span :class="['key-dot', apiKeyConfigured.deepseek ? 'green' : 'red']"></span>
              DeepSeek AI
            </button>
            <button 
              @click="handleSwitchProvider('custom')"
              :class="['provider-tab custom-tab', { active: aiProvider === 'custom' }]"
            >
              <span :class="['key-dot', customConfigured ? 'green' : 'red']"></span>
              🔧 Custom
            </button>
          </div>

          <!-- Model & Key Setup -->
          <div class="provider-config">
            <!-- GEMINI / DEEPSEEK config -->
            <template v-if="aiProvider !== 'custom'">
              <div class="input-group">
                <label>Model AI</label>
                <select 
                  v-if="aiProvider === 'gemini'" 
                  v-model="geminiModel" 
                  @change="handleModelChange"
                  class="text-input select-input"
                >
                  <option value="gemini-2.0-flash">gemini-2.0-flash (Recommended)</option>
                  <option value="gemini-2.0-flash-lite">gemini-2.0-flash-lite</option>
                  <option value="gemini-1.5-flash-latest">gemini-1.5-flash-latest</option>
                </select>
                <select 
                  v-else 
                  v-model="deepseekModel" 
                  @change="handleModelChange"
                  class="text-input select-input"
                >
                  <option value="deepseek-v4-flash">deepseek-v4-flash — Fast &amp; Efficient ⭐ (Recommended)</option>
                  <option value="deepseek-v4-flash-thinking">deepseek-v4-flash — Thinking Mode 🧠 (Deep Reasoning)</option>
                  <option value="deepseek-v4-pro">deepseek-v4-pro — Advanced Pro 🔬 (75% off until May 31)</option>
                </select>
              </div>

              <!-- Key Status -->
              <div v-if="!showApiKeyInput && apiKeyConfigured[aiProvider]" class="api-key-status">
                <span class="status-text">
                  🔑 API Key untuk {{ aiProvider === 'gemini' ? 'Gemini' : 'DeepSeek' }} bersedia
                </span>
                <button @click="showApiKeyInput = true" class="key-edit-btn">Tukar</button>
              </div>
              
              <!-- Key Form -->
              <div v-else class="api-key-form">
                <label>{{ aiProvider === 'gemini' ? 'Gemini API Key' : 'DeepSeek API Key' }}</label>
                <div class="key-input-row">
                  <input
                    v-model="apiKeyInput"
                    type="password"
                    :placeholder="aiProvider === 'gemini' ? 'Masukkan Gemini API key...' : 'Masukkan DeepSeek API key...'"
                    class="text-input"
                  />
                  <button @click="handleSaveApiKey" class="key-save-btn">Simpan</button>
                </div>
                <a 
                  v-if="aiProvider === 'gemini'" 
                  href="https://aistudio.google.com/apikey" 
                  target="_blank" 
                  class="key-help"
                >
                  → Dapatkan API key percuma dari Google AI Studio
                </a>
                <a 
                  v-else 
                  href="https://platform.deepseek.com/api_keys" 
                  target="_blank" 
                  class="key-help deepseek"
                >
                  → Dapatkan API key dari platform DeepSeek AI
                </a>
              </div>
            </template>

            <!-- CUSTOM API config -->
            <template v-else>
              <div class="custom-api-section">
                <div class="custom-api-badge">
                  🔧 Custom API — OpenAI-Compatible
                </div>
                <p class="custom-api-desc">
                  Sambung ke mana-mana API yang serasi dengan OpenAI (OpenRouter, Groq, Ollama, LM Studio, Azure OpenAI, dsb.)
                </p>

                <!-- Quick presets -->
                <div class="custom-presets">
                  <span class="presets-label">Isi pantas:</span>
                  <button @click="applyCustomPreset('openrouter')" class="preset-chip">OpenRouter</button>
                  <button @click="applyCustomPreset('groq')" class="preset-chip">Groq</button>
                  <button @click="applyCustomPreset('ollama')" class="preset-chip">Ollama (local)</button>
                  <button @click="applyCustomPreset('lmstudio')" class="preset-chip">LM Studio</button>
                </div>

                <!-- Endpoint URL -->
                <div class="input-group">
                  <label>🌐 URL Endpoint (Base URL)</label>
                  <input
                    v-model="customEndpointInput"
                    type="url"
                    placeholder="cth: https://openrouter.ai/api/v1"
                    class="text-input"
                    @blur="handleSaveCustomConfig"
                  />
                  <span class="input-hint">/chat/completions akan ditambah secara automatik jika tiada</span>
                </div>

                <!-- Model Name -->
                <div class="input-group">
                  <label>🤖 Nama Model</label>
                  <input
                    v-model="customModelInput"
                    type="text"
                    placeholder="cth: meta-llama/llama-3.1-8b-instruct:free"
                    class="text-input"
                    @blur="handleSaveCustomConfig"
                  />
                </div>

                <!-- API Key -->
                <div class="input-group">
                  <label>🔑 API Key <span class="optional-label">(kosongkan untuk Ollama/LM Studio)</span></label>
                  <div class="key-input-row">
                    <input
                      v-model="customApiKeyInput"
                      :type="showCustomKey ? 'text' : 'password'"
                      placeholder="Masukkan API key..."
                      class="text-input"
                    />
                    <button @click="showCustomKey = !showCustomKey" class="key-edit-btn" title="Tunjuk/Sembunyikan">
                      {{ showCustomKey ? '🙈' : '👁️' }}
                    </button>
                  </div>
                </div>

                <!-- Save button -->
                <button @click="handleSaveCustomConfig" class="key-save-btn w-full mt-2" style="width:100%">
                  💾 Simpan Konfigurasi Custom
                </button>

                <!-- Status -->
                <div v-if="customConfigured" class="api-key-status mt-2">
                  <span class="status-text">✅ Konfigurasi Custom API bersedia</span>
                </div>
                <div v-else class="custom-incomplete-msg">
                  ⚠️ Sila isi Endpoint URL dan Nama Model untuk menggunakan Custom API
                </div>
              </div>
            </template>
          </div>
        </div>



          <!-- ============================================
               MARKETING COPYWRITING PRO FORM
               ============================================ -->
          <div v-if="mode === 'marketing'" class="marketing-form">

            <!-- Campaign Goal -->
            <section class="section">
              <div class="section-header-row">
                <h3>🎯 Objektif Kempen</h3>
              </div>
              <div class="goal-grid">
                <button
                  v-for="goal in campaignGoals"
                  :key="goal.id"
                  @click="mktForm.campaignGoal = goal.id"
                  :class="['goal-card', { active: mktForm.campaignGoal === goal.id }]"
                >
                  <span class="goal-icon">{{ goal.icon }}</span>
                  <span class="goal-label">{{ goal.label }}</span>
                  <span class="goal-desc">{{ goal.desc }}</span>
                </button>
              </div>
            </section>

            <!-- Post Topic -->
            <section class="section">
              <div class="mkt-topic-label">📣 POST TENTANG APA?</div>
              <textarea
                v-model="mktForm.postTopic"
                class="text-input textarea mkt-topic-textarea"
                rows="3"
                placeholder="cth: Supplement kolagen Premium, kulit glow dalam 7 hari, harga RM89"
              ></textarea>
            </section>

            <!-- Platform + Language -->
            <section class="section">
              <div class="input-row">
                <div class="input-group">
                  <label>📱 Platform</label>
                  <select v-model="mktForm.platform" class="text-input select-input">
                    <option value="whatsapp">💬 WhatsApp</option>
                    <option value="instagram">📸 Instagram</option>
                    <option value="tiktok">🎵 TikTok</option>
                    <option value="threads">🧵 Threads</option>
                    <option value="facebook">👥 Facebook</option>
                    <option value="twitter">🐦 Twitter/X</option>
                    <option value="linkedin">💼 LinkedIn</option>
                  </select>
                </div>
                <div class="input-group">
                  <label>🌐 Bahasa</label>
                  <select v-model="mktForm.language" class="text-input select-input">
                    <option value="melayu">🇲🇾 Melayu</option>
                    <option value="rojak">🤙 Rojak (Manglish)</option>
                    <option value="english">🇬🇧 English</option>
                  </select>
                </div>
              </div>
            </section>

            <!-- Hook Type -->
            <section class="section">
              <div class="section-header-row">
                <h3>🧠 Jenis Hook (Psikologi)</h3>
                <span class="badge mkt-badge">Rahsia Viral</span>
              </div>
              <div class="hook-grid">
                <button
                  v-for="hook in hookTypes"
                  :key="hook.id"
                  @click="mktForm.hookType = hook.id"
                  :class="['hook-card', { active: mktForm.hookType === hook.id }]"
                  :title="hook.desc"
                >
                  <span class="hook-icon">{{ hook.icon }}</span>
                  <span class="hook-label">{{ hook.label }}</span>
                  <span class="hook-framework">{{ hook.framework }}</span>
                </button>
              </div>
            </section>

            <!-- Thread Count -->
            <section class="section">
              <h3>🔢 Bilangan Thread / Bahagian</h3>
              <div class="thread-count-row">
                <button
                  v-for="n in [1, 3, 5, 10]"
                  :key="n"
                  @click="mktForm.threadCount = n"
                  :class="['thread-pill', { active: mktForm.threadCount === n }]"
                >
                  {{ n === 1 ? '1 Post' : `${n} Thread` }}
                </button>
              </div>
              <p class="thread-hint" v-if="mktForm.threadCount > 1">
                💡 AI akan hasilkan {{ mktForm.threadCount }} bahagian berasingan — sesuai untuk thread panjang.
              </p>
            </section>

            <!-- Extra Details (collapsible) -->
            <section class="section">
              <div class="section-toggle-header" @click="showMktExtras = !showMktExtras">
                <h3>📋 Maklumat Tambahan <span class="optional-label">(Pilihan)</span></h3>
                <span class="toggle-icon">{{ showMktExtras ? '▲' : '▼' }}</span>
              </div>
              <transition name="wizard-fade">
                <div v-show="showMktExtras" class="mt-2">
                  <textarea
                    v-model="mktForm.extraDetails"
                    class="text-input textarea"
                    rows="4"
                    placeholder="cth:&#10;- Harga: RM89 (FREE postage)&#10;- Ingredients: Marine Collagen 5000mg&#10;- Testimonial: 3000+ satisfied customers&#10;- Shopee rating: 4.9 ⭐"
                  ></textarea>
                </div>
              </transition>
            </section>

            <!-- Product Link / CTA -->
            <section class="section">
              <h3>🔗 Link Produk / CTA</h3>
              <input
                v-model="mktForm.productLink"
                type="url"
                class="text-input"
                placeholder="cth: https://shp.ee/abc123  atau  https://wa.me/60123456789"
              />
              <span class="input-hint">AI akan letakkan link ini secara natural dalam CTA</span>
            </section>

          </div>

          <!-- Existing form sections (Template + AI modes) -->
          <div v-if="mode !== 'marketing'">

          <!-- Guided Writing Assistant Wizard -->
          <section class="section assistant-section glass-dark">
            <div class="section-toggle-header" @click="showAssistant = !showAssistant">
              <h3>💡 Bantuan Menulis (Wizard)</h3>
              <span class="toggle-icon">{{ showAssistant ? '▲' : '▼' }}</span>
            </div>
            
            <transition name="wizard-fade">
              <div v-show="showAssistant" class="assistant-content mt-3">
                <p class="helper-desc">Jawab soalan di bawah jika anda tiada idea untuk menulis butiran:</p>
                
                <div class="wizard-group">
                  <label>1. Siapa / Apa? (Subjek utama)</label>
                  <input v-model="wizard.subject" type="text" placeholder="cth: Yayasan Harmoni, Cik Siti, Event raya" class="text-input text-input-sm" />
                </div>

                <div class="wizard-group">
                  <label>2. Apa yang berlaku? (Aktiviti/Pengisian)</label>
                  <input v-model="wizard.activity" type="text" placeholder="cth: agih 50 bakul makanan, melawat makcik sakit" class="text-input text-input-sm" />
                </div>

                <div class="wizard-group">
                  <label>3. Mengapa penting? (Impak/Tujuan)</label>
                  <input v-model="wizard.impact" type="text" placeholder="cth: ringankan beban, eratkan silaturahim" class="text-input text-input-sm" />
                </div>

                <div class="wizard-group">
                  <label>4. Tindakan pembaca? (CTA)</label>
                  <input v-model="wizard.cta" type="text" placeholder="cth: Hubungi kami, lawat link di bio, sila share" class="text-input text-input-sm" />
                </div>

                <button @click="applyWizard" class="btn-sm apply-wizard-btn w-full mt-2" :disabled="!wizard.subject && !wizard.activity">
                  🪄 Pindahkan ke Butiran
                </button>
              </div>
            </transition>
          </section>

          <!-- Category -->
          <section class="section">
            <h3>📂 Kategori</h3>
            <div class="card-grid">
              <button
                v-for="cat in categories"
                :key="cat.id"
                @click="form.category = cat.id"
                :class="['select-card', { active: form.category === cat.id }]"
              >
                <span class="card-emoji">{{ cat.emoji || categoryEmojis[cat.id] }}</span>
                <span class="card-label">{{ cat.label }}</span>
              </button>
            </div>
          </section>

          <!-- Platform -->
          <section class="section">
            <h3>📱 Platform</h3>
            <div class="platform-row">
              <button
                v-for="p in platforms"
                :key="p.id"
                @click="form.platform = p.id"
                :class="['platform-btn', { active: form.platform === p.id }]"
                :title="p.label"
              >
                <span class="platform-emoji">{{ platformEmojis[p.id] }}</span>
                <span class="platform-name">{{ p.label }}</span>
              </button>
            </div>
          </section>

          <!-- Tone -->
          <section class="section">
            <h3>🎭 Nada / Tone</h3>
            <div class="tone-row">
              <button
                v-for="t in tones"
                :key="t.id"
                @click="form.tone = t.id"
                :class="['tone-btn', { active: form.tone === t.id }]"
              >
                <span class="tone-emoji">{{ toneEmojis[t.id] }}</span>
                <span>{{ t.label }}</span>
              </button>
            </div>
          </section>

          <!-- Details -->
          <section class="section">
            <h3>📝 Butiran Caption</h3>

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
                <label>📅 Tarikh</label>
                <input v-model="form.tarikh" type="date" class="text-input" />
              </div>
              <div class="input-group">
                <label>📍 Lokasi</label>
                <input
                  v-model="form.lokasi"
                  type="text"
                  placeholder="cth: Kuala Lumpur"
                  class="text-input"
                />
              </div>
            </div>

            <div class="input-group">
              <div class="details-header-row">
                <label>Isi Penting / Info Mentah</label>
                <!-- AI Polisher button -->
                <button 
                  v-if="mode === 'ai'" 
                  @click="handlePolishText" 
                  class="polish-btn-ai"
                  :disabled="polishingText || !form.butiran.trim() || !apiKeyConfigured[aiProvider]"
                  title="Polish teks mentah menjadi senarai poin profesional dengan AI"
                >
                  <span v-if="polishingText" class="spinner-xs"></span>
                  <span v-else>✨ Polish dengan AI</span>
                </button>
              </div>
              <textarea
                v-model="form.butiran"
                class="text-input textarea"
                rows="5"
                placeholder="Tulis nota ringkas di sini&#10;cth:&#10;- 50 penerima bantuan&#10;- Sumbangan RM500 seorang&#10;- Kerjasama dengan NGO ABC"
              ></textarea>
            </div>

            <!-- Hooks and CTAs Helper Tabs -->
            <div class="quick-helpers">
              <div class="helper-tabs">
                <button 
                  @click="activeHelperTab = 'hooks'" 
                  :class="['helper-tab-btn', { active: activeHelperTab === 'hooks' }]"
                >
                  🪝 Pancingan (Hooks)
                </button>
                <button 
                  @click="activeHelperTab = 'ctas'" 
                  :class="['helper-tab-btn', { active: activeHelperTab === 'ctas' }]"
                >
                  📣 Seruan (CTAs)
                </button>
              </div>
              
              <div class="helper-body">
                <div class="helper-items">
                  <div 
                    v-for="(item, idx) in (activeHelperTab === 'hooks' ? hookLibrary : ctaLibrary)" 
                    :key="idx" 
                    @click="insertTextAtCursor(item.text)"
                    class="helper-item-card"
                  >
                    <div class="helper-item-header">
                      <span class="helper-item-label">{{ item.label }}</span>
                      <span class="helper-item-action-icon">➕</span>
                    </div>
                    <p class="helper-item-desc">{{ item.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Reference Collection (Only for AI Mode) -->
          <section v-if="mode === 'ai'" class="section">
            <div class="section-header-row">
              <h3>📚 Koleksi Rujukan</h3>
              <span class="badge ai-badge" style="font-size: 0.65rem; padding: 0.2rem 0.4rem;">Gaya Bahasa</span>
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

          </div><!-- end v-if mode !== 'marketing' -->

          <!-- Generate Button -->
          <button 
            @click="handleGenerate" 
            :class="['generate-btn', { 
              'warning-btn': !canGenerate && (mode === 'ai' || mode === 'marketing'),
              'marketing-btn': mode === 'marketing'
            }]" 
            :disabled="generating"
          >
            <span v-if="generating" class="spinner"></span>
            <span v-else class="gen-icon">{{ mode === 'marketing' ? '🔥' : '🚀' }}</span>
            <span>{{ 
              generating 
                ? 'Menjana...' 
                : !canGenerate && mode === 'ai' 
                  ? aiProvider === 'custom' ? '⚠️ Isi Konfigurasi Custom API' : '⚠️ Sila Masukkan API Key'
                  : !canGenerate && mode === 'marketing'
                    ? '⚠️ Sila Isi Topik & API Key'
                    : mode === 'ai' 
                      ? `Jana dengan ${aiProvider === 'gemini' ? 'Gemini' : aiProvider === 'custom' ? 'Custom API' : 'DeepSeek'}` 
                      : mode === 'marketing'
                        ? `Jana Copywriting 🔥`
                        : 'Jana Caption' 
            }}</span>
          </button>

          <!-- AI Error -->
          <div v-if="aiError" class="ai-error">
             ⚠️ {{ aiError }}
          </div>
        </div>
      </aside>

      <!-- RIGHT: Output Panel -->
      <main class="panel output-panel glass">
        <!-- Result tabs (Text vs Mockup preview) -->
        <div v-if="result || history.length > 0" class="output-tabs-container">
          <div class="output-tabs">
            <button 
              @click="outputViewMode = 'text'" 
              :class="['output-tab-btn', { active: outputViewMode === 'text' }]"
            >
              📝 Teks Sahaja
            </button>
            <button 
              @click="outputViewMode = 'mockup'" 
              :class="['output-tab-btn', { active: outputViewMode === 'mockup' }]"
              :disabled="!result"
            >
              👁️ Pratonton Post (Mockup)
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!result && history.length === 0" class="empty-state">
          <div class="empty-icon">✍️</div>
          <h2>Sedia untuk menjana!</h2>
          <p>Pilih kategori, platform & nada di sebelah kiri, kemudian tekan <strong>"Jana Caption"</strong>.</p>
        </div>

        <!-- Result -->
        <div v-if="result" class="result-section">
          <!-- Text Mode View -->
          <div v-if="outputViewMode === 'text'">
            <div class="result-header">
              <h2>{{ result.isMarketing ? '🔥 Hasil Copywriting Pro' : result.isAI ? `Hasil AI (${result.provider || 'AI'})` : 'Hasil Caption' }}</h2>
              <div class="result-meta">
                <span v-if="result.isMarketing" class="meta-badge mkt-result-badge">
                  {{ hookTypes.find(h => h.id === mktForm.hookType)?.label || 'Marketing' }}
                </span>
                <span class="meta-badge" :class="{ warning: result.maxChars && result.charCount > result.maxChars }">
                  {{ result.charCount }} aksara
                  <template v-if="result.maxChars"> / {{ result.maxChars }}</template>
                </span>
                <span v-if="result.isAI || result.isMarketing" class="meta-badge ai-badge">{{ result.model }}</span>
                <span v-else class="meta-badge neutral">
                  Variasi {{ result.templateIndex + 1 }}/{{ result.totalVariations }}
                </span>
              </div>
            </div>

            <!-- Character limit warning -->
            <div v-if="result.maxChars && result.charCount > result.maxChars" class="limit-warning">
               Melebihi had {{ selectedPlatform?.label }}! Sila pendekkan caption anda.
            </div>

            <!-- Thread Cards View (marketing multi-thread) -->
            <div v-if="result.isMarketing && marketingThreads.length > 1" class="thread-output-section">
              <div class="thread-output-header">
                <span class="thread-count-badge">{{ marketingThreads.length }} Thread</span>
                <button @click="copyAllThreads" :class="['action-btn copy-btn', { copied: copiedAll }]" style="margin-left:auto">
                  {{ copiedAll ? '✔️ Semua Disalin!' : '📋 Salin Semua' }}
                </button>
              </div>
              <div class="thread-cards-list">
                <div
                  v-for="(thread, idx) in marketingThreads"
                  :key="idx"
                  class="thread-card"
                >
                  <div class="thread-card-header">
                    <span class="thread-card-num">{{ idx + 1 }} / {{ marketingThreads.length }}</span>
                    <span class="thread-card-chars">{{ thread.length }} aksara</span>
                    <button @click="copyThread(idx)" :class="['thread-copy-btn', { copied: copiedThreadIdx === idx }]">
                      {{ copiedThreadIdx === idx ? '✔️' : '📋' }}
                    </button>
                  </div>
                  <textarea
                    v-model="marketingThreads[idx]"
                    class="caption-textarea thread-card-textarea"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Single Caption Output (default + single-thread marketing) -->
            <div v-else class="caption-output">
              <textarea 
                v-model="result.caption" 
                @input="result.charCount = result.caption.length" 
                class="caption-textarea"
                rows="8"
              ></textarea>
            </div>
          </div>

          <!-- Mockup View Mode -->
          <div v-else class="mockup-view-container">
            <div class="mockup-platform-header">
              <h3>Pratonton {{ selectedPlatform?.label }}</h3>
              <span class="mockup-info-badge">Visual Simulasi</span>
            </div>

            <!-- WhatsApp Mockup -->
            <div v-if="form.platform === 'whatsapp'" class="mock-card mock-whatsapp">
              <div class="whatsapp-header">
                <div class="wa-avatar">{{ mockupProfileAvatar }}</div>
                <div class="wa-user-info">
                  <span class="wa-username">{{ mockupProfileName }}</span>
                  <span class="wa-status">atas talian</span>
                </div>
                <div class="wa-actions">📞 📹 ⫶</div>
              </div>
              <div class="whatsapp-body">
                <div class="wa-bubble">
                  <div class="wa-message-content" v-html="formatPreviewText(result.caption, 'whatsapp')"></div>
                  <span class="wa-timestamp">{{ getMockTime() }} ✔️✔️</span>
                </div>
              </div>
            </div>

            <!-- Facebook Mockup -->
            <div v-else-if="form.platform === 'facebook'" class="mock-card mock-facebook">
              <div class="fb-header">
                <div class="fb-avatar">{{ mockupProfileAvatar[0] }}</div>
                <div class="fb-meta">
                  <span class="fb-name">{{ mockupProfileName }}</span>
                  <span class="fb-time">Baru sahaja · 🌐</span>
                </div>
                <span class="fb-more">⋯</span>
              </div>
              <div class="fb-body">
                <div class="fb-text" v-html="formatPreviewText(result.caption, 'facebook')"></div>
              </div>
              <div class="fb-action-bar">
                <span class="fb-act">👍 Suka</span>
                <span class="fb-act">💬 Komen</span>
                <span class="fb-act">🔄 Kongsi</span>
              </div>
            </div>

            <!-- Instagram Mockup -->
            <div v-else-if="form.platform === 'instagram'" class="mock-card mock-instagram">
              <div class="ig-header">
                <div class="ig-avatar"><span>{{ mockupProfileAvatar[0] }}</span></div>
                <span class="ig-username">{{ mockupProfileHandle.substring(1) }}</span>
                <span class="ig-more">⋯</span>
              </div>
              <div class="ig-image-placeholder">
                <div class="ig-media-card">
                  <span class="ig-media-icon">📸</span>
                  <span>[ Media Gambar/Video ]</span>
                </div>
              </div>
              <div class="ig-actions">
                <span class="ig-icon">❤️</span>
                <span class="ig-icon">💬</span>
                <span class="ig-icon">✈️</span>
                <span class="ig-icon-right">🔖</span>
              </div>
              <div class="ig-body">
                <p class="ig-likes">Disukai oleh <strong>anda</strong> dan <strong>142 yang lain</strong></p>
                <div class="ig-caption-container">
                  <strong>{{ mockupProfileHandle.substring(1) }}</strong> <span class="ig-caption-text" v-html="formatPreviewText(result.caption, 'instagram')"></span>
                </div>
              </div>
            </div>

            <!-- Twitter/X Mockup -->
            <div v-else-if="form.platform === 'twitter'" class="mock-card mock-x">
              <div class="x-header">
                <div class="x-avatar">{{ mockupProfileAvatar }}</div>
                <div class="x-names">
                  <div class="x-displayname">{{ mockupProfileName }} <span class="x-badge">✓</span></div>
                  <div class="x-handle">{{ mockupProfileHandle }}</div>
                </div>
                <span class="x-logo">𝕏</span>
              </div>
              <div class="x-body">
                <div class="x-text" v-html="formatPreviewText(result.caption, 'twitter')"></div>
                <div class="x-timestamp">{{ getMockDate() }} · <strong>1.5K</strong> Pandangan</div>
              </div>
              <div class="x-action-bar">
                <span>💬 12</span>
                <span>🔁 4</span>
                <span>❤️ 89</span>
                <span>🔖 3</span>
                <span>📤</span>
              </div>
            </div>

            <!-- LinkedIn Mockup -->
            <div v-else-if="form.platform === 'linkedin'" class="mock-card mock-linkedin">
              <div class="li-header">
                <div class="li-avatar">{{ mockupProfileAvatar[0] }}</div>
                <div class="li-meta">
                  <span class="li-name">{{ mockupProfileName }} <span class="li-degree">· 1st</span></span>
                  <span class="li-headline">{{ form.category ? getCategoryLabel(form.category) : 'Hebahan' }} · Media Kreatif</span>
                  <span class="li-time">Baru sahaja · 🌐</span>
                </div>
                <button class="li-follow-btn">+ Ikuti</button>
              </div>
              <div class="li-body">
                <div class="li-text" v-html="formatPreviewText(result.caption, 'linkedin')"></div>
              </div>
              <div class="li-action-bar">
                <span class="li-act">👍 Suka</span>
                <span class="li-act">💬 Komen</span>
                <span class="li-act">🔄 Repost</span>
                <span class="li-act">✈️ Hantar</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-row">
            <button @click="copyCaption" :class="['action-btn copy-btn', { copied }]">
              {{ copied ? '✔️ Disalin!' : '📋 Salin' }}
            </button>
            <button @click="regenerate" class="action-btn regen-btn">
              🔄 Jana Semula
            </button>
            <button @click="saveCaption" class="action-btn save-btn" v-if="!justSaved">
              💾 Simpan Ke Sejarah
            </button>
            <span v-else class="saved-msg"> Tersimpan!</span>
          </div>

          <!-- Platform Tip -->
          <div v-if="selectedPlatform?.tip" class="platform-tip">
            <span class="tip-icon">💡</span>
            <span>{{ selectedPlatform.tip }}</span>
          </div>
        </div>

        <!-- History -->
        <div v-if="history.length > 0" class="history-section">
          <div class="history-header">
            <h3>📜 Sejarah Caption ({{ history.length }})</h3>
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
                <span class="history-cat">
                  {{ getCategoryEmoji(item.category) }} {{ item.category }}
                </span>
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
       Jana 🚀
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
  polishTextWithAI,
  buildMarketingPrompt,
  getApiKey,
  saveApiKey,
  hasApiKey,
  getStoredProvider,
  saveStoredProvider,
  getStoredModel,
  saveStoredModel,
  getCustomEndpoint,
  saveCustomEndpoint,
  getCustomModel,
  saveCustomModel,
  hasCustomConfig
} from './aiService.js';

// Mode states
const mode = ref('template'); // 'template' | 'ai' | 'marketing'
const aiProvider = ref('gemini'); // 'gemini' | 'deepseek' | 'custom'
const geminiModel = ref('gemini-2.0-flash');
const deepseekModel = ref('deepseek-chat');
const apiKeyInput = ref('');
const showApiKeyInput = ref(false);
const apiKeyConfigured = reactive({
  gemini: false,
  deepseek: false
});
const generating = ref(false);
const aiError = ref('');
const outputViewMode = ref('text'); // 'text' | 'mockup'
const polishingText = ref(false);

// Custom API state
const customEndpointInput = ref('');
const customModelInput = ref('');
const customApiKeyInput = ref('');
const showCustomKey = ref(false);
const customConfigured = ref(false);

// Marketing Copywriting Pro state
const mktForm = reactive({
  campaignGoal: 'jualan',
  postTopic: '',
  platform: 'instagram',
  language: 'melayu',
  hookType: 'fomo',
  threadCount: 1,
  extraDetails: '',
  productLink: '',
});
const marketingThreads = ref([]);
const copiedAll = ref(false);
const copiedThreadIdx = ref(-1);
const showMktExtras = ref(false);

// Campaign goals data
const campaignGoals = [
  { id: 'jualan', icon: '🛒', label: 'Post Jualan', desc: 'Hard-sell & CTA kuat' },
  { id: 'biasa', icon: '📝', label: 'Post Biasa', desc: 'Awareness & reach' },
  { id: 'engagement', icon: '💬', label: 'Post Engagement', desc: 'Komen, share & viral' },
];

// Hook types data
const hookTypes = [
  { id: 'fomo', icon: '😱', label: 'FOMO', framework: 'Scarcity · Urgency', desc: 'Fear Of Missing Out — cipta rasa takut terlepas' },
  { id: 'problem-solution', icon: '💡', label: 'Problem-Solution', framework: 'P·A·S Framework', desc: 'Pain → Agitate → Solve' },
  { id: 'storytelling', icon: '📖', label: 'Storytelling', framework: 'Hook→Story→CTA', desc: 'Cerita yang relatable & authentic' },
  { id: 'social-proof', icon: '⭐', label: 'Social Proof', framework: 'Bukti Sosial', desc: 'Testimoni, angka & pencapaian' },
  { id: 'curiosity', icon: '🤔', label: 'Curiosity Gap', framework: 'Open Loop', desc: 'Buka gelung — buat pembaca mesti baca habis' },
  { id: 'direct', icon: '🎯', label: 'Direct Sell', framework: 'A·I·D·A', desc: 'Terus ke point, tiada basa-basi' },
];

// Writing Assistant Wizard state
const showAssistant = ref(false);
const wizard = reactive({
  subject: '',
  activity: '',
  impact: '',
  cta: ''
});

// Helper tabs state
const activeHelperTab = ref('hooks');

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

// Emojis Fallbacks
const categoryEmojis = {
  ziarah: '🏠',
  lawatan: '💼',
  sumbangan: '🎁',
  promosi: '📢',
  ucapan: '🎉',
  umum: '📝'
};

const platformEmojis = {
  whatsapp: '💬',
  facebook: '👥',
  instagram: '📸',
  twitter: '🐦',
  linkedin: '💼'
};

const toneEmojis = {
  ceria: '😊',
  sedih: '😢',
  rasmi: '👔',
  santai: '☕'
};

// Hook and CTA libraries
const hookLibrary = [
  { label: '❓ Soalan Utama', text: 'Pernahkah anda terfikir bagaimana...', desc: 'Memulakan dengan persoalan menarik' },
  { label: '📢 Pengumuman', text: 'Khabar baik untuk warga semua! Baru-baru ini...', desc: 'Memberitahu khabar gembira' },
  { label: '🌟 Kejutan/Emosi', text: 'Sesuatu yang amat menyentuh hati kami hari ini apabila...', desc: 'Fokus pada nilai sentimental/emosi' },
  { label: '📊 Fakta/Hebahan', text: 'Tahukah anda bahawa peranan komuniti penting untuk...', desc: 'Fakta berunsur pendidikan' },
  { label: '🔥 Pancingan Aksi', text: 'Jangan skip dulu! Kami ada cerita penting nak share...', desc: 'Menahan skrol media sosial' }
];

const ctaLibrary = [
  { label: '🔗 Pautan Profil', text: 'Klik pautan (link) di bio kami untuk maklumat lanjut.', desc: 'Mengarahkan ke pautan utama' },
  { label: '💬 Tinggal Komen', text: 'Kongsi pendapat anda di ruangan komen di bawah!', desc: 'Meningkatkan penglibatan' },
  { label: '🔁 Kongsi/Sebar', text: 'Sila kongsikan (share) hantaran ini agar memberi manfaat kepada lebih ramai orang.', desc: 'Meningkatkan jangkauan' },
  { label: '💾 Simpan Post', text: 'Simpan (save) post ini untuk rujukan anda di masa hadapan.', desc: 'Penting untuk rujukan' },
  { label: '📲 Hubungi WA', text: 'Hubungi kami segera melalui WhatsApp untuk pertanyaan lanjut.', desc: 'Tindakan mesej terus' }
];

// Computed
const canGenerate = computed(() => {
  if (mode.value === 'marketing') {
    const hasKey = aiProvider.value === 'custom' ? customConfigured.value : apiKeyConfigured[aiProvider.value];
    return !!(hasKey && mktForm.postTopic.trim());
  }
  if (mode.value === 'ai') {
    if (aiProvider.value === 'custom') {
      return customConfigured.value;
    }
    return apiKeyConfigured[aiProvider.value];
  }
  return form.category && form.platform && form.tone;
});
const selectedPlatform = computed(() => platforms.find(p => p.id === form.platform));

const mockupProfileName = computed(() => {
  return form.nama.trim() || 'hazman5540';
});

const mockupProfileAvatar = computed(() => {
  const name = mockupProfileName.value;
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
});

const mockupProfileHandle = computed(() => {
  const name = mockupProfileName.value;
  const handle = name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').substring(0, 15);
  return '@' + (handle || 'user');
});

const getCategoryLabel = (catId) => {
  return categories.find(c => c.id === catId)?.label || 'Umum';
};

// Methods
const handleSwitchProvider = (provider) => {
  aiProvider.value = provider;
  saveStoredProvider(provider);
  showApiKeyInput.value = false;
  apiKeyInput.value = '';
  aiError.value = '';
};

const handleModelChange = () => {
  if (aiProvider.value === 'gemini') {
    saveStoredModel('gemini', geminiModel.value);
  } else {
    saveStoredModel('deepseek', deepseekModel.value);
  }
};

const handleSaveApiKey = () => {
  if (!apiKeyInput.value.trim()) return;
  saveApiKey(aiProvider.value, apiKeyInput.value);
  apiKeyConfigured[aiProvider.value] = true;
  showApiKeyInput.value = false;
  apiKeyInput.value = '';
};

// Custom API methods
const handleSaveCustomConfig = () => {
  if (customEndpointInput.value.trim()) saveCustomEndpoint(customEndpointInput.value);
  if (customModelInput.value.trim()) saveCustomModel(customModelInput.value);
  if (customApiKeyInput.value.trim()) saveApiKey('custom', customApiKeyInput.value);
  customConfigured.value = hasCustomConfig();
  aiError.value = '';
};

const applyCustomPreset = (preset) => {
  const presets = {
    openrouter: { url: 'https://openrouter.ai/api/v1', model: 'meta-llama/llama-3.1-8b-instruct:free' },
    groq: { url: 'https://api.groq.com/openai/v1', model: 'llama-3.1-8b-instant' },
    ollama: { url: 'http://localhost:11434/v1', model: 'llama3.2' },
    lmstudio: { url: 'http://localhost:1234/v1', model: 'local-model' },
  };
  const p = presets[preset];
  if (!p) return;
  customEndpointInput.value = p.url;
  customModelInput.value = p.model;
  // Auto-save endpoint and model
  saveCustomEndpoint(p.url);
  saveCustomModel(p.model);
  customConfigured.value = hasCustomConfig();
};

const applyWizard = () => {
  let detailsText = '';
  if (wizard.subject) detailsText += `- Subjek: ${wizard.subject}\n`;
  if (wizard.activity) detailsText += `- Aktiviti: ${wizard.activity}\n`;
  if (wizard.impact) detailsText += `- Impak: ${wizard.impact}\n`;
  if (wizard.cta) detailsText += `- Tindakan: ${wizard.cta}\n`;
  
  if (detailsText) {
    if (form.butiran.trim()) {
      form.butiran = form.butiran.trim() + '\n' + detailsText.trim();
    } else {
      form.butiran = detailsText.trim();
    }
    // Clear wizard inputs
    wizard.subject = '';
    wizard.activity = '';
    wizard.impact = '';
    wizard.cta = '';
    showAssistant.value = false;
  }
};

const insertTextAtCursor = (text) => {
  const textarea = document.querySelector('.textarea');
  if (!textarea) {
    form.butiran = (form.butiran ? form.butiran + '\n' : '') + text;
    return;
  }

  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  const originalText = form.butiran || '';
  
  form.butiran = originalText.substring(0, startPos) + text + originalText.substring(endPos);
  
  // Set cursor focus back
  setTimeout(() => {
    textarea.focus();
    const cursorNewPos = startPos + text.length;
    textarea.setSelectionRange(cursorNewPos, cursorNewPos);
  }, 50);
};

const handlePolishText = async () => {
  if (!form.butiran.trim()) return;
  polishingText.value = true;
  aiError.value = '';
  
  try {
    const currentModel = aiProvider.value === 'gemini'
      ? geminiModel.value
      : aiProvider.value === 'custom'
        ? customModelInput.value
        : deepseekModel.value;
    const polished = await polishTextWithAI(aiProvider.value, currentModel, form.butiran);
    if (polished) {
      form.butiran = polished;
    }
  } catch (err) {
    aiError.value = 'Gagal menggilap teks: ' + (err.message || 'Ralat tidak diketahui.');
  } finally {
    polishingText.value = false;
  }
};

const parseThreads = (rawCaption) => {
  // Regex to match ===THREAD N=== or [Thread N] markers
  const threadRegex = /(?:===+)?\s*THREAD\s*\d+\s*(?:===+)?|\[THREAD\s*\d+\]/gi;
  const parts = rawCaption.split(threadRegex).map(p => p.trim()).filter(p => p.length > 0);
  if (parts.length > 0) {
    marketingThreads.value = parts;
  } else {
    marketingThreads.value = [rawCaption];
  }
};

const copyThread = async (idx) => {
  const text = marketingThreads.value[idx];
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    copiedThreadIdx.value = idx;
    setTimeout(() => { copiedThreadIdx.value = -1; }, 2000);
  } catch (err) {
    console.error('Failed to copy thread', err);
  }
};

const copyAllThreads = async () => {
  if (!marketingThreads.value.length) return;
  const text = marketingThreads.value.join('\n\n-------------------\n\n');
  try {
    await navigator.clipboard.writeText(text);
    copiedAll.value = true;
    setTimeout(() => { copiedAll.value = false; }, 2000);
  } catch (err) {
    console.error('Failed to copy all threads', err);
  }
};

const handleGenerate = async () => {
  if (!canGenerate.value && (mode.value === 'ai' || mode.value === 'marketing')) {
    aiError.value = 'Sila pastikan API Key dan maklumat penting telah diisi.';
    if (!apiKeyConfigured[aiProvider.value] && !(aiProvider.value === 'custom' && customConfigured.value)) {
      showApiKeyInput.value = true;
      setTimeout(() => {
        const el = document.querySelector('.api-key-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
    return;
  }
  aiError.value = '';
  generating.value = true;
  marketingThreads.value = [];

  try {
    if (mode.value === 'ai' || mode.value === 'marketing') {
      const activeModel = aiProvider.value === 'gemini'
        ? geminiModel.value
        : aiProvider.value === 'custom'
          ? customModelInput.value
          : deepseekModel.value;
          
      const isMarketing = mode.value === 'marketing';
      const mktParams = isMarketing ? { ...mktForm } : null;
      
      result.value = await generateWithAI(aiProvider.value, activeModel, {
        category: form.category,
        platform: isMarketing ? mktForm.platform : form.platform,
        tone: form.tone,
        nama: form.nama,
        tarikh: form.tarikh ? formatDate(form.tarikh) : '',
        lokasi: form.lokasi,
        butiran: form.butiran,
        rujukan: selectedReferenceId.value ? referenceCollection.value.find(r => r.id === selectedReferenceId.value)?.text : null,
      }, isMarketing, mktParams);

      // Extract thread parts if marketing mode and threadCount > 1
      if (isMarketing && mktForm.threadCount > 1) {
        parseThreads(result.value.caption);
      } else if (isMarketing) {
        marketingThreads.value = [result.value.caption];
      }

      // Apply platform max chars
      const pId = isMarketing ? mktForm.platform : form.platform;
      const platformDef = platforms.find(p => p.id === pId);
      if (platformDef?.maxChars) {
        result.value.maxChars = platformDef.maxChars;
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
  form.category = item.category || form.category;
  form.platform = item.platform || form.platform;
  form.tone = item.tone || form.tone;
  form.nama = item.nama || '';
  result.value = {
    caption: item.caption,
    charCount: item.caption.length,
    maxChars: platforms.find(p => p.id === item.platform)?.maxChars || null,
    templateIndex: 0,
    totalVariations: 1,
    isAI: false
  };
  copied.value = false;
  outputViewMode.value = 'text';
};

const handleClearHistory = () => {
  if (!confirm('Kosongkan semua sejarah?')) return;
  clearHistory();
  history.value = [];
};

const getCategoryEmoji = (catId) => {
  return categories.find(c => c.id === catId)?.emoji || categoryEmojis[catId] || '📝';
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
  if (referenceCollection.value.length > 0) {
    selectedReferenceId.value = referenceCollection.value[0].id;
  }
};

const handleDeleteReference = (id) => {
  if (selectedReferenceId.value === id) selectedReferenceId.value = null;
  deleteReference(id);
  referenceCollection.value = getReferenceCollection();
};

// Mockup utilities
const getMockTime = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const getMockDate = () => {
  const d = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${getMockTime()} · ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

const formatPreviewText = (text, platform) => {
  if (!text) return '';
  // Basic HTML sanitization
  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  if (platform === 'whatsapp') {
    // Bold: *text* -> <strong>text</strong>
    escaped = escaped.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
  }
  
  return escaped.replace(/\n/g, '<br>');
};

onMounted(() => {
  history.value = getHistory();
  referenceCollection.value = getReferenceCollection();
  
  // Load AI configuration
  aiProvider.value = getStoredProvider();
  geminiModel.value = getStoredModel('gemini');
  deepseekModel.value = getStoredModel('deepseek');
  
  apiKeyConfigured.gemini = hasApiKey('gemini');
  apiKeyConfigured.deepseek = hasApiKey('deepseek');

  // Load custom API config
  customEndpointInput.value = getCustomEndpoint();
  customModelInput.value = getCustomModel();
  customApiKeyInput.value = getApiKey('custom');
  customConfigured.value = hasCustomConfig();
});
</script>

<style scoped>
/* ============================================
   LAYOUT & BACKGROUND
   ============================================ */
.caption-app {
  min-height: 100vh;
  background: #0b0f19;
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
  filter: blur(140px);
  opacity: 0.12;
}

.s1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #4f46e5, #818cf8);
  top: -10%;
  right: -5%;
  animation: float 22s ease-in-out infinite;
}

.s2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #0d9488, #2dd4bf);
  bottom: -10%;
  left: -5%;
  animation: float 26s ease-in-out infinite reverse;
}

.s3 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #7c3aed, #a78bfa);
  top: 45%;
  left: 35%;
  animation: float 20s ease-in-out infinite 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-30px) scale(1.03); }
}

.layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 460px 1fr;
  min-height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  gap: 1.5rem;
  padding: 1.5rem;
}

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
    padding: 1rem;
    padding-bottom: 6rem;
  }
}

/* ============================================
   GLASS PANEL & CORE SCROLL
   ============================================ */
.glass {
  background: rgba(17, 24, 39, 0.5);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1rem;
}

.panel {
  padding: 1.5rem;
  color: #f1f5f9;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.input-panel {
  max-height: calc(100vh - 3rem);
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
  font-size: 1.8rem;
  width: 3.25rem;
  height: 3.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1, #d946ef);
  border-radius: 0.875rem;
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.25);
}

.panel-header h1 {
  font-size: 1.2rem;
  font-weight: 800;
  color: white;
  margin: 0;
  letter-spacing: -0.02em;
}

.panel-header p {
  font-size: 0.78rem;
  color: #94a3b8;
  margin: 0.125rem 0 0;
}

.scroll-area {
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.scroll-area::-webkit-scrollbar {
  width: 4px;
}
.scroll-area::-webkit-scrollbar-track {
  background: transparent;
}
.scroll-area::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

@media (max-width: 1024px) {
  .scroll-area {
    overflow: visible;
  }
}

/* ============================================
   SECTIONS & INPUTS
   ============================================ */
.section {
  display: block;
}

.section h3 {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  font-weight: 800;
  margin: 0 0 0.8rem;
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
  gap: 0.4rem;
  padding: 0.85rem 0.5rem;
  border-radius: 0.875rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #cbd5e1;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.75rem;
  font-weight: 600;
}

.select-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.select-card.active {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.4);
  color: white;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.12);
}

.card-emoji {
  font-size: 1.4rem;
}

.card-label {
  text-align: center;
  line-height: 1.25;
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
  gap: 0.45rem;
  padding: 0.65rem 0.9rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #cbd5e1;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.78rem;
  font-weight: 600;
}

.platform-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.platform-btn.active {
  background: rgba(13, 148, 136, 0.15);
  border-color: rgba(13, 148, 136, 0.45);
  color: white;
  box-shadow: 0 4px 15px rgba(13, 148, 136, 0.1);
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
  gap: 0.45rem;
  padding: 0.6rem 1.1rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #cbd5e1;
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
  background: rgba(167, 139, 250, 0.15);
  border-color: rgba(167, 139, 250, 0.45);
  color: white;
}

.tone-emoji {
  font-size: 1.1rem;
}

/* Text inputs */
.input-group {
  margin-bottom: 0.85rem;
}

.input-group label {
  display: block;
  font-size: 0.68rem;
  font-weight: 700;
  color: #94a3b8;
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.text-input {
  width: 100%;
  padding: 0.75rem 0.95rem;
  border-radius: 0.75rem;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: white;
  font-size: 0.85rem;
  outline: none;
  transition: all 0.2s ease-in-out;
  font-family: inherit;
}

.text-input::placeholder {
  color: rgba(148, 163, 184, 0.45);
}

.text-input:focus {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  background: rgba(0, 0, 0, 0.35);
}

.select-input {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.9rem center;
  background-size: 1.1rem;
  padding-right: 2.5rem;
}

.select-input option {
  background-color: #0b0f19;
  color: white;
}

.textarea {
  resize: vertical;
  min-height: 100px;
  line-height: 1.55;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

/* ============================================
   WRITING WIZARD
   ============================================ */
.assistant-section {
  padding: 0;
  overflow: hidden;
  border-color: rgba(167, 139, 250, 0.15);
}

.section-toggle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.95rem 1rem;
  user-select: none;
}

.section-toggle-header:hover {
  background: rgba(255, 255, 255, 0.02);
}

.section-toggle-header h3 {
  margin: 0;
  color: #c084fc;
}

.toggle-icon {
  font-size: 0.75rem;
  color: #a78bfa;
}

.assistant-content {
  padding: 0 1rem 1rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.helper-desc {
  font-size: 0.72rem;
  color: #94a3b8;
  margin-top: 0.5rem;
  margin-bottom: 0.85rem;
  line-height: 1.4;
}

.wizard-group {
  margin-bottom: 0.65rem;
}

.wizard-group label {
  display: block;
  font-size: 0.65rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 0.25rem;
}

.text-input-sm {
  padding: 0.55rem 0.75rem;
  font-size: 0.78rem;
  border-radius: 0.5rem;
}

.apply-wizard-btn {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(217, 70, 239, 0.25));
  border: 1px solid rgba(168, 85, 247, 0.4);
  color: #f3e8ff;
  font-weight: 700;
}

.apply-wizard-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(217, 70, 239, 0.4));
  color: white;
}

.apply-wizard-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ============================================
   HOOKS & CTAS LIBRARY
   ============================================ */
.quick-helpers {
  margin-top: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.875rem;
  background: rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.helper-tabs {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.helper-tab-btn {
  flex: 1;
  padding: 0.55rem;
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.helper-tab-btn.active {
  background: rgba(255, 255, 255, 0.03);
  color: #c084fc;
  box-shadow: inset 0 -2px 0 #a855f7;
}

.helper-body {
  padding: 0.6rem;
  max-height: 120px;
  overflow-y: auto;
}

.helper-body::-webkit-scrollbar {
  width: 3px;
}
.helper-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 1.5px;
}

.helper-items {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.helper-item-btn {
  text-align: left;
  padding: 0.4rem 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.4rem;
  color: #94a3b8;
  font-size: 0.72rem;
  font-weight: 550;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.helper-item-btn:hover {
  background: rgba(168, 85, 247, 0.12);
  border-color: rgba(168, 85, 247, 0.25);
  color: #e9d5ff;
  transform: translateX(2px);
}

/* ============================================
   AI TEXT POLISHER
   ============================================ */
.details-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.details-header-row label {
  margin-bottom: 0 !important;
}

.polish-btn-ai {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #a5b4fc;
  padding: 0.3rem 0.65rem;
  border-radius: 0.5rem;
  font-size: 0.68rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s;
}

.polish-btn-ai:hover:not(:disabled) {
  background: rgba(99, 102, 241, 0.25);
  color: white;
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.2);
}

.polish-btn-ai:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ============================================
   GENERATE BUTTON & AI ERRORS
   ============================================ */
.generate-btn {
  width: 100%;
  padding: 0.95rem;
  border: none;
  border-radius: 0.875rem;
  background: linear-gradient(135deg, #6366f1, #c084fc);
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
  margin-top: 0.5rem;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.45);
}

.generate-btn:active {
  transform: scale(0.98);
}

.generate-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.gen-icon {
  font-size: 1.15rem;
}

.ai-error {
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 0.75rem;
  color: #fca5a5;
  font-size: 0.78rem;
  line-height: 1.45;
}

/* ============================================
   OUTPUT TABS & MOCKUP WRAPPER
   ============================================ */
.output-tabs-container {
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.output-tabs {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.25rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.output-tab-btn {
  flex: 1;
  padding: 0.55rem 1rem;
  border-radius: 0.6rem;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s;
}

.output-tab-btn.active {
  background: rgba(255, 255, 255, 0.06);
  color: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.output-tab-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ============================================
   OUTPUT PANEL (RIGHT PANEL)
   ============================================ */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 55vh;
  padding: 2rem;
}

.empty-icon {
  font-size: 3.5rem;
  margin-bottom: 1.25rem;
  animation: pulse 2.2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.08); }
}

.empty-state h2 {
  font-size: 1.4rem;
  color: white;
  margin: 0 0 0.5rem;
  font-weight: 700;
}

.empty-state p {
  color: #94a3b8;
  max-width: 340px;
  line-height: 1.6;
  font-size: 0.85rem;
}

/* Result section */
.result-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.result-header h2 {
  font-size: 1.05rem;
  color: white;
  margin: 0;
  font-weight: 700;
}

.result-meta {
  display: flex;
  gap: 0.5rem;
}

.meta-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.68rem;
  font-weight: 700;
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
}

.meta-badge.warning {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}

.meta-badge.neutral {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
}

.limit-warning {
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 0.75rem;
  color: #fca5a5;
  font-size: 0.78rem;
}

.caption-output {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1.25rem;
  padding: 1.75rem;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.2);
}

.caption-text {
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
  font-size: 0.92rem;
  line-height: 1.75;
  color: #e2e8f0;
  margin: 0;
}

/* Action buttons */
.action-row {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 0.5rem;
}

.action-btn {
  padding: 0.65rem 1.35rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #e2e8f0;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.copy-btn.copied {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.35);
  color: #6ee7b7;
}

.saved-msg {
  color: #6ee7b7;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.65rem 0.5rem;
}

.platform-tip {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.85rem 1.1rem;
  background: rgba(13, 148, 136, 0.06);
  border: 1px dashed rgba(13, 148, 136, 0.2);
  border-radius: 0.875rem;
  font-size: 0.76rem;
  color: #2dd4bf;
  line-height: 1.5;
}

/* ============================================
   HISTORY
   ============================================ */
.history-section {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.history-header h3 {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.clear-btn {
  background: none;
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #fca5a5;
  padding: 0.35rem 0.85rem;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.4);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.history-list::-webkit-scrollbar {
  width: 4px;
}
.history-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
}

.history-card {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.history-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(99, 102, 241, 0.25);
  transform: translateX(2px);
}

.history-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.history-cat {
  font-size: 0.68rem;
  font-weight: 700;
  color: #a5b4fc;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.history-time {
  font-size: 0.65rem;
  color: #64748b;
}

.history-preview {
  font-size: 0.78rem;
  color: #94a3b8;
  line-height: 1.45;
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
  padding: 0.95rem 1.75rem;
  border-radius: 2rem;
  background: linear-gradient(135deg, #6366f1, #c084fc);
  color: white;
  font-weight: 800;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
  animation: fabPulse 2.5s ease-in-out infinite;
}

@keyframes fabPulse {
  0%, 100% { box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35); }
  50% { box-shadow: 0 8px 32px rgba(99, 102, 241, 0.55); transform: translateY(-2px); }
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
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 0.75rem;
  margin-bottom: 1.25rem;
}

.mode-btn {
  flex: 1;
  padding: 0.65rem 0.75rem;
  border-radius: 0.55rem;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s;
}

.mode-btn.active {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.mode-btn.ai.active {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
  border: 1px solid rgba(168, 85, 247, 0.25);
  color: white;
}

.mode-btn.marketing.active {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(249, 115, 22, 0.15));
  border: 1px solid rgba(249, 115, 22, 0.25);
  color: white;
}


/* ============================================
   API KEY SECTION & PROVIDER TABS
   ============================================ */
.api-key-section {
  margin-bottom: 1.25rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1rem;
}

.provider-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.provider-tab {
  flex: 1;
  padding: 0.5rem;
  font-size: 0.72rem;
  font-weight: 700;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.04);
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.2s;
}

.provider-tab.active {
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.35);
  color: white;
}

.provider-tab:hover:not(.active) {
  background: rgba(255, 255, 255, 0.04);
  color: #94a3b8;
}

.key-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.key-dot.green {
  background: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
}

.key-dot.red {
  background: #ef4444;
  box-shadow: 0 0 6px rgba(239, 68, 68, 0.6);
}

.api-key-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(16, 185, 129, 0.06);
  border: 1px solid rgba(16, 185, 129, 0.15);
  padding: 0.6rem 0.8rem;
  border-radius: 0.6rem;
}

.status-text {
  font-size: 0.78rem;
  color: #6ee7b7;
  font-weight: 600;
}

.key-edit-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  padding: 0.25rem 0.55rem;
  border-radius: 0.4rem;
  font-size: 0.68rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
}

.key-edit-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.api-key-form label {
  display: block;
  font-size: 0.65rem;
  font-weight: 700;
  color: #94a3b8;
  margin-bottom: 0.35rem;
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
  background: linear-gradient(135deg, #6366f1, #818cf8);
  border: none;
  border-radius: 0.6rem;
  color: white;
  font-weight: 700;
  font-size: 0.78rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.2);
}

.key-save-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(99, 102, 241, 0.3);
}

.key-help {
  display: block;
  margin-top: 0.45rem;
  font-size: 0.65rem;
  color: #818cf8;
  text-decoration: none;
  font-weight: 550;
}

.key-help.deepseek {
  color: #a78bfa;
}

.key-help:hover {
  text-decoration: underline;
}

/* ============================================
   CUSTOM API PROVIDER STYLES
   ============================================ */
.custom-tab {
  background: rgba(245, 158, 11, 0.05) !important;
  border-color: rgba(245, 158, 11, 0.1) !important;
}

.custom-tab.active {
  background: rgba(245, 158, 11, 0.12) !important;
  border-color: rgba(245, 158, 11, 0.4) !important;
  color: #fbbf24 !important;
}

.custom-api-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.custom-api-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(251, 191, 36, 0.08));
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 0.5rem;
  padding: 0.4rem 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #fbbf24;
  letter-spacing: 0.02em;
}

.custom-api-desc {
  font-size: 0.7rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

.custom-presets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
}

.presets-label {
  font-size: 0.65rem;
  color: #64748b;
  font-weight: 600;
  white-space: nowrap;
}

.preset-chip {
  padding: 0.25rem 0.6rem;
  border-radius: 1rem;
  border: 1px solid rgba(245, 158, 11, 0.2);
  background: rgba(245, 158, 11, 0.06);
  color: #fbbf24;
  font-size: 0.65rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.preset-chip:hover {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(245, 158, 11, 0.4);
  transform: translateY(-1px);
}

.input-hint {
  display: block;
  font-size: 0.62rem;
  color: #475569;
  margin-top: 0.2rem;
  font-style: italic;
}

.optional-label {
  font-size: 0.6rem;
  color: #475569;
  font-weight: 400;
}

.custom-incomplete-msg {
  font-size: 0.68rem;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.06);
  border: 1px solid rgba(245, 158, 11, 0.15);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

/* ============================================
   REFERENCE COLLECTION
   ============================================ */
.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
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
  padding: 0.45rem 1rem;
  font-size: 0.72rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: none;
  font-weight: 700;
  transition: all 0.2s;
}

.save-ref-btn {
  background: rgba(168, 85, 247, 0.15);
  color: #d8b4fe;
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.save-ref-btn:hover:not(:disabled) {
  background: rgba(168, 85, 247, 0.3);
  color: white;
}

.save-ref-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ref-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 180px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.ref-list::-webkit-scrollbar {
  width: 3px;
}
.ref-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 1.5px;
}

.ref-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.65rem 0.85rem;
  border-radius: 0.6rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition: all 0.2s;
}

.ref-card:hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(99, 102, 241, 0.25);
}

.ref-card.active {
  background: rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.45);
}

.ref-text {
  font-size: 0.75rem;
  color: #cbd5e1;
  line-height: 1.45;
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
  font-size: 0.75rem;
  opacity: 0.5;
  transition: opacity 0.2s;
  flex-shrink: 0;
  margin-left: 0.6rem;
}

.del-ref-btn:hover {
  opacity: 1;
}

.empty-ref-msg {
  font-size: 0.74rem;
  color: #64748b;
  text-align: center;
  padding: 1.25rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 0.6rem;
  font-style: italic;
}

/* ============================================
   MOCKUPS & STYLING FOR PREVIEWS
   ============================================ */
.mockup-view-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mockup-platform-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 0.5rem;
}

.mockup-platform-header h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #94a3b8;
}

.mockup-info-badge {
  font-size: 0.65rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 0.35rem;
  color: #94a3b8;
}

.mock-card {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* WhatsApp Mock */
.mock-whatsapp {
  background: #0b141a;
  color: #e9edef;
}
.whatsapp-header {
  background: #202c33;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.wa-avatar {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background: #4f46e5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}
.wa-user-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.wa-username {
  font-weight: 600;
  font-size: 0.85rem;
}
.wa-status {
  font-size: 0.68rem;
  color: #8696a0;
}
.wa-actions {
  color: #8696a0;
  font-size: 1rem;
  display: flex;
  gap: 0.75rem;
  cursor: default;
}
.whatsapp-body {
  padding: 1.25rem;
  background-color: #0b141a;
  background-image: radial-gradient(rgba(255,255,255,0.02) 1px, transparent 0);
  background-size: 24px 24px;
  min-height: 200px;
  display: flex;
  align-items: flex-start;
}
.wa-bubble {
  background: #005c4b;
  border-radius: 0.5rem;
  border-top-left-radius: 0;
  padding: 0.6rem 0.85rem;
  max-width: 85%;
  position: relative;
  box-shadow: 0 1px 0.5px rgba(0,0,0,0.15);
}
.wa-message-content {
  font-size: 0.85rem;
  line-height: 1.45;
  color: #e9edef;
}
.wa-timestamp {
  display: block;
  text-align: right;
  font-size: 0.62rem;
  color: rgba(255,255,255,0.6);
  margin-top: 0.25rem;
}

/* Facebook Mock */
.mock-facebook {
  background: #242526;
  color: #e4e6eb;
}
.fb-header {
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
.fb-avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #1877f2, #3b5998);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.95rem;
  color: white;
}
.fb-meta {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.fb-name {
  font-weight: 700;
  font-size: 0.88rem;
  color: white;
}
.fb-time {
  font-size: 0.72rem;
  color: #b0b3b8;
}
.fb-more {
  color: #b0b3b8;
  font-size: 1.1rem;
}
.fb-body {
  padding: 0.25rem 1rem 1rem 1rem;
}
.fb-text {
  font-size: 0.88rem;
  line-height: 1.45;
}
.fb-action-bar {
  display: flex;
  border-top: 1px solid #3e4042;
  padding: 0.3rem 0;
  background: #242526;
}
.fb-act {
  flex: 1;
  text-align: center;
  padding: 0.55rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #b0b3b8;
  cursor: default;
}
.fb-act:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

/* Instagram Mock */
.mock-instagram {
  background: #000000;
  color: #f5f5f5;
}
.ig-header {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.ig-avatar {
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #ee2a7b, #6228d7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 800;
  color: white;
}
.ig-username {
  font-weight: 700;
  font-size: 0.82rem;
  flex: 1;
}
.ig-more {
  font-size: 1.1rem;
  color: #a8a8a8;
}
.ig-image-placeholder {
  background: linear-gradient(135deg, #111827, #1f2937);
  border-top: 1px solid #262626;
  border-bottom: 1px solid #262626;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ig-media-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #737373;
  font-size: 0.8rem;
}
.ig-media-icon {
  font-size: 2.2rem;
}
.ig-actions {
  padding: 0.75rem 0.85rem;
  display: flex;
  gap: 0.95rem;
  font-size: 1.25rem;
}
.ig-icon-right {
  margin-left: auto;
}
.ig-body {
  padding: 0 0.85rem 0.95rem 0.85rem;
}
.ig-likes {
  font-size: 0.82rem;
  margin: 0 0 0.4rem 0;
}
.ig-caption-container {
  font-size: 0.82rem;
  line-height: 1.45;
}
.ig-caption-container strong {
  margin-right: 0.3rem;
}

/* Twitter/X Mock */
.mock-x {
  background: #000000;
  color: #e7e9ea;
}
.x-header {
  padding: 0.85rem 1rem 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
.x-avatar {
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  background: #2f3336;
  background-image: linear-gradient(135deg, #818cf8, #c084fc);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  color: white;
}
.x-names {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.x-displayname {
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: white;
}
.x-badge {
  color: #1d9bf0;
  font-size: 0.8rem;
}
.x-handle {
  font-size: 0.78rem;
  color: #71767b;
}
.x-logo {
  font-size: 1.2rem;
  font-weight: 800;
  color: white;
}
.x-body {
  padding: 0 1.15rem 1rem 1.15rem;
}
.x-text {
  font-size: 0.92rem;
  line-height: 1.5;
  margin-bottom: 0.85rem;
}
.x-timestamp {
  font-size: 0.75rem;
  color: #71767b;
  border-bottom: 1px solid #2f3336;
  padding-bottom: 0.75rem;
}
.x-action-bar {
  display: flex;
  justify-content: space-between;
  padding: 0.65rem 1.5rem;
  color: #71767b;
  font-size: 0.8rem;
  border-top: 1px solid #2f3336;
}

/* LinkedIn Mock */
.mock-linkedin {
  background: #1d2226;
  color: #e5e5e5;
}
.li-header {
  padding: 0.85rem 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  position: relative;
}
.li-avatar {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  background: #0077b5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.05rem;
}
.li-meta {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-right: 4rem;
}
.li-name {
  font-weight: 700;
  font-size: 0.88rem;
  color: white;
}
.li-degree {
  font-weight: 400;
  color: #94a3b8;
  font-size: 0.78rem;
}
.li-headline {
  font-size: 0.72rem;
  color: #94a3b8;
  line-height: 1.35;
  margin-top: 0.1rem;
}
.li-time {
  font-size: 0.7rem;
  color: #94a3b8;
  margin-top: 0.15rem;
}
.li-follow-btn {
  position: absolute;
  right: 1rem;
  top: 0.95rem;
  background: transparent;
  border: none;
  color: #70b5f9;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
}
.li-body {
  padding: 0.25rem 1rem 1rem 1rem;
}
.li-text {
  font-size: 0.85rem;
  line-height: 1.5;
}
.li-action-bar {
  display: flex;
  border-top: 1px solid #2f3438;
  padding: 0.25rem 0.5rem;
}
.li-act {
  flex: 1;
  text-align: center;
  padding: 0.6rem 0.25rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #94a3b8;
  cursor: default;
}
.li-act:hover {
  background: rgba(255, 255, 255, 0.04);
  color: white;
}

/* Spinner helper sizes */
.spinner-xs {
  width: 0.75rem;
  height: 0.75rem;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: inline-block;
}

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

/* Custom editable textarea and UX improvements */
.caption-textarea {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  resize: vertical;
  font-family: inherit;
  font-size: 0.92rem;
  line-height: 1.75;
  color: #e2e8f0;
  margin: 0;
  padding: 0;
  min-height: 160px;
}

.ref-card.active .ref-text {
  display: block;
  -webkit-line-clamp: unset;
  overflow: visible;
}

.generate-btn.warning-btn {
  background: linear-gradient(135deg, #ef4444, #f97316);
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.35);
}

/* Wizard fade transition */
.wizard-fade-enter-active,
.wizard-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 400px;
  opacity: 1;
  overflow: hidden;
}

.wizard-fade-enter-from,
.wizard-fade-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  overflow: hidden;
}

/* Helper cards styles */
.helper-item-card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.65rem 0.85rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.helper-item-card:hover {
  background: rgba(168, 85, 247, 0.1);
  border-color: rgba(168, 85, 247, 0.25);
  transform: translateX(3px);
}

.helper-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.helper-item-label {
  font-size: 0.76rem;
  font-weight: 700;
  color: #e9d5ff;
}

.helper-item-action-icon {
  font-size: 0.65rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.helper-item-card:hover .helper-item-action-icon {
  opacity: 1;
}

.helper-item-desc {
  font-size: 0.68rem;
  color: #94a3b8;
  margin: 0;
  line-height: 1.35;
}

/* ============================================
   MARKETING MODE STYLES
   ============================================ */

.generate-btn.marketing-btn:not(.warning-btn) {
  background: linear-gradient(135deg, #ef4444, #f97316);
  box-shadow: 0 10px 25px rgba(249, 115, 22, 0.4);
}

.mkt-topic-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #fed7aa;
  margin-bottom: 0.6rem;
  letter-spacing: 0.5px;
}

.mkt-topic-textarea {
  border: 1px solid rgba(249, 115, 22, 0.3);
  background: rgba(249, 115, 22, 0.03);
  font-size: 0.95rem;
  padding: 1rem;
}

.mkt-topic-textarea:focus {
  border-color: rgba(249, 115, 22, 0.6);
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15);
}

.mkt-badge {
  background: linear-gradient(135deg, #ef4444, #f97316);
  color: white;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Campaign Goal Grid */
.goal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
}

.goal-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.85rem 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  gap: 0.35rem;
}

.goal-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
}

.goal-card.active {
  background: rgba(249, 115, 22, 0.1);
  border-color: rgba(249, 115, 22, 0.4);
}

.goal-icon {
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
}

.goal-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #e2e8f0;
}

.goal-card.active .goal-label {
  color: #fed7aa;
}

.goal-desc {
  font-size: 0.6rem;
  color: #94a3b8;
  line-height: 1.3;
}

/* Hook Types Grid */
.hook-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
}

.hook-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.hook-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.hook-card.active {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(249, 115, 22, 0.05));
  border-color: rgba(249, 115, 22, 0.3);
}

.hook-icon {
  font-size: 1.25rem;
  margin-bottom: 0.4rem;
}

.hook-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: #e2e8f0;
  margin-bottom: 0.2rem;
}

.hook-card.active .hook-label {
  color: #ffedd5;
}

.hook-framework {
  font-size: 0.62rem;
  font-weight: 700;
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.15);
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  margin-top: auto;
}

/* Thread Count */
.thread-count-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.thread-pill {
  flex: 1;
  padding: 0.6rem 0;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.thread-pill:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.thread-pill.active {
  background: rgba(249, 115, 22, 0.15);
  border-color: rgba(249, 115, 22, 0.4);
  color: #fed7aa;
}

.thread-hint {
  font-size: 0.65rem;
  color: #94a3b8;
  margin: 0;
  font-style: italic;
}

/* Thread Output section */
.thread-output-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.thread-output-header {
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.thread-count-badge {
  background: rgba(249, 115, 22, 0.2);
  color: #fed7aa;
  padding: 0.3rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid rgba(249, 115, 22, 0.3);
}

.thread-cards-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-height: 550px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.thread-card {
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.85rem;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.thread-card-header {
  display: flex;
  align-items: center;
  padding: 0.65rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.thread-card-num {
  font-size: 0.75rem;
  font-weight: 800;
  color: #fed7aa;
  background: rgba(249, 115, 22, 0.15);
  padding: 0.2rem 0.6rem;
  border-radius: 0.5rem;
  margin-right: 0.75rem;
}

.thread-card-chars {
  font-size: 0.65rem;
  color: #94a3b8;
  margin-right: auto;
}

.thread-copy-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.2rem;
  transition: all 0.2s;
}

.thread-copy-btn:hover {
  transform: scale(1.1);
  color: white;
}

.thread-card-textarea {
  border: none !important;
  background: transparent !important;
  border-radius: 0 !important;
  resize: vertical;
  min-height: 100px;
}

.thread-card-textarea:focus {
  box-shadow: none !important;
  background: rgba(255, 255, 255, 0.02) !important;
}

.mkt-result-badge {
  background: rgba(249, 115, 22, 0.15);
  color: #fed7aa;
  border: 1px solid rgba(249, 115, 22, 0.3);
}

@media (max-width: 768px) {
  .goal-grid {
    grid-template-columns: 1fr;
  }
  .hook-grid {
    grid-template-columns: 1fr;
  }
}
</style>
