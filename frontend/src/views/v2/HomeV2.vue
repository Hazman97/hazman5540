<template>
  <div class="relative min-h-screen bg-[#FAF7F2] dark:bg-[#0F0F0F] text-[#2A2421] dark:text-[#F5F0E8] font-sans selection:bg-[#B5502F] dark:selection:bg-[#E8C976] selection:text-white dark:selection:text-[#0F0F0F] transition-colors duration-500">
    <!-- Spotlight Mouse Glow Effect -->
    <SpotlightGlow />

    <!-- Starfield / Particles Background -->
    <StarField />

    <!-- Navbar with Sliding Pill Indicator, Version Dropdown & Dark/Light Toggle -->
    <Navbar />

    <!-- Main Content Sections -->
    <main class="relative z-10">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <HardwareWorkbenchSection />
      <ProjectCarousel />
      <WritingSection />
      <ContactSection />
    </main>

    <!-- Footer -->
    <footer class="relative z-10 py-10 border-t border-[#E6E0D4] dark:border-[#2A2A2A] text-center font-sans">
      <div class="max-w-4xl mx-auto px-4">
        <p class="text-xs sm:text-sm font-serif text-[#2A2421]/80 dark:text-[#F5F0E8]/80">
          Designed & Built with warm care by <span class="text-[#B5502F] dark:text-[#E8C976] font-semibold">Hazman Adanan</span>
        </p>
        <p class="text-[11px] font-mono text-[#6E655F] dark:text-[#8A8A8A] mt-2">
          © {{ currentYear }} All rights reserved. (Portfolio v2)
        </p>

        <!-- Visitor Counter -->
        <div class="mt-4 flex items-center justify-center gap-2">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] text-xs font-mono text-[#B5502F] dark:text-[#E8C976] shadow-sm">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{{ visitorCount !== null ? visitorCount.toLocaleString() : '...' }} visitors</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Back to Top Button -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 p-3.5 bg-white/90 dark:bg-[#1A1A1A]/90 hover:bg-[#FAF7F2] dark:hover:bg-[#242424] text-[#B5502F] dark:text-[#E8C976] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 cursor-pointer focus-ring print:hidden"
        aria-label="Back to top"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import SpotlightGlow from '@/components/v2/SpotlightGlow.vue';
import StarField from '@/components/v2/StarField.vue';
import Navbar from '@/components/v2/Navbar.vue';
import HeroSection from '@/components/v2/HeroSection.vue';
import AboutSection from '@/components/v2/AboutSection.vue';
import ExperienceSection from '@/components/v2/ExperienceSection.vue';
import HardwareWorkbenchSection from '@/components/v2/HardwareWorkbenchSection.vue';
import ProjectCarousel from '@/components/v2/ProjectCarousel.vue';
import WritingSection from '@/components/v2/WritingSection.vue';
import ContactSection from '@/components/v2/ContactSection.vue';
import { api } from '@/api/client';

const currentYear = new Date().getFullYear();
const showBackToTop = ref(false);
const visitorCount = ref<number | null>(null);

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 400;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const trackVisitor = async () => {
  try {
    const data = (await api.post('/portfolio/visitor', {})) as { success?: boolean; count?: number };
    if (data && data.success && data.count) {
      visitorCount.value = data.count;
      localStorage.setItem('hazman5540_visitor_count', data.count.toString());
    }
  } catch (error) {
    console.error('❌ Error tracking visitor:', error);
    visitorCount.value = parseInt(localStorage.getItem('hazman5540_visitor_count') || '1', 10);
  }
};

const setupMeta = () => {
  document.title = 'Hazman Adanan — Full-Stack & IoT Systems Engineer';

  const metaTags = [
    { name: 'description', content: 'Specializing in edge computing, IoT telemetry, and high-performance full-stack web applications. Delivering robust end-to-end engineering solutions.' },
    { property: 'og:title', content: 'Hazman Adanan — Full-Stack & IoT Systems Engineer' },
    { property: 'og:description', content: 'Specializing in edge computing, IoT telemetry, and high-performance full-stack web applications.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://hazman.dev/v2' },
    { property: 'og:image', content: 'https://hazman.dev/img/mindgps_tracker.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Hazman Adanan — Full-Stack & IoT Systems Engineer' },
    { name: 'twitter:description', content: 'Specializing in edge computing, IoT telemetry, and high-performance full-stack web applications.' },
  ];

  metaTags.forEach((tag) => {
    let el = tag.name
      ? document.querySelector(`meta[name="${tag.name}"]`)
      : document.querySelector(`meta[property="${tag.property}"]`);
    if (!el) {
      el = document.createElement('meta');
      if (tag.name) el.setAttribute('name', tag.name);
      if (tag.property) el.setAttribute('property', tag.property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', tag.content);
  });
};

onMounted(() => {
  setupMeta();
  window.addEventListener('scroll', handleScroll);
  trackVisitor();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
