<template>
  <div class="min-h-screen bg-black font-sans text-white pt-24 pb-12 px-4">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12 animate-fade-in-down">
        <h1
          class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600 mb-4"
        >
          Share Your World
        </h1>
        <p class="text-slate-400 text-lg">
          Upload your memories to the collection.
        </p>
      </div>

      <div
        class="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl animate-fade-in-up"
      >
        <!-- Country Selection -->
        <div class="mb-8">
          <label class="block text-sm font-medium text-slate-400 mb-2"
            >Country</label
          >
          <div class="flex gap-4">
            <div class="relative flex-1">
              <select
                v-model="selectedCountry"
                class="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors appearance-none"
              >
                <option value="" disabled>Select a country</option>
                <option
                  v-for="country in countries"
                  :key="country.id"
                  :value="country.country"
                >
                  {{ country.country }}
                </option>
              </select>
              <div
                class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Location Selection -->
        <div class="mb-8">
          <label class="block text-sm font-medium text-slate-400 mb-2"
            >Location</label
          >
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
              <div
                class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Photo Details -->
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-400 mb-2"
              >Title</label
            >
            <input
              v-model="photoTitle"
              type="text"
              class="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors placeholder-slate-600"
              placeholder="e.g., Sunset at the Beach"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-400 mb-2"
              >Description</label
            >
            <textarea
              v-model="description"
              rows="3"
              class="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors placeholder-slate-600 resize-none"
              placeholder="Tell the story behind this photo..."
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-400 mb-2"
              >Video URL (Optional)</label
            >
            <input
              v-model="videoUrl"
              type="text"
              class="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors placeholder-slate-600"
              placeholder="YouTube or Google Photos link"
            />
          </div>
        </div>

        <!-- File Upload Section -->
        <div class="mt-8">
          <label class="block text-sm font-medium text-slate-400 mb-2"
            >Upload Image</label
          >

          <!-- Drag and Drop Zone -->
          <div
            @drop.prevent="handleDrop"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            class="relative border-2 border-dashed rounded-xl p-8 transition-all duration-300"
            :class="
              isDragging
                ? 'border-teal-500 bg-teal-500/10'
                : 'border-white/10 bg-black/30'
            "
          >
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFileSelect"
              class="hidden"
            />

            <!-- Upload Prompt -->
            <div v-if="!selectedFile && !uploadProgress" class="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16 mx-auto mb-4 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p class="text-slate-400 mb-2">Drag and drop your image here</p>
              <p class="text-slate-600 text-sm mb-4">or</p>
              <button
                @click="$refs.fileInput.click()"
                type="button"
                class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Browse Files
              </button>
              <p class="text-slate-600 text-xs mt-4">
                Supported: JPEG, PNG, WebP, GIF (Max 10MB)
              </p>
            </div>

            <!-- Selected File Info -->
            <div
              v-else-if="selectedFile && !uploadProgress"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p class="text-white font-medium">{{ selectedFile.name }}</p>
                  <p class="text-slate-500 text-sm">
                    {{ formatFileSize(selectedFile.size) }}
                  </p>
                </div>
              </div>
              <button
                @click="clearFile"
                type="button"
                class="text-red-500 hover:text-red-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Upload Progress -->
            <div v-else-if="uploadProgress !== null" class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-white font-medium">Uploading...</span>
                <span class="text-teal-500 font-mono"
                  >{{ uploadProgress }}%</span
                >
              </div>
              <div class="w-full bg-black/50 rounded-full h-2 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-teal-500 to-blue-600 h-full transition-all duration-300 ease-out"
                  :style="{ width: uploadProgress + '%' }"
                ></div>
              </div>
            </div>
          </div>

          <!-- File Validation Error -->
          <p v-if="fileError" class="mt-2 text-red-500 text-sm">
            {{ fileError }}
          </p>
        </div>

        <!-- Preview -->
        <div
          v-if="photoUrl"
          class="mt-8 p-4 bg-black/30 rounded-xl border border-white/5"
        >
          <label class="block text-sm font-medium text-slate-400 mb-4"
            >Preview</label
          >
          <div
            class="relative aspect-video rounded-lg overflow-hidden bg-black"
          >
            <img
              :src="photoUrl"
              alt="Preview"
              class="w-full h-full object-contain"
            />
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
      <div
        v-if="notification.show"
        class="fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50"
        :class="
          notification.type === 'success'
            ? 'bg-teal-500 text-white'
            : 'bg-red-500 text-white'
        "
      >
        <svg
          v-if="notification.type === 'success'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
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
import { uploadFile, validateImageFile } from "../../services/storageService";

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
        type: "success",
      },
      // File upload fields
      selectedFile: null,
      previewUrl: null,
      uploadProgress: null,
      isDragging: false,
      fileError: "",
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
      return (
        this.selectedCountry &&
        this.selectedLocation &&
        this.photoTitle &&
        (this.selectedFile || this.photoUrl)
      );
    },
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

    // File handling methods
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        this.processFile(file);
      }
    },

    handleDrop(event) {
      this.isDragging = false;
      const file = event.dataTransfer.files[0];
      if (file) {
        this.processFile(file);
      }
    },

    processFile(file) {
      // Validate file
      const validation = validateImageFile(file);
      if (!validation.valid) {
        this.fileError = validation.error;
        this.selectedFile = null;
        this.previewUrl = null;
        return;
      }

      // Clear any previous errors
      this.fileError = "";
      this.selectedFile = file;

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target.result;
        this.photoUrl = e.target.result; // Set preview for existing preview component
      };
      reader.readAsDataURL(file);
    },

    clearFile() {
      this.selectedFile = null;
      this.previewUrl = null;
      this.photoUrl = "";
      this.fileError = "";
      this.uploadProgress = null;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = "";
      }
    },

    formatFileSize(bytes) {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
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
        let imageUrl = this.photoUrl;

        // If a file is selected, upload it to storage service first
        if (this.selectedFile) {
          this.showNotification("Uploading image to storage...", "success");

          const uploadResult = await uploadFile(
            this.selectedFile,
            (progress) => {
              this.uploadProgress = progress;
            }
          );

          if (!uploadResult.success) {
            throw new Error(uploadResult.error || "Failed to upload image");
          }

          imageUrl = uploadResult.url;
          this.uploadProgress = null;
        }

        // Save to Firebase
        const countryRef = doc(db, "countries", countryDoc.id);
        const createdAt = new Date();
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(createdAt);
        const formattedTime = new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(createdAt);

        await updateDoc(countryRef, {
          images: arrayUnion({
            location: this.selectedLocation,
            title: this.photoTitle,
            url: imageUrl,
            createdAt: createdAt.toISOString(),
            date: formattedDate,
            time: formattedTime,
            description: this.description,
            videoUrl: this.videoUrl,
          }),
        });

        this.showNotification("Photo uploaded successfully!");

        // Reset form
        this.photoTitle = "";
        this.photoUrl = "";
        this.description = "";
        this.videoUrl = "";
        this.clearFile();
      } catch (error) {
        console.error("Error uploading photo:", error);
        this.showNotification(
          error.message || "Failed to upload photo",
          "error"
        );
        this.uploadProgress = null;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
