<template>
  <header
    class="py-4 px-[5%] md:px-[10%] lg:px-[15%] glass sticky top-0 z-50 transition-all duration-300"
  >
    <div class="container mx-auto flex items-center justify-between">
      <router-link
        to="/portfolio"
        class="group font-bold text-2xl text-slate-800 dark:text-heading font-mono flex items-center gap-1"
      >
        <span class="relative">
          MAN
          <span
            class="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 dark:bg-accent group-hover:w-full transition-all duration-300"
          ></span>
        </span>
        <span
          class="text-teal-500 dark:text-accent group-hover:rotate-180 transition-transform duration-500"
          >.</span
        >
      </router-link>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8">
        <nav>
          <ul
            class="flex items-center gap-8 font-medium text-sm font-mono text-slate-600 dark:text-text"
          >
            <li v-for="(item, index) in navItems" :key="item.name">
              <router-link
                :to="item.to"
                class="relative py-2 hover:text-teal-500 dark:hover:text-accent transition-colors group"
              >
                <span class="text-teal-500 dark:text-accent mr-1 text-xs"
                  >0{{ index + 1 }}.</span
                >
                {{ item.name }}
                <span
                  class="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 dark:bg-accent group-hover:w-full transition-all duration-300"
                ></span>
              </router-link>
            </li>
          </ul>
        </nav>
        <button
          @click="toggleDarkMode"
          class="p-3 rounded-xl glass hover:scale-110 transition-all duration-300 group"
        >
          <span v-if="isDarkMode" class="text-lg group-hover:animate-spin-slow"
            >☀️</span
          >
          <span v-else class="text-lg group-hover:animate-pulse">🌙</span>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden flex items-center gap-4">
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-xl glass transition-colors"
        >
          <span v-if="isDarkMode" class="text-lg">☀️</span>
          <span v-else class="text-lg">🌙</span>
        </button>
        <button
          @click="toggleMenu"
          class="p-2 text-slate-800 dark:text-heading focus:outline-none z-50 relative"
        >
          <div class="w-6 h-5 flex flex-col justify-between">
            <span
              :class="{ 'rotate-45 translate-y-2': isMenuOpen }"
              class="w-full h-0.5 bg-current transform transition-all duration-300 origin-center"
            ></span>
            <span
              :class="{ 'opacity-0 scale-0': isMenuOpen }"
              class="w-full h-0.5 bg-current transition-all duration-300"
            ></span>
            <span
              :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"
              class="w-full h-0.5 bg-current transform transition-all duration-300 origin-center"
            ></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
      <transition name="slide">
        <div
          v-if="isMenuOpen"
          class="fixed inset-y-0 right-0 w-[75vw] glass-card shadow-2xl md:hidden z-[60] flex flex-col justify-center items-center"
        >
          <!-- Close Button -->
          <button
            @click="toggleMenu"
            class="absolute top-6 right-6 p-2 glass rounded-full"
          >
            <svg
              class="w-6 h-6 text-slate-800 dark:text-heading"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <nav>
            <ul
              class="flex flex-col items-center gap-8 font-medium text-lg font-mono text-slate-600 dark:text-text"
            >
              <li v-for="(item, index) in navItems" :key="item.name">
                <router-link
                  @click="toggleMenu"
                  :to="item.to"
                  class="flex flex-col items-center hover:text-teal-500 dark:hover:text-accent transition-colors"
                >
                  <span
                    class="text-teal-500 dark:text-accent text-xs font-mono mb-1"
                    >0{{ index + 1 }}.</span
                  >
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </nav>

          <!-- Social Links -->
          <div class="absolute bottom-8 flex gap-4">
            <a
              href="https://github.com/hazman97"
              target="_blank"
              class="p-3 glass rounded-full hover:text-teal-500 dark:hover:text-accent transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                ></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              class="p-3 glass rounded-full hover:text-teal-500 dark:hover:text-accent transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </transition>

      <!-- Backdrop -->
      <transition name="fade">
        <div
          v-if="isMenuOpen"
          @click="toggleMenu"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] md:hidden"
        ></div>
      </transition>
    </Teleport>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isDarkMode: false,
      isMenuOpen: false,
      navItems: [
        { name: "Home", to: { name: "portfolio" } },
        { name: "About", to: "/portfolio#about" },
        { name: "Projects", to: "/portfolio#projects" },
        { name: "Contact", to: "/portfolio#contact" },
      ],
    };
  },
  mounted() {
    const userPreference = localStorage.getItem("darkMode");
    if (userPreference !== null) {
      this.isDarkMode = userPreference === "true";
    } else {
      this.isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    }
    this.applyTheme();
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("darkMode", this.isDarkMode);
      this.applyTheme();
    },
    applyTheme() {
      if (this.isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
