<template>
  <div class="relative">
    <navpage class=" sticky top-0 z-50 " />
<home/>
    <about class="container" />
    <project class="" />
     <section id="contact">
      <contact />
    </section>
   
  </div>
</template>

<script>
import project from "./project.vue";
import navpage from "./header.vue";
import contact from "./contact.vue";
import about from "./about.vue";
import home from "./home.vue";

export default {
  name: "Portfolio",
  // Add your component logic here
  components: {
    navpage,
    contact,
    project,
    about,
    home
  },
};
</script>
