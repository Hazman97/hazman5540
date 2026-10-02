<template>
  <section id="story" class="relative min-h-screen print:min-h-0 flex items-center justify-center pt-28 print:pt-4 pb-16 print:pb-4 px-4 sm:px-6 lg:px-8">
    <!-- Asymmetric Organic Doodle & IoT Line-Art Decorations -->
    <DoodleDecorations type="chip-doodle" class="absolute top-24 right-[8%] sm:right-[14%] hidden sm:block opacity-60" />
    <DoodleDecorations type="antenna-wave" class="absolute bottom-24 left-[5%] sm:left-[8%] opacity-60" />
    <DoodleDecorations type="circuit-node" class="absolute top-1/2 right-[5%] hidden md:block opacity-60" />
    <DoodleDecorations type="coffee-doodle" class="absolute bottom-16 right-[12%] hidden lg:block opacity-60" />

    <div class="max-w-4xl mx-auto text-center relative z-10">
      <!-- Live IoT Telemetry Status Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] text-[#B5502F] dark:text-[#E8C976] text-xs sm:text-sm font-mono mb-6 shadow-md">
        <span class="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></span>
        <span class="font-medium text-[#2A2421] dark:text-[#F5F0E8]">{{ profile.roleBadge }}</span>
      </div>

      <!-- Main Display Title -->
      <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal text-[#B5502F] dark:text-[#E8C976] tracking-wider leading-tight mb-3 drop-shadow-sm">
        {{ profile.name }}
      </h1>

      <!-- Role Headline & Sub-Headline -->
      <h2 class="text-2xl sm:text-4xl font-serif text-[#2A2421] dark:text-[#F5F0E8] font-bold mb-4 max-w-3xl mx-auto leading-tight">
        {{ profile.headline }}
      </h2>

      <p class="text-sm sm:text-base text-[#524A45] dark:text-[#9E9E9E] font-sans max-w-2xl mx-auto leading-relaxed mb-6">
        {{ profile.subline }}
      </p>

      <!-- Wavy Divider with Center Dot -->
      <WavyDivider />

      <!-- Core Engineering Capabilities Micro-Badges -->
      <div class="my-6 inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#141414] border border-[#E6E0D4] dark:border-[#2A2A2A] font-mono text-xs text-[#524A45] dark:text-[#9E9E9E] shadow-md">
        <div class="flex items-center gap-1.5 text-[#B5502F] dark:text-[#E8C976] font-semibold">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Real-time WebSockets</span>
        </div>
        <span class="text-[#E6E0D4] dark:text-[#2A2A2A]">|</span>
        <div class="flex items-center gap-1.5 text-[#27C93F] font-semibold">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M1.05 6.879a16 16 0 0121.9 0" />
          </svg>
          <span>GPS Telemetry</span>
        </div>
        <span class="text-[#E6E0D4] dark:text-[#2A2A2A]">|</span>
        <div class="flex items-center gap-1.5 text-[#B5502F] dark:text-[#E8C976] font-semibold">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <span>Mesh &amp; Starlink Networks</span>
        </div>
      </div>

      <!-- Pill Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-4 mb-8">
        <!-- Primary Solid Pill Button -->
        <a 
          href="#works"
          class="px-7 py-3 rounded-full bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] font-sans font-semibold text-sm sm:text-base hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 cursor-pointer focus-ring"
        >
          <span>View Projects</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>

        <!-- Secondary Outlined Pill Button -->
        <button
          @click="downloadResume"
          class="px-7 py-3 rounded-full bg-transparent text-[#2A2421] dark:text-[#F5F0E8] border border-[#B5502F]/40 dark:border-[#F5F0E8]/30 hover:border-[#B5502F] dark:hover:border-[#E8C976] hover:text-[#B5502F] dark:hover:text-[#E8C976] hover:scale-105 active:scale-95 font-sans font-medium text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer focus-ring"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download Resume PDF</span>
        </button>
      </div>

      <!-- Interactive Live IoT Telemetry Console -->
      <IoTConsoleWidget />

    </div>
  </section>
</template>

<script setup lang="ts">
import WavyDivider from './WavyDivider.vue';
import DoodleDecorations from './DoodleDecorations.vue';
import IoTConsoleWidget from './IoTConsoleWidget.vue';
import { useSiteContent } from '@/composables/useSiteContent';

const { profile } = useSiteContent();

const downloadResume = () => {
  const link = document.createElement('a');
  link.href = profile.value.resumeUrl;
  link.download = decodeURIComponent(profile.value.resumeUrl.split('/').pop() || 'resume.pdf');
  link.click();
};
</script>
