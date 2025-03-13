<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold">{{ countryName }}</h1>
      <ul class="mt-4">
        <li v-for="(index, loc) in location" :key="loc">
          <router-link :to="`/country/${countryName}/location/${index}`" class="text-blue-500">
            {{ index }}
          </router-link>
          <img v-if="getImage(index)" :src="getImage(index).url" :alt="getImage(index).title" class="w-20 h-20 rounded-lg object-cover">
   
        </li>
      </ul>
    </div>
  </template>
  <script>
  import { db } from "../../firebase";
  import { collection, getDocs, query, where } from "firebase/firestore";
  
  export default {
    data() {
      return {
        location: {},
        actualCountryName: "",
      };
    },
    computed: {
      countryName() {
        return this.$route.params.name || "";
      }
    },
    async mounted() {
      await this.fetchCountryData();
    },
    methods: {
      async fetchCountryData() {
        console.log(`🔍 Fetching data for country: "${this.countryName}"`);
  
        if (!this.countryName) {
          console.error("❌ Error: countryName is undefined");
          return;
        }
  
        try {
          // Query the 'countries' collection for the selected country
          const q = query(collection(db, "countries"), where("country", "==", this.countryName));
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
            const countryData = querySnapshot.docs[0].data();
            console.log(`✅ Found country document:`, countryData);
  
            // Store the location data
            this.location = countryData.location || {};
            this.images = countryData.images || [];
            this.actualCountryName = countryData.country;
          } else {
            console.error(`❌ No data found for country: "${this.countryName}"`);
          }
        } catch (error) {
          console.error("🔥 Firestore fetch error:", error);
        }
        
      },
       // Find the first image that matches the location
    getImage(locationName) {
      return this.images.find((img) => img.location === locationName) || null;
    }
    },
    watch: {
      $route() {
        this.fetchCountryData();
      }
    }
  };
  </script>
  