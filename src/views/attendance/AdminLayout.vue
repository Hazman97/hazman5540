<template>
  <div
    class="min-h-screen bg-slate-900 flex text-white font-sans overflow-hidden"
  >
    <!-- Mobile Sidebar Backdrop -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 bg-slate-800 border-r border-white/5 transition-transform duration-300 flex flex-col w-64',
        sidebarOpen
          ? 'translate-x-0'
          : '-translate-x-full lg:translate-x-0 lg:static',
      ]"
    >
      <!-- Brand -->
      <div class="h-20 flex items-center gap-3 px-6 border-b border-white/5">
        <div
          class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20"
        >
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <span class="font-bold text-lg tracking-tight">Admin System</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <router-link
          to="/attendance/admin/dashboard"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all group"
          active-class="bg-blue-600 shadow-lg shadow-blue-900/20 text-white"
          :class="
            !$route.path.includes('dashboard')
              ? 'text-slate-400 hover:text-white hover:bg-white/5'
              : ''
          "
          @click="sidebarOpen = false"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
          Overview
        </router-link>

        <router-link
          to="/attendance/admin/students"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all group"
          active-class="bg-blue-600 shadow-lg shadow-blue-900/20 text-white"
          :class="
            !$route.path.includes('students')
              ? 'text-slate-400 hover:text-white hover:bg-white/5'
              : ''
          "
          @click="sidebarOpen = false"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          Students
        </router-link>

        <router-link
          to="/attendance/admin/records"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all group"
          active-class="bg-blue-600 shadow-lg shadow-blue-900/20 text-white"
          :class="
            !$route.path.includes('records')
              ? 'text-slate-400 hover:text-white hover:bg-white/5'
              : ''
          "
          @click="sidebarOpen = false"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Records
        </router-link>

        <router-link
          to="/attendance/admin/settings"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all group"
          active-class="bg-blue-600 shadow-lg shadow-blue-900/20 text-white"
          :class="
            !$route.path.includes('settings')
              ? 'text-slate-400 hover:text-white hover:bg-white/5'
              : ''
          "
          @click="sidebarOpen = false"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Settings
        </router-link>
      </nav>

      <!-- Logout -->
      <div class="mt-auto p-4 border-t border-white/5">
        <button
          @click="handleLogout"
          class="flex items-center gap-3 px-4 py-3 text-rose-400 hover:text-white hover:bg-rose-500/10 rounded-xl transition-all w-full group"
        >
          <svg
            class="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Bar (Mobile Only) -->
      <header
        class="lg:hidden h-16 bg-slate-800 border-b border-white/5 flex items-center px-4 justify-between"
      >
        <button @click="sidebarOpen = true" class="text-white p-2">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span class="font-bold text-white">Admin System</span>
        <div class="w-8"></div>
        <!-- Spacer -->
      </header>

      <!-- Page Content -->
      <main
        class="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-900 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-700"
      >
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const sidebarOpen = ref(false);

function handleLogout() {
  localStorage.removeItem("attendance_admin");
  router.push("/attendance/admin");
}
</script>
