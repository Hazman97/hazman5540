<template>
    <div class="px-[15%] dark:bg-[#0a192f]">
      <div>
        <h1 class="text-4xl capitalize text-center font-semibold dark:text-[#ccd6f6] mb-10">projects</h1>
  
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="border border-gray-300 dark:border-slate-400 dark:hover:border-teal-300 mt-5 rounded-lg flex flex-col sm:flex-col md:flex-row p-3 "
         @click="navigateToProject(project.url)"  >
          <div>
            <a :href="project.url" target="_blank">
              <img
              :src="project.image"
              alt=""
              class="w-60 h-40 rounded object-cover hover:object-none z-10 transition-all delay-100 duration-300 ease-in-out transform hover:scale-105"
              />
            </a>
          </div>
          <div>
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
      window.location.href = url;
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
