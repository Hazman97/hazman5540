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
            Back
          </router-link>
        </div>
        <span class="text-slate-900 dark:text-white font-bold tracking-tight"
          >Apply Leave</span
        >
        <div class="w-10"></div>
        <!-- Spacer for center alignment -->
      </div>
    </header>

    <main class="max-w-xl mx-auto px-4 py-8">
      <form @submit.prevent="submitApplication" class="space-y-6">
        <!-- Leave Type -->
        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-slate-700 dark:text-white/60"
            >Leave Type</label
          >
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              @click="form.type = 'MC'"
              class="p-4 rounded-xl border transition-all text-left"
              :class="
                form.type === 'MC'
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-slate-700'
              "
            >
              <div class="font-bold mb-1">Medical Certificate</div>
              <div class="text-xs opacity-70">Sick leave with MC</div>
            </button>
            <button
              type="button"
              @click="form.type = 'AL'"
              class="p-4 rounded-xl border transition-all text-left"
              :class="
                form.type === 'AL'
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-slate-700'
              "
            >
              <div class="font-bold mb-1">Annual Leave</div>
              <div class="text-xs opacity-70">Planned time off</div>
            </button>
            <button
              type="button"
              @click="form.type = 'EL'"
              class="p-4 rounded-xl border transition-all text-left"
              :class="
                form.type === 'EL'
                  ? 'bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-slate-700'
              "
            >
              <div class="font-bold mb-1">Emergency Leave</div>
              <div class="text-xs opacity-70">Unplanned urgent leave</div>
            </button>
          </div>
        </div>

        <!-- Dates -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-slate-700 dark:text-white/60"
              >Start Date</label
            >
            <input
              v-model="form.startDate"
              type="date"
              required
              class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-slate-700 dark:text-white/60"
              >End Date</label
            >
            <input
              v-model="form.endDate"
              type="date"
              required
              class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <!-- File Upload (Required for MC) -->
        <div class="space-y-2" v-if="form.type === 'MC'">
          <label
            class="block text-sm font-medium text-slate-700 dark:text-white/60"
          >
            Attach MC Photo/PDF
            <span class="text-rose-500 dark:text-rose-400">*</span>
          </label>
          <div
            class="relative border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-6 transition-colors hover:border-slate-400 dark:hover:border-white/20 bg-slate-50 dark:bg-slate-800/50 text-center"
          >
            <input
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              accept="image/*,application/pdf"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              :required="form.type === 'MC'"
            />
            <div
              v-if="!selectedFile"
              class="flex flex-col items-center gap-2 text-slate-500 dark:text-white/40"
            >
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span class="text-sm">Click to upload or drag and drop</span>
            </div>
            <div
              v-else
              class="flex items-center justify-between text-slate-900 dark:text-white"
            >
              <span class="text-sm truncate">{{ selectedFile.name }}</span>
              <button
                type="button"
                @click.prevent="clearFile"
                class="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300"
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
          </div>
        </div>

        <!-- Reason -->
        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-slate-700 dark:text-white/60"
            >Reason</label
          >
          <textarea
            v-model="form.reason"
            rows="3"
            placeholder="Please provide a reason for your leave..."
            required
            class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="submitting"
          class="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:dark:bg-slate-700 disabled:text-slate-400 disabled:dark:text-white/30 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 dark:shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
        >
          <span
            v-if="submitting"
            class="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          ></span>
          {{ submitting ? "Submitting..." : "Submit Application" }}
        </button>
      </form>
    </main>

    <!-- Success Modal -->
    <div
      v-if="showSuccess"
      class="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300"
    >
      <div
        class="bg-slate-800 rounded-3xl p-8 max-w-sm w-full text-center border border-white/10 shadow-2xl"
      >
        <div
          class="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30"
        >
          <svg
            class="w-8 h-8 text-white"
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
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Application Sent!</h3>
        <p class="text-white/60 mb-6">
          Your leave application has been submitted successfully for approval.
        </p>
        <button
          @click="router.push('/attendance/dashboard')"
          class="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-100 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { uploadLeaveAttachment } from "@/services/attendanceStorageService";

const router = useRouter();
const student = ref(null);
const submitting = ref(false);
const showSuccess = ref(false);
const fileInput = ref(null);
const selectedFile = ref(null);

const form = ref({
  type: "MC",
  startDate: "",
  endDate: "",
  reason: "",
});

onMounted(() => {
  const stored = localStorage.getItem("attendance_student");
  if (!stored) {
    router.push("/attendance");
    return;
  }
  student.value = JSON.parse(stored);
});

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    // Basic validation
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      clearFile();
      return;
    }
    selectedFile.value = file;
  }
}

function clearFile() {
  selectedFile.value = null;
  if (fileInput.value) fileInput.value.value = "";
}

async function submitApplication() {
  if (form.value.type === "MC" && !selectedFile.value) {
    alert("Please attach your MC document.");
    return;
  }

  submitting.value = true;

  try {
    let attachmentUrl = null;

    if (selectedFile.value) {
      // Use dedicated upload function
      const result = await uploadLeaveAttachment(
        selectedFile.value,
        "leave_" + form.value.type,
        student.value.id,
      );

      if (result.success) {
        attachmentUrl = result.url;
      } else {
        throw new Error(result.error || "File upload failed");
      }
    }

    const applicationData = {
      studentId: student.value.id,
      studentName: student.value.name,
      type: form.value.type,
      startDate: Timestamp.fromDate(new Date(form.value.startDate)),
      endDate: Timestamp.fromDate(new Date(form.value.endDate)),
      reason: form.value.reason,
      attachmentUrl: attachmentUrl,
      status: "pending", // pending, approved, rejected
      createdAt: Timestamp.now(),
    };

    await addDoc(collection(db, "leave_applications"), applicationData);

    showSuccess.value = true;
  } catch (err) {
    console.error("Submission failed:", err);
    alert("Failed to submit application: " + err.message);
  } finally {
    submitting.value = false;
  }
}
</script>
