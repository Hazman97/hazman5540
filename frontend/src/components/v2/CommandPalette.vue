<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md"
      @click.self="close"
    >
      <div class="relative w-full max-w-xl bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden font-sans flex flex-col">
        <!-- Search Input Bar -->
        <div class="flex items-center px-4 py-3 border-b border-[#E6E0D4] dark:border-[#2A2A2A] bg-[#FAF7F2] dark:bg-[#141414]">
          <svg class="w-5 h-5 text-[#B5502F] dark:text-[#E8C976] mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref="inputRef"
            v-model="searchQuery"
            type="text"
            placeholder="Type a command or search portfolio (e.g. resume, projects, theme, v1)..."
            class="w-full bg-transparent text-sm text-[#2A2421] dark:text-[#F5F0E8] placeholder-[#524A45] dark:placeholder-[#9E9E9E] focus:outline-none font-sans"
            @keydown.down.prevent="navigateDown"
            @keydown.up.prevent="navigateUp"
            @keydown.enter.prevent="selectCurrent"
          />
          <kbd class="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-[#F0EBE1] dark:bg-[#242424] text-[#524A45] dark:text-[#9E9E9E] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">
            ESC
          </kbd>
        </div>

        <!-- Commands List -->
        <div class="max-h-80 overflow-y-auto p-2 space-y-1">
          <div 
            v-if="filteredCommands.length === 0" 
            class="p-4 text-center text-xs font-mono text-[#524A45] dark:text-[#9E9E9E]"
          >
            No matching commands found for "{{ searchQuery }}"
          </div>

          <div
            v-for="(cmd, index) in filteredCommands"
            :key="cmd.id"
            @click="executeCommand(cmd)"
            @mouseenter="selectedIndex = index"
            class="flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors text-xs font-sans"
            :class="selectedIndex === index
              ? 'bg-[#B5502F]/10 dark:bg-[#E8C976]/15 text-[#B5502F] dark:text-[#E8C976] font-medium'
              : 'text-[#2A2421] dark:text-[#F5F0E8] hover:bg-[#FAF7F2] dark:hover:bg-[#242424]'"
          >
            <div class="flex items-center gap-3">
              <span class="w-7 h-7 rounded-lg bg-[#F0EBE1] dark:bg-[#242424] text-[#B5502F] dark:text-[#E8C976] flex items-center justify-center shrink-0" v-html="cmd.iconSvg"></span>
              <div>
                <div class="font-semibold">{{ cmd.title }}</div>
                <div class="text-[10px] text-[#524A45] dark:text-[#9E9E9E] font-normal">{{ cmd.description }}</div>
              </div>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0EBE1] dark:bg-[#242424] text-[#524A45] dark:text-[#9E9E9E]">
              {{ cmd.badge }}
            </span>
          </div>
        </div>

        <!-- Palette Footer Navigation Hint -->
        <div class="px-4 py-2 bg-[#F5F0E8] dark:bg-[#141414] border-t border-[#E6E0D4] dark:border-[#2A2A2A] flex items-center justify-between text-[10px] font-mono text-[#524A45] dark:text-[#9E9E9E]">
          <div class="flex items-center gap-3">
            <span><kbd class="px-1 bg-white dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">↑↓</kbd> navigate</span>
            <span><kbd class="px-1 bg-white dark:bg-[#242424] rounded border border-[#E6E0D4] dark:border-[#2D2D2D]">↵</kbd> select</span>
          </div>
          <span>Developer Command Palette</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from '@/composables/useTheme';

interface CommandItem {
  id: string;
  iconSvg: string;
  title: string;
  description: string;
  badge: string;
  action: () => void;
}

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const router = useRouter();
const { isDark, toggleTheme } = useTheme();

const searchQuery = ref('');
const selectedIndex = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const close = () => {
  isOpen.value = false;
  searchQuery.value = '';
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const commands = computed<CommandItem[]>(() => [
  {
    id: 'resume',
    iconSvg: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`,
    title: 'Download Resume PDF',
    description: 'Get Hazman\'s latest official curriculum vitae',
    badge: 'Download',
    action: () => {
      const link = document.createElement('a');
      link.href = "/Hazman's-resume-july-2026.pdf";
      link.download = "Hazman's-resume-july-2026.pdf";
      link.click();
    },
  },
  {
    id: 'projects',
    iconSvg: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>`,
    title: 'Browse All 18 Projects',
    description: 'Jump to filterable project carousel & lightbox preview',
    badge: '#works',
    action: () => scrollToSection('works'),
  },
  {
    id: 'hardware',
    iconSvg: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>`,
    title: 'View Hardware Workbench',
    description: 'ESP32 targets, Teltonika FMC920, and Rajant mesh gear',
    badge: '#hardware',
    action: () => scrollToSection('hardware'),
  },
  {
    id: 'about',
    iconSvg: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`,
    title: 'About Hazman & Education',
    description: 'Universiti Malaysia Terengganu & Politeknik background',
    badge: '#about',
    action: () => scrollToSection('about'),
  },
  {
    id: 'experience',
    iconSvg: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
    title: 'Work Experience & History',
    description: 'Mindnrobotics & PKT Logistics Group career milestones',
    badge: '#experience',
    action: () => scrollToSection('experience'),
  },
  {
    id: 'theme',
    iconSvg: isDark.value
      ? `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`
      : `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>`,
    title: `Switch to ${isDark.value ? 'Light' : 'Dark'} Mode`,
    description: 'Toggle dual parchment / nocturnal color theme',
    badge: 'Theme',
    action: () => toggleTheme(),
  },
  {
    id: 'v1',
    iconSvg: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>`,
    title: 'Switch to Classic v1 Portfolio',
    description: 'View preserved legacy v1 portfolio snapshot',
    badge: '/v1',
    action: () => router.push('/v1'),
  },
  {
    id: 'contact',
    iconSvg: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
    title: 'Send Contact Message',
    description: 'Jump directly to contact form and email details',
    badge: '#contact',
    action: () => scrollToSection('contact'),
  },
]);

const filteredCommands = computed(() => {
  if (!searchQuery.value.trim()) return commands;
  const q = searchQuery.value.toLowerCase();
  return commands.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.badge.toLowerCase().includes(q)
  );
});

const navigateDown = () => {
  if (selectedIndex.value < filteredCommands.value.length - 1) {
    selectedIndex.value++;
  }
};

const navigateUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--;
  }
};

const selectCurrent = () => {
  if (filteredCommands.value[selectedIndex.value]) {
    executeCommand(filteredCommands.value[selectedIndex.value]);
  }
};

const executeCommand = (cmd: CommandItem) => {
  close();
  // Defer execution so modal overlay unmounts before smooth scroll begins
  setTimeout(() => {
    cmd.action();
  }, 100);
};

const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    isOpen.value = !isOpen.value;
  } else if (e.key === 'Escape' && isOpen.value) {
    close();
  }
};

watch(isOpen, (newVal) => {
  if (newVal) {
    selectedIndex.value = 0;
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
});

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
