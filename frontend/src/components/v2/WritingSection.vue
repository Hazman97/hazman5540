<template>
  <section id="writing" class="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
    <!-- Asymmetric Organic Doodle Decorations -->
    <DoodleDecorations type="code-sparkle" class="absolute top-10 left-[4%] hidden sm:block" />

    <!-- Section Header -->
    <div class="text-center mb-12 relative z-10">
      <h2 class="text-3xl sm:text-5xl font-serif text-[#B5502F] dark:text-[#E8C976] tracking-wide mb-3">
        Notes & Technical Thoughts
      </h2>
      <p class="text-[#6E655F] dark:text-[#8A8A8A] text-sm sm:text-base font-sans max-w-xl mx-auto">
        Reflections on software architecture, networking, and personal learnings.
      </p>
      <WavyDivider />
    </div>

    <!-- Writing / Notes List -->
    <div class="space-y-6 relative z-10">
      <article 
        v-for="article in articles" 
        :key="article.title"
        @click="openModal(article)"
        class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8 hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all duration-300 shadow-xl group cursor-pointer"
      >
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] bg-[#B5502F]/10 dark:bg-[#E8C976]/10 px-3 py-1 rounded-full border border-[#B5502F]/20 dark:border-[#E8C976]/20 self-start font-semibold">
            {{ article.date }}
          </span>
          <span class="text-xs font-mono text-[#6E655F] dark:text-[#8A8A8A] flex items-center gap-1">
            <span>{{ article.readTime }}</span>
            <span class="text-[#B5502F] dark:text-[#E8C976]">✦ Read Note</span>
          </span>
        </div>

        <h3 class="text-xl sm:text-2xl font-serif text-[#2A2421] dark:text-[#F5F0E8] group-hover:text-[#B5502F] dark:group-hover:text-[#E8C976] transition-colors mb-3">
          {{ article.title }}
        </h3>

        <!-- Snippet with Sticky-Note Highlight Marker -->
        <p class="text-[#6E655F] dark:text-[#8A8A8A] text-sm sm:text-base font-sans leading-relaxed mb-4">
          {{ article.excerptBefore }}
          <span class="inline-block border-2 border-[#B5502F]/80 dark:border-[#F5F0E8]/80 bg-[#B5502F]/10 dark:bg-[#F5F0E8]/5 px-2 py-0.5 rounded text-[#B5502F] dark:text-[#F5F0E8] font-medium my-0.5 shadow-sm">
            {{ article.highlightText }}
          </span>
          {{ article.excerptAfter }}
        </p>

        <!-- Topic Tags -->
        <div class="flex flex-wrap gap-2 pt-4 border-t border-[#E6E0D4] dark:border-[#2A2A2A]">
          <span 
            v-for="tag in article.tags" 
            :key="tag"
            class="text-xs font-mono text-[#6E655F] dark:text-[#8A8A8A] hover:text-[#B5502F] dark:hover:text-[#E8C976] transition-colors"
          >
            #{{ tag }}
          </span>
        </div>
      </article>
    </div>

    <!-- Article Reader Lightbox Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="selectedArticle" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
        @click.self="closeModal"
      >
        <div class="relative w-full max-w-2xl bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <!-- Modal Top Bar -->
          <div class="flex items-center justify-between px-4 py-3 bg-[#F5F0E8] dark:bg-[#141414] border-b border-[#E6E0D4] dark:border-[#2A2A2A]">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#FF5F56] inline-block cursor-pointer" @click="closeModal"></span>
              <span class="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-[#00FF66] inline-block"></span>
              <span class="ml-2 text-xs font-mono text-[#6E655F] dark:text-[#8A8A8A]">
                hazman-notes // {{ selectedArticle.date }}
              </span>
            </div>

            <button 
              @click="closeModal"
              class="p-1 rounded-full text-[#6E655F] dark:text-[#8A8A8A] hover:text-[#B5502F] dark:hover:text-[#E8C976] focus-ring"
              aria-label="Close Note Modal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="overflow-y-auto p-6 sm:p-8 space-y-6">
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 rounded-full text-xs font-mono bg-[#B5502F]/10 dark:bg-[#E8C976]/10 text-[#B5502F] dark:text-[#E8C976] border border-[#B5502F]/20 dark:border-[#E8C976]/20 font-semibold">
                {{ selectedArticle.date }}
              </span>
              <span class="text-xs font-mono text-[#6E655F] dark:text-[#8A8A8A]">{{ selectedArticle.readTime }}</span>
            </div>

            <h3 class="text-2xl sm:text-3xl font-serif font-bold text-[#2A2421] dark:text-[#F5F0E8] leading-tight">
              {{ selectedArticle.title }}
            </h3>

            <!-- Key Takeaways Highlight Box -->
            <div class="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#141414] border border-[#E6E0D4] dark:border-[#2A2A2A] space-y-2">
              <div class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] uppercase tracking-wider font-semibold">
                // Technical Takeaways & Architecture Notes
              </div>
              <ul class="text-xs sm:text-sm text-[#2A2421] dark:text-[#F5F0E8] space-y-1.5 list-disc list-inside font-sans">
                <li v-for="point in selectedArticle.takeaways" :key="point">
                  {{ point }}
                </li>
              </ul>
            </div>

            <!-- Full Article Paragraph Body -->
            <div class="space-y-4 text-sm sm:text-base text-[#6E655F] dark:text-[#8A8A8A] font-sans leading-relaxed">
              <p v-for="(p, i) in selectedArticle.contentParagraphs" :key="i">
                {{ p }}
              </p>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 pt-4 border-t border-[#E6E0D4] dark:border-[#2A2A2A]">
              <span 
                v-for="tag in selectedArticle.tags" 
                :key="tag"
                class="px-2.5 py-1 text-xs font-mono bg-[#F0EBE1] dark:bg-[#242424] text-[#2A2421] dark:text-[#F5F0E8] rounded-md border border-[#E6E0D4] dark:border-[#2D2D2D]"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="p-4 bg-[#F5F0E8] dark:bg-[#141414] border-t border-[#E6E0D4] dark:border-[#2A2A2A] flex justify-end">
            <button 
              @click="closeModal"
              class="px-6 py-2 rounded-full bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] font-sans text-xs font-semibold hover:opacity-90 transition-all cursor-pointer focus-ring"
            >
              Close Note
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import WavyDivider from './WavyDivider.vue';
import DoodleDecorations from './DoodleDecorations.vue';

interface Article {
  title: string;
  date: string;
  readTime: string;
  excerptBefore: string;
  highlightText: string;
  excerptAfter: string;
  tags: string[];
  takeaways: string[];
  contentParagraphs: string[];
}

const selectedArticle = ref<Article | null>(null);

const openModal = (article: Article) => {
  selectedArticle.value = article;
};

const closeModal = () => {
  selectedArticle.value = null;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedArticle.value) {
    closeModal();
  }
};

const articles: Article[] = [
  {
    title: 'Optimizing Real-time Telemetry Data with Node.js & PostgreSQL',
    date: 'OCT 2025',
    readTime: '5 min read',
    excerptBefore: 'Architecting high-frequency TCP stream ingestion servers to achieve 500+ pkts/sec throughput while maintaining',
    highlightText: 'sub-15ms database indexing & zero packet loss',
    excerptAfter: 'under intense fleet telemetry workloads.',
    tags: ['telemetry', 'nodejs', 'postgresql', 'performance'],
    takeaways: [
      'Implemented raw binary TCP frame parsing using Node.js Buffer streams to eliminate JSON serialization overhead.',
      'Configured PostgreSQL COPY bulk ingestion worker pools for efficient spatial indexing.',
      'Achieved 99.9% uptime over high-throughput vehicle telemetry connections.'
    ],
    contentParagraphs: [
      'Handling real-time telemetry streaming from hundreds of vehicle GPS terminals requires shifting away from traditional HTTP REST paradigms towards raw TCP socket ingestion. Standard JSON payloads add unnecessary overhead when processing location fixes at sub-second intervals.',
      'By implementing a dedicated Node.js TCP socket server that directly decodes binary Teltonika AVL frames, memory overhead dropped significantly while throughput surged past 500 packets per second.',
      'On the database layer, inserting every frame individually created severe disk I/O bottlenecks. Utilizing worker-thread batching alongside PostgreSQL spatial indices allowed high-frequency telemetry storage without degrading UI query performance.'
    ]
  },
  {
    title: 'Setting up Cloudflare Tunnels for Secure Edge Deployments',
    date: 'AUG 2025',
    readTime: '4 min read',
    excerptBefore: 'Establishing encrypted origin connections from edge field servers to Cloudflare Workers, providing',
    highlightText: 'secure remote access without open public ports',
    excerptAfter: 'or exposing local hardware infrastructure.',
    tags: ['cloudflare', 'devops', 'edge-security', 'networking'],
    takeaways: [
      'Eliminated open inbound firewall ports by tunneling outbound HTTPS connections via cloudflared.',
      'Integrated Cloudflare Zero Trust Access policies for secure engineer authentication.',
      'Enforced TLS 1.3 encryption for edge hardware dashboards running in field locations.'
    ],
    contentParagraphs: [
      'Deploying web dashboards on local hardware targets—such as Jetson boards or industrial edge gateways—often forces teams to deal with dynamic IP addresses, port forwarding, and vulnerability exposure.',
      'Cloudflare Tunnels solve this by creating persistent, lightweight outbound connections from the edge device directly to Cloudflare edge nodes. No public IP address or incoming firewall port is required.',
      'Combined with Access policies and custom domain routing, remote field dashboards can be managed securely from anywhere with zero friction and enterprise-grade encryption.'
    ]
  },
  {
    title: 'Implementing LoRa & Mesh Networks in Agriculture',
    date: 'JUL 2025',
    readTime: '4 min read',
    excerptBefore: 'Deploying low-power wireless nodes and Rajant Kinetic Mesh backhauls across agricultural fields to support',
    highlightText: 'reliable autonomous UGV telemetry',
    excerptAfter: 'in remote, off-grid plantation environments.',
    tags: ['lora', 'mesh-networking', 'iot-field', 'agriculture'],
    takeaways: [
      'Combined long-range LoRa telemetry for stationary sensors with high-bandwidth Rajant Mesh for mobile robotics.',
      'Designed self-healing network topology resilient to dense tree canopy signal degradation.',
      'Provided seamless Starlink backhaul uplink for remote cloud synchronization.'
    ],
    contentParagraphs: [
      'Agricultural environments present severe RF challenges due to dense foliage, hilly topography, and zero cellular coverage in remote sectors.',
      'By pairing low-power sub-GHz LoRa radios for environmental sensors with Rajant Kinetic Mesh nodes for mobile UGVs, we established an adaptive wireless infrastructure that heals automatically as equipment moves across the field.',
      'This dual-tier wireless architecture ensures continuous control telemetry and sensor relay even under extreme field conditions, backed up by satellite internet for remote cloud sync.'
    ]
  },
];

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
