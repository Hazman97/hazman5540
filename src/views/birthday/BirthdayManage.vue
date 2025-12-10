<template>
  <div class="manage-page">
    <!-- Background -->
    <div class="bg-gradient"></div>
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>

    <!-- Loading -->
    <div v-if="loading" class="loading-screen">
      <div class="loader"></div>
      <p>Loading...</p>
    </div>

    <!-- Unauthorized -->
    <div v-else-if="unauthorized" class="error-screen">
      <div class="error-content">
        <div class="error-icon">🔒</div>
        <h1>Access Denied</h1>
        <p>You don't have permission to manage this birthday page.</p>
        <router-link to="/birthday/create" class="back-btn">
          Create your own page →
        </router-link>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else-if="notFound" class="error-screen">
      <div class="error-content">
        <div class="error-icon">🎂</div>
        <h1>Page Not Found</h1>
        <p>This birthday page doesn't exist or has been deleted.</p>
        <router-link to="/birthday/create" class="back-btn">
          Create a new page →
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="manage-container">
      <!-- Header -->
      <header class="manage-header">
        <div class="header-left">
          <h1 class="page-title">🎂 {{ page.title }}</h1>
          <p class="page-subtitle">
            Managing birthday page for {{ page.person_name }}
          </p>
        </div>
        <div class="header-actions">
          <a :href="viewLink" target="_blank" class="action-btn view-btn">
            <span>👁️</span> View Page
          </a>
          <button
            @click="showDeleteConfirm = true"
            class="action-btn delete-btn"
          >
            <span>🗑️</span> Delete Page
          </button>
        </div>
      </header>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">💌</div>
          <div class="stat-value">{{ allWishes.length }}</div>
          <div class="stat-label">Total Wishes</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-value">{{ approvedCount }}</div>
          <div class="stat-label">Approved</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⏳</div>
          <div class="stat-value">{{ pendingCount }}</div>
          <div class="stat-label">Pending</div>
        </div>
      </div>

      <!-- Share Link Section -->
      <section class="share-section">
        <h2 class="section-title">📤 Share Link</h2>
        <div class="share-box">
          <input type="text" :value="viewLink" readonly class="share-input" />
          <button @click="copyLink" class="copy-btn">
            {{ copied ? "✓ Copied!" : "📋 Copy" }}
          </button>
        </div>
      </section>

      <!-- Page Settings -->
      <section class="settings-section">
        <h2 class="section-title">⚙️ Page Settings</h2>
        <div class="settings-form">
          <div class="form-row">
            <label>Title</label>
            <input v-model="editTitle" type="text" class="form-input" />
          </div>
          <div class="form-row">
            <label>Subtitle</label>
            <input v-model="editSubtitle" type="text" class="form-input" />
          </div>
          <div class="form-row">
            <label>Template</label>
            <select v-model="editTemplate" class="form-select">
              <option value="rose">🌹 Elegant Rose</option>
              <option value="party">🎊 Party Celebration</option>
              <option value="minimal">✨ Modern Minimal</option>
              <option value="ocean">🌊 Ocean Dreams</option>
              <option value="sunset">🌅 Golden Sunset</option>
              <option value="galaxy">🌌 Galaxy Night</option>
            </select>
          </div>
          <div class="form-row">
            <label>YouTube Music ID</label>
            <input
              v-model="editYoutubeId"
              type="text"
              class="form-input"
              placeholder="e.g., dQw4w9WgXcQ"
            />
          </div>
          <div class="form-row" v-if="editYoutubeId">
            <label>Music Start Time (seconds)</label>
            <input
              v-model.number="editYoutubeStartTime"
              type="number"
              min="0"
              class="form-input"
              placeholder="0"
            />
          </div>
          <div class="form-row">
            <label>🎬 Memories Video ID</label>
            <input
              v-model="editMemoriesVideoId"
              type="text"
              class="form-input"
              placeholder="e.g., abc123xyz (optional)"
            />
          </div>
          <div class="form-row" v-if="editMemoriesVideoId">
            <label>Audio Source</label>
            <select v-model="editUseVideoSound" class="form-select">
              <option :value="false">🎵 Background music</option>
              <option :value="true">🎬 Video's sound</option>
            </select>
          </div>
          <div class="form-row checkbox-row">
            <label class="checkbox-label">
              <input type="checkbox" v-model="editRequireApproval" />
              <span class="checkbox-text">Require approval for new wishes</span>
            </label>
          </div>
          <button @click="saveSettings" :disabled="saving" class="save-btn">
            {{ saving ? "Saving..." : "💾 Save Settings" }}
          </button>
          <p
            v-if="saveMessage"
            class="save-message"
            :class="{ error: saveError }"
          >
            {{ saveMessage }}
          </p>
        </div>
      </section>

      <!-- Wishes Management -->
      <section class="wishes-section">
        <div class="wishes-header">
          <h2 class="section-title">💌 Wishes Management</h2>
          <div class="filter-tabs">
            <button
              v-for="tab in ['all', 'approved', 'pending', 'rejected']"
              :key="tab"
              @click="filter = tab"
              class="filter-tab"
              :class="{ active: filter === tab }"
            >
              {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
            </button>
          </div>
        </div>

        <div v-if="filteredWishes.length === 0" class="no-wishes">
          <p>No {{ filter === "all" ? "" : filter }} wishes yet.</p>
        </div>

        <div v-else class="wishes-list">
          <div
            v-for="wish in filteredWishes"
            :key="wish.id"
            class="wish-item"
            :class="wish.status || 'approved'"
          >
            <div v-if="wish.photo_url" class="wish-photo">
              <img :src="wish.photo_url" :alt="wish.name" />
            </div>
            <div class="wish-content">
              <div class="wish-header">
                <h4 class="wish-name">{{ wish.name }}</h4>
                <span class="wish-status" :class="wish.status || 'approved'">
                  {{
                    (wish.status || "approved").charAt(0).toUpperCase() +
                    (wish.status || "approved").slice(1)
                  }}
                </span>
              </div>
              <p class="wish-text">"{{ wish.wish }}"</p>
              <span class="wish-date">{{ formatDate(wish.created_at) }}</span>
            </div>
            <div class="wish-actions">
              <button
                v-if="wish.status !== 'approved' && wish.status !== null"
                @click="updateWishStatus(wish.id, 'approved')"
                class="wish-action approve"
                title="Approve"
              >
                ✓
              </button>
              <button
                v-if="wish.status !== 'rejected'"
                @click="updateWishStatus(wish.id, 'rejected')"
                class="wish-action reject"
                title="Reject"
              >
                ✕
              </button>
              <button
                @click="deleteWish(wish.id)"
                class="wish-action delete"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteConfirm"
        class="modal-overlay"
        @click.self="showDeleteConfirm = false"
      >
        <div class="modal-content">
          <div class="modal-icon">⚠️</div>
          <h3>Delete Birthday Page?</h3>
          <p>
            This will permanently delete this birthday page and all wishes. This
            action cannot be undone.
          </p>
          <div class="modal-actions">
            <button @click="showDeleteConfirm = false" class="modal-btn cancel">
              Cancel
            </button>
            <button
              @click="deletePage"
              :disabled="deleting"
              class="modal-btn confirm"
            >
              {{ deleting ? "Deleting..." : "Delete Forever" }}
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
  name: "BirthdayManage",
  data() {
    return {
      loading: true,
      notFound: false,
      unauthorized: false,
      page: null,
      allWishes: [],
      filter: "all",
      copied: false,

      // Edit fields
      editTitle: "",
      editSubtitle: "",
      editTemplate: "rose",
      editYoutubeId: "",
      editYoutubeStartTime: 0,
      editMemoriesVideoId: "",
      editUseVideoSound: false,
      editRequireApproval: false,

      saving: false,
      saveMessage: "",
      saveError: false,

      showDeleteConfirm: false,
      deleting: false,
    };
  },
  computed: {
    viewLink() {
      return `${window.location.origin}/b/${this.page?.slug}`;
    },
    approvedCount() {
      return this.allWishes.filter((w) => w.status === "approved" || !w.status)
        .length;
    },
    pendingCount() {
      return this.allWishes.filter((w) => w.status === "pending").length;
    },
    filteredWishes() {
      if (this.filter === "all") return this.allWishes;
      return this.allWishes.filter((w) => {
        const status = w.status || "approved";
        return status === this.filter;
      });
    },
  },
  async mounted() {
    const pageId = this.$route.params.id;
    const token = this.$route.query.token;

    // Check localStorage for token if not in URL
    const storedPages = JSON.parse(
      localStorage.getItem("ownedBirthdayPages") || "{}"
    );
    const storedToken = storedPages[pageId]?.token;
    const authToken = token || storedToken;

    if (!authToken) {
      this.unauthorized = true;
      this.loading = false;
      return;
    }

    await this.loadPage(pageId, authToken);
  },
  methods: {
    async loadPage(pageId, token) {
      try {
        // Fetch page and verify ownership
        const { data: pageData, error: pageError } = await supabase
          .from("birthday_pages")
          .select("*")
          .eq("id", pageId)
          .eq("owner_token", token)
          .single();

        if (pageError || !pageData) {
          // Check if page exists but wrong token
          const { data: existsData } = await supabase
            .from("birthday_pages")
            .select("id")
            .eq("id", pageId)
            .single();

          if (existsData) {
            this.unauthorized = true;
          } else {
            this.notFound = true;
          }
          this.loading = false;
          return;
        }

        this.page = pageData;

        // Set edit fields
        this.editTitle = pageData.title;
        this.editSubtitle = pageData.subtitle || "";
        this.editTemplate = pageData.template;
        this.editYoutubeId = pageData.youtube_video_id || "";
        this.editYoutubeStartTime = pageData.youtube_start_time || 0;
        this.editMemoriesVideoId = pageData.memories_video_id || "";
        this.editUseVideoSound = pageData.use_video_sound || false;
        this.editRequireApproval = pageData.wishes_require_approval;

        // Fetch ALL wishes (including pending/rejected)
        const { data: wishesData } = await supabase
          .from("birthday_wishes")
          .select("*")
          .eq("page_id", pageId)
          .order("created_at", { ascending: false });

        this.allWishes = wishesData || [];
        this.loading = false;
      } catch (error) {
        console.error("Error loading page:", error);
        this.notFound = true;
        this.loading = false;
      }
    },

    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    copyLink() {
      navigator.clipboard.writeText(this.viewLink);
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    },

    async saveSettings() {
      this.saving = true;
      this.saveMessage = "";

      try {
        const { error } = await supabase
          .from("birthday_pages")
          .update({
            title: this.editTitle,
            subtitle: this.editSubtitle || null,
            template: this.editTemplate,
            youtube_video_id: this.editYoutubeId || null,
            youtube_start_time: this.editYoutubeStartTime || 0,
            memories_video_id: this.editMemoriesVideoId || null,
            use_video_sound: this.editUseVideoSound,
            wishes_require_approval: this.editRequireApproval,
            updated_at: new Date().toISOString(),
          })
          .eq("id", this.page.id);

        if (error) throw error;

        this.page.title = this.editTitle;
        this.page.subtitle = this.editSubtitle;
        this.page.template = this.editTemplate;
        this.page.youtube_video_id = this.editYoutubeId;
        this.page.youtube_start_time = this.editYoutubeStartTime;
        this.page.memories_video_id = this.editMemoriesVideoId;
        this.page.use_video_sound = this.editUseVideoSound;
        this.page.wishes_require_approval = this.editRequireApproval;

        this.saveMessage = "Settings saved successfully!";
        this.saveError = false;
      } catch (error) {
        console.error("Error saving:", error);
        this.saveMessage = "Failed to save settings.";
        this.saveError = true;
      } finally {
        this.saving = false;
        setTimeout(() => (this.saveMessage = ""), 3000);
      }
    },

    async updateWishStatus(wishId, status) {
      try {
        const { error } = await supabase
          .from("birthday_wishes")
          .update({ status })
          .eq("id", wishId);

        if (error) throw error;

        // Update local state
        const wish = this.allWishes.find((w) => w.id === wishId);
        if (wish) wish.status = status;
      } catch (error) {
        console.error("Error updating wish:", error);
        alert("Failed to update wish status.");
      }
    },

    async deleteWish(wishId) {
      if (!confirm("Delete this wish?")) return;

      try {
        const { error } = await supabase
          .from("birthday_wishes")
          .delete()
          .eq("id", wishId);

        if (error) throw error;

        this.allWishes = this.allWishes.filter((w) => w.id !== wishId);
      } catch (error) {
        console.error("Error deleting wish:", error);
        alert("Failed to delete wish.");
      }
    },

    async deletePage() {
      this.deleting = true;

      try {
        const { error } = await supabase
          .from("birthday_pages")
          .delete()
          .eq("id", this.page.id);

        if (error) throw error;

        // Remove from localStorage
        const storedPages = JSON.parse(
          localStorage.getItem("ownedBirthdayPages") || "{}"
        );
        delete storedPages[this.page.id];
        localStorage.setItem("ownedBirthdayPages", JSON.stringify(storedPages));

        // Redirect to create page
        this.$router.push("/birthday/create");
      } catch (error) {
        console.error("Error deleting page:", error);
        alert("Failed to delete page.");
        this.deleting = false;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

.manage-page {
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  position: relative;
}

/* Background */
.bg-gradient {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  z-index: -2;
}

.floating-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  z-index: -1;
}

.orb-1 {
  top: -20%;
  left: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent);
}

.orb-2 {
  bottom: -20%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent);
}

/* Loading/Error Screens */
.loading-screen,
.error-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.loader {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-content {
  text-align: center;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.error-content h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.error-content p {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
}

.back-btn {
  color: #8b5cf6;
  text-decoration: none;
}

/* Main Container */
.manage-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* Header */
.manage-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.8rem;
  color: white;
  margin-bottom: 0.3rem;
}

.page-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.header-actions {
  display: flex;
  gap: 0.8rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
}

.view-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.view-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.delete-btn {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.3);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
}

.stat-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

.stat-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
}

