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
import home from "./home.vue";

export default {
  name: "Portfolio",
  components: {
    navpage,
    contact,
    project,
    about,
    home,
  },
  data() {
    return {
      scrollProgress: 0,
      showBackToTop: false,
      currentYear: new Date().getFullYear(),
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
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
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
