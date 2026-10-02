<template>
  <div v-if="chatbot.enabled" class="print:hidden">
    <!-- Launcher -->
    <button
      v-if="!isOpen"
      @click="open"
      class="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] font-semibold text-sm shadow-2xl hover:scale-105 active:scale-95 transition-transform focus-ring"
      aria-label="Ask about Hazman"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.83L3 20l1.4-3.72A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <span class="hidden sm:inline">Ask about me</span>
    </button>

    <!-- Panel -->
    <section
      v-else
      class="fixed z-50 bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-96 h-[70vh] sm:h-[32rem] flex flex-col bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] sm:rounded-2xl shadow-2xl"
      role="dialog"
      aria-label="Chat about Hazman"
      @keydown.esc="isOpen = false"
    >
      <header class="flex items-center justify-between px-4 py-3 border-b border-[#E6E0D4] dark:border-[#2A2A2A]">
        <div>
          <p class="font-serif text-[#B5502F] dark:text-[#E8C976]">Ask about {{ firstName }}</p>
          <p class="text-[11px] font-mono text-[#524A45] dark:text-[#9E9E9E]">AI assistant · answers can be wrong</p>
        </div>
        <button @click="isOpen = false" class="p-2 rounded-full hover:bg-[#F0EBE1] dark:hover:bg-[#242424] focus-ring" aria-label="Close chat">✕</button>
      </header>

      <div ref="scrollBox" class="flex-1 overflow-y-auto p-4 space-y-3" aria-live="polite">
        <div class="text-sm px-3 py-2 rounded-xl max-w-[85%] bg-[#F0EBE1] dark:bg-[#242424]">{{ chatbot.welcome }}</div>
        <div
          v-for="(m, i) in messages"
          :key="i"
          class="text-sm px-3 py-2 rounded-xl max-w-[85%] whitespace-pre-line"
          :class="m.role === 'user' ? 'ml-auto bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F]' : 'bg-[#F0EBE1] dark:bg-[#242424]'"
        >
          {{ m.content }}
        </div>
        <div v-if="sending" class="text-sm px-3 py-2 rounded-xl w-16 bg-[#F0EBE1] dark:bg-[#242424] animate-pulse">...</div>
        <p v-if="error" class="text-xs text-rose-600 dark:text-rose-400">{{ error }}</p>

        <div v-if="messages.length === 0" class="flex flex-wrap gap-2 pt-1">
          <button
            v-for="q in suggestions"
            :key="q"
            @click="ask(q)"
            class="text-xs px-3 py-1.5 rounded-full border border-[#E6E0D4] dark:border-[#2A2A2A] hover:border-[#B5502F] dark:hover:border-[#E8C976] focus-ring"
          >
            {{ q }}
          </button>
        </div>
      </div>

      <form class="flex gap-2 p-3 border-t border-[#E6E0D4] dark:border-[#2A2A2A]" @submit.prevent="ask(input)">
        <label for="chat-input" class="sr-only">Your question</label>
        <input
          id="chat-input"
          ref="inputEl"
          v-model="input"
          maxlength="800"
          placeholder="Type a question..."
          class="flex-1 px-3 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#141414] border border-[#E6E0D4] dark:border-[#2A2A2A] text-sm focus:outline-none focus:border-[#B5502F] dark:focus:border-[#E8C976]"
        />
        <button
          type="submit"
          :disabled="sending || !input.trim()"
          class="px-4 py-2 rounded-xl bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] text-sm font-semibold disabled:opacity-50 focus-ring"
        >
          Send
        </button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import { sendChat, type ChatTurn } from '@/api/chat';
import { useSiteContent } from '@/composables/useSiteContent';

const { chatbot, profile } = useSiteContent();

const suggestions = ['What has he built?', 'What is his tech stack?', 'How can I contact him?'];
const firstName = computed(() => profile.value.name.split(' ')[0]);

const isOpen = ref(false);
const messages = ref<ChatTurn[]>([]);
const input = ref('');
const sending = ref(false);
const error = ref('');
const scrollBox = ref<HTMLElement | null>(null);
const inputEl = ref<HTMLInputElement | null>(null);

const scrollToBottom = () => nextTick(() => {
  if (scrollBox.value) scrollBox.value.scrollTop = scrollBox.value.scrollHeight;
});

const open = () => {
  isOpen.value = true;
  nextTick(() => inputEl.value?.focus());
};

const ask = async (question: string) => {
  const text = question.trim();
  if (!text || sending.value) return;
  error.value = '';
  messages.value.push({ role: 'user', content: text });
  input.value = '';
  sending.value = true;
  scrollToBottom();
  try {
    const res = await sendChat(messages.value);
    messages.value.push({ role: 'assistant', content: res.reply });
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Chat is unavailable right now.';
  } finally {
    sending.value = false;
    scrollToBottom();
  }
};
</script>
