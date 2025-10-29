<template>
  <div class="px-[15%]">
    <div class="container ">
      <div class="relative z-20">
        <div
          class="absolute w-[800px] h-[500px] bg-blue-500/20 rounded-full top-0 right-0 blur-[100px]"
        ></div>
      </div>
    </div>
    <div class="flex flex-col z-1 justify-center px-[10%] z-20 relative">
      <p
        class="text-teal-300 font-bold uppercase text-6xl dark:text-blue-200 mt-20 text-pretty"
      >
        welcome! I'M HAZMAN ADANAN
      </p>

      <p class="text-slate-600 dark:text-blue-100 text-pretty text-xl mt-5">
        A Programmer with a Strong Background in IT Support and Networking.
      </p>
      <p class="text-slate-600 dark:text-blue-100 text-pretty text-md mt-5">
        Beyond just coding, I have a strong interest in IT support, desktop
        support, and networking. My diverse experience ensures that the software
        I develop is both efficient and well-supported by the underlying
        infrastructure. I believe in a comprehensive approach to technology,
        where every piece of the puzzle fits perfectly.
      </p>
    </div>
    <div class="flex justify-center items-center mt-10 gap-10 z-20 relative">
      <router-link to="/portfolio#contact" class="p-2 rounded-lg">
      <button
        class="bg-none dark:text-purple-200 capitalize border font-semibold border-teal-500 py-2 px-4 rounded-full hover:bg-teal-500 hover:text-white dark:hover:text-white dark:hover:bg-teal-500"
      >
        Contact Me
      </button>
    </router-link>
      <button @click="downloadResume"
        class="bg-gradient-to-r text-white dark:bg-gradient-to-r dark:from-teal-700 from-teal-500 to-teal-300 font-semibold dark:text-purple-200 capitalize border border-teal-500 py-2 px-4 rounded-full"
      >
        get my resume
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  // Your component's logic goes here


  methods: {
    // Your methods go here
    downloadResume() {
  const link = document.createElement('a');
  link.href = '/Hazman_resume_OCT2025.pdf'; // Path to the file in the public directory
  link.download = 'Hazman_Resume.pdf';
  link.click();
}
  },
};


</script>
