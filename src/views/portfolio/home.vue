<template>
  <div
    class="min-h-screen flex items-center justify-center px-[5%] md:px-[10%] lg:px-[15%] relative overflow-hidden"
  >
    <!-- Animated Gradient Background -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-primary dark:via-[#0d1f3c] dark:to-primary"
    ></div>

    <!-- Animated Grid Pattern -->
    <div class="absolute inset-0 opacity-30 dark:opacity-20">
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(20,184,166,0.1)_2px,transparent_2px)] bg-[size:60px_60px] animate-grid-move"
      ></div>
    </div>

    <!-- Floating Particles with Enhanced Animation -->
    <div class="particles-container absolute inset-0 pointer-events-none">
      <div
        v-for="n in 30"
        :key="n"
        class="particle-glow"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${100 + Math.random() * 20}%`,
          animationDuration: `${25 + Math.random() * 40}s`,
          animationDelay: `${Math.random() * 5}s`,
          width: `${3 + Math.random() * 8}px`,
          height: `${3 + Math.random() * 8}px`,
        }"
      ></div>
    </div>

    <!-- Dramatic Parallax Orbs with Enhanced Movement -->
    <div
      class="parallax-orb absolute -top-20 -right-32 w-[600px] h-[600px] rounded-full"
      :style="{
        transform: `translate(${mouseX * 0.000005}px, ${mouseY * 0.000005}px)`,
        background:
          'radial-gradient(circle, rgba(20,184,166,0.3) 0%, rgba(6,182,212,0.15) 50%, transparent 70%)',
        filter: 'blur(40px)',
      }"
    ></div>
    <div
      class="parallax-orb absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full"
      :style="{
        transform: `translate(${mouseX * -0.000004}px, ${
          mouseY * -0.000004
        }px)`,
        background:
          'radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(236,72,153,0.1) 50%, transparent 70%)',
        filter: 'blur(60px)',
      }"
    ></div>
    <div
      class="parallax-orb absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full animate-pulse-slow"
      :style="{
        transform: `translate(${mouseX * 0.000008}px, ${mouseY * 0.000008}px)`,
        background:
          'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 60%)',
        filter: 'blur(50px)',
      }"
    ></div>

    <!-- Floating Geometric Shapes - minimal mouse effect -->
    <div
      class="absolute top-20 right-[15%] w-20 h-20 border-2 border-teal-500/30 dark:border-accent/30 rounded-xl rotate-45 animate-float-rotate"
      :style="{
        transform: `rotate(${45 + mouseX * 0.00001}deg) translate(${
          mouseX * 0.000003
        }px, ${mouseY * 0.000003}px)`,
      }"
    ></div>
    <div
      class="absolute bottom-32 left-[10%] w-16 h-16 border-2 border-purple-500/30 rounded-full animate-float"
      :style="{
        transform: `translate(${mouseX * -0.000002}px, ${
          mouseY * -0.000002
        }px)`,
      }"
    ></div>
    <div
      class="absolute top-1/2 right-[8%] w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-teal-500/20 rounded-lg rotate-12 animate-float-fast"
      :style="{
        transform: `rotate(${12 + mouseX * 0.000005}deg) translate(${
          mouseX * 0.000004
        }px, ${mouseY * 0.000004}px)`,
      }"
    ></div>

    <!-- Small Floating Dots -->
    <div
      v-for="i in 8"
      :key="'dot-' + i"
      class="absolute w-2 h-2 bg-teal-500/40 dark:bg-accent/40 rounded-full animate-float"
      :style="{
        left: `${10 + i * 12}%`,
        top: `${20 + (i % 3) * 30}%`,
        animationDelay: `${i * 0.3}s`,
        animationDuration: `${8 + i * 1}s`,
      }"
    ></div>

    <div class="flex flex-col justify-center z-10 max-w-4xl">
      <p
        class="text-teal-500 dark:text-accent font-mono mb-5 animate-fade-in-down text-lg tracking-wider"
      >
        Hi, my name is
      </p>

      <!-- Enhanced Gradient Name with Animation -->
      <h1
        class="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in-up delay-100"
      >
        <span class="gradient-text-animated">Hazman Adanan.</span>
      </h1>

      <!-- Subtitle with Highlight -->
      <h2
        class="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-600 dark:text-text mb-8 animate-fade-in-up delay-200"
      >
        I build things for the
        <span class="relative inline-block">
          <span class="relative z-10 text-slate-800 dark:text-heading"
            >web</span
          >
          <span
            class="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-gradient-to-r from-teal-500/40 to-cyan-400/40 dark:from-accent/40 dark:to-cyan-400/40 -skew-x-6 rounded"
          ></span> </span
        >.
      </h2>

      <p
        class="text-slate-600 dark:text-text text-lg md:text-xl max-w-xl mb-12 leading-relaxed animate-fade-in-up delay-300"
      >
        I'm a Programmer with a strong background in IT Support and Networking.
        I combine coding expertise with a deep understanding of infrastructure
        to build efficient, well-supported software.
      </p>

      <!-- Enhanced Buttons -->
      <div class="flex flex-wrap gap-6 animate-fade-in-up delay-400">
        <router-link to="/portfolio#contact">
          <button
            class="group relative px-8 py-4 border-2 border-teal-500 dark:border-accent rounded-xl overflow-hidden transition-all duration-500 font-mono text-sm hover:shadow-lg hover:shadow-teal-500/25"
          >
            <span
              class="relative z-10 text-teal-500 dark:text-accent group-hover:text-white dark:group-hover:text-primary transition-colors duration-500 font-semibold"
              >Contact Me</span
            >
            <span
              class="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-accent dark:to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            ></span>
          </button>
        </router-link>

        <button
          @click="downloadResume"
          class="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-accent dark:to-cyan-400 text-white dark:text-primary rounded-xl font-mono text-sm font-bold shadow-lg shadow-teal-500/30 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/40"
        >
          <span class="relative z-10 flex items-center gap-2">
            <svg
              class="w-5 h-5 transform group-hover:animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Get My Resume
          </span>
          <span
            class="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></span>
        </button>
      </div>

      <!-- Tech Stack Preview with Hover Effects -->
      <div class="mt-16 animate-fade-in-up delay-500">
        <p
          class="text-slate-500 dark:text-text text-sm font-mono mb-4 flex items-center gap-2"
        >
          <span class="w-8 h-px bg-teal-500 dark:bg-accent"></span>
          Tech I work with
        </p>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="(tech, index) in techStack"
            :key="tech"
            class="px-4 py-2 text-sm font-mono text-slate-600 dark:text-text glass-card rounded-lg hover:text-teal-500 dark:hover:text-accent hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default"
            :style="{ animationDelay: `${0.5 + index * 0.1}s` }"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>

    <!-- Enhanced Scroll Indicator with Available Badge -->
    <div
      class="absolute bottom-8 right-8 flex items-end gap-4 animate-fade-in-up delay-600"
    >
      <!-- Available for work badge -->
      <div
        class="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full glow-sm"
      >
        <span class="relative flex h-2.5 w-2.5">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"
          ></span>
        </span>
        <p class="text-teal-600 dark:text-accent font-mono text-xs font-medium">
          Available for work
        </p>
      </div>
      <!-- Scroll indicator -->
      <div class="flex flex-col items-center gap-2">
        <span
          class="text-xs font-mono text-slate-400 dark:text-text/50 tracking-widest"
          >SCROLL</span
        >
        <div
          class="w-6 h-10 border-2 border-slate-300 dark:border-text/30 rounded-full flex justify-center pt-2"
        >
          <div
            class="w-1.5 h-3 bg-teal-500 dark:bg-accent rounded-full animate-scroll-indicator"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      techStack: [
        "Vue.js",
        "TypeScript",
        "Tailwind",
        "Node.js",
        "PHP",
        "MySQL",
      ],
    };
  },
  mounted() {
    window.addEventListener("mousemove", this.handleMouseMove);
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
  },
  methods: {
    handleMouseMove(e) {
      // Extremely minimal parallax movement
      this.mouseX = (e.clientX - window.innerWidth / 2) / 500;
      this.mouseY = (e.clientY - window.innerHeight / 2) / 500;
    },
    downloadResume() {
      const link = document.createElement("a");
      link.href = "/Hazman_resume_OCT2025.pdf";
      link.download = "Hazman_resume_OCT2025";
      link.click();
    },
  },
};
</script>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.delay-100 {
  animation-delay: 0.1s;
}
.delay-200 {
  animation-delay: 0.2s;
}
.delay-300 {
  animation-delay: 0.3s;
}
.delay-400 {
  animation-delay: 0.4s;
}
.delay-500 {
  animation-delay: 0.5s;
}
.delay-600 {
  animation-delay: 0.6s;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced Gradient Text Animation */
.gradient-text-animated {
  background: linear-gradient(
    135deg,
    #14b8a6 0%,
    #06b6d4 25%,
    #3b82f6 50%,
    #8b5cf6 75%,
    #14b8a6 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradientShift 4s ease infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Particles with Glow */
.particle-glow {
  position: absolute;
  background: radial-gradient(
    circle,
    rgba(20, 184, 166, 0.8) 0%,
    rgba(6, 182, 212, 0.4) 50%,
    transparent 70%
  );
  border-radius: 50%;
  animation: particleRise linear infinite;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);
}

@keyframes particleRise {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-120vh) translateX(30px) scale(0.5);
    opacity: 0;
  }
}

/* Parallax Orbs - No transition for minimal movement */
.parallax-orb {
  z-index: 0;
  will-change: transform;
}

/* Floating Animations */
.animate-float {
  animation: float 12s ease-in-out infinite;
}

.animate-float-slow {
  animation: float 16s ease-in-out infinite;
}

.animate-float-fast {
  animation: float 8s ease-in-out infinite;
}

.animate-float-rotate {
  animation: floatRotate 20s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(12deg);
  }
  50% {
    transform: translateY(-20px) rotate(12deg);
  }
}

@keyframes floatRotate {
  0%,
  100% {
    transform: rotate(6deg) translateY(0);
  }
  50% {
    transform: rotate(12deg) translateY(-15px);
  }
}

/* Pulse Slow */
.animate-pulse-slow {
  animation: pulseSlow 10s ease-in-out infinite;
}

@keyframes pulseSlow {
  0%,
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

/* Scroll Indicator Animation */
.animate-scroll-indicator {
  animation: scrollIndicator 2s ease-in-out infinite;
}

@keyframes scrollIndicator {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(8px);
    opacity: 0.5;
  }
}

/* Grid Movement Animation */
.animate-grid-move {
  animation: gridMove 60s linear infinite;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(60px, 60px);
  }
}

/* Small Glow */
.glow-sm {
  box-shadow: 0 0 20px rgba(20, 184, 166, 0.15);
}

.particles-container {
  z-index: 1;
}
</style>
