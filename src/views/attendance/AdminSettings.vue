<template>
  <div class="h-full flex flex-col">
    <div class="max-w-4xl mx-auto w-full">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">System Settings</h1>
        <p class="text-slate-400">
          Configure global rules for student attendance.
        </p>
      </header>

      <div v-if="loading" class="animate-pulse space-y-4">
        <div class="h-64 bg-slate-800 rounded-2xl"></div>
      </div>

      <form v-else @submit.prevent="saveSettings" class="space-y-6">
        <!-- Rules Card -->
        <div class="bg-slate-800 rounded-2xl p-6 border border-white/5">
          <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <svg
              class="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Compliance Rules
          </h2>

          <div class="space-y-6">
            <!-- Toggle: Require Photo -->
            <div class="flex items-center justify-between">
              <div>
                <label class="text-white font-medium block"
                  >Require Photo Evidence</label
                >
                <p class="text-slate-400 text-sm">
                  Students must take a selfie to clock in/out.
                </p>
              </div>
              <button
                type="button"
                @click="config.requirePhoto = !config.requirePhoto"
                :class="config.requirePhoto ? 'bg-blue-600' : 'bg-slate-700'"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <span
                  :class="
                    config.requirePhoto ? 'translate-x-6' : 'translate-x-1'
                  "
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                ></span>
              </button>
            </div>

            <!-- Toggle: Require Location -->
            <div
              class="flex items-center justify-between pt-6 border-t border-white/5"
            >
              <div>
                <label class="text-white font-medium block"
                  >Require Location Check</label
                >
                <p class="text-slate-400 text-sm">
                  Restrict clock-in to office radius.
                </p>
              </div>
              <button
                type="button"
                @click="config.requireLocation = !config.requireLocation"
                :class="
                  config.requireLocation ? 'bg-emerald-600' : 'bg-slate-700'
                "
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <span
                  :class="
                    config.requireLocation ? 'translate-x-6' : 'translate-x-1'
                  "
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                ></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Location Settings -->
        <div
          class="bg-slate-800 rounded-2xl p-6 border border-white/5 opacity-100 transition-opacity"
          :class="{
            'opacity-50 pointer-events-none': !config.requireLocation,
          }"
        >
          <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <svg
              class="w-5 h-5 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Office Location
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                class="block text-slate-400 text-sm font-bold mb-2 uppercase"
                >Latitude</label
              >
              <input
                v-model.number="config.officeLat"
                type="number"
                step="any"
                class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label
                class="block text-slate-400 text-sm font-bold mb-2 uppercase"
                >Longitude</label
              >
              <input
                v-model.number="config.officeLng"
                type="number"
                step="any"
                class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label
                class="block text-slate-400 text-sm font-bold mb-2 uppercase"
                >Radius (Meters)</label
              >
              <input
                v-model.number="config.officeRadius"
                type="number"
                class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div class="flex items-end">
              <button
                type="button"
                @click="setCurrentLocation"
                class="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Use My Current Location
              </button>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="pt-4 flex justify-end">
          <button
            :disabled="saving"
            type="submit"
            class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2"
          >
            <span
              v-if="saving"
              class="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            ></span>
            {{ saving ? "Saving..." : "Save Configuration" }}
          </button>
        </div>
      </form>

      <!-- Success Toast -->
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl animate-in slide-in-from-bottom-5 duration-300 flex items-center gap-3"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        Settings Saved Automatically!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const loading = ref(true);
const saving = ref(false);
const showToast = ref(false);

const config = ref({
  requirePhoto: true,
  requireLocation: true,
  officeLat: 2.920066,
  officeLng: 101.636483,
  officeRadius: 300,
});

onMounted(async () => {
  try {
    const docRef = doc(db, "attendance_config", "global");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      config.value = { ...config.value, ...docSnap.data() };
    } else {
      // Initialize if not exists
      await setDoc(docRef, config.value);
    }
  } catch (err) {
    console.error("Error loading config:", err);
  } finally {
    loading.value = false;
  }
});

async function saveSettings() {
  saving.value = true;
  try {
    await setDoc(doc(db, "attendance_config", "global"), config.value);
    showToast.value = true;
    setTimeout(() => (showToast.value = false), 3000);
  } catch (err) {
    alert("Error saving: " + err.message);
  } finally {
    saving.value = false;
  }
}

function setCurrentLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      config.value.officeLat = pos.coords.latitude;
      config.value.officeLng = pos.coords.longitude;
    },
    (err) => {
      alert("Error getting location: " + err.message);
    },
  );
}
</script>
