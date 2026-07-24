<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <!-- Star / Particle Canvas -->
    <canvas ref="canvasRef" class="w-full h-full block opacity-70 dark:opacity-70"></canvas>
    
    <!-- Subtle Radial Vignette -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#050505_100%)] dark:bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#050505_100%)] bg-[radial-gradient(ellipse_at_center,_transparent_50%,_#EBE4D8_100%)] opacity-80 transition-colors duration-500"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
}

const stars: Star[] = [];

const initStars = (width: number, height: number) => {
  stars.length = 0;
  const count = Math.floor((width * height) / 8000);
  for (let i = 0; i < count; i++) {
    const baseAlpha = Math.random() * 0.7 + 0.2;
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      alpha: baseAlpha,
      baseAlpha,
      twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
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
    star.alpha += star.twinkleSpeed;
    if (star.alpha > 0.95 || star.alpha < 0.15) {
      star.twinkleSpeed = -star.twinkleSpeed;
    }

    ctx.fillStyle = `rgba(${particleColor}, ${star.alpha.toFixed(2)})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    if (star.size > 1.4 && star.alpha > 0.6) {
      const glowColor = isDarkMode ? '232, 201, 118' : '163, 72, 40';
      ctx.fillStyle = `rgba(${glowColor}, ${(star.alpha * 0.4).toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  animationFrameId = requestAnimationFrame(render);
};

const handleResize = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars(canvas.width, canvas.height);
};

onMounted(() => {
  handleResize();
  render();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', handleResize);
});
</script>
