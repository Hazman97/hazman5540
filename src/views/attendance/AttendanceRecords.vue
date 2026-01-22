<template>
  <div class="min-h-screen bg-slate-900 flex text-white font-sans">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed lg:static inset-y-0 left-0 z-50 bg-slate-900 border-r border-white/5 transition-all duration-300 flex flex-col',
        sidebarOpen ? 'w-64' : 'w-20 -translate-x-full lg:translate-x-0',
      ]"
    >
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

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 bg-slate-900">
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
          <h2 class="text-xl font-bold text-white tracking-tight">Records</h2>
        </div>

        <div class="flex gap-2">
          <button
            @click="exportCSV"
            class="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-white/10 text-sm font-medium transition-colors"
          >
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span class="hidden sm:inline">Export CSV</span>
          </button>
          <button
            @click="exportPDF"
            class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-900/20 text-sm font-medium transition-colors"
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
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span class="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </header>

      <div class="p-6 overflow-y-auto flex-1">
        <!-- Filters -->
        <div
          class="bg-slate-800 rounded-2xl border border-white/5 p-4 mb-6 shadow-xl shadow-black/20"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label
                class="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wider"
                >From Date</label
              >
              <input
                v-model="filters.fromDate"
                type="date"
                class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label
                class="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wider"
                >To Date</label
              >
              <input
                v-model="filters.toDate"
                type="date"
                class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label
                class="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wider"
                >Student</label
              >
              <select
                v-model="filters.studentId"
                class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="">All Students</option>
                <option v-for="s in students" :key="s.id" :value="s.id">
                  {{ s.name }}
                </option>
              </select>
            </div>
            <div class="flex items-end gap-2">
              <button
                @click="applyFilters"
                class="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
              >
                Filter
              </button>
              <button
                @click="resetFilters"
                class="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div
          class="bg-slate-800 rounded-2xl border border-white/5 overflow-hidden shadow-xl shadow-black/20"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-white/5 bg-white/5">
                  <th
                    class="p-4 text-xs font-bold text-white/40 uppercase tracking-wider"
                  >
                    Student
                  </th>
                  <th
                    class="p-4 text-xs font-bold text-white/40 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    class="p-4 text-xs font-bold text-white/40 uppercase tracking-wider hidden md:table-cell"
                  >
                    Check In
                  </th>
                  <th
                    class="p-4 text-xs font-bold text-white/40 uppercase tracking-wider hidden md:table-cell"
                  >
                    Check Out
                  </th>
                  <th
                    class="p-4 text-xs font-bold text-white/40 uppercase tracking-wider hidden lg:table-cell"
                  >
                    Total
                  </th>
                  <th
                    class="p-4 text-xs font-bold text-white/40 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    class="p-4 text-xs font-bold text-white/40 uppercase tracking-wider text-right"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr
                  v-for="log in filteredLogs"
                  :key="log.id"
                  class="group hover:bg-white/5 transition-colors"
                >
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/10"
                      >
                        {{ log.studentName?.charAt(0)?.toUpperCase() }}
                      </div>
                      <span class="font-medium text-white text-sm">{{
                        log.studentName
                      }}</span>
                    </div>
                  </td>
                  <td class="p-4 text-sm text-white/70">
                    {{ formatDate(log.clockInTime) }}
                  </td>
                  <td class="p-4 text-sm text-white/70 hidden md:table-cell">
                    <div class="flex items-center gap-2">
                      <span class="font-mono text-emerald-400">{{
                        formatTime(log.clockInTime)
                      }}</span>
                      <button
                        v-if="log.clockInPhoto"
                        @click="viewPhoto(log.clockInPhoto)"
                        class="text-white/30 hover:text-white"
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
                  </td>
                  <td class="p-4 text-sm text-white/70 hidden md:table-cell">
                    <div
                      v-if="log.clockOutTime"
                      class="flex items-center gap-2"
                    >
                      <span class="font-mono text-blue-400">{{
                        formatTime(log.clockOutTime)
                      }}</span>
                      <button
                        v-if="log.clockOutPhoto"
                        @click="viewPhoto(log.clockOutPhoto)"
                        class="text-white/30 hover:text-white"
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
                    <span v-else class="text-white/20">-</span>
                  </td>
                  <td
                    class="p-4 text-sm text-white/70 hidden lg:table-cell font-mono"
                  >
                    {{ log.totalHours ? log.totalHours.toFixed(2) + "h" : "-" }}
                  </td>
                  <td class="p-4">
                    <span
                      v-if="log.isClockInOutside || log.isClockOutOutside"
                      @click="viewReason(log)"
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 cursor-pointer hover:bg-orange-500/20 transition-colors"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full bg-orange-400"
                      ></span>
                      Remote
                    </span>
                    <span
                      v-else
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      ></span>
                      Office
                    </span>
                  </td>
                  <td class="p-4 text-right">
                    <button
                      @click="deleteLog(log)"
                      class="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors opacity-60 hover:opacity-100"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredLogs.length === 0">
                  <td colspan="7" class="p-12 text-center text-white/30">
                    <div
                      class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3"
                    >
                      <svg
                        class="w-8 h-8 opacity-50"
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
                    </div>
                    <p>No records found</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Photo Modal -->
    <div
      v-if="photoModal"
      class="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
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

    <!-- Reason Modal -->
    <div
      v-if="reasonModal"
      class="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
      @click="reasonModal = null"
    >
      <div
        class="bg-slate-800 rounded-2xl w-full max-w-md p-6 border border-white/10 shadow-2xl relative animate-in zoom-in-95 duration-200"
        @click.stop
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white">Remote Work Details</h3>
          <button
            @click="reasonModal = null"
            class="text-white/40 hover:text-white"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-if="reasonModal.clockInReason"
            class="bg-white/5 p-4 rounded-xl border border-white/5"
          >
            <p
              class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1"
            >
              Clock In Reason
            </p>
            <p class="text-white text-sm">{{ reasonModal.clockInReason }}</p>
          </div>
          <div
            v-if="reasonModal.clockOutReason"
            class="bg-white/5 p-4 rounded-xl border border-white/5"
          >
            <p
              class="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1"
            >
              Clock Out Reason
            </p>
            <p class="text-white text-sm">{{ reasonModal.clockOutReason }}</p>
          </div>
        </div>

        <button
          @click="reasonModal = null"
          class="w-full mt-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
        >
          Close
        </button>
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
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import jsPDF from "jspdf";

