<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="{
      'bg-white/80 dark:bg-black/20 backdrop-blur-md border-b border-gray-200 dark:border-white/10 py-4': isScrolled,
      'bg-transparent py-6': !isScrolled
    }"
  >
    <div class="container mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/photocollection" class="group flex items-center gap-2">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-teal-500/50 transition-all duration-300">
          <span class="text-white font-bold text-xl">M</span>
        </div>
        <span class="font-bold text-2xl text-slate-800 dark:text-white tracking-tight group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
          MAN<span class="text-teal-500 dark:text-teal-400">.</span>
        </span>
      </router-link>

      <!-- Navigation -->
      <nav class="flex items-center gap-6">
        <!-- Country Selector with Nested Dropdown -->
        <div class="relative group hidden md:block">
          <button class="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-all duration-300 text-slate-700 dark:text-white/90 hover:text-black dark:hover:text-white">
            <span class="uppercase tracking-wider text-sm font-medium">{{ selectedCountry || 'Destinations' }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <!-- Main Dropdown (Countries) -->
          <div class="absolute right-0 mt-2 w-56 py-2 bg-white dark:bg-black/90 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 origin-top-right">
            <div 
              v-for="country in countries" 
              :key="country.id"
              class="relative group/item"
            >
              <!-- Country Item -->
              <div 
                @click="navigateToCountry(country.country)"
                class="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 cursor-pointer transition-colors flex items-center justify-between"
              >
                <span class="font-medium">{{ country.country }}</span>
                <svg v-if="country.locations && country.locations.length" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-50 group-hover/item:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <!-- Nested Dropdown (Locations) -->
              <div 
                v-if="country.locations && country.locations.length"
                class="absolute right-full top-0 mr-2 w-48 py-2 bg-white dark:bg-black/90 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-white/10 shadow-xl opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transform translate-x-2 group-hover/item:translate-x-0 transition-all duration-300"
              >
                <div class="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-gray-100 dark:border-white/5 mb-1">
                  {{ country.country }} Locations
                </div>
                <div 
                  v-for="location in country.locations" 
                  :key="location"
                  @click.stop="navigateToLocation(country.country, location)"
                  class="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 cursor-pointer transition-colors"
                >
                  {{ location }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Upload Link -->
        <router-link 
          to="/upload" 
          class="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 dark:bg-teal-500/20 hover:bg-teal-500/20 dark:hover:bg-teal-500/30 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 border border-teal-500/20 dark:border-teal-500/30 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span class="text-sm font-medium">Upload</span>
        </router-link>

        <!-- Dark Mode Toggle -->
        <button 
          @click="toggleDarkMode" 
          class="w-10 h-10 rounded-full bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <span v-if="isDarkMode" class="text-lg">☀️</span>
          <span v-else class="text-lg">🌙</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
  name: "Topbar",
  data() {
    return {
      isDarkMode: false,
      isScrolled: false,
      countries: [], // Will store objects: { id, country, locations: [] }
      selectedCountry: "",
    };
  },
  watch: {
    "$route.params.location"(newLocation) {
      if (newLocation) {
        this.selectedCountry = newLocation;
      }
    },
    "$route.params.name"(newCountry) {
      if (newCountry) {
        this.selectedCountry = newCountry;
      }
    }
  },
  mounted() {
    this.fetchCountries();
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);

    const userPreference = localStorage.getItem("darkMode");
    if (userPreference !== null) {
      this.isDarkMode = userPreference === "true";
    } else {
      this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    this.applyTheme();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    navigateToCountry(country) {
      this.selectedCountry = country;
      this.$router.push(`/country/${country}`);
    },
    navigateToLocation(country, location) {
      this.selectedCountry = country; // Or location, depending on preference
      this.$router.push(`/country/${country}/location/${location}`);
    },
    async fetchCountries() {
      try {
        const querySnapshot = await getDocs(collection(db, "countries"));
        this.countries = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            country: data.country,
            locations: data.location || [] // Ensure 'location' field matches your DB (array of strings)
          };
        });
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },
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
    }
  },
};
</script>
