<template>
  <section id="contact" class="py-20 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div
      class="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-500/15 to-pink-400/10 rounded-full blur-[100px] animate-pulse"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-teal-500/15 to-cyan-400/10 rounded-full blur-[100px]"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-[120px]"
    ></div>

    <!-- Floating Shapes -->
    <div
      class="absolute top-20 right-20 w-20 h-20 border border-teal-500/20 rounded-lg rotate-12 animate-float-slow"
    ></div>
    <div
      class="absolute bottom-40 left-16 w-16 h-16 border border-purple-500/20 rounded-full animate-float"
    ></div>
    <div
      class="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-teal-500/20 rounded-full animate-float-fast"
    ></div>

    <div
      class="container mx-auto px-[5%] md:px-[10%] lg:px-[15%] relative z-10"
    >
      <!-- Section Header -->
      <div class="text-center mb-16">
        <p class="text-teal-500 dark:text-accent font-mono text-sm mb-2 reveal">
          — Contact —
        </p>
        <h2
          class="text-4xl md:text-5xl font-bold text-slate-800 dark:text-heading reveal"
        >
          Get In <span class="gradient-text">Touch</span>
        </h2>
        <p class="text-slate-500 dark:text-text mt-4 max-w-xl mx-auto reveal">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
        <!-- Contact Form -->
        <div class="lg:col-span-3 reveal">
          <div class="glass-card p-8 md:p-10 rounded-3xl">
            <h3
              class="text-2xl font-bold text-slate-800 dark:text-heading mb-6 flex items-center gap-3"
            >
              <span class="text-2xl">💬</span> Send a Message
            </h3>
            <form @submit.prevent="sendEmail" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    class="block text-sm font-medium text-slate-600 dark:text-text mb-2"
                    >Name</label
                  >
                  <input
                    type="text"
                    v-model="name"
                    required
                    class="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-700 focus:border-teal-500 dark:focus:border-accent focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-800 dark:text-heading font-mono"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-slate-600 dark:text-text mb-2"
                    >Email</label
                  >
                  <input
                    type="email"
                    v-model="email"
                    required
                    class="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-700 focus:border-teal-500 dark:focus:border-accent focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-800 dark:text-heading font-mono"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-slate-600 dark:text-text mb-2"
                  >Subject</label
                >
                <input
                  type="text"
                  v-model="subject"
                  class="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-700 focus:border-teal-500 dark:focus:border-accent focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-800 dark:text-heading font-mono"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-slate-600 dark:text-text mb-2"
                  >Message</label
                >
                <textarea
                  v-model="message"
                  required
                  rows="5"
                  class="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-700 focus:border-teal-500 dark:focus:border-accent focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-800 dark:text-heading resize-none font-mono"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="group relative w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-accent dark:to-cyan-400 text-white dark:text-primary font-bold rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span
                  v-if="!loading"
                  class="relative z-10 flex items-center justify-center gap-2"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                  Send Message
                </span>
                <svg
                  v-else
                  class="animate-spin h-5 w-5 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span
                  class="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-accent/80 dark:to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></span>
              </button>
            </form>
          </div>
        </div>

        <!-- Contact Info Sidebar -->
        <div class="lg:col-span-2 space-y-6 reveal">
          <!-- Contact Details -->
          <div class="glass-card p-8 rounded-3xl">
            <h3
              class="text-xl font-bold text-slate-800 dark:text-heading mb-6 flex items-center gap-2"
            >
              <span class="text-xl">📋</span> Contact Info
            </h3>
            <div class="space-y-5">
              <a
                href="mailto:hazman5001@gmail.com"
                class="flex items-center gap-4 text-slate-600 dark:text-text hover:text-teal-500 dark:hover:text-accent transition-colors group"
              >
                <div
                  class="p-3 bg-gradient-to-br from-teal-500/10 to-cyan-400/10 rounded-xl group-hover:from-teal-500/20 group-hover:to-cyan-400/20 transition-colors"
                >
                  <svg
                    class="w-6 h-6 text-teal-500 dark:text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-slate-400 dark:text-text/50 font-mono">
                    Email
                  </p>
                  <span class="font-mono text-sm">hazman5001@gmail.com</span>
                </div>
              </a>

              <a
                href="https://wa.me/60169333092"
                target="_blank"
                class="flex items-center gap-4 text-slate-600 dark:text-text hover:text-teal-500 dark:hover:text-accent transition-colors group"
              >
                <div
                  class="p-3 bg-gradient-to-br from-green-500/10 to-emerald-400/10 rounded-xl group-hover:from-green-500/20 group-hover:to-emerald-400/20 transition-colors"
                >
                  <svg
                    class="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-slate-400 dark:text-text/50 font-mono">
                    WhatsApp
                  </p>
                  <span class="font-mono text-sm">+60 16-933 3092</span>
                </div>
              </a>

              <div
                class="flex items-center gap-4 text-slate-600 dark:text-text group"
              >
                <div
                  class="p-3 bg-gradient-to-br from-purple-500/10 to-pink-400/10 rounded-xl"
                >
                  <svg
                    class="w-6 h-6 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-slate-400 dark:text-text/50 font-mono">
                    Location
                  </p>
                  <span class="font-mono text-sm">Shah Alam, Selangor</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="glass-card p-8 rounded-3xl">
            <h3
              class="text-xl font-bold text-slate-800 dark:text-heading mb-6 flex items-center gap-2"
            >
              <span class="text-xl">🌐</span> Social
            </h3>
            <div class="flex gap-3">
              <a
                href="https://www.facebook.com/hazman5540"
                target="_blank"
                class="flex-1 p-4 glass rounded-xl text-center hover:bg-blue-500 hover:text-white transition-all duration-300 group"
              >
                <svg
                  class="w-6 h-6 mx-auto group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@hazman5540"
                target="_blank"
                class="flex-1 p-4 glass rounded-xl text-center hover:bg-black hover:text-white transition-all duration-300 group"
              >
                <svg
                  class="w-6 h-6 mx-auto group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/hazman_adanan/"
                target="_blank"
                class="flex-1 p-4 glass rounded-xl text-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 group"
              >
                <svg
                  class="w-6 h-6 mx-auto group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"
                  ></path>
                  <rect
                    width="20"
                    height="20"
                    x="2"
                    y="2"
                    rx="5"
                    ry="5"
                    stroke-width="2"
                  ></rect>
                </svg>
              </a>
              <a
                href="https://github.com/hazman97"
                target="_blank"
                class="flex-1 p-4 glass rounded-xl text-center hover:bg-slate-800 hover:text-white transition-all duration-300 group"
              >
                <svg
                  class="w-6 h-6 mx-auto group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- Availability Status -->
          <div class="glass-card p-6 rounded-3xl">
            <div class="flex items-center gap-3">
              <div class="relative">
                <div
                  class="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                ></div>
                <div
                  class="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"
                ></div>
              </div>
              <span class="text-sm font-mono text-slate-600 dark:text-text"
                >Currently available for freelance work</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <transition name="fade">
      <div
        v-if="showSuccessModal"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <div
          class="glass-card p-8 rounded-3xl max-w-sm w-full text-center transform transition-all scale-100"
        >
          <div
            class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-slate-800 dark:text-heading mb-2">
            Message Sent!
          </h3>
          <p class="text-slate-600 dark:text-text mb-6">
            Thanks for reaching out. I'll get back to you soon.
          </p>
          <button
            @click="showSuccessModal = false"
            class="w-full py-3 glass font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-primary/80 transition-colors text-slate-800 dark:text-heading"
          >
            Close
          </button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import emailjs from "emailjs-com";

export default {
  name: "Contact",
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
      loading: false,
      showSuccessModal: false,
    };
  },
  mounted() {
    this.setupIntersectionObserver();
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
          subject: this.subject,
          message: this.message,
        };

        await emailjs.send(serviceId, templateId, templateParams, userId);

        this.showSuccessModal = true;
        this.name = "";
        this.email = "";
        this.subject = "";
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
    setupIntersectionObserver() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      this.$el.querySelectorAll(".reveal").forEach((el) => {
        observer.observe(el);
      });
    },
  },
};
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
