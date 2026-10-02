<template>
  <section id="experience" class="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
    <!-- Asymmetric Organic Doodle & Circuit Decorations -->
    <DoodleDecorations type="moon-sparkle" class="absolute top-10 right-[6%] hidden sm:block" />
    <DoodleDecorations type="circuit-node" class="absolute bottom-16 left-[4%] hidden md:block" />

    <!-- Section Header -->
    <div class="text-center mb-16 relative z-10">
      <h2 class="text-3xl sm:text-5xl font-serif text-[#B5502F] dark:text-[#E8C976] tracking-wide mb-3">
        Experience & Education Journey
      </h2>
      <p class="text-[#524A45] dark:text-[#9E9E9E] text-sm sm:text-base font-sans max-w-xl mx-auto">
        Where I've worked and what I've built, from logistics systems to field robotics.
      </p>
      <WavyDivider />
    </div>

    <!-- 2 Column Grid for Work vs Education -->
    <div class="grid grid-cols-1 lg:grid-cols-2 print:grid-cols-2 gap-12 lg:gap-16 print:gap-6 relative z-10">
      <!-- Work Experience Column -->
      <div>
        <div class="flex items-center gap-3 mb-8">
          <div class="p-2 rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] text-[#B5502F] dark:text-[#E8C976] shadow-sm">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-serif text-[#2A2421] dark:text-[#F5F0E8]">Professional Experience</h3>
        </div>

        <div class="relative border-l border-[#E6E0D4] dark:border-[#2A2A2A] ml-4 pl-6 space-y-10">
          <!-- First item is the current role and gets the highlighted style -->
          <div v-for="(job, jobIndex) in experience" :key="`${job.company}-${job.period}`" class="relative group">
            <div
              class="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-4 border-[#FAF7F2] dark:border-[#0F0F0F]"
              :class="jobIndex === 0
                ? 'bg-[#B5502F] dark:bg-[#E8C976] shadow-[0_0_8px_#B5502F] dark:shadow-[0_0_8px_#E8C976] group-hover:scale-125 transition-transform'
                : 'bg-[#E6E0D4] dark:bg-[#2A2A2A] group-hover:bg-[#B5502F] dark:group-hover:bg-[#E8C976] transition-all'"
            ></div>

            <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-md hover:shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all">
              <div class="flex items-center justify-between gap-2 mb-2">
                <span
                  class="inline-block px-3 py-1 text-xs font-mono rounded-full border"
                  :class="jobIndex === 0
                    ? 'bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] border-[#B5502F]/30 dark:border-[#E8C976]/30 font-semibold'
                    : 'bg-[#F0EBE1] dark:bg-[#242424] text-[#524A45] dark:text-[#9E9E9E] border-[#E6E0D4] dark:border-[#2D2D2D]'"
                >{{ job.period }}</span>
                <span v-if="job.location" class="text-[10px] font-mono text-[#524A45] dark:text-[#9E9E9E]">{{ job.location }}</span>
              </div>
              <h4 class="text-lg font-serif text-[#2A2421] dark:text-[#F5F0E8] font-semibold">{{ job.role }}</h4>
              <p
                class="text-xs font-mono mb-4"
                :class="jobIndex === 0 ? 'text-[#B5502F] dark:text-[#E8C976] font-semibold' : 'text-[#524A45] dark:text-[#9E9E9E]'"
              >{{ job.company }}</p>
              <ul class="text-xs sm:text-sm text-[#524A45] dark:text-[#9E9E9E] font-sans space-y-3 leading-relaxed">
                <li v-for="(bullet, bulletIndex) in job.bullets" :key="bullet.title" class="flex items-start gap-2">
                  <span
                    class="shrink-0 font-bold"
                    :class="bulletIndex % 2 === 0 ? 'text-[#B5502F] dark:text-[#E8C976]' : (jobIndex === 0 ? 'text-[#27C93F]' : 'text-[#524A45] dark:text-[#9E9E9E]')"
                  >•</span>
                  <span><strong>{{ bullet.title }}</strong>{{ bullet.text }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Education Column -->
      <div>
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-xl bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] flex items-center justify-center font-bold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h3 class="text-2xl font-serif text-[#2A2421] dark:text-[#F5F0E8] font-bold">Education & Qualifications</h3>
        </div>

        <div class="relative border-l border-[#E6E0D4] dark:border-[#2A2A2A] ml-4 pl-6 space-y-10">
          <!-- Edu Item 1: UMT -->
          <div class="relative group">
            <div class="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#B5502F] dark:bg-[#E8C976] border-4 border-[#FAF7F2] dark:border-[#0F0F0F] shadow-[0_0_8px_#B5502F] dark:shadow-[0_0_8px_#E8C976] group-hover:scale-125 transition-transform"></div>
            
            <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-md hover:shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all">
              <span class="inline-block px-3 py-1 bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] text-xs font-mono rounded-full mb-3 border border-[#B5502F]/30 dark:border-[#E8C976]/30 font-semibold">2019 - 2024</span>
              <h4 class="text-lg font-serif text-[#2A2421] dark:text-[#F5F0E8] font-semibold">Bachelor of Computer Science with Maritime Informatics</h4>
              <p class="text-xs font-mono text-[#524A45] dark:text-[#9E9E9E] mb-3">Universiti Malaysia Terengganu (UMT)</p>
              <div class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] mb-2 font-semibold">Dean's List for Semesters 2, 3, and 4</div>
              <p class="text-xs sm:text-sm text-[#524A45] dark:text-[#9E9E9E] font-sans leading-relaxed mb-3">
                Coursework: Object-Oriented Programming, Cyber Security, Networking, Database Systems, IoT Computing, Web-Based Application Development, Intelligent Systems, System Analysis & Design.
              </p>
              <div class="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-[#141414] border border-[#E6E0D4] dark:border-[#2A2A2A] text-xs font-mono text-[#2A2421]/90 dark:text-[#F5F0E8]/90">
                <span class="text-[#B5502F] dark:text-[#E8C976] font-semibold">Final Year Project:</span> Misz Home Appointment System
              </div>
            </div>
          </div>

          <!-- Edu Item 2: PIS -->
          <div class="relative group">
            <div class="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#E6E0D4] dark:bg-[#2A2A2A] border-4 border-[#FAF7F2] dark:border-[#0F0F0F] group-hover:bg-[#B5502F] dark:group-hover:bg-[#E8C976] transition-all"></div>
            
            <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-md hover:shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all">
              <span class="inline-block px-3 py-1 bg-[#F0EBE1] dark:bg-[#242424] text-[#524A45] dark:text-[#9E9E9E] text-xs font-mono rounded-full mb-3 border border-[#E6E0D4] dark:border-[#2D2D2D]">2015 - 2018</span>
              <h4 class="text-lg font-serif text-[#2A2421] dark:text-[#F5F0E8] font-semibold">Diploma in Electrical & Electronics Engineering</h4>
              <p class="text-xs font-mono text-[#524A45] dark:text-[#9E9E9E] mb-3">Politeknik Ibrahim Sultan (PIS)</p>
              <p class="text-xs sm:text-sm text-[#524A45] dark:text-[#9E9E9E] font-sans leading-relaxed">
                Solid foundation in circuit theory, embedded microcontrollers, digital logic design, programmable logic controllers (PLC), and hardware troubleshooting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import WavyDivider from './WavyDivider.vue';
import DoodleDecorations from './DoodleDecorations.vue';
import { useSiteContent } from '@/composables/useSiteContent';

const { experience } = useSiteContent();
</script>
