<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

    <div class="w-full max-w-md relative z-10">
      <div class="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 sm:p-10">
        
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-white mb-2">System Login</h2>
          <p class="text-slate-400 text-sm">Secure access using your authorized Google account</p>
        </div>

        <div v-if="error" class="mb-6 p-4 bg-rose-500/20 border border-rose-500/50 rounded-xl text-rose-200 text-sm flex items-start gap-3">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>{{ error }}</span>
        </div>

        <div class="flex flex-col items-center gap-4">
          <GoogleLogin 
            :callback="handleGoogleCallback"
            :buttonConfig="{ theme: 'filled_black', size: 'large', shape: 'pill', width: '280' }"
          />
          <div v-if="loading" class="text-slate-400 text-sm animate-pulse mt-2">Authenticating...</div>
        </div>
      </div>
      
      <!-- Footer Info -->
      <div class="mt-8 text-center text-slate-500 text-xs flex justify-center items-center gap-2">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        <span>Role-Based Access Control Active</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { api, setAuthToken, setStoredUser } from '@/api/client';

const router = useRouter();
const route = useRoute();
const error = ref('');
const loading = ref(false);

const handleGoogleCallback = async (response) => {
  loading.value = true;
  error.value = '';
  try {
    const res = await api.post('/auth/google', {
      idToken: response.credential
    });

    if (res.token) {
      setAuthToken(res.token);
      setStoredUser(res.user);
      
      // Calculate where to redirect based on permissions or intended route
      const redirectPath = route.query.redirect || '/';
      
      // If they are superadmin and logged in from the generic login without a specific redirect, send to management
      if (res.user.is_superadmin && (!route.query.redirect || route.query.redirect === '/')) {
        router.push('/system-admin');
      } 
      // If they only have one project permission, auto-route them there if there's no specific redirect
      else if (res.user.permissions.length === 1 && (!route.query.redirect || route.query.redirect === '/')) {
        const p = res.user.permissions[0];
        if (p === 'finance') router.push('/finance');
        else if (p === 'attendance_admin') router.push('/attendance/admin');
        else router.push(redirectPath);
      } else {
        router.push(redirectPath);
      }
    }
  } catch (e) {
    error.value = e.message || 'Authentication failed. Make sure your email is authorized by an administrator.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
</style>
