<template>
  <section id="experience" class="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#0a1526] transition-colors duration-300">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-0 w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px]"></div>
      <!-- Animated Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 dark:opacity-10"></div>
    </div>

    <div class="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
      <!-- Section Header -->
      <div class="text-center mb-20 reveal">
        <p class="text-teal-600 dark:text-teal-400 font-mono text-sm mb-3 tracking-widest uppercase flex items-center justify-center gap-3">
          <span class="w-12 h-px bg-teal-500/50"></span>
          My Journey
          <span class="w-12 h-px bg-teal-500/50"></span>
        </p>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
          Experience & <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-400">Education</span>
        </h2>
      </div>

      <div class="grid lg:grid-cols-2 gap-16 lg:gap-8">
        <!-- Experience Timeline -->
        <div class="timeline-container">
          <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-10 flex items-center gap-3 reveal">
            <span class="p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </span>
            Work Experience
          </h3>
          
          <div class="relative border-l-2 border-teal-200 dark:border-teal-900/50 ml-4 md:ml-6 space-y-12">
            <!-- Experience Item 1 -->
            <div class="relative pl-8 md:pl-10 reveal stagger-1 group">
              <div class="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white dark:bg-[#0a1526] border-4 border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)] group-hover:scale-125 transition-transform duration-300"></div>
              <div class="glass-card p-6 md:p-8 rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10 border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md">
                <span class="inline-block px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-mono rounded-full mb-4 font-semibold tracking-wide">May 2024 - Present</span>
                <h4 class="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">Software Engineer</h4>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Mindnrobotics</p>
                <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-2">
                  Engineered a full-stack shooting range control system, developing the HTML platform and programming ESP32/Node.js embedded targets. Expanded network coverage across sites using MP2P links, Rajant mesh nodes, and Starlink connectivity.
                </p>
                <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Engineered a fleet management system using Node.js, integrating Teltonika FMC920 devices for real-time telemetry and optimizing a PostgreSQL database for high-frequency GPS data ingestion.
                </p>
              </div>
            </div>

            <!-- Experience Item 2 -->
            <div class="relative pl-8 md:pl-10 reveal stagger-2 group">
              <div class="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white dark:bg-[#0a1526] border-4 border-slate-300 dark:border-slate-600 group-hover:border-teal-400 transition-all duration-300"></div>
              <div class="glass-card p-6 md:p-8 rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10 border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md">
                <span class="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs font-mono rounded-full mb-4 font-semibold tracking-wide">Aug 2023 - Mar 2024</span>
                <h4 class="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">Programmer</h4>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">PKT Logistics Group Sdn Bhd</p>
                <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Began as an IT Security Intern managing CCTV and access controls. Promoted to Programmer, leading front-end development for internal systems like a security portal and an e-claim platform. Partnered with vendors on Warehouse Management System (WMS) front-end components.
                </p>
              </div>
            </div>

            <!-- Experience Item 3 -->
            <div class="relative pl-8 md:pl-10 reveal stagger-3 group">
              <div class="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white dark:bg-[#0a1526] border-4 border-slate-300 dark:border-slate-600 group-hover:border-teal-400 transition-all duration-300"></div>
              <div class="glass-card p-6 md:p-8 rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10 border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md">
                <span class="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs font-mono rounded-full mb-4 font-semibold tracking-wide">Nov 2017 - Apr 2018</span>
                <h4 class="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">Part-Time Administrative Assistant</h4>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Majlis Agama Islam (Maik)</p>
                <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Supported the Unit Agihan by handling customer inquiries, phone calls, and data entry. Managed administrative documents and collaborated with teams to ensure smooth daily operations.
                </p>
              </div>
            </div>

            <!-- Experience Item 4 -->
            <div class="relative pl-8 md:pl-10 reveal stagger-4 group">
              <div class="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white dark:bg-[#0a1526] border-4 border-slate-300 dark:border-slate-600 group-hover:border-teal-400 transition-all duration-300"></div>
              <div class="glass-card p-6 md:p-8 rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10 border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md">
                <span class="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs font-mono rounded-full mb-4 font-semibold tracking-wide">2017 - 2018</span>
                <h4 class="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">Practical Student</h4>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Majlis Daerah Tumpat</p>
                <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Assisted the OSC (One-Stop Center) department with data entry and document filing. Gained valuable hands-on exposure to local government operations and clerical duties.
                </p>
              </div>
            </div>

            <!-- Experience Item 5 -->
            <div class="relative pl-8 md:pl-10 reveal stagger-5 group">
              <div class="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white dark:bg-[#0a1526] border-4 border-slate-300 dark:border-slate-600 group-hover:border-teal-400 transition-all duration-300"></div>
              <div class="glass-card p-6 md:p-8 rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10 border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md">
                <span class="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs font-mono rounded-full mb-4 font-semibold tracking-wide">Part-Time</span>
                <h4 class="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">IT Technician</h4>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Marz Computer Trading</p>
                <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Performed basic laptop preventive maintenance for various clients. Tasks included running Windows Updates, defragmentation, scan disk, and disk cleanup.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Education Timeline -->
        <div class="timeline-container">
          <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-10 flex items-center gap-3 reveal">
            <span class="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
            </span>
            Education
          </h3>
          
          <div class="relative border-l-2 border-emerald-200 dark:border-emerald-900/50 ml-4 md:ml-6 space-y-12">
            <!-- Education Item 1 -->
            <div class="relative pl-8 md:pl-10 reveal stagger-6 group">
              <div class="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white dark:bg-[#0a1526] border-4 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform duration-300"></div>
              <div class="glass-card p-6 md:p-8 rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/10 border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md">
                <span class="inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono rounded-full mb-4 font-semibold tracking-wide">2019 - 2024</span>
                <h4 class="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">Bachelor of Computer Science with Maritime Informatics</h4>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Universiti Malaysia Terengganu</p>
                <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Dean's List for Semesters 2, 3, and 4. Core focus on Object-Oriented Programming, Cyber Security, Networking, IoT Computing, and Web-Based Application Development. Final Year Project: Misz Home Appointment System.
                </p>
              </div>
            </div>

            <!-- Education Item 2 -->
            <div class="relative pl-8 md:pl-10 reveal stagger-7 group">
              <div class="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white dark:bg-[#0a1526] border-4 border-slate-300 dark:border-slate-600 group-hover:border-emerald-400 transition-all duration-300"></div>
              <div class="glass-card p-6 md:p-8 rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/10 border border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md">
                <span class="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs font-mono rounded-full mb-4 font-semibold tracking-wide">2015 - 2018</span>
                <h4 class="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">Diploma Electric & Electronic</h4>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Politeknik Ibrahim Sultan</p>
                <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Core focus on Computer Networking Fundamentals, Embedded System Application, Circuit Analysis, and Electronic Equipment Repair. Built a strong hardware foundation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Resume",
  mounted() {
    this.setupIntersectionObserver();
  },
  methods: {
    setupIntersectionObserver() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      this.$el.querySelectorAll(".reveal").forEach((el) => {
        observer.observe(el);
      });
    },
  },
};
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.stagger-1 { transition-delay: 0.1s; }
.stagger-2 { transition-delay: 0.2s; }
.stagger-3 { transition-delay: 0.3s; }
.stagger-4 { transition-delay: 0.4s; }
.stagger-5 { transition-delay: 0.5s; }
.stagger-6 { transition-delay: 0.6s; }
.stagger-7 { transition-delay: 0.7s; }

.glass-card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}
</style>
