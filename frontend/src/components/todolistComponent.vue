<template>
  <div class="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold text-center mb-4">To-Do List</h1>
    
    <form @submit.prevent="addTodo" class="flex mb-4">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Enter a task"
        class="flex-1 border border-gray-300 p-2 rounded-l-md"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-r-md"
      >
        Add
      </button>
    </form>
    
    <ul>
      <li v-for="(todo, index) in todos" :key="index" class="flex items-center justify-between mb-2">
        <span :class="{'line-through': todo.completed}">
          {{ todo.text }}
        </span>
        <button @click="toggleComplete(index)" class="text-green-500">
          {{ todo.completed ? 'Undo' : 'Complete' }}
        </button>
        <button @click="deleteTodo(index)" class="text-red-500">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const todos = ref<{ text: string; completed: boolean }[]>([]);
    const newTodo = ref<string>('');
    

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({ text: newTodo.value, completed: false });
        newTodo.value = '';
      }
    };

    const toggleComplete = (index: number) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const deleteTodo = (index: number) => {
      todos.value.splice(index, 1);
    };

    return {
      todos,
      newTodo,
      addTodo,
      toggleComplete,
      deleteTodo,
    };
  },
});
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