/* Share Section */
.share-section {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.section-title {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.share-box {
  display: flex;
  gap: 0.5rem;
}

.share-input {
  flex: 1;
  padding: 0.8rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: white;
  font-family: monospace;
}

.copy-btn {
  padding: 0.8rem 1.5rem;
  background: #8b5cf6;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.copy-btn:hover {
  background: #7c3aed;
}

/* Settings Section */
.settings-section {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-row label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
}

.form-input,
.form-select {
  padding: 0.8rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: white;
  font-family: inherit;
  font-size: 0.95rem;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #8b5cf6;
}

.form-select {
  cursor: pointer;
}

.form-select option {
  background: #1a1a2e;
}

.checkbox-row {
  flex-direction: row;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-text {
  color: rgba(255, 255, 255, 0.8);
}

.save-btn {
  padding: 1rem;
  background: linear-gradient(135deg, #10b981, #059669);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.save-message {
  text-align: center;
  font-size: 0.9rem;
  color: #10b981;
}

.save-message.error {
  color: #f87171;
}

/* Wishes Section */
.wishes-section {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
}

.wishes-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
}

.filter-tab {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-tab:hover {
  background: rgba(255, 255, 255, 0.1);
}

.filter-tab.active {
  background: #8b5cf6;
  border-color: #8b5cf6;
  color: white;
}

.no-wishes {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.5);
}

.wishes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.wish-item {
  display: flex;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.8rem;
  padding: 1rem;
  align-items: center;
}

.wish-item.pending {
  border-color: rgba(251, 191, 36, 0.3);
  background: rgba(251, 191, 36, 0.05);
}

.wish-item.rejected {
  border-color: rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.05);
  opacity: 0.7;
}

.wish-photo {
  flex-shrink: 0;
}

.wish-photo img {
  width: 60px;
  height: 60px;
  border-radius: 0.5rem;
  object-fit: cover;
}

.wish-content {
  flex: 1;
  min-width: 0;
}

.wish-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
}

.wish-name {
  color: #8b5cf6;
  font-size: 0.95rem;
  font-weight: 600;
}

.wish-status {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  text-transform: uppercase;
}

.wish-status.approved {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.wish-status.pending {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
}

.wish-status.rejected {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
}

.wish-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.wish-date {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
}

.wish-actions {
  display: flex;
  gap: 0.5rem;
}

.wish-action {
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.wish-action.approve {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.wish-action.approve:hover {
  background: #10b981;
  color: white;
}

.wish-action.reject {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
}

.wish-action.reject:hover {
  background: #ef4444;
  color: white;
}

.wish-action.delete {
  background: rgba(107, 114, 128, 0.2);
  color: #9ca3af;
}

.wish-action.delete:hover {
  background: #6b7280;
  color: white;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.modal-content {
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 400px;
  text-align: center;
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.modal-content h3 {
  color: white;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.modal-content p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 0.8rem;
}

.modal-btn {
  flex: 1;
  padding: 0.8rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.modal-btn.cancel {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.modal-btn.confirm {
  background: #ef4444;
  color: white;
}

.modal-btn.confirm:disabled {
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .manage-header {
    flex-direction: column;
  }

  .header-actions {
    width: 100%;
  }

  .action-btn {
    flex: 1;
    justify-content: center;
  }

  .wishes-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-tabs {
    width: 100%;
    overflow-x: auto;
  }

  .wish-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .wish-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
