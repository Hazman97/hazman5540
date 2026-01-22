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
          <router-link
            to="/attendance/dashboard"
            class="text-white/70 hover:text-white flex items-center gap-2"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </router-link>
        </div>
        <span class="text-white font-bold">My Logs</span>
        <button
          @click="handleLogout"
          class="text-red-400 hover:text-red-300 text-sm"
        >
          Logout
        </button>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold text-white mb-6">Attendance History</h1>

      <!-- Stats Summary -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div
          class="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4"
        >
          <p class="text-white/50 text-sm">This Month</p>
          <p class="text-2xl font-bold text-white">{{ monthStats.days }}</p>
          <p class="text-white/40 text-xs">days worked</p>
        </div>
        <div
          class="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4"
        >
          <p class="text-white/50 text-sm">Total Hours</p>
          <p class="text-2xl font-bold text-white">
            {{ monthStats.hours.toFixed(1) }}
          </p>
          <p class="text-white/40 text-xs">hours worked</p>
        </div>
        <div
          class="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4"
        >
          <p class="text-white/50 text-sm">At Office</p>
          <p class="text-2xl font-bold text-green-400">
            {{ monthStats.atOffice }}
          </p>
          <p class="text-white/40 text-xs">days</p>
        </div>
        <div
          class="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4"
        >
          <p class="text-white/50 text-sm">Outside</p>
          <p class="text-2xl font-bold text-orange-400">
            {{ monthStats.outside }}
          </p>
          <p class="text-white/40 text-xs">days</p>
        </div>
      </div>

      <!-- Filter -->
      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          v-model="filterMonth"
          type="month"
          class="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
        />
        <button
          @click="loadLogs"
          class="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500"
        >
          Filter
        </button>
      </div>

      <!-- Logs List -->
      <div class="space-y-4">
        <div
          v-for="log in logs"
          :key="log.id"
          class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          <div class="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <!-- Date -->
            <div class="flex-shrink-0 w-16">
              <p class="text-2xl font-bold text-white">
                {{ formatDay(log.clockInTime) }}
              </p>
              <p class="text-white/50 text-sm">
                {{ formatMonth(log.clockInTime) }}
              </p>
            </div>

            <!-- Times -->
            <div class="flex-1 grid grid-cols-3 gap-4">
              <div>
                <p class="text-white/50 text-xs mb-1">Clock In</p>
                <div class="flex items-center gap-2">
                  <p class="text-white font-medium">
                    {{ formatTime(log.clockInTime) }}
                  </p>
                  <button
                    v-if="log.clockInPhoto"
                    @click="viewPhoto(log.clockInPhoto)"
                    class="text-blue-400"
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <p class="text-white/50 text-xs mb-1">Clock Out</p>
                <div class="flex items-center gap-2">
                  <p class="text-white font-medium">
                    {{ log.clockOutTime ? formatTime(log.clockOutTime) : "-" }}
                  </p>
                  <button
                    v-if="log.clockOutPhoto"
                    @click="viewPhoto(log.clockOutPhoto)"
                    class="text-blue-400"
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <p class="text-white/50 text-xs mb-1">Hours</p>
                <p class="text-white font-medium">
                  {{ log.totalHours ? log.totalHours.toFixed(1) + "h" : "-" }}
                </p>
              </div>
            </div>

            <!-- Location Badge -->
            <div class="flex-shrink-0">
              <span
                v-if="log.isClockInOutside || log.isClockOutOutside"
                class="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs cursor-pointer"
                @click="showReason(log)"
              >
                Outside Office
              </span>
              <span
                v-else
                class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs"
              >
                At Office
              </span>
            </div>
          </div>

          <!-- Reason (if outside) -->
          <div v-if="log.clockInReason || log.clockOutReason" class="px-4 pb-4">
            <div
              class="p-3 bg-orange-500/10 rounded-lg text-orange-300 text-sm"
            >
              <span class="text-orange-400 font-medium">Reason:</span>
              {{ log.clockInReason || log.clockOutReason }}
            </div>
          </div>
        </div>

        <div v-if="logs.length === 0" class="text-center py-12 text-white/40">
          No attendance records found
        </div>
      </div>
    </main>

    <!-- Photo Modal -->
    <div
      v-if="photoModal"
      class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      @click="photoModal = null"
    >
      <img
        :src="photoModal"
        class="max-w-full max-h-[80vh] rounded-xl"
        @click.stop
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";

const router = useRouter();
const student = ref(null);
const logs = ref([]);
const filterMonth = ref("");
const photoModal = ref(null);

const monthStats = computed(() => {
  let days = 0,
    hours = 0,
    atOffice = 0,
    outside = 0;
  logs.value.forEach((log) => {
    days++;
    if (log.totalHours) hours += log.totalHours;
    if (log.isClockInOutside || log.isClockOutOutside) {
      outside++;
    } else {
      atOffice++;
    }
  });
  return { days, hours, atOffice, outside };
});

onMounted(async () => {
  const stored = localStorage.getItem("attendance_student");
  if (!stored) {
    router.push("/attendance");
    return;
  }
  student.value = JSON.parse(stored);

  // Default to current month
  const now = new Date();
  filterMonth.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  await loadLogs();
});

async function loadLogs() {
  try {
    const [year, month] = filterMonth.value.split("-").map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const logsRef = collection(db, "attendance_logs");
    const q = query(
      logsRef,
      where("studentId", "==", student.value.id),
      where("clockInTime", ">=", Timestamp.fromDate(startDate)),
      where("clockInTime", "<=", Timestamp.fromDate(endDate)),
      orderBy("clockInTime", "desc"),
    );

    const snapshot = await getDocs(q);
    logs.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error loading logs:", err);
  }
}

function formatDay(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.getDate();
}

function formatMonth(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-US", { month: "short" });
}

function formatTime(timestamp) {
  if (!timestamp) return "-";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleTimeString("en-MY", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function viewPhoto(url) {
  photoModal.value = url;
}

function showReason(log) {
  alert(
    `Reason: ${log.clockInReason || log.clockOutReason || "No reason provided"}`,
  );
}

function handleLogout() {
  localStorage.removeItem("attendance_student");
  router.push("/attendance");
}
</script>
