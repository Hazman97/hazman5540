<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
    <!-- Header -->
    <header class="bg-teal-600 text-white p-6 shadow-md sticky top-0 z-10">
      <div class="flex justify-between items-center max-w-4xl mx-auto">
        <h1 class="text-xl font-bold tracking-tight">Finance Tracker</h1>
        <div class="text-sm opacity-80">3-Bucket System</div>
      </div>
    </header>

    <main class="p-4 max-w-4xl mx-auto space-y-6 mt-4">
      
      <!-- Bucket 1: Grab Side Hustle -->
      <section class="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-green-100 text-green-600 rounded-lg">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 class="text-lg font-bold text-slate-800 dark:text-white">Bucket 1: Grab Side Hustle</h2>
        </div>
        
        <GrabCalculator @refresh="fetchSummary" />
      </section>

      <!-- Bucket 2: Personal Ledger -->
      <section class="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <h2 class="text-lg font-bold text-slate-800 dark:text-white">Bucket 2: Personal Ledger</h2>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl">
            <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Income</div>
            <div class="text-xl font-bold text-slate-800 dark:text-white">RM {{ formatNum(getBucketTotal('Personal', 'income')) }}</div>
          </div>
          <div class="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl">
            <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Expenses</div>
            <div class="text-xl font-bold text-rose-500">RM {{ formatNum(getBucketTotal('Personal', 'expense')) }}</div>
          </div>
        </div>
      </section>

      <!-- Bucket 3: Shared & Goals -->
      <section class="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-rose-100 text-rose-600 rounded-lg">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <h2 class="text-lg font-bold text-slate-800 dark:text-white">Bucket 3: Shared & Goals</h2>
        </div>

        <GoalTracker v-if="weddingFund" :goal="weddingFund" />
        
        <div class="mt-4 bg-slate-50 dark:bg-slate-700 p-4 rounded-xl flex justify-between items-center">
          <div class="text-sm font-medium text-slate-600 dark:text-slate-300">Axia Maintenance Fund</div>
          <div class="font-bold text-slate-800 dark:text-white">RM {{ formatNum(maintenanceFund?.balance || 0) }}</div>
        </div>
      </section>

      <!-- Recent Transactions List -->
      <section class="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-4">Recent Transactions</h2>
        <div v-if="transactions.length === 0" class="text-center text-slate-500 py-4">No transactions yet</div>
        <div class="space-y-3">
          <div v-for="t in transactions" :key="t.id" class="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition">
            <div class="flex items-center gap-3">
              <div :class="t.transaction_type === 'income' ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'" class="p-2 rounded-full">
                <svg v-if="t.transaction_type === 'income'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
              </div>
              <div>
                <div class="font-medium text-sm text-slate-800 dark:text-white">{{ t.category_name }}</div>
                <div class="text-xs text-slate-500">{{ new Date(t.date).toLocaleDateString() }} • {{ t.bucket_type }}</div>
              </div>
            </div>
            <div :class="t.transaction_type === 'income' ? 'text-green-600' : 'text-slate-800 dark:text-white'" class="font-bold text-sm">
              {{ t.transaction_type === 'income' ? '+' : '-' }}RM {{ formatNum(t.amount) }}
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Floating Action Button -->
    <button @click="showForm = true" class="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition transform hover:scale-105 active:scale-95 z-20">
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
    </button>

    <!-- Transaction Modal -->
    <TransactionForm v-if="showForm" :categories="categories" @close="showForm = false" @success="handleSuccess" />

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { api } from '@/api/client';
import GrabCalculator from './components/GrabCalculator.vue';
import TransactionForm from './components/TransactionForm.vue';
import GoalTracker from './components/GoalTracker.vue';

const showForm = ref(false);
const summary = ref({ buckets: [], wallets: [] });
const transactions = ref([]);
const categories = ref([]);

const weddingFund = computed(() => summary.value.wallets.find(w => w.name.includes('Wedding')));
const maintenanceFund = computed(() => summary.value.wallets.find(w => w.name.includes('Maintenance')));

const formatNum = (num) => Number(num).toFixed(2);

const getBucketTotal = (bucketType, transactionType) => {
  const row = summary.value.buckets.find(b => b.bucket_type === bucketType && b.transaction_type === transactionType);
  return row ? row.total : 0;
};

const fetchSummary = async () => {
  try {
    const res = await api.get('/finance/summary');
    if (res.success) summary.value = res;
    
    const txRes = await api.get('/finance/transactions');
    if (txRes.success) transactions.value = txRes.transactions;
    
    const catRes = await api.get('/finance/categories');
    if (catRes.success) categories.value = catRes.categories;
  } catch (error) {
    console.error("Failed to load finance data", error);
  }
};

const handleSuccess = () => {
  showForm.value = false;
  fetchSummary();
};

onMounted(() => {
  fetchSummary();
});
</script>
