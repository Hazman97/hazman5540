<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
  >
    <div
      class="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20"
    >
      <div class="text-center">
        <h2
          class="mt-2 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight"
        >
          Lokasi Kami
        </h2>
        <p class="mt-3 text-base text-gray-600 font-medium">
          Imbas QR atau klik pautan di bawah untuk navigasi mudah
        </p>
      </div>

      <div class="space-y-6">
        <!-- Google Maps Section -->
        <div
          class="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6"
        >
          <div
            class="absolute top-0 left-0 w-1 h-full bg-blue-500 transform origin-top group-hover:scale-y-110 transition-transform"
          ></div>
          <div class="flex flex-col items-center">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span class="bg-blue-100 text-blue-600 p-2 rounded-lg mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
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
              </span>
              Google Maps
            </h3>

            <div
              class="relative group/qr cursor-pointer mb-4"
              @click="openLink(googleLink)"
            >
              <div
                class="bg-white p-2 rounded-xl shadow-inner border border-gray-100"
              >
                <img
                  :src="getQrUrl(googleLink)"
                  alt="Google Maps QR"
                  class="w-48 h-48 rounded-lg"
                  crossorigin="anonymous"
                />
              </div>
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/qr:opacity-100 bg-black/10 backdrop-blur-[1px] transition-opacity rounded-xl"
              >
                <span
                  class="bg-white/90 text-gray-800 font-semibold px-4 py-2 rounded-full shadow-lg text-sm transform scale-90 group-hover/qr:scale-100 transition-transform"
                >
                  Buka Peta
                </span>
              </div>
            </div>

            <button
              @click.stop="downloadCustomQR(googleLink, 'Google Maps')"
              class="w-full flex items-center justify-center px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-200"
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Muat Turun QR
            </button>
          </div>
        </div>

        <!-- Waze Section -->
        <div
          class="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6"
        >
          <div
            class="absolute top-0 left-0 w-1 h-full bg-indigo-500 transform origin-top group-hover:scale-y-110 transition-transform"
          ></div>
          <div class="flex flex-col items-center">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span class="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </span>
              Waze
            </h3>

            <div
              class="relative group/qr cursor-pointer mb-4"
              @click="openLink(wazeLink)"
            >
              <div
                class="bg-white p-2 rounded-xl shadow-inner border border-gray-100"
              >
                <img
                  :src="getQrUrl(wazeLink)"
                  alt="Waze QR"
                  class="w-48 h-48 rounded-lg"
                  crossorigin="anonymous"
                />
              </div>
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/qr:opacity-100 bg-black/10 backdrop-blur-[1px] transition-opacity rounded-xl"
              >
                <span
                  class="bg-white/90 text-gray-800 font-semibold px-4 py-2 rounded-full shadow-lg text-sm transform scale-90 group-hover/qr:scale-100 transition-transform"
                >
                  Buka Waze
                </span>
              </div>
            </div>

            <button
              @click.stop="downloadCustomQR(wazeLink, 'Waze')"
              class="w-full flex items-center justify-center px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-200"
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Muat Turun QR
            </button>
          </div>
        </div>

        <!-- WhatsApp Section -->
        <div class="pt-6 border-t border-gray-200">
          <a
            :href="whatsappLink"
            target="_blank"
            class="group w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-3 animate-pulse"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"
              />
            </svg>
            Hubungi Melalui WhatsApp
          </a>
        </div>
      </div>

      <div class="text-center">
        <p class="text-xs text-gray-400">
          © 2025 Hazman5540. Hak Cipta Terpelihara.
        </p>
      </div>
    </div>
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

        // Draw border
        ctx.strokeStyle = "#e5e7eb"; // Light gray
        ctx.lineWidth = 20;
        ctx.strokeRect(0, 0, width, height);

        // Draw Title
        ctx.fillStyle = "#1f2937"; // Dark gray
        ctx.font = "bold 48px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(title, width / 2, 100);

        ctx.fillStyle = "#6b7280"; // Lighter gray
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

        // Draw Footer
        ctx.fillStyle = "#9ca3af";
        ctx.font = "20px sans-serif";
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
        });
      } catch (error) {
        console.error("Error generating custom QR:", error);
        alert("Gagal menjana imej QR. Sila cuba lagi.");
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Add custom animations if Tailwind utilities aren't enough */
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
