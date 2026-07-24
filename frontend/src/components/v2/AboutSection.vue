<template>
  <section id="about" class="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
    <!-- Asymmetric Organic Doodle & Circuit Decorations -->
    <DoodleDecorations type="chip-doodle" class="absolute top-12 left-[4%] hidden sm:block" />
    <DoodleDecorations type="antenna-wave" class="absolute bottom-12 right-[4%] hidden md:block" />

    <!-- Section Header -->
    <div class="text-center mb-16 relative z-10">
      <h2 class="text-3xl sm:text-5xl font-serif text-[#B5502F] dark:text-[#E8C976] tracking-wide mb-3">
        Software Engineer & <span class="italic text-[#2A2421] dark:text-[#F5F0E8]">IoT Practitioner</span>
      </h2>
      <p class="text-[#6E655F] dark:text-[#8A8A8A] text-sm sm:text-base font-sans max-w-2xl mx-auto">
        Bridging Computer Science (UMT) & Electrical & Electronics Engineering (PIS) backgrounds.
      </p>
      <WavyDivider />
    </div>

    <!-- Hybrid Bio Highlight Callout Box -->
    <div class="mb-12 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] shadow-xl relative z-10">
      <div class="flex items-start gap-4">
        <span class="text-3xl shrink-0">⚡</span>
        <div class="space-y-3 font-sans">
          <h3 class="text-xl font-serif font-bold text-[#B5502F] dark:text-[#E8C976]">
            The Hybrid Advantage: Computer Science + Electrical Engineering
          </h3>
          <p class="text-sm sm:text-base text-[#2A2421] dark:text-[#F5F0E8] leading-relaxed font-normal">
            Software & IoT Engineer with a rare hybrid background: <span class="font-semibold text-[#B5502F] dark:text-[#E8C976]">CS Degree (UMT, Dean's List) + E&E Engineering Diploma (PIS)</span>. Specialized in building mission-critical full-stack applications that interface directly with field hardware, telemetry protocols, and edge networks.
          </p>
        </div>
      </div>
    </div>

    <!-- 4-Column Technical Matrix with Explicit Protocols & Database Paradigms -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
      <!-- Col 1: Frontend & UI -->
      <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-lg hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-colors">
        <div class="w-10 h-10 rounded-xl bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] flex items-center justify-center font-bold mb-4 text-lg">
          💻
        </div>
        <h3 class="font-serif font-bold text-lg text-[#2A2421] dark:text-[#F5F0E8] mb-3">
          Frontend & UI
        </h3>
        <ul class="text-xs sm:text-sm font-sans text-[#6E655F] dark:text-[#8A8A8A] space-y-2">
          <li>• Vue 3 (Composition API / Script Setup)</li>
          <li>• React.js & Nuxt.js</li>
          <li>• Vite & TypeScript</li>
          <li>• Tailwind CSS & Design Tokens</li>
          <li>• Responsive UI & Accessibility (WCAG AA)</li>
        </ul>
      </div>

      <!-- Col 2: Backend & Microservices -->
      <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-lg hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-colors">
        <div class="w-10 h-10 rounded-xl bg-[#27C93F]/10 text-[#27C93F] flex items-center justify-center font-bold mb-4 text-lg">
          ⚙️
        </div>
        <h3 class="font-serif font-bold text-lg text-[#2A2421] dark:text-[#F5F0E8] mb-3">
          Backend & Microservices
        </h3>
        <ul class="text-xs sm:text-sm font-sans text-[#6E655F] dark:text-[#8A8A8A] space-y-2">
          <li>• Node.js & Express.js TCP Servers</li>
          <li>• Hono v4 (Cloudflare Edge Workers)</li>
          <li>• RESTful API Design & Open API Specs</li>
          <li>• Embedded C++ MCU Target Control</li>
          <li>• Node Worker Pools & High Throughput</li>
        </ul>
      </div>

      <!-- Col 3: Hardware & Telemetry Protocols -->
      <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-lg hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-colors">
        <div class="w-10 h-10 rounded-xl bg-[#64FFDA]/10 text-[#64FFDA] flex items-center justify-center font-bold mb-4 text-lg">
          📡
        </div>
        <h3 class="font-serif font-bold text-lg text-[#2A2421] dark:text-[#F5F0E8] mb-3">
          IoT & Protocols
        </h3>
        <ul class="text-xs sm:text-sm font-sans text-[#6E655F] dark:text-[#8A8A8A] space-y-2">
          <li>• <strong class="text-[#2A2421] dark:text-[#F5F0E8]">TCP/IP Raw Sockets</strong></li>
          <li>• <strong class="text-[#2A2421] dark:text-[#F5F0E8]">WebSockets & MQTT</strong></li>
          <li>• ESP32 WROOM-32 & Piezo Sensors</li>
          <li>• Teltonika FMC920 Telemetry</li>
          <li>• Rajant Kinetic Mesh & Starlink</li>
        </ul>
      </div>

      <!-- Col 4: Database & Cloud Paradigms -->
      <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-lg hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-colors">
        <div class="w-10 h-10 rounded-xl bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] flex items-center justify-center font-bold mb-4 text-lg">
          🗄️
        </div>
        <h3 class="font-serif font-bold text-lg text-[#2A2421] dark:text-[#F5F0E8] mb-3">
          Databases & Cloud
        </h3>
        <ul class="text-xs sm:text-sm font-sans text-[#6E655F] dark:text-[#8A8A8A] space-y-2">
          <li>• <strong class="text-[#2A2421] dark:text-[#F5F0E8]">Relational</strong>: PostgreSQL, Cloudflare D1</li>
          <li>• <strong class="text-[#2A2421] dark:text-[#F5F0E8]">BaaS/Doc</strong>: Supabase, Firebase</li>
          <li>• Cloudflare R2 Media Storage</li>
          <li>• Cloudflare Pages & Vercel Edge</li>
          <li>• Git & GitHub Actions CI/CD</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import WavyDivider from './WavyDivider.vue';
import DoodleDecorations from './DoodleDecorations.vue';
</script>
