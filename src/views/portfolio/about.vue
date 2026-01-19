<template>
  <section
    id="about"
    class="py-24 relative overflow-hidden bg-white dark:bg-slate-900 font-sans selection:bg-emerald-500/30 selection:text-emerald-700 dark:selection:text-emerald-200 transition-colors duration-300"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Radial Gradient Center -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full blur-[120px]"
      ></div>
      <!-- Top Right Accent -->
      <div
        class="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-100/40 dark:bg-teal-900/10 rounded-full blur-[100px]"
      ></div>
      <!-- Bottom Left Accent -->
      <div
        class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-100/60 dark:bg-slate-800/30 rounded-full blur-[100px]"
      ></div>
    </div>

    <div class="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
      <!-- Section Header -->
      <div class="text-center mb-16 md:mb-24">
        <h2
          class="text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-4"
        >
          Wait, who's
          <span class="text-emerald-600 dark:text-emerald-400">Hazman?</span>
        </h2>
        <p
          class="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Frontend Developer & IT Tech Enthusiast
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-24 items-start">
        <!-- Left Column: Sticker Image (4 cols) -->
        <div class="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div class="relative group perspective-1000">
            <!-- Sticker Wrapper -->
            <div
              class="relative z-20 transform transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-2"
            >
              <!-- Sticker Stroke/Border -->
              <div
                class="absolute -inset-1.5 bg-white rounded-[2.5rem] rotate-2 opacity-90 shadow-2xl ring-1 ring-slate-200 dark:ring-0"
              ></div>
              <!-- Actual Image Container -->
              <div
                class="relative w-72 h-80 md:w-80 md:h-96 rounded-[2.2rem] overflow-hidden bg-slate-200 border-4 border-white transform rotate-2"
              >
                <img
                  src="/test.png"
                  alt="Hazman Profile"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Floating Sticker Elements -->
              <div
                class="absolute -top-6 -right-6 bg-white text-slate-900 p-2 px-4 rounded-xl shadow-xl transform rotate-12 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 border border-slate-100 dark:border-none"
              >
                <span class="text-2xl">👨‍💻</span>
              </div>
              <div
                class="absolute -bottom-4 -left-4 bg-emerald-500 text-white p-2 px-4 rounded-xl shadow-xl transform -rotate-6 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110"
              >
                <span class="font-bold text-sm tracking-wide">AVAILABLE</span>
              </div>
            </div>

            <!-- Decorative Blob Behind -->
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 blur-3xl -z-10 rounded-full"
            ></div>
          </div>
        </div>

        <!-- Right Column: Bio & Stats (8 cols) -->
        <div class="lg:col-span-7 space-y-8">
          <!-- Bio Card -->
          <div
            class="glass-panel p-8 md:p-10 rounded-[2rem] border border-white/60 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-md relative overflow-hidden group hover:bg-white/60 dark:hover:bg-white/[0.07] transition-colors duration-300 shadow-sm dark:shadow-none"
          >
            <!-- Shining Effect on Hover -->
            <div
              class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/5 dark:bg-white/5 blur-3xl rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500"
            ></div>

            <p
              class="text-xl md:text-2xl leading-relaxed text-slate-800 dark:text-slate-200 font-medium mb-6"
            >
              I'm a
              <span class="text-emerald-600 dark:text-emerald-400"
                >Software Engineer</span
              >
              bridging the digital and physical worlds through
              <span class="text-emerald-600 dark:text-emerald-400">IoT</span>.
              My expertise goes beyond the screen—I have strong roots in
              <span
                class="text-slate-900 dark:text-white decoration-emerald-500/30 underline decoration-2 underline-offset-4"
                >IT Support</span
              >
              and hardware repair, making me a versatile problem solver for any
              freelance web or system project.
            </p>

            <p
              class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed"
            >
              Although my current focus is Development, my heart beats for
              <b>Network Engineering</b>. It's a passion I actively keep alive
              in the background, hoping to one day merge my software skills with
              network infrastructure.
            </p>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="stat-card group">
              <h3
                class="text-4xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
              >
                2+
              </h3>
              <p
                class="text-sm font-mono text-slate-500 tracking-wider uppercase"
              >
                Years Exp
              </p>
            </div>
            <div class="stat-card group">
              <h3
                class="text-4xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
              >
                10+
              </h3>
              <p
                class="text-sm font-mono text-slate-500 tracking-wider uppercase"
              >
                Projects
              </p>
            </div>
            <div class="stat-card group">
              <h3
                class="text-4xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
              >
                24/7
              </h3>
              <p
                class="text-sm font-mono text-slate-500 tracking-wider uppercase"
              >
                Caffeinated
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Section wrapped in a "Container" -->
      <div class="mt-32">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h3
              class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2"
            >
              Tech Stack
            </h3>
            <p class="text-slate-600 dark:text-slate-400">
              Tools I use to build the future.
            </p>
          </div>
          <div class="hidden md:block">
            <div
              class="h-px w-32 bg-gradient-to-r from-emerald-500/50 to-transparent"
            ></div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Skill Category 1 -->
          <div class="skill-group">
            <h4
              class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mb-4 tracking-wider uppercase"
            >
              // Core
            </h4>
            <div class="flex flex-wrap gap-2">
              <span class="skill-pill">Vue.js</span>
              <span class="skill-pill">TypeScript</span>
              <span class="skill-pill">Tailwind CSS</span>
              <span class="skill-pill">HTML5</span>
            </div>
          </div>

          <!-- Skill Category 2 -->
          <div class="skill-group">
            <h4
              class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mb-4 tracking-wider uppercase"
            >
              // Backend
            </h4>
            <div class="flex flex-wrap gap-2">
              <span class="skill-pill">Node.js</span>
              <span class="skill-pill">Firebase</span>
              <span class="skill-pill">Supabase</span>
              <span class="skill-pill">MySQL</span>
            </div>
          </div>

          <!-- Skill Category 3 -->
          <div class="skill-group">
            <h4
              class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mb-4 tracking-wider uppercase"
            >
              // Tools
            </h4>
            <div class="flex flex-wrap gap-2">
              <span class="skill-pill">Git</span>
              <span class="skill-pill">VS Code</span>
              <span class="skill-pill">Vite</span>
              <span class="skill-pill">Figma</span>
            </div>
          </div>

          <!-- Skill Category 4 -->
          <div class="skill-group">
            <h4
              class="text-emerald-600 dark:text-emerald-400 font-mono text-sm mb-4 tracking-wider uppercase"
            >
              // Hardware
            </h4>
            <div class="flex flex-wrap gap-2">
              <span class="skill-pill">PC Repair</span>
              <span class="skill-pill">Networking</span>
              <span class="skill-pill">IT Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

/* Glass Panel Styling */
.glass-panel {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Stat Card */
.stat-card {
  @apply bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/5 p-6 rounded-3xl transition-all duration-300 backdrop-blur-sm;
}

.stat-card:hover {
  @apply bg-white/80 dark:bg-white/10 dark:border-emerald-500/20 shadow-lg transform -translate-y-1;
}

/* Skill Pill */
.skill-pill {
  @apply px-4 py-2 text-sm rounded-full transition-all duration-200 cursor-default bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/5 text-slate-600 dark:text-slate-400 backdrop-blur-sm;
}

.skill-pill:hover {
  @apply bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20;
}
</style>
