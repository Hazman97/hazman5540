<template>
  <section id="works" class="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Asymmetric Organic Doodle & Circuit Decorations -->
    <DoodleDecorations type="chip-doodle" class="absolute -top-6 left-[6%]" />
    <DoodleDecorations type="antenna-wave" class="absolute bottom-10 right-[5%] hidden md:block" />

    <!-- Section Header -->
    <div class="text-center mb-10 relative z-10">
      <h2 class="text-3xl sm:text-5xl font-serif text-[#B5502F] dark:text-[#E8C976] tracking-wide mb-3">
        Featured Systems & Engineering Builds
      </h2>
      <p class="text-[#524A45] dark:text-[#9E9E9E] text-sm sm:text-base font-sans max-w-2xl mx-auto">
        Structured into Tier 1 Industrial IoT Systems, Tier 2 Full-Stack SaaS Apps, and Tier 3 Utilities.
      </p>
      <WavyDivider />
    </div>

    <!-- Tier Filter Tabs -->
    <div class="flex flex-wrap items-center justify-center gap-2 mb-8 relative z-10">
      <button 
        v-for="cat in categories"
        :key="cat.id"
        @click="activeCategory = cat.id"
        class="px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer focus-ring"
        :class="activeCategory === cat.id
          ? 'bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] font-semibold shadow-md'
          : 'bg-white dark:bg-[#1A1A1A] text-[#524A45] dark:text-[#9E9E9E] border border-[#E6E0D4] dark:border-[#2A2A2A] hover:text-[#2A2421] dark:hover:text-[#F5F0E8]'"
      >
        {{ cat.label }} ({{ getCategoryCount(cat.id) }})
      </button>
    </div>

    <!-- Carousel Controls (Desktop Edge Arrow Buttons) -->
    <div class="relative group">
      <button 
        @click="scrollLeft"
        class="hidden sm:flex absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] text-[#B5502F] dark:text-[#E8C976] hover:scale-110 active:scale-95 transition-all shadow-xl items-center justify-center cursor-pointer focus-ring"
        aria-label="Scroll Carousel Left"
      >
        <svg class="w-5 h-5 transform -rotate-90 fill-current" viewBox="0 0 24 24">
          <path d="M12 4l-8 8h16l-8-8z" />
        </svg>
      </button>

      <button 
        @click="scrollRight"
        class="hidden sm:flex absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] text-[#B5502F] dark:text-[#E8C976] hover:scale-110 active:scale-95 transition-all shadow-xl items-center justify-center cursor-pointer focus-ring"
        aria-label="Scroll Carousel Right"
      >
        <svg class="w-5 h-5 transform rotate-90 fill-current" viewBox="0 0 24 24">
          <path d="M12 4l-8 8h16l-8-8z" />
        </svg>
      </button>

      <!-- Horizontal Scrollable Cards Container -->
      <div 
        ref="scrollContainer"
        class="flex print:grid print:grid-cols-2 gap-6 print:gap-4 overflow-x-auto print:overflow-visible snap-x snap-mandatory scrollbar-none py-4 px-2 scroll-smooth"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        <!-- Project Card -->
        <div 
          v-for="project in filteredProjects"
          :key="project.title"
          class="snap-start shrink-0 print:shrink print:w-full w-[300px] sm:w-[360px] md:w-[380px] bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all duration-300 flex flex-col group/card cursor-pointer"
          @click="openModal(project)"
        >
          <!-- Browser Window Top Bar -->
          <div class="flex items-center justify-between px-3.5 py-2.5 bg-[#F5F0E8] dark:bg-[#141414] border-b border-[#E6E0D4] dark:border-[#2A2A2A]">
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-full bg-[#FF5F56] inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-[#27C93F] inline-block"></span>
            </div>
            <div class="text-[10px] font-mono text-[#524A45] dark:text-[#9E9E9E] truncate max-w-[170px]">
              {{ project.url }}
            </div>
            <div class="w-4"></div>
          </div>

          <!-- Preview Content Area -->
          <div class="relative h-44 sm:h-48 bg-[#FAF7F2] dark:bg-[#0F0F0F] overflow-hidden group/img">
            <img 
              :src="project.image" 
              :alt="project.title" 
              class="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
              @error="handleImgError"
            />

            <!-- Top Floating Tier Tag -->
            <div class="absolute top-3 left-3 z-10 flex gap-1">
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/90 dark:bg-[#1A1A1A]/90 text-[#B5502F] dark:text-[#E8C976] border border-[#E6E0D4] dark:border-[#2A2A2A] shadow-md backdrop-blur-md">
                {{ project.tierLabel }}
              </span>
            </div>

            <!-- Quick View Overlay Hint -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
              <span class="px-4 py-2 rounded-full bg-white/90 dark:bg-[#1A1A1A]/90 text-[#B5502F] dark:text-[#E8C976] font-mono text-xs font-semibold shadow-xl border border-[#E6E0D4] dark:border-[#2A2A2A] transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                View Architecture Topology
              </span>
            </div>

            <!-- Bottom Gradient Overlay -->
            <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white dark:from-[#1A1A1A] to-transparent z-10 opacity-90"></div>
          </div>

          <!-- Below Card Details -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-2 mb-2">
                <h3 class="font-serif font-semibold text-lg text-[#2A2421] dark:text-[#F5F0E8] group-hover/card:text-[#B5502F] dark:group-hover/card:text-[#E8C976] transition-colors">
                  {{ project.title }}
                </h3>
                <span class="text-[#B5502F] dark:text-[#E8C976] p-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
              </div>

              <p class="text-[#524A45] dark:text-[#9E9E9E] text-xs sm:text-sm font-sans line-clamp-2 mb-4 leading-relaxed">
                {{ project.description }}
              </p>
            </div>

          <!-- Tech Stack Tags -->
            <div class="flex flex-wrap gap-1.5 pt-3 border-t border-[#E6E0D4] dark:border-[#2A2A2A]">
              <span 
                v-for="t in project.tech"
                :key="t"
                class="px-2 py-0.5 text-[11px] font-mono bg-[#F0EBE1] dark:bg-[#242424] text-[#2A2421]/80 dark:text-[#F5F0E8]/80 rounded-md border border-[#E6E0D4] dark:border-[#2D2D2D]"
              >
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- View All Projects Toggle Control -->
    <div class="mt-8 text-center relative z-10">
      <button 
        @click="showAllProjects = !showAllProjects"
        class="px-6 py-2.5 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] text-[#B5502F] dark:text-[#E8C976] hover:bg-[#FAF7F2] dark:hover:bg-[#242424] font-mono text-xs font-semibold shadow-md transition-all cursor-pointer focus-ring"
      >
        {{ showAllProjects ? '← Show Top Featured Builds Only' : `View All ${allProjects.length} Engineering Builds (${allProjects.length - 5} More) →` }}
      </button>
    </div>

    <!-- Lightbox Detail Modal -->
    <Transition 
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="selectedProject" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto"
        @click.self="closeModal"
      >
        <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col my-auto max-h-[90vh]">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-6 py-4 bg-[#F5F0E8] dark:bg-[#141414] border-b border-[#E6E0D4] dark:border-[#2A2A2A]">
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] border border-[#B5502F]/20 dark:border-[#E8C976]/20">
                {{ selectedProject.tierLabel }}
              </span>
              <h3 class="text-lg font-serif font-bold text-[#2A2421] dark:text-[#F5F0E8] truncate max-w-xs sm:max-w-md">
                {{ selectedProject.title }}
              </h3>
            </div>
            <button 
              @click="closeModal"
              class="w-8 h-8 rounded-full bg-white dark:bg-[#242424] text-[#524A45] dark:text-[#9E9E9E] hover:text-[#2A2421] dark:hover:text-[#F5F0E8] flex items-center justify-center transition-colors focus-ring"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <!-- Modal Scrollable Content Body -->
          <div class="p-6 overflow-y-auto space-y-6 flex-1">
            <!-- Featured Topology Diagram / Preview Image -->
            <div class="relative rounded-xl overflow-hidden bg-[#FAF7F2] dark:bg-[#0F0F0F] border border-[#E6E0D4] dark:border-[#2A2A2A]">
              <img 
                :src="activeModalImage" 
                :alt="selectedProject.title" 
                class="w-full h-64 sm:h-80 object-cover"
                @error="handleImgError"
              />
            </div>

            <!-- Gallery Thumbnails (if multiple exist) -->
            <div v-if="selectedProject.galleryImages && selectedProject.galleryImages.length > 1" class="flex gap-2 overflow-x-auto pb-2">
              <button 
                v-for="(img, idx) in selectedProject.galleryImages"
                :key="idx"
                @click="activeImageIndex = idx"
                class="w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer focus-ring"
                :class="activeImageIndex === idx ? 'border-[#B5502F] dark:border-[#E8C976] scale-105' : 'border-transparent opacity-60 hover:opacity-100'"
              >
                <img :src="img" :alt="`Thumbnail ${idx + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>

            <!-- Description -->
            <div>
              <h4 class="text-xs font-mono uppercase tracking-wider text-[#B5502F] dark:text-[#E8C976] mb-2 font-semibold">
                Overview & Problem Statement
              </h4>
              <p class="text-sm sm:text-base text-[#2A2421] dark:text-[#F5F0E8] leading-relaxed font-sans">
                {{ selectedProject.description }}
              </p>
            </div>

            <!-- Highlights -->
            <div>
              <h4 class="text-xs font-mono uppercase tracking-wider text-[#B5502F] dark:text-[#E8C976] mb-2 font-semibold">
                Key Engineering Deliverables
              </h4>
              <ul class="space-y-2 text-xs sm:text-sm font-sans text-[#524A45] dark:text-[#9E9E9E]">
                <li v-for="(h, idx) in (selectedProject.highlights || defaultHighlights)" :key="idx" class="flex items-start gap-2">
                  <span class="text-[#B5502F] dark:text-[#E8C976] shrink-0">•</span>
                  <span>{{ h }}</span>
                </li>
              </ul>
            </div>

            <!-- Tech Stack -->
            <div>
              <h4 class="text-xs font-mono uppercase tracking-wider text-[#B5502F] dark:text-[#E8C976] mb-2 font-semibold">
                Technologies & Frameworks
              </h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tech in selectedProject.tech"
                  :key="tech"
                  class="px-3 py-1 text-xs font-mono bg-[#F0EBE1] dark:bg-[#242424] text-[#2A2421] dark:text-[#F5F0E8] rounded-md border border-[#E6E0D4] dark:border-[#2D2D2D] font-medium"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>

          <!-- Modal Bottom Actions -->
          <div class="p-4 bg-[#F5F0E8] dark:bg-[#141414] border-t border-[#E6E0D4] dark:border-[#2A2A2A] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <button 
                @click="closeModal"
                class="px-5 py-2 rounded-full bg-transparent text-[#524A45] dark:text-[#9E9E9E] hover:text-[#2A2421] dark:hover:text-[#F5F0E8] font-sans text-xs font-medium cursor-pointer focus-ring"
              >
                Close
              </button>
              <button 
                @click="copyShareLink(selectedProject)"
                class="px-4 py-2 rounded-full bg-[#F0EBE1] dark:bg-[#242424] text-[#B5502F] dark:text-[#E8C976] border border-[#E6E0D4] dark:border-[#333333] font-mono text-xs hover:bg-[#E6E0D4] dark:hover:bg-[#2D2D2D] transition-all cursor-pointer focus-ring flex items-center gap-1.5"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>{{ copySuccess ? 'Link Copied' : 'Share Link' }}</span>
              </button>
            </div>

            <a 
              :href="selectedProject.url"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-2.5 rounded-full bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] font-sans font-semibold text-xs sm:text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus-ring"
            >
              <span>Launch Live App / Demo</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import WavyDivider from './WavyDivider.vue';
import DoodleDecorations from './DoodleDecorations.vue';
import type { ProjectItem } from '@/content/defaults';
import { useSiteContent } from '@/composables/useSiteContent';


const route = useRoute();
const scrollContainer = ref<HTMLElement | null>(null);
const activeCategory = ref<string>('all');
const selectedProject = ref<ProjectItem | null>(null);
const activeImageIndex = ref<number>(0);
const copySuccess = ref(false);

const activeModalImage = computed(() => {
  if (!selectedProject.value) return '';
  if (selectedProject.value.galleryImages && selectedProject.value.galleryImages[activeImageIndex.value]) {
    return selectedProject.value.galleryImages[activeImageIndex.value];
  }
  return selectedProject.value.image;
});

const categories = [
  { id: 'all', label: 'All Builds' },
  { id: 'tier1', label: 'Tier 1: Enterprise & IoT Systems' },
  { id: 'tier2', label: 'Tier 2: Full-Stack Web Apps' },
  { id: 'tier3', label: 'Tier 3: Tools & Micro-Apps' },
];

const defaultHighlights = [
  'Built with modular component architecture adhering to separation of concerns.',
  'Optimized data structure caching for fast edge routing.'
];

const openModal = (project: ProjectItem) => {
  selectedProject.value = project;
  activeImageIndex.value = 0;
};

const closeModal = () => {
  selectedProject.value = null;
  activeImageIndex.value = 0;
};

const copyShareLink = async (project: ProjectItem) => {
  const url = `${window.location.origin}${window.location.pathname}#works?project=${encodeURIComponent(project.title)}`;
  try {
    await navigator.clipboard.writeText(url);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 3000);
  } catch {
    // Fallback
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedProject.value) {
    closeModal();
  }
};

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -360, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 360, behavior: 'smooth' });
  }
};

const handleImgError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop';
};


const { projects: allProjects } = useSiteContent();

const showAllProjects = ref(false);

const filteredProjects = computed(() => {
  let list = allProjects.value;
  if (activeCategory.value !== 'all') {
    list = allProjects.value.filter((p) => p.tier === activeCategory.value);
  } else if (!showAllProjects.value) {
    list = allProjects.value.slice(0, 5);
  }
  return list;
});

const getCategoryCount = (catId: string) => {
  if (catId === 'all') return allProjects.value.length;
  return allProjects.value.filter((p) => p.tier === catId).length;
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  const rawQuery = window.location.search || (window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '');
  const params = new URLSearchParams(rawQuery);
  const projectParam = params.get('project');
  if (projectParam) {
    const matched = allProjects.value.find((p) => p.title.toLowerCase() === decodeURIComponent(projectParam).toLowerCase());
    if (matched) {
      openModal(matched);
    }
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
