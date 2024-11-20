<template>
  <div>
    <router-view name="nav"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { inject } from "vue"; // Import Vue utilities
import { Analytics } from "@vercel/analytics";

export default {
  name: "App",
  setup() {
    // Call Analytics as a side effect
    inject(() => {
      Analytics();
    });
  },
};
</script>
