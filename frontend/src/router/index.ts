import { createRouter, createWebHistory } from "vue-router";

// Only eagerly import the first-paint portfolio view
import PortfolioView from "../views/portfolio/portfolio.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/portfolio",
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: PortfolioView,
    meta: { title: "Hazman — Portfolio", description: "Personal portfolio and projects showcase" },
  },
  {
    path: "/home",
    name: "home-page",
    component: () => import("../views/HomeView.vue"),
    meta: { title: "Hazman — Home" },
  },
  {
    path: "/about",
    name: "about",
    components: {
      default: () => import("../views/portfolio/about.vue"),
      nav: () => import("../views/portfolio/header.vue"),
    },
    meta: { title: "About — Hazman", description: "About Hazman and his work" },
  },
  {
    path: "/project",
    name: "project",
    components: {
      default: () => import("../views/portfolio/project.vue"),
      nav: () => import("../views/portfolio/header.vue"),
    },
    meta: { title: "Projects — Hazman", description: "Project showcase and portfolio" },
  },
  {
    path: "/contact",
    name: "Contact",
    components: {
      default: () => import("../views/portfolio/contact.vue"),
      nav: () => import("../views/portfolio/header.vue"),
    },
    meta: { title: "Contact — Hazman", description: "Get in touch" },
  },
  {
    path: "/Nav",
    name: "Nav",
    component: () => import("../views/portfolio/header.vue"),
  },
  // === Photo Collection ===
  {
    path: "/photocollection",
    name: "HomeCollection",
    component: () => import("../views/photocollection/HomeCollection.vue"),
    meta: { title: "Photo Collection", description: "Browse photo collections from around the world" },
  },
  {
    path: "/country/:name",
    name: "CountryView",
    components: {
      default: () => import("../views/photocollection/CountryView.vue"),
      nav: () => import("../views/photocollection/Topbar.vue"),
    },
    meta: { title: "Country Photos" },
  },
  {
    path: "/country/:name/location/:location",
    name: "LocationView",
    components: {
      default: () => import("../views/photocollection/LocationView.vue"),
      nav: () => import("../views/photocollection/Topbar.vue"),
    },
    meta: { title: "Location Photos" },
  },
  {
    path: "/upload",
    name: "UploadView",
    component: () => import("../views/photocollection/UploadView.vue"),
    meta: { title: "Upload Photo", description: "Upload photos to the collection" },
  },
  // === Birthday System ===
  {
    path: "/birthday-maa",
    name: "BirthdayMaa",
    component: () => import("@/views/birthday/BirthdayMaa.vue"),
    meta: { title: "Happy Birthday!" },
  },
  {
    path: "/birthday-maa/submit",
    name: "SubmitWish",
    component: () => import("@/views/birthday/SubmitWish.vue"),
    meta: { title: "Submit Birthday Wish" },
  },
  {
    path: "/birthday/create",
    name: "BirthdayCreate",
    component: () => import("@/views/birthday/BirthdayCreate.vue"),
    meta: { title: "Create Birthday Page", description: "Create a personalized birthday celebration page" },
  },
  {
    path: "/b/:slug",
    name: "BirthdayView",
    component: () => import("@/views/birthday/BirthdayView.vue"),
    meta: { title: "Birthday Celebration" },
  },
  {
    path: "/b/:slug/wish",
    name: "BirthdayWish",
    component: () => import("@/views/birthday/SubmitWishPublic.vue"),
    meta: { title: "Send Birthday Wish" },
  },
  {
    path: "/birthday/manage/:id",
    name: "BirthdayManage",
    component: () => import("@/views/birthday/BirthdayManage.vue"),
    meta: { title: "Manage Birthday Page" },
  },
  {
    path: "/birthday/admin",
    name: "BirthdayAdmin",
    component: () => import("@/views/birthday/BirthdayAdmin.vue"),
    meta: { title: "Birthday Admin" },
  },
  // === Organization Chart ===
  {
    path: "/org-demo",
    name: "OrgChartDemo",
    component: () => import("@/views/orgchart/OrgChartDemo.vue"),
    meta: { title: "Org Chart Demo", description: "Interactive organization chart builder" },
  },
  {
    path: "/org/create",
    name: "OrgChartCreate",
    component: () => import("@/views/orgchart/OrgChartCreate.vue"),
    meta: { title: "Create Org Chart" },
  },
  {
    path: "/org/:slug",
    name: "OrgChartView",
    component: () => import("@/views/orgchart/OrgChartView.vue"),
    meta: { title: "Organization Chart" },
  },
  {
    path: "/org/:slug/edit",
    name: "OrgChartEdit",
    component: () => import("@/views/orgchart/OrgChartEdit.vue"),
    meta: { title: "Edit Org Chart" },
  },
  // === E-Claim ===
  {
    path: "/eclaim",
    name: "EClaim",
    component: () => import("@/views/eclaim/EClaimView.vue"),
    meta: { title: "E-Claim System", description: "Electronic claim management system" },
  },
  // === WiFi QR Generator ===
  {
    path: "/wifi-qr",
    name: "WifiQrGenerator",
    component: () => import("@/views/wifi-qr/WifiQrGenerator.vue"),
    meta: { title: "WiFi QR Generator", description: "Generate QR codes for WiFi access" },
  },
  // === Caption Generator ===
  {
    path: "/caption",
    name: "CaptionGenerator",
    component: () => import("@/views/caption/CaptionGenerator.vue"),
    meta: { title: "Penjana Copywriting", description: "Caption generator tool for social media" },
  },
  // === Attendance — Student ===
  {
    path: "/attendance",
    name: "AttendanceStudentLogin",
    component: () => import("@/views/attendance/StudentLogin.vue"),
    meta: { title: "Intern Portal — Login" },
  },
  {
    path: "/attendance/dashboard",
    name: "AttendanceStudentDashboard",
    component: () => import("@/views/attendance/StudentDashboard.vue"),
    meta: { requiresAuth: true, title: "Dashboard — Intern Portal" },
  },
  {
    path: "/attendance/logs",
    name: "AttendanceStudentLogs",
    component: () => import("@/views/attendance/StudentLogs.vue"),
    meta: { requiresAuth: true, title: "Attendance Logs" },
  },
  {
    path: "/attendance/apply-leave",
    name: "ApplyLeave",
    component: () => import("@/views/attendance/ApplyLeave.vue"),
    meta: { requiresAuth: true, title: "Apply Leave" },
  },
  {
    path: "/attendance/leaves",
    name: "LeaveHistory",
    component: () => import("@/views/attendance/LeaveHistory.vue"),
    meta: { requiresAuth: true, title: "Leave History" },
  },
  // === Attendance — Admin ===
  {
    path: "/attendance/admin/login",
    name: "AttendanceAdminLogin",
    component: () => import("@/views/attendance/AdminLogin.vue"),
    meta: { title: "Admin Portal — Login" },
  },
  {
    path: "/attendance/admin",
    component: () => import("@/views/attendance/AdminLayout.vue"),
    meta: { requiresAdmin: true },
    children: [
      {
        path: "",
        redirect: "/attendance/admin/dashboard",
      },
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: () => import("@/views/attendance/AdminDashboard.vue"),
        meta: { title: "Admin Dashboard" },
      },
      {
        path: "students",
        name: "AttendanceStudentManagement",
        component: () => import("@/views/attendance/StudentManagement.vue"),
        meta: { title: "Student Management" },
      },
      {
        path: "settings",
        name: "AdminSettings",
        component: () => import("@/views/attendance/AdminSettings.vue"),
        meta: { title: "Admin Settings" },
      },
      {
        path: "records",
        name: "AttendanceRecords",
        component: () => import("@/views/attendance/AttendanceRecords.vue"),
        meta: { title: "Attendance Records" },
      },
      {
        path: "leaves",
        name: "LeaveRequests",
        component: () => import("@/views/attendance/LeaveRequests.vue"),
        meta: { title: "Leave Requests" },
      },
    ],
  },
  // === Utilities ===
  {
    path: "/todolist",
    name: "todolist",
    component: () => import("@/views/project/todolist.vue"),
    meta: { title: "Todo List" },
  },
  {
    path: "/converter",
    name: "converter",
    component: () => import("@/views/ConverterView.vue"),
    meta: { title: "Converter", description: "Unit conversion utility" },
  },
  {
    path: "/family",
    name: "FamilyView",
    component: () => import("@/views/family/FamilyView.vue"),
    meta: { title: "Keluarga Besar", description: "Family database" },
  },
  {
    path: "/office",
    name: "OfficeView",
    component: () => import("@/views/office/OfficeView.vue"),
    meta: { title: "Senarai Pejabat", description: "Office shirt size list" },
  },
  // === Financial Tracker ===
  {
    path: "/finance",
    name: "FinanceDashboard",
    component: () => import("@/views/finance/FinanceDashboard.vue"),
    meta: { title: "Finance Tracker", requiresAdmin: true },
  },
  // === 404 ===
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/notfoundpage/notfoundpage.vue"),
    meta: { title: "Page Not Found" },
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

