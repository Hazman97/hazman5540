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
      <p class="text-[#6E655F] dark:text-[#8A8A8A] text-sm sm:text-base font-sans max-w-xl mx-auto">
        Combining Computer Science degree & Electrical Electronics diploma background.
      </p>
      <WavyDivider />
    </div>

    <!-- Main Grid: Avatar + Bio + Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
      <!-- Left: Profile Image Card (5 cols) -->
      <div class="lg:col-span-5 flex justify-center">
        <div class="relative group">
          <!-- Outer Gold/Terracotta Glow Ring -->
          <div class="absolute -inset-2 bg-gradient-to-tr from-[#B5502F] via-[#E8C976] to-[#B5502F] dark:from-[#E8C976] dark:via-[#B5502F] dark:to-[#E8C976] rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-500"></div>

          <!-- Image Container -->
          <div class="relative w-64 h-72 sm:w-72 sm:h-80 rounded-2xl overflow-hidden bg-white dark:bg-[#141414] border-2 border-[#E6E0D4] dark:border-[#2A2A2A] shadow-2xl p-2">
            <img 
              src="/logo.png" 
              alt="Hazman Profile Logo" 
              class="w-full h-full object-cover rounded-xl bg-[#FAF7F2] dark:bg-[#0F0F0F]"
              @error="(e) => (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Hazman+Adanan&background=1A1A1A&color=E8C976&size=300'"
            />
          </div>

          <!-- Floating Badges -->
          <div class="absolute -top-4 -right-4 bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] text-[#B5502F] dark:text-[#E8C976] p-2.5 rounded-xl shadow-xl transform rotate-6 group-hover:rotate-0 transition-transform">
            <span class="text-xl">⚙️</span>
          </div>
          <div class="absolute -bottom-3 -left-3 bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform">
            MINDNROBOTICS
          </div>
        </div>
      </div>

      <!-- Right: Detailed Bio & Core Expertise (7 cols) -->
      <div class="lg:col-span-7 space-y-6">
        <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 sm:p-8 rounded-2xl shadow-xl leading-relaxed space-y-4">
          <p class="text-[#2A2421] dark:text-[#F5F0E8] text-base sm:text-lg font-sans">
            I work as a 
            <span class="inline-block border-2 border-[#B5502F]/80 dark:border-[#E8C976]/80 bg-[#B5502F]/10 dark:bg-[#E8C976]/10 px-2 py-0.5 rounded text-[#B5502F] dark:text-[#E8C976] font-medium my-0.5 shadow-sm">Software Engineer at Mindnrobotics</span> 
            developing embedded control systems & full-stack web platforms.
          </p>
          <p class="text-[#6E655F] dark:text-[#8A8A8A] text-sm sm:text-base font-sans leading-relaxed">
            With a <b class="text-[#2A2421] dark:text-[#F5F0E8]">Bachelor of Computer Science with Maritime Informatics</b> (UMT) and a <b class="text-[#2A2421] dark:text-[#F5F0E8]">Diploma in Electrical & Electronic Engineering</b> (Politeknik Ibrahim Sultan), I possess a unique dual foundation in software architecture and hardware circuits.
          </p>
          <p class="text-[#6E655F] dark:text-[#8A8A8A] text-sm sm:text-base font-sans leading-relaxed">
            My daily work involves programming <span class="text-[#B5502F] dark:text-[#E8C976] font-semibold">ESP32 microcontrollers in C/C++</span>, constructing Node.js & Vue.js web dashboards, managing Teltonika FMC920 vehicle telemetry pipelines, and deploying field networks with Rajant Mesh & Starlink.
          </p>
        </div>

        <!-- Quick Stats Grid -->
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-4 rounded-xl text-center group hover:border-[#B5502F]/50 dark:hover:border-[#E8C976]/50 transition-colors shadow-sm">
            <div class="text-2xl sm:text-3xl font-serif font-bold text-[#B5502F] dark:text-[#E8C976]">2+</div>
            <div class="text-[11px] font-mono text-[#6E655F] dark:text-[#8A8A8A] uppercase tracking-wider mt-1">Years Exp</div>
          </div>
          <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-4 rounded-xl text-center group hover:border-[#B5502F]/50 dark:hover:border-[#E8C976]/50 transition-colors shadow-sm">
            <div class="text-2xl sm:text-3xl font-serif font-bold text-[#B5502F] dark:text-[#E8C976]">3x</div>
            <div class="text-[11px] font-mono text-[#6E655F] dark:text-[#8A8A8A] uppercase tracking-wider mt-1">Dean's List</div>
          </div>
          <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-4 rounded-xl text-center group hover:border-[#B5502F]/50 dark:hover:border-[#E8C976]/50 transition-colors shadow-sm">
            <div class="text-2xl sm:text-3xl font-serif font-bold text-[#B5502F] dark:text-[#E8C976]">IoT</div>
            <div class="text-[11px] font-mono text-[#6E655F] dark:text-[#8A8A8A] uppercase tracking-wider mt-1">Specialist</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Technical Skills Breakdown -->
    <div class="mt-16 pt-12 border-t border-[#E6E0D4] dark:border-[#2A2A2A]">
      <div class="mb-8">
        <h3 class="text-xl sm:text-2xl font-serif text-[#B5502F] dark:text-[#E8C976] mb-2">Technical Skills & Technologies</h3>
        <p class="text-[#6E655F] dark:text-[#8A8A8A] text-xs sm:text-sm font-sans">Full skill matrix from software engineering to hardware & networking.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Programming & Web -->
        <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-5 rounded-xl hover:border-[#B5502F]/30 dark:hover:border-[#E8C976]/30 transition-colors shadow-sm">
          <div class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] uppercase tracking-widest mb-3">// Web & Languages</div>
          <div class="flex flex-wrap gap-2">
            <span v-for="t in ['Vue.js', 'TypeScript', 'Tailwind', 'Node.js', 'PHP', 'Python', 'C/C++', 'Java']" :key="t" class="px-2.5 py-1 text-xs font-mono bg-[#F0EBE1] dark:bg-[#242424] text-[#2A2421]/90 dark:text-[#F5F0E8]/80 border border-[#E6E0D4] dark:border-[#2D2D2D] rounded-md">
              {{ t }}
            </span>
          </div>
        </div>

        <!-- Databases & Cloud -->
        <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-5 rounded-xl hover:border-[#B5502F]/30 dark:hover:border-[#E8C976]/30 transition-colors shadow-sm">
          <div class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] uppercase tracking-widest mb-3">// Backend & Cloud</div>
          <div class="flex flex-wrap gap-2">
            <span v-for="t in ['PostgreSQL', 'Cloudflare D1', 'Firebase', 'Supabase', 'REST APIs', 'phpMyAdmin']" :key="t" class="px-2.5 py-1 text-xs font-mono bg-[#F0EBE1] dark:bg-[#242424] text-[#2A2421]/90 dark:text-[#F5F0E8]/80 border border-[#E6E0D4] dark:border-[#2D2D2D] rounded-md">
              {{ t }}
            </span>
          </div>
        </div>

        <!-- IoT & Robotics -->
        <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-5 rounded-xl hover:border-[#B5502F]/30 dark:hover:border-[#E8C976]/30 transition-colors shadow-sm">
          <div class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] uppercase tracking-widest mb-3">// IoT & Embedded</div>
          <div class="flex flex-wrap gap-2">
            <span v-for="t in ['ESP32 Targets', 'Teltonika FMC920', 'Rajant Mesh', 'Starlink', 'MP2P Links', 'PLC Automation']" :key="t" class="px-2.5 py-1 text-xs font-mono bg-[#F0EBE1] dark:bg-[#242424] text-[#2A2421]/90 dark:text-[#F5F0E8]/80 border border-[#E6E0D4] dark:border-[#2D2D2D] rounded-md">
              {{ t }}
            </span>
          </div>
        </div>

        <!-- Networking & Hardware -->
        <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-5 rounded-xl hover:border-[#B5502F]/30 dark:hover:border-[#E8C976]/30 transition-colors shadow-sm">
          <div class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] uppercase tracking-widest mb-3">// Net & Hardware</div>
          <div class="flex flex-wrap gap-2">
            <span v-for="t in ['Cisco Packet Tracer', 'CCTV & Access Control', 'Circuit Analysis', 'Hardware Repair', 'OS Troubleshooting']" :key="t" class="px-2.5 py-1 text-xs font-mono bg-[#F0EBE1] dark:bg-[#242424] text-[#2A2421]/90 dark:text-[#F5F0E8]/80 border border-[#E6E0D4] dark:border-[#2D2D2D] rounded-md">
              {{ t }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import WavyDivider from './WavyDivider.vue';
import DoodleDecorations from './DoodleDecorations.vue';
</script>
