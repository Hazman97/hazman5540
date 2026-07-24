<template>
  <div class="relative bg-white dark:bg-primary transition-colors duration-300">
    <!-- Scroll Progress Bar -->
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>

    <!-- Navigation -->
    <navpage class="sticky top-0 z-50" />

    <!-- Hero Section -->
    <section id="home" class="parallax-section">
      <home />
    </section>

    <!-- About Section -->
    <section id="about" class="parallax-section">
      <about />
    </section>

    <!-- Experience Section -->
    <section id="experience" class="parallax-section">
      <resume />
    </section>

    <!-- Projects Section -->
    <section id="projects" class="parallax-section">
      <project />
    </section>

    <!-- Contact Section -->
    <section id="contact" class="parallax-section">
      <contact />
    </section>

    <!-- Footer -->
    <footer
      class="py-8 text-center border-t border-slate-200 dark:border-slate-800"
    >
      <p class="text-slate-500 dark:text-text text-sm font-mono">
        Designed & Built by
        <span class="text-teal-500 dark:text-accent">Hazman Adanan</span>
      </p>
      <p class="text-slate-400 dark:text-text/50 text-xs mt-2 font-mono">
        © {{ currentYear }} All rights reserved.
      </p>
      <!-- Visitor Counter -->
      <div class="mt-4 flex items-center justify-center gap-2">
        <div
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-teal-500 dark:text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span class="text-xs font-mono text-slate-600 dark:text-slate-300">
            {{ visitorCount !== null ? visitorCount.toLocaleString() : "..." }}
            visitor
          </span>
        </div>
      </div>
    </footer>

    <!-- Back to Top Button -->
    <transition name="fade">
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 p-4 glass-card rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 group"
      >
        <svg
          class="w-6 h-6 text-teal-500 dark:text-accent group-hover:-translate-y-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          ></path>
        </svg>
      </button>
    </transition>
  </div>
</template>

<script>
import project from "./project.vue";
import navpage from "./header.vue";
import contact from "./contact.vue";
import about from "./about.vue";
import resume from "./resume.vue";
import home from "./home.vue";
import { api } from "@/api/client";

export default {
  name: "Portfolio",
  components: {
    navpage,
    contact,
    project,
    about,
    resume,
    home,
  },
  data() {
    return {
      scrollProgress: 0,
      showBackToTop: false,
      currentYear: new Date().getFullYear(),
      visitorCount: null,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
    this.trackVisitor();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // Show/hide back to top button
      this.showBackToTop = scrollTop > 500;

      // Update CSS custom property for parallax effects
      document.documentElement.style.setProperty("--scroll", scrollTop);
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    async trackVisitor() {
      try {
        // We use the new Cloudflare backend API instead of Firebase.
        // The backend automatically reads and hashes the 'cf-connecting-ip' header securely.
        const data = await api.post("/portfolio/visitor", {});

        if (data && data.success && data.count) {
          this.visitorCount = data.count;
          localStorage.setItem("hazman5540_visitor_count", data.count.toString());
        }
      } catch (error) {
        console.error("❌ Error tracking visitor via API:", error);
        // Fallback to localStorage count if API fails
        this.visitorCount = parseInt(
          localStorage.getItem("hazman5540_visitor_count") || "1",
          10,
        );
      }
    },
  },
};
</script>

<style scoped>
.parallax-section {
  position: relative;
  z-index: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