// Helper to check the unified Google session
function getUnifiedSession(): Record<string, any> | null {
  try {
    const raw = localStorage.getItem('hazman_user');
    const token = localStorage.getItem('hazman_token');
    if (!raw || !token) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Global RBAC Guard
router.beforeEach((to, from, next) => {
  // Legacy Student Auth (Keeping this separate for interns as requested previously, or if it breaks we can migrate it later)
  const studentSession = localStorage.getItem("attendance_student");
  
  // The new unified session
  const session = getUnifiedSession();

  if (to.meta.requiresSuperadmin) {
    if (!session || !session.is_superadmin) {
      next(`/admin/login?redirect=${to.fullPath}`);
    } else {
      next();
    }
  } else if (to.meta.requiresAdmin) {
    // Determine which project they are trying to access
    let requiredProject = '';
    if (to.path.startsWith('/finance')) requiredProject = 'finance';
    else if (to.path.startsWith('/attendance/admin')) requiredProject = 'attendance_admin';
    else if (to.path.startsWith('/birthday/admin')) requiredProject = 'birthday_admin';

    if (!session) {
      next(`/admin/login?redirect=${to.fullPath}`);
    } else if (session.is_superadmin || (session.permissions && session.permissions.includes(requiredProject))) {
      next(); // Superadmin can access everything, or user has specific permission
    } else {
      // User is logged in but doesn't have permission for this specific project
      alert("You do not have permission to access this project.");
      next(false);
    }
  } else if (to.meta.requiresAuth && !studentSession) {
    next("/attendance");
  } else {
    next();
  }
});

// SEO: Update document title on each navigation
router.afterEach((to) => {
  const defaultTitle = "Hazman — Portfolio";
  document.title = (to.meta.title as string) || defaultTitle;
});
