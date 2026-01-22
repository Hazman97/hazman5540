<template>
  <div class="min-h-screen bg-slate-900 flex text-white font-sans">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed lg:static inset-y-0 left-0 z-50 bg-slate-900 border-r border-white/5 transition-all duration-300 flex flex-col',
        sidebarOpen ? 'w-64' : 'w-20 -translate-x-full lg:translate-x-0',
      ]"
    >
      <!-- Brand -->
      <div
        class="h-20 flex items-center justify-center border-b border-white/5"
      >
        <div
          class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20"
        >
          <svg
            class="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <span v-if="sidebarOpen" class="ml-3 font-bold text-lg tracking-tight"
          >Admin</span
        >
      </div>

      <!-- Nav -->
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <router-link
          to="/attendance/admin/dashboard"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all group"
          active-class="bg-indigo-600 shadow-lg shadow-indigo-900/20"
          :class="
            !$route.path.includes('dashboard')
              ? 'text-white/60 hover:text-white hover:bg-white/5'
              : ''
          "
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
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span v-if="sidebarOpen">Overview</span>
        </router-link>

        <router-link
          to="/attendance/admin/students"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all group"
          active-class="bg-indigo-600 shadow-lg shadow-indigo-900/20"
          :class="
            !$route.path.includes('students')
              ? 'text-white/60 hover:text-white hover:bg-white/5'
              : ''
          "
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span v-if="sidebarOpen">Students</span>
        </router-link>

        <router-link
          to="/attendance/admin/records"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all group"
          active-class="bg-indigo-600 shadow-lg shadow-indigo-900/20"
          :class="
            !$route.path.includes('records')
              ? 'text-white/60 hover:text-white hover:bg-white/5'
              : ''
          "
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span v-if="sidebarOpen">Records</span>
        </router-link>
      </nav>

      <!-- Logout -->
      <div class="p-4 border-t border-white/5">
        <button
          @click="handleLogout"
          class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span v-if="sidebarOpen">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Content -->
    <div class="flex-1 flex flex-col min-w-0 bg-slate-900">
      <!-- Topbar -->
      <header
        class="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30"
      >
        <div class="flex items-center gap-4">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="text-white/60 hover:text-white lg:hidden"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h2 class="text-xl font-bold text-white tracking-tight">
            Dashboard Overview
          </h2>
        </div>

        <div class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-medium text-white">{{ adminName }}</p>
            <p class="text-xs text-white/40">Administrator</p>
          </div>
          <div
            class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20"
          >
            {{ adminName?.charAt(0)?.toUpperCase() || "A" }}
          </div>
        </div>
      </header>

      <!-- Main View -->
      <div class="flex-1 p-6 overflow-y-auto">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            class="bg-slate-800 rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all"
          >
            <div
              class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"
            >
              <svg
                class="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <p
              class="text-white/40 text-sm font-medium uppercase tracking-wider mb-2"
            >
              Total Students
            </p>
            <p class="text-3xl font-bold text-white">
              {{ stats.totalStudents }}
            </p>
          </div>

          <div
            class="bg-slate-800 rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all"
          >
            <div
              class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"
            >
              <svg
                class="w-16 h-16 text-emerald-400"
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
            <p
              class="text-emerald-400/60 text-sm font-medium uppercase tracking-wider mb-2"
            >
              Present Today
            </p>
            <p class="text-3xl font-bold text-emerald-400">
              {{ stats.todayPresent }}
            </p>
          </div>

          <div
            class="bg-slate-800 rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all"
          >
            <div
              class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"
            >
              <svg
                class="w-16 h-16 text-blue-400"
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
            <p
              class="text-blue-400/60 text-sm font-medium uppercase tracking-wider mb-2"
            >
              Clocked Out
            </p>
            <p class="text-3xl font-bold text-blue-400">
              {{ stats.todayClockedOut }}
            </p>
          </div>

          <div
            class="bg-slate-800 rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all"
          >
            <div
              class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"
            >
              <svg
                class="w-16 h-16 text-orange-400"
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
            </div>
            <p
              class="text-orange-400/60 text-sm font-medium uppercase tracking-wider mb-2"
            >
              Outside Office
            </p>
            <p class="text-3xl font-bold text-orange-400">
              {{ stats.todayOutside }}
            </p>
          </div>
        </div>

        <!-- Shortcuts -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <router-link
            to="/attendance/admin/students"
            class="group bg-gradient-to-br from-indigo-900/40 to-slate-800 p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all flex items-center gap-4"
          >
            <div
              class="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform"
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-white font-bold text-lg">Add New Student</h3>
              <p class="text-white/40 text-sm">
                Create account and credentials
              </p>
            </div>
            <div
              class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0"
            >
              <svg
                class="w-5 h-5 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </router-link>

          <router-link
            to="/attendance/admin/records"
            class="group bg-gradient-to-br from-blue-900/40 to-slate-800 p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all flex items-center gap-4"
          >
            <div
              class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform"
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-white font-bold text-lg">Export Report</h3>
              <p class="text-white/40 text-sm">Download CSV or PDF records</p>
            </div>
            <div
              class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0"
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </router-link>
        </div>

        <!-- Activity Feed -->
        <div
          class="bg-slate-800 rounded-2xl border border-white/5 overflow-hidden"
        >
          <div
            class="p-6 border-b border-white/5 flex items-center justify-between"
          >
            <h3 class="font-bold text-white text-lg">Live Activity</h3>
            <span
              class="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded"
              >REALTIME</span
            >
          </div>
          <div class="divide-y divide-white/5">
            <div
              v-for="log in recentLogs"
              :key="log.id"
              class="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div class="flex items-center gap-4">
                <div
                  :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm',
                    log.clockOutTime
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'bg-emerald-500/10 text-emerald-400',
                  ]"
                >
                  {{ log.studentName?.charAt(0)?.toUpperCase() }}
                </div>
                <div>
                  <p class="text-white font-medium text-sm">
                    {{ log.studentName }}
                  </p>
                  <p class="text-xs text-white/40 flex items-center gap-2">
                    {{ log.clockOutTime ? "Clocked Out" : "Clocked In" }}
                    <span
                      v-if="log.isClockInOutside"
                      class="text-orange-400 bg-orange-500/10 px-1.5 rounded text-[10px]"
                      >OUTSIDE</span
                    >
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-white font-mono text-sm">
                  {{ formatTime(log.clockOutTime || log.clockInTime) }}
                </p>
                <p class="text-xs text-white/30">Today</p>
              </div>
            </div>
            <div
              v-if="recentLogs.length === 0"
              class="p-8 text-center text-white/30 text-sm"
            >
              No activity recorded today
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
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

const router = useRouter();
const sidebarOpen = ref(true);
const adminName = ref("");
const stats = ref({
  totalStudents: 0,
  todayPresent: 0,
  todayClockedOut: 0,
  todayOutside: 0,
});
const recentLogs = ref([]);

onMounted(async () => {
  const admin = localStorage.getItem("attendance_admin");
  if (!admin) {
    router.push("/attendance/admin");
    return;
  }
  adminName.value = JSON.parse(admin).name;
  await loadStats();
  await loadRecentLogs();
});

const loadStats = async () => {
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

const handleLogout = () => {
  localStorage.removeItem("attendance_admin");
  router.push("/attendance/admin");
};
</script>
