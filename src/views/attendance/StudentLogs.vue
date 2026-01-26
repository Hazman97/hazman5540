<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20 sm:pb-0 transition-colors duration-300"
  >
    <!-- Header -->
    <header
      class="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 sticky top-0 z-40 transition-colors duration-300"
    >
      <div
        class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <router-link
            to="/attendance/dashboard"
            class="text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
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
        <span class="text-slate-900 dark:text-white font-bold tracking-tight"
          >My History</span
        >
        <button
          @click="handleLogout"
          class="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 text-sm font-medium"
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
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Attendance Log
          </h1>
          <p class="text-slate-500 dark:text-white/40 text-sm">
            Review your past attendance records
          </p>
        </div>
        <div
          class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <!-- View Toggle -->
          <div
            class="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none"
          >
            <button
              @click="viewMode = 'list'"
              class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              :class="
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-white/60 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-white/5'
              "
            >
              List
            </button>
            <button
              @click="viewMode = 'calendar'"
              class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              :class="
                viewMode === 'calendar'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-white/60 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-white/5'
              "
            >
              Calendar
            </button>
          </div>

          <!-- Date & Filter -->
          <div
            class="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none"
          >
            <input
              v-model="filterMonth"
              type="month"
              class="bg-transparent text-slate-900 dark:text-white text-sm px-4 py-2 focus:outline-none"
            />
            <button
              @click="loadLogs"
              class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              View
            </button>
          </div>

          <!-- Export Dropdown (Simple) -->
          <div class="flex gap-2">
            <button
              @click="exportCSV"
              title="Export CSV"
              class="p-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-white rounded-xl border border-slate-200 dark:border-white/10 transition-colors shadow-sm dark:shadow-none"
            >
              <svg
                class="w-5 h-5 text-emerald-500 dark:text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
            <button
              @click="exportPDF"
              title="Export PDF"
              class="p-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-white rounded-xl border border-slate-200 dark:border-white/10 transition-colors shadow-sm dark:shadow-none"
            >
              <svg
                class="w-5 h-5 text-rose-500 dark:text-rose-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div
          class="bg-white dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none"
        >
          <p
            class="text-slate-500 dark:text-white/40 text-xs font-bold uppercase tracking-wider mb-1"
          >
            Days Worked
          </p>
          <p class="text-2xl font-bold text-slate-900 dark:text-white">
            {{ monthStats.days }}
          </p>
        </div>
        <div
          class="bg-white dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none"
        >
          <p
            class="text-slate-500 dark:text-white/40 text-xs font-bold uppercase tracking-wider mb-1"
          >
            Total Hours
          </p>
          <p class="text-2xl font-bold text-slate-900 dark:text-white">
            {{ monthStats.hours.toFixed(1) }}
          </p>
        </div>
        <div
          class="bg-white dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none"
        >
          <p
            class="text-slate-500 dark:text-white/40 text-xs font-bold uppercase tracking-wider mb-1"
          >
            On Time
          </p>
          <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {{ monthStats.atOffice }}
          </p>
          <p class="text-xs text-slate-400 dark:text-white/30">At Office</p>
        </div>
        <div
          class="bg-white dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none"
        >
          <p
            class="text-slate-500 dark:text-white/40 text-xs font-bold uppercase tracking-wider mb-1"
          >
            Attendance Score
          </p>
          <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {{ currentStreak }}
          </p>
          <p class="text-xs text-slate-400 dark:text-white/30">Days Present</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div
          v-for="i in 3"
          :key="i"
          class="h-24 bg-white dark:bg-slate-800/50 rounded-2xl animate-pulse"
        ></div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="logs.length === 0"
        class="text-center py-20 bg-white dark:bg-slate-800/30 rounded-3xl border border-slate-200 dark:border-white/5 border-dashed"
      >
        <div
          class="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-slate-400 dark:text-white/20"
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
        <h3 class="text-slate-900 dark:text-white font-medium mb-1">
          No records found
        </h3>
        <p class="text-slate-500 dark:text-white/40 text-sm">
          Try selecting a different month
        </p>
      </div>

      <!-- Calendar View -->
      <div
        v-else-if="viewMode === 'calendar'"
        class="animate-in fade-in duration-300"
      >
        <div
          class="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
        >
          <!-- Headers -->
          <div
            v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
            :key="day"
            class="bg-slate-100 dark:bg-slate-800 text-center py-3"
          >
            <span
              class="text-xs font-bold text-slate-500 dark:text-white/40 uppercase"
              >{{ day }}</span
            >
          </div>

          <!-- Days -->
          <div
            v-for="(item, index) in calendarData"
            :key="index"
            class="min-h-[100px] bg-white dark:bg-slate-900 p-2 relative group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            :class="{ 'bg-slate-50 dark:bg-slate-900/50': !item.day }"
          >
            <span
              v-if="item.day"
              class="text-sm font-medium text-slate-600 dark:text-white/60 block mb-2"
              >{{ item.day }}</span
            >

            <!-- Present -->
            <div
              v-if="item.status === 'present'"
              class="bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-lg p-1.5 mb-1 cursor-pointer hover:bg-emerald-200 dark:hover:bg-emerald-500/20"
            >
              <div class="flex items-center gap-1 mb-0.5">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span class="text-[10px] font-bold">Present</span>
              </div>
              <span class="text-[10px] block">{{
                formatTime(item.log.clockInTime)
              }}</span>
            </div>

            <!-- Warning/Remote -->
            <div
              v-else-if="item.status === 'warning'"
              class="bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 rounded-lg p-1.5 mb-1 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-500/20"
            >
              <div class="flex items-center gap-1 mb-0.5">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span class="text-[10px] font-bold">Remote</span>
              </div>
              <span class="text-[10px] block">{{
                formatTime(item.log.clockInTime)
              }}</span>
            </div>

            <!-- Absent -->
            <div
              v-else-if="item.status === 'absent'"
              class="flex items-center justify-center h-12"
            >
              <span
                class="text-slate-300 dark:text-rose-500/20 text-xs font-bold uppercase rotation-45 select-none"
                >Absent</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Logs List (Desktop & Mobile Responsive) -->
      <div v-else class="space-y-4 animate-in fade-in duration-300">
        <div
          v-for="log in logs"
          :key="log.id"
          class="group bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm dark:shadow-none"
        >
          <div
            class="p-5 flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <!-- Date Column -->
            <div class="flex items-center gap-4 min-w-[120px]">
              <div
                class="text-center bg-slate-100 dark:bg-white/5 rounded-xl p-2 w-14 border border-slate-200 dark:border-white/5"
              >
                <span
                  class="block text-xs text-slate-500 dark:text-white/40 uppercase"
                  >{{ formatMonth(log.clockInTime) }}</span
                >
                <span
                  class="block text-xl font-bold text-slate-900 dark:text-white"
                  >{{ formatDay(log.clockInTime) }}</span
                >
              </div>
              <div>
                <p class="text-sm font-medium text-slate-900 dark:text-white">
                  {{ formatWeekday(log.clockInTime) }}
                </p>
                <p
                  class="text-xs text-slate-500 dark:text-white/40"
                  v-if="log.totalHours"
                >
                  {{ log.totalHours.toFixed(1) }} hrs
                </p>
              </div>
            </div>

            <!-- Times Grid -->
            <div class="flex-1 grid grid-cols-2 gap-4 w-full md:w-auto">
              <!-- Clock In -->
              <div
                class="bg-slate-50 dark:bg-white/5 rounded-xl p-3 border border-slate-100 dark:border-white/5"
              >
                <div class="flex items-center justify-between mb-1">
                  <span
                    class="text-xs text-slate-500 dark:text-white/40 font-medium"
                    >CLOCK IN</span
                  >
                  <button
                    v-if="log.clockInPhoto"
                    @click="viewPhoto(log.clockInPhoto)"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
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
                <p class="text-slate-900 dark:text-white font-medium">
                  {{ formatTime(log.clockInTime) }}
                </p>
                <div
                  class="mt-1 flex items-center gap-1.5"
                  v-if="log.isClockInOutside"
                >
                  <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  <span
                    class="text-[10px] text-orange-600 dark:text-orange-300 cursor-pointer hover:underline"
                    @click="showReason(log)"
                    >Outside</span
                  >
                </div>
                <div class="mt-1 flex items-center gap-1.5" v-else>
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  <span
                    class="text-[10px] text-emerald-600 dark:text-emerald-300"
                    >Office</span
                  >
                </div>
              </div>

              <!-- Clock Out -->
              <div
                class="bg-slate-50 dark:bg-white/5 rounded-xl p-3 border border-slate-100 dark:border-white/5"
              >
                <div class="flex items-center justify-between mb-1">
                  <span
                    class="text-xs text-slate-500 dark:text-white/40 font-medium"
                    >CLOCK OUT</span
                  >
                  <button
                    v-if="log.clockOutPhoto"
                    @click="viewPhoto(log.clockOutPhoto)"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
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
                <p class="text-slate-900 dark:text-white font-medium">
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
                    <span
                      class="text-[10px] text-orange-600 dark:text-orange-300"
                      >Outside</span
                    >
                  </div>
                  <div class="mt-1 flex items-center gap-1.5" v-else>
                    <span
                      class="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                    ></span>
                    <span
                      class="text-[10px] text-emerald-600 dark:text-emerald-300"
                      >Office</span
                    >
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
              class="bg-orange-50 text-orange-800 dark:bg-orange-500/10 dark:text-orange-200/80 border border-orange-200 dark:border-orange-500/20 rounded-lg p-3 text-sm flex items-start gap-2"
            >
              <svg
                class="w-4 h-4 text-orange-500 dark:text-orange-400 mt-0.5 shrink-0"
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
              <p class="italic">
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
import jsPDF from "jspdf";

