<template>
  <div class="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl border border-slate-100 dark:border-slate-600">
    <div class="space-y-4">
      <div>
        <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Gross Fares</label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">RM</span>
          <input v-model.number="gross" type="number" class="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none" placeholder="0.00" />
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Fuel Expenses</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">RM</span>
            <input v-model.number="fuel" type="number" class="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none" placeholder="0.00" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Tolls Expenses</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">RM</span>
            <input v-model.number="tolls" type="number" class="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none" placeholder="0.00" />
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-200 dark:border-slate-600">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-slate-600 dark:text-slate-300 font-medium">True Daily Net Profit</span>
          <span class="text-lg font-bold text-teal-600 dark:text-accent">RM {{ formatNum(netProfit) }}</span>
        </div>
        <div class="flex justify-between items-center text-xs">
          <span class="text-slate-500 dark:text-slate-400">10% Maintenance Cut</span>
          <span class="font-medium text-rose-500">-RM {{ formatNum(maintenanceCut) }}</span>
        </div>
      </div>

      <button @click="submitGrab" :disabled="loading || gross <= 0" class="w-full mt-2 bg-slate-800 dark:bg-white text-white dark:text-slate-900 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-700 dark:hover:bg-slate-100 disabled:opacity-50 transition">
        {{ loading ? 'Saving...' : 'Log Daily Fares' }}
      </button>
      <div v-if="successMsg" class="text-center text-xs text-green-600 mt-2">{{ successMsg }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { api } from '@/api/client';

const emit = defineEmits(['refresh']);

const gross = ref(null);
const fuel = ref(null);
const tolls = ref(null);
const loading = ref(false);
const successMsg = ref('');

const netProfit = computed(() => {
  const g = gross.value || 0;
  const f = fuel.value || 0;
  const t = tolls.value || 0;
  return g - f - t;
});

const maintenanceCut = computed(() => {
  return netProfit.value > 0 ? netProfit.value * 0.10 : 0;
});

const formatNum = (num) => Number(num).toFixed(2);

const submitGrab = async () => {
  loading.value = true;
  successMsg.value = '';
  try {
    const res = await api.post('/finance/grab-daily', {
      gross: gross.value || 0,
      fuel: fuel.value || 0,
      tolls: tolls.value || 0,
      date: new Date().toISOString()
    });
    
    if (res.success) {
      successMsg.value = 'Logged successfully!';
      gross.value = null;
      fuel.value = null;
      tolls.value = null;
      emit('refresh');
      setTimeout(() => successMsg.value = '', 3000);
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
