import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';


import PortfolioView from '../views/portfolio/portfolio.vue';
import Nav from '../views/portfolio/header.vue'; // Import the Nav component
import Contact from '../views/portfolio/contact.vue'; // Import the Contact component

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/Nav',
    name: 'Nav',
    component: Nav,
  },

  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioView,
  },
  {
    path: "/contact",
    name: "Contact",
    components: {
      default: Contact,  // This is the default view
      nav: Nav,          // This is the named view
    },
  },
 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;