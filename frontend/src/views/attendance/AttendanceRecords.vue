<template>
  <div class="h-full flex flex-col">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
    >
      <div>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Attendance Records
        </h1>
        <p class="text-slate-500 dark:text-slate-400">
          View and manage all student clock-ins/outs.
        </p>
      </div>
      <div class="flex gap-2">
        <button
          @click="exportCSV"
          class="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-lg border border-slate-200 dark:border-white/10 text-sm font-medium transition-colors shadow-sm dark:shadow-none"
        >
          <svg
            class="w-4 h-4 text-emerald-500 dark:text-emerald-400"
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
          class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 text-sm font-medium transition-colors"
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
    </div>

    <!-- Filters -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-white/5 mb-6 shadow-sm dark:shadow-xl dark:shadow-black/20"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label
            class="block text-xs font-medium text-slate-500 dark:text-white/40 mb-1.5 uppercase tracking-wider"
            >From Date</label
          >
          <input
            v-model="filters.fromDate"
            type="date"
            class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-slate-500 dark:text-white/40 mb-1.5 uppercase tracking-wider"
            >To Date</label
          >
          <input
            v-model="filters.toDate"
            type="date"
            class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label
            class="block text-xs font-medium text-slate-500 dark:text-white/40 mb-1.5 uppercase tracking-wider"
            >Student</label
          >
          <select
            v-model="filters.studentId"
            class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
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
            class="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-white rounded-xl font-medium transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm dark:shadow-xl flex-1 flex flex-col min-h-0"
    >
      <div class="overflow-auto flex-1">
        <table class="w-full text-left border-collapse">
          <thead
            class="bg-slate-50/90 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase sticky top-0 backdrop-blur-md z-10"
          >
            <tr>
              <th class="p-4 border-b border-slate-200 dark:border-white/5">
                Student
              </th>
              <th class="p-4 border-b border-slate-200 dark:border-white/5">
                Date
              </th>
              <th
                class="p-4 border-b border-slate-200 dark:border-white/5 hidden md:table-cell"
              >
                Check In
              </th>
              <th
                class="p-4 border-b border-slate-200 dark:border-white/5 hidden md:table-cell"
              >
                Check Out
              </th>
              <th
                class="p-4 border-b border-slate-200 dark:border-white/5 hidden lg:table-cell"
              >
                Total
              </th>
              <th class="p-4 border-b border-slate-200 dark:border-white/5">
                Location
              </th>
              <th
                class="p-4 border-b border-slate-200 dark:border-white/5 text-right"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-white/5 text-sm">
            <tr v-if="loading">
              <td
                colspan="7"
                class="p-8 text-center text-slate-500 animate-pulse"
              >
                Loading records...
              </td>
            </tr>
            <tr v-else-if="filteredRecords.length === 0">
              <td colspan="7" class="p-8 text-center text-slate-500">
                No records found matching your filters.
              </td>
            </tr>
            <tr
              v-for="log in filteredRecords"
              :key="log.id"
              class="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
            >
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 font-bold text-xs uppercase border border-slate-300 dark:border-white/5"
                  >
                    {{ log.studentName ? log.studentName.charAt(0) : "?" }}
                  </div>
                  <span class="font-bold text-slate-900 dark:text-white">{{
                    log.studentName
                  }}</span>
                </div>
              </td>
              <td class="p-4 text-slate-600 dark:text-slate-300">
                {{ formatDate(log.clockInTime) }}
              </td>
              <td class="p-4 hidden md:table-cell">
                <div class="flex items-center gap-2">
                  <span class="text-slate-900 dark:text-white font-mono">{{
                    formatTime(log.clockInTime)
                  }}</span>
                  <button
                    v-if="log.clockInPhoto"
                    @click="viewPhoto(log.clockInPhoto)"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 opacity-60 hover:opacity-100 transition-opacity"
                    title="View Photo"
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
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td class="p-4 hidden md:table-cell">
                <div v-if="log.clockOutTime" class="flex items-center gap-2">
                  <span class="text-slate-900 dark:text-white font-mono">{{
                    formatTime(log.clockOutTime)
                  }}</span>
                  <button
                    v-if="log.clockOutPhoto"
                    @click="viewPhoto(log.clockOutPhoto)"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 opacity-60 hover:opacity-100 transition-opacity"
                    title="View Photo"
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
                <span
                  v-else
                  class="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase bg-emerald-100 dark:bg-emerald-400/10 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-500/20"
                  >Active</span
                >
              </td>
              <td
                class="p-4 font-mono text-slate-600 dark:text-slate-300 hidden lg:table-cell"
              >
                {{ log.totalHours ? log.totalHours.toFixed(2) + "h" : "-" }}
              </td>
              <td class="p-4">
                <span
                  v-if="log.isClockInOutside || log.isClockOutOutside"
                  @click="viewReason(log)"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20 cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-500/20 transition-colors"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-orange-500 dark:bg-orange-400"
                  ></span>
                  Remote
                </span>
                <span
                  v-else
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                  ></span>
                  Office
                </span>
              </td>
              <td class="p-4 text-right">
                <button
                  @click="deleteRecord(log.id)"
                  class="text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg"
                  title="Delete Log"
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
          </tbody>
        </table>
      </div>
    </div>

    <!-- Photo Modal -->
    <div
      v-if="photoModal"
      class="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
      @click="photoModal = null"
    >
      <div class="relative max-w-lg w-full animate-in zoom-in-95 duration-200">
        <button
          @click="photoModal = null"
          class="absolute -top-12 right-0 text-white hover:text-white/70 flex items-center gap-2"
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
        class="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 border border-slate-200 dark:border-white/10 shadow-2xl relative animate-in zoom-in-95 duration-200"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">
            Remote Work Details
          </h3>
          <button
            @click="reasonModal = null"
            class="text-slate-400 hover:text-slate-600 dark:text-white/40 dark:hover:text-white"
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
            class="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/5"
          >
            <p
              class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2"
            >
              Clock In Reason
            </p>
            <p class="text-slate-700 dark:text-white text-sm">
              {{ reasonModal.clockInReason }}
            </p>
          </div>
          <div
            v-if="reasonModal.clockOutReason"
            class="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/5"
          >
            <p
              class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2"
            >
              Clock Out Reason
            </p>
            <p class="text-slate-700 dark:text-white text-sm">
              {{ reasonModal.clockOutReason }}
            </p>
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

const logs = ref([]);
const students = ref([]);
const loading = ref(true);
const photoModal = ref(null);
const reasonModal = ref(null);

const filters = ref({
  fromDate: "",
  toDate: "",
  studentId: "",
});

const filteredRecords = computed(() => logs.value);

onMounted(async () => {
  await loadStudents();
  await loadLogs();
});

const loadStudents = async () => {
  const snapshot = await getDocs(collection(db, "attendance_students"));
  students.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const loadLogs = async () => {
  loading.value = true;
  try {
    let q = query(
      collection(db, "attendance_logs"),
      orderBy("clockInTime", "desc"),
    );
    const snapshot = await getDocs(q);
    logs.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error loading logs:", err);
  } finally {
    loading.value = false;
  }
};

const applyFilters = async () => {
  loading.value = true;
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
    await loadLogs(); // Fallback
  } finally {
    loading.value = false;
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

const deleteRecord = async (id) => {
  if (!confirm("Are you sure you want to delete this log?")) return;
  try {
    await deleteDoc(doc(db, "attendance_logs", id));
    await loadLogs();
  } catch (e) {
    alert("Error deleting: " + e.message);
  }
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
</script>
