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
          <router-link
            to="/attendance/dashboard"
            class="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
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
            Dashboard
          </router-link>
        </div>
        <span class="text-white font-bold tracking-tight">My History</span>
        <button
          @click="handleLogout"
          class="text-rose-400 hover:text-rose-300 text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Date Filter -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 class="text-2xl font-bold text-white mb-1">Attendance Log</h1>
          <p class="text-white/40 text-sm">
            Review your past attendance records
          </p>
        </div>
        <div
          class="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-white/10 w-full sm:w-auto"
        >
          <input
            v-model="filterMonth"
            type="month"
            class="bg-transparent text-white text-sm px-4 py-2 focus:outline-none w-full sm:w-auto"
          />
          <button
            @click="loadLogs"
            class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
          <p
            class="text-white/40 text-xs font-bold uppercase tracking-wider mb-1"
          >
            Days Worked
          </p>
          <p class="text-2xl font-bold text-white">{{ monthStats.days }}</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
          <p
            class="text-white/40 text-xs font-bold uppercase tracking-wider mb-1"
          >
            Total Hours
          </p>
          <p class="text-2xl font-bold text-white">
            {{ monthStats.hours.toFixed(1) }}
          </p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
          <p
            class="text-white/40 text-xs font-bold uppercase tracking-wider mb-1"
          >
            On Time
          </p>
          <p class="text-2xl font-bold text-emerald-400">
            {{ monthStats.atOffice }}
          </p>
          <p class="text-xs text-white/30">At Office</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
          <p
            class="text-white/40 text-xs font-bold uppercase tracking-wider mb-1"
          >
            Remote
          </p>
          <p class="text-2xl font-bold text-orange-400">
            {{ monthStats.outside }}
          </p>
          <p class="text-xs text-white/30">Outside Range</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div
          v-for="i in 3"
          :key="i"
          class="h-24 bg-slate-800/50 rounded-2xl animate-pulse"
        ></div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="logs.length === 0"
        class="text-center py-20 bg-slate-800/30 rounded-3xl border border-white/5 border-dashed"
      >
        <div
          class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-white/20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 class="text-white font-medium mb-1">No records found</h3>
        <p class="text-white/40 text-sm">Try selecting a different month</p>
      </div>

      <!-- Logs List (Desktop & Mobile Responsive) -->
      <div v-else class="space-y-4">
        <div
          v-for="log in logs"
          :key="log.id"
          class="group bg-slate-800/40 hover:bg-slate-800/60 transition-colors rounded-2xl border border-white/5 overflow-hidden"
        >
          <div
            class="p-5 flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <!-- Date Column -->
            <div class="flex items-center gap-4 min-w-[120px]">
              <div
                class="text-center bg-white/5 rounded-xl p-2 w-14 border border-white/5"
              >
                <span class="block text-xs text-white/40 uppercase">{{
                  formatMonth(log.clockInTime)
                }}</span>
                <span class="block text-xl font-bold text-white">{{
                  formatDay(log.clockInTime)
                }}</span>
              </div>
              <div>
                <p class="text-sm font-medium text-white">
                  {{ formatWeekday(log.clockInTime) }}
                </p>
                <p class="text-xs text-white/40" v-if="log.totalHours">
                  {{ log.totalHours.toFixed(1) }} hrs
                </p>
              </div>
            </div>

            <!-- Times Grid -->
            <div class="flex-1 grid grid-cols-2 gap-4 w-full md:w-auto">
              <!-- Clock In -->
              <div class="bg-white/5 rounded-xl p-3 border border-white/5">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs text-white/40 font-medium"
                    >CLOCK IN</span
                  >
                  <button
                    v-if="log.clockInPhoto"
                    @click="viewPhoto(log.clockInPhoto)"
                    class="text-blue-400 hover:text-blue-300"
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
                <p class="text-white font-medium">
                  {{ formatTime(log.clockInTime) }}
                </p>
                <div
                  class="mt-1 flex items-center gap-1.5"
                  v-if="log.isClockInOutside"
                >
                  <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  <span
                    class="text-[10px] text-orange-300 cursor-pointer hover:underline"
                    @click="showReason(log)"
                    >Outside</span
                  >
                </div>
                <div class="mt-1 flex items-center gap-1.5" v-else>
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  <span class="text-[10px] text-emerald-300">Office</span>
                </div>
              </div>

              <!-- Clock Out -->
              <div class="bg-white/5 rounded-xl p-3 border border-white/5">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs text-white/40 font-medium"
                    >CLOCK OUT</span
                  >
                  <button
                    v-if="log.clockOutPhoto"
                    @click="viewPhoto(log.clockOutPhoto)"
                    class="text-blue-400 hover:text-blue-300"
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
                <p class="text-white font-medium">
                  {{
                    log.clockOutTime ? formatTime(log.clockOutTime) : "--:--"
                  }}
                </p>
                <div v-if="log.clockOutTime">
                  <div
                    class="mt-1 flex items-center gap-1.5"
                    v-if="log.isClockOutOutside"
                  >
                    <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span class="text-[10px] text-orange-300">Outside</span>
                  </div>
                  <div class="mt-1 flex items-center gap-1.5" v-else>
                    <span
                      class="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                    ></span>
                    <span class="text-[10px] text-emerald-300">Office</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reason Expandable (if needed) -->
          <div
            v-if="log.clockInReason || log.clockOutReason"
            class="px-5 pb-5 pt-0"
          >
            <div
              class="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-sm flex items-start gap-2"
            >
              <svg
                class="w-4 h-4 text-orange-400 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="text-orange-200/80 italic">
                "{{ log.clockInReason || log.clockOutReason }}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Photo Modal -->
    <div
      v-if="photoModal"
      class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      @click="photoModal = null"
    >
      <div class="relative max-w-lg w-full">
        <button
          @click="photoModal = null"
          class="absolute -top-12 right-0 text-white hover:text-white/70"
        >
          Close
        </button>
        <img
          :src="photoModal"
          class="w-full rounded-2xl shadow-2xl border border-white/10"
          @click.stop
        />
      </div>
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
const loading = ref(true);

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
  loading.value = true;
  try {
    const [year, month] = filterMonth.value.split("-").map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const logsRef = collection(db, "attendance_logs");

    // Fetch all logs for this student (avoid complex index requirement)
    const q = query(logsRef, where("studentId", "==", student.value.id));

    const snapshot = await getDocs(q);

    // Client-side Filter & Sort
    logs.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((log) => {
        if (!log.clockInTime) return false;
        const date = log.clockInTime.toDate();
        return date >= startDate && date <= endDate;
      })
      .sort((a, b) => b.clockInTime.toMillis() - a.clockInTime.toMillis());
  } catch (err) {
    console.error("Error loading logs:", err);
    alert("Failed to load logs. Please try again.");
  } finally {
    loading.value = false;
  }
}

function formatDay(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.getDate();
}

function formatWeekday(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-US", { weekday: "short" });
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
  // handled inline now
}

function handleLogout() {
  localStorage.removeItem("attendance_student");
  router.push("/attendance");
}
</script>
