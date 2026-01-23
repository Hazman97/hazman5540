<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <header class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-white tracking-tight">
          Leave Requests
        </h2>
        <p class="text-slate-400">Manage student leave applications</p>
      </div>
    </header>

    <!-- Content -->
    <div
      class="flex-1 overflow-y-auto bg-slate-800 rounded-2xl border border-white/5 shadow-xl"
    >
      <div v-if="loading" class="p-8 text-center text-slate-500 animate-pulse">
        Loading requests...
      </div>

      <div
        v-else-if="requests.length === 0"
        class="p-12 text-center text-white/30"
      >
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
        <p>No pending requests</p>
      </div>

      <div v-else class="divide-y divide-white/5">
        <div
          v-for="req in requests"
          :key="req.id"
          class="p-6 hover:bg-white/5 transition-colors"
        >
          <div
            class="flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <!-- Info -->
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/5 font-bold"
                :class="{
                  'bg-blue-500/10 text-blue-400': req.type === 'MC',
                  'bg-emerald-500/10 text-emerald-400': req.type === 'AL',
                  'bg-orange-500/10 text-orange-400': req.type === 'EL',
                }"
              >
                {{ req.type }}
              </div>
              <div>
                <h3 class="text-white font-bold text-lg">
                  {{ req.studentName }}
                </h3>
                <p class="text-indigo-300 font-medium">
                  {{ formatDate(req.startDate) }} -
                  {{ formatDate(req.endDate) }}
                </p>
                <p class="text-white/60 mt-1 max-w-xl">{{ req.reason }}</p>

                <div v-if="req.attachmentUrl" class="mt-3">
                  <a
                    :href="req.attachmentUrl"
                    target="_blank"
                    class="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300"
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
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                    View Attachment
                  </a>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-3 self-end md:self-center">
              <button
                @click="updateStatus(req, 'approved')"
                :disabled="processing === req.id"
                class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 transition-all flex items-center gap-2 disabled:opacity-50"
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
                    stroke-width="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Approve
              </button>
              <button
                @click="updateStatus(req, 'rejected')"
                :disabled="processing === req.id"
                class="px-4 py-2 bg-slate-700 hover:bg-rose-600/80 text-white rounded-lg font-medium transition-all border border-white/10 disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";

const requests = ref([]);
const loading = ref(true);
const processing = ref(null);

onMounted(() => {
  loadRequests();
});

async function loadRequests() {
  loading.value = true;
  try {
    const q = query(
      collection(db, "leave_applications"),
      where("status", "==", "pending"),
    );
    const snapshot = await getDocs(q);
    const reqs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      studentName: doc.data().studentName || "Unknown Student", // Fallback
    }));

    // Sort in memory
    reqs.sort((a, b) => b.createdAt - a.createdAt);

    requests.value = reqs;
  } catch (err) {
    console.error("Error loading requests:", err);
  } finally {
    loading.value = false;
  }
}

async function updateStatus(req, status) {
  if (!confirm(`Are you sure you want to ${status} this request?`)) return;

  processing.value = req.id;
  try {
    await updateDoc(doc(db, "leave_applications", req.id), {
      status: status,
    });
    // Remove from list
    requests.value = requests.value.filter((r) => r.id !== req.id);
  } catch (err) {
    console.error("Update failed:", err);
    alert("Failed to update status");
  } finally {
    processing.value = null;
  }
}

function formatDate(timestamp) {
  if (!timestamp) return "-";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
</script>
