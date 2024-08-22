<template>
  <div class="px-[15%] h-screen dark:bg-[#0a192f]">
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
          <img src="/test.png" alt="" class="w-60 h-60 object-cover mx-auto" />
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
