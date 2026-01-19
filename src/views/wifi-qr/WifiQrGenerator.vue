<template>
  <div class="wifi-qr-container">
    <!-- Background Effects -->
    <div class="bg-effects">
      <div class="gradient-orb gradient-orb-1"></div>
      <div class="gradient-orb gradient-orb-2"></div>
      <div class="gradient-orb gradient-orb-3"></div>
    </div>

    <div class="content-wrapper">
      <!-- Header -->
      <header class="header">
        <div class="logo-section">
          <div class="logo-icon">
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
          <div class="logo-text">
            <h1>WiFi QR Generator</h1>
            <p>Share your WiFi instantly</p>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <div class="card-grid">
          <!-- Input Card -->
          <div class="input-card glass-card">
            <div class="card-header">
              <div class="header-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h2>Network Details</h2>
            </div>

            <form @submit.prevent="generateQR" class="form-content">
              <!-- Network Name -->
              <div class="form-group">
                <label for="ssid">
                  <span class="label-icon">📶</span>
                  Network Name (SSID)
                </label>
                <input
                  id="ssid"
                  v-model="networkName"
                  type="text"
                  placeholder="Enter your WiFi name"
                  required
                  class="input-field"
                />
              </div>

              <!-- Password -->
              <div class="form-group">
                <label for="password">
                  <span class="label-icon">🔑</span>
                  Password
                </label>
                <div class="password-wrapper">
                  <input
                    id="password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Enter WiFi password"
                    class="input-field"
                  />
                  <button
                    type="button"
                    class="toggle-password"
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

              <!-- Encryption Type -->
              <div class="form-group">
                <label>
                  <span class="label-icon">🔒</span>
                  Security Type
                </label>
                <div class="radio-group">
                  <label
                    class="radio-option"
                    :class="{ active: encryption === 'WPA' }"
                  >
                    <input type="radio" v-model="encryption" value="WPA" />
                    <span class="radio-dot"></span>
                    <span class="radio-label">WPA/WPA2</span>
                  </label>
                  <label
                    class="radio-option"
                    :class="{ active: encryption === 'WEP' }"
                  >
                    <input type="radio" v-model="encryption" value="WEP" />
                    <span class="radio-dot"></span>
                    <span class="radio-label">WEP</span>
                  </label>
                  <label
                    class="radio-option"
                    :class="{ active: encryption === 'nopass' }"
                  >
                    <input type="radio" v-model="encryption" value="nopass" />
                    <span class="radio-dot"></span>
                    <span class="radio-label">None</span>
                  </label>
                </div>
              </div>

              <!-- Hidden Network -->
              <div class="form-group checkbox-group">
                <label class="checkbox-option">
                  <input type="checkbox" v-model="isHidden" />
                  <span class="checkbox-box">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span class="checkbox-label">Hidden Network</span>
                </label>
              </div>

              <!-- Generate Button -->
              <button
                type="submit"
                class="generate-btn"
                :disabled="!networkName"
              >
                <span class="btn-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path
                      d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01"
                    />
                  </svg>
                </span>
                <span>Generate QR Code</span>
              </button>
            </form>
          </div>

          <!-- QR Code Preview Card -->
          <div class="qr-card glass-card">
            <div class="card-header">
              <div class="header-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path
                    d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01"
                  />
                </svg>
              </div>
              <h2>Your QR Code</h2>
            </div>

            <div class="qr-preview-section">
              <!-- Empty State -->
              <div v-if="!qrGenerated" class="empty-state">
                <div class="empty-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </div>
                <p>Enter your WiFi details and generate a QR code</p>
              </div>

              <!-- QR Code Display -->
              <div v-else class="qr-display" ref="qrContainer">
                <div class="qr-wrapper" ref="printArea">
                  <div class="qr-frame">
                    <canvas ref="qrCanvas"></canvas>
                  </div>
                  <div class="network-info">
                    <div class="wifi-icon-display">
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
                    <h3>{{ networkName }}</h3>
                    <span class="encryption-badge">{{ encryption }}</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div v-if="qrGenerated" class="action-buttons">
                <button @click="downloadQR" class="action-btn download-btn">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download</span>
                </button>
                <button @click="printQR" class="action-btn print-btn">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path
                      d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                    />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                  <span>Print</span>
                </button>
                <button @click="copyToClipboard" class="action-btn copy-btn">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path
                      d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                    />
                  </svg>
                  <span>{{ copyText }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Instructions Section -->
        <section class="instructions-section glass-card">
          <h3>📱 How to Use</h3>
          <div class="steps-grid">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Enter Details</h4>
                <p>Fill in your WiFi network name and password</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Generate QR</h4>
                <p>Click the generate button to create your code</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Share It</h4>
                <p>Download, print, or display the QR code for guests</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>Connect</h4>
                <p>Guests scan with their phone camera to connect instantly</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <p>
          Made with ❤️ by <a href="/portfolio" class="footer-link">Hazman</a>
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import QRCode from "qrcode";

// Form Data
const networkName = ref("");
const password = ref("");
const encryption = ref("WPA");
const isHidden = ref(false);
const showPassword = ref(false);

// QR State
const qrGenerated = ref(false);
const qrCanvas = ref<HTMLCanvasElement | null>(null);
const printArea = ref<HTMLDivElement | null>(null);
const copyText = ref("Copy");

// Generate WiFi QR String
const generateWifiString = () => {
  const hidden = isHidden.value ? "H:true;" : "";
  const pass = encryption.value === "nopass" ? "" : `P:${password.value};`;
  return `WIFI:T:${encryption.value};S:${networkName.value};${pass}${hidden};`;
};

// Generate QR Code
const generateQR = async () => {
  if (!networkName.value) return;

  qrGenerated.value = true;
  await nextTick();

  if (qrCanvas.value) {
    const wifiString = generateWifiString();

    await QRCode.toCanvas(qrCanvas.value, wifiString, {
      width: 220,
      margin: 2,
      color: {
        dark: "#1a1a2e",
        light: "#ffffff",
      },
      errorCorrectionLevel: "H",
    });
  }
};

// Download QR Code as PNG
const downloadQR = () => {
  if (!qrCanvas.value) return;

  // Create a new canvas for the styled download
  const downloadCanvas = document.createElement("canvas");
  const ctx = downloadCanvas.getContext("2d");
  if (!ctx) return;

  const padding = 40;
  const qrSize = qrCanvas.value.width;
  const textHeight = 60;
  const totalWidth = qrSize + padding * 2;
  const totalHeight = qrSize + padding * 2 + textHeight;

  downloadCanvas.width = totalWidth;
  downloadCanvas.height = totalHeight;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, totalWidth, totalHeight);
  gradient.addColorStop(0, "#667eea");
  gradient.addColorStop(1, "#764ba2");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, totalWidth, totalHeight);

  // White rounded rectangle for QR
  ctx.fillStyle = "#ffffff";
  const cornerRadius = 20;
  const rectX = padding - 10;
  const rectY = padding - 10;
  const rectWidth = qrSize + 20;
  const rectHeight = qrSize + 20;

  ctx.beginPath();
  ctx.moveTo(rectX + cornerRadius, rectY);
  ctx.lineTo(rectX + rectWidth - cornerRadius, rectY);
  ctx.quadraticCurveTo(
    rectX + rectWidth,
    rectY,
    rectX + rectWidth,
    rectY + cornerRadius,
  );
  ctx.lineTo(rectX + rectWidth, rectY + rectHeight - cornerRadius);
  ctx.quadraticCurveTo(
    rectX + rectWidth,
    rectY + rectHeight,
    rectX + rectWidth - cornerRadius,
    rectY + rectHeight,
  );
  ctx.lineTo(rectX + cornerRadius, rectY + rectHeight);
  ctx.quadraticCurveTo(
    rectX,
    rectY + rectHeight,
    rectX,
    rectY + rectHeight - cornerRadius,
  );
  ctx.lineTo(rectX, rectY + cornerRadius);
  ctx.quadraticCurveTo(rectX, rectY, rectX + cornerRadius, rectY);
  ctx.closePath();
  ctx.fill();

  // Draw QR code
  ctx.drawImage(qrCanvas.value, padding, padding);

  // Network name
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`📶 ${networkName.value}`, totalWidth / 2, totalHeight - 25);

  // Download
  const link = document.createElement("a");
  link.download = `WiFi-${networkName.value}-QR.png`;
  link.href = downloadCanvas.toDataURL("image/png");
  link.click();
};

