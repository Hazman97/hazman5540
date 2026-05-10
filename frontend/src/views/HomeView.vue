<template>
  <div
    class="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans text-slate-900"
  >
    <div class="max-w-lg w-full space-y-8">
      <!-- Header Section -->
      <div class="text-center space-y-2">
        <div
          class="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-medium uppercase tracking-wide"
        >
          Navigasi
        </div>
        <h2
          class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
        >
          Lokasi Kami
        </h2>
        <p class="text-lg text-slate-500 max-w-sm mx-auto">
          Imbas QR atau pilih aplikasi navigasi pilihan anda di bawah.
        </p>
      </div>

      <!-- Cards Container (Bento Box Grid) -->
      <div class="grid grid-cols-1 gap-6">
        <!-- Google Maps Card -->
        <div
          class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-4">
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900">Google Maps</h3>
                  <p class="text-sm text-slate-500">Qr google maps</p>
                </div>
              </div>
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700"
              >
                Disyorkan
              </span>
            </div>

            <div class="flex flex-col sm:flex-row items-center gap-6">
              <!-- QR Code Area -->
              <div
                class="relative group cursor-pointer shrink-0"
                @click="openLink(googleLink)"
              >
                <div
                  class="p-2 bg-white rounded-xl border border-slate-200 shadow-sm"
                >
                  <img
                    :src="getQrUrl(googleLink)"
                    alt="Google Maps QR"
                    class="w-32 h-32 rounded-lg"
                    crossorigin="anonymous"
                  />
                </div>
                <div
                  class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-900/10 backdrop-blur-[1px] transition-opacity rounded-xl"
                >
                  <span
                    class="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                    >Buka</span
                  >
                </div>
              </div>

              <!-- Actions Area -->
              <div class="flex flex-col gap-3 w-full">
                <button
                  @click.stop="openLink(googleLink)"
                  class="w-full inline-flex justify-center items-center px-4 py-2.5 rounded-xl border border-transparent bg-teal-600 text-sm font-semibold text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-sm shadow-teal-600/20 transition-all"
                >
                  Buka App
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 ml-2"
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
                </button>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    @click.stop="downloadCustomQR(googleLink, 'Google Maps')"
                    class="inline-flex justify-center items-center px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    QR
                  </button>
                  <button
                    @click.stop="copyLink(googleLink)"
                    class="inline-flex justify-center items-center px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 text-slate-400"
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
            </div>
          </div>
        </div>

        <!-- Waze Card -->
        <div
          class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-4">
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900">Waze</h3>
                  <p class="text-sm text-slate-500">Qr waze</p>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row items-center gap-6">
              <!-- QR Code Area -->
              <div
                class="relative group cursor-pointer shrink-0"
                @click="openLink(wazeLink)"
              >
                <div
                  class="p-2 bg-white rounded-xl border border-slate-200 shadow-sm"
                >
                  <img
                    :src="getQrUrl(wazeLink)"
                    alt="Waze QR"
                    class="w-32 h-32 rounded-lg"
                    crossorigin="anonymous"
                  />
                </div>
                <div
                  class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-900/10 backdrop-blur-[1px] transition-opacity rounded-xl"
                >
                  <span
                    class="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                    >Buka</span
                  >
                </div>
              </div>

              <!-- Actions Area -->
              <div class="flex flex-col gap-3 w-full">
                <button
                  @click.stop="openLink(wazeLink)"
                  class="w-full inline-flex justify-center items-center px-4 py-2.5 rounded-xl border border-transparent bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 shadow-sm transition-all"
                >
                  Buka App
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 ml-2"
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
                </button>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    @click.stop="downloadCustomQR(wazeLink, 'Waze')"
                    class="inline-flex justify-center items-center px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    QR
                  </button>
                  <button
                    @click.stop="copyLink(wazeLink)"
                    class="inline-flex justify-center items-center px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 text-slate-400"
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
            </div>
          </div>
        </div>
      </div>

      <!-- WhatsApp Card -->
      <div
        class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center hover:shadow-md transition-shadow"
      >
        <h3 class="text-lg font-bold text-slate-900 mb-2">
          Ada sebarang pertanyaan?
        </h3>
        <p class="text-slate-500 mb-6 text-sm">
          Hubungi kami terus melalui WhatsApp untuk maklumat lanjut.
        </p>
        <a
          :href="whatsappLink"
          target="_blank"
          class="group w-full inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-600/20 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Hubungi Melalui WhatsApp
        </a>
      </div>

      <div class="text-center pt-8 border-t border-slate-200">
        <p class="text-xs font-medium text-slate-400">
          © 2025 Hazman5540. Hak Cipta Terpelihara.
        </p>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition name="toast">
      <div
        v-if="toast.show"
        class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-4 py-3 rounded-xl shadow-lg border border-slate-200"
        :class="
          toast.type === 'error'
            ? 'bg-red-50 text-red-800'
            : 'bg-slate-900 text-white'
        "
      >
        <span class="mr-2">
          <svg
            v-if="toast.type === 'success'"
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
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
  name: "HomeView",
  data() {
    return {
      lat: "6.1621138054616384",
      lng: "102.19023953550192",
      whatsappNumber: "+60189036494",
      toast: {
        show: false,
        message: "",
        type: "success",
      },
    };
  },
  computed: {
    googleLink() {
      return `https://www.google.com/maps/dir/?api=1&destination=${this.lat},${this.lng}&travelmode=driving`;
    },
    wazeLink() {
      return `https://waze.com/ul?ll=${this.lat},${this.lng}&navigate=yes`;
    },
    whatsappLink() {
      return `https://wa.me/${this.whatsappNumber}`;
    },
  },
  methods: {
    getQrUrl(data) {
      return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
        data
      )}&margin=10`;
    },
    openLink(url) {
      window.open(url, "_blank");
    },
    async copyLink(url) {
      try {
        await navigator.clipboard.writeText(url);
        this.showToastMessage("Pautan berjaya disalin!", "success");
      } catch (err) {
        console.error("Failed to copy: ", err);
        this.showToastMessage("Gagal menyalin pautan.", "error");
      }
    },
    showToastMessage(message, type = "success") {
      this.toast.show = true;
      this.toast.message = message;
      this.toast.type = type;

      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },
    async downloadCustomQR(dataLink, title) {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const width = 600;
        const height = 750; // Extra space for text
        canvas.width = width;
        canvas.height = height;

        // Draw white background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        // Draw border (Slate-200 equivalent)
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 20;
        ctx.strokeRect(0, 0, width, height);

        // Draw Title (Slate-900)
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 48px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(title, width / 2, 100);

        // Draw Subtitle (Slate-500)
        ctx.fillStyle = "#64748b";
        ctx.font = "24px sans-serif";
        ctx.fillText("Imbas untuk Lokasi", width / 2, 150);

        // Load QR Image
        const qrUrl = this.getQrUrl(dataLink);
        // We need to fetch the blob to avoid cross-origin issues when drawing to canvas
        const response = await fetch(qrUrl);
        const blob = await response.blob();
        const imgBitmap = await createImageBitmap(blob);

        // Draw QR Image Centered
        const qrSize = 400;
        const x = (width - qrSize) / 2;
        const y = 200;
        ctx.drawImage(imgBitmap, x, y, qrSize, qrSize);

        // Draw Footer (Teal-600)
        ctx.fillStyle = "#0d9488"; // teal-600
        ctx.font = "bold 20px sans-serif";
        ctx.fillText("", width / 2, height - 50);

        // Trigger Download
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = `${title.toLowerCase().replace(/\s+/g, "-")}-qr.png`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          this.showToastMessage(`QR ${title} berjaya dimuat turun!`, "success");
        });
      } catch (error) {
        console.error("Error generating custom QR:", error);
        this.showToastMessage(
          "Gagal menjana imej QR. Sila cuba lagi.",
          "error"
        );
      }
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
</style>
