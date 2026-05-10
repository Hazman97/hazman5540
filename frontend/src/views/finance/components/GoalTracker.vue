<template>
  <div class="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl border border-slate-100 dark:border-slate-600">
    <div class="flex justify-between items-end mb-2">
      <div>
        <h3 class="font-bold text-slate-800 dark:text-white">{{ goal.name }}</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400">Target: RM {{ formatNum(goal.target_amount) }}</p>
      </div>
      <div class="text-right">
        <span class="text-lg font-bold text-teal-600 dark:text-accent">RM {{ formatNum(goal.balance) }}</span>
      </div>
    </div>
    
    <!-- Progress Bar -->
    <div class="relative w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
      <div 
        class="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-1000"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
    <div class="mt-1 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
      {{ progress.toFixed(1) }}% Funded
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  goal: {
    type: Object,
    required: true
  }
});

const progress = computed(() => {
  if (!props.goal || !props.goal.target_amount) return 0;
  return Math.min(100, (props.goal.balance / props.goal.target_amount) * 100);
});

const formatNum = (num) => Number(num || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
</script>
