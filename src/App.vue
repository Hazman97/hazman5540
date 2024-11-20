<template>
  <div>
    <router-view name="nav"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { injectAnalytics } from "@vercel/analytics";

export default {
  name: "App",
  mounted() {
    injectAnalytics(); // This initializes Vercel Analytics
  },
};
</script>