const router = useRouter();
const sidebarOpen = ref(true);
const logs = ref([]);
const students = ref([]);
const photoModal = ref(null);
const reasonModal = ref(null);

const filters = ref({
  fromDate: "",
  toDate: "",
  studentId: "",
});

const filteredLogs = computed(() => logs.value);

onMounted(async () => {
  const admin = localStorage.getItem("attendance_admin");
  if (!admin) {
    router.push("/attendance/admin");
    return;
  }
  await loadStudents();
  await loadLogs();
});

const loadStudents = async () => {
  const snapshot = await getDocs(collection(db, "attendance_students"));
  students.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const loadLogs = async () => {
  try {
    let q = query(
      collection(db, "attendance_logs"),
      orderBy("clockInTime", "desc"),
    );
    const snapshot = await getDocs(q);
    logs.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error loading logs:", err);
  }
};

const applyFilters = async () => {
  try {
    let constraints = [];

    if (filters.value.fromDate) {
      const from = new Date(filters.value.fromDate);
      constraints.push(where("clockInTime", ">=", Timestamp.fromDate(from)));
    }
    if (filters.value.toDate) {
      const to = new Date(filters.value.toDate);
      to.setHours(23, 59, 59);
      constraints.push(where("clockInTime", "<=", Timestamp.fromDate(to)));
    }
    if (filters.value.studentId) {
      constraints.push(where("studentId", "==", filters.value.studentId));
    }

    const q = query(
      collection(db, "attendance_logs"),
      ...constraints,
      orderBy("clockInTime", "desc"),
    );
    const snapshot = await getDocs(q);
    logs.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Filter error:", err);
    await loadLogs();
  }
};

const resetFilters = () => {
  filters.value = { fromDate: "", toDate: "", studentId: "" };
  loadLogs();
};

const formatDate = (ts) => {
  if (!ts) return "-";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("en-MY");
};

const formatTime = (ts) => {
  if (!ts) return "-";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit" });
};

const viewPhoto = (url) => {
  photoModal.value = url;
};
const viewReason = (log) => {
  reasonModal.value = log;
};

const deleteLog = async (log) => {
  if (!confirm("Delete this record?")) return;
  await deleteDoc(doc(db, "attendance_logs", log.id));
  await loadLogs();
};

const exportCSV = () => {
  const headers = [
    "Student",
    "Date",
    "Clock In",
    "Clock Out",
    "Hours",
    "Location",
    "Reason",
  ];
  const rows = logs.value.map((log) => [
    log.studentName,
    formatDate(log.clockInTime),
    formatTime(log.clockInTime),
    log.clockOutTime ? formatTime(log.clockOutTime) : "",
    log.totalHours?.toFixed(2) || "",
    log.isClockInOutside || log.isClockOutOutside ? "Outside" : "Office",
    log.clockInReason || log.clockOutReason || "",
  ]);

  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `attendance_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
};

const exportPDF = () => {
  const pdf = new jsPDF();
  pdf.setFontSize(18);
  pdf.text("Attendance Report", 14, 22);
  pdf.setFontSize(10);
  pdf.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

  let y = 45;
  pdf.setFontSize(9);
  pdf.text("Student", 14, y);
  pdf.text("Date", 60, y);
  pdf.text("In", 95, y);
  pdf.text("Out", 115, y);
  pdf.text("Hours", 135, y);
  pdf.text("Loc", 155, y);

  y += 8;
  logs.value.forEach((log) => {
    if (y > 280) {
      pdf.addPage();
      y = 20;
    }
    pdf.text(log.studentName?.substring(0, 18) || "", 14, y);
    pdf.text(formatDate(log.clockInTime), 60, y);
    pdf.text(formatTime(log.clockInTime), 95, y);
    pdf.text(log.clockOutTime ? formatTime(log.clockOutTime) : "-", 115, y);
    pdf.text(log.totalHours?.toFixed(1) || "-", 135, y);
    pdf.text(
      log.isClockInOutside || log.isClockOutOutside ? "Outside" : "Office",
      155,
      y,
    );
    y += 6;
  });

  pdf.save(`attendance_${new Date().toISOString().split("T")[0]}.pdf`);
};

const handleLogout = () => {
  localStorage.removeItem("attendance_admin");
  router.push("/attendance/admin");
};
</script>
