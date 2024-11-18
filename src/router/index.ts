import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PortfolioView from "../views/portfolio/portfolio.vue";
import Nav from "../views/portfolio/header.vue"; // Import the Nav component
import Contact from "../views/portfolio/contact.vue"; // Import the Contact component
import about from "../views/portfolio/about.vue"; // Import the About component
import project from "../views/portfolio/project.vue"; // Import the Project component4
import organizationChart from "../views/project/organizationchart.vue";
import NotFound from "../views/notfoundpage/notfoundpage.vue";
import todolist from "@/views/project/todolist.vue";
import PostImage from "@/views/photo_collection/PostImage.vue";
const routes = [
  { path: "/upload", name: "Upload", component: PostImage },
  {
    path: "/",
    name: "todolist",
    component: todolist,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/Nav",
    name: "Nav",
    component: Nav,
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: PortfolioView,
  },
  {
    path: "/contact",
    name: "Contact",
    components: {
      default: Contact, // This is the default view
      nav: Nav, // This is the named view
    },
  },
  {
    path: "/project",
    name: "project",
    components: {
      default: project, // This is the default view
      nav: Nav, // This is the named view
    },
  },
  {
    path: "/organization-chart",
    name: "organizationChart",
    components: organizationChart,
  },
  {
    path: "/about",
    name: "about",
    components: {
      default: about, // This is the default view
      nav: Nav, // This is the named view
    },
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
