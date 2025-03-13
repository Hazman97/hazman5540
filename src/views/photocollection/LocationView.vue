<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold">{{ locationName }}</h1>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div v-if="images.length > 0">
          <div v-for="image in images" :key="image.url">
            <img :src="image.url" class="w-full rounded-lg" />
            <p class="text-sm">{{ image.title }}</p>
          </div>
        </div>
        <p v-else class="text-gray-500">No images available</p>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from "../../firebase";
  import { collection, query, where, getDocs } from "firebase/firestore";
  
  export default {
    data() {
      return {
        images: [],
      };
    },
    computed: {
      countryName() {
        return this.$route.params.name;
      },
      locationName() {
        return this.$route.params.location;
      },
    },
    methods: {
      async fetchImages() {
        try {
          // Query the 'countries' collection for the selected country
          const q = query(collection(db, "countries"), where("country", "==", this.countryName));
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
            const countryData = querySnapshot.docs[0].data();
            // Filter images that belong to the selected location
            this.images = countryData.images.filter((img) => img.location === this.locationName);
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
  