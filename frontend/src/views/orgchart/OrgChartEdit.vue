<template>
  <div class="org-edit-page">
    <div class="page-bg"></div>

    <!-- Loading/Error States -->
    <div v-if="loading" class="loading-screen">
      <div class="loader"></div>
      <p>Loading chart...</p>
    </div>

    <div v-else-if="error" class="error-screen">
      <div class="error-content">
        <div class="error-icon">🔒</div>
        <h2>Access Denied</h2>
        <p>{{ error }}</p>
        <router-link to="/org-demo" class="go-demo-btn">Try Demo</router-link>
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else class="edit-layout">
      <!-- Navbar -->
      <header class="edit-navbar">
        <div class="nav-left">
          <router-link :to="'/org/' + slug" class="back-link">
            <span>←</span> View Chart
          </router-link>
        </div>
        <div class="nav-center">
          <h1 class="chart-title">{{ chart.title }}</h1>
        </div>
        <div class="nav-right">
          <div class="save-status" v-if="lastSaved || hasChanges">
            <span v-if="hasChanges" class="status-unsaved"
              >Unsaved changes</span
            >
            <span v-else class="status-saved"
              >Saved {{ formatTime(lastSaved) }}</span
            >
          </div>
          <button
            @click="saveChanges"
            :disabled="saving"
            class="primary-btn save-btn"
          >
            {{ saving ? "Saving..." : "Save Changes" }}
          </button>
        </div>
      </header>

      <div class="main-content">
        <!-- Left Sidebar: Settings -->
        <aside class="sidebar settings-sidebar">
          <div class="sidebar-header">
            <h3>⚙️ Settings</h3>
          </div>
          <div class="sidebar-content">
            <div class="form-group">
              <label>Company Name</label>
              <input v-model="chart.title" type="text" class="form-input" />
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea
                v-model="chart.description"
                rows="3"
                class="form-textarea"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Theme</label>
              <div class="theme-grid">
                <button
                  v-for="t in themes"
                  :key="t.id"
                  class="theme-card"
                  :class="{ active: theme === t.id }"
                  :style="{ background: t.gradient }"
                  @click="theme = t.id"
                  :title="t.name"
                >
                  <span v-if="theme === t.id" class="check-icon">✓</span>
                </button>
              </div>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="allowExport" />
                <span class="checkbox-custom"></span>
                <span>Allow viewers to export</span>
              </label>
            </div>

            <div class="sharing-section">
              <h4>📤 Sharing</h4>
              <div class="share-box">
                <input
                  type="text"
                  :value="publicUrl"
                  readonly
                  class="share-input"
                />
                <button
                  @click="copyPublicUrl"
                  class="icon-btn"
                  title="Copy Link"
                >
                  {{ copied ? "✓" : "📋" }}
                </button>
              </div>
              <a :href="publicUrl" target="_blank" class="view-external-link">
                Open public link ↗
              </a>
            </div>

            <div class="danger-zone">
              <button @click="deleteChart" class="delete-chart-btn">
                Delete Chart
              </button>
            </div>
          </div>
        </aside>

        <!-- Center: Tree Editor -->
        <main class="editor-canvas">
          <div class="canvas-header">
            <h2>Structure</h2>
            <div class="canvas-actions">
              <button @click="addRootNode" class="secondary-btn small">
                <span>➕</span> Add Root Person
              </button>
            </div>
          </div>

          <div class="nodes-container" v-if="nodes.length">
            <div class="nodes-list">
              <div
                v-for="node in flatNodes"
                :key="node.id"
                class="node-row"
                :style="{ paddingLeft: node.level * 24 + 'px' }"
              >
                <div class="node-connector" v-if="node.level > 0"></div>
                <div class="node-card">
                  <span class="node-avatar" v-html="getAvatarIcon(node)"></span>
                  <div class="node-info">
                    <span class="node-name">{{ node.name }}</span>
                    <span class="node-role">{{ node.position }}</span>
                  </div>
                  <div class="node-controls">
                    <button
                      @click="addChild(node.id)"
                      class="control-btn"
                      title="Add Report"
                    >
                      ➕
                    </button>
                    <button
                      @click="editNode(node.id)"
                      class="control-btn"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      @click="deleteNode(node.id)"
                      class="control-btn delete"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="empty-state">
            <div class="empty-icon">👥</div>
            <h3>Start building your chart</h3>
            <p>Add people to create your organization structure</p>
            <button @click="addRootNode" class="primary-btn">
              Add First Person
            </button>
          </div>
        </main>

        <!-- Right Sidebar: Preview -->
        <aside class="sidebar preview-sidebar">
          <div class="sidebar-header">
            <h3>📱 Preview</h3>
          </div>
          <div class="sidebar-content preview-bg">
            <div class="preview-chart" :class="'theme-' + theme">
              <div class="preview-mini-tree" v-if="rootNodes.length">
                <div
                  v-for="node in rootNodes"
                  :key="node.id"
                  class="mini-node-wrapper"
                >
                  <div class="mini-card" :class="'color-' + node.color">
                    <span
                      class="mini-avatar"
                      v-html="getAvatarIcon(node)"
                    ></span>
                    <div class="mini-info">
                      <strong>{{ node.name }}</strong>
                      <small>{{ node.position }}</small>
                    </div>
                  </div>
                  <!-- First level children preview only -->
                  <div class="mini-children" v-if="getChildren(node.id).length">
                    <div
                      v-for="child in getChildren(node.id)"
                      :key="child.id"
                      class="mini-child"
                    >
                      <span
                        class="tiny-avatar"
                        v-html="getAvatarIcon(child)"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
              <p v-else class="preview-empty">Add people to see preview</p>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Editor Modal -->
    <transition name="fade">
      <div v-if="showEditor" class="modal-overlay" @click.self="closeEditor">
        <div class="editor-modal">
          <div class="modal-header">
            <h3>{{ editingNode ? "Edit Person" : "Add Person" }}</h3>
            <button class="close-btn" @click="closeEditor">×</button>
          </div>
          <form @submit.prevent="saveNode" class="node-form">
            <div class="form-grid">
              <div class="form-group">
                <label>Name *</label>
                <input
                  v-model="nodeForm.name"
                  type="text"
                  class="form-input"
                  required
                  placeholder="Jane Doe"
                />
              </div>
              <div class="form-group">
                <label>Position *</label>
                <input
                  v-model="nodeForm.position"
                  type="text"
                  class="form-input"
                  required
                  placeholder="Software Engineer"
                />
              </div>
              <div class="form-group">
                <label>Department</label>
                <input
                  v-model="nodeForm.department"
                  type="text"
                  class="form-input"
                  placeholder="Engineering"
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  v-model="nodeForm.email"
                  type="email"
                  class="form-input"
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div class="form-group">
              <label>Photo URL (Optional)</label>
              <input
                v-model="nodeForm.imageUrl"
                type="url"
                class="form-input"
                placeholder="https://example.com/photo.jpg"
              />
              <small class="form-hint"
                >Paste a link to an image (e.g. from Imgur or LinkedIn)</small
              >
            </div>

            <div class="form-group">
              <label>Card Color</label>
              <div class="color-grid">
                <button
                  v-for="color in cardColors"
                  :key="color.id"
                  type="button"
                  class="color-select-btn"
                  :class="{ selected: nodeForm.color === color.id }"
                  :style="{ background: color.value }"
                  @click="nodeForm.color = color.id"
                ></button>
              </div>
            </div>

            <div class="form-group">
              <label>Reports To</label>
              <select v-model="selectedParentId" class="form-select">
                <option :value="null">-- No Manager (Root Level) --</option>
                <option
                  v-for="node in availableParents"
                  :key="node.id"
                  :value="node.id"
                >
                  {{ node.name }} - {{ node.position }}
                </option>
              </select>
            </div>

            <div class="modal-actions">
              <button type="button" class="secondary-btn" @click="closeEditor">
                Cancel
              </button>
              <button type="submit" class="primary-btn">
                {{ editingNode ? "Save Update" : "Add Person" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { supabase } from "@/supabase.js";

export default {
  name: "OrgChartEdit",
  data() {
    return {
      loading: true,
      error: null,
      chart: { title: "", description: "" },
      nodes: [],
      theme: "corporate",
      allowExport: true,
      saving: false,
      hasChanges: false,
      lastSaved: null,
      slug: "",
      token: "",
      copied: false,

      showEditor: false,
      editingNode: null,
      parentForNewNode: null,
      selectedParentId: null,
      nodeForm: {
        name: "",
        position: "",
        department: "",
        email: "",
        imageUrl: "",
        color: "blue",
      },

      themes: [
        {
          id: "light",
          name: "Light",
          gradient: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
        },
        {
          id: "dark",
          name: "Dark",
          gradient: "linear-gradient(135deg, #0f172a, #1e293b)",
        },
        {
          id: "blue",
          name: "Ocean",
          gradient: "linear-gradient(135deg, #0c1929, #1e3a5f)",
        },
        {
          id: "purple",
          name: "Violet",
          gradient: "linear-gradient(135deg, #1e1033, #4c1d95)",
        },
        {
          id: "green",
          name: "Forest",
          gradient: "linear-gradient(135deg, #022c22, #064e3b)",
        },
        {
          id: "warm",
          name: "Sunset",
          gradient: "linear-gradient(135deg, #1c1210, #7c2d12)",
        },
      ],
      cardColors: [
        { id: "blue", value: "#3b82f6" },
        { id: "teal", value: "#14b8a6" },
        { id: "purple", value: "#8b5cf6" },
        { id: "pink", value: "#ec4899" },
        { id: "orange", value: "#f97316" },
        { id: "green", value: "#22c55e" },
      ],
    };
  },
  computed: {
    rootNodes() {
      return this.nodes.filter((n) => !n.parentId);
    },
    flatNodes() {
      const result = [];
      const addWithLevel = (nodes, level) => {
        nodes.forEach((node) => {
          result.push({ ...node, level });
          const children = this.nodes.filter((n) => n.parentId === node.id);
          addWithLevel(children, level + 1);
        });
      };
      addWithLevel(this.rootNodes, 0);
      return result;
    },
    availableParents() {
      if (this.editingNode) {
        // Exclude the node being edited and its descendants to prevent cycles
        const descendants = new Set();
        const addDescendants = (nodeId) => {
          this.nodes
            .filter((n) => n.parentId === nodeId)
            .forEach((child) => {
              descendants.add(child.id);
              addDescendants(child.id);
            });
        };
        descendants.add(this.editingNode.id);
        addDescendants(this.editingNode.id);
        return this.nodes.filter((n) => !descendants.has(n.id));
      }
      return this.nodes;
    },
    publicUrl() {
      return `${window.location.origin}/org/${this.slug}`;
    },
  },
  watch: {
    nodes: {
      deep: true,
      handler() {
        this.hasChanges = true;
      },
    },
    theme() {
      this.hasChanges = true;
    },
    allowExport() {
      this.hasChanges = true;
    },
    "chart.title"() {
      this.hasChanges = true;
    },
    "chart.description"() {
      this.hasChanges = true;
    },
  },
  async mounted() {
    this.slug = this.$route.params.slug;
    this.token = this.$route.query.token;
    await this.loadChart();
  },
  methods: {
    async loadChart() {
      try {
        const { data, error } = await supabase
          .from("org_charts")
          .select("*")
          .eq("slug", this.slug)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Chart not found");
        if (data.owner_token !== this.token)
          throw new Error("Invalid access token");

        this.chart = data;
        this.nodes = data.chart_data || [];
        this.theme = data.theme || "corporate";
        this.allowExport = data.custom_settings?.allowExport !== false;
        this.lastSaved = new Date(data.updated_at);
        this.hasChanges = false;
      } catch (err) {
        this.error = err.message || "Unable to access this chart for editing.";
      } finally {
        this.loading = false;
      }
    },
    async saveChanges() {
      this.saving = true;
      try {
        const { error } = await supabase
          .from("org_charts")
          .update({
            title: this.chart.title,
            description: this.chart.description,
            theme: this.theme,
            chart_data: this.nodes,
            custom_settings: {
              allowExport: this.allowExport,
            },
            updated_at: new Date().toISOString(),
          })
          .eq("slug", this.slug)
          .eq("owner_token", this.token);

        if (error) throw error;
        this.lastSaved = new Date();
        this.hasChanges = false;
      } catch (err) {
        alert("Failed to save: " + err.message);
      } finally {
        this.saving = false;
      }
    },
    async deleteChart() {
      if (
        !confirm(
          "Are you sure you want to delete this chart? This cannot be undone."
        )
      )
        return;

      try {
        await supabase
          .from("org_charts")
          .delete()
          .eq("slug", this.slug)
          .eq("owner_token", this.token);
        this.$router.push("/org-demo");
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    },
    getAvatarIcon(node) {
      if (node.imageUrl) {
        return `<img src="${node.imageUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
      }
      return node.name ? node.name.charAt(0).toUpperCase() : "👤";
    },
    formatTime(date) {
      return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    getChildren(parentId) {
      return this.nodes.filter((n) => n.parentId === parentId);
    },
    copyPublicUrl() {
      navigator.clipboard.writeText(this.publicUrl);
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    },
    addRootNode() {
      this.editingNode = null;
      this.parentForNewNode = null;
      this.selectedParentId = null;
      this.resetForm();
      this.showEditor = true;
    },
    addChild(parentId) {
      this.editingNode = null;
      this.parentForNewNode = parentId;
      this.selectedParentId = parentId;
      this.resetForm();
      this.showEditor = true;
    },
    editNode(nodeId) {
      const node = this.nodes.find((n) => n.id === nodeId);
      if (node) {
        this.editingNode = node;
        this.parentForNewNode = node.parentId || null;
        this.selectedParentId = node.parentId || null;
        this.nodeForm = { ...node };
        this.showEditor = true;
      }
    },
    async deleteNode(nodeId) {
      if (!confirm("Delete this person and all subordinates?")) return;

      const idsToDelete = new Set();
      const collectIds = (id) => {
        idsToDelete.add(id);
        this.nodes
          .filter((n) => n.parentId === id)
          .forEach((c) => collectIds(c.id));
      };
      collectIds(nodeId);

      this.nodes = this.nodes.filter((n) => !idsToDelete.has(n.id));
      await this.saveChanges();
    },
    resetForm() {
      this.nodeForm = {
        name: "",
        position: "",
        department: "",
        email: "",
        avatar: "person",
        color: "blue",
      };
    },
    closeEditor() {
      this.showEditor = false;
      this.editingNode = null;
      this.parentForNewNode = null;
    },
    async saveNode() {
      if (this.editingNode) {
        const idx = this.nodes.findIndex((n) => n.id === this.editingNode.id);
        if (idx !== -1) {
          const updatedNode = {
            ...this.nodes[idx],
            ...this.nodeForm,
            parentId: this.selectedParentId || null,
          };
          this.nodes.splice(idx, 1, updatedNode);
        }
      } else {
        const newNode = {
          id: Date.now().toString(),
          ...this.nodeForm,
          parentId: this.selectedParentId || null,
        };
        this.nodes.push(newNode);
      }
      this.closeEditor();
      await this.saveChanges();
    },
  },
};
</script>

<style scoped>
/* Base Layout */
.org-edit-page {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  font-family: "Inter", system-ui, sans-serif;
  color: #1e293b;
}

.loading-screen,
.error-screen {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.loader {
  border: 3px solid #e2e8f0;
  border-top: 3px solid #0f172a;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Navbar */
.edit-navbar {
  height: 60px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  z-index: 10;
  flex-shrink: 0;
}

.back-link {
  text-decoration: none;
  font-weight: 600;
  color: #64748b;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.back-link:hover {
  color: #0f172a;
}

.chart-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.save-status {
  font-size: 0.85rem;
  color: #64748b;
}

.status-unsaved {
  color: #f59e0b;
  font-weight: 600;
}

/* Layout Grid */
.edit-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 300px;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.preview-sidebar {
  border-right: none;
  border-left: 1px solid #e2e8f0;
  width: 320px;
}

.sidebar-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.preview-bg {
  background: #f8fafc;
  padding: 0;
}

/* Canvas / Editor */
.editor-canvas {
  flex: 1;
  background: #f1f5f9;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.canvas-header {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.canvas-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #1e293b;
}

.nodes-container {
  flex: 1;
  overflow-y: auto;
  padding: 0 2rem 2rem;
}

.nodes-list {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.node-row {
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.1s;
}

.node-row:last-child {
  border-bottom: none;
}

.node-row:hover {
  background: #f8fafc;
}

.node-connector {
  width: 20px;
  border-left: 1px solid #cbd5e1;
  position: relative;
}

.node-connector::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 10px;
  height: 1px;
  background: #cbd5e1;
}

.node-card {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  gap: 1rem;
}

.node-avatar {
  width: 36px;
  height: 36px;
  background: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.node-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.node-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
}

.node-role {
  color: #64748b;
  font-size: 0.85rem;
}

.node-controls {
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.node-row:hover .node-controls {
  opacity: 1;
}

.control-btn {
  width: 32px;
  height: 32px;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.control-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.control-btn.delete:hover {
  background: #fef2f2;
  border-color: #fee2e2;
}

/* Forms & Inputs */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #1e293b;
  background: white;
  transition: all 0.2s;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Theme Grid */
.theme-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.theme-card {
  height: 40px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-card.active {
  border-color: #0f172a;
}

.check-icon {
  color: white;
  font-size: 0.8rem;
  font-weight: 800;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Buttons */
.primary-btn {
  background: #0f172a;
  color: white;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.primary-btn:hover {
  background: #1e293b;
}

.primary-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.secondary-btn {
  background: white;
  border: 1px solid #e2e8f0;
  color: #334155;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.secondary-btn.small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.icon-btn {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
}

.delete-chart-btn {
  width: 100%;
  padding: 0.75rem;
  color: #ef4444;
  border: 1px solid #fee2e2;
  background: #fef2f2;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.delete-chart-btn:hover {
  background: #fee2e2;
}

/* Checkbox */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.checkbox-label input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e1;
  border-radius: 4px;
  position: relative;
}

.checkbox-label input:checked + .checkbox-custom {
  background: #0f172a;
  border-color: #0f172a;
}

.checkbox-label input:checked + .checkbox-custom::after {
  content: "✓";
  position: absolute;
  color: white;
  font-size: 0.8rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Empty State */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* Preview */
.preview-chart {
  padding: 2rem 1rem;
  min-height: 100%;
}

.mini-node-wrapper {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mini-card {
  width: 100%;
  background: white;
  padding: 0.75rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-left: 3px solid #3b82f6;
}
.mini-card.color-teal {
  border-left-color: #14b8a6;
}
.mini-card.color-purple {
  border-left-color: #8b5cf6;
}
.mini-card.color-pink {
  border-left-color: #ec4899;
}
.mini-card.color-orange {
  border-left-color: #f97316;
}
.mini-card.color-green {
  border-left-color: #22c55e;
}

.mini-avatar {
  font-size: 1.2rem;
}
.mini-info {
  display: flex;
  flex-direction: column;
}
.mini-info strong {
  font-size: 0.85rem;
  color: #1e293b;
}
.mini-info small {
  font-size: 0.75rem;
  color: #64748b;
}

.mini-children {
  display: flex;
  gap: 4px;
  margin-top: 8px;
  padding-left: 1rem;
  border-left: 2px solid #e2e8f0;
}

.mini-child {
  background: white;
  padding: 4px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  font-size: 0.8rem;
}

/* Share Box */
.share-box {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.share-input {
  flex: 1;
  border: 1px solid #e2e8f0;
  background: #f1f5f9;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #64748b;
}

.view-external-link {
  font-size: 0.8rem;
  color: #3b82f6;
  text-decoration: none;
}

.view-external-link:hover {
  text-decoration: underline;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-modal {
  background: white;
  width: 90%;
  max-width: 500px;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.modal-header {
  padding: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #0f172a;
  font-size: 1.1rem;
}

.close-btn {
  background: #f1f5f9;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  color: #64748b;
}

.node-form {
  padding: 1.5rem;
}

.form-grid {
  display: grid;
  gap: 1rem;
}

.avatar-grid {
  display: flex;
  gap: 0.5rem;
}

.avatar-select-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
}

.avatar-select-btn.selected {
  border-color: #0f172a;
  background: #f1f5f9;
}

.color-grid {
  display: flex;
  gap: 0.5rem;
}

.color-select-btn {
  width: 32px;
  height: 32px;
  border: 2px solid white;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 0 0 1px #e2e8f0;
}

.color-select-btn.selected {
  transform: scale(1.1);
  box-shadow: 0 0 0 2px #0f172a;
}

.modal-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

@media (max-width: 1024px) {
  .preview-sidebar {
    display: none;
  }
  .sidebar {
    width: 100%;
    border-right: none;
  }
  .main-content {
    flex-direction: column;
  }
  .editor-canvas {
    flex: 1;
  }
  .settings-sidebar {
    height: auto;
    max-height: 200px;
    border-bottom: 1px solid #e2e8f0;
  }
}
</style>
