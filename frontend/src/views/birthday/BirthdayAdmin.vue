<template>
  <div class="admin-page">
    <!-- Background -->
    <div class="bg-gradient"></div>
    <div class="floating-orbs">
      <div v-for="i in 5" :key="i" class="orb" :style="getOrbStyle(i)"></div>
    </div>

    <div class="admin-container">
      <!-- Header -->
      <header class="admin-header">
        <div class="header-content">
          <h1 class="admin-title">🎂 Birthday Pages Admin</h1>
          <p class="admin-subtitle">Manage all birthday pages</p>
        </div>
        <router-link to="/birthday/create" class="create-btn">
          <span>➕</span> Create New
        </router-link>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading pages...</p>
      </div>

      <!-- Pages Grid -->
      <div v-else-if="pages.length > 0" class="pages-grid">
        <div v-for="page in pages" :key="page.id" class="page-card">
          <div class="card-header" :style="getCardGradient(page.template)">
            <div class="card-template">
              {{ getTemplateIcon(page.template) }}
            </div>
            <div class="card-meta">
              <span class="meta-date">{{ formatDate(page.created_at) }}</span>
            </div>
          </div>
          <div class="card-body">
            <h3 class="card-title">{{ page.title }}</h3>
            <p class="card-person">For {{ page.person_name }}</p>
            <p class="card-slug">/b/{{ page.slug }}</p>

            <div class="card-stats">
              <span class="stat">
                <span class="stat-icon">💌</span>
                <span>{{ page.wish_count || 0 }} wishes</span>
              </span>
              <span class="stat">
                <span class="stat-icon">{{
                  page.wishes_require_approval ? "🔒" : "🔓"
                }}</span>
                <span>{{
                  page.wishes_require_approval ? "Approval" : "Auto"
                }}</span>
              </span>
            </div>
          </div>
          <div class="card-actions">
            <router-link :to="`/b/${page.slug}`" class="action-btn view-btn">
              👁️ View
            </router-link>
            <button @click="managePage(page)" class="action-btn manage-btn">
              ⚙️ Manage
            </button>
            <button @click="confirmDelete(page)" class="action-btn delete-btn">
              🗑️
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">🎂</div>
        <h2>No Birthday Pages Yet</h2>
        <p>Create your first birthday page to get started!</p>
        <router-link to="/birthday/create" class="create-first-btn">
          Create Birthday Page
        </router-link>
      </div>

      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteModal"
        class="modal-overlay"
        @click.self="showDeleteModal = false"
      >
        <div class="modal-content">
          <h3>🗑️ Delete Page?</h3>
          <p>
            Are you sure you want to delete
            <strong>{{ pageToDelete?.title }}</strong
            >?
          </p>
          <p class="warning">
            This will also delete all wishes. This cannot be undone.
          </p>
          <div class="modal-actions">
            <button @click="showDeleteModal = false" class="cancel-btn">
              Cancel
            </button>
            <button
              @click="deletePage"
              :disabled="deleting"
              class="confirm-delete-btn"
            >
              {{ deleting ? "Deleting..." : "Delete Page" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "@/supabase.js";

export default {
  name: "BirthdayAdmin",
  data() {
    return {
      loading: true,
      pages: [],
      showDeleteModal: false,
      pageToDelete: null,
      deleting: false,
    };
  },
  async mounted() {
    await this.loadPages();
  },
  methods: {
    async loadPages() {
      this.loading = true;
      try {
        // Fetch all birthday pages with wish count
        const { data, error } = await supabase
          .from("birthday_pages")
          .select("*, birthday_wishes(count)")
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Process pages with wish count
        this.pages = (data || []).map((page) => ({
          ...page,
          wish_count: page.birthday_wishes?.[0]?.count || 0,
        }));
      } catch (error) {
        console.error("Error loading pages:", error);
      } finally {
        this.loading = false;
      }
    },

    getOrbStyle(i) {
      const sizes = [300, 200, 250, 180, 220];
      const positions = [
        { top: "10%", left: "10%" },
        { top: "60%", right: "5%" },
        { bottom: "20%", left: "20%" },
        { top: "30%", right: "15%" },
        { bottom: "10%", right: "30%" },
      ];
      return {
        width: `${sizes[i - 1]}px`,
        height: `${sizes[i - 1]}px`,
        ...positions[i - 1],
      };
    },

    getCardGradient(template) {
      const gradients = {
        rose: "linear-gradient(135deg, #4a0d2f, #6b1040)",
        party: "linear-gradient(135deg, #1a1a2e, #302b63)",
        minimal: "linear-gradient(135deg, #2d3436, #4b5563)",
        ocean: "linear-gradient(135deg, #0c2461, #1e3a5f)",
        sunset: "linear-gradient(135deg, #450a0a, #c73659)",
        galaxy: "linear-gradient(135deg, #0f0f23, #5b21b6)",
      };
      return { background: gradients[template] || gradients.rose };
    },

    getTemplateIcon(template) {
      const icons = {
        rose: "🌹",
        party: "🎊",
        minimal: "✨",
        ocean: "🌊",
        sunset: "🌅",
        galaxy: "🌌",
      };
      return icons[template] || "🎂";
    },

    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },

    managePage(page) {
      // Admin override - go directly to manage page with owner token
      this.$router.push(
        `/birthday/manage/${page.id}?token=${page.owner_token}`
      );
    },

    confirmDelete(page) {
      this.pageToDelete = page;
      this.showDeleteModal = true;
    },

    async deletePage() {
      if (!this.pageToDelete) return;

      this.deleting = true;
      try {
        // Delete wishes first
        await supabase
          .from("birthday_wishes")
          .delete()
          .eq("page_id", this.pageToDelete.id);

        // Delete the page
        const { error } = await supabase
          .from("birthday_pages")
          .delete()
          .eq("id", this.pageToDelete.id);

        if (error) throw error;

        // Remove from local list
        this.pages = this.pages.filter((p) => p.id !== this.pageToDelete.id);
        this.showDeleteModal = false;
        this.pageToDelete = null;
      } catch (error) {
        console.error("Error deleting page:", error);
        alert("Failed to delete page");
      } finally {
        this.deleting = false;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

.admin-page {
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  position: relative;
  overflow-x: hidden;
}

.bg-gradient {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #0f0f1a, #1a1a2e, #16213e);
  z-index: -2;
}

.floating-orbs {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.15),
    transparent 70%
  );
  filter: blur(40px);
  animation: floatOrb 20s ease-in-out infinite;
}

@keyframes floatOrb {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-30px) scale(1.1);
  }
}

.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Header */
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.admin-title {
  font-size: 1.8rem;
  color: white;
  margin: 0;
}

.admin-subtitle {
  color: rgba(255, 255, 255, 0.6);
  margin: 0.3rem 0 0;
  font-size: 0.9rem;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  border: none;
  border-radius: 100px;
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.6);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #8b5cf6;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Pages Grid */
.pages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.page-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s;
}

