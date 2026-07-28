<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden print:hidden">
    <!-- Star / Particle Canvas -->
    <canvas ref="canvasRef" class="w-full h-full block opacity-50 dark:opacity-50"></canvas>
    
    <!-- Subtle Radial Vignette -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_#050505_100%)] dark:bg-[radial-gradient(ellipse_at_center,_transparent_50%,_#050505_100%)] bg-[radial-gradient(ellipse_at_center,_transparent_60%,_#EBE4D8_100%)] opacity-70 transition-colors duration-500"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number = 0;

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
}

const stars: Star[] = [];

const initStars = (width: number, height: number) => {
  stars.length = 0;
  const count = Math.floor((width * height) / 12000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.2, // Subtle calm static alpha
    });
  }
};

const render = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const isDarkMode = document.documentElement.classList.contains('dark');
  const particleColor = isDarkMode ? '245, 240, 232' : '181, 80, 47';

  for (const star of stars) {
    ctx.fillStyle = `rgba(${particleColor}, ${star.alpha.toFixed(2)})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
};

const handleResize = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars(canvas.width, canvas.height);
  render();
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', handleResize);
});
</script>
