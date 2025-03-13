<template>

    <div class="px-[15%] bg-white rounded-lg p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">{{ countryName }}</h1>
      <ul class="space-y-4">
        <li
          v-for="(index, loc) in location"
          :key="loc"
          class="flex-col items-center space-x-4 text-2xl"
        >
          <router-link
            :to="`/country/${countryName}/location/${index}`"
            class="hover:underline"
          >
            {{ index }}
          </router-link>
          <img
            v-if="getImage(index)"
            :src="getImage(index).url"
            :alt="getImage(index).title"
            class="w-60 h-60 rounded-lg object-cover shadow-md"
          />
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
      images: [],
    };
  },
  computed: {
    countryName() {
      return this.$route.params.name || "";
    },
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
        const q = query(
          collection(db, "countries"),
          where("country", "==", this.countryName)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const countryData = querySnapshot.docs[0].data();
          console.log(`✅ Found country document:`, countryData);

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
    getImage(locationName) {
      return this.images.find((img) => img.location === locationName) || null;
    },
  },
  watch: {
    $route() {
      this.fetchCountryData();
    },
  },
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
