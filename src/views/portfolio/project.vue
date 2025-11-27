<template>
  <div
    class="min-h-screen px-[5%] md:px-[10%] lg:px-[15%] py-20 bg-slate-50 dark:bg-primary transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto">
      <h1
        class="text-4xl md:text-5xl font-bold text-center text-slate-800 dark:text-heading mb-16 font-mono"
      >
        <span class="border-b-4 border-teal-500 dark:border-accent pb-2"
          >Projects</span
        >
      </h1>

      <!-- Vibe Coder Section -->
      <div class="mb-20">
        <h2
          class="text-3xl font-bold text-slate-800 dark:text-heading mb-8 flex items-center gap-3"
        >
          <span class="text-teal-500 dark:text-accent">✨</span> Vibe Coder
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="(project, index) in vibeCoderProjects"
            :key="index"
            class="group bg-white dark:bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-slate-100 dark:border-slate-800"
            @click="navigateToProject(project.url)"
          >
            <!-- Image Container -->
            <div class="relative h-64 overflow-hidden">
              <div
                class="absolute inset-0 bg-teal-500/20 dark:bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              ></div>
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <!-- Content -->
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <h2
                  class="text-xl font-bold text-slate-800 dark:text-heading group-hover:text-teal-500 dark:group-hover:text-accent transition-colors"
                >
                  {{ project.title }}
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-slate-400 group-hover:text-teal-500 dark:group-hover:text-accent transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
              <p
                class="text-slate-600 dark:text-text text-sm leading-relaxed line-clamp-3"
              >
                {{ project.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Standard Projects Section -->
      <div>
        <h2
          class="text-3xl font-bold text-slate-800 dark:text-heading mb-8 flex items-center gap-3"
        >
          <span class="text-teal-500 dark:text-accent">💻</span> Standard
          Projects
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(project, index) in standardProjects"
            :key="index"
            class="group bg-white dark:bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-slate-100 dark:border-slate-800"
            @click="navigateToProject(project.url)"
          >
            <!-- Image Container -->
            <div class="relative h-48 overflow-hidden">
              <div
                class="absolute inset-0 bg-teal-500/20 dark:bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              ></div>
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <!-- Content -->
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <h2
                  class="text-xl font-bold text-slate-800 dark:text-heading group-hover:text-teal-500 dark:group-hover:text-accent transition-colors"
                >
                  {{ project.title }}
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-slate-400 group-hover:text-teal-500 dark:group-hover:text-accent transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
              <p
                class="text-slate-600 dark:text-text text-sm leading-relaxed line-clamp-3"
              >
                {{ project.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Project",
  data() {
    return {
      vibeCoderProjects: [
        {
          image: "/img/confession_bot.png",
          title: "Confession Bot",
          description:
            "An anonymous confession bot for Discord servers. Allows users to submit confessions anonymously to specified channels.",
          url: "https://hazman97.github.io/confession_bot/",
        },
        {
          image: "/img/restaurant_pos.png",
          title: "Restaurant POS System",
          description:
            "A modern Point of Sale system for restaurants, featuring order management, menu customization, and sales tracking.",
          url: "https://ai.studio/apps/drive/1tJn3zeR29PWV4KiSQVXq0cQbwwsUUUKW",
        },
      ],
      standardProjects: [
        {
          image:
            "https://lh3.googleusercontent.com/pw/AP1GczOM_4ZSYKloc9t-F4PaoW0b9f9hXPtyxbLPoKOUgHkAgweKt96a989MlFlreeZyahfJQxQR5XTOFvyZseXKr6hnotvGl39nvVJ90diEya0Dc5k3bl5u0KZxUict_uFRG9ybMFqtGrQkSY60tDMfaRRRAg=w651-h869-s-no-gm?authuser=3",
          title: "Photo Collection",
          description:
            "I enjoy photography, traveling, and creating wonderful memories. A curated collection of my best shots from various locations.",
          url: "/photocollection",
        },
        {
          image:
            "https://lh3.googleusercontent.com/pw/AP1GczMNCIpsHKnLpnA9qz05eUZXfJMrNeuY4MeN-gDF7jAdiCZNsk_rGOsPjZ-U2B5fL3QlsOrystGYZ8abKnxJmFIs4Z3Qrk4nWnIYs6BKgmJvBTo8sqUY8Sh3XrJvlHfFgU_1rx456dhbnGdYcpOrsmSL=w1848-h786-s-no-gm?authuser=0",
          title: "Tasmik System",
          description:
            "A comprehensive system for schools to manage student records, tasmik progress, attendance, and user roles. Built with Vue.js and Tailwind CSS.",
          url: "https://tasmik-system.vercel.app/",
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzA1eTueMtWXI_QdH-kABhfcfaxHAot5v0Q&s",
          title: "Safety Portal",
          description:
            "A centralized portal for managing security and safety protocols, incident reporting, and compliance tracking.",
          url: "#",
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzA1eTueMtWXI_QdH-kABhfcfaxHAot5v0Q&s",
          title: "Organization Chart",
          description:
            "Interactive organization chart visualization tool helping teams understand structure and hierarchy.",
          url: "#",
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzA1eTueMtWXI_QdH-kABhfcfaxHAot5v0Q&s",
          title: "E-Claim System",
          description:
            "Streamlined expense claim management system allowing employees to submit and track claims efficiently.",
          url: "#",
        },
      ],
    };
  },
  methods: {
    navigateToProject(url) {
      if (url === "#") return;

      if (this.isExternalLink(url)) {
        window.open(url, "_blank");
      } else {
        this.$router.push(url);
      }
    },
    isExternalLink(url) {
      return url.startsWith("http");
    },
  },
};
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>
