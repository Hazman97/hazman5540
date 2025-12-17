<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans"
  >
    <div class="max-w-xl w-full space-y-8">
      <!-- Header -->
      <div class="text-center space-y-3">
        <div
          class="inline-flex items-center px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium uppercase tracking-wide"
        >
          Alat Penukar
        </div>
        <h1
          class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
        >
          Link <span class="text-teal-400">Converter</span>
        </h1>
        <p class="text-base text-slate-400 max-w-md mx-auto">
          Tukar pautan navigasi Google Maps ke Waze atau sebaliknya dengan
          mudah.
        </p>
      </div>

      <!-- Converter Card -->
      <div
        class="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden"
      >
        <!-- Mode Toggle -->
        <div class="p-4 border-b border-slate-700/50">
          <div class="flex rounded-xl bg-slate-900/50 p-1">
            <button
              @click="mode = 'g2w'"
              :class="[
                'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300',
                mode === 'g2w'
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                  : 'text-slate-400 hover:text-white',
              ]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              → Waze
            </button>
            <button
              @click="mode = 'w2g'"
              :class="[
                'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300',
                mode === 'w2g'
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                  : 'text-slate-400 hover:text-white',
              ]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              → Google
            </button>
          </div>
        </div>

        <!-- Input Section -->
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              {{ mode === "g2w" ? "Pautan Google Maps" : "Pautan Waze" }}
            </label>
            <div class="relative">
              <input
                v-model="inputLink"
                type="text"
                :placeholder="
                  mode === 'g2w'
                    ? 'Tampal pautan Google Maps di sini...'
                    : 'Tampal pautan Waze di sini...'
                "
                class="w-full px-4 py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
              />
              <button
                v-if="inputLink"
                @click="inputLink = ''"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Convert Button -->
          <button
            @click="convert"
            :disabled="!inputLink"
            class="w-full inline-flex justify-center items-center px-6 py-4 rounded-xl border border-transparent bg-gradient-to-r from-teal-500 to-teal-600 text-base font-bold text-white hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 shadow-lg shadow-teal-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            Tukar Pautan
          </button>
        </div>

        <!-- Output Section -->
        <transition name="slide-up">
          <div v-if="outputLink" class="p-6 pt-0 space-y-4">
            <div
              class="h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent"
            ></div>

            <div>
              <label class="block text-sm font-medium text-teal-400 mb-2">
                {{ mode === "g2w" ? "Pautan Waze" : "Pautan Google Maps" }}
              </label>
              <div class="relative">
                <input
                  :value="outputLink"
                  readonly
                  class="w-full px-4 py-4 pr-24 bg-teal-500/10 border border-teal-500/30 rounded-xl text-teal-300 focus:outline-none"
                />
                <button
                  @click="copyOutput"
                  class="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center px-3 py-2 rounded-lg bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  Salin
                </button>
              </div>
            </div>

            <!-- Open Button -->
            <button
              @click="openLink(outputLink)"
              class="w-full inline-flex justify-center items-center px-6 py-3 rounded-xl border border-slate-600/50 bg-slate-700/50 text-sm font-semibold text-white hover:bg-slate-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Buka di {{ mode === "g2w" ? "Waze" : "Google Maps" }}
            </button>
          </div>
        </transition>
      </div>

      <!-- OR Divider -->
      <div class="flex items-center gap-4">
        <div class="flex-1 h-px bg-slate-700"></div>
        <span class="text-slate-500 text-sm font-medium">atau</span>
        <div class="flex-1 h-px bg-slate-700"></div>
      </div>

      <!-- Enter Coordinates Card -->
      <div
        class="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-6 space-y-4"
      >
        <h3 class="text-lg font-bold text-white">Masukkan Koordinat</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1"
              >Latitude</label
            >
            <input
              v-model="lat"
              type="text"
              placeholder="e.g. 3.1390"
              class="w-full px-3 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-sm"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1"
              >Longitude</label
            >
            <input
              v-model="lng"
              type="text"
              placeholder="e.g. 101.6869"
              class="w-full px-3 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-sm"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button
            @click="openGoogleMaps"
            :disabled="!lat || !lng"
            class="inline-flex justify-center items-center px-4 py-3 rounded-xl border border-slate-600/50 bg-slate-700/50 text-sm font-medium text-white hover:bg-slate-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2 text-teal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Google Maps
          </button>
          <button
            @click="openWaze"
            :disabled="!lat || !lng"
            class="inline-flex justify-center items-center px-4 py-3 rounded-xl border border-slate-600/50 bg-slate-700/50 text-sm font-medium text-white hover:bg-slate-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2 text-teal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Waze
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center">
        <p class="text-xs font-medium text-slate-500">
          © 2025 Hazman5540. Hak Cipta Terpelihara.
        </p>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition name="toast">
      <div
        v-if="toast.show"
        class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-4 py-3 rounded-xl shadow-lg border border-slate-700 bg-slate-800 text-white"
      >
        <span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-teal-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
        <span class="text-sm font-medium">{{ toast.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ConverterView",
  data() {
    return {
      mode: "g2w", // g2w = Google to Waze, w2g = Waze to Google
      inputLink: "",
      outputLink: "",
      lat: "",
      lng: "",
      toast: {
        show: false,
        message: "",
      },
    };
  },
  methods: {
    convert() {
      try {
        const coords = this.extractCoordinates(this.inputLink);
        if (!coords) {
          this.showToast("Pautan tidak sah. Sila masukkan pautan yang betul.");
          return;
        }

        if (this.mode === "g2w") {
          this.outputLink = `https://waze.com/ul?ll=${coords.lat},${coords.lng}&navigate=yes`;
        } else {
          this.outputLink = `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}&travelmode=driving`;
        }

        this.lat = coords.lat;
        this.lng = coords.lng;
      } catch (error) {
        console.error("Error converting link:", error);
        this.showToast("Gagal menukar pautan. Sila cuba lagi.");
      }
    },
    extractCoordinates(link) {
      // Try to extract coordinates from various URL formats
      // Google Maps: /maps/@lat,lng or destination=lat,lng or @lat,lng,zoom
      // Waze: ll=lat,lng

      let match;

      // Google Maps: @lat,lng
      match = link.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
      if (match) return { lat: match[1], lng: match[2] };

      // Google Maps: destination=lat,lng
      match = link.match(/destination=(-?\d+\.?\d*),(-?\d+\.?\d*)/);
      if (match) return { lat: match[1], lng: match[2] };

      // Google Maps: query=lat,lng
      match = link.match(/query=(-?\d+\.?\d*),(-?\d+\.?\d*)/);
      if (match) return { lat: match[1], lng: match[2] };

      // Waze: ll=lat,lng
      match = link.match(/ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/);
      if (match) return { lat: match[1], lng: match[2] };

      // Generic: lat,lng anywhere in URL
      match = link.match(/(-?\d+\.\d{4,}),(-?\d+\.\d{4,})/);
      if (match) return { lat: match[1], lng: match[2] };

      return null;
    },
    async copyOutput() {
      try {
        await navigator.clipboard.writeText(this.outputLink);
        this.showToast("Pautan berjaya disalin!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    },
    openLink(url) {
      window.open(url, "_blank");
    },
    openGoogleMaps() {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${this.lat},${this.lng}&travelmode=driving`;
      window.open(url, "_blank");
    },
    openWaze() {
      const url = `https://waze.com/ul?ll=${this.lat},${this.lng}&navigate=yes`;
      window.open(url, "_blank");
    },
    showToast(message) {
      this.toast.show = true;
      this.toast.message = message;
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
