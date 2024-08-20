<template>
<main>
  <div class="text-center mb-6 mt-10 font-semibold">{{ new Date().toLocaleDateString('en-us',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric' 
  }) }}</div>
<div>  <searchinput/>
</div>

</main>

  
</template>

<script>
import searchinput from '../weather/searchinput.vue'
export default {
  name: 'AboutView',
  // Add your component logic here
  components:{
    searchinput
  }

}
</script>

<style scoped>
/* Add your component styles here */
</style>