<template>
  <section id="experience" class="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
    <!-- Asymmetric Organic Doodle & Circuit Decorations -->
    <DoodleDecorations type="moon-sparkle" class="absolute top-10 right-[6%] hidden sm:block" />
    <DoodleDecorations type="circuit-node" class="absolute bottom-16 left-[4%] hidden md:block" />

    <!-- Section Header -->
    <div class="text-center mb-16 relative z-10">
      <h2 class="text-3xl sm:text-5xl font-serif text-[#B5502F] dark:text-[#E8C976] tracking-wide mb-3">
        Experience & Education Journey
      </h2>
      <p class="text-[#6E655F] dark:text-[#8A8A8A] text-sm sm:text-base font-sans max-w-xl mx-auto">
        Career history at Mindnrobotics & PKT Logistics, alongside academic background.
      </p>
      <WavyDivider />
    </div>

    <!-- 2 Column Grid for Work vs Education -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
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
          <!-- Item 1: Mindnrobotics -->
          <div class="relative group">
            <div class="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#B5502F] dark:bg-[#E8C976] border-4 border-[#FAF7F2] dark:border-[#0F0F0F] shadow-[0_0_8px_#B5502F] dark:shadow-[0_0_8px_#E8C976] group-hover:scale-125 transition-transform"></div>
            
            <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-colors">
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="inline-block px-3 py-1 bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] text-xs font-mono rounded-full border border-[#B5502F]/30 dark:border-[#E8C976]/30 font-semibold">May 2024 - Present</span>
                <span class="text-[10px] font-mono text-[#6E655F] dark:text-[#8A8A8A]">Shah Alam, MY</span>
              </div>
              <h4 class="text-lg font-serif text-[#2A2421] dark:text-[#F5F0E8] font-semibold">Software Engineer</h4>
              <p class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] mb-3">Mindnrobotics (K-Youth Programme → Software Engineer)</p>
              <ul class="text-xs sm:text-sm text-[#6E655F] dark:text-[#8A8A8A] font-sans space-y-2 list-disc list-inside leading-relaxed">
                <li>Engineered full-stack shooting range control system, developing HTML platform & programming ESP32 / Node.js embedded targets.</li>
                <li>Expanded network coverage across field sites using MP2P links, Rajant mesh nodes, and Starlink connectivity.</li>
                <li>Engineered fleet management telemetry systems in Node.js, integrating Teltonika FMC920 devices with an optimized PostgreSQL database.</li>
              </ul>
            </div>
          </div>

          <!-- Item 2: PKT Logistics -->
          <div class="relative group">
            <div class="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#E6E0D4] dark:bg-[#2A2A2A] border-4 border-[#FAF7F2] dark:border-[#0F0F0F] group-hover:bg-[#B5502F] dark:group-hover:bg-[#E8C976] transition-all"></div>
            
            <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-colors">
              <span class="inline-block px-3 py-1 bg-[#F0EBE1] dark:bg-[#242424] text-[#6E655F] dark:text-[#8A8A8A] text-xs font-mono rounded-full mb-3 border border-[#E6E0D4] dark:border-[#2D2D2D]">Aug 2023 - Mar 2024</span>
              <h4 class="text-lg font-serif text-[#2A2421] dark:text-[#F5F0E8] font-semibold">Programmer (Prev. IT Security Intern)</h4>
              <p class="text-xs font-mono text-[#6E655F] dark:text-[#8A8A8A] mb-3">PKT Logistics Group Sdn Bhd</p>
              <ul class="text-xs sm:text-sm text-[#6E655F] dark:text-[#8A8A8A] font-sans space-y-2 list-disc list-inside leading-relaxed">
                <li>Primary front-end developer for internal systems, creating a security portal & e-claim platform using Vue.js & Tailwind CSS.</li>
                <li>Partnered with external vendors on Warehouse Management System (WMS) front-end components.</li>
                <li>Managed CCTV systems, access controls, and security footage reviews during internship phase.</li>
              </ul>
            </div>
          </div>

          <!-- Item 3: MAIK -->
          <div class="relative group">
            <div class="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#E6E0D4] dark:bg-[#2A2A2A] border-4 border-[#FAF7F2] dark:border-[#0F0F0F] group-hover:bg-[#B5502F] dark:group-hover:bg-[#E8C976] transition-all"></div>
            
            <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-colors">
              <span class="inline-block px-3 py-1 bg-[#F0EBE1] dark:bg-[#242424] text-[#6E655F] dark:text-[#8A8A8A] text-xs font-mono rounded-full mb-3 border border-[#E6E0D4] dark:border-[#2D2D2D]">Nov 2017 - Apr 2018</span>
              <h4 class="text-lg font-serif text-[#2A2421] dark:text-[#F5F0E8] font-semibold">Part-Time Administrative Assistant</h4>
              <p class="text-xs font-mono text-[#6E655F] dark:text-[#8A8A8A] mb-2">Majlis Agama Islam (Maik)</p>
              <p class="text-xs sm:text-sm text-[#6E655F] dark:text-[#8A8A8A] font-sans leading-relaxed">
                Supported Unit Agihan handling customer service at counter, public phone inquiries, data entry, and record management.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Education Column -->
      <div>
        <div class="flex items-center gap-3 mb-8">
          <div class="p-2 rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] text-[#B5502F] dark:text-[#E8C976] shadow-sm">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <h3 class="text-xl font-serif text-[#2A2421] dark:text-[#F5F0E8]">Academic Education</h3>
        </div>

        <div class="relative border-l border-[#E6E0D4] dark:border-[#2A2A2A] ml-4 pl-6 space-y-10">
          <!-- Edu Item 1: UMT -->
          <div class="relative group">
            <div class="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#B5502F] dark:bg-[#E8C976] border-4 border-[#FAF7F2] dark:border-[#0F0F0F] shadow-[0_0_8px_#B5502F] dark:shadow-[0_0_8px_#E8C976] group-hover:scale-125 transition-transform"></div>
            
            <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-colors">
              <span class="inline-block px-3 py-1 bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] text-xs font-mono rounded-full mb-3 border border-[#B5502F]/30 dark:border-[#E8C976]/30 font-semibold">2019 - 2024</span>
              <h4 class="text-lg font-serif text-[#2A2421] dark:text-[#F5F0E8] font-semibold">Bachelor of Computer Science with Maritime Informatics</h4>
              <p class="text-xs font-mono text-[#6E655F] dark:text-[#8A8A8A] mb-3">Universiti Malaysia Terengganu (UMT)</p>
              <div class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] mb-2 font-semibold">✦ Dean's List for Semesters 2, 3, and 4</div>
              <p class="text-xs sm:text-sm text-[#6E655F] dark:text-[#8A8A8A] font-sans leading-relaxed mb-3">
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
            
            <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-colors">
              <span class="inline-block px-3 py-1 bg-[#F0EBE1] dark:bg-[#242424] text-[#6E655F] dark:text-[#8A8A8A] text-xs font-mono rounded-full mb-3 border border-[#E6E0D4] dark:border-[#2D2D2D]">2015 - 2018</span>
              <h4 class="text-lg font-serif text-[#2A2421] dark:text-[#F5F0E8] font-semibold">Diploma Electrical & Electronics Engineering</h4>
              <p class="text-xs font-mono text-[#6E655F] dark:text-[#8A8A8A] mb-3">Politeknik Ibrahim Sultan (PIS)</p>
              <p class="text-xs sm:text-sm text-[#6E655F] dark:text-[#8A8A8A] font-sans leading-relaxed">
                Coursework: Embedded System Applications, Computer Networking Fundamentals, CMOS Integrated Circuit Design, Circuit Analysis, PLC & Automation, Electronic Equipment Repair, Electronic CAD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Honors, Recognition & References Grid -->
    <div class="mt-16 pt-12 border-t border-[#E6E0D4] dark:border-[#2A2A2A] relative z-10">
      <div class="mb-8 text-center">
        <h3 class="text-xl sm:text-2xl font-serif text-[#B5502F] dark:text-[#E8C976]">Honors, Training & Professional References</h3>
        <p class="text-[#6E655F] dark:text-[#8A8A8A] text-xs sm:text-sm font-sans mt-1">Verified academic distinctions & workplace references.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1: Dean's List -->
        <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-xl flex flex-col justify-between hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-colors">
          <div>
            <div class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] uppercase tracking-wider mb-2">Academic Honor</div>
            <h4 class="text-base font-serif text-[#2A2421] dark:text-[#F5F0E8] font-semibold mb-2">Dean's List Award</h4>
            <p class="text-xs text-[#6E655F] dark:text-[#8A8A8A] leading-relaxed">
              Awarded Dean's List honors for 3 consecutive semesters (Semesters 2, 3, and 4) at Universiti Malaysia Terengganu for academic excellence.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-[#E6E0D4] dark:border-[#2D2D2D] text-[11px] font-mono text-[#B5502F] dark:text-[#E8C976] font-semibold">
            Universiti Malaysia Terengganu
          </div>
        </div>

        <!-- Card 2: Reference - Dr. Rozniza -->
        <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-xl flex flex-col justify-between hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-colors">
          <div>
            <div class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] uppercase tracking-wider mb-2">Academic Reference</div>
            <h4 class="text-base font-serif text-[#2A2421] dark:text-[#F5F0E8] font-semibold mb-1">Dr. Rozniza Binti Ali</h4>
            <p class="text-xs font-mono text-[#6E655F] dark:text-[#8A8A8A] mb-3">Final Year Supervisor, UMT</p>
            <p class="text-xs text-[#6E655F] dark:text-[#8A8A8A] leading-relaxed">
              Supervised Final Year Project ("Misz Home Appointment System") & IoT/Maritime Informatics research.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-[#E6E0D4] dark:border-[#2D2D2D] text-[11px] font-mono text-[#2A2421]/80 dark:text-[#F5F0E8]/80">
            rozniza@umt.edu.my
          </div>
        </div>

        <!-- Card 3: Reference - Kavitha Sengodan -->
        <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] p-6 rounded-2xl shadow-xl flex flex-col justify-between hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-colors">
          <div>
            <div class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] uppercase tracking-wider mb-2">Professional Reference</div>
            <h4 class="text-base font-serif text-[#2A2421] dark:text-[#F5F0E8] font-semibold mb-1">Kavitha Sengodan</h4>
            <p class="text-xs font-mono text-[#6E655F] dark:text-[#8A8A8A] mb-3">Manager, R&D @ PKT Logistics</p>
            <p class="text-xs text-[#6E655F] dark:text-[#8A8A8A] leading-relaxed">
              Supervised front-end development for security portal, e-claim system & WMS vendor component integration.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-[#E6E0D4] dark:border-[#2D2D2D] text-[11px] font-mono text-[#2A2421]/80 dark:text-[#F5F0E8]/80">
            kavitha.sengodan@pktgroup.com
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