// Print QR Code - Full A4 Layout
const printQR = () => {
  if (!qrCanvas.value) return;

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const qrDataUrl = qrCanvas.value.toDataURL("image/png");
  const securityLabel =
    encryption.value === "WPA"
      ? "WPA/WPA2"
      : encryption.value === "WEP"
        ? "WEP"
        : "Open Network";

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>WiFi QR Code - ${networkName.value}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          @page {
            size: A4;
            margin: 0;
          }
          
          html, body {
            width: 210mm;
            height: 297mm;
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #ffffff;
          }
          
          .a4-page {
            width: 210mm;
            min-height: 297mm;
            padding: 0;
            display: flex;
            flex-direction: column;
          }
          
          /* Header Section */
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px;
            text-align: center;
            color: white;
          }
          
          .header-content {
            max-width: 500px;
            margin: 0 auto;
          }
          
          .wifi-icon-large {
            font-size: 60px;
            margin-bottom: 15px;
          }
          
          .header h1 {
            font-size: 42px;
            font-weight: 800;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          
          .header p {
            font-size: 18px;
            opacity: 0.9;
          }
          
          /* Main Content */
          .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 50px 40px;
            background: #fafbfc;
          }
          
          .qr-container {
            background: white;
            padding: 30px;
            border-radius: 24px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            margin-bottom: 40px;
          }
          
          .qr-image {
            width: 280px;
            height: 280px;
            display: block;
          }
          
          /* Network Details */
          .network-details {
            text-align: center;
            margin-bottom: 50px;
          }
          
          .network-name {
            font-size: 32px;
            font-weight: 700;
            color: #1a1a2e;
            margin-bottom: 12px;
          }
          
          .security-badge {
            display: inline-block;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 8px 24px;
            border-radius: 30px;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.5px;
          }
          
          /* Instructions */
          .instructions {
            background: white;
            border-radius: 20px;
            padding: 30px 40px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            max-width: 500px;
            width: 100%;
          }
          
          .instructions h3 {
            font-size: 18px;
            font-weight: 700;
            color: #1a1a2e;
            margin-bottom: 20px;
            text-align: center;
          }
          
          .steps {
            display: flex;
            justify-content: space-around;
            gap: 20px;
          }
          
          .step {
            text-align: center;
            flex: 1;
          }
          
          .step-number {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 700;
            margin: 0 auto 10px;
          }
          
          .step-text {
            font-size: 13px;
            color: #555;
            line-height: 1.4;
          }
          
          /* Footer */
          .footer {
            background: #1a1a2e;
            color: white;
            text-align: center;
            padding: 25px;
          }
          
          .footer p {
            font-size: 14px;
            opacity: 0.8;
          }
          
          .footer .brand {
            font-weight: 600;
            color: #a5b4fc;
          }
          
          /* Print Styles */
          @media print {
            html, body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            .a4-page {
              page-break-after: always;
            }
          }
        </style>
      </head>
      <body>
        <div class="a4-page">
          <!-- Header -->
          <div class="header">
            <div class="header-content">
              <div class="wifi-icon-large">📶</div>
              <h1>WiFi Access</h1>
              <p>Scan to connect instantly</p>
            </div>
          </div>
          
          <!-- Main Content -->
          <div class="main-content">
            <div class="qr-container">
              <img src="${qrDataUrl}" alt="WiFi QR Code" class="qr-image" />
            </div>
            
            <div class="network-details">
              <div class="network-name">${networkName.value}</div>
              <span class="security-badge">${securityLabel}</span>
            </div>
            
            <div class="instructions">
              <h3>How to Connect</h3>
              <div class="steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-text">Open your phone camera</div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-text">Point at the QR code</div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-text">Tap the notification to connect</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p>Generated with <span class="brand">WiFi QR Generator</span></p>
          </div>
        </div>
        
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
          window.onafterprint = function() {
            window.close();
          };
        <\/script>
      </body>
    </html>
  `);
  printWindow.document.close();
};

// Copy QR as image to clipboard
const copyToClipboard = async () => {
  if (!qrCanvas.value) return;

  try {
    const blob = await new Promise<Blob>((resolve) => {
      qrCanvas.value!.toBlob((blob) => {
        resolve(blob!);
      }, "image/png");
    });

    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);

    copyText.value = "Copied!";
    setTimeout(() => {
      copyText.value = "Copy";
    }, 2000);
  } catch (err) {
    // Fallback: copy WiFi string
    const wifiString = generateWifiString();
    await navigator.clipboard.writeText(wifiString);
    copyText.value = "Copied!";
    setTimeout(() => {
      copyText.value = "Copy";
    }, 2000);
  }
};
</script>

<style scoped>
/* Base Styles */
.wifi-qr-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b4e 100%);
  position: relative;
  overflow-x: hidden;
}

/* Background Effects */
.bg-effects {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.gradient-orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #667eea 0%, transparent 70%);
  top: -200px;
  left: -100px;
  animation: float 8s ease-in-out infinite;
}

.gradient-orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #764ba2 0%, transparent 70%);
  bottom: -150px;
  right: -100px;
  animation: float 10s ease-in-out infinite reverse;
}

.gradient-orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #f093fb 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 5s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(10deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.5;
  }
}

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Header */
.header {
  padding: 20px 0 40px;
  text-align: center;
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.logo-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.logo-icon svg {
  width: 32px;
  height: 32px;
  color: white;
}

.logo-text h1 {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(90deg, #fff, #c8d6e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.logo-text p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 4px 0 0;
}

/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

/* Card Grid */
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

@media (max-width: 900px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

/* Input Card */
.input-card,
.qr-card {
  padding: 30px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.header-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.3),
    rgba(118, 75, 162, 0.3)
  );
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-icon svg {
  width: 22px;
  height: 22px;
  color: #a5b4fc;
}

.card-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin: 0;
}

/* Form Styles */
.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 8px;
}

.label-icon {
  font-size: 16px;
}

.input-field {
  width: 100%;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: white;
  font-size: 15px;
  transition: all 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

/* Password Toggle */
.password-wrapper {
  position: relative;
}

.password-wrapper .input-field {
  padding-right: 50px;
}

.toggle-password {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password svg {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s;
}

.toggle-password:hover svg {
  color: rgba(255, 255, 255, 0.8);
}

/* Radio Group */
.radio-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.radio-option input {
  display: none;
}

.radio-dot {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
}

.radio-option.active .radio-dot {
  border-color: #667eea;
  background: #667eea;
}

.radio-option.active .radio-dot::after {
  content: "";
  position: absolute;
  inset: 4px;
  background: white;
  border-radius: 50%;
}

.radio-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.radio-option.active {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.5);
}

/* Checkbox */
.checkbox-group {
  margin-top: 4px;
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.checkbox-option input {
  display: none;
}

.checkbox-box {
  width: 22px;
  height: 22px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.checkbox-box svg {
  width: 14px;
  height: 14px;
  color: white;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.2s ease;
}

.checkbox-option input:checked + .checkbox-box {
  background: #667eea;
  border-color: #667eea;
}

.checkbox-option input:checked + .checkbox-box svg {
  opacity: 1;
  transform: scale(1);
}

.checkbox-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

/* Generate Button */
.generate-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 14px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
}

.generate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon svg {
  width: 22px;
  height: 22px;
}

/* QR Preview Section */
.qr-preview-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  opacity: 0.2;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
  color: white;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

/* QR Display */
.qr-display {
  width: 100%;
}

.qr-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.qr-frame {
  background: white;
  padding: 16px;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.network-info {
  text-align: center;
}

.wifi-icon-display {
  width: 50px;
  height: 50px;
  margin: 0 auto 10px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wifi-icon-display svg {
  width: 26px;
  height: 26px;
  color: white;
}

.network-info h3 {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0 0 8px;
}

.encryption-badge {
  display: inline-block;
  padding: 4px 14px;
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.4);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #a5b4fc;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.download-btn:hover {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.4);
}

.print-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.4);
}

.copy-btn:hover {
  background: rgba(168, 85, 247, 0.2);
  border-color: rgba(168, 85, 247, 0.4);
}

/* Instructions Section */
.instructions-section {
  padding: 30px;
}

.instructions-section h3 {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin: 0 0 24px;
  text-align: center;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 900px) {
  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
}

.step-number {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.step-content h4 {
  font-size: 15px;
  font-weight: 600;
  color: white;
  margin: 0 0 6px;
}

.step-content p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.5;
}

/* Footer */
.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 30px;
}

.footer p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.footer-link {
  color: #a5b4fc;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #667eea;
}

/* Responsive */
@media (max-width: 600px) {
  .content-wrapper {
    padding: 16px;
  }

  .logo-section {
    flex-direction: column;
    gap: 12px;
  }

  .logo-text {
    text-align: center;
  }

  .logo-text h1 {
    font-size: 22px;
  }

  .input-card,
  .qr-card {
    padding: 20px;
  }

  .radio-group {
    flex-direction: column;
  }

  .radio-option {
    justify-content: center;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
