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
          <h2 class="text-xl font-bold text-white tracking-tight">
            Student Management
          </h2>
        </div>

        <button
          @click="openModal()"
          class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-900/20 hover:shadow-indigo-900/40 transition-all flex items-center gap-2"
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

      <div class="p-6 overflow-y-auto flex-1">
        <!-- Search -->
        <div class="mb-6 max-w-md">
          <div class="relative group">
            <svg
              class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-indigo-400 transition-colors"
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
              class="w-full bg-slate-800 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            />
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
                    class="p-4 text-xs font-bold text-white/40 uppercase tracking-wider hidden sm:table-cell"
                  >
                    Username
                  </th>
                  <th
                    class="p-4 text-xs font-bold text-white/40 uppercase tracking-wider hidden md:table-cell"
                  >
                    Dept
                  </th>
                  <th
                    class="p-4 text-xs font-bold text-white/40 uppercase tracking-wider"
                  >
                    Status
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
                  v-for="student in filteredStudents"
                  :key="student.id"
                  class="group hover:bg-white/5 transition-colors"
                >
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/10"
                      >
                        {{ student.name?.charAt(0)?.toUpperCase() }}
                      </div>
                      <div>
                        <p class="font-medium text-white">{{ student.name }}</p>
                        <p class="text-xs text-white/40 sm:hidden">
                          {{ student.username }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="p-4 text-sm text-white/60 hidden sm:table-cell font-mono"
                  >
                    {{ student.username }}
                  </td>
                  <td class="p-4 text-sm text-white/60 hidden md:table-cell">
                    <span
                      v-if="student.department"
                      class="px-2 py-1 rounded bg-white/5 text-xs border border-white/5"
                      >{{ student.department }}</span
                    >
                    <span v-else class="text-white/20">-</span>
                  </td>
                  <td class="p-4">
                    <span
                      :class="[
                        'px-2.5 py-1 rounded-full text-xs font-medium border',
                        student.isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20',
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
                        class="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
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
                        class="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
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
                  <td colspan="5" class="p-12 text-center text-white/30">
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
    </main>

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
        class="bg-slate-800 rounded-2xl w-full max-w-md p-6 border border-white/10 shadow-2xl relative z-10 animate-in zoom-in-95 duration-200"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-white">
            {{ editingStudent ? "Edit Student" : "New Student" }}
          </h2>
          <button
            @click="showModal = false"
            class="text-white/40 hover:text-white"
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
            <label class="block text-sm font-medium text-white/60 mb-1.5"
              >Full Name</label
            >
            <input
              v-model="form.name"
              type="text"
              class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              required
              placeholder="e.g. Ali Baba"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-white/60 mb-1.5"
              >Username</label
            >
            <input
              v-model="form.username"
              type="text"
              class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              required
              placeholder="e.g. ali123"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-white/60 mb-1.5">
              Password
              <span
                v-if="editingStudent"
                class="text-xs font-normal text-white/30 ml-1"
                >(Leave blank to keep current)</span
              >
            </label>
            <input
              v-model="form.password"
              type="text"
              class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              :required="!editingStudent"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-white/60 mb-1.5"
              >Department</label
            >
            <input
              v-model="form.department"
              type="text"
              class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. IT, HR"
            />
          </div>

          <div class="flex items-center gap-3 pt-2">
            <div class="relative flex items-center">
              <input
                v-model="form.isActive"
                type="checkbox"
                id="status"
                class="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/20 bg-slate-900 checked:bg-indigo-500 checked:border-indigo-500 transition-all"
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
              class="text-sm text-white/80 cursor-pointer select-none"
              >Account is Active</label
            >
          </div>

          <div class="pt-4 flex gap-3">
            <button
              type="button"
              @click="showModal = false"
              class="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white transition-colors font-medium"
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
import { useRouter } from "vue-router";
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

const router = useRouter();
const sidebarOpen = ref(true);
const students = ref([]);
const search = ref("");
const showModal = ref(false);
const editingStudent = ref(null);
const saving = ref(false);

const form = ref({
  name: "",
  username: "",
  password: "",
  department: "",
  isActive: true,
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
  const admin = localStorage.getItem("attendance_admin");
  if (!admin) {
    router.push("/attendance/admin");
    return;
  }
  await loadStudents();
});

const loadStudents = async () => {
  const snapshot = await getDocs(collection(db, "attendance_students"));
  students.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

const handleLogout = () => {
  localStorage.removeItem("attendance_admin");
  router.push("/attendance/admin");
};
</script>
