import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import weather from "../views/weather/weathermainpage.vue";
import portfolio from "../views/portfolio/portfolio.vue";
const routes: Array<RouteRecordRaw> = [
  { path: "/portfolio", name: "portfolio", component: portfolio },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/weather",
    name: "weather",
    component: weather,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
