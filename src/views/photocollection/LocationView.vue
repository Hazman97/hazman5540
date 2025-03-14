<template>
  <div
    class="px-[15%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
  >
    <div
      v-for="(image, index) in images"
      :key="image.url"
      class="flex flex-col h-full max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg transition-all delay-100 duration-300 ease-in-out transform hover:scale-105"
    >
      <!-- Image -->
      <!-- <a :href="image.url" target="_blank" rel="noopener noreferrer"> -->
      <img
        v-if="
          !isYouTubeVideo(image.videoUrl) &&
          !isGooglePhotosVideo(image.videoUrl)
        "
        class="rounded-lg h-64 w-full object-cover"
        :src="image.url"
        :alt="image.title"
        loading="lazy"
        @click="openModal(index)"
      />

      <!-- Show YouTube Video -->
      <iframe
        v-else-if="isYouTubeVideo(image.videoUrl)"
        class="rounded-lg w-full h-64"
        :src="getYouTubeEmbedUrl(image.videoUrl)"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <!-- Show Google Photos Video -->
      <div
        v-else-if="isGooglePhotosVideo(image.videoUrl)"
        class="relative w-full h-64"
      >
        <img
          :src="getThumbnail(image.videoUrl)"
          class="rounded-lg w-full h-64 object-cover"
          alt="Video Thumbnail"
        />
        <a
          :href="image.videoUrl"
          target="_blank"
          class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
        >
          <svg
            class="w-16 h-16 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z"></path>
          </svg>
        </a>
      </div>
      <!-- </a> -->

      <!-- Tags & Time -->
      <div class="flex justify-between -mt-4 px-4">
        <span
          class="inline-block ring-4 bg-red-500 ring-gray-800 rounded-full text-sm font-medium tracking-wide text-gray-100 px-3 pt-0.5"
        >
          {{ image.date || "General" }}
        </span>
        <span
          class="flex h-min space-x-1 items-center rounded-full text-gray-400 bg-gray-800 py-1 px-2 text-xs font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-blue-500 font-semibold text-xs">
            {{ image.time || "5 Mins" }}
          </p>
        </span>
      </div>

      <!-- Title -->
      <div class="py-2 px-4">
        <h1
          class="capitalize text-xl font-medium leading-6 tracking-wide text-gray-300 hover:text-blue-500 cursor-pointer"
        >
          <a :href="image.url">{{ image.title }}</a>
        </h1>
      </div>

      <!-- Description -->
      <div class="px-4 space-y-2 flex-col mb-4">
        <p class="text-gray-400 font-normal leading-5 tracking-wide">
          {{ image.description || "No description available" }}
        </p>
        <!-- <a
          :href="image.url"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold hover:text-blue-400 text-gray-100 text-sm capitalize"
        >
          full size
        </a> -->
      </div>

      <!-- Author & Likes
      <div class="flex flex-row items-end h-full w-full px-4 mt-4">
        <div class="flex border-t border-gray-700 w-full py-4">
          <div
            class="flex items-center space-x-3 border-r border-gray-700 w-full"
          >
            <img
              class="object-cover w-8 h-8 border-2 border-white rounded-full"
              :src="image.authorImage"
              alt="Author"
              loading="lazy"
            />
            <div>
              <p class="text-sm font-semibold tracking-wide text-gray-200">
                {{ image.author || "Anonymous" }}
              </p>
              <p class="text-xs font-light tracking-wider text-gray-300">
                {{ image.timeAgo || "Just now" }}
              </p>
            </div>
          </div>
          <div class="flex items-center flex-shrink-0 px-2">
            <div class="flex items-center space-x-1 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <p class="font-medium">{{ image.likes || 0 }}</p>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
      @click.self="closeModal"
    >
      <div class="relative flex flex-col items-center">
        <!-- Close Button -->
        <span
          class="absolute top-5 right-10 text-white text-4xl font-bold cursor-pointer hover:text-gray-400"
          @click="closeModal"
        >
          &times;
        </span>

        <!-- Previous Button -->
        <button
          v-if="images.length > 1"
          class="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold cursor-pointer bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
          @click.stop="prevImage"
        >
          &#10094;
        </button>

        <!-- Current Image -->
        <img
          :src="currentImage.url"
          :alt="currentImage.title"
          class="w-4/5 max-w-[700px] animate-zoom"
        />

        <!-- Image Title -->
        <p class="text-gray-300 text-center mt-4">{{ currentImage.title }}</p>

        <!-- Next Button -->
        <button
          v-if="images.length > 1"
          class="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold cursor-pointer bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
          @click.stop="nextImage"
        >
          &#10095;
        </button>
      </div>
    </div>

    <p
      v-if="images.length === 0"
      class="text-gray-500 text-center col-span-full"
    >
      No images available
    </p>
  </div>
</template>

<script>
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      images: [],
      isModalOpen: false,
      imageSrc: "",
      imageAlt: "",
      currentIndex: 0, // Track current image index
    };
  },
  computed: {
    countryName() {
      return this.$route.params.name;
    },
    locationName() {
      return this.$route.params.location;
    },

    currentImage() {
      return this.images[this.currentIndex] || {};
    },
  },
  watch: {
    "$route.params.location": "fetchImages",
  },
  methods: {
    isYouTubeVideo(url) {
      return url && (url.includes("youtube.com") || url.includes("youtu.be"));
    },
    isGooglePhotosVideo(url) {
      return url && url.includes("photos.google.com");
    },

    getThumbnail(url) {
      return url.replace("=m18", "=w600-h400"); // Adjust thumbnail resolution if needed
    },
    getYouTubeEmbedUrl(url) {
      if (!url) return "";
      let videoId = "";

      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
      } else {
        const urlParams = new URL(url).searchParams;
        videoId = urlParams.get("v");
      }

      return `https://www.youtube.com/embed/${videoId}`;
    },
    openModal(index) {
      this.currentIndex = index;
      this.isModalOpen = true;
      document.addEventListener("keydown", this.handleKeydown);
    },

    closeModal() {
      this.isModalOpen = false;
      document.removeEventListener("keydown", this.handleKeydown);
    },

    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Loop to first image
      }
    },

    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.images.length - 1; // Loop to last image
      }
    },

    handleKeydown(event) {
      if (event.key === "ArrowRight") {
        this.nextImage();
      } else if (event.key === "ArrowLeft") {
        this.prevImage();
      } else if (event.key === "Escape") {
        this.closeModal();
      }
    },
    async fetchImages() {
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
          this.images = countryData.images.filter(
            (img) => img.location === this.locationName
          );
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    },
  },
  mounted() {
    this.fetchImages();
  },
};
</script>

<style>
iframe {
  cursor: auto !important; /* Ensure cursor stays visible */
}
@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
.animate-zoom {
  animation: zoom 0.6s;
}
</style>
