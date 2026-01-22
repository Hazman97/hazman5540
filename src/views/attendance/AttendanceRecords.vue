<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Sidebar (same as before) -->
    <aside
      class="fixed top-0 left-0 h-full w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 z-40 hidden lg:block"
    >
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
        <span class="ml-3 text-white font-bold text-lg">Attendance</span>
      </div>
      <nav class="p-4 space-y-2">
        <router-link
          to="/attendance/admin/dashboard"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10"
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
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
            />
          </svg>
          <span>Dashboard</span>
        </router-link>
        <router-link
          to="/attendance/admin/students"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10"
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
          <span>Students</span>
        </router-link>
        <router-link
          to="/attendance/admin/records"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-purple-500/20 border border-purple-500/30"
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
          <span>Records</span>
        </router-link>
      </nav>
      <div
        class="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10"
      >
        <button
          @click="handleLogout"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 w-full"
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
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main -->
    <main class="lg:ml-64 min-h-screen">
      <!-- Mobile Header -->
      <header
        class="lg:hidden h-16 bg-white/5 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4"
      >
        <button @click="mobileNav = !mobileNav" class="text-white p-2">
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
        <span class="text-white font-bold">Records</span>
        <div class="w-8"></div>
      </header>

      <!-- Mobile Nav -->
      <div
        v-if="mobileNav"
        class="lg:hidden fixed inset-0 bg-black/50 z-50"
        @click="mobileNav = false"
      >
        <div class="w-64 h-full bg-slate-900 p-4" @click.stop>
          <nav class="space-y-2">
            <router-link
              to="/attendance/admin/dashboard"
              class="block px-4 py-3 rounded-xl text-white/70"
              @click="mobileNav = false"
              >Dashboard</router-link
            >
            <router-link
              to="/attendance/admin/students"
              class="block px-4 py-3 rounded-xl text-white/70"
              @click="mobileNav = false"
              >Students</router-link
            >
            <router-link
              to="/attendance/admin/records"
              class="block px-4 py-3 rounded-xl text-white bg-purple-500/20"
              @click="mobileNav = false"
              >Records</router-link
            >
            <button
              @click="handleLogout"
              class="block px-4 py-3 rounded-xl text-red-400 w-full text-left"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      <div class="p-4 lg:p-6">
        <h1 class="text-2xl lg:text-3xl font-bold text-white mb-6">
          Attendance Records
        </h1>

        <!-- Filters -->
        <div
          class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 lg:p-6 mb-6"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-white/60 text-sm mb-2">From Date</label>
              <input
                v-model="filters.fromDate"
                type="date"
                class="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label class="block text-white/60 text-sm mb-2">To Date</label>
              <input
                v-model="filters.toDate"
                type="date"
                class="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label class="block text-white/60 text-sm mb-2">Student</label>
              <select
                v-model="filters.studentId"
                class="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
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
                class="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-500"
              >
                Filter
              </button>
              <button
                @click="resetFilters"
                class="px-4 py-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <!-- Export Buttons -->
        <div class="flex flex-wrap gap-3 mb-6">
          <button
            @click="exportCSV"
            class="px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-500 flex items-center gap-2"
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export CSV
          </button>
          <button
            @click="exportPDF"
            class="px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-500 flex items-center gap-2"
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
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            Export PDF
          </button>
        </div>

        <!-- Records Table -->
        <div
          class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-white/5">
                <tr>
                  <th
                    class="px-4 lg:px-6 py-4 text-left text-white/60 text-sm font-medium"
                  >
                    Student
                  </th>
                  <th
                    class="px-4 lg:px-6 py-4 text-left text-white/60 text-sm font-medium"
                  >
                    Date
                  </th>
                  <th
                    class="px-4 lg:px-6 py-4 text-left text-white/60 text-sm font-medium hidden md:table-cell"
                  >
                    Clock In
                  </th>
                  <th
                    class="px-4 lg:px-6 py-4 text-left text-white/60 text-sm font-medium hidden md:table-cell"
                  >
                    Clock Out
                  </th>
                  <th
                    class="px-4 lg:px-6 py-4 text-left text-white/60 text-sm font-medium hidden lg:table-cell"
                  >
                    Hours
                  </th>
                  <th
                    class="px-4 lg:px-6 py-4 text-left text-white/60 text-sm font-medium"
                  >
                    Location
                  </th>
                  <th
                    class="px-4 lg:px-6 py-4 text-right text-white/60 text-sm font-medium"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/10">
                <tr
                  v-for="log in filteredLogs"
                  :key="log.id"
                  class="hover:bg-white/5"
                >
                  <td class="px-4 lg:px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      >
                        {{ log.studentName?.charAt(0)?.toUpperCase() }}
                      </div>
                      <span class="text-white">{{ log.studentName }}</span>
                    </div>
                  </td>
                  <td class="px-4 lg:px-6 py-4 text-white/70">
                    {{ formatDate(log.clockInTime) }}
                  </td>
                  <td
                    class="px-4 lg:px-6 py-4 text-white/70 hidden md:table-cell"
                  >
                    <div class="flex items-center gap-2">
                      {{ formatTime(log.clockInTime) }}
                      <button
                        v-if="log.clockInPhoto"
                        @click="viewPhoto(log.clockInPhoto)"
                        class="text-purple-400 hover:text-purple-300"
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
                  <td
                    class="px-4 lg:px-6 py-4 text-white/70 hidden md:table-cell"
                  >
                    <div
                      v-if="log.clockOutTime"
                      class="flex items-center gap-2"
                    >
                      {{ formatTime(log.clockOutTime) }}
                      <button
                        v-if="log.clockOutPhoto"
                        @click="viewPhoto(log.clockOutPhoto)"
                        class="text-purple-400 hover:text-purple-300"
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
                    <span v-else class="text-white/30">-</span>
                  </td>
                  <td
                    class="px-4 lg:px-6 py-4 text-white/70 hidden lg:table-cell"
                  >
                    {{ log.totalHours ? log.totalHours.toFixed(1) + "h" : "-" }}
                  </td>
                  <td class="px-4 lg:px-6 py-4">
                    <span
                      v-if="log.isClockInOutside || log.isClockOutOutside"
                      class="px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs cursor-pointer"
                      @click="viewReason(log)"
                    >
                      Outside
                    </span>
                    <span
                      v-else
                      class="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs"
                      >Office</span
                    >
                  </td>
                  <td class="px-4 lg:px-6 py-4 text-right">
                    <button
                      @click="deleteLog(log)"
                      class="p-2 text-red-400/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredLogs.length === 0">
                  <td colspan="7" class="px-6 py-12 text-center text-white/40">
                    No records found
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
      class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      @click="photoModal = null"
    >
      <img
        :src="photoModal"
        class="max-w-full max-h-[80vh] rounded-xl"
        @click.stop
      />
    </div>

    <!-- Reason Modal -->
    <div
      v-if="reasonModal"
      class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      @click="reasonModal = null"
    >
      <div
        class="bg-slate-800 rounded-2xl max-w-md w-full p-6 border border-white/10"
        @click.stop
      >
        <h3 class="text-lg font-bold text-white mb-4">Outside Office Reason</h3>
        <div v-if="reasonModal.clockInReason" class="mb-3">
          <p class="text-white/60 text-sm">Clock In Reason:</p>
          <p class="text-white">{{ reasonModal.clockInReason }}</p>
        </div>
        <div v-if="reasonModal.clockOutReason">
          <p class="text-white/60 text-sm">Clock Out Reason:</p>
          <p class="text-white">{{ reasonModal.clockOutReason }}</p>
        </div>
        <button
          @click="reasonModal = null"
          class="mt-4 w-full py-2 bg-white/10 text-white rounded-xl"
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
const mobileNav = ref(false);
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

const formatDate = (timestamp) => {
  if (!timestamp) return "-";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-MY");
};

const formatTime = (timestamp) => {
  if (!timestamp) return "-";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleTimeString("en-MY", {
    hour: "2-digit",
    minute: "2-digit",
  });
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
    log.totalHours?.toFixed(1) || "",
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
  pdf.text("Location", 155, y);

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
