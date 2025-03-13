<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold">Select a Country</h1>
      <div class="mt-4">
        <ul>
          <li v-for="country in countries" :key="country">
            <router-link :to="'/country/' + country" class="text-blue-500">
              {{ country }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from "../../firebase";
  import { collection, getDocs } from "firebase/firestore";
  
  export default {
    data() {
      return {
        countries: [],
      };
    },
    methods: {
      async fetchCountries() {
        try {
          const querySnapshot = await getDocs(collection(db, "countries"));
          this.countries = querySnapshot.docs.map((doc) => doc.data().country); // Get 'country' field from each document
        } catch (error) {
          console.error("Error fetching countries:", error);
        }
      },
    },
    mounted() {
      this.fetchCountries();
    },
  };
  </script>
  