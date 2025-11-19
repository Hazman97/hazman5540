<template>
  <div class="min-h-screen bg-black font-sans text-white">
    <!-- Hero Section -->
    <div class="relative h-[50vh] w-full overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-linear transform scale-110"
        :style="{ backgroundImage: `url(${heroImage})` }"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
      </div>
      
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tighter mb-2 animate-fade-in-down">
          {{ locationName }}
        </h1>
        <p class="text-lg md:text-xl font-mono text-teal-400 animate-fade-in-up delay-100">
          {{ countryName }}
        </p>
      </div>

      <div class="absolute top-4 left-4 z-20">
        <button @click="$router.go(-1)" class="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12 -mt-20 relative z-20">
      <div v-if="images.length === 0" class="text-center text-slate-500 py-20">
        <p>No images found for this location.</p>
      </div>

      <!-- Masonry Grid -->
      <div v-else class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <div
          v-for="(image, index) in images"
          :key="image.url"
          class="break-inside-avoid group relative rounded-xl overflow-hidden bg-gray-900 cursor-zoom-in"
          @click="openModal(index)"
        >
          <!-- Image -->
          <img
            v-if="!isVideo(image.videoUrl)"
            class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
            :src="image.url"
            :alt="image.title"
            loading="lazy"
          />

          <!-- Video Thumbnail -->
          <div v-else class="relative w-full aspect-video">
            <img
              :src="getThumbnail(image.videoUrl) || image.url"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Video Thumbnail"
            />
            <div class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
              <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Overlay Info -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 class="text-lg font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{{ image.title || 'Untitled' }}</h3>
            <div class="flex items-center justify-between mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
              <span class="text-xs font-mono text-teal-400">{{ image.date || 'Unknown Date' }}</span>
              <div class="flex items-center gap-1 text-slate-300 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{{ image.likes || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
        @click.self="closeModal"
      >
        <!-- Close Button -->
        <button 
          class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
          @click="closeModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Navigation -->
        <button 
          v-if="images.length > 1"
          class="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-50 p-4 rounded-full hover:bg-white/10"
          @click.stop="prevImage"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          v-if="images.length > 1"
          class="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-50 p-4 rounded-full hover:bg-white/10"
          @click.stop="nextImage"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Content -->
        <div class="relative max-w-7xl max-h-[90vh] w-full p-4 flex flex-col items-center justify-center">
          <transition name="zoom" mode="out-in">
            <div :key="currentIndex" class="relative w-full h-full flex items-center justify-center">
              <!-- Image -->
              <img
                v-if="!isVideo(currentImage.videoUrl)"
                :src="currentImage.url"
                :alt="currentImage.title"
                class="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
              />

              <!-- Video Embed -->
              <div v-else class="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  v-if="isYouTubeVideo(currentImage.videoUrl)"
                  class="w-full h-full"
                  :src="getYouTubeEmbedUrl(currentImage.videoUrl)"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <div v-else class="w-full h-full flex items-center justify-center text-slate-500">
                  <p>Video format not supported for embed.</p>
                  <a :href="currentImage.videoUrl" target="_blank" class="ml-2 text-teal-400 hover:underline">Open external link</a>
                </div>
              </div>
            </div>
          </transition>

          <!-- Caption -->
          <div class="mt-6 text-center max-w-2xl">
            <h3 class="text-2xl font-bold text-white">{{ currentImage.title }}</h3>
            <p class="text-slate-400 mt-2 font-mono text-sm">{{ currentImage.description }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRoute } from "vue-router";

export default {
  name: "LocationView",
  setup() {
    const route = useRoute();
    const images = ref([]);
    const isModalOpen = ref(false);
    const currentIndex = ref(0);
    const loading = ref(true);

    const countryName = computed(() => route.params.name);
    const locationName = computed(() => route.params.location);
    
    const currentImage = computed(() => images.value[currentIndex.value] || {});
    
    const heroImage = computed(() => {
      if (images.value.length > 0) {
        // Prefer a landscape image, or just the first one
        return images.value[0].url;
      }
      return '';
    });

    const isVideo = (url) => {
      return url && (url.includes("youtube.com") || url.includes("youtu.be") || url.includes("photos.google.com"));
    };

    const isYouTubeVideo = (url) => {
      return url && (url.includes("youtube.com") || url.includes("youtu.be"));
    };

    const getThumbnail = (url) => {
      if (!url) return null;
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        let videoId = "";
        if (url.includes("youtu.be/")) {
          videoId = url.split("youtu.be/")[1].split("?")[0];
        } else {
          const urlParams = new URL(url).searchParams;
          videoId = urlParams.get("v");
        }
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
      return null;
    };

    const getYouTubeEmbedUrl = (url) => {
      if (!url) return "";
      let videoId = "";
      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
      } else {
        const urlParams = new URL(url).searchParams;
        videoId = urlParams.get("v");
      }
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    };

    const fetchImages = async () => {
      loading.value = true;
      try {
        const q = query(
          collection(db, "countries"),
          where("country", "==", countryName.value)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const countryData = querySnapshot.docs[0].data();
          images.value = (countryData.images || []).filter(
            (img) => img.location === locationName.value
          );
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        loading.value = false;
      }
    };

    const openModal = (index) => {
      currentIndex.value = index;
      isModalOpen.value = true;
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      isModalOpen.value = false;
      document.body.style.overflow = '';
    };

    const nextImage = () => {
      currentIndex.value = (currentIndex.value + 1) % images.value.length;
    };

    const prevImage = () => {
      currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
    };

    const handleKeydown = (event) => {
      if (!isModalOpen.value) return;
      if (event.key === "ArrowRight") nextImage();
      if (event.key === "ArrowLeft") prevImage();
      if (event.key === "Escape") closeModal();
    };

    onMounted(() => {
      fetchImages();
      window.addEventListener("keydown", handleKeydown);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = '';
    });

    watch(() => route.params.location, fetchImages);

    return {
      images,
      isModalOpen,
      currentIndex,
      currentImage,
      countryName,
      locationName,
      heroImage,
      loading,
      isVideo,
      isYouTubeVideo,
      getThumbnail,
      getYouTubeEmbedUrl,
      openModal,
      closeModal,
      nextImage,
      prevImage
    };
  },
};
</script>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 1s ease-out;
}
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vue Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s ease;
}
.zoom-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.zoom-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
