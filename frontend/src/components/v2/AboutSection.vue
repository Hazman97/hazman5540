<template>
  <section id="about" class="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
    <!-- Asymmetric Organic Doodle & Circuit Decorations -->
    <DoodleDecorations type="chip-doodle" class="absolute top-12 left-[4%] hidden sm:block" />
    <DoodleDecorations type="antenna-wave" class="absolute bottom-12 right-[4%] hidden md:block" />

    <!-- Section Header -->
    <div class="text-center mb-16 relative z-10">
      <h2 class="text-3xl sm:text-5xl font-serif text-[#B5502F] dark:text-[#E8C976] tracking-wide mb-3">
        Software Engineer & <span class="italic text-[#2A2421] dark:text-[#F5F0E8]">IoT Practitioner</span>
      </h2>
      <p class="text-[#524A45] dark:text-[#9E9E9E] text-sm sm:text-base font-sans max-w-2xl mx-auto">
        Bridging Computer Science (UMT) & Electrical & Electronics Engineering (PIS) backgrounds.
      </p>
      <WavyDivider />
    </div>

    <!-- Hybrid Bio Highlight Callout Box -->
    <div class="mb-10 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] shadow-md hover:shadow-xl transition-shadow relative z-10">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#E6E0D4] dark:border-[#2A2A2A]">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-[#B5502F]/10 dark:bg-[#E8C976]/10 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#B5502F] dark:text-[#E8C976]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-serif font-bold text-[#B5502F] dark:text-[#E8C976]">
            The Hybrid Advantage: Computer Science + Electrical Engineering
          </h3>
        </div>

        <!-- Competency View Filter Pills -->
        <div class="flex items-center gap-1.5 bg-[#FAF7F2] dark:bg-[#141414] p-1 rounded-full border border-[#E6E0D4] dark:border-[#2A2A2A] shrink-0">
          <button 
            @click="activeDomainTab = 'all'" 
            class="px-3 py-1 text-xs font-mono rounded-full transition-all cursor-pointer focus-ring"
            :class="activeDomainTab === 'all' ? 'bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] font-semibold' : 'text-[#524A45] dark:text-[#9E9E9E] hover:text-[#2A2421] dark:hover:text-[#F5F0E8]'"
          >
            All Domains
          </button>
          <button 
            @click="activeDomainTab = 'cs'" 
            class="px-3 py-1 text-xs font-mono rounded-full transition-all cursor-pointer focus-ring"
            :class="activeDomainTab === 'cs' ? 'bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] font-semibold' : 'text-[#524A45] dark:text-[#9E9E9E] hover:text-[#2A2421] dark:hover:text-[#F5F0E8]'"
          >
            CS & Software
          </button>
          <button 
            @click="activeDomainTab = 'ee'" 
            class="px-3 py-1 text-xs font-mono rounded-full transition-all cursor-pointer focus-ring"
            :class="activeDomainTab === 'ee' ? 'bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] font-semibold' : 'text-[#524A45] dark:text-[#9E9E9E] hover:text-[#2A2421] dark:hover:text-[#F5F0E8]'"
          >
            E&E & Hardware
          </button>
        </div>
      </div>

      <div class="text-sm sm:text-base text-[#2A2421] dark:text-[#F5F0E8] leading-relaxed font-normal space-y-2">
        <p>
          Software & IoT engineer with a <span class="font-semibold text-[#B5502F] dark:text-[#E8C976]">Computer Science B.Sc. (UMT, Dean's List)</span> with an <span class="font-semibold text-[#B5502F] dark:text-[#E8C976]">Electrical & Electronics Engineering Diploma (PIS)</span>.
        </p>
        <p class="text-[#524A45] dark:text-[#9E9E9E]">
          I build full-stack systems that talk to physical hardware: sensors, GPS trackers, robots and the networks between them.
        </p>
      </div>
    </div>

    <!-- 4-Column Technical Matrix with Explicit Protocols & Database Paradigms -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 print:grid-cols-2 gap-6 print:gap-4 relative z-10">
      <!-- Col 1: Frontend & UI -->
      <div 
        class="bg-white dark:bg-[#1A1A1A] border p-6 rounded-2xl transition-all duration-300"
        :class="[
          activeDomainTab === 'all' || activeDomainTab === 'cs' ? 'border-[#B5502F]/50 dark:border-[#E8C976]/50 shadow-lg scale-100 opacity-100' : 'border-[#E6E0D4] dark:border-[#2A2A2A] opacity-50 scale-95'
        ]"
      >
        <div class="w-10 h-10 rounded-xl bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] flex items-center justify-center mb-4">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="font-serif font-bold text-lg text-[#2A2421] dark:text-[#F5F0E8] mb-3">
          Frontend & UI
        </h3>
        <ul class="text-xs sm:text-sm font-sans text-[#524A45] dark:text-[#9E9E9E] space-y-2">
          <li>• Vue 3 & React.js</li>
          <li>• Vite, TypeScript & Tailwind</li>
          <li>• Responsive UI & WCAG AA</li>
        </ul>
      </div>

      <!-- Col 2: Backend & Microservices -->
      <div 
        class="bg-white dark:bg-[#1A1A1A] border p-6 rounded-2xl transition-all duration-300"
        :class="[
          activeDomainTab === 'all' || activeDomainTab === 'cs' ? 'border-[#27C93F]/50 shadow-lg scale-100 opacity-100' : 'border-[#E6E0D4] dark:border-[#2A2A2A] opacity-50 scale-95'
        ]"
      >
        <div class="w-10 h-10 rounded-xl bg-[#27C93F]/10 text-[#27C93F] flex items-center justify-center mb-4">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
          </svg>
        </div>
        <h3 class="font-serif font-bold text-lg text-[#2A2421] dark:text-[#F5F0E8] mb-3">
          Backend & Microservices
        </h3>
        <ul class="text-xs sm:text-sm font-sans text-[#524A45] dark:text-[#9E9E9E] space-y-2">
          <li>• Node.js & Express.js TCP Servers</li>
          <li>• Hono v4 (Cloudflare Edge)</li>
          <li>• REST APIs & Embedded C++ MCU</li>
        </ul>
      </div>

      <!-- Col 3: Hardware & Telemetry Protocols -->
      <div 
        class="bg-white dark:bg-[#1A1A1A] border p-6 rounded-2xl transition-all duration-300"
        :class="[
          activeDomainTab === 'all' || activeDomainTab === 'ee' ? 'border-[#64FFDA]/50 shadow-lg scale-100 opacity-100' : 'border-[#E6E0D4] dark:border-[#2A2A2A] opacity-50 scale-95'
        ]"
      >
        <div class="w-10 h-10 rounded-xl bg-[#64FFDA]/10 text-[#64FFDA] flex items-center justify-center mb-4">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M1.05 6.879a16 16 0 0121.9 0" />
          </svg>
        </div>
        <h3 class="font-serif font-bold text-lg text-[#2A2421] dark:text-[#F5F0E8] mb-3">
          IoT & Protocols
        </h3>
        <ul class="text-xs sm:text-sm font-sans text-[#524A45] dark:text-[#9E9E9E] space-y-2">
          <li>• <strong class="text-[#2A2421] dark:text-[#F5F0E8]">TCP Sockets & WebSockets</strong></li>
          <li>• ESP32 C++ & Teltonika Telemetry</li>
          <li>• Rajant Kinetic Mesh & Starlink</li>
        </ul>
      </div>

      <!-- Col 4: Database & Cloud Paradigms -->
      <div 
        class="bg-white dark:bg-[#1A1A1A] border p-6 rounded-2xl transition-all duration-300"
        :class="[
          activeDomainTab === 'all' || activeDomainTab === 'cs' ? 'border-[#B5502F]/50 dark:border-[#E8C976]/50 shadow-lg scale-100 opacity-100' : 'border-[#E6E0D4] dark:border-[#2A2A2A] opacity-50 scale-95'
        ]"
      >
        <div class="w-10 h-10 rounded-xl bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] flex items-center justify-center mb-4">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
        <h3 class="font-serif font-bold text-lg text-[#2A2421] dark:text-[#F5F0E8] mb-3">
          Databases & Cloud
        </h3>
        <ul class="text-xs sm:text-sm font-sans text-[#524A45] dark:text-[#9E9E9E] space-y-2">
          <li>• PostgreSQL & Cloudflare D1</li>
          <li>• Supabase & Firebase BaaS</li>
          <li>• Cloudflare R2 & Vercel Edge</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WavyDivider from './WavyDivider.vue';
import DoodleDecorations from './DoodleDecorations.vue';

const activeDomainTab = ref<'all' | 'cs' | 'ee'>('all');
</script>
