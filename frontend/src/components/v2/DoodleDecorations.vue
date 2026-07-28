<template>
  <!-- Asymmetric Organic Doodle & IoT/Circuit Line-Art Decorations -->
  <div class="pointer-events-none select-none text-[#B5502F] opacity-75 print:hidden">
    <!-- Moon & Stars Doodle -->
    <svg 
      v-if="type === 'moon-sparkle'"
      class="w-12 h-12 md:w-16 md:h-16 transform -rotate-12"
      viewBox="0 0 64 64" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="1.8" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M40 12C32 14 26 22 28 32C30 42 38 48 48 46C38 52 24 50 16 38C8 26 12 14 24 10C28 8 34 9 40 12Z" />
      <path d="M52 14L54 18L58 20L54 22L52 26L50 22L46 20L50 18Z" />
      <path d="M14 18L15 20L17 21L15 22L14 24L13 22L11 21L13 20Z" />
    </svg>

    <!-- Microchip / MCU MCU-ESP32 Doodle -->
    <svg 
      v-else-if="type === 'chip-doodle'"
      class="w-12 h-12 md:w-16 md:h-16 transform rotate-6"
      viewBox="0 0 64 64" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="1.8" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <!-- Main Chip Body -->
      <rect x="18" y="18" width="28" height="28" rx="4" />
      <!-- Inner Core -->
      <rect x="25" y="25" width="14" height="14" rx="2" stroke-dasharray="2 2" />
      <!-- Pins Top & Bottom -->
      <path d="M24 10V18 M32 10V18 M40 10V18 M24 46V54 M32 46V54 M40 46V54" />
      <!-- Pins Left & Right -->
      <path d="M10 24H18 M10 32H18 M10 40H18 M46 24H54 M46 32H54 M46 40H54" />
    </svg>

    <!-- Wireless Antenna / RF Signal Wave Doodle -->
    <svg 
      v-else-if="type === 'antenna-wave'"
      class="w-12 h-12 md:w-14 md:h-14 transform -rotate-12"
      viewBox="0 0 64 64" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="1.8" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <!-- Antenna Mast -->
      <path d="M32 54V24 M22 54L32 24L42 54" />
      <circle cx="32" cy="20" r="4" fill="currentColor" />
      <!-- Signal Waves -->
      <path d="M22 14C28 10 36 10 42 14" />
      <path d="M16 8C26 2 38 2 48 8" />
    </svg>

    <!-- Circuit Trace & Node Doodle -->
    <svg 
      v-else-if="type === 'circuit-node'"
      class="w-14 h-14 md:w-16 md:h-16 transform rotate-45"
      viewBox="0 0 64 64" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="1.8" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M12 12H28L38 22H52" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="52" cy="22" r="3" fill="currentColor" />
      <path d="M12 52H24L36 40H52" />
      <circle cx="12" cy="52" r="3" fill="currentColor" />
      <circle cx="52" cy="40" r="3" fill="currentColor" />
    </svg>

    <!-- Steaming Coffee Cup Doodle -->
    <svg 
      v-else-if="type === 'coffee-doodle'"
      class="w-10 h-10 md:w-14 md:h-14 transform rotate-6"
      viewBox="0 0 64 64" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="1.8" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M16 26H44V42C44 48 38 52 30 52C22 52 16 48 16 42V26Z" />
      <path d="M44 30H50C53 30 55 33 55 36C55 39 53 42 50 42H44" />
      <path d="M12 54H48" />
      <path d="M22 14C24 18 20 20 22 24" />
      <path d="M30 10C32 15 28 17 30 22" />
      <path d="M38 14C40 18 36 20 38 24" />
    </svg>

    <!-- Hand-drawn Code Braces / Sparkle Doodle -->
    <svg 
      v-else-if="type === 'code-sparkle'"
      class="w-12 h-12 md:w-14 md:h-14 transform rotate-12"
      viewBox="0 0 64 64" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="1.8" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M20 14C14 14 16 22 16 26C16 30 10 32 10 32C10 32 16 34 16 38C16 42 14 50 20 50" />
      <path d="M44 14C50 14 48 22 48 26C48 30 54 32 54 32C54 32 48 34 48 38C48 42 50 50 44 50" />
      <circle cx="32" cy="32" r="2.5" fill="currentColor" />
    </svg>

    <!-- Botanical Sprout Doodle -->
    <svg 
      v-else-if="type === 'sprout-doodle'"
      class="w-10 h-10 md:w-14 md:h-14 transform -rotate-6"
      viewBox="0 0 64 64" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="1.8" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M32 54C32 38 32 26 32 16" />
      <path d="M32 36C24 34 16 24 20 16C28 16 32 26 32 36Z" />
      <path d="M32 28C40 26 48 16 44 8C36 8 32 18 32 28Z" />
    </svg>

    <!-- Spiral / Swirl Loop Doodle -->
    <svg 
      v-else-if="type === 'swirl-loop'"
      class="w-10 h-10 md:w-12 md:h-12 transform rotate-45"
      viewBox="0 0 64 64" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="1.8" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M12 40C16 50 32 54 44 46C56 36 54 18 40 12C26 8 14 20 18 32C22 44 38 42 42 34C46 26 36 22 30 26" />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: 'moon-sparkle' | 'coffee-doodle' | 'code-sparkle' | 'sprout-doodle' | 'swirl-loop' | 'chip-doodle' | 'antenna-wave' | 'circuit-node';
}>();
</script>
