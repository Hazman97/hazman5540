<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
  >
    <!-- Header -->
    <header
      class="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40"
    >
      <div
        class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center"
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
          <span class="text-white font-bold hidden sm:inline">Attendance</span>
        </div>
        <div class="flex items-center gap-4">
          <router-link
            to="/attendance/logs"
            class="text-white/70 hover:text-white text-sm flex items-center gap-1"
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            My Logs
          </router-link>
          <button
            @click="handleLogout"
            class="text-red-400 hover:text-red-300 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Welcome -->
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">
          Hello, {{ studentName }}! 👋
        </h1>
        <p class="text-white/60">{{ currentDate }}</p>
      </div>

      <!-- Status Card -->
      <div
        :class="[
          'rounded-3xl p-6 sm:p-8 mb-8 border',
          isClockedIn
            ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30'
            : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30',
        ]"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <p class="text-white/60 text-sm mb-1">Current Status</p>
            <h2
              class="text-2xl font-bold"
              :class="isClockedIn ? 'text-green-400' : 'text-blue-400'"
            >
              {{ isClockedIn ? "Clocked In" : "Not Clocked In" }}
            </h2>
            <p
              v-if="isClockedIn && todayLog"
              class="text-white/50 text-sm mt-1"
            >
              Since {{ formatTime(todayLog.clockInTime) }}
            </p>
          </div>
          <div
            :class="[
              'w-20 h-20 rounded-2xl flex items-center justify-center',
              isClockedIn ? 'bg-green-500/30' : 'bg-blue-500/30',
            ]"
          >
            <svg
              v-if="isClockedIn"
              class="w-10 h-10 text-green-400"
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
              class="w-10 h-10 text-blue-400"
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
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <button
          @click="startClockIn"
          :disabled="isClockedIn || processing"
          class="p-6 sm:p-8 rounded-2xl border transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 hover:border-green-500/50 group"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-14 h-14 bg-green-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
            >
              <svg
                class="w-7 h-7 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <div class="text-left">
              <h3 class="text-xl font-semibold text-white">Clock In</h3>
              <p class="text-white/50 text-sm">Start your day</p>
            </div>
          </div>
        </button>

        <button
          @click="startClockOut"
          :disabled="!isClockedIn || processing"
          class="p-6 sm:p-8 rounded-2xl border transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30 hover:border-orange-500/50 group"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-14 h-14 bg-orange-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
            >
              <svg
                class="w-7 h-7 text-orange-400"
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
            </div>
            <div class="text-left">
              <h3 class="text-xl font-semibold text-white">Clock Out</h3>
              <p class="text-white/50 text-sm">End your day</p>
            </div>
          </div>
        </button>
      </div>

      <!-- Today's Summary -->
      <div
        v-if="todayLog"
        class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
      >
        <h3 class="text-lg font-semibold text-white mb-4">Today's Summary</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p class="text-white/50 text-sm">Clock In</p>
            <p class="text-white font-medium">
              {{ formatTime(todayLog.clockInTime) }}
            </p>
          </div>
          <div>
            <p class="text-white/50 text-sm">Clock Out</p>
            <p class="text-white font-medium">
              {{
                todayLog.clockOutTime ? formatTime(todayLog.clockOutTime) : "-"
              }}
            </p>
          </div>
          <div>
            <p class="text-white/50 text-sm">Hours</p>
            <p class="text-white font-medium">
              {{
                todayLog.totalHours ? todayLog.totalHours.toFixed(1) + "h" : "-"
              }}
            </p>
          </div>
          <div>
            <p class="text-white/50 text-sm">Location</p>
            <p
              :class="[
                'font-medium',
                todayLog.isClockInOutside
                  ? 'text-orange-400'
                  : 'text-green-400',
              ]"
            >
              {{ todayLog.isClockInOutside ? "Outside" : "Office" }}
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- Camera Modal -->
    <div v-if="showCamera" class="fixed inset-0 bg-black z-50 flex flex-col">
      <div class="p-4 flex items-center justify-between">
        <h3 class="text-white font-bold text-lg">
          {{ clockType === "in" ? "Clock In" : "Clock Out" }} Photo
        </h3>
        <button @click="cancelCamera" class="text-white/70 hover:text-white">
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
      </div>

      <div class="flex-1 relative">
        <video
          ref="videoRef"
          autoplay
          playsinline
          class="w-full h-full object-cover"
        ></video>
        <canvas ref="canvasRef" class="hidden"></canvas>

        <!-- Camera switch button -->
        <button
          @click="switchCamera"
          class="absolute top-4 right-4 p-3 bg-white/20 rounded-full text-white"
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

      <div class="p-6 flex justify-center">
        <button
          @click="capturePhoto"
          class="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <div
            class="w-16 h-16 bg-white rounded-full border-4 border-gray-300"
          ></div>
        </button>
      </div>
    </div>

    <!-- Preview & Reason Modal -->
    <div
      v-if="showPreview"
      class="fixed inset-0 bg-black/90 z-50 flex flex-col"
    >
      <div class="p-4 flex items-center justify-between">
        <h3 class="text-white font-bold text-lg">
          Confirm {{ clockType === "in" ? "Clock In" : "Clock Out" }}
        </h3>
        <button @click="cancelPreview" class="text-white/70 hover:text-white">
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
      </div>

      <div class="flex-1 overflow-y-auto p-4">
        <img
          :src="capturedPhoto"
          class="w-full max-w-md mx-auto rounded-xl mb-6"
        />

        <!-- Location Status -->
        <div class="max-w-md mx-auto mb-6">
          <div
            v-if="gettingLocation"
            class="flex items-center gap-3 text-white/70"
          >
            <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
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
            Getting location...
          </div>
          <div
            v-else-if="location"
            :class="[
              'p-4 rounded-xl flex items-center gap-3',
              isInsideOffice
                ? 'bg-green-500/20 text-green-400'
                : 'bg-orange-500/20 text-orange-400',
            ]"
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            {{
              isInsideOffice
                ? "You are at the office"
                : "You are outside the office"
            }}
          </div>
          <div v-else class="p-4 rounded-xl bg-red-500/20 text-red-400">
            Unable to get location. Please enable GPS.
          </div>
        </div>

        <!-- Reason Input (if outside) -->
        <div v-if="!isInsideOffice && location" class="max-w-md mx-auto mb-6">
          <label class="block text-white/70 text-sm mb-2">
            Reason for being outside office <span class="text-red-400">*</span>
          </label>
          <textarea
            v-model="reason"
            rows="3"
            placeholder="e.g., Client meeting at Menara XYZ"
            class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-orange-500"
            required
          ></textarea>
        </div>
      </div>

      <div class="p-4 flex gap-3 max-w-md mx-auto w-full">
        <button
          @click="retakePhoto"
          class="flex-1 py-3 bg-white/10 text-white rounded-xl"
        >
          Retake
        </button>
        <button
          @click="confirmClock"
          :disabled="processing || (!isInsideOffice && !reason)"
          class="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl disabled:opacity-50"
        >
          {{ processing ? "Processing..." : "Confirm" }}
        </button>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccess"
      class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
    >
      <div
        class="bg-slate-800 rounded-2xl p-8 text-center max-w-sm w-full border border-white/10"
      >
        <div
          class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-10 h-10 text-green-400"
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
        </div>
        <h3 class="text-xl font-bold text-white mb-2">
          {{ clockType === "in" ? "Clocked In!" : "Clocked Out!" }}
        </h3>
        <p class="text-white/60 mb-6">{{ successMessage }}</p>
        <button
          @click="
            showSuccess = false;
            loadTodayLog();
          "
          class="w-full py-3 bg-green-600 text-white rounded-xl"
        >
          Done
        </button>
      </div>
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

