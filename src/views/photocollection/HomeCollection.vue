<template>
  <div
    class="h-screen flex transition-all duration-1000 bg-cover bg-center"
    :style="{ backgroundImage: `url(${slides[activeIndex]?.url})` }"
  >
    <!-- Sidebar -->
    <div class="w-1/4 bg-black bg-opacity-70 text-white p-5 overflow-y-auto">
      <h2 class="text-lg font-semibold mb-4">Photo Collection</h2>
      <ul>
        <!-- <li
          v-for="(slide, index) in slides"
          :key="index"
          @click="setSlide(index)"
          class="p-2 cursor-pointer border-b border-gray-600 hover:bg-white hover:bg-opacity-20"
        >
          {{ slide.title }}
        </li> -->
        <!-- Countries -->
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
    <div class="w-3/4 flex justify-center items-center relative">
      <button
        @click="prevSlide"
        class="absolute left-4 bg-black bg-opacity-50 text-white p-2"
      >
        &#10094;
      </button>
      <img
        :src="slides[activeIndex]?.url"
        alt="Slideshow"
        class="max-w-3/4 max-h-3/4 rounded-lg shadow-lg transition-opacity duration-500"
      />
      <button
        @click="nextSlide"
        class="absolute right-4 bg-black bg-opacity-50 text-white p-2"
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
    };
  },
  async mounted() {
    await this.fetchImages();
    this.showRandomImages(); // Set default random images
    this.startAutoSlide();
  },
  methods: {
    startAutoSlide() {
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
    setSlide(index) {
      this.activeIndex = index;
    },
    async fetchImages() {
      try {
        const querySnapshot = await getDocs(collection(db, "countries"));
        let allImages = [];
        let imagesByCountry = {};

        querySnapshot.forEach((doc) => {
          const country = doc.data().country;
          const images = doc.data().images || [];

          if (images.length) {
            imagesByCountry[country] = images;
            allImages = allImages.concat(images);
          }
        });

        this.imagesByCountry = imagesByCountry;
        this.slides = this.getRandomImages(allImages, 5); // Show 5 random images as default
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    },
    showRandomImages() {
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
