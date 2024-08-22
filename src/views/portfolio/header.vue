<template>
    <header class="py-4 px-[15%] bg-white/30 dark:bg-[#0a192f]/10 shadow-md backdrop-blur-sm sticky z-200">
      <div class="container mx-auto flex items-center justify-between">
        <a ref="/" class="font-bold text-2xl text-black dark:text-white">
          MAN <span class="text-teal-300">.</span>
        </a>
        <div class="hidden xl:flex items-center">
          <nav>
            <ul class="flex item-center gap-8 font-semibold uppercase text-black dark:text-white">
              <li><router-link class="hover:text-teal-400" :to="{name:'portfolio'}">Home</router-link></li>
              
           
              <li><router-link class="hover:text-teal-300" :to="{name:'about'}">About</router-link></li>
              <li><router-link class="hover:text-teal-300" to="/Project">Project</router-link></li>
              <li><router-link class="hover:text-teal-300" to="/contact">Contact</router-link></li>
            </ul>
          </nav>
        </div>
        <nav>
          <ul>
            <li>
              <button @click="toggleDarkMode" class="transition duration-500">
                <span v-if="isDarkMode" class="dark-icon">☀️</span>
                <span v-else class="light-icon">🌙</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: "Header",
    data() {
      return {
        isDarkMode: false,
      };
    },
    mounted() {
    const userPreference = localStorage.getItem('darkMode');

    if (userPreference !== null) {
      // User has a preference stored in localStorage
      this.isDarkMode = userPreference === 'true';
    } else {
      // No user preference, check the system's theme preference
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Apply the theme based on the determined preference
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
    methods: {
      toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        document.documentElement.classList.toggle('dark', this.isDarkMode);
        localStorage.setItem('darkMode', this.isDarkMode);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add styles for dark and light icons */
  .dark-icon, .light-icon {
    font-size: 1.5rem;
    transition: transform 0.3s;
  }
  
  button:hover .dark-icon, button:hover .light-icon {
    transform: rotate(360deg);
  }
  </style>