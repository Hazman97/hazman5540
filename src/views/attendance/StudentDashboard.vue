<template>
  <div class="min-h-screen bg-slate-900 pb-20 sm:pb-0">
    <!-- Header -->
    <header
      class="bg-slate-900/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40"
    >
      <div
        class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span class="text-white font-bold tracking-tight">Intern Portal</span>
        </div>

        <div class="flex items-center gap-4">
          <router-link
            to="/attendance/logs"
            class="text-white/60 hover:text-white transition-colors text-sm font-medium hidden sm:flex items-center gap-2"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            History
          </router-link>
          <button
            @click="handleLogout"
            class="flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors text-sm font-medium bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span class="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-xl mx-auto px-4 py-8">
      <!-- Welcome Section -->
      <div class="mb-8 text-center sm:text-left">
        <h1 class="text-3xl font-bold text-white mb-2 tracking-tight">
          Good {{ timeOfDay }}, {{ studentName?.split(" ")[0] }}!
        </h1>
        <p class="text-indigo-200/60 font-medium">{{ currentDate }}</p>
      </div>

      <!-- Location Status Bar -->
      <div
        class="mb-6 bg-slate-800/50 rounded-2xl p-4 border border-white/5 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <p
              class="text-xs text-white/40 font-medium uppercase tracking-wider"
            >
              Current Location
            </p>
            <div
              v-if="gettingLocation"
              class="flex items-center gap-2 text-sm text-white/60"
            >
              <svg class="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Locating...
            </div>
            <p
              v-else-if="location"
              :class="[
                'text-sm font-semibold',
                isInsideOffice ? 'text-emerald-400' : 'text-orange-400',
              ]"
            >
              {{
                isInsideOffice
                  ? "At Office (Tamarind Square)"
                  : "Outside Office Range"
              }}
            </p>
            <p v-else class="text-sm text-rose-400">Location unavailable</p>
          </div>
        </div>
        <button
          @click="getLocation"
          class="text-white/30 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
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
        </button>
      </div>

      <!-- Main Status Card -->
      <div
        v-if="loading"
        class="animate-pulse bg-slate-800 rounded-3xl h-64 mb-6"
      ></div>

      <div
        v-else
        :class="[
          'relative overflow-hidden rounded-3xl p-8 mb-8 transition-all duration-500 border',
          isClockedIn
            ? 'bg-gradient-to-br from-emerald-900/40 to-slate-900 border-emerald-500/20 shadow-2xl shadow-emerald-900/20'
            : 'bg-gradient-to-br from-blue-900/40 to-slate-900 border-blue-500/20 shadow-2xl shadow-blue-900/20',
        ]"
      >
        <!-- Background Decor -->
        <div
          class="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20"
          :class="isClockedIn ? 'bg-emerald-500' : 'bg-blue-500'"
        ></div>

        <div class="relative z-10 flex flex-col items-center text-center">
          <div
            class="mb-4 p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-inner"
          >
            <svg
              v-if="isClockedIn"
              class="w-12 h-12 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]"
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
            <svg
              v-else
              class="w-12 h-12 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </div>

          <h2 class="text-3xl font-bold text-white mb-2">
            {{ isClockedIn ? "You are Clocked In" : "Not Clocked In" }}
          </h2>

          <p
            v-if="isClockedIn && todayLog"
            class="text-lg text-emerald-200/70 font-medium mb-8"
          >
            Started at {{ formatTime(todayLog.clockInTime) }}
          </p>
          <p v-else class="text-lg text-blue-200/70 font-medium mb-8">
            Ready to start your day?
          </p>

          <!-- Main Buttton -->
          <button
            @click="isClockedIn ? startClockOut() : startClockIn()"
            :disabled="processing || gettingLocation"
            :class="[
              'w-full sm:w-auto px-12 py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3',
              isClockedIn
                ? 'bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white shadow-rose-900/20'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-900/20',
            ]"
          >
            <span
              v-if="processing"
              class="animate-spin w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
            ></span>
            <span v-else>{{
              isClockedIn ? "Clock Out Now" : "Clock In Now"
            }}</span>
          </button>

          <p
            v-if="!location"
            class="mt-4 text-xs text-white/30 bg-slate-900/50 px-3 py-1 rounded-full"
          >
            ⚠️ Waiting for location...
          </p>
        </div>
      </div>

      <!-- Today's Stats -->
      <div v-if="todayLog" class="grid grid-cols-2 gap-4">
        <div class="bg-slate-800/50 p-5 rounded-2xl border border-white/5">
          <p
            class="text-white/40 text-xs font-bold uppercase tracking-wider mb-1"
          >
            Time In
          </p>
          <p class="text-xl font-bold text-white">
            {{ formatTime(todayLog.clockInTime) }}
          </p>
          <p
            class="text-xs mt-1"
            :class="
              todayLog.isClockInOutside ? 'text-orange-400' : 'text-emerald-400'
            "
          >
            {{ todayLog.isClockInOutside ? "• Outside" : "• Office" }}
          </p>
        </div>
        <div class="bg-slate-800/50 p-5 rounded-2xl border border-white/5">
          <p
            class="text-white/40 text-xs font-bold uppercase tracking-wider mb-1"
          >
            Time Out
          </p>
          <p class="text-xl font-bold text-white">
            {{
              todayLog.clockOutTime
                ? formatTime(todayLog.clockOutTime)
                : "--:--"
            }}
          </p>
          <p v-if="todayLog.totalHours" class="text-xs text-white/50 mt-1">
            {{ todayLog.totalHours.toFixed(1) }} hrs worked
          </p>
        </div>
      </div>
    </main>

    <!-- Navigation Bar (Mobile) -->
    <nav
      class="fixed bottom-0 w-full bg-slate-900/90 backdrop-blur-xl border-t border-white/10 pb-safe sm:hidden"
    >
      <div class="grid grid-cols-2 h-16">
        <button
          class="flex flex-col items-center justify-center gap-1 text-blue-400"
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-xs font-medium">Clock In</span>
        </button>
        <router-link
          to="/attendance/logs"
          class="flex flex-col items-center justify-center gap-1 text-white/40 hover:text-white"
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span class="text-xs font-medium">History</span>
        </router-link>
      </div>
    </nav>

    <!-- Camera Modal (Full Screen) -->
    <div
      v-if="showCamera"
      class="fixed inset-0 bg-black z-50 flex flex-col animate-in fade-in duration-200"
    >
      <!-- Camera Bar -->
      <div
        class="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent"
      >
        <button
          @click="cancelCamera"
          class="p-2 rounded-full bg-white/20 text-white backdrop-blur-md"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <span
          class="text-white font-bold bg-black/50 px-4 py-1 rounded-full backdrop-blur-md text-sm"
        >
          {{ clockType === "in" ? "Clocking In" : "Clocking Out" }}
        </span>
        <button
          @click="switchCamera"
          class="p-2 rounded-full bg-white/20 text-white backdrop-blur-md"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      <!-- Camera Feed -->
      <div
        class="relative flex-1 bg-gray-900 flex items-center justify-center overflow-hidden"
      >
        <div
          v-if="!cameraReady"
          class="absolute inset-0 flex flex-col items-center justify-center text-white/50 gap-4"
        >
          <svg class="animate-spin w-10 h-10" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          <p>Starting Camera...</p>
        </div>
        <video
          ref="videoRef"
          autoplay
          playsinline
          class="w-full h-full object-cover"
        ></video>
        <canvas ref="canvasRef" class="hidden"></canvas>
      </div>

      <!-- Shutter Controls -->
      <div
        class="bg-black/80 p-8 pb-12 flex justify-center items-center backdrop-blur-md"
      >
        <button @click="capturePhoto" class="group relative">
          <div
            class="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all group-active:scale-95"
          >
            <div
              class="w-16 h-16 bg-white rounded-full transition-all group-active:scale-90"
            ></div>
          </div>
        </button>
      </div>
    </div>

    <!-- Preview Modal -->
    <div
      v-if="showPreview"
      class="fixed inset-0 bg-slate-900 z-50 flex flex-col animate-in slide-in-from-bottom-10 duration-200"
    >
      <div
        class="p-4 flex items-center justify-between border-b border-white/10 bg-slate-900"
      >
        <h3 class="text-white font-bold">Confirm Attendance</h3>
        <button @click="retakePhoto" class="text-blue-400 text-sm font-medium">
          Retake
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6">
        <div
          class="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl mb-6"
        >
          <img :src="capturedPhoto" class="w-full h-full object-cover" />
          <div
            class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
          >
            <div class="flex items-center gap-2 text-white">
              <svg
                class="w-4 h-4 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="font-medium text-sm">{{
                new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}</span>
            </div>
          </div>
        </div>

        <!-- Validation Card -->
        <div class="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
          <h4
            class="text-xs font-bold text-white/40 uppercase tracking-wider mb-2"
          >
            Location Validation
          </h4>
          <div class="flex items-start gap-3">
            <div
              :class="[
                'p-2 rounded-lg mt-0.5',
                isInsideOffice
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-orange-500/20 text-orange-400',
              ]"
            >
              <svg
                v-if="isInsideOffice"
                class="w-5 h-5"
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
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <p class="text-white font-medium text-sm">
                {{ isInsideOffice ? "Location Verified" : "Location Mismatch" }}
              </p>
              <p class="text-white/60 text-xs">
                {{
                  isInsideOffice
                    ? "You are within range of Tamarind Square."
                    : "You appear to be away from the office."
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Reason Input -->
        <div v-if="!isInsideOffice" class="animate-in fade-in duration-300">
          <label class="block text-white text-sm font-medium mb-2">
            Why are you clocking in from here?
            <span class="text-rose-400">*</span>
          </label>
          <textarea
            v-model="reason"
            rows="3"
            placeholder="e.g. Working from home, Client meeting..."
            class="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          ></textarea>
        </div>
      </div>

      <div class="p-4 bg-slate-900 border-t border-white/10 safe-area-bottom">
        <button
          @click="confirmClock"
          :disabled="processing || (!isInsideOffice && !reason)"
          class="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-white/30 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
        >
          <span
            v-if="processing"
            class="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          ></span>
          {{ processing ? "Submitting..." : "Confirm & Submit" }}
        </button>
      </div>
    </div>

    <!-- Congratulations Overlay -->
    <div
      v-if="showSuccess"
      class="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300"
    >
      <div
        class="bg-slate-800 rounded-3xl p-8 max-w-sm w-full text-center border border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 mix-blend-overlay"
        ></div>

        <div
          class="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30"
        >
          <svg
            class="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h3 class="text-2xl font-bold text-white mb-2">Success!</h3>
        <p class="text-white/60 mb-8">{{ successMessage }}</p>

        <button
          @click="closeSuccess"
          class="w-full py-3.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-100 transition-colors"
        >
          Awesome
        </button>
      </div>

      <!-- Confetti effect could go here -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { uploadAttendancePhoto } from "@/services/attendanceStorageService";

const router = useRouter();

// Config
const OFFICE = {
  lat: 2.9200662208003716,
  lng: 101.63648374057146,
  radius: 300,
};

// State
const student = ref(null);
const studentName = ref("");
const todayLog = ref(null);
const loading = ref(true);

const isClockedIn = computed(
  () => todayLog.value && !todayLog.value.clockOutTime,
);
const timeOfDay = computed(() => {
  const hr = new Date().getHours();
  if (hr < 12) return "Morning";
  if (hr < 18) return "Afternoon";
  return "Evening";
});

const showCamera = ref(false);
const showPreview = ref(false);
const showSuccess = ref(false);
const clockType = ref("in"); // 'in' or 'out'
const processing = ref(false);
const successMessage = ref("");
const cameraReady = ref(false);

const videoRef = ref(null);
const canvasRef = ref(null);
const capturedPhoto = ref(null);
const capturedBlob = ref(null);
const mediaStream = ref(null);
const facingMode = ref("user");

const location = ref(null);
const gettingLocation = ref(false);
const reason = ref("");

// Computed
const isInsideOffice = computed(() => {
  if (!location.value) return false;
  const distance = haversineDistance(
    location.value.lat,
    location.value.lng,
    OFFICE.lat,
    OFFICE.lng,
  );
  return distance <= OFFICE.radius;
});

const currentDate = computed(() => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
});

// Logic
onMounted(async () => {
  const stored = localStorage.getItem("attendance_student");
  if (!stored) {
    router.push("/attendance");
    return;
  }
  student.value = JSON.parse(stored);
  studentName.value = student.value.name;

  await loadTodayLog();
  loading.value = false;

  // Auto get location on load (better UX)
  getLocation();
});

onUnmounted(() => {
  stopCamera();
});

async function loadTodayLog() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    const logsRef = collection(db, "attendance_logs");

    // Note: This query requires an index. If failed, we catch it.
    const q = query(
      logsRef,
      where("studentId", "==", student.value.id),
      where("clockInTime", ">=", todayTimestamp),
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // Get the latest one if multiple (shouldn't be, but safe)
      const sorted = snapshot.docs.sort(
        (a, b) => b.data().clockInTime - a.data().clockInTime,
      );
      todayLog.value = { id: sorted[0].id, ...sorted[0].data() };
    } else {
      todayLog.value = null;
    }
  } catch (err) {
    console.error("Error loading today log (Index missing?):", err);
    // Graceful fallback or alert?
    // For now we assume user will fix index.
    // Ideally we show a UI warning if in dev mode
  }
}

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatTime(timestamp) {
  if (!timestamp) return "-";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleTimeString("en-MY", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Camera
async function startClockIn() {
  clockType.value = "in";
  await startCamera();
}

async function startClockOut() {
  clockType.value = "out";
  await startCamera();
}

async function startCamera() {
  showCamera.value = true;
  cameraReady.value = false;
  reason.value = "";

  // Refresh location aggressively before clocking
  getLocation();

  try {
    mediaStream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: facingMode.value },
      audio: false,
    });

    if (videoRef.value) {
      videoRef.value.srcObject = mediaStream.value;
      videoRef.value.onloadedmetadata = () => {
        cameraReady.value = true;
      };
    }
  } catch (err) {
    console.error("Camera fail:", err);
    alert("Camera access denied or unavailable.");
    showCamera.value = false;
  }
}

