<template>
  <div class="relative h-screen w-full overflow-hidden bg-black font-sans">
    <!-- Loading State -->
    <transition name="fade">
      <div
        v-if="loading"
        class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-primary text-white"
      >
        <div class="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-xl font-mono animate-pulse text-teal-500">Loading Collection...</p>
      </div>
    </transition>

    <!-- Main Content -->
    <div v-if="!loading" class="relative h-full w-full">
      <!-- Background Slideshow -->
      <div class="absolute inset-0 z-0">
        <transition-group name="zoom-fade">
          <div
            v-if="slides.length > 0"
            :key="slides[activeIndex]?.url"
            class="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105"
            :style="{ backgroundImage: `url(${slides[activeIndex]?.url})` }"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 backdrop-blur-[2px]"></div>
          </div>
        </transition-group>
      </div>

      <!-- Glassmorphism Sidebar / Drawer -->
      <div 
        class="absolute left-0 top-0 h-full w-full md:w-1/3 lg:w-1/4 bg-black/40 backdrop-blur-xl border-r border-white/10 z-20 transform transition-transform duration-500 ease-out"
        :class="{'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen && !isDesktop, 'translate-x-0': isDesktop}"
      >
        <div class="p-8 h-full flex flex-col">
          <h2 class="text-3xl font-bold text-white mb-2 tracking-tight">Photo<span class="text-teal-400">Collection</span></h2>
          <p class="text-slate-300 text-sm mb-8 font-mono">Curated shots from around the world.</p>
          
          <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <ul class="space-y-2">
              <li
                v-for="(images, country) in imagesByCountry"
                :key="country"
                @mouseenter="previewCountry(country)"
                @mouseleave="stopPreview"
                class="group"
              >
                <router-link 
                  :to="'/country/' + country"
                  class="flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/5 group-hover:translate-x-2"
                >
                  <span class="text-lg font-medium text-slate-200 group-hover:text-teal-400 transition-colors">{{ country }}</span>
                  <span class="text-xs font-mono text-slate-500 group-hover:text-white bg-white/5 px-2 py-1 rounded-full">{{ images.length }}</span>
                </router-link>
              </li>
            </ul>
          </div>

          <div class="mt-auto pt-8 border-t border-white/10">
            <router-link to="/" class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Portfolio</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Mobile Toggle -->
      <button 
        @click="isSidebarOpen = !isSidebarOpen"
        class="absolute top-4 left-4 z-30 p-2 bg-black/50 backdrop-blur-md rounded-lg text-white md:hidden hover:bg-teal-500/50 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Navigation Controls -->
      <div class="absolute bottom-10 right-10 z-20 flex gap-4">
        <button 
          @click="prevSlide"
          class="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-teal-500 hover:border-teal-500 transition-all duration-300 hover:scale-110 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          @click="nextSlide"
          class="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-teal-500 hover:border-teal-500 transition-all duration-300 hover:scale-110 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <div 
          class="h-full bg-teal-500 transition-all duration-300 ease-linear"
          :style="{ width: `${((activeIndex + 1) / slides.length) * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
  name: "HomeCollection",
  data() {
    return {
      slides: [],
      activeIndex: 0,
      imagesByCountry: {},
      autoSlideInterval: null,
      loading: true,
      isSidebarOpen: false,
      isDesktop: window.innerWidth >= 768,
      previewTimeout: null,
    };
  },
  async mounted() {
    window.addEventListener('resize', this.handleResize);
    await this.fetchImages();
    await this.showRandomImages();
    this.startAutoSlide();
    
    // Simulate minimum loading time for effect
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.stopAutoSlide();
  },
  methods: {
    handleResize() {
      this.isDesktop = window.innerWidth >= 768;
    },
    startAutoSlide() {
      this.stopAutoSlide();
      this.autoSlideInterval = setInterval(this.nextSlide, 5000); // Slower, more cinematic interval
    },
    stopAutoSlide() {
      if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
    },
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.slides.length;
    },
    prevSlide() {
      this.activeIndex = (this.activeIndex - 1 + this.slides.length) % this.slides.length;
    },
    async fetchImages() {
      try {
        const querySnapshot = await getDocs(collection(db, "countries"));
        let allImages = [];
        let imagesByCountry = {};

        querySnapshot.forEach((doc) => {
          const country = doc.data().country;
          const images = (doc.data().images || []).filter((image) => image.url);

          if (images.length) {
            imagesByCountry[country] = images;
            allImages = allImages.concat(images);
          }
        });

        this.imagesByCountry = imagesByCountry;
        this.allImages = allImages; // Store all images for random shuffle
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    },
    async showRandomImages() {
      if (this.allImages) {
        this.slides = this.getRandomImages(this.allImages, 10); // Show more random images
        this.activeIndex = 0;
      }
    },
    previewCountry(country) {
      this.stopAutoSlide();
      if (this.previewTimeout) clearTimeout(this.previewTimeout);
      
      // Slight delay to prevent flickering on fast hover
      this.previewTimeout = setTimeout(() => {
        if (this.imagesByCountry[country]) {
          this.slides = this.imagesByCountry[country];
          this.activeIndex = 0;
        }
      }, 200);
    },
    stopPreview() {
      if (this.previewTimeout) clearTimeout(this.previewTimeout);
      this.startAutoSlide();
      // Optionally revert to random images or keep current
    },
    getRandomImages(images, count) {
      return [...images].sort(() => Math.random() - 0.5).slice(0, count);
    },
  },
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(20, 184, 166, 0.5);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: all 1.5s ease;
}
.zoom-fade-enter-from {
  opacity: 0;
  transform: scale(1.1);
}
.zoom-fade-leave-to {
  opacity: 0;
  transform: scale(1);
}
</style>
