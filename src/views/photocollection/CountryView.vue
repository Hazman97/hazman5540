<template>
  <div class="container mx-auto px-[15%] py-8 flex-col sm:flex-col space-y-6 md:flex-row items-start gap-8 lg:flex xl:flex">
    <!-- Router Links on the Left -->
    <ul class="space-y-4 mt-8 w-1/4">
      <li v-for="(index, loc) in location" :key="loc" class="flex-col items-center space-x-4 text-2xl">
        <router-link :to="`/country/${countryName}/location/${index}`" class="p-2 cursor-pointer border-b border-gray-600 hover:bg-white hover:bg-opacity-20 dark:text-slate-200  dark:border-slate-400">
          {{ index }}
        </router-link>
      </li>
    </ul>

    <!-- Scrollable Horizontal Gallery on the Right -->
    <div ref="scrollContainer" class="scroll-container flex gap-4 overflow-x-auto whitespace-nowrap p-4 border rounded-lg w-full">
      <img v-for="(img, j) in images" :key="j" class="w-full h-40 object-cover rounded-lg" :src="img.url" alt="Location Image" />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { useRoute } from "vue-router";

export default {
  setup() {
    const images = ref([]);
    const location = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const db = getFirestore();
    const route = useRoute();
    const scrollContainer = ref(null);
    
    const countryName = computed(() => route.params.name || "");

    const fetchCountryData = async () => {
      console.log(`🔍 Fetching data for country: "${countryName.value}"`);

      if (!countryName.value) {
        console.error("❌ Error: countryName is undefined");
        return;
      }

      try {
        const q = query(
          collection(db, "countries"),
          where("country", "==", countryName.value)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const countryData = querySnapshot.docs[0].data();
          console.log(`✅ Found country document:`, countryData);

            location.value = countryData.location || [];
            images.value = (countryData.images || []).filter(img => img.url);
          
          // Scroll to the end when images load
          nextTick(() => {
            if (scrollContainer.value) {
              scrollContainer.value.scrollLeft = scrollContainer.value.scrollWidth;
            }
          });
        } else {
          console.error(`❌ No data found for country: "${countryName.value}"`);
        }
      } catch (error) {
        console.error("🔥 Firestore fetch error:", error);
      }
    };

    onMounted(fetchCountryData);
    watch(() => route.params.name, fetchCountryData);

    return { images, loading, error, location, countryName, scrollContainer };
  },
};
</script>

<style scoped>
.scroll-container::-webkit-scrollbar {
  height: 8px;
}
.scroll-container::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 10px;
}
</style>
