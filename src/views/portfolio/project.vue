<template>
  <section id="projects" class="py-20 relative overflow-hidden">
    <!-- Animated Background -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-primary dark:via-[#0d1f3c] dark:to-primary"
    ></div>

    <!-- Parallax Background Elements -->
    <div
      class="absolute top-0 right-0 w-[700px] h-[700px] rounded-full"
      :style="{
        transform: `translate(${scrollOffset * 0.05}px, ${
          scrollOffset * 0.02
        }px)`,
        background:
          'radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)',
        filter: 'blur(80px)',
      }"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
      :style="{
        transform: `translate(${scrollOffset * -0.04}px, ${
          scrollOffset * -0.02
        }px)`,
        background:
          'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 40%, transparent 70%)',
        filter: 'blur(70px)',
      }"
    ></div>

    <!-- Floating Decorations -->
    <div
      class="absolute top-32 left-[8%] w-14 h-14 border-2 border-teal-500/20 rounded-lg rotate-12 animate-float"
    ></div>
    <div
      class="absolute top-48 right-[12%] w-10 h-10 border-2 border-purple-500/20 rounded-full animate-float-slow"
    ></div>
    <div
      class="absolute bottom-32 left-[15%] w-8 h-8 bg-gradient-to-br from-cyan-400/15 to-blue-500/15 rounded-lg animate-float-fast"
    ></div>
    <div
      class="absolute bottom-48 right-[10%] w-16 h-16 border border-pink-400/20 rounded-xl rotate-6 animate-float-rotate"
    ></div>

    <div
      class="container mx-auto px-[5%] md:px-[10%] lg:px-[15%] relative z-10"
    >
      <!-- Section Header -->
      <div class="text-center mb-16">
        <p
          class="text-teal-500 dark:text-accent font-mono text-sm mb-3 tracking-widest reveal"
        >
          <span
            class="inline-block w-8 h-px bg-teal-500 dark:bg-accent mr-2 align-middle"
          ></span>
          PORTFOLIO
          <span
            class="inline-block w-8 h-px bg-teal-500 dark:bg-accent ml-2 align-middle"
          ></span>
        </p>
        <h2
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-heading reveal"
        >
          Featured <span class="gradient-text-animated">Projects</span>
        </h2>
        <p
          class="text-slate-500 dark:text-text mt-4 max-w-2xl mx-auto reveal text-lg"
        >
          A collection of projects I've worked on, from AI-powered tools to
          full-stack applications.
        </p>
      </div>

      <!-- Vibe Coder Section -->
      <div class="mb-20 reveal">
        <div class="flex items-center gap-4 mb-10">
          <div
            class="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl text-white shadow-lg shadow-purple-500/30 animate-pulse-slow"
          >
            <span class="text-2xl">✨</span>
          </div>
          <div>
            <h3
              class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-heading"
            >
              Vibe Coder
            </h3>
            <p class="text-slate-500 dark:text-text text-sm font-mono">
              AI-Assisted Development Projects
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(project, index) in vibeCoderProjects"
            :key="index"
            class="project-card group relative glass-card rounded-3xl overflow-hidden cursor-pointer reveal"
            :class="'stagger-' + (index + 1)"
            @click="navigateToProject(project.url)"
          >
            <!-- Image Container with Parallax Effect -->
            <div class="relative h-56 overflow-hidden">
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"
              ></div>
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transform group-hover:scale-115 transition-transform duration-700"
              />
              <!-- Floating Tag -->
              <div class="absolute top-4 left-4 z-20">
                <span
                  class="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-mono rounded-full shadow-lg"
                >
                  {{ project.tag || "Vibe Coder" }}
                </span>
              </div>
              <!-- View Icon -->
              <div
                class="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 -translate-y-2"
              >
                <div class="p-3 glass rounded-full backdrop-blur-md">
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </div>
              </div>
              <!-- Title Overlay -->
              <div class="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h4
                  class="text-xl font-bold text-white mb-1 group-hover:text-teal-400 transition-colors duration-300"
                >
                  {{ project.title }}
                </h4>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <p
                class="text-slate-500 dark:text-text text-sm leading-relaxed line-clamp-2 mb-4"
              >
                {{ project.description }}
              </p>
              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="px-3 py-1 text-xs font-mono bg-slate-100 dark:bg-primary text-slate-600 dark:text-text rounded-full hover:text-teal-500 dark:hover:text-accent transition-colors"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Animated Border on Hover -->
            <div
              class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-teal-500/50 dark:group-hover:border-accent/50 transition-all duration-500 pointer-events-none"
            ></div>

            <!-- Shimmer Effect -->
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-3xl"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer-animation"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Standard Projects Section -->
      <div class="reveal">
        <div class="flex items-center gap-4 mb-10">
          <div
            class="p-4 bg-gradient-to-br from-teal-500 to-cyan-400 rounded-2xl text-white shadow-lg shadow-teal-500/30"
          >
            <span class="text-2xl">💻</span>
          </div>
          <div>
            <h3
              class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-heading"
            >
              Standard Projects
            </h3>
            <p class="text-slate-500 dark:text-text text-sm font-mono">
              Full-Stack & Web Applications
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(project, index) in standardProjects"
            :key="index"
            class="project-card group relative glass-card rounded-3xl overflow-hidden cursor-pointer reveal"
            :class="'stagger-' + (index + 1)"
            @click="navigateToProject(project.url)"
          >
            <!-- Image Container -->
            <div class="relative h-48 overflow-hidden">
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"
              ></div>
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transform group-hover:scale-115 transition-transform duration-700"
              />
              <!-- View Icon -->
              <div
                class="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 -translate-y-2"
              >
                <div class="p-3 glass rounded-full backdrop-blur-md">
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </div>
              </div>
              <!-- Title Overlay -->
              <div class="absolute bottom-0 left-0 right-0 p-5 z-20">
                <h4
                  class="text-lg font-bold text-white group-hover:text-teal-400 transition-colors duration-300"
                >
                  {{ project.title }}
                </h4>
              </div>
            </div>

            <!-- Content -->
            <div class="p-5">
              <p
                class="text-slate-500 dark:text-text text-sm leading-relaxed line-clamp-2 mb-4"
              >
                {{ project.description }}
              </p>
              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="px-2.5 py-1 text-xs font-mono bg-slate-100 dark:bg-primary text-slate-600 dark:text-text rounded-full hover:text-teal-500 dark:hover:text-accent transition-colors"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Animated Border on Hover -->
            <div
              class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-teal-500/50 dark:group-hover:border-accent/50 transition-all duration-500 pointer-events-none"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Project",
  data() {
    return {
      scrollOffset: 0,
      vibeCoderProjects: [
        {
          image: "/img/confession_bot.png",
          title: "Confession Bot",
          description:
            "An anonymous confession bot for Discord servers. Allows users to submit confessions anonymously to specified channels.",
          url: "https://hazman97.github.io/confession_bot/",
          tag: "Discord Bot",
          tech: ["Node.js", "Discord.js", "JavaScript"],
        },
        {
          image: "/img/restaurant_pos.png",
          title: "Restaurant POS System",
          description:
            "A modern Point of Sale system for restaurants, featuring order management, menu customization, and sales tracking.",
          url: "https://ai.studio/apps/drive/1tJn3zeR29PWV4KiSQVXq0cQbwwsUUUKW",
          tag: "AI Studio",
          tech: ["Vue.js", "Tailwind", "Firebase"],
        },
        {
          image: "/img/birthday_wish.png",
          title: "Birthday Wish Creator",
          description:
            "A beautiful multi-user birthday page system with customizable templates, YouTube music integration, and wish submission forms.",
          url: "/birthday/create",
          tag: "Web App",
          tech: ["Vue.js", "Supabase", "Tailwind"],
        },
      ],
      standardProjects: [
        {
          image: "/img/photo_collection.png",
          title: "Photo Collection",
          description:
            "I enjoy photography, traveling, and creating wonderful memories. A curated collection of my best shots from various locations.",
          url: "/photocollection",
          tech: ["Vue.js", "Firebase", "Tailwind"],
        },
        {
          image:
            "https://lh3.googleusercontent.com/pw/AP1GczMNCIpsHKnLpnA9qz05eUZXfJMrNeuY4MeN-gDF7jAdiCZNsk_rGOsPjZ-U2B5fL3QlsOrystGYZ8abKnxJmFIs4Z3Qrk4nWnIYs6BKgmJvBTo8sqUY8Sh3XrJvlHfFgU_1rx456dhbnGdYcpOrsmSL=w1848-h786-s-no-gm?authuser=0",
          title: "Tasmik System",
          description:
            "A comprehensive system for schools to manage student records, tasmik progress, attendance, and user roles.",
          url: "http://[2001:f40:935:99c:6806:fc47:e2f3:97e7]:5175",
          tech: ["Vue.js", "Tailwind", "Supabase"],
        },
        {
          image:
            "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop",
          title: "Safety Portal",
          description:
            "A centralized portal for managing security and safety protocols, incident reporting, and compliance tracking.",
          url: "#",
          tech: ["Vue.js", "MySQL", "PHP"],
        },
        {
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
          title: "Organization Chart",
          description:
            "Interactive organization chart visualization tool helping teams understand structure and hierarchy.",
          url: "/org-demo",
          tech: ["Vue.js", "D3.js", "Tailwind"],
        },
        {
          image:
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
          title: "E-Claim System",
          description:
            "Streamlined expense claim management system allowing employees to submit and track claims efficiently.",
          url: "#",
          tech: ["Vue.js", "Node.js", "MySQL"],
        },
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
      this.scrollOffset = -rect.top * 0.2;
    },
    navigateToProject(url) {
      if (url === "#") return;
      if (this.isExternalLink(url)) {
        window.open(url, "_blank");
      } else {
        this.$router.push(url);
      }
    },
    isExternalLink(url) {
      return url.startsWith("http");
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
.stagger-5 {
  transition-delay: 0.5s;
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

/* Project Card Effects */
.project-card {
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Image Scale on Hover */
.group-hover\:scale-115:hover {
  transform: scale(1.15);
}

/* Shimmer Animation */
.shimmer-animation {
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
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

.animate-float-rotate {
  animation: floatRotate 10s ease-in-out infinite;
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
  animation: pulseSlow 3s ease-in-out infinite;
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
</style>
