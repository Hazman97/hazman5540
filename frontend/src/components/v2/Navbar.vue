<template>
  <header class="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
    <nav 
      class="pointer-events-auto relative flex items-center justify-between gap-2 sm:gap-4 bg-[#1A1A1A]/90 dark:bg-[#1A1A1A]/90 bg-white/90 backdrop-blur-md border border-[#2A2A2A] dark:border-[#2A2A2A] border-[#E6E0D4] rounded-full px-3.5 sm:px-4 py-2 shadow-2xl transition-colors duration-300 max-w-3xl w-full"
    >
      <!-- Avatar + Name -->
      <div 
        class="flex items-center gap-2 shrink-0 cursor-pointer group" 
        @click="selectTab('story')"
      >
        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E8C976] via-[#B5502F] to-[#E8C976] p-[1.5px] shadow-sm">
          <img 
            src="/logo.png" 
            alt="Hazman Avatar" 
            class="w-full h-full object-cover rounded-full bg-[#0F0F0F]"
            @error="(e) => (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Hazman&background=1A1A1A&color=E8C976'"
          />
        </div>
        <span class="hidden sm:inline font-serif font-semibold text-[#E8C976] dark:text-[#E8C976] text-[#B5502F] text-sm tracking-wider group-hover:opacity-80 transition-opacity">
          hazman
        </span>
      </div>

      <!-- Nav Links with Sliding Active Pill Background -->
      <div class="relative flex items-center gap-0.5 sm:gap-1 bg-[#0F0F0F]/60 dark:bg-[#0F0F0F]/60 bg-[#F0EBE1] p-1 rounded-full border border-[#2A2A2A]/50 dark:border-[#2A2A2A]/50 border-[#E6E0D4]">
        <!-- Sliding Pill Background Indicator -->
        <div
          class="absolute top-1 bottom-1 bg-[#E8C976] dark:bg-[#E8C976] bg-[#B5502F] rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm pointer-events-none"
          :style="{
            transform: `translateX(${indicatorStyle.left}px)`,
            width: `${indicatorStyle.width}px`,
            opacity: indicatorStyle.opacity
          }"
        ></div>

        <!-- Links -->
        <button
          v-for="(item, index) in navItems"
          :key="item.id"
          :ref="(el) => setItemRef(el as HTMLElement, index)"
          @click="selectTab(item.id)"
          class="relative z-10 px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-sans font-medium tracking-wide lowercase transition-colors duration-200 focus-ring rounded-full"
          :class="activeTab === item.id 
            ? 'text-[#0F0F0F] dark:text-[#0F0F0F] text-white font-semibold' 
            : 'text-[#F5F0E8]/70 dark:text-[#F5F0E8]/70 text-[#6E655F] hover:text-[#2A2421] dark:hover:text-[#F5F0E8]'"
        >
          {{ item.label }}
        </button>
      </div>

      <!-- Controls Right: Dark/Light Mode Toggle + Version Selector -->
      <div class="flex items-center gap-2 shrink-0">
        <!-- Light / Dark Mode Toggle Button -->
        <button
          @click="toggleTheme"
          class="p-1.5 rounded-full bg-[#242424] dark:bg-[#242424] bg-[#F0EBE1] text-[#E8C976] dark:text-[#E8C976] text-[#B5502F] border border-[#333333] dark:border-[#333333] border-[#E6E0D4] hover:scale-110 active:scale-95 transition-all cursor-pointer focus-ring"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          aria-label="Toggle Theme"
        >
          <span v-if="isDark" class="text-xs block">☀️</span>
          <span v-else class="text-xs block">🌙</span>
        </button>

        <!-- Version Selector Dropdown -->
        <div class="relative shrink-0" ref="dropdownRef">
          <button
            @click.stop="isDropdownOpen = !isDropdownOpen"
            class="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 text-xs font-mono bg-[#242424] dark:bg-[#242424] bg-[#F0EBE1] hover:bg-[#2D2D2D] dark:hover:bg-[#2D2D2D] text-[#E8C976] dark:text-[#E8C976] text-[#B5502F] border border-[#333333] dark:border-[#333333] border-[#E6E0D4] rounded-full transition-all cursor-pointer focus-ring"
            aria-label="Select Portfolio Version"
          >
            <span class="font-bold">{{ currentVersion }}</span>
            <svg
              class="w-3.5 h-3.5 transition-transform duration-200"
              :class="{ 'rotate-180': isDropdownOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="transform scale-95 opacity-0 -translate-y-1"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 -translate-y-1"
          >
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-[#1A1A1A] dark:bg-[#1A1A1A] bg-white border border-[#2A2A2A] dark:border-[#2A2A2A] border-[#E6E0D4] rounded-xl shadow-2xl py-1.5 z-50 text-xs font-sans backdrop-blur-lg"
            >
              <div class="px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-[#8A8A8A] dark:text-[#8A8A8A] text-[#6E655F]">
                Switch Version
              </div>

              <!-- v2 Item -->
              <button
                @click="switchVersion('v2')"
                class="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#262626] dark:hover:bg-[#262626] hover:bg-[#F5F0E8] transition-colors cursor-pointer"
                :class="currentVersion === 'v2' ? 'text-[#E8C976] dark:text-[#E8C976] text-[#B5502F] font-medium' : 'text-[#F5F0E8] dark:text-[#F5F0E8] text-[#2A2421]'"
              >
                <div class="flex items-center gap-2">
                  <span class="font-semibold">v2</span>
                  <span class="text-[10px] px-1.5 py-0.5 bg-[#E8C976]/15 text-[#E8C976] dark:text-[#E8C976] text-[#B5502F] rounded border border-[#E8C976]/30">Nocturnal</span>
                </div>
                <svg v-if="currentVersion === 'v2'" class="w-4 h-4 text-[#E8C976] dark:text-[#E8C976] text-[#B5502F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>

              <!-- v1 Item -->
              <button
                @click="switchVersion('v1')"
                class="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#262626] dark:hover:bg-[#262626] hover:bg-[#F5F0E8] transition-colors cursor-pointer"
                :class="currentVersion === 'v1' ? 'text-[#E8C976] dark:text-[#E8C976] text-[#B5502F] font-medium' : 'text-[#8A8A8A] dark:text-[#8A8A8A] text-[#6E655F]'"
              >
                <div class="flex items-center gap-2">
                  <span class="font-semibold">v1</span>
                  <span class="text-[10px] text-[#8A8A8A]">(Classic)</span>
                </div>
                <svg v-if="currentVersion === 'v1'" class="w-4 h-4 text-[#E8C976] dark:text-[#E8C976] text-[#B5502F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTheme } from '@/composables/useTheme.js';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'story', label: 'story' },
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'works', label: 'works' },
  { id: 'writing', label: 'writing' },
  { id: 'contact', label: 'contact' },
];

