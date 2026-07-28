<template>
  <section id="works" class="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Asymmetric Organic Doodle & Circuit Decorations -->
    <DoodleDecorations type="chip-doodle" class="absolute -top-6 left-[6%]" />
    <DoodleDecorations type="antenna-wave" class="absolute bottom-10 right-[5%] hidden md:block" />

    <!-- Section Header -->
    <div class="text-center mb-10 relative z-10">
      <h2 class="text-3xl sm:text-5xl font-serif text-[#B5502F] dark:text-[#E8C976] tracking-wide mb-3">
        Featured Systems & Engineering Builds
      </h2>
      <p class="text-[#6E655F] dark:text-[#8A8A8A] text-sm sm:text-base font-sans max-w-2xl mx-auto">
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
          : 'bg-white dark:bg-[#1A1A1A] text-[#6E655F] dark:text-[#8A8A8A] border border-[#E6E0D4] dark:border-[#2A2A2A] hover:text-[#2A2421] dark:hover:text-[#F5F0E8]'"
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
          class="snap-start shrink-0 print:shrink print:w-full w-[290px] sm:w-[350px] md:w-[380px] bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-xl overflow-hidden shadow-xl hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all duration-300 flex flex-col group/card cursor-pointer"
          @click="openModal(project)"
        >
          <!-- Browser Window Top Bar -->
          <div class="flex items-center justify-between px-3.5 py-2.5 bg-[#F5F0E8] dark:bg-[#141414] border-b border-[#E6E0D4] dark:border-[#2A2A2A]">
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-full bg-[#FF5F56] inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-[#27C93F] inline-block"></span>
            </div>
            <div class="text-[10px] font-mono text-[#6E655F] dark:text-[#8A8A8A] truncate max-w-[170px]">
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
                ✦ Click for Architecture Topology
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

              <p class="text-[#6E655F] dark:text-[#8A8A8A] text-xs sm:text-sm font-sans line-clamp-2 mb-4 leading-relaxed">
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

    <!-- Interactive Project Detail Lightbox Modal with Visual Architecture Flowchart -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="selectedProject" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
        @click.self="closeModal"
      >
        <div class="relative w-full max-w-2xl bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <!-- Modal Top Bar -->
          <div class="flex items-center justify-between px-4 py-3 bg-[#F5F0E8] dark:bg-[#141414] border-b border-[#E6E0D4] dark:border-[#2A2A2A]">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#FF5F56] inline-block cursor-pointer" @click="closeModal"></span>
              <span class="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-[#27C93F] inline-block"></span>
              <span class="ml-2 text-xs font-mono text-[#6E655F] dark:text-[#8A8A8A] truncate max-w-[220px]">
                {{ selectedProject.url }}
              </span>
            </div>

            <button 
              @click="closeModal"
              class="p-1 rounded-full text-[#6E655F] dark:text-[#8A8A8A] hover:text-[#B5502F] dark:hover:text-[#E8C976] focus-ring"
              aria-label="Close Modal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Scrollable Content -->
          <div class="overflow-y-auto p-6 space-y-6">
            <!-- High-Res Preview Banner & Gallery Switcher -->
            <div class="space-y-2">
              <div class="relative h-52 sm:h-64 rounded-xl overflow-hidden bg-[#FAF7F2] dark:bg-[#0F0F0F] border border-[#E6E0D4] dark:border-[#2A2A2A]">
                <img 
                  :src="activeModalImage" 
                  :alt="selectedProject.title"
                  class="w-full h-full object-cover transition-all duration-300"
                  @error="handleImgError"
                />
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/90 dark:bg-[#1A1A1A]/90 text-[#B5502F] dark:text-[#E8C976] border border-[#E6E0D4] dark:border-[#2A2A2A] shadow-md">
                  {{ selectedProject.tierLabel }}
                </span>
              </div>

              <!-- Gallery Image Thumbnails (if available) -->
              <div v-if="selectedProject.galleryImages && selectedProject.galleryImages.length > 1" class="flex items-center gap-2 overflow-x-auto py-1">
                <button
                  v-for="(img, idx) in selectedProject.galleryImages"
                  :key="idx"
                  @click="activeImageIndex = idx"
                  class="w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0"
                  :class="activeImageIndex === idx ? 'border-[#B5502F] dark:border-[#E8C976] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'"
                >
                  <img :src="img" :alt="'Gallery item ' + (idx + 1)" class="w-full h-full object-cover" @error="handleImgError" />
                </button>
              </div>
            </div>

            <!-- Title & Status -->
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <h3 class="text-2xl font-serif font-bold text-[#2A2421] dark:text-[#F5F0E8]">
                  {{ selectedProject.title }}
                </h3>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] border border-[#B5502F]/30 dark:border-[#E8C976]/30 font-semibold">
                  {{ selectedProject.status || 'Active' }}
                </span>
              </div>

              <p class="text-sm sm:text-base text-[#6E655F] dark:text-[#8A8A8A] font-sans leading-relaxed">
                {{ selectedProject.description }}
              </p>
            </div>

            <!-- System Architecture Flowchart Diagram Box (For Tier 1 & Selected Builds) -->
            <div v-if="selectedProject.architectureFlow" class="p-4 rounded-xl bg-[#0F0F0F] border border-[#2A2A2A] space-y-3 shadow-inner">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono text-[#E8C976] uppercase tracking-wider font-semibold flex items-center gap-2">
                  <span>📐</span> Visual System Architecture Flowchart
                </span>
                <span class="text-[10px] font-mono text-[#64FFDA]">PROTOCOL PIPELINE</span>
              </div>

              <!-- Node Link Pipeline Diagram -->
              <div class="flex flex-wrap items-center justify-center gap-2 py-3 px-2 bg-[#171717] rounded-lg border border-[#262626] font-mono text-xs">
                <div 
                  v-for="(step, idx) in selectedProject.architectureFlow" 
                  :key="idx" 
                  class="flex items-center gap-2"
                >
                  <span class="px-2.5 py-1 rounded bg-[#242424] text-[#F5F0E8] border border-[#333333] text-[11px] font-medium text-center">
                    {{ step }}
                  </span>
                  <span v-if="idx < selectedProject.architectureFlow.length - 1" class="text-[#E8C976] font-bold">
                    ➔
                  </span>
                </div>
              </div>
            </div>

            <!-- Impact Metrics & Highlights Breakdown -->
            <div class="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#141414] border border-[#E6E0D4] dark:border-[#2A2A2A] space-y-2">
              <div class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] uppercase tracking-wider font-semibold">
                // Measured Impact & Engineering Highlights
              </div>
              <ul class="text-xs sm:text-sm text-[#2A2421] dark:text-[#F5F0E8] space-y-1.5 list-disc list-inside font-sans">
                <li v-for="highlight in (selectedProject.highlights || defaultHighlights)" :key="highlight">
                  {{ highlight }}
                </li>
              </ul>
            </div>

            <!-- Full Tech Stack Tags -->
            <div>
              <div class="text-xs font-mono text-[#6E655F] dark:text-[#8A8A8A] uppercase tracking-wider mb-2">Technologies Used</div>
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
          <div class="p-4 bg-[#F5F0E8] dark:bg-[#141414] border-t border-[#E6E0D4] dark:border-[#2A2A2A] flex items-center justify-between gap-3">
            <button 
              @click="closeModal"
              class="px-5 py-2 rounded-full bg-transparent text-[#6E655F] dark:text-[#8A8A8A] hover:text-[#2A2421] dark:hover:text-[#F5F0E8] font-sans text-xs font-medium cursor-pointer focus-ring"
            >
              Close
            </button>

            <a 
              :href="selectedProject.url"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-2.5 rounded-full bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] font-sans font-semibold text-xs sm:text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer focus-ring"
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
import WavyDivider from './WavyDivider.vue';
import DoodleDecorations from './DoodleDecorations.vue';

interface ProjectItem {
  title: string;
  description: string;
  url: string;
  image: string;
  galleryImages?: string[];
  tag: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  tierLabel: string;
  tech: string[];
  status?: string;
  architectureFlow?: string[];
  highlights?: string[];
}

const scrollContainer = ref<HTMLElement | null>(null);
const activeCategory = ref<string>('all');
const selectedProject = ref<ProjectItem | null>(null);
const activeImageIndex = ref<number>(0);

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
  'Optimized data structure caching for fast edge routing.',
  'Production verified with 99.9% uptime deployment strategy.'
];

