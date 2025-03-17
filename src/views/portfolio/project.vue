<template>
  <div class="px-[15%] dark:bg-[#0a192f]">
    <div>
      <h1 class="text-4xl capitalize text-center font-semibold dark:text-[#ccd6f6] mb-10">projects</h1>

      <div
        v-for="(project, index) in projects"
        :key="index"
        class="border border-gray-300 dark:border-slate-400 dark:hover:border-teal-300 mt-5 rounded-lg flex flex-col sm:flex-col md:flex-row p-3"
        @click="navigateToProject(project.url)"
      >
        <div class="flex-shrink-0">
          <img
            :src="project.image"
            alt=""
            class="w-60 h-40 rounded object-cover hover:object-none z-10 transition-all delay-100 duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
        <div class="flex-grow">
          <h2 class="text-2xl font-semibold p-2 dark:text-[#ccd6f6]">{{ project.title }}</h2>
          <p class="text-gray-500 p-2 dark:text-slate-400">{{ project.description }}</p>
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
      // Your data properties go here
      projects: [
      {
          image: "https://lh3.googleusercontent.com/pw/AP1GczOM_4ZSYKloc9t-F4PaoW0b9f9hXPtyxbLPoKOUgHkAgweKt96a989MlFlreeZyahfJQxQR5XTOFvyZseXKr6hnotvGl39nvVJ90diEya0Dc5k3bl5u0KZxUict_uFRG9ybMFqtGrQkSY60tDMfaRRRAg=w651-h869-s-no-gm?authuser=3",
            title: "Photo Collection",
            description: "I enjoy photography, traveling, and creating wonderful memories.",
            url: "/photocollection"
        },
        {
          image: "https://lh3.googleusercontent.com/pw/AP1GczMNCIpsHKnLpnA9qz05eUZXfJMrNeuY4MeN-gDF7jAdiCZNsk_rGOsPjZ-U2B5fL3QlsOrystGYZ8abKnxJmFIs4Z3Qrk4nWnIYs6BKgmJvBTo8sqUY8Sh3XrJvlHfFgU_1rx456dhbnGdYcpOrsmSL=w1848-h786-s-no-gm?authuser=0",
            title: "Tasmik Record Management System",
            description: "A system for schools to manage student records, tasmik progress, attendance, and user roles with a responsive Tailwind CSS frontend. username: hazman | password: test123",
            url: "https://tasmik-system.vercel.app/"
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzA1eTueMtWXI_QdH-kABhfcfaxHAot5v0Q&s",
          title: "Security and Safety Portal",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod, voluptates, quae, quos quidem quia quibusdam dolorum consequuntur"
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzA1eTueMtWXI_QdH-kABhfcfaxHAot5v0Q&s",
          title: "Organization Cart",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod, voluptates, quae, quos quidem quia quibusdam dolorum consequuntur"
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzA1eTueMtWXI_QdH-kABhfcfaxHAot5v0Q&s",
          title: "E-Claim",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod, voluptates, quae, quos quidem quia quibusdam dolorum consequuntur"
        },
        // Add more project objects here
      ]
    };
  },
  methods: {
    navigateToProject(url) {
      if (this.isExternalLink(url)) {
        window.open(url, "_blank"); // Open external links in a new tab
      } else {
        this.$router.push(url); // Navigate internal links within Vue Router
      }
    },
    isExternalLink(url) {
      return url.startsWith("http");
    }
  },
  mounted() {
    // Code to run when the component is mounted
  },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>
