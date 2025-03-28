<template>
  <div
    v-if="loading"
    class="h-screen flex items-center justify-center bg-gray-900 text-white"
  >
    <p class="text-xl animate-pulse">Loading images...</p>
  </div>

  <div
    v-else
    class="h-screen flex transition-all duration-1000 bg-cover bg-center relative"
    :style="{ backgroundImage: `url(${slides[activeIndex]?.url})` }"
  >
    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- Sidebar -->
    <div
      class="relative w-1/4 bg-black bg-opacity-70 text-white p-5 overflow-y-auto"
    >
      <h2 class="text-lg font-semibold mb-4">Photo Collection</h2>
      <ul>
        <li
          v-for="(images, country) in imagesByCountry"
          :key="country"
          @mouseover="showCountryImages(country)"
          @mouseleave="showRandomImages"
          class="p-2 cursor-pointer border-b border-gray-600 hover:bg-white hover:bg-opacity-20"
        >
          <router-link :to="'/country/' + country">
            {{ country }}
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Slideshow -->
    <div class="relative w-3/4 flex justify-center items-center">
      <button
        @click="prevSlide"
        class="absolute left-4 bg-black bg-opacity-50 text-white p-2 z-10"
      >
        &#10094;
      </button>
      <img
        v-if="slides.length"
        :src="slides[activeIndex]?.url"
        alt="Slideshow"
        class="max-w-3/4 max-h-3/4 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out relative z-10"
      />
      <button
        @click="nextSlide"
        class="absolute right-4 bg-black bg-opacity-50 text-white p-2 z-10"
      >
        &#10095;
      </button>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      slides: [],
      activeIndex: 0,
      imagesByCountry: {}, // Stores images categorized by country
      autoSlideInterval: null,
      loading: true, // Loading state
    };
  },
  async mounted() {
    await this.fetchImages();
    await this.showRandomImages();
    await this.startAutoSlide();
    this.loading = false; // Hide loading after fetching images
  },
  methods: {
    async startAutoSlide() {
      this.stopAutoSlide();
      this.autoSlideInterval = setInterval(this.nextSlide, 3000);
    },
    stopAutoSlide() {
      clearInterval(this.autoSlideInterval);
    },
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.slides.length;
    },
    prevSlide() {
      this.activeIndex =
        (this.activeIndex - 1 + this.slides.length) % this.slides.length;
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
        this.slides = this.getRandomImages(allImages, 5);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    },
    async showRandomImages() {
      const allImages = Object.values(this.imagesByCountry).flat();
      this.slides = this.getRandomImages(allImages, 5);
      this.activeIndex = 0;
    },
    showCountryImages(country) {
      if (this.imagesByCountry[country]) {
        this.slides = this.imagesByCountry[country];
        this.activeIndex = 0;
      }
    },
    getRandomImages(images, count) {
      return images.sort(() => Math.random() - 0.5).slice(0, count);
    },
  },
};
</script>
