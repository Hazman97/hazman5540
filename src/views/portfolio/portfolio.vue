<template>
    <navpage class="relative z-10"/>


    <contact/>
 
</template>

<script>
import navpage from './header.vue'
import contact from './contact.vue'

export default {
    name: 'Portfolio',
    // Add your component logic here
    components:{
        navpage,
        contact
    }

}
</script>