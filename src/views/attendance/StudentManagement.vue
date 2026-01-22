<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <!-- Sidebar -->
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
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span>Students</span>
        </router-link>
        <router-link
          to="/attendance/admin/records"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
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

    <!-- Main Content -->
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
        <span class="text-white font-bold">Student Management</span>
        <div class="w-8"></div>
      </header>

      <!-- Mobile Nav Overlay -->
      <div
        v-if="mobileNav"
        class="lg:hidden fixed inset-0 bg-black/50 z-50"
        @click="mobileNav = false"
      >
        <div class="w-64 h-full bg-slate-900 p-4" @click.stop>
          <nav class="space-y-2">
            <router-link
              to="/attendance/admin/dashboard"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70"
              @click="mobileNav = false"
              >Dashboard</router-link
            >
            <router-link
              to="/attendance/admin/students"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-purple-500/20"
              @click="mobileNav = false"
              >Students</router-link
            >
            <router-link
              to="/attendance/admin/records"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70"
              @click="mobileNav = false"
              >Records</router-link
            >
            <button
              @click="handleLogout"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 w-full"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      <div class="p-4 lg:p-6">
        <!-- Header -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        >
          <h1 class="text-2xl lg:text-3xl font-bold text-white">
            Student Management
          </h1>
          <button
            @click="openModal()"
            class="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium flex items-center gap-2 justify-center"
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
            Add Student
          </button>
        </div>

        <!-- Search -->
        <div class="mb-6">
          <input
            v-model="search"
            type="text"
            placeholder="Search students..."
            class="w-full sm:w-80 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500"
          />
        </div>

        <!-- Students Table -->
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
                    Name
                  </th>
                  <th
                    class="px-4 lg:px-6 py-4 text-left text-white/60 text-sm font-medium hidden sm:table-cell"
                  >
                    Username
                  </th>
                  <th
                    class="px-4 lg:px-6 py-4 text-left text-white/60 text-sm font-medium hidden md:table-cell"
                  >
                    Department
                  </th>
                  <th
                    class="px-4 lg:px-6 py-4 text-left text-white/60 text-sm font-medium"
                  >
                    Status
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
                  v-for="student in filteredStudents"
                  :key="student.id"
                  class="hover:bg-white/5"
                >
                  <td class="px-4 lg:px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold"
                      >
                        {{ student.name?.charAt(0)?.toUpperCase() }}
                      </div>
                      <div>
                        <p class="text-white font-medium">{{ student.name }}</p>
                        <p class="text-white/50 text-sm sm:hidden">
                          {{ student.username }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-4 lg:px-6 py-4 text-white/70 hidden sm:table-cell"
                  >
                    {{ student.username }}
                  </td>
                  <td
                    class="px-4 lg:px-6 py-4 text-white/70 hidden md:table-cell"
                  >
                    {{ student.department || "-" }}
                  </td>
                  <td class="px-4 lg:px-6 py-4">
                    <span
                      :class="[
                        'px-3 py-1 rounded-full text-xs font-medium',
                        student.isActive
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400',
                      ]"
                    >
                      {{ student.isActive ? "Active" : "Inactive" }}
                    </span>
                  </td>
                  <td class="px-4 lg:px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button
                        @click="openModal(student)"
                        class="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        @click="deleteStudent(student)"
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
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredStudents.length === 0">
                  <td colspan="5" class="px-6 py-12 text-center text-white/40">
                    No students found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="showModal = false"
    >
      <div
        class="bg-slate-800 rounded-2xl w-full max-w-md p-6 border border-white/10"
        @click.stop
      >
        <h2 class="text-xl font-bold text-white mb-6">
          {{ editingStudent ? "Edit Student" : "Add New Student" }}
        </h2>

        <form @submit.prevent="saveStudent" class="space-y-4">
          <div>
            <label class="block text-white/70 text-sm mb-2">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label class="block text-white/70 text-sm mb-2">Username</label>
            <input
              v-model="form.username"
              type="text"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label class="block text-white/70 text-sm mb-2"
              >Password
              {{ editingStudent ? "(leave blank to keep)" : "" }}</label
            >
            <input
              v-model="form.password"
              type="password"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
              :required="!editingStudent"
            />
          </div>
          <div>
            <label class="block text-white/70 text-sm mb-2">Department</label>
            <input
              v-model="form.department"
              type="text"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div class="flex items-center gap-3">
            <input
              v-model="form.isActive"
              type="checkbox"
              id="isActive"
              class="w-5 h-5 rounded"
            />
            <label for="isActive" class="text-white/70">Active</label>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showModal = false"
              class="flex-1 px-4 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-500 disabled:opacity-50"
            >
              {{ saving ? "Saving..." : "Save" }}
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
const mobileNav = ref(false);
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
      if (form.value.password) {
        data.password = form.value.password; // Plain text
      }
      await updateDoc(
        doc(db, "attendance_students", editingStudent.value.id),
        data,
      );
    } else {
      data.password = form.value.password; // Plain text
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
