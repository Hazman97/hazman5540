<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-900 pt-28 pb-12 px-4 sm:px-6 transition-colors duration-300"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8 md:mb-12 reveal">
        <span
          class="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] sm:text-xs font-bold tracking-wider mb-4 animate-fade-in-up"
        >
          PEJABAT DUN
        </span>
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-3 font-serif"
        >
          Senarai 
        </h1>
        <p
          class="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed"
        >
          Senarai ringkas untuk kiraan saiz baju.
        </p>
      </div>

      <!-- Stats Card -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/5 border border-slate-100 dark:border-slate-700 mb-8 transform transition-all hover:scale-[1.01]"
      >
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div class="text-center sm:text-left">
            <h3
              class="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-wider mb-1"
            >
              Jumlah Terkini
            </h3>
            <div
              class="text-5xl sm:text-6xl font-black text-slate-800 dark:text-white tracking-tight"
            >
              {{ members.length }}
              <span class="text-lg sm:text-2xl text-slate-400 font-medium ml-1"
                >unit</span
              >
            </div>
          </div>

          <div
            class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <div
              class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner"
            >
              👔
            </div>
          </div>
        </div>

        <!-- Progress Bar Visual -->
        <div
          class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 mt-6 overflow-hidden"
        >
          <div
            class="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out"
            :style="{ width: `${Math.min(members.length * 5, 100)}%` }"
          ></div>
        </div>
      </div>

      <!-- Copy Preview Section -->
      <div
        v-if="members.length > 0"
        class="bg-slate-100 dark:bg-slate-900/50 rounded-3xl p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 mb-10"
      >
        <div class="flex items-center justify-between mb-4">
          <h3
            class="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-wider"
          >
            Preview & Copy
          </h3>
          <button
            @click="copyList"
            class="group relative px-6 py-2 bg-slate-800 dark:bg-slate-700 hover:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-900/20"
            :class="{ '!bg-green-500': copied }"
          >
            <span class="text-lg">{{ copied ? "✅" : "📋" }}</span>
            <span>{{ copied ? "Disalin!" : "Salin Teks" }}</span>
          </button>
        </div>
        <div
          class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto"
        >
          {{ formattedText }}
        </div>
      </div>

      <!-- Add/Edit Form -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100 dark:border-slate-700 mb-10 relative overflow-hidden group"
      >
        <div
          class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        ></div>
        <h2
          class="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2"
        >
          <span
            class="bg-blue-100 dark:bg-blue-900/50 text-blue-600 p-2 rounded-lg text-lg"
            >{{ isEditing ? "✏️" : "✍️" }}</span
          >
          {{ isEditing ? "Kemaskini Nama" : "Tambah Nama Baru" }}
        </h2>

        <form
          @submit.prevent="saveMember"
          class="flex flex-col md:flex-row gap-4 items-end"
        >
          <div class="flex-1 w-full relative">
            <label
              class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1"
              >Nama</label
            >
            <input
              v-model="form.name"
              type="text"
              placeholder="Nama Penuh"
              class="form-input peer"
              required
            />
          </div>

          <div class="w-full md:w-40 relative">
            <label
              class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1"
              >Saiz</label
            >
            <input
              v-model="form.size"
              type="text"
              placeholder="XL"
              class="form-input font-bold text-center peer"
              required
            />
          </div>

          <div class="flex gap-2 w-full md:w-auto">
            <button
              v-if="isEditing"
              type="button"
              @click="cancelEdit"
              class="px-6 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors w-full md:w-auto"
            >
              Batal
            </button>
            <button
              type="submit"
              class="btn-primary w-full md:w-auto whitespace-nowrap flex items-center justify-center gap-2"
            >
              <span v-if="saving" class="animate-spin">⏳</span>
              <span>{{
                saving ? "Menyimpan..." : isEditing ? "Kemaskini" : "Tambah"
              }}</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Responsive List -->
      <div class="space-y-4">
        <!-- Mobile View (Cards) -->
        <div class="block md:hidden space-y-3">
          <div
            v-for="(member, index) in members"
            :key="member.id"
            class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between animate-fade-in-up"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-500 font-mono"
              >
                {{ index + 1 }}
              </div>
              <div>
                <h3
                  class="font-bold text-slate-800 dark:text-white text-lg leading-tight"
                >
                  {{ member.name }}
                </h3>
                <div class="text-xs text-slate-400 mt-0.5">Saiz:</div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <span
                class="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-black rounded-xl text-lg min-w-[3.5rem] text-center shadow-sm"
              >
                {{ member.size }}
              </span>
              <div class="flex flex-col gap-1">
                <button
                  @click="editMember(member)"
                  class="p-2 text-blue-400 hover:text-blue-600 bg-blue-50 dark:bg-blue-900/10 rounded-lg"
                >
                  ✏️
                </button>
                <button
                  @click="deleteMember(member.id)"
                  class="p-2 text-red-400 hover:text-red-600 bg-red-50 dark:bg-red-900/10 rounded-lg"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State Mobile -->
          <div
            v-if="members.length === 0"
            class="text-center py-10 px-4 bg-white/50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700"
          >
            <div class="text-4xl mb-3 opacity-50">📋</div>
            <p class="text-slate-500 italic">Senarai masih kosong.</p>
          </div>
        </div>

        <!-- Desktop View (Table) -->
        <div
          class="hidden md:block bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <table class="w-full text-left">
            <thead
              class="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider"
            >
              <tr>
                <th class="p-5 w-20 text-center font-bold">#</th>
                <th class="p-5 font-bold">Nama</th>
                <th class="p-5 w-40 text-center font-bold">Saiz</th>
                <th class="p-5 w-32 text-center font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
              <tr
                v-for="(member, index) in members"
                :key="member.id"
                class="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <td
                  class="p-5 text-center font-mono text-slate-400 font-bold group-hover:text-blue-500 transition-colors"
                >
                  {{ index + 1 }}
                </td>
                <td
                  class="p-5 font-bold text-slate-800 dark:text-white text-lg"
                >
                  {{ member.name }}
                </td>
                <td class="p-5 text-center">
                  <span
                    class="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold rounded-lg text-lg min-w-[3rem]"
                  >
                    {{ member.size }}
                  </span>
                </td>
                <td class="p-5 text-center">
                  <div
                    class="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      @click="editMember(member)"
                      class="text-slate-400 hover:text-blue-500 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all transform hover:scale-110"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      @click="deleteMember(member.id)"
                      class="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all transform hover:scale-110"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="members.length === 0">
                <td colspan="4" class="p-16 text-center text-slate-400 italic">
                  <div class="text-5xl mb-4 opacity-20">📝</div>
                  Belum ada nama. Mula masukkan nama di atas!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer Note -->
      <div
        v-if="members.length > 0"
        class="mt-8 text-center text-slate-400 text-sm"
      >
        💡 Tip: Pastikan saiz telah disahkan.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const members = ref([]);