.page-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(139, 92, 246, 0.3);
}

.card-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-template {
  font-size: 2rem;
}

.meta-date {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(0, 0, 0, 0.2);
  padding: 0.3rem 0.6rem;
  border-radius: 100px;
}

.card-body {
  padding: 0 1.5rem 1rem;
}

.card-title {
  color: white;
  font-size: 1.1rem;
  margin: 0 0 0.3rem;
  font-weight: 600;
}

.card-person {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin: 0 0 0.5rem;
}

.card-slug {
  font-family: monospace;
  font-size: 0.75rem;
  color: rgba(139, 92, 246, 0.8);
  margin: 0 0 1rem;
  background: rgba(139, 92, 246, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 0.3rem;
  display: inline-block;
}

.card-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.stat-icon {
  font-size: 0.9rem;
}

.card-actions {
  display: flex;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.action-btn {
  flex: 1;
  padding: 0.8rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  text-align: center;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}

.view-btn:hover {
  color: #22d3ee;
}

.manage-btn:hover {
  color: #8b5cf6;
}

.delete-btn {
  flex: 0.5;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.delete-btn:hover {
  color: #f87171;
  background: rgba(248, 113, 113, 0.1);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h2 {
  color: white;
  margin: 0 0 0.5rem;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 2rem;
}

.create-first-btn {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  border-radius: 100px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.create-first-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.modal-content h3 {
  color: white;
  margin: 0 0 1rem;
  font-size: 1.3rem;
}

.modal-content p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 0.5rem;
}

.warning {
  color: #f87171;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.cancel-btn,
.confirm-delete-btn {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.cancel-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.confirm-delete-btn {
  background: linear-gradient(135deg, #dc2626, #f87171);
  color: white;
}

.confirm-delete-btn:hover {
  transform: translateY(-2px);
}

.confirm-delete-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 600px) {
  .admin-header {
    flex-direction: column;
    text-align: center;
  }

  .pages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
