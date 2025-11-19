<template>
  <header class="py-4 px-[5%] md:px-[10%] lg:px-[15%] bg-white/80 dark:bg-primary/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 shadow-sm">
    <div class="container mx-auto flex items-center justify-between">
      <router-link to="/" class="font-bold text-2xl text-slate-800 dark:text-heading font-mono">
        MAN <span class="text-teal-500 dark:text-accent">.</span>
      </router-link>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8">
        <nav>
          <ul class="flex items-center gap-8 font-medium text-sm font-mono text-slate-600 dark:text-text">
            <li><router-link class="hover:text-teal-500 dark:hover:text-accent transition-colors" :to="{name:'portfolio'}">Home</router-link></li>
            <li><router-link class="hover:text-teal-500 dark:hover:text-accent transition-colors" :to="{name:'about'}">About</router-link></li>
            <li><router-link class="hover:text-teal-500 dark:hover:text-accent transition-colors" to="/Project">Project</router-link></li>
            <li><router-link class="hover:text-teal-500 dark:hover:text-accent transition-colors" to="/contact">Contact</router-link></li>
          </ul>
        </nav>
        <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-secondary transition-colors group">
          <span v-if="isDarkMode" class="text-xl group-hover:text-yellow-400 transition-colors">☀️</span>
          <span v-else class="text-xl group-hover:text-slate-600 transition-colors">🌙</span>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden flex items-center gap-4">
        <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-secondary transition-colors">
          <span v-if="isDarkMode" class="text-lg">☀️</span>
          <span v-else class="text-lg">🌙</span>
        </button>
        <button @click="toggleMenu" class="p-2 text-slate-800 dark:text-heading focus:outline-none z-50 relative">
          <div class="w-6 h-5 flex flex-col justify-between">
            <span :class="{'rotate-45 translate-y-2': isMenuOpen}" class="w-full h-0.5 bg-current transform transition-all duration-300 origin-center"></span>
            <span :class="{'opacity-0': isMenuOpen}" class="w-full h-0.5 bg-current transition-all duration-300"></span>
            <span :class="{'-rotate-45 -translate-y-2': isMenuOpen}" class="w-full h-0.5 bg-current transform transition-all duration-300 origin-center"></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
      <div :class="{'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen}" class="fixed inset-y-0 right-0 w-[75vw] bg-white dark:bg-secondary shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden z-[60] flex flex-col justify-center items-center">
        <nav>
          <ul class="flex flex-col items-center gap-8 font-medium text-lg font-mono text-slate-600 dark:text-text">
            <li><router-link @click="toggleMenu" class="hover:text-teal-500 dark:hover:text-accent transition-colors" :to="{name:'portfolio'}">Home</router-link></li>
            <li><router-link @click="toggleMenu" class="hover:text-teal-500 dark:hover:text-accent transition-colors" :to="{name:'about'}">About</router-link></li>
            <li><router-link @click="toggleMenu" class="hover:text-teal-500 dark:hover:text-accent transition-colors" to="/Project">Project</router-link></li>
            <li><router-link @click="toggleMenu" class="hover:text-teal-500 dark:hover:text-accent transition-colors" to="/contact">Contact</router-link></li>
          </ul>
        </nav>
      </div>
      
      <!-- Backdrop -->
      <div v-if="isMenuOpen" @click="toggleMenu" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] md:hidden"></div>
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
    };
  },
  mounted() {
    const userPreference = localStorage.getItem('darkMode');
    if (userPreference !== null) {
      this.isDarkMode = userPreference === 'true';
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', this.isDarkMode);
      this.applyTheme();
    },
    applyTheme() {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }
};
</script>

<style scoped>
/* Scoped styles if needed, but Tailwind handles most */
</style>