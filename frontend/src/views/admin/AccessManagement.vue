<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
    <!-- Header -->
    <header class="bg-indigo-600 text-white p-6 shadow-md sticky top-0 z-10">
      <div class="flex justify-between items-center max-w-5xl mx-auto">
        <h1 class="text-xl font-bold tracking-tight">Access Management</h1>
        <div class="text-sm opacity-80 flex items-center gap-2">
          <img v-if="currentUser?.picture" :src="currentUser.picture" class="w-6 h-6 rounded-full" />
          <span>{{ currentUser?.name || 'Superadmin' }}</span>
        </div>
      </div>
    </header>

    <main class="p-4 max-w-5xl mx-auto space-y-6 mt-4">
      
      <!-- Add User Section -->
      <section class="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-4">Authorize New User</h2>
        <form @submit.prevent="addUser" class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Google Email Address</label>
            <input v-model="newUserEmail" type="email" required class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="colleague@gmail.com" />
          </div>
          <div class="flex-1">
            <label class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Name (Optional)</label>
            <input v-model="newUserName" type="text" class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="John Doe" />
          </div>
          <div class="flex items-end">
            <button type="submit" :disabled="loadingAdd" class="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition">
              {{ loadingAdd ? 'Adding...' : 'Add User' }}
            </button>
          </div>
        </form>
        <div v-if="addError" class="mt-2 text-rose-500 text-xs">{{ addError }}</div>
      </section>

      <!-- User List -->
      <section class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div class="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h2 class="text-lg font-bold text-slate-800 dark:text-white">Authorized Users</h2>
          <button @click="fetchUsers" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Refresh</button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
              <tr>
                <th class="px-5 py-3 font-medium">User</th>
                <th class="px-5 py-3 font-medium">Projects & Access</th>
                <th class="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
              <tr v-if="users.length === 0">
                <td colspan="3" class="px-5 py-8 text-center text-slate-500">No users found.</td>
              </tr>
              <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                <td class="px-5 py-4">
                  <div class="flex items-center gap-3">
                    <img v-if="user.picture" :src="user.picture" class="w-10 h-10 rounded-full" />
                    <div v-else class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      {{ user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase() }}
                    </div>
                    <div>
                      <div class="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        {{ user.name }}
                        <span v-if="user.is_superadmin" class="bg-rose-100 text-rose-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Superadmin</span>
                      </div>
                      <div class="text-slate-500 text-xs">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-4">
                  <div class="flex flex-wrap gap-2">
                    <button 
                      v-for="proj in availableProjects" :key="proj.id"
                      @click="togglePermission(user, proj.id)"
                      :disabled="user.is_superadmin && proj.id === 'system_admin'"
                      :class="user.permissions.includes(proj.id) ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-slate-100 text-slate-400 border-transparent dark:bg-slate-700 dark:text-slate-500'"
                      class="px-3 py-1 border rounded-full text-xs font-medium transition hover:shadow-sm"
                    >
                      {{ proj.name }}
                    </button>
                  </div>
                </td>
                <td class="px-5 py-4 text-right">
                  <button 
                    @click="deleteUser(user.id)" 
                    v-if="!user.is_superadmin"
                    class="text-rose-500 hover:text-rose-700 p-2 rounded-lg hover:bg-rose-50 transition"
                    title="Remove User"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api, getStoredUser } from '@/api/client';

const currentUser = getStoredUser();
const users = ref([]);
const newUserEmail = ref('');
const newUserName = ref('');
const loadingAdd = ref(false);
const addError = ref('');

// Define the available projects in the system that a user can be granted access to
const availableProjects = [
  { id: 'finance', name: 'Finance Tracker' },
  { id: 'attendance_admin', name: 'Attendance Admin' },
  { id: 'birthday_admin', name: 'Birthday Admin' },
  { id: 'org_admin', name: 'Org Chart Admin' }
];

const fetchUsers = async () => {
  try {
    const res = await api.get('/system/users', true);
    if (res.success) {
      users.value = res.users;
    }
  } catch (e) {
    console.error("Failed to load users", e);
  }
};

const addUser = async () => {
  loadingAdd.value = true;
  addError.value = '';
  try {
    const res = await api.post('/system/users', { email: newUserEmail.value, name: newUserName.value }, true);
    if (res.success) {
      newUserEmail.value = '';
      newUserName.value = '';
      fetchUsers();
    }
  } catch (e) {
    addError.value = e.message || 'Failed to add user';
  } finally {
    loadingAdd.value = false;
  }
};

const togglePermission = async (user, projectId) => {
  if (user.is_superadmin && projectId === 'system_admin') return; // Cannot toggle own superadmin here
  
  // Optimistic UI update
  const hasPerm = user.permissions.includes(projectId);
  if (hasPerm) {
    user.permissions = user.permissions.filter(p => p !== projectId);
  } else {
    user.permissions.push(projectId);
  }

  try {
    await api.post('/system/permissions/toggle', { user_id: user.id, project: projectId }, true);
  } catch (e) {
    console.error("Failed to toggle", e);
    // Revert on failure
    fetchUsers();
  }
};

const deleteUser = async (id) => {
  if (!confirm('Are you sure you want to completely remove this user? They will lose access to all projects.')) return;
  try {
    await api.delete(`/system/users/${id}`, null, true);
    fetchUsers();
  } catch (e) {
    console.error("Failed to delete", e);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
