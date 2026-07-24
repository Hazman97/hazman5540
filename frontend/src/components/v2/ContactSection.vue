<template>
  <section id="contact" class="relative py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
    <!-- Asymmetric Organic Doodle Decorations -->
    <DoodleDecorations type="coffee-doodle" class="absolute top-12 right-[8%] hidden sm:block" />

    <!-- Section Header -->
    <div class="text-center mb-12 relative z-10">
      <h2 class="text-3xl sm:text-5xl font-serif text-[#B5502F] dark:text-[#E8C976] tracking-wide mb-3">
        Let's Connect
      </h2>
      <p class="text-[#6E655F] dark:text-[#8A8A8A] text-sm sm:text-base font-sans max-w-xl mx-auto">
        Whether you have a software project, IoT integration, or technical question, feel free to reach out.
      </p>
      <WavyDivider />
    </div>

    <div class="bg-white dark:bg-[#1A1A1A] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10">
      <form @submit.prevent="sendMessage" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-mono text-[#B5502F] dark:text-[#E8C976] uppercase tracking-wider mb-2">Your Name</label>
            <input 
              v-model="form.name"
              type="text" 
              required
              placeholder="Hazman Adanan"
              class="w-full bg-[#FAF7F2] dark:bg-[#141414] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-[#2A2421] dark:text-[#F5F0E8] placeholder-[#6E655F]/50 dark:placeholder-[#8A8A8A]/50 focus:outline-none focus:border-[#B5502F] dark:focus:border-[#E8C976] focus-ring transition-colors"
            />
          </div>

          <div>
            <label class="block text-xs font-mono text-[#B5502F] dark:text-[#E8C976] uppercase tracking-wider mb-2">Your Email</label>
            <input 
              v-model="form.email"
              type="email" 
              required
              placeholder="hazman5001@gmail.com"
              class="w-full bg-[#FAF7F2] dark:bg-[#141414] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-[#2A2421] dark:text-[#F5F0E8] placeholder-[#6E655F]/50 dark:placeholder-[#8A8A8A]/50 focus:outline-none focus:border-[#B5502F] dark:focus:border-[#E8C976] focus-ring transition-colors"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-mono text-[#B5502F] dark:text-[#E8C976] uppercase tracking-wider mb-2">Your Message</label>
          <textarea 
            v-model="form.message"
            rows="5"
            required
            placeholder="Tell me about your software, IoT, or network project..."
            class="w-full bg-[#FAF7F2] dark:bg-[#141414] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-[#2A2421] dark:text-[#F5F0E8] placeholder-[#6E655F]/50 dark:placeholder-[#8A8A8A]/50 focus:outline-none focus:border-[#B5502F] dark:focus:border-[#E8C976] focus-ring transition-colors resize-none"
          ></textarea>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <!-- Submit Button -->
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#B5502F] dark:bg-[#E8C976] text-white dark:text-[#0F0F0F] font-sans font-semibold text-sm sm:text-base hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus-ring"
          >
            <span v-if="isSubmitting">Sending...</span>
            <span v-else class="flex items-center gap-2">
              Send Message ✦
            </span>
          </button>

          <!-- Social Quick Links -->
          <div class="flex items-center gap-3">
            <a 
              href="https://github.com/hazman97" 
              target="_blank" 
              rel="noopener noreferrer"
              class="p-2.5 rounded-full bg-[#F0EBE1] dark:bg-[#242424] text-[#2A2421] dark:text-[#F5F0E8] border border-[#E6E0D4] dark:border-[#333333] hover:text-[#B5502F] dark:hover:text-[#E8C976] transition-all"
              aria-label="GitHub Profile"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/hazman-adanan" 
              target="_blank" 
              rel="noopener noreferrer"
              class="p-2.5 rounded-full bg-[#F0EBE1] dark:bg-[#242424] text-[#2A2421] dark:text-[#F5F0E8] border border-[#E6E0D4] dark:border-[#333333] hover:text-[#B5502F] dark:hover:text-[#E8C976] transition-all"
              aria-label="LinkedIn Profile"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <p v-if="sentSuccess" class="text-xs font-mono text-[#B5502F] dark:text-[#E8C976] text-center pt-2 font-semibold">
          ✨ Thank you! Your message has been received.
        </p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import WavyDivider from './WavyDivider.vue';
import DoodleDecorations from './DoodleDecorations.vue';

const form = reactive({
  name: '',
  email: '',
  message: '',
});

const isSubmitting = ref(false);
const sentSuccess = ref(false);

const sendMessage = () => {
  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    sentSuccess.value = true;
    form.name = '';
    form.email = '';
    form.message = '';
    setTimeout(() => {
      sentSuccess.value = false;
    }, 5000);
  }, 1000);
};
</script>
