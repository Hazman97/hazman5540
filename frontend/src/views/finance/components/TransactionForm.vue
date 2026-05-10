<template>
  <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0">
    <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="$emit('close')"></div>
    
    <div class="relative bg-white dark:bg-slate-800 w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 transform transition-all">
      <div class="flex justify-between items-center mb-5">
        <h3 class="text-xl font-bold text-slate-800 dark:text-white">Log Transaction</h3>
        <button @click="$emit('close')" class="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <form @submit.prevent="submitTx" class="space-y-4">
        
        <!-- Type Selection -->
        <div class="flex p-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <button type="button" @click="form.type = 'expense'" :class="form.type === 'expense' ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-800 dark:text-white' : 'text-slate-500'" class="flex-1 py-1.5 text-sm font-medium rounded-md transition">Expense</button>
          <button type="button" @click="form.type = 'income'" :class="form.type === 'income' ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-800 dark:text-white' : 'text-slate-500'" class="flex-1 py-1.5 text-sm font-medium rounded-md transition">Income</button>
        </div>

        <!-- Amount -->
        <div>
          <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Amount</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 font-bold" :class="form.type === 'income' ? 'text-green-500' : 'text-rose-500'">RM</span>
            <input v-model.number="form.amount" type="number" required step="0.01" class="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl text-2xl font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none" placeholder="0.00" />
          </div>
        </div>

        <!-- Bucket Type (Filter) -->
        <div>
          <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Ledger (Bucket)</label>
          <select v-model="selectedBucket" class="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white outline-none">
            <option value="Personal">Personal</option>
            <option value="Shared">Shared & Goals</option>
            <option value="Grab">Grab</option>
          </select>
        </div>

        <!-- Category -->
        <div>
          <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Category</label>
          <select v-model="form.category_id" required class="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white outline-none">
            <option value="" disabled>Select Category...</option>
            <option v-for="cat in filteredCategories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Notes (Optional)</label>
          <input v-model="form.notes" type="text" class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white outline-none" placeholder="What was this for?" />
        </div>

        <button type="submit" :disabled="loading" class="w-full mt-6 bg-teal-600 text-white py-3 rounded-xl text-sm font-bold shadow-md hover:bg-teal-700 disabled:opacity-50 transition">
          {{ loading ? 'Saving...' : 'Save Transaction' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { api } from '@/api/client';

const props = defineProps({
  categories: Array
});

const emit = defineEmits(['close', 'success']);

const loading = ref(false);
const selectedBucket = ref('Personal');

const form = ref({
  type: 'expense',
  amount: null,
  category_id: '',
  notes: ''
});

const filteredCategories = computed(() => {
  return props.categories.filter(c => c.bucket_type === selectedBucket.value);
});

const submitTx = async () => {
  if (!form.value.amount || !form.value.category_id) return;
  
  loading.value = true;
  try {
    const res = await api.post('/finance/transactions', {
      amount: form.value.amount,
      transaction_type: form.value.type,
      category_id: form.value.category_id,
      date: new Date().toISOString(),
      notes: form.value.notes
    });
    
    if (res.success) {
      emit('success');
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