// Office location config
const OFFICE = {
  lat: 2.9200662208003716,
  lng: 101.63648374057146,
  radius: 300,
};

// State
const student = ref(null);
const studentName = ref("");
const todayLog = ref(null);
const isClockedIn = computed(
  () => todayLog.value && !todayLog.value.clockOutTime,
);

const showCamera = ref(false);
const showPreview = ref(false);
const showSuccess = ref(false);
const clockType = ref("in"); // 'in' or 'out'
const processing = ref(false);
const successMessage = ref("");

const videoRef = ref(null);
const canvasRef = ref(null);
const capturedPhoto = ref(null);
const capturedBlob = ref(null);
const mediaStream = ref(null);
const facingMode = ref("user"); // 'user' = front camera

const location = ref(null);
const gettingLocation = ref(false);
const reason = ref("");

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
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Haversine formula for distance calculation
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000; // Earth's radius in meters
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

// Lifecycle
onMounted(async () => {
  const stored = localStorage.getItem("attendance_student");
  if (!stored) {
    router.push("/attendance");
    return;
  }
  student.value = JSON.parse(stored);
  studentName.value = student.value.name;
  await loadTodayLog();
});

onUnmounted(() => {
  stopCamera();
});

// Functions
async function loadTodayLog() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    const logsRef = collection(db, "attendance_logs");
    const q = query(
      logsRef,
      where("studentId", "==", student.value.id),
      where("clockInTime", ">=", todayTimestamp),
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      todayLog.value = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    } else {
      todayLog.value = null;
    }
  } catch (err) {
    console.error("Error loading today log:", err);
  }
}

