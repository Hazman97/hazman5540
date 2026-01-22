<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full bg-white/5 backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-40',
        sidebarOpen ? 'w-64' : 'w-20',
      ]"
    >
      <!-- Logo -->
      <div
        class="h-20 flex items-center justify-center border-b border-white/10"
      >
        <div
          class="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center"
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <span v-if="sidebarOpen" class="ml-3 text-white font-bold text-lg"
          >Attendance</span
        >
      </div>

      <!-- Nav Items -->
      <nav class="p-4 space-y-2">
        <router-link
          to="/attendance/admin/dashboard"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
          active-class="!text-white !bg-purple-500/20 border border-purple-500/30"
        >
          <svg
            class="w-5 h-5 flex-shrink-0"
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
          <span v-if="sidebarOpen">Dashboard</span>
        </router-link>

        <router-link
          to="/attendance/admin/students"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
          active-class="!text-white !bg-purple-500/20 border border-purple-500/30"
        >
          <svg
            class="w-5 h-5 flex-shrink-0"
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
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
          active-class="!text-white !bg-purple-500/20 border border-purple-500/30"
        >
          <svg
            class="w-5 h-5 flex-shrink-0"
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
      <div
        class="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10"
      >
        <button
          @click="handleLogout"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full"
        >
          <svg
            class="w-5 h-5 flex-shrink-0"
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

    <!-- Main Content -->
    <main
      :class="['transition-all duration-300', sidebarOpen ? 'ml-64' : 'ml-20']"
    >
      <!-- Top Bar -->
      <header
        class="h-20 bg-white/5 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6"
      >
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
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

        <div class="flex items-center gap-4">
          <span class="text-white/60 text-sm">Welcome,</span>
          <span class="text-white font-medium">{{ adminName }}</span>
          <div
            class="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold"
          >
            {{ adminName?.charAt(0)?.toUpperCase() || "A" }}
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="p-6">
        <h1 class="text-3xl font-bold text-white mb-8">Dashboard</h1>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Students -->
          <div
            class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-purple-400"
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
            </div>
            <p class="text-3xl font-bold text-white mb-1">
              {{ stats.totalStudents }}
            </p>
            <p class="text-white/50 text-sm">Total Students</p>
          </div>

          <!-- Today's Attendance -->
          <div
            class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-green-400"
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
            </div>
            <p class="text-3xl font-bold text-white mb-1">
              {{ stats.todayPresent }}
            </p>
            <p class="text-white/50 text-sm">Present Today</p>
          </div>

          <!-- Clocked Out -->
          <div
            class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-blue-400"
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
            </div>
            <p class="text-3xl font-bold text-white mb-1">
              {{ stats.todayClockedOut }}
            </p>
            <p class="text-white/50 text-sm">Clocked Out</p>
          </div>

          <!-- Outside Office -->
          <div
            class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-orange-400"
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
            </div>
            <p class="text-3xl font-bold text-white mb-1">
              {{ stats.todayOutside }}
            </p>
            <p class="text-white/50 text-sm">Outside Office</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <router-link
            to="/attendance/admin/students"
            class="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 hover:border-purple-500/50 transition-all group"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 bg-purple-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-7 h-7 text-purple-400"
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
                <h3 class="text-xl font-semibold text-white">
                  Manage Students
                </h3>
                <p class="text-white/50">
                  Add, edit, or remove student accounts
                </p>
              </div>
            </div>
          </router-link>

          <router-link
            to="/attendance/admin/records"
            class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6 hover:border-blue-500/50 transition-all group"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 bg-blue-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-7 h-7 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-white">View Records</h3>
                <p class="text-white/50">Browse and export attendance data</p>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Recent Activity -->
        <div
          class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          <div class="p-6 border-b border-white/10">
            <h2 class="text-xl font-semibold text-white">Recent Activity</h2>
          </div>
          <div class="divide-y divide-white/10">
            <div
              v-for="log in recentLogs"
              :key="log.id"
              class="p-4 flex items-center gap-4 hover:bg-white/5"
            >
              <div
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold',
                  log.clockOutTime ? 'bg-blue-500/30' : 'bg-green-500/30',
                ]"
              >
                {{ log.studentName?.charAt(0)?.toUpperCase() || "?" }}
              </div>
              <div class="flex-1">
                <p class="text-white font-medium">{{ log.studentName }}</p>
                <p class="text-white/50 text-sm">
                  {{ log.clockOutTime ? "Clocked out" : "Clocked in" }}
                  <span
                    v-if="log.isClockInOutside || log.isClockOutOutside"
                    class="text-orange-400"
                  >
                    (Outside office)</span
                  >
                </p>
              </div>
              <p class="text-white/40 text-sm">
                {{ formatTime(log.clockOutTime || log.clockInTime) }}
              </p>
            </div>
            <div
              v-if="recentLogs.length === 0"
              class="p-8 text-center text-white/40"
            >
              No recent activity
            </div>
          </div>
        </div>
      </div>
    </main>
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

// Check auth
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
    // Total students
    const studentsSnap = await getDocs(collection(db, "attendance_students"));
    stats.value.totalStudents = studentsSnap.size;

    // Today's logs
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    const logsRef = collection(db, "attendance_logs");
    const todayQuery = query(
      logsRef,
      where("clockInTime", ">=", todayTimestamp),
    );
    const todaySnap = await getDocs(todayQuery);

    let present = 0,
      clockedOut = 0,
      outside = 0;
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
    console.error("Error loading stats:", err);
  }
};

const loadRecentLogs = async () => {
  try {
    const logsRef = collection(db, "attendance_logs");
    const q = query(logsRef, orderBy("clockInTime", "desc"), limit(10));
    const snapshot = await getDocs(q);

    recentLogs.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("Error loading logs:", err);
  }
};

const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleLogout = () => {
  localStorage.removeItem("attendance_admin");
  router.push("/attendance/admin");
};
</script>
