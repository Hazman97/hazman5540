<template>
  <div class="relative">
    <navpage class="z-100 sticky top-0" />
<home/>
    <about />
    <project class=" z-10" />
    <contact />
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
