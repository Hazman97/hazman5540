<template>
  <div 
    class="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 print:hidden"
    :style="{
      background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`
    }"
  ></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const mousePos = ref({ x: -1000, y: -1000 });

const glowColor = computed(() => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  return isDarkMode 
    ? 'rgba(232, 201, 118, 0.07)'  /* Gold glow in dark mode */
    : 'rgba(181, 80, 47, 0.08)';  /* Terracotta glow in light mode */
});

const handleMouseMove = (e: MouseEvent) => {
  mousePos.value = { x: e.clientX, y: e.clientY };
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>