function formatTime(timestamp) {
  if (!timestamp) return "-";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleTimeString("en-MY", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Camera functions
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
  reason.value = "";
  location.value = null;

  try {
    mediaStream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: facingMode.value },
      audio: false,
    });

    if (videoRef.value) {
      videoRef.value.srcObject = mediaStream.value;
    }
  } catch (err) {
    console.error("Camera error:", err);
    alert("Unable to access camera. Please grant permission.");
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
}

function capturePhoto() {
  const video = videoRef.value;
  const canvas = canvasRef.value;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  capturedPhoto.value = canvas.toDataURL("image/jpeg", 0.8);

  canvas.toBlob(
    (blob) => {
      capturedBlob.value = blob;
    },
    "image/jpeg",
    0.8,
  );

  stopCamera();
  showCamera.value = false;
  showPreview.value = true;

  getLocation();
}

function cancelCamera() {
  stopCamera();
  showCamera.value = false;
}

function cancelPreview() {
  showPreview.value = false;
  capturedPhoto.value = null;
  capturedBlob.value = null;
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
    console.error("Location error:", err);
    location.value = null;
  } finally {
    gettingLocation.value = false;
  }
}

async function confirmClock() {
  if (!isInsideOffice.value && !reason.value) {
    alert("Please provide a reason for being outside the office.");
    return;
  }

  processing.value = true;

  try {
    // Upload photo
    const photoResult = await uploadAttendancePhoto(
      capturedBlob.value,
      clockType.value === "in" ? "clockin" : "clockout",
      student.value.id,
    );

    if (!photoResult.success) {
      throw new Error("Failed to upload photo");
    }

    if (clockType.value === "in") {
      // Create new log
      await addDoc(collection(db, "attendance_logs"), {
        studentId: student.value.id,
        studentName: student.value.name,
        clockInTime: Timestamp.now(),
        clockOutTime: null,
        clockInPhoto: photoResult.url,
        clockOutPhoto: null,
        clockInLat: location.value?.lat || null,
        clockInLng: location.value?.lng || null,
        clockOutLat: null,
        clockOutLng: null,
        clockInReason: isInsideOffice.value ? "" : reason.value,
        clockOutReason: "",
        isClockInOutside: !isInsideOffice.value,
        isClockOutOutside: false,
        totalHours: null,
        createdAt: Timestamp.now(),
      });
      successMessage.value = `You clocked in at ${new Date().toLocaleTimeString()}`;
    } else {
      // Update existing log
      const clockInTime = todayLog.value.clockInTime.toDate();
      const clockOutTime = new Date();
      const totalHours = (clockOutTime - clockInTime) / (1000 * 60 * 60);

      await updateDoc(doc(db, "attendance_logs", todayLog.value.id), {
        clockOutTime: Timestamp.now(),
        clockOutPhoto: photoResult.url,
        clockOutLat: location.value?.lat || null,
        clockOutLng: location.value?.lng || null,
        clockOutReason: isInsideOffice.value ? "" : reason.value,
        isClockOutOutside: !isInsideOffice.value,
        totalHours: totalHours,
      });
      successMessage.value = `You worked ${totalHours.toFixed(1)} hours today`;
    }

    showPreview.value = false;
    showSuccess.value = true;
  } catch (err) {
    console.error("Clock error:", err);
    alert("An error occurred. Please try again.");
  } finally {
    processing.value = false;
  }
}

function handleLogout() {
  localStorage.removeItem("attendance_student");
  router.push("/attendance");
}
</script>
