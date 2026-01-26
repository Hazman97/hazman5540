<template>
  <div class="h-full flex flex-col">
    <!-- Topbar -->
    <header class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-4">
        <h2
          class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight"
        >
          Student Management
        </h2>
      </div>

      <button
        @click="openModal()"
        class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all flex items-center gap-2"
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span class="hidden sm:inline">Add Student</span>
        <span class="sm:hidden">Add</span>
      </button>
    </header>

    <div class="overflow-y-auto flex-1 flex flex-col min-h-0">
      <!-- Search -->
      <div class="mb-6 max-w-md">
        <div class="relative group">
          <svg
            class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Search by name, username or department..."
            class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-sm dark:shadow-none"
          />
        </div>
      </div>

      <!-- Table -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm dark:shadow-xl dark:shadow-black/20 flex-1 flex flex-col"
      >
        <div class="overflow-auto flex-1">
          <table class="w-full text-left border-collapse">
            <thead class="sticky top-0 z-10">
              <tr
                class="border-b border-slate-200 dark:border-white/5 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md"
              >
                <th
                  class="p-4 text-xs font-bold text-slate-500 dark:text-white/40 uppercase tracking-wider"
                >
                  Student
                </th>
                <th
                  class="p-4 text-xs font-bold text-slate-500 dark:text-white/40 uppercase tracking-wider hidden sm:table-cell"
                >
                  Username
                </th>
                <th
                  class="p-4 text-xs font-bold text-slate-500 dark:text-white/40 uppercase tracking-wider hidden md:table-cell"
                >
                  Dept
                </th>
                <th
                  class="p-4 text-xs font-bold text-slate-500 dark:text-white/40 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="p-4 text-xs font-bold text-slate-500 dark:text-white/40 uppercase tracking-wider text-right"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-white/5">
              <tr v-if="loading">
                <td
                  colspan="5"
                  class="p-8 text-center text-slate-500 animate-pulse"
                >
                  Loading students...
                </td>
              </tr>
              <tr
                v-else
                v-for="student in filteredStudents"
                :key="student.id"
                class="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 flex items-center justify-center font-bold border border-indigo-200 dark:border-indigo-500/10"
                    >
                      {{ student.name?.charAt(0)?.toUpperCase() }}
                    </div>
                    <div>
                      <p class="font-medium text-slate-900 dark:text-white">
                        {{ student.name }}
                      </p>
                      <p
                        class="text-xs text-slate-500 dark:text-white/40 sm:hidden"
                      >
                        {{ student.username }}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  class="p-4 text-sm text-slate-600 dark:text-white/60 hidden sm:table-cell font-mono"
                >
                  {{ student.username }}
                </td>
                <td
                  class="p-4 text-sm text-slate-600 dark:text-white/60 hidden md:table-cell"
                >
                  <span
                    v-if="student.department"
                    class="px-2 py-1 rounded bg-slate-100 dark:bg-white/5 text-xs border border-slate-200 dark:border-white/5"
                    >{{ student.department }}</span
                  >
                  <span v-else class="text-slate-400 dark:text-white/20"
                    >-</span
                  >
                </td>
                <td class="p-4">
                  <span
                    :class="[
                      'px-2.5 py-1 rounded-full text-xs font-medium border',
                      student.isActive
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                        : 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
                    ]"
                  >
                    {{ student.isActive ? "Active" : "Inactive" }}
                  </span>
                </td>
                <td class="p-4 text-right">
                  <div
                    class="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      @click="openModal(student)"
                      class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                      title="Edit"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="deleteStudent(student)"
                      class="p-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete"
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
                  </div>
                </td>
              </tr>
              <tr v-if="filteredStudents.length === 0">
                <td
                  colspan="5"
                  class="p-12 text-center text-slate-400 dark:text-white/30"
                >
                  <div
                    class="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3"
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <p>No students found matching your search</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="showModal = false"
      ></div>
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 border border-slate-200 dark:border-white/10 shadow-2xl relative z-10 animate-in zoom-in-95 duration-200"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white">
            {{ editingStudent ? "Edit Student" : "New Student" }}
          </h2>
          <button
            @click="showModal = false"
            class="text-slate-400 hover:text-slate-600 dark:text-white/40 dark:hover:text-white"
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
          </button>
        </div>

        <form @submit.prevent="saveStudent" class="space-y-4">
          <div>
            <label
              class="block text-sm font-medium text-slate-700 dark:text-white/60 mb-1.5"
              >Full Name</label
            >
            <input
              v-model="form.name"
              type="text"
              class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
              required
              placeholder="e.g. Ali Baba"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-slate-700 dark:text-white/60 mb-1.5"
              >Username</label
            >
            <input
              v-model="form.username"
              type="text"
              class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
              required
              placeholder="e.g. ali123"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-slate-700 dark:text-white/60 mb-1.5"
            >
              Password
              <span
                v-if="editingStudent"
                class="text-xs font-normal text-slate-500 dark:text-white/30 ml-1"
                >(Leave blank to keep current)</span
              >
            </label>
            <input
              v-model="form.password"
              type="text"
              class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
              :required="!editingStudent"
              placeholder="••••••••"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                class="block text-sm font-medium text-slate-700 dark:text-white/60 mb-1.5"
                >AL Quota</label
              >
              <input
                v-model.number="form.alQuota"
                type="number"
                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="e.g. 14"
              />
            </div>
            <div>
              <label
                class="block text-sm font-medium text-slate-700 dark:text-white/60 mb-1.5"
                >MC Quota</label
              >
              <input
                v-model.number="form.mcQuota"
                type="number"
                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="e.g. 14"
              />
            </div>
          </div>

          <div>
            <label
              class="block text-sm font-medium text-slate-700 dark:text-white/60 mb-1.5"
              >Department</label
            >
            <input
              v-model="form.department"
              type="text"
              class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. IT, HR"
            />
          </div>

          <div class="flex items-center gap-3 pt-2">
            <div class="relative flex items-center">
              <input
                v-model="form.isActive"
                type="checkbox"
                id="status"
                class="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-900 checked:bg-indigo-500 checked:border-indigo-500 transition-all"
              />
              <svg
                class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <label
              for="status"
              class="text-sm text-slate-700 dark:text-white/80 cursor-pointer select-none"
              >Account is Active</label
            >
          </div>

          <div class="pt-4 flex gap-3">
            <button
              type="button"
              @click="showModal = false"
              class="flex-1 py-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-white transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors font-medium flex justify-center items-center gap-2"
            >
              <span
                v-if="saving"
                class="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              ></span>
              {{ saving ? "Saving..." : "Save Student" }}
            </button>
          </div>
        </form>
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
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

