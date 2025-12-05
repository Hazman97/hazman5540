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
import BirthdayMaa from "@/views/birthday/BirthdayMaa.vue";
import SubmitWish from "@/views/birthday/SubmitWish.vue";
import Home from "../views/photocollection/HomeCollection.vue";
import CountryView from "../views/photocollection/CountryView.vue";
import LocationView from "../views/photocollection/LocationView.vue";
import UploadView from "../views/photocollection/UploadView.vue";
import topbar from "../views/photocollection/Topbar.vue";
const routes = [
  { path: "/photocollection", name: "HomeCollection", component: Home },
  { path: "/country/:name", name: "CountryView",  components: { default: CountryView, nav: topbar } },
  {
    path: "/country/:name/location/:location",
    name: "LocationView",
    components: { default: LocationView, nav: topbar },
  },
  { path: "/upload", name: "UploadView", component: UploadView },
  // { path: "/upload", name: "Upload", component: PostImage },
  {
    path: "/birthday-maa",
    name: "BirthdayMaa",
    component: BirthdayMaa,
  },
  {
    path: "/birthday-maa/submit",
    name: "SubmitWish",
    component: SubmitWish,
  },
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
      return { top: 0, behavior: "smooth" };
    }
  },
});

export default router;
