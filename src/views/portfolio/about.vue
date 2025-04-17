<template>
  <div class="px-[15%] min-h-screen dark:bg-[#0a192f]">
    <div class="py-10">
      <h2
        class="font-semibold text-center text-4xl capitalize text-black dark:text-[#ccd6f6] mb-5"
      >
        about me
      </h2>

      <div class="flex flex-col sm:flex-col md:flex-row  items-center justify-center ">
        <div class="text-pretty space-y-4 dark:text-slate-400 sm:text-sm md:text-lg lg:text-xl xl:text-xl">
          <p>
            I'm a front-end enthusiast gaining practical experience in the
            field. After completing an internship, I've transitioned into a role
            as a Front End Developer. Passionate about web development,
          </p>
          <p>I'm also
            intrigued by networking and computer support technology. With a
            solid foundation in these areas and a commitment to ongoing
            learning, </p>
            <p> I'm eager to explore opportunities that allow me to
                contribute to front-end development or IT support roles.</p>
        </div>
        <div class="w-full py-10">
          <img src="/test.png" alt="" class="w-60 h-60 object-cover mx-auto rounded-md" />
        </div>
      </div>
      <div class=" relative rounded-3xl  ">
        <div class="absolute rounded-3xl h-[20rem] top-10 w-full bg-slate-200 py-2 px-2 dark:bg-blue-500/20 blur-[100px]">

        </div>
        <div class="relative">
        <h1 class="capitalize text-xl font-semibold text-teal-500 "> Skills</h1>
        <p class="capitalize text-lg font-semibold dark:text-[#ccd6f6] mt-5">stacks used</p>
        
        <div class="grid md:grid-cols-4 mt-3 sm:grid-col-1 gap-3">
          <div class="text-slate-500 dark:text-white flex flex-col text-xs font-mono  gap-3 ">
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100">TYPESCRIPT</p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100">HTML (<span class="text-teal-500">intermediate</span>)</p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100">JAVA (<span class="text-teal-500">basic</span>)</p>
          </div>
          <div class="text-slate-500 dark:text-white flex flex-col text-xs font-mono  gap-3">
            <p class="hover:font-sans hover:text-slate-600  dark:hover:text-teal-100 ">VUE JS (<span class="text-teal-500">intermediate</span>)</p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100">TAILWINDS (<span class="text-teal-500">intermediate</span>)</p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100">JAVASCRIPT (<span class="text-teal-500">basic</span>)</p>
          </div>
          <div class="text-slate-500 dark:text-white flex flex-col text-xs font-mono  gap-3">
            <p class="hover:font-sans hover:text-slate-600  dark:hover:text-teal-100 ">PHP (<span class="text-teal-500">basic</span>)</p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100">MySQL (<span class="text-teal-500">basic</span>)</p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100"></P>
          </div>
          <div class="text-slate-500 dark:text-white flex flex-col text-xs font-mono  gap-3">
            <p class="hover:font-sans hover:text-slate-600  dark:hover:text-teal-100 ">Nginx (<span class="text-teal-500">basic</span>)</p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100">IIS (<span class="text-teal-500">basic</span>)</p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100"> Cloudflare Tunnel (<span class="text-teal-500">basic</span>)</p>
          </div>
        </div>
        <p class="capitalize text-lg font-semibold dark:text-[#ccd6f6] mt-5">software</P>
        <div class="grid md:grid-cols-3 mt-3 sm:grid-col-1 gap-3">
          <div class="text-slate-500 dark:text-white flex flex-col text-xs font-mono  gap-3">
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100">Photoshop (<span class="text-teal-500">basic</span>)</p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100">Premier Pro (<span class="text-teal-500">basic</span>)</p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100">Capcut (<span class="text-teal-500">basic</span>)</p>
          </div>
          <div class="text-slate-500 dark:text-white flex flex-col text-xs font-mono  gap-3">
            <p class="hover:font-sans hover:text-slate-600  dark:hover:text-teal-100 "></p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100"></p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100"></p>
          </div>
          <div class="text-slate-500 dark:text-white flex flex-col text-xs font-mono  gap-3">
            <p class="hover:font-sans hover:text-slate-600  dark:hover:text-teal-100 "></p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100"></p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100"></p>
          </div>
        </div>
        <p class="capitalize text-lg font-semibold dark:text-[#ccd6f6] mt-5">Technical Skills</p>
        <div class="grid md:grid-cols-3 mt-3 sm:grid-col-1 gap-3">
          <div class="text-slate-500 dark:text-white flex flex-col text-xs font-mono  gap-3">
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100">PC Repair/Customization</p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100">Network Setup</p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100">IT Support </p>
          </div>
          <div class="text-slate-500 dark:text-white flex flex-col text-xs font-mono  gap-3">
            <p class="hover:font-sans hover:text-slate-600  dark:hover:text-teal-100 ">Desktop Support</p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100"></p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100"></p>
          </div>
          <div class="text-slate-500 dark:text-white flex flex-col text-xs font-mono  gap-3">
            <p class="hover:font-sans hover:text-slate-600  dark:hover:text-teal-100 "></p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100"></p>
            <p class="hover:font-sans hover:text-slate-600 dark:hover:text-teal-100"></p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  // Add your component's logic here
};
</script>

<style scoped>
/* Add your component's styles here */
</style>
