<template>
  <div class="dashboard-page">
    <div class="page-background"></div>

    <header class="dashboard-header">
      <router-link to="/portfolio" class="back-link">← Back to Portfolio</router-link>
      <div class="header-content">
        <div>
          <h1 class="title">My Organization Charts</h1>
          <p class="subtitle">Manage and edit your saved charts</p>
        </div>
        <router-link to="/org/create" class="create-btn">
          ✨ Create New Chart
        </router-link>
      </div>
    </header>

    <main class="dashboard-content">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading your charts...</p>
      </div>

      <div v-else-if="!userEmail" class="guest-state">
        <div class="icon">🔒</div>
        <h2>Sign in required</h2>
        <p>Please log in to view and manage all your saved organization charts in one place.</p>
        <router-link to="/portfolio/contact" class="login-btn">Go to Login</router-link>
      </div>

      <div v-else-if="charts.length === 0" class="empty-state">
        <div class="icon">📊</div>
        <h2>No charts found</h2>
        <p>You haven't created any organization charts yet.</p>
        <router-link to="/org/create" class="create-btn-large">Create Your First Chart</router-link>
      </div>

      <div v-else class="charts-grid">
        <div v-for="chart in charts" :key="chart.slug" class="chart-card">
          <div class="card-header">
            <h3>{{ chart.title || chart.slug }}</h3>
            <span class="theme-badge" :class="'theme-' + chart.theme">{{ chart.theme }}</span>
          </div>
          <p class="chart-desc">{{ chart.description || "No description provided." }}</p>
          <div class="card-meta">
            <span class="slug-info">/org/{{ chart.slug }}</span>
            <span class="date-info">Created: {{ formatDate(chart.created_at) }}</span>
          </div>
          <div class="card-actions">
            <router-link :to="'/org/' + chart.slug" class="action-btn view-btn">👁️ View</router-link>
            <router-link :to="'/org/' + chart.slug + '/edit'" class="action-btn edit-btn">✏️ Edit</router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { orgchartApi } from "@/api/orgchart";

export default {
  name: "OrgChartDashboard",
  data() {
    return {
      charts: [],
      loading: true,
      userEmail: null,
    };
  },
  async mounted() {
    try {
      const userRaw = localStorage.getItem('hazman_user');
      if (userRaw) {
        this.userEmail = JSON.parse(userRaw).email;
      }
    } catch (e) {
      console.error("Failed to parse user session", e);
    }

    if (this.userEmail) {
      await this.fetchCharts();
    } else {
      this.loading = false;
    }
  },
  methods: {
    async fetchCharts() {
      this.loading = true;
      try {
        const data = await orgchartApi.getByUser(this.userEmail);
        this.charts = data || [];
      } catch (err) {
        console.error("Error fetching charts:", err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      if (!dateString) return "Unknown";
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
};
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  position: relative;
}

.page-background {
  position: fixed;
  inset: 0;
  background-image: 
    radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.05), transparent 25%),
    radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.05), transparent 25%);
  pointer-events: none;
}

.dashboard-header {
  padding: 2rem 4rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #64748b;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover {
  color: #3b82f6;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.title {
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #1e293b, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #64748b;
  margin: 0;
  font-size: 1rem;
}

.create-btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.dashboard-content {
  padding: 3rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

.loading-state, .empty-state, .guest-state {
  text-align: center;
  padding: 5rem 2rem;
  background: white;
  border-radius: 16px;
  border: 1px dashed #cbd5e1;
}

.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

p {
  color: #64748b;
  margin-bottom: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.create-btn-large, .login-btn {
  background: #1e293b;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  transition: background 0.2s;
}

.create-btn-large:hover, .login-btn:hover {
  background: #0f172a;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.chart-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  border-color: #cbd5e1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}

.theme-badge {
  font-size: 0.7rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: #f1f5f9;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.chart-desc {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.slug-info {
  font-family: 'Monaco', monospace;
  font-size: 0.8rem;
  color: #3b82f6;
  background: #eff6ff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  align-self: flex-start;
}

.date-info {
  font-size: 0.8rem;
  color: #94a3b8;
}

.card-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  flex: 1;
  text-align: center;
  padding: 0.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
}

.view-btn {
  background: #f1f5f9;
  color: #475569;
}

.view-btn:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.edit-btn {
  background: #eff6ff;
  color: #3b82f6;
}

.edit-btn:hover {
  background: #dbeafe;
  color: #2563eb;
}
</style>