const route = useRoute();
const router = useRouter();
const { isDark, toggleTheme } = useTheme();

const activeTab = ref('story');
const itemRefs = ref<(HTMLElement | null)[]>([]);
const dropdownRef = ref<HTMLElement | null>(null);

const indicatorStyle = reactive({
  left: 0,
  width: 0,
  opacity: 0,
});

const isDropdownOpen = ref(false);
const currentVersion = ref(route.path.startsWith('/v1') ? 'v1' : 'v2');

const setItemRef = (el: HTMLElement | null, index: number) => {
  if (el) itemRefs.value[index] = el;
};

const updateIndicator = () => {
  nextTick(() => {
    const index = navItems.findIndex((item) => item.id === activeTab.value);
    if (index !== -1 && itemRefs.value[index]) {
      const el = itemRefs.value[index]!;
      indicatorStyle.left = el.offsetLeft;
      indicatorStyle.width = el.offsetWidth;
      indicatorStyle.opacity = 1;
    } else {
      indicatorStyle.opacity = 0;
    }
  });
};

const selectTab = (tabId: string) => {
  activeTab.value = tabId;
  updateIndicator();

  if (route.path.startsWith('/v1')) {
    router.push({ path: '/portfolio', hash: `#${tabId}` });
    return;
  }

  const section = document.getElementById(tabId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const switchVersion = (version: string) => {
  isDropdownOpen.value = false;
  currentVersion.value = version;
  if (version === 'v1') {
    router.push('/v1');
  } else {
    router.push('/portfolio');
  }
};

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isDropdownOpen.value = false;
  }
};

watch(
  () => route.path,
  (newPath) => {
    currentVersion.value = newPath.startsWith('/v1') ? 'v1' : 'v2';
    updateIndicator();
  },
  { immediate: true }
);

onMounted(() => {
  updateIndicator();
  window.addEventListener('resize', updateIndicator);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIndicator);
  document.removeEventListener('click', handleClickOutside);
});
</script>