const router = useRouter();
const student = ref(null);
const logs = ref([]);
const filterMonth = ref("");
const photoModal = ref(null);
const loading = ref(true);
const viewMode = ref("list"); // 'list' | 'calendar'

// Computed Calendar Data
const calendarData = computed(() => {
  if (!filterMonth.value) return [];
  const [year, month] = filterMonth.value.split("-").map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0 = Sun

  const days = [];

  // Fill empty slots for previous month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ day: null });
  }

  // Fill days
  const now = new Date();
  const isCurrentMonth =
    now.getFullYear() === year && now.getMonth() + 1 === month;
  const today = now.getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    // Find log for this day
    const log = logs.value.find((l) => {
      const d = l.clockInTime.toDate();
      return d.getDate() === i;
    });

    let status = "none";
    if (log) {
      status =
        log.isClockInOutside || log.isClockOutOutside ? "warning" : "present";
    } else if (isCurrentMonth && i > today) {
      status = "future";
    } else {
      // Check if weekend
      const dayOfWeek = new Date(year, month - 1, i).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        status = "weekend";
      } else {
        status = "absent";
      }
    }

    days.push({ day: i, log, status });
  }
  return days;
});

// Computed Streak
const currentStreak = computed(() => {
  // Simple streak logic: consecutive days with logs in descending order
  // Note: This relies on logs being sorted desc.
  let streak = 0;
  // We need to check day by day backwards
  // For purpose of this specific view (UI only), we'll just count total days worked this month as a 'score'
  // Or accurate streak logic:

  // Let's just return total logs count for "Month Streak" gamification
  return logs.value.length;
});

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