const openModal = (project: ProjectItem) => {
  selectedProject.value = project;
  activeImageIndex.value = 0;
};

const closeModal = () => {
  selectedProject.value = null;
  activeImageIndex.value = 0;
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

// All 18 Projects Tiered
const allProjects: ProjectItem[] = [
  // --- TIER 1: Enterprise & Hardware Systems ---
  {
    title: 'Shooting Range Control Platform',
    tier: 'tier1',
    tierLabel: 'Tier 1 Industrial IoT',
    url: 'https://mindnrobotics.com/',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop'
    ],
    status: 'Mindnrobotics',
    tag: 'Target Controls',
    description: 'Range control platform for target management & counter controls. Features low-latency WebSockets communication between Vue 3 frontend and custom ESP32 C++ target controllers.',
    tech: ['ESP32 C++', 'Target Controls', 'WebSockets', 'Rajant Mesh', 'Vue 3'],
    architectureFlow: ['Piezo Sensors', 'ESP32 C++ MCU', 'WebSockets', 'Rajant Mesh / Starlink', 'Node.js Engine', 'Target Control UI'],
    highlights: [
      'Comprehensive target management & counter controls platform for live range operations.',
      'Reduced hardware-to-screen target hit response latency to <15ms during live field trials.',
      'Custom C++ interrupt firmware running on ESP32 target microcontrollers.'
    ]
  },
  {
    title: 'MindGPS Telemetry Tracker',
    tier: 'tier1',
    tierLabel: 'Tier 1 Fleet Telemetry',
    url: 'https://gps.mindnrobotics.com/',
    image: '/img/mindgps_tracker.png',
    galleryImages: [
      '/img/mindgps_tracker.png',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop'
    ],
    status: 'Mindnrobotics',
    tag: 'Fleet Telemetry',
    description: 'Real-time fleet tracking platform with Teltonika FMC920 hardware integration. Custom Node.js TCP socket ingestion backend streaming telemetry into PostgreSQL.',
    tech: ['Teltonika FMC920', 'Node.js TCP', 'PostgreSQL', 'Leaflet GIS', 'Real-Time Tracking'],
    architectureFlow: ['Teltonika FMC920', 'TCP Raw Socket', 'Node.js Byte Parser', 'PostgreSQL Spatial', 'Leaflet GIS Frontend'],
    highlights: [
      'Seamless integration with Teltonika FMC920 hardware via custom binary packet parser.',
      'High-throughput Node.js TCP server ingesting 500+ telemetry pkts/sec into PostgreSQL.',
      'Maintains 99.9% ingestion uptime with real-time GIS map tracking interface.'
    ]
  },
  {
    title: 'CanopyNet Plantation Mesh Network',
    tier: 'tier1',
    tierLabel: 'Tier 1 Mobile Robotics',
    url: 'https://canopynet.mindnrobotics.com/',
    image: '/img/canopynet_dashboard.png',
    galleryImages: [
      '/img/canopynet_dashboard.png',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop'
    ],
    status: 'Mindnrobotics',
    tag: 'Plantation Mesh',
    description: 'Plantation mesh network & fleet management dashboard. Integrates Leaflet spatial map tracking and Robot Operating System (ROS 2) telemetry feeds over field mesh networks.',
    tech: ['Vue 3', 'Plantation Mesh', 'Leaflet GIS', 'ROS 2 Bridge', 'WebSockets'],
    architectureFlow: ['UGV Hardware Sensors', 'ROS 2 Engine', 'Rajant Mesh Node', 'WebSocket Bridge', 'Vue 3 Fleet Dashboard'],
    highlights: [
      'Plantation mesh network & autonomous fleet management dashboard for remote agriculture.',
      'Real-time UGV path tracking and tree canopy coverage spatial mapping.',
      'Low-latency status telemetry monitoring battery, GPS fix, and motor health over Rajant Mesh.'
    ]
  },
  {
    title: 'PKT Security Portal & E-Claim Platform',
    tier: 'tier1',
    tierLabel: 'Tier 1 Enterprise Portal',
    url: 'https://hazman.dev/eclaim',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop',
    status: 'PKT Logistics',
    tag: 'Enterprise App',
    description: 'Led front-end development for PKT Logistics internal portals, security management, CCTV access controls, e-claim system & WMS integration.',
    tech: ['Vue.js', 'Tailwind CSS', 'WMS API', 'CCTV Access', 'REST API'],
    architectureFlow: ['CCTV Access / WMS API', 'Express Backend', 'PostgreSQL', 'Vue.js + Tailwind Enterprise Portal'],
    highlights: [
      'Onboarded 1,000+ internal staff and logistics vendors across multiple warehouse facilities.',
      'Automated employee expense claim workflows with audit trails and PDF export.',
      'Integrated live CCTV access control monitoring feeds for warehouse security.'
    ]
  },

  // --- TIER 2: Full-Stack Web Applications ---
  {
    title: 'Interactive Org Chart Builder',
    tier: 'tier2',
    tierLabel: 'Tier 2 Web App',
    url: 'https://hazman.dev/org-demo',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    status: 'Live Tool',
    tag: 'Web App',
    description: 'Interactive organization chart builder supporting drag-and-drop hierarchy management, custom role assignments, and instant sharing.',
    tech: ['Vue 3', 'TypeScript', 'D3 Org Chart', 'Cloudflare D1', 'Tailwind'],
  },
  {
    title: 'MediSaaS Clinic System',
    tier: 'tier2',
    tierLabel: 'Tier 2 SaaS App',
    url: 'https://demo-clinic-management-system.vercel.app/',
    image: '/img/medisaas_clinic.png',
    status: 'SaaS',
    tag: 'Medical SaaS',
    description: 'Comprehensive clinic management system with appointment scheduling, patient registry, doctor console, pharmacy integration, and queue display.',
    tech: ['Vue.js', 'Tailwind', 'Vercel', 'REST API'],
  },
  {
    title: 'Tasmik Progress Management System',
    tier: 'tier2',
    tierLabel: 'Tier 2 Web App',
    url: 'http://[2001:f40:935:99c:6806:fc47:e2f3:97e7]:5175',
    image: '/img/tasmik_system.png',
    status: 'Live System',
    tag: 'School System',
    description: 'Comprehensive system for schools to manage student records, tasmik progress, attendance, and role-based permissions.',
    tech: ['Vue.js', 'Tailwind', 'Supabase', 'TypeScript'],
  },
  {
    title: 'Restaurant POS System',
    tier: 'tier2',
    tierLabel: 'Tier 2 Web App',
    url: 'https://demo-restaurant-ordering-system.vercel.app/',
    image: '/img/restaurant_pos.png',
    status: 'AI Studio',
    tag: 'POS System',
    description: 'Modern Point of Sale system for restaurants, featuring order management, menu customization, and sales tracking.',
    tech: ['Vue.js', 'Tailwind', 'Firebase Firestore'],
  },
  {
    title: 'SmashPoint Badminton Booking',
    tier: 'tier2',
    tierLabel: 'Tier 2 Web App',
    url: 'https://smashpoint.vercel.app/',
    image: '/img/smashpoint_booking.png',
    status: 'AI Studio',
    tag: 'Booking App',
    description: 'Modern badminton court booking system with real-time court availability, slot management, and seamless reservations.',
    tech: ['React', 'Tailwind', 'Firebase'],
  },
  {
    title: 'QR Memories',
    tier: 'tier2',
    tierLabel: 'Tier 2 Web App',
    url: 'https://qrmemories.pages.dev/login',
    image: '/img/qr_memories.png',
    status: 'Live',
    tag: 'Web App',
    description: 'Digital memory lane using QR codes to store and view photo collections. Share and scan to relive moments instantly.',
    tech: ['Vue.js', 'Cloudflare Pages', 'Tailwind'],
  },

  // --- TIER 3: Tools & Micro-Apps ---
  {
    title: 'EZQRCode Manager',
    tier: 'tier3',
    tierLabel: 'Tier 3 Utility',
    url: 'https://ezqrcode.pages.dev/',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop',
    status: 'Live',
    tag: 'Web App',
    description: 'Dynamic QR Code Management system allowing users to create, track, and manage customizable QR codes seamlessly.',
    tech: ['Vue.js', 'Vite', 'Tailwind'],
  },
  {
    title: 'EZresit Receipt Manager',
    tier: 'tier3',
    tierLabel: 'Tier 3 Utility',
    url: 'https://ezresit.pages.dev/',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop',
    status: 'SaaS',
    tag: 'SaaS',
    description: 'Minimalist, ultra-fast receipt management system exclusively for small businesses. 100% serverless and zero maintenance.',
    tech: ['Nuxt', 'Vue', 'Cloudflare Pages'],
  },
  {
    title: 'Confession Bot',
    tier: 'tier3',
    tierLabel: 'Tier 3 Utility',
    url: 'https://confess-bot.pages.dev/',
    image: '/img/confession_bot.png',
    status: 'Live',
    tag: 'Discord Bot',
    description: 'An anonymous confession bot for Discord servers. Allows users to submit confessions anonymously to specified channels.',
    tech: ['Node.js', 'Discord.js', 'JavaScript'],
  },
  {
    title: 'TravThru Premium Chauffeur',
    tier: 'tier3',
    tierLabel: 'Tier 3 Client Web',
    url: 'https://www.travthru.com/',
    image: '/img/travthru.png',
    status: 'Client Site',
    tag: 'Client Website',
    description: 'Premium 24/7 airport transfer & chauffeur service in KL. Corporate and private booking for luxury MPVs.',
    tech: ['Web Dev', 'SEO', 'Responsive'],
  },
  {
    title: 'Birthday Wish Creator',
    tier: 'tier3',
    tierLabel: 'Tier 3 Utility',
    url: 'https://hazman.dev/birthday/create',
    image: '/img/birthday_wish.png',
    status: 'Live Tool',
    tag: 'Web App',
    description: 'Multi-user birthday page system with customizable templates, YouTube music integration, and wish submission forms.',
    tech: ['Vue.js', 'Supabase', 'Tailwind'],
  },
  {
    title: 'Global Photo Collection',
    tier: 'tier3',
    tierLabel: 'Tier 3 Media App',
    url: 'https://hazman.dev/photocollection',
    image: '/img/photo_collection.png',
    status: 'Live Showcase',
    tag: 'Media Showcase',
    description: 'Curated photo collection showcasing travel photography categorized by countries & landmarks.',
    tech: ['Vue.js', 'Cloudflare R2', 'Tailwind'],
  },
  {
    title: 'WiFi QR Code Generator',
    tier: 'tier3',
    tierLabel: 'Tier 3 Utility',
    url: 'https://hazman.dev/wifi-qr',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    status: 'Live Tool',
    tag: 'Utility',
    description: 'Instant printable QR code generator for guest Wi-Fi access without typing passwords.',
    tech: ['Vue 3', 'QRCode Canvas', 'Tailwind'],
  },
  {
    title: 'Social Copywriting Generator',
    tier: 'tier3',
    tierLabel: 'Tier 3 Utility',
    url: 'https://hazman.dev/caption',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    status: 'Live Tool',
    tag: 'Copy Tool',
    description: 'Interactive caption generator assistant for social media posts, structuring tags and promotional copy.',
    tech: ['Vue 3', 'Composition API', 'Tailwind'],
  },
];

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return allProjects;
  return allProjects.filter((p) => p.tier === activeCategory.value);
});

const getCategoryCount = (catId: string) => {
  if (catId === 'all') return allProjects.length;
  return allProjects.filter((p) => p.tier === catId).length;
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
