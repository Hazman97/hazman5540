<template>
  <header
    class="py-4 px-[15%] bg-white/30 dark:bg-[#0a192f]/10 shadow-md backdrop-blur-sm sticky z-200"
  >
    <div class="container mx-auto flex items-center justify-between">
      <a href="/photocollection" class="font-bold text-2xl text-black dark:text-white">
        MAN <span class="text-teal-300">.</span>
      </a>
      <!-- <div class="hidden xl:flex items-center">
        <nav>
          <ul
            class="flex item-center gap-8 font-semibold uppercase text-black dark:text-white"
          >
            <li>
              <router-link
                class="hover:text-teal-400"
                :to="{ name: 'portfolio' }"
                >Home</router-link
              >
            </li>

            <li>
              <router-link class="hover:text-teal-300" :to="{ name: 'about' }"
                >About</router-link
              >
            </li>
            <li>
              <router-link class="hover:text-teal-300" to="/Project"
                >Project</router-link
              >
            </li>
            <li>
              <router-link class="hover:text-teal-300" to="/contact"
                >Contact</router-link
              >
            </li>
          </ul>
        </nav>
      </div> -->
      <nav>
        <ul class="flex">
          <li>
            <div class="relative group">
              <select
              v-model="selectedCountry"
              @change="navigateToCountry"
              class="appearance-none bg-transparent p-2 dark:text-white cursor-pointer group-hover:block font-semibold uppercase"
              style="border: none; outline: none;"
              >
                <option value="" disabled class="text-gray-500">Malaysia</option>
                <option
                v-for="country in countries"
                :key="country"
                :value="country"
                class="bg-white dark:bg-[#0a192f] text-black dark:text-white hover:bg-teal-300"
                >
                {{ country }}
                </option>
              </select>
              <div class="absolute inset-0 pointer-events-none border-b-2 border-transparent group-hover:border-teal-300 transition duration-300"></div>
            </div>
          </li>

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
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
export default {
  name: "Header",
  data() {
    return {
      isDarkMode: false,
      countries: [],
      countryName: "Malaysia",
      selectedCountry: "",
    };
  },
  watch: {
    "$route.params.location"(newLocation) {
      this.selectedCountry = newLocation;
      console.log("newLocation", newLocation);
      console.log("selectedCountry", this.selectedCountry);
    },
  },
  mounted() {
    this.fetchCountries();

    const userPreference = localStorage.getItem("darkMode");

    if (userPreference !== null) {
      // User has a preference stored in localStorage
      this.isDarkMode = userPreference === "true";
    } else {
      // No user preference, check the system's theme preference
      this.isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    }

    // Apply the theme based on the determined preference
    if (this.isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
  methods: {
    navigateToCountry() {
      if (this.selectedCountry) {
        this.$router.push(
          `/country/${this.countryName}/location/${this.selectedCountry}`
        );
      }
    },
    async fetchCountries() {
      try {
        // Query the 'countries' collection for the selected country
        const q = query(
          collection(db, "countries"),
          where("country", "==", this.countryName)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const countryData = querySnapshot.docs[0].data();
          // Filter images that belong to the selected location
          this.countries = countryData.location;
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.documentElement.classList.toggle("dark", this.isDarkMode);
      localStorage.setItem("darkMode", this.isDarkMode);
    },
  },
};
</script>

<style scoped>
/* Add styles for dark and light icons */
.dark-icon,
.light-icon {
  font-size: 1.5rem;
  transition: transform 0.3s;
}

button:hover .dark-icon,
button:hover .light-icon {
  transform: rotate(360deg);
}
</style>
