<template>
  <section id="hardware" class="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
    <!-- Asymmetric Organic Doodles -->
    <DoodleDecorations type="chip-doodle" class="absolute top-10 right-[5%] hidden sm:block opacity-60" />

    <!-- Section Header -->
    <div class="text-center mb-16 relative z-10">
      <h2 class="text-3xl sm:text-5xl font-serif text-[#B5502F] dark:text-[#E8C976] tracking-wide mb-3">
        Engineering Workbench & Field Gear
      </h2>
      <p class="text-[#6E655F] dark:text-[#8A8A8A] text-sm sm:text-base font-sans max-w-2xl mx-auto">
        Hardware targets, vehicle telemetry units, field mesh networking gear, and software workstation.
      </p>
      <WavyDivider />
    </div>

    <!-- 4 Hardware Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
      <!-- Card 1: ESP32 Target System -->
      <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="px-3 py-1 text-xs font-mono font-semibold bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] rounded-full border border-[#B5502F]/30 dark:border-[#E8C976]/30">
              Microcontroller / Target
            </span>
            <span class="text-2xl">🛠️</span>
          </div>

          <h3 class="text-xl font-serif font-bold text-[#2A2421] dark:text-[#F5F0E8] mb-2 group-hover:text-[#B5502F] dark:group-hover:text-[#E8C976] transition-colors">
            ESP32 Shooting Range Targets
          </h3>

          <p class="text-xs sm:text-sm text-[#6E655F] dark:text-[#8A8A8A] font-sans leading-relaxed mb-4">
            Custom C++ firmware running on ESP32 microcontrollers. Relays real-time hit sensor triggers to HTML web interfaces over low-latency socket connections.
          </p>
        </div>

        <div class="pt-4 border-t border-[#E6E0D4] dark:border-[#2A2A2A] flex flex-wrap gap-2 text-[11px] font-mono text-[#2A2421]/90 dark:text-[#F5F0E8]/90">
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">ESP32 WROOM-32</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Embedded C++</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Piezo Sensor</span>
        </div>
      </div>

      <!-- Card 2: Teltonika FMC920 GPS Tracker -->
      <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="px-3 py-1 text-xs font-mono font-semibold bg-[#27C93F]/10 text-[#27C93F] rounded-full border border-[#27C93F]/30">
              Vehicle Telemetry Unit
            </span>
            <span class="text-2xl">🚗</span>
          </div>

          <h3 class="text-xl font-serif font-bold text-[#2A2421] dark:text-[#F5F0E8] mb-2 group-hover:text-[#B5502F] dark:group-hover:text-[#E8C976] transition-colors">
            Teltonika FMC920 Telemetry
          </h3>

          <p class="text-xs sm:text-sm text-[#6E655F] dark:text-[#8A8A8A] font-sans leading-relaxed mb-4">
            Industrial vehicle tracking terminal with 4G LTE fallback. Integrated into Node.js TCP ingestion backend with high-frequency PostgreSQL spatial storage.
          </p>
        </div>

        <div class="pt-4 border-t border-[#E6E0D4] dark:border-[#2A2A2A] flex flex-wrap gap-2 text-[11px] font-mono text-[#2A2421]/90 dark:text-[#F5F0E8]/90">
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Teltonika FMC920</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Node.js TCP Server</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">PostgreSQL</span>
        </div>
      </div>

      <!-- Card 3: Rajant Mesh & Starlink -->
      <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="px-3 py-1 text-xs font-mono font-semibold bg-[#64FFDA]/10 text-[#64FFDA] rounded-full border border-[#64FFDA]/30">
              Field Networking
            </span>
            <span class="text-2xl">📡</span>
          </div>

          <h3 class="text-xl font-serif font-bold text-[#2A2421] dark:text-[#F5F0E8] mb-2 group-hover:text-[#B5502F] dark:group-hover:text-[#E8C976] transition-colors">
            Rajant Mesh & Starlink Uplink
          </h3>

          <p class="text-xs sm:text-sm text-[#6E655F] dark:text-[#8A8A8A] font-sans leading-relaxed mb-4">
            Deploys MP2P wireless bridges, Rajant Kinetic Mesh BreadCrumb nodes, and Starlink satellite backhaul for uninterrupted remote field communications.
          </p>
        </div>

        <div class="pt-4 border-t border-[#E6E0D4] dark:border-[#2A2A2A] flex flex-wrap gap-2 text-[11px] font-mono text-[#2A2421]/90 dark:text-[#F5F0E8]/90">
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Rajant BreadCrumb</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Starlink Mobile</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">MP2P Wireless</span>
        </div>
      </div>

      <!-- Card 4: Software Workstation -->
      <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="px-3 py-1 text-xs font-mono font-semibold bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] rounded-full border border-[#B5502F]/30 dark:border-[#E8C976]/30">
              Full-Stack & Cloud Workstation
            </span>
            <span class="text-2xl">💻</span>
          </div>

          <h3 class="text-xl font-serif font-bold text-[#2A2421] dark:text-[#F5F0E8] mb-2 group-hover:text-[#B5502F] dark:group-hover:text-[#E8C976] transition-colors">
            Vue 3 & Cloudflare Edge Stack
          </h3>

          <p class="text-xs sm:text-sm text-[#6E655F] dark:text-[#8A8A8A] font-sans leading-relaxed mb-4">
            Modern Jamstack environment with Vue 3, Vite, Tailwind CSS, TypeScript, and Hono v4 backend APIs running serverless on Cloudflare Workers + D1 SQLite.
          </p>
        </div>

        <div class="pt-4 border-t border-[#E6E0D4] dark:border-[#2A2A2A] flex flex-wrap gap-2 text-[11px] font-mono text-[#2A2421]/90 dark:text-[#F5F0E8]/90">
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Vue 3 SPA</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Cloudflare D1</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Hono v4 Framework</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import WavyDivider from './WavyDivider.vue';
import DoodleDecorations from './DoodleDecorations.vue';
</script>
