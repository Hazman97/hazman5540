<template>
  <section id="about" class="py-20 relative overflow-hidden">
    <!-- Dynamic Background -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:from-transparent dark:via-secondary/30 dark:to-transparent"
    ></div>

    <!-- Parallax Background Orbs -->
    <div
      class="parallax-bg absolute inset-0 pointer-events-none"
      ref="parallaxContainer"
    >
      <div
        class="absolute top-0 left-0 w-[600px] h-[600px] rounded-full transition-transform duration-300"
        :style="{
          transform: `translate(${scrollOffset * 0.1}px, ${
            scrollOffset * 0.05
          }px)`,
          background:
            'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full transition-transform duration-300"
        :style="{
          transform: `translate(${scrollOffset * -0.08}px, ${
            scrollOffset * -0.04
          }px)`,
          background:
            'radial-gradient(circle, rgba(20,184,166,0.2) 0%, rgba(6,182,212,0.08) 50%, transparent 70%)',
          filter: 'blur(50px)',
        }"
      ></div>
    </div>

    <!-- Floating Decorative Elements -->
    <div
      class="absolute top-20 left-[5%] w-16 h-16 border-2 border-teal-500/20 rounded-xl rotate-12 animate-float-slow"
    ></div>
    <div
      class="absolute top-40 right-[8%] w-12 h-12 border-2 border-purple-500/20 rounded-full animate-float"
    ></div>
    <div
      class="absolute bottom-40 left-[12%] w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg animate-float-fast"
    ></div>
    <div
      class="absolute bottom-20 right-[15%] w-20 h-20 border border-pink-400/20 rounded-full animate-float-rotate"
    ></div>

    <div
      class="container mx-auto px-[5%] md:px-[10%] lg:px-[15%] relative z-10"
    >
      <!-- Section Header with Animation -->
      <div class="text-center mb-16">
        <p
          class="text-teal-500 dark:text-accent font-mono text-sm mb-3 tracking-widest reveal"
          ref="reveal1"
        >
          <span
            class="inline-block w-8 h-px bg-teal-500 dark:bg-accent mr-2 align-middle"
          ></span>
          ABOUT ME
          <span
            class="inline-block w-8 h-px bg-teal-500 dark:bg-accent ml-2 align-middle"
          ></span>
        </p>
        <h2
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-heading reveal"
          ref="reveal2"
        >
          Get to know <span class="gradient-text-animated">me better</span>
        </h2>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-5 gap-12 items-center mb-24">
        <!-- Profile Image with Enhanced Effects -->
        <div class="lg:col-span-2 flex justify-center reveal" ref="reveal3">
          <div class="relative group">
            <!-- Animated Glow Ring -->
            <div
              class="absolute -inset-6 bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-700 animate-pulse-slow"
            ></div>

            <!-- Rotating Border -->
            <div class="absolute -inset-3 rounded-2xl overflow-hidden">
              <div
                class="absolute inset-0 bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 animate-spin-slow"
                style="animation-duration: 8s"
              ></div>
            </div>

            <!-- Image Container -->
            <div class="relative bg-slate-100 dark:bg-secondary p-1 rounded-xl">
              <img
                src="/test.png"
                alt="Profile"
                class="relative w-64 h-64 md:w-72 md:h-72 object-cover rounded-xl transform group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>

            <!-- Floating Badge -->
            <div
              class="absolute -bottom-4 -right-4 glass-card px-5 py-2.5 rounded-full animate-float shadow-lg"
            >
              <span
                class="text-sm font-mono text-teal-600 dark:text-accent font-medium"
                >💻 Frontend Dev</span
              >
            </div>

            <!-- Experience Badge -->
            <div
              class="absolute -top-4 -left-4 glass-card px-4 py-2 rounded-full animate-float-delayed shadow-lg"
            >
              <span
                class="text-sm font-mono text-purple-600 dark:text-purple-400 font-medium"
                >2+ Years</span
              >
            </div>
          </div>
        </div>

        <!-- About Text with Enhanced Cards -->
        <div class="lg:col-span-3 space-y-8 reveal" ref="reveal4">
          <div
            class="glass-card p-8 rounded-3xl space-y-5 hover:shadow-xl transition-shadow duration-500"
          >
            <p class="text-slate-600 dark:text-text text-lg leading-relaxed">
              I'm a front-end enthusiast gaining practical experience in the
              field. After completing an internship, I've transitioned into a
              role as a Front End Developer. Passionate about web development,
            </p>
            <p class="text-slate-600 dark:text-text text-lg leading-relaxed">
              I'm also intrigued by networking and computer support technology.
              With a solid foundation in these areas and a commitment to ongoing
              learning,
            </p>
            <p class="text-slate-600 dark:text-text text-lg leading-relaxed">
              I'm eager to explore opportunities that allow me to contribute to
              front-end development or IT support roles.
            </p>
          </div>

          <!-- Stats Grid with Hover Effects -->
          <div class="grid grid-cols-3 gap-4">
            <div
              class="glass-card p-6 rounded-2xl text-center group hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-default"
            >
              <p class="text-4xl font-bold gradient-text-animated">2+</p>
              <p class="text-sm text-slate-500 dark:text-text font-mono mt-2">
                Years Exp
              </p>
            </div>
            <div
              class="glass-card p-6 rounded-2xl text-center group hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-default"
            >
              <p class="text-4xl font-bold gradient-text-animated">10+</p>
              <p class="text-sm text-slate-500 dark:text-text font-mono mt-2">
                Projects
              </p>
            </div>
            <div
              class="glass-card p-6 rounded-2xl text-center group hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-default"
            >
              <p class="text-4xl font-bold gradient-text-animated">5+</p>
              <p class="text-sm text-slate-500 dark:text-text font-mono mt-2">
                Clients
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <div class="reveal" ref="reveal5">
        <div class="text-center mb-12">
          <h3
            class="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-heading"
          >
            <span class="gradient-text-animated">Skills</span> & Technologies
          </h3>
        </div>

        <!-- Skills Grid with Enhanced Cards -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Programming Languages -->
          <div
            class="skill-card glass-card p-6 rounded-2xl group hover:scale-[1.03] transition-all duration-500 reveal stagger-1"
            ref="skill1"
          >
            <div class="flex items-center gap-3 mb-5">
              <div
                class="p-3 bg-gradient-to-br from-teal-500 to-cyan-400 rounded-xl text-white group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-teal-500/30"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  ></path>
                </svg>
              </div>
              <h4 class="text-lg font-bold text-slate-800 dark:text-heading">
                Languages
              </h4>
            </div>
            <div class="space-y-3">
              <div
                v-for="skill in languages"
                :key="skill.name"
                class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-primary/50 transition-colors"
              >
                <span class="font-mono text-sm text-slate-600 dark:text-text">{{
                  skill.name
                }}</span>
                <span
                  class="px-2 py-1 text-xs font-mono rounded-full"
                  :class="getLevelClass(skill.level)"
                  >{{ skill.level }}</span
                >
              </div>
            </div>
          </div>

          <!-- Frameworks -->
          <div
            class="skill-card glass-card p-6 rounded-2xl group hover:scale-[1.03] transition-all duration-500 reveal stagger-2"
            ref="skill2"
          >
            <div class="flex items-center gap-3 mb-5">
              <div
                class="p-3 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl text-white group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-purple-500/30"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  ></path>
                </svg>
              </div>
              <h4 class="text-lg font-bold text-slate-800 dark:text-heading">
                Frameworks
              </h4>
            </div>
            <div class="space-y-3">
              <div
                v-for="skill in frameworks"
                :key="skill.name"
                class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-primary/50 transition-colors"
              >
                <span class="font-mono text-sm text-slate-600 dark:text-text">{{
                  skill.name
                }}</span>
                <span
                  class="px-2 py-1 text-xs font-mono rounded-full"
                  :class="getLevelClass(skill.level)"
                  >{{ skill.level }}</span
                >
              </div>
            </div>
          </div>

          <!-- Backend & Database -->
          <div
            class="skill-card glass-card p-6 rounded-2xl group hover:scale-[1.03] transition-all duration-500 reveal stagger-3"
            ref="skill3"
          >
            <div class="flex items-center gap-3 mb-5">
              <div
                class="p-3 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl text-white group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-emerald-500/30"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  ></path>
                </svg>
              </div>
              <h4 class="text-lg font-bold text-slate-800 dark:text-heading">
                Backend
              </h4>
            </div>
            <div class="space-y-3">
              <div
                v-for="skill in backend"
                :key="skill.name"
                class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-primary/50 transition-colors"
              >
                <span class="font-mono text-sm text-slate-600 dark:text-text">{{
                  skill.name
                }}</span>
                <span
                  class="px-2 py-1 text-xs font-mono rounded-full"
                  :class="getLevelClass(skill.level)"
                  >{{ skill.level }}</span
                >
              </div>
            </div>
          </div>

          <!-- DevOps & Tools -->
          <div
            class="skill-card glass-card p-6 rounded-2xl group hover:scale-[1.03] transition-all duration-500 reveal stagger-4"
            ref="skill4"
          >
            <div class="flex items-center gap-3 mb-5">
              <div
                class="p-3 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl text-white group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-orange-500/30"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <h4 class="text-lg font-bold text-slate-800 dark:text-heading">
                DevOps
              </h4>
            </div>
            <div class="space-y-3">
              <div
                v-for="skill in devops"
                :key="skill.name"
                class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-primary/50 transition-colors"
              >
                <span class="font-mono text-sm text-slate-600 dark:text-text">{{
                  skill.name
                }}</span>
                <span
                  class="px-2 py-1 text-xs font-mono rounded-full"
                  :class="getLevelClass(skill.level)"
                  >{{ skill.level }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Skills Row -->
        <div class="mt-8 grid md:grid-cols-2 gap-6">
          <!-- Software -->
          <div
            class="glass-card p-6 rounded-2xl reveal hover:shadow-xl transition-all duration-500"
            ref="skill5"
          >
            <h4
              class="text-lg font-bold text-slate-800 dark:text-heading mb-4 flex items-center gap-2"
            >
              <span class="text-2xl">🎨</span> Creative Software
            </h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="sw in software"
                :key="sw"
                class="px-4 py-2 glass rounded-full font-mono text-sm text-slate-600 dark:text-text hover:text-teal-500 dark:hover:text-accent hover:scale-105 transition-all duration-300 cursor-default"
              >
                {{ sw }}
              </span>
            </div>
          </div>

          <!-- Technical Skills -->
          <div
            class="glass-card p-6 rounded-2xl reveal hover:shadow-xl transition-all duration-500"
            ref="skill6"
          >
            <h4
              class="text-lg font-bold text-slate-800 dark:text-heading mb-4 flex items-center gap-2"
            >
              <span class="text-2xl">🔧</span> Technical Skills
            </h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in technicalSkills"
                :key="tech"
                class="px-4 py-2 glass rounded-full font-mono text-sm text-slate-600 dark:text-text hover:text-teal-500 dark:hover:text-accent hover:scale-105 transition-all duration-300 cursor-default"
              >
                {{ tech }}
              </span>
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
  data() {
    return {
      scrollOffset: 0,
      languages: [
        { name: "TypeScript", level: "Intermediate" },
        { name: "JavaScript", level: "Intermediate" },
        { name: "HTML/CSS", level: "Advanced" },
        { name: "Java", level: "Basic" },
      ],
      frameworks: [
        { name: "Vue.js", level: "Advanced" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "Node.js", level: "Intermediate" },
        { name: "PHP", level: "Basic" },
      ],
      backend: [
        { name: "MySQL", level: "Intermediate" },
        { name: "Firebase", level: "Intermediate" },
        { name: "Supabase", level: "Basic" },
        { name: "REST APIs", level: "Intermediate" },
      ],
      devops: [
        { name: "Nginx", level: "Basic" },
        { name: "IIS", level: "Basic" },
        { name: "Cloudflare", level: "Basic" },
        { name: "Git", level: "Intermediate" },
      ],
      software: ["Photoshop", "Premier Pro", "Capcut", "VS Code"],
      technicalSkills: [
        "PC Repair",
        "Network Setup",
        "IT Support",
        "Desktop Support",
      ],
    };
  },
  mounted() {
    this.setupIntersectionObserver();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const rect = this.$el.getBoundingClientRect();
      this.scrollOffset = -rect.top * 0.3;
    },
    getLevelClass(level) {
      switch (level) {
        case "Advanced":
          return "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-600 dark:text-accent";
        case "Intermediate":
          return "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-600 dark:text-blue-400";
        default:
          return "bg-slate-500/20 text-slate-600 dark:text-slate-400";
      }
    },
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
/* Reveal Animation */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.stagger-1 {
  transition-delay: 0.1s;
}
.stagger-2 {
  transition-delay: 0.2s;
}
.stagger-3 {
  transition-delay: 0.3s;
}
.stagger-4 {
  transition-delay: 0.4s;
}

/* Gradient Text Animation */
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

/* Floating Animations */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
  animation: float 8s ease-in-out infinite;
}

.animate-float-fast {
  animation: float 4s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 6s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-float-rotate {
  animation: floatRotate 10s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes floatRotate {
  0%,
  100% {
    transform: rotate(0deg) translateY(0);
  }
  50% {
    transform: rotate(10deg) translateY(-15px);
  }
}

/* Pulse Slow */
.animate-pulse-slow {
  animation: pulseSlow 4s ease-in-out infinite;
}

@keyframes pulseSlow {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

/* Spin Slow */
.animate-spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Skill Card Hover Effects */
.skill-card {
  position: relative;
  overflow: hidden;
}

.skill-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.skill-card:hover::before {
  left: 100%;
}
</style>
