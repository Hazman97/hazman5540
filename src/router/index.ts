import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PortfolioView from "../views/portfolio/portfolio.vue";
import Nav from "../views/portfolio/header.vue"; // Import the Nav component
import Contact from "../views/portfolio/contact.vue"; // Import the Contact component
import about from "../views/portfolio/about.vue"; // Import the About component
import project from "../views/portfolio/project.vue"; // Import the Project component4
import NotFound from "../views/notfoundpage/notfoundpage.vue";
import todolist from "@/views/project/todolist.vue";
import PostImage from "@/views/photo_collection/PostImage.vue";
import BirthdayMaa from "@/views/birthday/BirthdayMaa.vue";
import SubmitWish from "@/views/birthday/SubmitWish.vue";
// New multi-user birthday components
import BirthdayCreate from "@/views/birthday/BirthdayCreate.vue";
import BirthdayView from "@/views/birthday/BirthdayView.vue";
import BirthdayManage from "@/views/birthday/BirthdayManage.vue";
import SubmitWishPublic from "@/views/birthday/SubmitWishPublic.vue";
import BirthdayAdmin from "@/views/birthday/BirthdayAdmin.vue";
import Home from "../views/photocollection/HomeCollection.vue";
import CountryView from "../views/photocollection/CountryView.vue";
import LocationView from "../views/photocollection/LocationView.vue";
import UploadView from "../views/photocollection/UploadView.vue";
import topbar from "../views/photocollection/Topbar.vue";
// Organization Chart components
import OrgChartDemo from "@/views/orgchart/OrgChartDemo.vue";
import OrgChartCreate from "@/views/orgchart/OrgChartCreate.vue";
import OrgChartView from "@/views/orgchart/OrgChartView.vue";
import OrgChartEdit from "@/views/orgchart/OrgChartEdit.vue";
// E-Claim System
import EClaimView from "@/views/eclaim/EClaimView.vue";
// WiFi QR Generator
import WifiQrGenerator from "@/views/wifi-qr/WifiQrGenerator.vue";
// Intern Attendance System
import AttendanceAdminLogin from "@/views/attendance/AdminLogin.vue";
import AttendanceAdminDashboard from "@/views/attendance/AdminDashboard.vue";
import AttendanceStudentManagement from "@/views/attendance/StudentManagement.vue";
import AttendanceRecords from "@/views/attendance/AttendanceRecords.vue";
import AdminSettings from "@/views/attendance/AdminSettings.vue";
import AttendanceStudentLogin from "@/views/attendance/StudentLogin.vue";
import AttendanceStudentDashboard from "@/views/attendance/StudentDashboard.vue";
import AttendanceStudentLogs from "@/views/attendance/StudentLogs.vue";
import AdminLayout from "@/views/attendance/AdminLayout.vue";

const routes = [
  { path: "/photocollection", name: "HomeCollection", component: Home },
  {
    path: "/country/:name",
    name: "CountryView",
    components: { default: CountryView, nav: topbar },
  },
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
    path: "/todolist",
    name: "todolist",
    component: todolist,
  },
  {
    path: "/",
    name: "home",
    redirect: "/portfolio",
  },
  {
    path: "/home",
    name: "home-page",
    component: HomeView,
  },
  {
    path: "/converter",
    name: "converter",
    component: () => import("@/views/ConverterView.vue"),
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
  // === Organization Chart System Routes ===
  {
    path: "/org-demo",
    name: "OrgChartDemo",
    component: OrgChartDemo,
  },
  {
    path: "/org/create",
    name: "OrgChartCreate",
    component: OrgChartCreate,
  },
  {
    path: "/org/:slug",
    name: "OrgChartView",
    component: OrgChartView,
  },
  {
    path: "/org/:slug/edit",
    name: "OrgChartEdit",
    component: OrgChartEdit,
  },
  // === E-Claim System Routes ===
  {
    path: "/eclaim",
    name: "EClaim",
    component: EClaimView,
  },
  {
    path: "/about",
    name: "about",
    components: {
      default: about, // This is the default view
      nav: Nav, // This is the named view
    },
  },
  // === Multi-User Birthday System Routes ===
  {
    path: "/birthday/create",
    name: "BirthdayCreate",
    component: BirthdayCreate,
  },
  {
    path: "/b/:slug",
    name: "BirthdayView",
    component: BirthdayView,
  },
  {
    path: "/b/:slug/wish",
    name: "BirthdayWish",
    component: SubmitWishPublic,
  },
  {
    path: "/birthday/manage/:id",
    name: "BirthdayManage",
    component: BirthdayManage,
  },
  {
    path: "/birthday/admin",
    name: "BirthdayAdmin",
    component: BirthdayAdmin,
  },
  // === WiFi QR Generator ===
  {
    path: "/wifi-qr",
    name: "WifiQrGenerator",
    component: WifiQrGenerator,
  },
  // === Intern Attendance System ===
  {
    path: "/attendance",
    name: "AttendanceStudentLogin",
    component: AttendanceStudentLogin,
  },
  {
    path: "/attendance/dashboard",
    name: "AttendanceStudentDashboard",
    component: AttendanceStudentDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/attendance/logs",
    name: "AttendanceStudentLogs",
    component: AttendanceStudentLogs,
    meta: { requiresAuth: true },
  },
  // Admin Routes
  {
    path: "/attendance/admin/login",
    name: "AttendanceAdminLogin",
    component: AttendanceAdminLogin,
  },
  {
    path: "/attendance/admin",
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      {
        path: "",
        redirect: "/attendance/admin/dashboard",
      },
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: AttendanceAdminDashboard,
      },
      {
        path: "students",
        name: "AttendanceStudentManagement",
        component: AttendanceStudentManagement,
      },
      {
        path: "settings",
        name: "AdminSettings",
        component: AdminSettings,
      },
      {
        path: "records",
        name: "AttendanceRecords",
        component: AttendanceRecords,
      },
    ],
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

router.beforeEach((to, from, next) => {
  const adminAuthenticated = localStorage.getItem("attendance_admin");
  const studentAuthenticated = localStorage.getItem("attendance_student");

  if (to.meta.requiresAdmin && !adminAuthenticated) {
    next("/attendance/admin/login");
  } else if (to.meta.requiresAuth && !studentAuthenticated) {
    next("/attendance");
  } else {
    next();
  }
});
