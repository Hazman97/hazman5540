<script>
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,  // ✅ FIXED: Added missing import
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

export default {
  data() {
    return {
      countries: [],
      selectedCountry: "",
      selectedLocation: "",
      newCountry: "",
      newLocation: "",
      photoTitle: "",
      photoUrl: "",
      description: "",
      videoUrl: "",
    };
  },
  computed: {
    locations() {
      const country = this.countries.find(
        (c) => c.country === this.selectedCountry
      );
      return country ? country.locations : [];
    },
  },
  methods: {
    async fetchCountries() {
      try {
        const querySnapshot = await getDocs(collection(db, "countries"));
        this.countries = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            country: data.country || "Unknown",
            locations: data.location || [],  // ✅ FIXED: Corrected key
            images: data.images || [],
          };
        });
        console.log("Fetched countries:", this.countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },

    async addCountry() {
      if (!this.newCountry.trim()) return alert("Enter a valid country!");

      try {
        const newDoc = await addDoc(collection(db, "countries"), {
          country: this.newCountry.trim(),
          locations: [],
          images: [],  // ✅ Ensure images array exists initially
        });

        this.countries.push({
          id: newDoc.id,
          country: this.newCountry.trim(),
          locations: [],
          images: [],
        });

        this.selectedCountry = this.newCountry.trim();
        this.newCountry = "";
      } catch (error) {
        console.error("Error adding country:", error);
      }
    },

    async addLocation() {
      if (!this.selectedCountry || !this.newLocation.trim())
        return alert("Select a country and enter a valid location!");

      const countryDoc = this.countries.find(
        (c) => c.country === this.selectedCountry
      );
      if (!countryDoc) return alert("Country not found!");

      try {
        const countryRef = doc(db, "countries", countryDoc.id);
        await updateDoc(countryRef, {
          location: arrayUnion(this.newLocation.trim()),  // ✅ FIXED: Ensure locations are stored as strings
        });

        countryDoc.locations.push(this.newLocation.trim());
        this.selectedLocation = this.newLocation.trim();
        this.newLocation = "";
      } catch (error) {
        console.error("Error adding location:", error);
      }
    },

    async uploadPhoto() {
      if (
        !this.selectedCountry ||
        !this.selectedLocation ||
        !this.photoTitle 
      ) {
        alert("Please fill all fields!");
        return;
      }

      const countryDoc = this.countries.find(
        (c) => c.country === this.selectedCountry
      );
      if (!countryDoc) {
        alert("Country not found! Please add the country first.");
        return;
      }

      try {
        const countryRef = doc(db, "countries", countryDoc.id);
        const createdAt = new Date();
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
}).format(createdAt);
const formattedTime = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit"}).format(createdAt);

console.log("Date:", formattedDate);  // Example: "March 14, 2025"
console.log("Time:", formattedTime);  // Example: "12:34:56 PM"

        await updateDoc(countryRef, {
          images: arrayUnion({
            location: this.selectedLocation,
            title: this.photoTitle,
            url: this.photoUrl,
            createdAt: createdAt.toISOString(),  // Full timestamp
        date: formattedDate,
        time: formattedTime,
        description: this.description,
        videoUrl: this.videoUrl
          }),  // ✅ FIXED: Directly adding image using arrayUnion()
        });

        alert("Photo uploaded successfully!");

        // Reset input fields
        this.photoTitle = "";
        this.photoUrl = "";
      } catch (error) {
        console.error("Error uploading photo:", error);
        alert("Failed to upload photo. Please try again.");
      }
    },
  },
  mounted() {
    this.fetchCountries();
  },
};
</script>


<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Upload a New Photo</h1>

    <!-- Country Selection -->
    <label class="block mt-4">Select Country:</label>
    <div class="flex gap-2">
      <select v-model="selectedCountry" class="border p-2 rounded w-full">
        <option
          v-for="country in countries"
          :key="country.id"
          :value="country.country"
        >
          {{ country.country }}
        </option>
      </select>
      <input
        v-model="newCountry"
        type="text"
        class="border p-2 rounded"
        placeholder="Add new country"
      />
      <button @click="addCountry" class="bg-green-500 text-white p-2 rounded">
        +
      </button>
    </div>

    <!-- Location Selection -->
    <label class="block mt-4">Select Location:</label>
    <div class="flex gap-2">
      <select v-model="selectedLocation" class="border p-2 rounded w-full">
        <option v-for="location in locations" :key="location">
          {{ location }}
        </option>
      </select>

      <input
        v-model="newLocation"
        type="text"
        class="border p-2 rounded"
        placeholder="Add new location"
      />
      <button @click="addLocation" class="bg-green-500 text-white p-2 rounded">
        +
      </button>
    </div>

    <!-- Photo Title -->
    <label class="block mt-4">Photo Title:</label>
    <input v-model="photoTitle" type="text" class="border p-2 rounded w-full" />

    <!-- Image URL Input -->
    <label class="block mt-4">Google Photos Image URL:</label>
    <input
      v-model="photoUrl"
      type="text"
      class="border p-2 rounded w-full"
      placeholder="Paste Google Photos URL here"
    />

    <!-- Preview Image -->
    <div v-if="photoUrl" class="mt-4">
      <img :src="photoUrl" alt="Preview Image" class="w-full rounded-lg" />
    </div>
    <label class="block mt-4">description:</label>
    <input
      v-model="description"
      type="text"
      class="border p-2 rounded w-full"
      placeholder="description"
    />
    <label class="block mt-4">Video URL:</label>
    <input
      v-model="videoUrl"
      type="text"
      class="border p-2 rounded w-full"
      placeholder="video URL here"
    />
    <!-- Upload Button -->
    <button
      @click="uploadPhoto"
      class="bg-blue-500 text-white p-2 rounded mt-4 w-full"
    >
      Upload Photo
    </button>
  </div>
</template>
