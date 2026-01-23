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
          >My Leaves</span
        >
        <div class="w-10"></div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Leave History
      </h1>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div
          v-for="i in 3"
          :key="i"
          class="h-32 bg-slate-200 dark:bg-slate-800/50 rounded-2xl animate-pulse"
        ></div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="applications.length === 0"
        class="text-center py-20 bg-slate-100 dark:bg-slate-800/30 rounded-3xl border border-slate-200 dark:border-white/5 border-dashed"
      >
        <div
          class="w-16 h-16 bg-white dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4"
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 class="text-slate-900 dark:text-white font-medium mb-1">
          No applications found
        </h3>
        <router-link
          to="/attendance/apply-leave"
          class="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 text-sm"
        >
          Apply for a leave
        </router-link>
      </div>

      <!-- List -->
      <div v-else class="space-y-4">
        <div
          v-for="app in applications"
          :key="app.id"
          class="bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors p-5 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm dark:shadow-none"
        >
          <!-- Icon/Type -->
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 dark:border-white/5"
              :class="{
                'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400':
                  app.type === 'MC',
                'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400':
                  app.type === 'AL',
                'bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400':
                  app.type === 'EL',
              }"
            >
              <span class="font-bold text-sm">{{ app.type }}</span>
            </div>
            <div>
              <p class="text-slate-900 dark:text-white font-medium">
                {{ formatDate(app.startDate) }} - {{ formatDate(app.endDate) }}
              </p>
              <p
                class="text-slate-500 dark:text-white/40 text-sm truncate max-w-[200px]"
              >
                {{ app.reason }}
              </p>
            </div>
          </div>

          <div
            class="flex-1 sm:text-right flex items-center sm:justify-end gap-3"
          >
            <!-- Attachment Link -->
            <a
              v-if="app.attachmentUrl"
              :href="app.attachmentUrl"
              target="_blank"
              class="p-2 text-slate-400 hover:text-slate-600 dark:text-white/40 dark:hover:text-white transition-colors"
              title="View Attachment"
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
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </a>

            <!-- Status Badge -->
            <div
              class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
              :class="{
                'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-500 dark:border-yellow-500/20':
                  app.status === 'pending',
                'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-500 dark:border-emerald-500/20':
                  app.status === 'approved',
                'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-500 dark:border-rose-500/20':
                  app.status === 'rejected',
              }"
            >
              {{ app.status }}
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
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const router = useRouter();
const applications = ref([]);
const loading = ref(true);
const student = ref(null);

onMounted(async () => {
  const stored = localStorage.getItem("attendance_student");
  if (!stored) {
    router.push("/attendance");
    return;
  }
  student.value = JSON.parse(stored);
  await loadApplications();
});

async function loadApplications() {
  loading.value = true;
  try {
    const q = query(
      collection(db, "leave_applications"),
      where("studentId", "==", student.value.id),
    );
    const snapshot = await getDocs(q);
    const apps = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sort in memory
    apps.sort((a, b) => b.createdAt - a.createdAt);

    applications.value = apps;
  } catch (err) {
    console.error("Error loading leaves:", err);
  } finally {
    loading.value = false;
  }
}

function formatDate(timestamp) {
  if (!timestamp) return "-";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}
</script>
