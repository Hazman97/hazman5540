<template>
  <section id="story" class="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
    <!-- Asymmetric Organic Doodle & IoT Line-Art Decorations -->
    <DoodleDecorations type="chip-doodle" class="absolute top-24 right-[8%] sm:right-[14%] hidden sm:block" />
    <DoodleDecorations type="antenna-wave" class="absolute bottom-24 left-[5%] sm:left-[8%]" />
    <DoodleDecorations type="circuit-node" class="absolute top-1/2 right-[5%] hidden md:block" />
    <DoodleDecorations type="coffee-doodle" class="absolute bottom-16 right-[12%] hidden lg:block" />

    <div class="max-w-4xl mx-auto text-center relative z-10">
      <!-- Live IoT Telemetry Status Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1A] dark:bg-[#1A1A1A] bg-white border border-[#2A2A2A] dark:border-[#2A2A2A] border-[#E6E0D4] text-[#E8C976] dark:text-[#E8C976] text-[#B5502F] text-xs sm:text-sm font-mono mb-6 shadow-md">
        <span class="w-2.5 h-2.5 rounded-full bg-[#27C93F] animate-pulse"></span>
        <span class="font-medium text-[#F5F0E8] dark:text-[#F5F0E8] text-[#2A2421]">Software & IoT Engineer @ Mindnrobotics</span>
      </div>

      <!-- Main Heading (Serif Display) -->
      <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal text-[#E8C976] dark:text-[#E8C976] text-[#B5502F] tracking-wider leading-tight mb-4">
        Hazman Adanan
      </h1>

      <!-- Subtitle -->
      <h2 class="text-xl sm:text-3xl md:text-4xl font-serif italic text-[#F5F0E8]/90 dark:text-[#F5F0E8]/90 text-[#2A2421]/90 font-light mb-8 max-w-3xl mx-auto leading-relaxed">
        Bridging Full-Stack Code, Embedded Hardware & Mesh Networks
      </h2>

      <!-- Wavy Gold Divider with Center Dot -->
      <WavyDivider />

      <!-- Story Body Text with Sticky-Note Outline Highlights -->
      <div class="text-[#F5F0E8]/90 dark:text-[#F5F0E8]/90 text-[#2A2421]/90 text-base sm:text-lg md:text-xl font-sans leading-relaxed max-w-3xl mx-auto space-y-6 my-8">
        <p>
          I design and build 
          <span class="inline-block border-2 border-[#F5F0E8]/80 dark:border-[#F5F0E8]/80 border-[#B5502F]/80 bg-[#F5F0E8]/5 dark:bg-[#F5F0E8]/5 bg-[#B5502F]/10 px-2 py-0.5 rounded text-[#F5F0E8] dark:text-[#F5F0E8] text-[#B5502F] font-medium my-0.5 shadow-sm">full-stack web platforms</span> 
          connected directly to 
          <span class="inline-block border-2 border-[#E8C976]/80 dark:border-[#E8C976]/80 border-[#B5502F]/80 bg-[#E8C976]/10 dark:bg-[#E8C976]/10 bg-[#B5502F]/10 px-2 py-0.5 rounded text-[#E8C976] dark:text-[#E8C976] text-[#B5502F] font-medium my-0.5 shadow-sm">ESP32 & IoT microcontrollers</span> 
          and real-time telemetry hardware.
        </p>

        <p class="text-[#8A8A8A] dark:text-[#8A8A8A] text-[#6E655F] text-sm sm:text-base leading-relaxed">
          From target systems and Teltonika FMC920 vehicle telemetry to Rajant mesh node field connectivity, I turn complex physical hardware into reliable, intuitive web interfaces.
        </p>
      </div>

      <!-- Live Embedded/IoT Node Ticker -->
      <div class="my-6 inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-xl bg-[#141414] dark:bg-[#141414] bg-white border border-[#2A2A2A] dark:border-[#2A2A2A] border-[#E6E0D4] font-mono text-xs text-[#8A8A8A] dark:text-[#8A8A8A] text-[#6E655F] shadow-sm">
        <div class="flex items-center gap-1.5 text-[#E8C976] dark:text-[#E8C976] text-[#B5502F]">
          <span class="w-2 h-2 rounded-full bg-[#E8C976] dark:bg-[#E8C976] bg-[#B5502F]"></span>
          <span>Target Controls (ESP32)</span>
        </div>
        <span class="text-[#2A2A2A] dark:text-[#2A2A2A] text-[#E6E0D4]">|</span>
        <div class="flex items-center gap-1.5 text-[#F5F0E8] dark:text-[#F5F0E8] text-[#2A2421]">
          <span class="w-2 h-2 rounded-full bg-[#27C93F]"></span>
          <span>Fleet Telemetry (FMC920)</span>
        </div>
        <span class="text-[#2A2A2A] dark:text-[#2A2A2A] text-[#E6E0D4]">|</span>
        <div class="flex items-center gap-1.5 text-[#B5502F]">
          <span class="w-2 h-2 rounded-full bg-[#B5502F]"></span>
          <span>Rajant Mesh & Starlink</span>
        </div>
      </div>

      <!-- Interactive Live IoT Telemetry Console -->
      <IoTConsoleWidget />

      <!-- Pill Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-4 mt-8">
        <!-- Primary Solid Pill Button -->
        <a 
          href="#works"
          class="px-7 py-3 rounded-full bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] font-sans font-semibold text-sm sm:text-base hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 cursor-pointer focus-ring"
        >
          <span>Explore All 18 Works</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>

        <!-- Secondary Outlined Pill Button -->
        <button
          @click="downloadResume"
          class="px-7 py-3 rounded-full bg-transparent text-[#2A2421] dark:text-[#F5F0E8] border border-[#B5502F]/40 dark:border-[#F5F0E8]/30 hover:border-[#B5502F] dark:hover:border-[#E8C976] hover:text-[#B5502F] dark:hover:text-[#E8C976] font-sans font-medium text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer focus-ring"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download Resume PDF</span>
        </button>
      </div>

      <!-- Quick Tech Stack Tags -->
      <div class="mt-12 pt-8 border-t border-[#2A2A2A]/60 dark:border-[#2A2A2A]/60 border-[#E6E0D4] flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <span class="text-xs font-mono text-[#8A8A8A] dark:text-[#8A8A8A] text-[#6E655F] mr-2">tech domain:</span>
        <span 
          v-for="tech in ['ESP32 / Embedded C++', 'Vue 3 & TypeScript', 'Teltonika FMC920', 'Node.js & PostgreSQL', 'Rajant Mesh & Starlink', 'Cisco Packet Tracer']"
          :key="tech"
          class="px-3 py-1 text-xs font-mono bg-[#1A1A1A] dark:bg-[#1A1A1A] bg-white text-[#F5F0E8]/80 dark:text-[#F5F0E8]/80 text-[#2A2421]/90 border border-[#2A2A2A] dark:border-[#2A2A2A] border-[#E6E0D4] rounded-full hover:border-[#E8C976]/50 dark:hover:border-[#E8C976]/50 hover:text-[#E8C976] transition-colors"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import WavyDivider from './WavyDivider.vue';
import DoodleDecorations from './DoodleDecorations.vue';
import IoTConsoleWidget from './IoTConsoleWidget.vue';

const downloadResume = () => {
  const link = document.createElement('a');
  link.href = '/Hazman_resume_OCT2025.pdf';
  link.download = 'Hazman_resume_OCT2025';
  link.click();
};
</script>
