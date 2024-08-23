<template>
    <div class="px-[15%] h-screen dark:bg-[#0a192f] z-10">
      <div>
        <h1 class="text-4xl capitalize text-center font-semibold dark:text-[#ccd6f6] mb-10">projects</h1>
  
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="border border-gray-300 dark:border-slate-400 dark:hover:border-teal-300 mt-5 rounded-lg flex flex-col sm:flex-col md:flex-row p-3 "
        >
          <div>
            <img
              :src="project.image"
              alt=""
              class="w-60 h-40 rounded-full object-cover z-10"
            />
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
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzA1eTueMtWXI_QdH-kABhfcfaxHAot5v0Q&s",
          title: "security and safety portal",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod, voluptates, quae, quos quidem quia quibusdam dolorum consequuntur"
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzA1eTueMtWXI_QdH-kABhfcfaxHAot5v0Q&s",
          title: "organization cart",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod, voluptates, quae, quos quidem quia quibusdam dolorum consequuntur"
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzA1eTueMtWXI_QdH-kABhfcfaxHAot5v0Q&s",
          title: "e-claim",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod, voluptates, quae, quos quidem quia quibusdam dolorum consequuntur"
        },
        // Add more project objects here
      ]
    };
  },
  methods: {
    // Your methods go here
  },
  mounted() {
    // Code to run when the component is mounted
  },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>