const students = ref([]);
const search = ref("");
const showModal = ref(false);
const editingStudent = ref(null);
const saving = ref(false);
const loading = ref(true);

const form = ref({
  name: "",
  username: "",
  password: "",
  department: "",
  isActive: true,
  alQuota: 14,
  mcQuota: 14,
});

const filteredStudents = computed(() => {
  if (!search.value) return students.value;
  const q = search.value.toLowerCase();
  return students.value.filter(
    (s) =>
      s.name?.toLowerCase().includes(q) ||
      s.username?.toLowerCase().includes(q) ||
      s.department?.toLowerCase().includes(q),
  );
});

onMounted(async () => {
  await loadStudents();
});

const loadStudents = async () => {
  loading.value = true;
  try {
    const snapshot = await getDocs(collection(db, "attendance_students"));
    students.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.error("Load students error:", e);
  } finally {
    loading.value = false;
  }
};

const openModal = (student = null) => {
  editingStudent.value = student;
  if (student) {
    form.value = { ...student, password: "" };
  } else {
    form.value = {
      name: "",
      username: "",
      password: "",
      department: "",
      isActive: true,
      alQuota: 14,
      mcQuota: 14,
    };
  }
  showModal.value = true;
};

const saveStudent = async () => {
  saving.value = true;
  try {
    const data = {
      name: form.value.name,
      username: form.value.username,
      department: form.value.department,
      isActive: form.value.isActive,
      alQuota: form.value.alQuota || 14,
      mcQuota: form.value.mcQuota || 14,
    };

    if (editingStudent.value) {
      if (form.value.password) data.password = form.value.password;
      await updateDoc(
        doc(db, "attendance_students", editingStudent.value.id),
        data,
      );
    } else {
      data.password = form.value.password;
      data.createdAt = Timestamp.now();
      await addDoc(collection(db, "attendance_students"), data);
    }

    showModal.value = false;
    await loadStudents();
  } catch (err) {
    console.error("Error saving:", err);
    alert("Failed to save student");
  } finally {
    saving.value = false;
  }
};

const deleteStudent = async (student) => {
  if (!confirm(`Delete ${student.name}?`)) return;
  try {
    await deleteDoc(doc(db, "attendance_students", student.id));
    await loadStudents();
  } catch (err) {
    console.error("Error deleting:", err);
    alert("Failed to delete");
  }
};
</script>