async function switchCamera() {
  facingMode.value = facingMode.value === "user" ? "environment" : "user";
  stopCamera();
  await startCamera();
}

function stopCamera() {
  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach((track) => track.stop());
    mediaStream.value = null;
  }
  cameraReady.value = false;
}

function capturePhoto() {
  if (!cameraReady.value) return;
  const video = videoRef.value;
  const canvas = canvasRef.value;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  // Mirror if user facing
  if (facingMode.value === "user") {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(video, 0, 0);

  capturedPhoto.value = canvas.toDataURL("image/jpeg", 0.8);
  canvas.toBlob((blob) => (capturedBlob.value = blob), "image/jpeg", 0.8);

  stopCamera();
  showCamera.value = false;
  showPreview.value = true;
}

function cancelCamera() {
  stopCamera();
  showCamera.value = false;
}

function retakePhoto() {
  showPreview.value = false;
  startCamera();
}

async function getLocation() {
  gettingLocation.value = true;
  try {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    });
    location.value = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };
  } catch (err) {
    console.error("Loc error:", err);
    location.value = null;
  } finally {
    gettingLocation.value = false;
  }
}

async function confirmClock() {
  if (!isInsideOffice.value && !reason.value) return;

  processing.value = true;

  try {
    const photoResult = await uploadAttendancePhoto(
      capturedBlob.value,
      clockType.value === "in" ? "clockin" : "clockout",
      student.value.id,
    );

    if (!photoResult.success) throw new Error("Upload failed");

    const now = Timestamp.now();
    const locLat = location.value?.lat || null;
    const locLng = location.value?.lng || null;
    const isOutside = !isInsideOffice.value;
    const notes = isInsideOffice.value ? "" : reason.value;

    if (clockType.value === "in") {
      // Create new log object
      const newLogData = {
        studentId: student.value.id,
        studentName: student.value.name,
        clockInTime: now,
        clockOutTime: null,
        clockInPhoto: photoResult.url,
        clockOutPhoto: null,
        clockInLat: locLat,
        clockInLng: locLng,
        clockOutLat: null,
        clockOutLng: null,
        clockInReason: notes,
        clockOutReason: "",
        isClockInOutside: isOutside,
        isClockOutOutside: false,
        totalHours: null,
        createdAt: now,
      };

      const docRef = await addDoc(
        collection(db, "attendance_logs"),
        newLogData,
      );

      // Manually update state so UI updates INSTANTLY
      todayLog.value = { id: docRef.id, ...newLogData };
      successMessage.value = "You are successfully clocked in.";
    } else {
      // Calculate hours
      const clockInTime = todayLog.value.clockInTime.toDate();
      const clockOutTime = new Date();
      const totalHours = (clockOutTime - clockInTime) / (1000 * 60 * 60);

      const updateData = {
        clockOutTime: now,
        clockOutPhoto: photoResult.url,
        clockOutLat: locLat,
        clockOutLng: locLng,
        clockOutReason: notes,
        isClockOutOutside: isOutside,
        totalHours: totalHours,
      };

      await updateDoc(
        doc(db, "attendance_logs", todayLog.value.id),
        updateData,
      );

      // Manually update state
      todayLog.value = { ...todayLog.value, ...updateData };
      successMessage.value = `You worked ${totalHours.toFixed(1)} hours today.`;
    }

    showPreview.value = false;
    showSuccess.value = true;
  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  } finally {
    processing.value = false;
  }
}

function closeSuccess() {
  showSuccess.value = false;
  // We already updated state manually, but we can try to re-fetch to be safe
  // without blocking the UI
  loadTodayLog();
}

function handleLogout() {
  localStorage.removeItem("attendance_student");
  router.push("/attendance");
}
</script>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
