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
        class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8 hover:border-[#B5502F]/40 dark:hover:border-[#E8C976]/40 transition-all duration-300 shadow-xl group"
      >
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] bg-[#B5502F]/10 dark:bg-[#E8C976]/10 px-3 py-1 rounded-full border border-[#B5502F]/20 dark:border-[#E8C976]/20 self-start font-semibold">
            {{ article.date }}
          </span>
          <span class="text-xs font-mono text-[#6E655F] dark:text-[#8A8A8A]">{{ article.readTime }}</span>
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
  </section>
</template>

<script setup lang="ts">
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
}

const articles: Article[] = [
  {
    title: 'Optimizing Real-time Telemetry Data with Node.js & PostgreSQL',
    date: 'OCT 2025',
    readTime: '5 min read',
    excerptBefore: 'Architecting high-frequency TCP stream ingestion servers to achieve 500+ pkts/sec throughput while maintaining',
    highlightText: 'sub-15ms database indexing & zero packet loss',
    excerptAfter: 'under intense fleet telemetry workloads.',
    tags: ['telemetry', 'nodejs', 'postgresql', 'performance'],
  },
  {
    title: 'Setting up Cloudflare Tunnels for Secure Edge Deployments',
    date: 'AUG 2025',
    readTime: '4 min read',
    excerptBefore: 'Establishing encrypted origin connections from edge field servers to Cloudflare Workers, providing',
    highlightText: 'secure remote access without open public ports',
    excerptAfter: 'or exposing local hardware infrastructure.',
    tags: ['cloudflare', 'devops', 'edge-security', 'networking'],
  },
  {
    title: 'Implementing LoRa & Mesh Networks in Agriculture',
    date: 'JUL 2025',
    readTime: '4 min read',
    excerptBefore: 'Deploying low-power wireless nodes and Rajant Kinetic Mesh backhauls across agricultural fields to support',
    highlightText: 'reliable autonomous UGV telemetry',
    excerptAfter: 'in remote, off-grid plantation environments.',
    tags: ['lora', 'mesh-networking', 'iot-field', 'agriculture'],
  },
];
</script>
