<template>
  <div class="relative min-h-screen w-full bg-black font-sans text-white overflow-x-hidden">
    <!-- Loading State -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center z-50 bg-primary">
      <div class="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else class="relative z-10">
      <!-- Hero Section with Dynamic Background -->
      <div class="relative h-[60vh] w-full overflow-hidden">
        <div 
          class="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-linear transform scale-110 hover:scale-100"
          :style="{ backgroundImage: `url(${heroImage})` }"
        >
          <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black"></div>
        </div>
        
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 class="text-6xl md:text-8xl font-bold tracking-tighter mb-4 animate-fade-in-down">
            {{ countryName }}
            <span class="text-teal-500">.</span>
          </h1>
          <p class="text-xl md:text-2xl font-mono text-slate-300 animate-fade-in-up delay-100">
            Explore {{ location.length }} Locations
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="container mx-auto px-4 py-12 -mt-20 relative z-20">
        <!-- Locations Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <router-link
            v-for="(locName, index) in location"
            :key="index"
            :to="`/country/${countryName}/location/${locName}`"
            class="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/20"
          >
            <div class="p-8 flex items-center justify-between">
              <div>
                <h3 class="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">{{ locName }}</h3>
                <p class="text-sm text-slate-400 mt-2 font-mono">View Gallery &rarr;</p>
              </div>
              <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-black transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Gallery Highlights -->
        <div class="space-y-8">
          <div class="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 class="text-3xl font-bold">Highlights</h2>
            <div class="flex gap-2">
              <button @click="scrollLeft" class="p-2 rounded-full bg-white/5 hover:bg-teal-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button @click="scrollRight" class="p-2 rounded-full bg-white/5 hover:bg-teal-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div 
            ref="scrollContainer" 
            class="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          >
            <div 
              v-for="(img, j) in images" 
              :key="j" 
              class="flex-none w-80 md:w-96 aspect-[3/4] snap-center relative group rounded-xl overflow-hidden cursor-pointer"
            >
              <img 
                :src="img.url" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p class="text-white font-medium truncate">{{ img.title || 'Untitled' }}</p>
                <p class="text-teal-400 text-sm">{{ img.location || countryName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRoute } from "vue-router";

export default {
  name: "CountryView",
  setup() {
    const images = ref([]);
    const location = ref([]);
    const loading = ref(true);
    const route = useRoute();
    const scrollContainer = ref(null);
    
    const countryName = computed(() => route.params.name || "");
    const heroImage = computed(() => {
      if (images.value.length > 0) {
        // Try to find a landscape image or just use the first one
        return images.value[0].url;
      }
      return '';
    });

    const fetchCountryData = async () => {
      loading.value = true;
      if (!countryName.value) return;

      try {
        const q = query(
          collection(db, "countries"),
          where("country", "==", countryName.value)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const countryData = querySnapshot.docs[0].data();
          // Ensure location is an array. If it's an object, convert keys/values as needed.
          // Based on previous code usage `v-for="(index, loc) in location"`, it seemed confusing.
          // Assuming standard array of strings for locations based on typical Firestore structure for this app type.
          // If it's an object { "LocName": ... }, we might need Object.keys().
          // Let's assume it's an array of strings or objects.
          // If previous code was `v-for="(index, loc) in location"`, and displayed `{{ index }}`, 
          // it implies `location` might be an object where keys are location names? 
          // Or `location` is `["LocA", "LocB"]` and `index` is the value?
          // In Vue 2: `(val, key) in obj`, `(item, index) in arr`.
          // If `location` was `["A", "B"]`: `(item, index)` -> item="A", index=0.
          // The old code used `{{ index }}` to display the name. This strongly suggests `location` was an OBJECT where keys are names, OR the dev got `(item, index)` mixed up and named the item `index`.
          // Given `v-for="(index, loc) in location"`, if it's an array, `index` is the item.
          // Let's assume it's an array of strings for now, as that's most common for "list of locations".
          
          location.value = countryData.location || [];
          images.value = (countryData.images || []).filter(img => img.url);
        }
      } catch (error) {
        console.error("Firestore fetch error:", error);
      } finally {
        loading.value = false;
      }
    };

    const scrollLeft = () => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' });
      }
    };

    const scrollRight = () => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' });
      }
    };

    onMounted(fetchCountryData);
    watch(() => route.params.name, fetchCountryData);

    return { 
      images, 
      loading, 
      location, 
      countryName, 
      heroImage,
      scrollContainer,
      scrollLeft,
      scrollRight
    };
  },
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

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
</style>