function handleLogout() {
  localStorage.removeItem("attendance_student");
  router.push("/attendance");
}

// === Export Functions ===
const exportCSV = () => {
  const headers = [
    "Date",
    "Clock In",
    "Clock Out",
    "Hours",
    "Location",
    "Note",
  ];
  const rows = logs.value.map((log) => [
    formatDate(log.clockInTime),
    formatTime(log.clockInTime),
    log.clockOutTime ? formatTime(log.clockOutTime) : "-",
    log.totalHours?.toFixed(2) || "0",
    log.isClockInOutside ? "Remote" : "Office",
    log.clockInReason || "",
  ]);

  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `my_attendance_${filterMonth.value}.csv`;
  a.click();
};

const exportPDF = () => {
  const doc = new jsPDF();

  // Header
  doc.setFillColor(30, 41, 59); // Slate 800
  doc.rect(0, 0, 210, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text("Attendance Report", 14, 20);
  doc.setFontSize(10);
  doc.text(`${student.value.name}`, 14, 28);
  doc.text(`Month: ${filterMonth.value}`, 14, 34);

  // Table Header
  let y = 50;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Date", 14, y);
  doc.text("Clock In", 50, y);
  doc.text("Clock Out", 80, y);
  doc.text("Hours", 110, y);
  doc.text("Status", 130, y);
  doc.text("Location", 150, y);

  doc.line(14, y + 2, 196, y + 2);
  y += 10;
  doc.setFont("helvetica", "normal");

  // Table Body
  logs.value.forEach((log) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.text(formatDate(log.clockInTime), 14, y);
    doc.text(formatTime(log.clockInTime), 50, y);
    doc.text(log.clockOutTime ? formatTime(log.clockOutTime) : "-", 80, y);
    doc.text(log.totalHours?.toFixed(1) + "h" || "-", 110, y);

    // Status Logic
    let status = "Present";
    if (log.isClockInOutside) status = "Remote";
    doc.text(status, 130, y);

    // Location Text
    doc.text(log.isClockInOutside ? "Outside" : "Office", 150, y);

    y += 8;
  });

  doc.save(`attendance_report_${filterMonth.value}.pdf`);
};
</script>
