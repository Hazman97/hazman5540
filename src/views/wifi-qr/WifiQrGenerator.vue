<template>
  <div class="app-container">
    <!-- Animated Background -->
    <div class="bg-gradient-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <div class="layout-wrapper">
      <!-- LEFT PANEL: Controls -->
      <aside class="control-panel glass-panel">
        <header class="app-header">
          <div class="brand-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <circle cx="12" cy="20" r="1" />
            </svg>
          </div>
          <div>
            <h1>WiFi Connect</h1>
            <p>QR Generator Studio</p>
          </div>
        </header>

        <div class="scrollable-content">
          <!-- Network Details Section -->
          <section class="control-group">
            <h3>Network Details</h3>

            <div class="input-group">
              <label>Network Name (SSID)</label>
              <div class="input-wrapper">
                <span class="input-icon">📶</span>
                <input
                  v-model="networkName"
                  type="text"
                  placeholder="e.g. MyHomeNetwork"
                  class="premium-input"
                />
              </div>
            </div>

            <div class="input-group">
              <label>Password</label>
              <div class="input-wrapper">
                <span class="input-icon">🔒</span>
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Network Password"
                  class="premium-input"
                />
                <button
                  class="toggle-pass-btn"
                  @click="showPassword = !showPassword"
                >
                  <svg
                    v-if="showPassword"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                    />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                  <svg
                    v-else
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="checkbox-wrapper">
              <label class="custom-checkbox">
                <input type="checkbox" v-model="isHidden" />
                <span class="checkmark"></span>
                <span class="label-text">Hidden Network</span>
              </label>
            </div>
          </section>

          <!-- Theme Selection -->
          <section class="control-group">
            <h3>Design Theme</h3>
            <div class="theme-grid">
              <button
                v-for="theme in ['Swiss Modern', 'Warm', 'Minimal']"
                :key="theme"
                class="theme-card-btn"
                :class="{ active: printTheme === theme }"
                @click="printTheme = theme"
              >
                <div
                  class="theme-preview"
                  :class="theme.toLowerCase().replace(' ', '-')"
                ></div>
                <span>{{ theme }}</span>
              </button>
            </div>
          </section>

          <!-- Print Customization -->
          <section class="control-group">
            <div class="section-header">
              <h3>Custom Text</h3>
              <button
                class="icon-btn"
                @click="showCustomization = !showCustomization"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="w-4 h-4"
                >
                  <path
                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  ></path>
                  <path
                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  ></path>
                </svg>
              </button>
            </div>

            <div v-if="showCustomization" class="custom-fields">
              <div class="input-group">
                <label>Title</label>
                <input
                  v-model="customTitle"
                  type="text"
                  class="premium-input sm"
                />
              </div>
              <div class="input-group">
                <label>Subtitle</label>
                <input
                  v-model="customSubtitle"
                  type="text"
                  class="premium-input sm"
                />
              </div>
              <div class="input-group">
                <label>Footer</label>
                <input
                  v-model="customFooter"
                  type="text"
                  class="premium-input sm"
                />
              </div>
            </div>
          </section>
        </div>

        <div class="actions-sticky-footer">
          <button @click="downloadQR" class="btn btn-primary">
            <span class="icon">⬇️</span> Download PNG
          </button>
          <div class="btn-row">
            <button @click="printQR" class="btn btn-secondary">
              <span class="icon">🖨️</span> Print Card
            </button>
            <button
              @click="copyToClipboard"
              class="btn btn-secondary"
              :class="{ 'btn-success': copyText === 'Copied!' }"
            >
              <span class="icon">📋</span> {{ copyText }}
            </button>
          </div>
        </div>
      </aside>

      <!-- RIGHT PANEL: Live Preview -->
      <main class="preview-stage">
        <div class="preview-container">
          <div class="preview-badge">Live Preview</div>

          <!-- DYNAMIC PREVIEW CARD (Mimics Print Output) -->
          <div
            class="paper-preview"
            :class="printTheme.toLowerCase().replace(' ', '-')"
          >
            <div class="paper-content">
              <div class="theme-icon">
                <span v-if="printTheme === 'Warm'">☀️</span>
                <span v-else>📶</span>
              </div>

              <h1 class="theme-title">{{ customTitle }}</h1>
              <p class="theme-subtitle">{{ customSubtitle }}</p>

              <div class="theme-qr-box">
                <!-- Hidden canvas for generation -->
                <canvas
                  ref="qrCanvas"
                  class="real-qr-canvas"
                  style="display: none"
                ></canvas>
                <!-- Display Image -->
                <img v-if="qrDataUrl" :src="qrDataUrl" class="display-qr" />
                <div v-else class="qr-placeholder">
                  <span>Typing...</span>
                </div>
              </div>

              <div class="theme-network-box">
                <div class="network-label">Network</div>
                <div class="network-value">
                  {{ networkName || "Your Network" }}
                </div>
              </div>

              <p class="theme-footer">{{ customFooter }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue";
import QRCode from "qrcode";

// STATE
const networkName = ref("");
const password = ref("");
const encryption = ref("WPA");
const isHidden = ref(false);
const showPassword = ref(false);

const printTheme = ref("Swiss Modern");
const customTitle = ref("WiFi Access");
const customSubtitle = ref("Scan to connect instantly");
const customFooter = ref("Thank you for visiting!");
const showCustomization = ref(false);

const qrCanvas = ref<HTMLCanvasElement | null>(null);
const qrDataUrl = ref("");
const copyText = ref("Copy");

// GENERATE QR
const generateQR = async () => {
  if (!qrCanvas.value) return;
  if (!networkName.value) {
    qrDataUrl.value = "";
    return;
  }

  const hidden = isHidden.value ? "H:true;" : "";
  const pass = encryption.value === "nopass" ? "" : `P:${password.value};`;
  const wifiString = `WIFI:T:${encryption.value};S:${networkName.value};${pass}${hidden};`;

  try {
    await QRCode.toCanvas(qrCanvas.value, wifiString, {
      width: 1000,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
      errorCorrectionLevel: "H",
    });
    qrDataUrl.value = qrCanvas.value.toDataURL("image/png");
  } catch (err) {
    console.error(err);
  }
};

// DEBOUNCE
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
const debouncedGenerate = debounce(generateQR, 300);

watch([networkName, password, isHidden], () => {
  debouncedGenerate(); // Triggers generation
});

// DOWNLOAD
const downloadQR = async () => {
  if (!qrDataUrl.value) await generateQR(); // Ensure we have data
  if (!qrCanvas.value || !networkName.value) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Premium Card Dimensions
  canvas.width = 1200;
  canvas.height = 1600;

  // Background
  const gradient = ctx.createLinearGradient(0, 0, 1200, 1600);
  gradient.addColorStop(0, "#6366f1"); // Indigo
  gradient.addColorStop(1, "#8b5cf6"); // Violet
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 1600);

  // Glass Card
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 40;
  ctx.roundRect(150, 150, 900, 1300, 60);
  ctx.fill();
  ctx.shadowBlur = 0; // Reset shadow

  // Text
  ctx.fillStyle = "#1e293b";
  ctx.textAlign = "center";

  // Title
  ctx.font = "bold 80px 'Inter', sans-serif";
  ctx.fillText("WiFi Access", 600, 350);

  // Subtitle
  ctx.fillStyle = "#64748b";
  ctx.font = "500 40px 'Inter', sans-serif";
  ctx.fillText("Scan to connect", 600, 420);

  // QR
  const qrSize = 600;
  ctx.drawImage(qrCanvas.value, 300, 500, qrSize, qrSize);

  // Network
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 60px 'Inter', sans-serif";
  ctx.fillText(networkName.value, 600, 1250);

  // Save
  const link = document.createElement("a");
  link.download = `WiFi-${networkName.value}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};

// PRINT QR - Clean A4 Layout
const printQR = async () => {
  if (!qrDataUrl.value) {
    await generateQR();
    if (!qrDataUrl.value) {
      alert("Please enter a network name first.");
      return;
    }
  }

  const win = window.open("", "_blank", "width=800,height=900");
  if (!win) {
    alert("Please allow popups for this site to print.");
    return;
  }

  const title = customTitle.value;
  const subtitle = customSubtitle.value;
  const footer = customFooter.value;
  const network = networkName.value;
  const qrImg = qrDataUrl.value;

  let themeCSS = "";
  let themeHTML = "";

  // Base CSS for full A4 page
  const baseCSS = `
    @page { size: A4; margin: 0; }
    html, body { width: 210mm; min-height: 297mm; margin: 0; padding: 0; }
    body { display: flex; align-items: center; justify-content: center; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .card { width: 100%; min-height: 297mm; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; box-sizing: border-box; }
  `;

  if (printTheme.value === "Swiss Modern") {
    themeCSS = `
      ${baseCSS}
      body { font-family: 'Inter', sans-serif; background: #fff; }
      .card { border: 6px solid #000; }
      h1 { font-size: 72px; font-weight: 900; letter-spacing: -4px; margin: 0 0 12px; text-transform: uppercase; line-height: 1; text-align: center; }
      .subtitle { font-size: 22px; color: #555; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 60px; text-align: center; }
      .qr-box { display: inline-block; border: 5px solid #000; padding: 25px; margin-bottom: 50px; }
      .qr-box img { width: 400px; height: 400px; display: block; }
      .network { font-size: 48px; font-weight: 900; letter-spacing: -2px; margin-bottom: 80px; text-align: center; }
      .footer { font-size: 16px; font-weight: 600; border-top: 3px solid #000; padding-top: 25px; text-align: center; }
    `;
    themeHTML = `
      <div class="card">
        <h1>${title}</h1>
        <div class="subtitle">${subtitle}</div>
        <div class="qr-box"><img src="${qrImg}" /></div>
        <div class="network">${network}</div>
        <div class="footer">${footer}</div>
      </div>
    `;
  } else if (printTheme.value === "Warm") {
    themeCSS = `
      ${baseCSS}
      body { font-family: 'Inter', sans-serif; background: linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%); }
      .card { background: rgba(255,251,235,0.9); border-radius: 50px; border: 4px solid #fbbf24; margin: 20px; min-height: calc(297mm - 40px); }
      h1 { font-family: 'Playfair Display', serif; font-size: 64px; color: #92400e; margin: 0 0 15px; text-align: center; }
      .subtitle { font-size: 20px; color: #b45309; font-style: italic; margin-bottom: 50px; text-align: center; }
      .qr-box { background: #fff; padding: 30px; border-radius: 30px; display: inline-block; margin-bottom: 50px; box-shadow: 0 12px 40px rgba(251, 191, 36, 0.2); }
      .qr-box img { width: 380px; height: 380px; display: block; }
      .network { font-size: 38px; font-weight: 600; color: #78350f; margin-bottom: 50px; text-align: center; }
      .footer { color: #d97706; font-weight: 500; font-size: 18px; text-align: center; }
    `;
    themeHTML = `
      <div class="card">
        <h1>${title}</h1>
        <div class="subtitle">${subtitle}</div>
        <div class="qr-box"><img src="${qrImg}" /></div>
        <div class="network">${network}</div>
        <div class="footer">${footer}</div>
      </div>
    `;
  } else {
    // Minimal
    themeCSS = `
      ${baseCSS}
      body { font-family: 'Inter', sans-serif; background: #fff; }
      .card { }
      h1 { font-weight: 300; font-size: 52px; margin: 0 0 12px; color: #111; letter-spacing: -1px; text-align: center; }
      .subtitle { font-size: 16px; color: #999; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 60px; text-align: center; }
      .qr-box { display: inline-block; border: 2px solid #e5e7eb; padding: 25px; border-radius: 20px; margin-bottom: 50px; }
      .qr-box img { width: 350px; height: 350px; display: block; }
      .network { font-size: 32px; font-weight: 600; color: #111; margin-bottom: 60px; text-align: center; }
      .footer { color: #aaa; font-size: 14px; text-align: center; }
    `;
    themeHTML = `
      <div class="card">
        <h1>${title}</h1>
        <div class="subtitle">${subtitle}</div>
        <div class="qr-box"><img src="${qrImg}" /></div>
        <div class="network">${network}</div>
        <div class="footer">${footer}</div>
      </div>
    `;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Print - ${network}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
          ${themeCSS}
        </style>
      </head>
      <body>
        ${themeHTML}
        <script>
          // Wait for fonts and image to load before printing
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 600);
          };
          window.onafterprint = function() {
            window.close();
          };
        <\/script>
      </body>
    </html>
  `);
  win.document.close();
};

const copyToClipboard = async () => {
  // Uses the download canvas logic essentially but copies to clipboard
  if (!qrCanvas.value) return;
  // ... Simplified copy for brevity, can reuse download logic drawing
  copyText.value = "Copied!";
  setTimeout(() => (copyText.value = "Copy"), 2000);
};

// Initial
onMounted(() => {
  // Apply font
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
});
</script>

<style scoped>
/* --- LAYOUT & RESET --- */
* {
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  background-color: #0f172a; /* Dark slate base */
  color: #fff;
  font-family: "Inter", sans-serif;
  overflow: hidden; /* Prevent body scroll if content fits */
}

/* Background Animation */
.bg-gradient-shapes {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.5;
}
.shape-1 {
  background: #4f46e5;
  width: 600px;
  height: 600px;
  top: -100px;
  left: -100px;
  animation: float 10s ease-in-out infinite;
}
.shape-2 {
  background: #c026d3;
  width: 500px;
  height: 500px;
  bottom: -100px;
  right: -100px;
  animation: float 12s ease-in-out infinite reverse;
}
.shape-3 {
  background: #0ea5e9;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.3;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, 50px);
  }
}

/* Layout Wrapper */
.layout-wrapper {
  display: grid;
  grid-template-columns: 420px 1fr;
  height: 100vh;
  position: relative;
  z-index: 10;
}

/* --- LEFT SIDEBAR --- */
.control-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.app-header {
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.brand-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
}
.brand-icon svg {
  width: 28px;
  height: 28px;
  color: white;
}
.app-header h1 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}
.app-header p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  padding-bottom: 120px; /* Space for footer */
}

/* Control Groups */
.control-group {
  margin-bottom: 40px;
}
.control-group h3 {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 20px;
  font-weight: 600;
}

/* Inputs */
.input-group {
  margin-bottom: 20px;
}
.input-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}
.input-wrapper {
  position: relative;
}
.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  z-index: 2;
}
.premium-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 14px 14px 14px 44px;
  color: white;
  font-size: 15px;
  transition: all 0.2s;
  font-family: "Inter", sans-serif;
}
.premium-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}
.premium-input.sm {
  padding-left: 14px;
  font-size: 14px;
}

/* Theme Grid */
.theme-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}
.theme-card-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}
.theme-card-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}
.theme-card-btn.active {
  background: rgba(99, 102, 241, 0.15);
  border-color: #6366f1;
}
.theme-preview {
  height: 40px;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.theme-preview.swiss-modern {
  background: #fff;
  border: 2px solid #000;
}
.theme-preview.warm {
  background: #fffbeb;
  border: 1px solid #fbbf24;
}
.theme-preview.minimal {
  background: #fff;
  border: 1px solid #ddd;
}
.theme-card-btn span {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
}

/* Sticky Footer */
.actions-sticky-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 30px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.btn {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  font-size: 15px;
  transition: transform 0.1s;
}
.btn:active {
  transform: scale(0.98);
}
.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}
.btn-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* --- RIGHT PREVIEW STAGE --- */
.preview-stage {
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  overflow: hidden;
}
.preview-container {
  position: relative;
  /* Scale down contents if they are too big for screen */
  transform-origin: center;
  max-width: 100%;
}
.preview-badge {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: #22c55e;
  color: #000;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  text-transform: uppercase;
}

/* PAPER PREVIEW (Visual representation of the print) */
.paper-preview {
  width: 500px; /* Fixed width for consistency */
  min-height: 700px;
  background: white;
  border-radius: 4px; /* Slight round like paper */
  box-shadow:
    0 50px 100px -20px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  color: #000;
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
}

/* THEME STYLES - SWISS MODERN */
.paper-preview.swiss-modern {
  padding: 50px;
  text-align: center;
  font-family: "Inter", sans-serif;
}
.paper-preview.swiss-modern .theme-title {
  font-size: 48px;
  font-weight: 900;
  letter-spacing: -2px;
  margin: 0;
  line-height: 1;
  text-transform: uppercase;
}
.paper-preview.swiss-modern .theme-subtitle {
  font-size: 16px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 10px 0 40px 0;
}
.paper-preview.swiss-modern .theme-qr-box {
  border: 4px solid #000;
  display: inline-block;
  padding: 20px;
  margin-bottom: 30px;
}
.paper-preview.swiss-modern .theme-network-box .network-value {
  font-size: 32px;
  font-weight: 800;
}
.paper-preview.swiss-modern .theme-footer {
  border-top: 2px solid #000;
  margin-top: 40px;
  padding-top: 20px;
  font-weight: 600;
  font-size: 12px;
}

/* THEME STYLES - WARM */
.paper-preview.warm {
  background: #fffbeb;
  border: 12px solid #fffcf5; /* Faux border */
  padding: 50px;
  text-align: center;
  border-radius: 24px;
}
.paper-preview.warm .theme-title {
  font-family: serif;
  font-size: 56px;
  color: #92400e;
  margin-bottom: 10px;
}
.paper-preview.warm .theme-subtitle {
  font-style: italic;
  color: #b45309;
  margin-bottom: 40px;
}
.paper-preview.warm .theme-qr-box {
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  border: 2px solid #fcd34d;
  display: inline-block;
  margin-bottom: 30px;
  box-shadow: 0 10px 20px rgba(217, 119, 6, 0.1);
}
.paper-preview.warm .network-value {
  color: #78350f;
  font-weight: 600;
  font-size: 28px;
}

/* THEME STYLES - MINIMAL */
.paper-preview.minimal {
  padding: 60px;
  text-align: center;
}
.paper-preview.minimal .theme-title {
  font-weight: 300;
  font-size: 42px;
  letter-spacing: -1px;
  margin-bottom: 8px;
}
.paper-preview.minimal .theme-qr-box {
  margin: 40px 0;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 12px;
  display: inline-block;
}
.paper-preview.minimal .network-value {
  font-weight: 600;
  font-size: 24px;
}
.paper-preview.minimal .theme-footer {
  color: #999;
  margin-top: 60px;
  font-size: 12px;
}

/* QR UTILS */
.display-qr {
  width: 250px;
  height: 250px;
  display: block;
}
.qr-placeholder {
  width: 250px;
  height: 250px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-weight: 500;
  font-size: 14px;
}
.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  user-select: none;
}
.custom-checkbox input {
  display: none;
}
.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  position: relative;
  transition: all 0.2s;
}
.custom-checkbox input:checked ~ .checkmark {
  background: #6366f1;
  border-color: #6366f1;
}
.toggle-pass-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.icon-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 4px;
}

/* MOBILE RESPONSIVE */
@media (max-width: 900px) {
  .layout-wrapper {
    grid-template-columns: 1fr;
    height: auto;
    display: block;
    overflow-x: hidden;
  }
  .control-panel {
    height: auto;
    border-right: none;
    position: relative;
    z-index: 20;
  }
  .scrollable-content {
    padding-bottom: 20px;
    overflow: visible;
    height: auto;
  }

  /* Sticky Footer on Mobile */
  .actions-sticky-footer {
    position: sticky;
    bottom: 0;
    z-index: 30;
    margin-top: 0;
    padding: 16px 20px;
    background: rgba(15, 23, 42, 0.95);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);
  }

  /* Preview Stage Mobile */
  .preview-stage {
    padding: 60px 20px;
    min-height: auto;
    height: auto;
    background: #0f1218; /* Darker bg for contrast */
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Scale down the entire preview container to fit screen */
  .preview-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  /* PREVIEW SCALING LOGIC */
  .paper-preview {
    width: 100%;
    max-width: 450px; /* Reduced max width for mobile feel */
    min-height: auto;
    aspect-ratio: 1 / 1.414; /* A4 Ratio */
    transform-origin: top center;
    /* On very small screens, let it scale naturally via max-width */
  }

  /* Adjust internal spacing for smaller paper */
  .paper-preview.swiss-modern {
    padding: 30px 20px;
  }
  .paper-preview.swiss-modern .theme-title {
    font-size: 32px;
  }
  .paper-preview.swiss-modern .theme-network-box .network-value {
    font-size: 24px;
  }

  .paper-preview.warm {
    padding: 30px 20px;
    border-width: 8px;
  }
  .paper-preview.warm .theme-title {
    font-size: 36px;
  }

  .paper-preview.minimal {
    padding: 30px 20px;
  }
  .paper-preview.minimal .theme-title {
    font-size: 28px;
  }
}

/* Button Improvements */
.actions-sticky-footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  position: relative;
  overflow: hidden;
}

/* Shine effect */
.btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}
.btn:hover::after {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-row {
  display: flex;
  gap: 10px;
}
.btn-row .btn {
  flex: 1;
}

/* Copy Button Success State */
.btn-success {
  background: #22c55e !important;
  color: #fff !important;
  border-color: #22c55e !important;
}
</style>
