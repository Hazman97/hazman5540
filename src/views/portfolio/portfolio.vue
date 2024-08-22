<template>
    <navpage class="relative z-10"/>

    <about/>
<project class="relative z-10"/>
    <contact/>
  
 
</template>

<script>
import project from './project.vue'
import navpage from './header.vue'
import contact from './contact.vue'
import about from './about.vue'

export default {
    name: 'Portfolio',
    // Add your component logic here
    components:{
        navpage,
        contact,
        project,
        about
    }

}
</script>