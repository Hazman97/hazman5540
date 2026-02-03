<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-900 pt-28 pb-12 px-4 sm:px-6"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10 reveal">
        <span
          class="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold tracking-wider mb-4"
          >PEJABAT DUN</span
        >
        <h1
          class="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 font-serif"
        >
          Senarai Baju Pejabat
        </h1>
        <p class="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Senarai ringkas untuk memudahkan kiraan jumlah tempahan baju pejabat.
        </p>
      </div>

      <!-- Stats Card -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 mb-8 flex items-center justify-between"
      >
        <div>
          <h3
            class="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-wider mb-1"
          >
            Jumlah Tempahan
          </h3>
          <div class="text-4xl font-black text-slate-800 dark:text-white">
            {{ members.length }}
            <span class="text-lg text-slate-400 font-medium">unit</span>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button
            v-if="members.length === 0"
            @click="importData"
            class="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-bold hover:bg-green-200 transition-colors flex items-center gap-2"
          >
            <span>📥</span> Import Data WhatsApp
          </button>
          <div
            class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-3xl"
          >
            👔
          </div>
        </div>
      </div>

      <!-- Add Form -->
      <div
        class="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-700 mb-12 relative overflow-hidden"
      >
        <div
          class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500"
        ></div>
        <h2
          class="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2"
        >
          <span>➕</span> Tambah Nama
        </h2>

        <form
          @submit.prevent="saveMember"
          class="flex flex-col md:flex-row gap-4"
        >
          <div class="flex-1">
            <input
              v-model="form.name"
              type="text"
              placeholder="Nama Penuh"
              class="form-input"
              required
            />
          </div>
          <div class="w-full md:w-32">
            <input
              v-model="form.size"
              type="text"
              placeholder="Saiz"
              class="form-input font-bold text-center"
              required
            />
          </div>
          <button type="submit" class="btn-primary whitespace-nowrap">
            {{ saving ? "Menyimpan..." : "Tambah" }}
          </button>
        </form>
      </div>

      <!-- List -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        <table class="w-full text-left">
          <thead
            class="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider"
          >
            <tr>
              <th class="p-4 w-16 text-center">No.</th>
              <th class="p-4">Nama</th>
              <th class="p-4 w-32 text-center">Saiz</th>
              <th class="p-4 w-20 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr
              v-for="(member, index) in members"
              :key="member.id"
              class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <td class="p-4 text-center font-mono text-slate-400 font-bold">
                {{ index + 1 }}
              </td>
              <td class="p-4 font-bold text-slate-800 dark:text-white text-lg">
                {{ member.name }}
              </td>
              <td class="p-4 text-center">
                <span
                  class="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold rounded-lg"
                >
                  {{ member.size }}
                </span>
              </td>
              <td class="p-4 text-center">
                <button
                  @click="deleteMember(member.id)"
                  class="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  🗑️
                </button>
              </td>
            </tr>
            <tr v-if="members.length === 0">
              <td colspan="4" class="p-12 text-center text-slate-400 italic">
                Belum ada nama. Mula masukkan nama di atas! 👆
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const members = ref([]);
const saving = ref(false);
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
    const memberData = {
      name: form.value.name,
      size: form.value.size,
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "office_baju"), memberData);
    members.value.push({ id: docRef.id, ...memberData });
    form.value = { name: "", size: "" };
  } catch (error) {
    console.error("Error adding member: ", error);
    alert("Gagal menambah.");
  } finally {
    saving.value = false;
  }
};

const deleteMember = async (id) => {
  if (!confirm("Padam nama ini?")) return;
  try {
    await deleteDoc(doc(db, "office_baju", id));
    members.value = members.value.filter((m) => m.id !== id);
  } catch (error) {
    console.error("Delete error: ", error);
  }
};

const whatsappData = [
  { name: "P Nik", size: "XL" },
  { name: "Cg Zahari", size: "XL" },
  { name: "Budiman", size: "XL" },
  { name: "Hanif", size: "L" },
  { name: "Hadi", size: "L" },
  { name: "P Din Besar", size: "5XL" },
  { name: "P Din Kecik", size: "M" },
  { name: "P Din Besar", size: "5XL" }, // Kept original duplicate as per req usually
  { name: "Rikzi", size: "L" },
  { name: "P Wi", size: "3XL" },
  { name: "P Su", size: "XL" },
  { name: "Ust Yan", size: "3XL" },
];

const importData = async () => {
  if (!confirm(`Import ${whatsappData.length} nama dari WhatsApp?`)) return;
  saving.value = true;
  try {
    for (const data of whatsappData) {
      await addDoc(collection(db, "office_baju"), {
        ...data,
        createdAt: new Date(),
      });
    }
    await fetchMembers();
    alert("Import berjaya! ✅");
  } catch (e) {
    console.error(e);
    alert("Error importing.");
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  fetchMembers();
});
</script>

<style scoped>
.form-input {
  @apply w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white shadow-sm;
}
.btn-primary {
  @apply px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300;
}
</style>
