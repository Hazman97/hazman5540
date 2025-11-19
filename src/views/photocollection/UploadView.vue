<template>
  <div class="min-h-screen bg-black font-sans text-white pt-24 pb-12 px-4">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12 animate-fade-in-down">
        <h1 class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600 mb-4">
          Share Your World
        </h1>
        <p class="text-slate-400 text-lg">Upload your memories to the collection.</p>
      </div>

      <div class="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl animate-fade-in-up">
        <!-- Country Selection -->
        <div class="mb-8">
          <label class="block text-sm font-medium text-slate-400 mb-2">Country</label>
          <div class="flex gap-4">
            <div class="relative flex-1">
              <select 
                v-model="selectedCountry" 
                class="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors appearance-none"
              >
                <option value="" disabled>Select a country</option>
                <option v-for="country in countries" :key="country.id" :value="country.country">
                  {{ country.country }}
                </option>
              </select>
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div class="flex-1 flex gap-2">
              <input
                v-model="newCountry"
                type="text"
                class="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors placeholder-slate-600"
                placeholder="New Country"
              />
              <button 
                @click="addCountry" 
                class="bg-teal-500 hover:bg-teal-600 text-white px-4 rounded-xl transition-colors flex items-center justify-center"
                :disabled="!newCountry"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Location Selection -->
        <div class="mb-8">
          <label class="block text-sm font-medium text-slate-400 mb-2">Location</label>
          <div class="flex gap-4">
            <div class="relative flex-1">
              <select 
                v-model="selectedLocation" 
                class="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors appearance-none"
                :disabled="!selectedCountry"
              >
                <option value="" disabled>Select a location</option>
                <option v-for="location in locations" :key="location">
                  {{ location }}
                </option>
              </select>
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div class="flex-1 flex gap-2">
              <input
                v-model="newLocation"
                type="text"
                class="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors placeholder-slate-600"
                placeholder="New Location"
                :disabled="!selectedCountry"
              />
              <button 
                @click="addLocation" 
                class="bg-teal-500 hover:bg-teal-600 text-white px-4 rounded-xl transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!newLocation || !selectedCountry"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Photo Details -->
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-400 mb-2">Title</label>
            <input 
              v-model="photoTitle" 
              type="text" 
              class="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors placeholder-slate-600"
              placeholder="e.g., Sunset at the Beach"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-400 mb-2">Description</label>
            <textarea 
              v-model="description" 
              rows="3"
              class="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors placeholder-slate-600 resize-none"
              placeholder="Tell the story behind this photo..."
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-slate-400 mb-2">Image URL</label>
              <input 
                v-model="photoUrl" 
                type="text" 
                class="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors placeholder-slate-600"
                placeholder="https://..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-400 mb-2">Video URL (Optional)</label>
              <input 
                v-model="videoUrl" 
                type="text" 
                class="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors placeholder-slate-600"
                placeholder="YouTube or Google Photos link"
              />
            </div>
          </div>
        </div>

        <!-- Preview -->
        <div v-if="photoUrl" class="mt-8 p-4 bg-black/30 rounded-xl border border-white/5">
          <label class="block text-sm font-medium text-slate-400 mb-4">Preview</label>
          <div class="relative aspect-video rounded-lg overflow-hidden bg-black">
            <img :src="photoUrl" alt="Preview" class="w-full h-full object-contain" />
          </div>
        </div>

        <!-- Submit Button -->
        <button
          @click="uploadPhoto"
          class="w-full mt-8 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isValid"
        >
          <span v-if="loading">Uploading...</span>
          <span v-else>Upload Photo</span>
        </button>
      </div>
    </div>

    <!-- Notification -->
    <transition name="fade">
      <div v-if="notification.show" class="fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50" :class="notification.type === 'success' ? 'bg-teal-500 text-white' : 'bg-red-500 text-white'">
        <svg v-if="notification.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span class="font-medium">{{ notification.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export default {
  name: "UploadView",
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
      loading: false,
      notification: {
        show: false,
        message: "",
        type: "success"
      }
    };
  },
  computed: {
    locations() {
      const country = this.countries.find(
        (c) => c.country === this.selectedCountry
      );
      return country ? country.locations : [];
    },
    isValid() {
      return this.selectedCountry && this.selectedLocation && this.photoTitle && this.photoUrl;
    }
  },
  methods: {
    showNotification(message, type = "success") {
      this.notification = { show: true, message, type };
      setTimeout(() => {
        this.notification.show = false;
      }, 3000);
    },

    async fetchCountries() {
      try {
        const querySnapshot = await getDocs(collection(db, "countries"));
        this.countries = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            country: data.country || "Unknown",
            locations: data.location || [],
            images: data.images || [],
          };
        });
      } catch (error) {
        console.error("Error fetching countries:", error);
        this.showNotification("Failed to load countries", "error");
      }
    },

    async addCountry() {
      if (!this.newCountry.trim()) return;

      try {
        const newDoc = await addDoc(collection(db, "countries"), {
          country: this.newCountry.trim(),
          location: [], // Fixed key name to match existing data structure
          images: [],
        });

        this.countries.push({
          id: newDoc.id,
          country: this.newCountry.trim(),
          locations: [],
          images: [],
        });

        this.selectedCountry = this.newCountry.trim();
        this.newCountry = "";
        this.showNotification("Country added successfully!");
      } catch (error) {
        console.error("Error adding country:", error);
        this.showNotification("Failed to add country", "error");
      }
    },

    async addLocation() {
      if (!this.selectedCountry || !this.newLocation.trim()) return;

      const countryDoc = this.countries.find(
        (c) => c.country === this.selectedCountry
      );
      if (!countryDoc) return;

      try {
        const countryRef = doc(db, "countries", countryDoc.id);
        await updateDoc(countryRef, {
          location: arrayUnion(this.newLocation.trim()),
        });

        countryDoc.locations.push(this.newLocation.trim());
        this.selectedLocation = this.newLocation.trim();
        this.newLocation = "";
        this.showNotification("Location added successfully!");
      } catch (error) {
        console.error("Error adding location:", error);
        this.showNotification("Failed to add location", "error");
      }
    },

    async uploadPhoto() {
      if (!this.isValid) return;
      
      this.loading = true;
      const countryDoc = this.countries.find(
        (c) => c.country === this.selectedCountry
      );

      if (!countryDoc) {
        this.showNotification("Country not found!", "error");
        this.loading = false;
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

        await updateDoc(countryRef, {
          images: arrayUnion({
            location: this.selectedLocation,
            title: this.photoTitle,
            url: this.photoUrl,
            createdAt: createdAt.toISOString(),
            date: formattedDate,
            time: formattedTime,
            description: this.description,
            videoUrl: this.videoUrl
          }),
        });

        this.showNotification("Photo uploaded successfully!");
        
        // Reset form
        this.photoTitle = "";
        this.photoUrl = "";
        this.description = "";
        this.videoUrl = "";
      } catch (error) {
        console.error("Error uploading photo:", error);
        this.showNotification("Failed to upload photo", "error");
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchCountries();
  },
};
</script>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
