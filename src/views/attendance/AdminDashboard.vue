<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <header
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
    >
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p class="text-slate-400">
          Welcome back, Administrator. Here's what's happening today.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-slate-400 text-sm font-medium">{{
          currentDate
        }}</span>
        <button
          @click="loadStats"
          class="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-white/5"
          title="Refresh Data"
        >
          <svg
            class="w-5 h-5"
            :class="{ 'animate-spin': loading }"
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
    </header>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Stats Cards -->
      <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Total Students Card -->
        <div
          class="bg-slate-800 rounded-2xl p-6 border border-white/5 flex items-start gap-4 hover:border-white/10 transition-colors"
        >
          <div
            class="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center p-2.5"
          >
            <svg
              class="w-full h-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h-1a4 4 0 01-4-4V8a4 4 0 014-4h1m0 16a4 4 0 004-4V8a4 4 0 00-4-4m-5 16v-1a4 4 0 01-4-4V8a4 4 0 014-4v12a4 4 0 004 4z"
              />
            </svg>
          </div>
          <div>
            <p
              class="text-white/40 text-sm font-medium uppercase tracking-wide"
            >
              Total Students
            </p>
            <p class="text-white text-3xl font-bold mt-1">
              {{ stats.totalStudents }}
            </p>
          </div>
        </div>

        <!-- Today Present Card -->
        <div
          class="bg-slate-800 rounded-2xl p-6 border border-white/5 flex items-start gap-4 hover:border-white/10 transition-colors"
        >
          <div
            class="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center p-2.5"
          >
            <svg
              class="w-full h-full"
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
          </div>
          <div>
            <p
              class="text-white/40 text-sm font-medium uppercase tracking-wide"
            >
              Today Present
            </p>
            <p class="text-white text-3xl font-bold mt-1">
              {{ stats.todayPresent }}
            </p>
          </div>
        </div>

        <!-- Today Clocked Out Card -->
        <div
          class="bg-slate-800 rounded-2xl p-6 border border-white/5 flex items-start gap-4 hover:border-white/10 transition-colors"
        >
          <div
            class="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center p-2.5"
          >
            <svg
              class="w-full h-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2A9 9 0 111 12a9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p
              class="text-white/40 text-sm font-medium uppercase tracking-wide"
            >
              Clocked Out
            </p>
            <p class="text-white text-3xl font-bold mt-1">
              {{ stats.todayClockedOut }}
            </p>
          </div>
        </div>

        <!-- Today Outside Card -->
        <div
          class="bg-slate-800 rounded-2xl p-6 border border-white/5 flex items-start gap-4 hover:border-white/10 transition-colors"
        >
          <div
            class="w-12 h-12 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center p-2.5"
          >
            <svg
              class="w-full h-full"
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
              class="text-white/40 text-sm font-medium uppercase tracking-wide"
            >
              Remote/Outside
            </p>
            <p class="text-white text-3xl font-bold mt-1">
              {{ stats.todayOutside }}
            </p>
          </div>
        </div>
      </div>

      <!-- Live Feed -->
      <div class="lg:col-span-1 flex flex-col gap-6">
        <div
          class="bg-slate-800 rounded-2xl border border-white/5 overflow-hidden flex-1"
        >
          <div
            class="p-6 border-b border-white/5 flex items-center justify-between"
          >
            <h3 class="font-bold text-white text-lg">Live Activity</h3>
            <span
              class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded tracking-wide border border-emerald-500/20 animate-pulse"
              >LIVE</span
            >
          </div>
          <div class="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
            <div
              v-if="recentLogs.length === 0"
              class="p-8 text-center text-white/30 text-sm"
            >
              No activity recorded today
            </div>
            <div
              v-else
              v-for="log in recentLogs"
              :key="log.id"
              class="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div class="flex items-center gap-3">
                <div
                  :class="[
                    'w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs',
                    log.clockOutTime
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
                  ]"
                >
                  {{ log.studentName?.charAt(0)?.toUpperCase() }}
                </div>
                <div>
                  <p class="text-white font-medium text-sm leading-tight">
                    {{ log.studentName }}
                  </p>
                  <p
                    class="text-[11px] text-white/40 flex items-center gap-2 mt-0.5"
                  >
                    {{ log.clockOutTime ? "Clocked Out" : "Clocked In" }}
                    <span v-if="log.isClockInOutside" class="text-orange-400"
                      >• Remote</span
                    >
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-white font-mono text-xs font-medium">
                  {{ formatTime(log.clockOutTime || log.clockInTime) }}
                </p>
              </div>
            </div>
          </div>
          <div class="p-3 border-t border-white/5 bg-white/[0.02]">
            <router-link
              to="/attendance/admin/records"
              class="text-center block text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >View All History &rarr;</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";

const loading = ref(true);
const stats = ref({
  totalStudents: 0,
  todayPresent: 0,
  todayClockedOut: 0,
  todayOutside: 0,
});
const recentLogs = ref([]);

const currentDate = computed(() => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const loadStats = async () => {
  loading.value = true;
  try {
    const studentsSnap = await getDocs(collection(db, "attendance_students"));
    stats.value.totalStudents = studentsSnap.size;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    const logsRef = collection(db, "attendance_logs");
    const todayQuery = query(
      logsRef,
      where("clockInTime", ">=", todayTimestamp),
    );
    const todaySnap = await getDocs(todayQuery);

    let present = 0;
    let clockedOut = 0;
    let outside = 0;

    todaySnap.forEach((doc) => {
      const data = doc.data();
      present++;
      if (data.clockOutTime) clockedOut++;
      if (data.isClockInOutside || data.isClockOutOutside) outside++;
    });

    stats.value.todayPresent = present;
    stats.value.todayClockedOut = clockedOut;
    stats.value.todayOutside = outside;
  } catch (err) {
    console.error("Stats error:", err);
  } finally {
    loading.value = false;
  }
};

const loadRecentLogs = async () => {
  try {
    const logsRef = collection(db, "attendance_logs");
    const q = query(logsRef, orderBy("clockInTime", "desc"), limit(10));
    const snap = await getDocs(q);
    recentLogs.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Recent logs error:", err);
  }
};

const formatTime = (ts) => {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

onMounted(async () => {
  await loadStats();
  await loadRecentLogs();
});
</script>
