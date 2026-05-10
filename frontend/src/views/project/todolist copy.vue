<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <TodoList />
    </div>
  </template>
  
  <script lang="ts">
  import TodoList from '@/components/todolistComponent.vue';
  
  export default {
    components: {
      TodoList,
    },
  };
  </script>
  
  <style>
  body {
    @apply bg-gray-100;
  }
  </style>
  