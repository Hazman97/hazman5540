<template>
  <section id="hardware" class="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
    <!-- Asymmetric Organic Doodles -->
    <DoodleDecorations type="chip-doodle" class="absolute top-10 right-[5%] hidden sm:block opacity-60" />

    <!-- Section Header -->
    <div class="text-center mb-12 relative z-10">
      <h2 class="text-3xl sm:text-5xl font-serif text-[#B5502F] dark:text-[#E8C976] tracking-wide mb-3">
        Engineering Workbench
      </h2>
      <p class="text-[#524A45] dark:text-[#9E9E9E] text-sm sm:text-base font-sans max-w-2xl mx-auto">
        Core technical stack, embedded target hardware, vehicle telemetry terminals, and field mesh deployment gear.
      </p>
      <WavyDivider />
    </div>

    <!-- Core Tech Stack Showcase Pills -->
    <div class="mb-12 p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] shadow-md hover:shadow-xl transition-shadow text-center relative z-10">
      <div class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] uppercase tracking-wider font-semibold mb-3">
        ✦ Core Technical Stack & Infrastructure
      </div>
      <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <span 
          v-for="tech in ['React', 'Vue.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker', 'ROS 2', 'ESP32', 'LoRa', 'Cloudflare Tunnels', 'Linux (Ubuntu/Jetson)']"
          :key="tech"
          class="px-3.5 py-1.5 text-xs font-mono bg-[#FAF7F2] dark:bg-[#141414] text-[#2A2421] dark:text-[#F5F0E8] border border-[#E6E0D4] dark:border-[#2D2D2D] rounded-full hover:border-[#B5502F] dark:hover:border-[#E8C976] hover:text-[#B5502F] dark:hover:text-[#E8C976] transition-colors font-medium"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <!-- 4 Specialized Workbench Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
      <!-- Card 1: ESP32 Target System -->
      <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-md hover:shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="px-3 py-1 text-xs font-mono font-semibold bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] rounded-full border border-[#B5502F]/30 dark:border-[#E8C976]/30">
              Microcontroller / Target
            </span>
            <div class="w-8 h-8 rounded-lg bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          <h3 class="text-xl font-serif font-bold text-[#2A2421] dark:text-[#F5F0E8] mb-2 group-hover:text-[#B5502F] dark:group-hover:text-[#E8C976] transition-colors">
            ESP32 & LoRa Target Controls
          </h3>

          <p class="text-xs sm:text-sm text-[#524A45] dark:text-[#9E9E9E] font-sans leading-relaxed mb-4">
            Custom C++ firmware on ESP32 target microcontrollers and LoRa modules. Relays real-time sensor triggers to web interfaces over low-latency socket connections.
          </p>
        </div>

        <div class="pt-4 border-t border-[#E6E0D4] dark:border-[#2A2A2A] flex flex-wrap gap-2 text-[11px] font-mono text-[#2A2421]/90 dark:text-[#F5F0E8]/90">
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">ESP32</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Embedded C++</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">LoRa Protocol</span>
        </div>
      </div>

      <!-- Card 2: Teltonika FMC920 GPS Tracker -->
      <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-md hover:shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="px-3 py-1 text-xs font-mono font-semibold bg-[#27C93F]/10 text-[#27C93F] rounded-full border border-[#27C93F]/30">
              Vehicle Telemetry Unit
            </span>
            <div class="w-8 h-8 rounded-lg bg-[#27C93F]/10 text-[#27C93F] flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          <h3 class="text-xl font-serif font-bold text-[#2A2421] dark:text-[#F5F0E8] mb-2 group-hover:text-[#B5502F] dark:group-hover:text-[#E8C976] transition-colors">
            Teltonika FMC920 & Node.js Server
          </h3>

          <p class="text-xs sm:text-sm text-[#524A45] dark:text-[#9E9E9E] font-sans leading-relaxed mb-4">
            Industrial vehicle tracking terminal with LTE fallback. Integrated into Node.js TCP ingestion server with high-frequency PostgreSQL spatial database storage.
          </p>
        </div>

        <div class="pt-4 border-t border-[#E6E0D4] dark:border-[#2A2A2A] flex flex-wrap gap-2 text-[11px] font-mono text-[#2A2421]/90 dark:text-[#F5F0E8]/90">
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Node.js</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">PostgreSQL</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Linux (Ubuntu)</span>
        </div>
      </div>

      <!-- Card 3: Rajant Mesh & Cloudflare Tunnels -->
      <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-md hover:shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="px-3 py-1 text-xs font-mono font-semibold bg-[#64FFDA]/10 text-[#64FFDA] rounded-full border border-[#64FFDA]/30">
              Edge Infrastructure
            </span>
            <div class="w-8 h-8 rounded-lg bg-[#64FFDA]/10 text-[#64FFDA] flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M1.05 6.879a16 16 0 0121.9 0" />
              </svg>
            </div>
          </div>

          <h3 class="text-xl font-serif font-bold text-[#2A2421] dark:text-[#F5F0E8] mb-2 group-hover:text-[#B5502F] dark:group-hover:text-[#E8C976] transition-colors">
            Mesh Networks & Cloudflare Tunnels
          </h3>

          <p class="text-xs sm:text-sm text-[#524A45] dark:text-[#9E9E9E] font-sans leading-relaxed mb-4">
            Deploys MP2P wireless bridges, Rajant Kinetic Mesh nodes, and Cloudflare Tunnels for secure edge server deployments without public port forwarding.
          </p>
        </div>

        <div class="pt-4 border-t border-[#E6E0D4] dark:border-[#2A2A2A] flex flex-wrap gap-2 text-[11px] font-mono text-[#2A2421]/90 dark:text-[#F5F0E8]/90">
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Cloudflare Tunnels</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Rajant Mesh</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Docker</span>
        </div>
      </div>

      <!-- Card 4: Full-Stack & Robotics Stack -->
      <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-md hover:shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="px-3 py-1 text-xs font-mono font-semibold bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] rounded-full border border-[#B5502F]/30 dark:border-[#E8C976]/30">
              Full-Stack Workstation
            </span>
            <div class="w-8 h-8 rounded-lg bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <h3 class="text-xl font-serif font-bold text-[#2A2421] dark:text-[#F5F0E8] mb-2 group-hover:text-[#B5502F] dark:group-hover:text-[#E8C976] transition-colors">
            React, Vue.js & ROS 2 Ecosystem
          </h3>

          <p class="text-xs sm:text-sm text-[#524A45] dark:text-[#9E9E9E] font-sans leading-relaxed mb-4">
            Modern web development environment using React, Vue.js, Tailwind CSS, ROS 2 telemetry integrations, and Docker containerized services on Linux Jetson / Ubuntu.
          </p>
        </div>

        <div class="pt-4 border-t border-[#E6E0D4] dark:border-[#2A2A2A] flex flex-wrap gap-2 text-[11px] font-mono text-[#2A2421]/90 dark:text-[#F5F0E8]/90">
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">React & Vue.js</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">Tailwind CSS</span>
          <span class="px-2 py-0.5 bg-[#F0EBE1] dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">ROS 2 & Docker</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import WavyDivider from './WavyDivider.vue';
import DoodleDecorations from './DoodleDecorations.vue';
</script>