const saving = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const copied = ref(false);

const sizeSummary = computed(() => {
  const summary = {};
  members.value.forEach((m) => {
    const s = m.size.toUpperCase();
    summary[s] = (summary[s] || 0) + 1;
  });
  return summary;
});

const formattedText = computed(() => {
  if (members.value.length === 0) return "";
  let text = "*SENARAI*\n\n";
  members.value.forEach((member, index) => {
    text += `${index + 1}. ${member.name} - ${member.size}\n`;
  });

  text += "\n*RUMUSAN:*\n";
  Object.keys(sizeSummary.value)
    .sort()
    .forEach((size) => {
      text += `${size}: ${sizeSummary.value[size]}\n`;
    });

  text += `\n*Jumlah Besar: ${members.value.length} unit*`;
  return text;
});

const copyList = async () => {
  if (!formattedText.value) return;

  try {
    await navigator.clipboard.writeText(formattedText.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy list: ", err);
    alert("Gagal menyalin senarai");
  }
};

const form = ref({
  name: "",
  size: "",
});

const fetchMembers = async () => {
  try {
    const q = query(collection(db, "office_baju"), orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    members.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching office members: ", error);
  }
};

const saveMember = async () => {
  if (!form.value.name || !form.value.size) return;
  saving.value = true;

  try {
    if (isEditing.value && editingId.value) {
      // Update Mode
      const memberRef = doc(db, "office_baju", editingId.value);
      await updateDoc(memberRef, {
        name: form.value.name,
        size: form.value.size,
      });

      // Local Update
      const index = members.value.findIndex((m) => m.id === editingId.value);
      if (index !== -1) {
        members.value[index].name = form.value.name;
        members.value[index].size = form.value.size;
      }

      cancelEdit(); // Reset form
    } else {
      // Create Mode
      const memberData = {
        name: form.value.name,
        size: form.value.size,
        createdAt: new Date(),
      };

      // Optimistic Add
      const tempId = Date.now().toString();
      members.value.push({ id: tempId, ...memberData });

      const docRef = await addDoc(collection(db, "office_baju"), memberData);

      // Update ID
      const index = members.value.findIndex((m) => m.id === tempId);
      if (index !== -1) members.value[index].id = docRef.id;

      form.value = { name: "", size: "" };
    }
  } catch (error) {
    console.error("Error saving member: ", error);
    alert("Gagal menyimpan.");
    if (!isEditing.value) fetchMembers(); // Only refetch on create error to clean up optimistic UI
  } finally {
    saving.value = false;
  }
};

const editMember = (member) => {
  form.value = { name: member.name, size: member.size };
  isEditing.value = true;
  editingId.value = member.id;
  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const cancelEdit = () => {
  form.value = { name: "", size: "" };
  isEditing.value = false;
  editingId.value = null;
};

onMounted(() => {
  fetchMembers();
});
</script>

<style scoped>
.form-input {
  @apply w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white shadow-sm text-lg;
}
.btn-primary {
  @apply px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 active:scale-95;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
</style>
