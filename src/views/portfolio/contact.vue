<template>
  <div class="min-h-screen px-[5%] md:px-[10%] lg:px-[15%] py-20 bg-slate-50 dark:bg-primary transition-colors duration-300 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] -z-10"></div>

    <h2 class="text-4xl md:text-5xl font-bold text-center text-slate-800 dark:text-heading mb-16 font-mono">
      <span class="border-b-4 border-teal-500 dark:border-accent pb-2">Get In Touch</span>
    </h2>

    <div class="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
      <!-- Contact Form -->
      <div class="flex-1 bg-white dark:bg-secondary p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
        <h3 class="text-2xl font-bold text-slate-800 dark:text-heading mb-6">Send a Message</h3>
        <form @submit.prevent="sendEmail" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-600 dark:text-text mb-2">Name</label>
            <input
              type="text"
              v-model="name"
              required
              class="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-700 focus:border-teal-500 dark:focus:border-accent focus:ring-1 focus:ring-teal-500 outline-none transition-all text-slate-800 dark:text-heading"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-600 dark:text-text mb-2">Email</label>
            <input
              type="email"
              v-model="email"
              required
              class="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-700 focus:border-teal-500 dark:focus:border-accent focus:ring-1 focus:ring-teal-500 outline-none transition-all text-slate-800 dark:text-heading"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-600 dark:text-text mb-2">Message</label>
            <textarea
              v-model="message"
              required
              rows="4"
              class="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-700 focus:border-teal-500 dark:focus:border-accent focus:ring-1 focus:ring-teal-500 outline-none transition-all text-slate-800 dark:text-heading resize-none"
              placeholder="Your message here..."
            ></textarea>
          </div>
          
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-4 bg-teal-500 text-white dark:bg-accent dark:text-primary font-bold rounded-lg hover:bg-teal-600 dark:hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            <span v-if="!loading">Send Message</span>
            <svg v-else class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </button>
        </form>
      </div>

      <!-- Contact Info -->
      <div class="lg:w-1/3 space-y-8">
        <div class="bg-white dark:bg-secondary p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
          <h3 class="text-2xl font-bold text-slate-800 dark:text-heading mb-6">Contact Info</h3>
          <div class="space-y-6">
            <a href="mailto:hazman5001@gmail.com" class="flex items-center gap-4 text-slate-600 dark:text-text hover:text-teal-500 dark:hover:text-accent transition-colors group">
              <div class="p-3 bg-teal-500/10 dark:bg-accent/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                <svg class="w-6 h-6 text-teal-500 dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <span class="font-mono text-sm">hazman5001@gmail.com</span>
            </a>
            <a href="https://wa.me/60169333092" target="_blank" class="flex items-center gap-4 text-slate-600 dark:text-text hover:text-teal-500 dark:hover:text-accent transition-colors group">
              <div class="p-3 bg-teal-500/10 dark:bg-accent/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                <svg class="w-6 h-6 text-teal-500 dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <span class="font-mono text-sm">+60 16-933 3092</span>
            </a>
            <div class="flex items-center gap-4 text-slate-600 dark:text-text group">
              <div class="p-3 bg-teal-500/10 dark:bg-accent/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                <svg class="w-6 h-6 text-teal-500 dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <span class="font-mono text-sm">Shah Alam, Selangor</span>
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="bg-white dark:bg-secondary p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
          <h3 class="text-2xl font-bold text-slate-800 dark:text-heading mb-6">Social Network</h3>
          <div class="flex gap-4">
            <a href="https://www.facebook.com/hazman5540" target="_blank" class="p-3 bg-slate-100 dark:bg-primary rounded-lg hover:bg-teal-500 hover:text-white dark:hover:bg-accent dark:hover:text-primary transition-all duration-300">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
            </a>
            <a href="https://www.tiktok.com/@hazman5540" target="_blank" class="p-3 bg-slate-100 dark:bg-primary rounded-lg hover:bg-teal-500 hover:text-white dark:hover:bg-accent dark:hover:text-primary transition-all duration-300">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"></path></svg>
            </a>
            <a href="https://www.instagram.com/hazman_adanan/" target="_blank" class="p-3 bg-slate-100 dark:bg-primary rounded-lg hover:bg-teal-500 hover:text-white dark:hover:bg-accent dark:hover:text-primary transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path><rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke-width="2"></rect></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <transition name="fade">
      <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white dark:bg-secondary p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform transition-all scale-100 text-center">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 class="text-2xl font-bold text-slate-800 dark:text-heading mb-2">Message Sent!</h3>
          <p class="text-slate-600 dark:text-text mb-6">Thanks for reaching out. I'll get back to you soon.</p>
          <button @click="showSuccessModal = false" class="w-full py-3 bg-slate-100 dark:bg-primary text-slate-800 dark:text-heading font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-primary/80 transition-colors">
            Close
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

export default {
  name: "Contact",
  data() {
    return {
      name: "",
      email: "",
      message: "",
      loading: false,
      showSuccessModal: false,
    };
  },
  methods: {
    async sendEmail() {
      this.loading = true;
      try {
        const serviceId = "service_4rlm53k";
        const templateId = "template_hh9ycj9";
        const userId = "RCPfF4lu88RJjCpCV";

        const templateParams = {
          name: this.name,
          email: this.email,
          message: this.message,
        };

        await emailjs.send(serviceId, templateId, templateParams, userId);

        this.showSuccessModal = true;
        this.name = "";
        this.email = "";
        this.message = "";
        
        setTimeout(() => {
          this.showSuccessModal = false;
        }, 3000);
      } catch (error) {
        console.error("Failed to send email:", error);
        alert("Failed to send email. Please try again.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
