<template>
  <div class="org-edit-page" :class="'theme-' + theme">
    <!-- Background -->
    <div class="bg-gradient"></div>
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>

    <!-- Loading/Error States -->
    <div v-if="loading" class="loading-screen">
      <div class="loader"></div>
      <p>Loading chart...</p>
    </div>

    <div v-else-if="error" class="error-screen">
      <div class="error-icon">🔒</div>
      <h2>Access Denied</h2>
      <p>{{ error }}</p>
      <router-link to="/org-demo" class="go-demo-btn">Try Demo</router-link>
    </div>

    <!-- Edit Mode -->
    <div v-else class="edit-container">
      <!-- Header -->
      <header class="edit-header">
        <div class="header-left">
          <router-link :to="'/org/' + slug" class="back-link"
            >← View Chart</router-link
          >
        </div>
        <div class="header-center">
          <h1 class="edit-title">✏️ Editing: {{ chart.title }}</h1>
        </div>
        <div class="header-right">
          <button @click="saveChanges" :disabled="saving" class="save-btn">
            {{ saving ? "Saving..." : "💾 Save Changes" }}
          </button>
        </div>
      </header>

      <!-- Share URL Bar -->
      <div class="share-bar">
        <span class="share-label">📤 Public Link:</span>
        <input
          type="text"
          :value="publicUrl"
          readonly
          class="share-input"
          ref="shareInput"
        />
        <button @click="copyPublicUrl" class="copy-btn">
          {{ copied ? "✓ Copied!" : "📋 Copy" }}
        </button>
        <router-link :to="'/org/' + slug" class="view-btn" target="_blank">
          👁️ View
        </router-link>
      </div>

      <!-- Edit Panels -->
      <div class="edit-panels">
        <!-- Left Sidebar - Settings -->
        <aside class="settings-panel">
          <h3>⚙️ Settings</h3>

          <div class="setting-group">
            <label>Company Name</label>
            <input v-model="chart.title" type="text" />
          </div>

          <div class="setting-group">
            <label>Description</label>
            <textarea v-model="chart.description" rows="3"></textarea>
          </div>

          <div class="setting-group">
            <label>Theme</label>
            <div class="theme-picker">
              <button
                v-for="t in themes"
                :key="t.id"
                class="theme-swatch"
                :class="{ active: theme === t.id }"
                :style="{ background: t.color }"
                @click="theme = t.id"
                :title="t.name"
              ></button>
            </div>
          </div>

          <div class="setting-group">
            <label>Card Style</label>
            <select v-model="cardStyle" class="style-select">
              <option v-for="s in cardStyles" :key="s.id" :value="s.id">
                {{ s.name }}
              </option>
            </select>
          </div>

          <div class="setting-group checkbox">
            <label>
              <input type="checkbox" v-model="allowExport" />
              Allow viewers to export
            </label>
          </div>

          <div class="danger-zone">
            <h4>Danger Zone</h4>
            <button @click="deleteChart" class="delete-btn">
              🗑️ Delete Chart
            </button>
          </div>
        </aside>

        <!-- Main - Chart Editor -->
        <main class="chart-editor">
          <div class="editor-toolbar">
            <button @click="addRootNode" class="add-btn">➕ Add Person</button>
            <button @click="expandAll" class="tool-btn">📂 Expand All</button>
          </div>

          <div class="nodes-list" v-if="nodes.length">
            <div
              v-for="node in flatNodes"
              :key="node.id"
              class="node-row"
              :style="{ paddingLeft: node.level * 24 + 'px' }"
            >
              <span class="node-connector" v-if="node.level > 0">└─</span>
              <span class="node-avatar">{{ getAvatarIcon(node.avatar) }}</span>
              <div class="node-info">
                <strong>{{ node.name }}</strong>
                <span>{{ node.position }}</span>
              </div>
              <div class="node-actions">
                <button @click="addChild(node.id)" title="Add subordinate">
                  ➕
                </button>
                <button @click="editNode(node.id)" title="Edit">✏️</button>
                <button @click="deleteNode(node.id)" class="del" title="Delete">
                  🗑️
                </button>
              </div>
            </div>
          </div>

          <div v-else class="empty-editor">
            <p>
              No members yet. Click "Add Person" to start building your org
              chart.
            </p>
          </div>
        </main>

        <!-- Right - Preview -->
        <aside class="preview-panel">
          <h3>👁️ Live Preview</h3>
          <div class="preview-container" :class="'theme-' + theme">
            <div class="preview-tree" v-if="rootNodes.length">
              <div
                v-for="node in rootNodes"
                :key="node.id"
                class="preview-node-wrapper"
              >
                <div class="preview-card" :class="'color-' + node.color">
                  <span class="preview-avatar">{{
                    getAvatarIcon(node.avatar)
                  }}</span>
                  <div class="preview-info">
                    <strong>{{ node.name }}</strong>
                    <small>{{ node.position }}</small>
                  </div>
                </div>
                <!-- Show children -->
                <div
                  v-if="getChildren(node.id).length"
                  class="preview-children"
                >
                  <div
                    v-for="child in getChildren(node.id)"
                    :key="child.id"
                    class="preview-child-card"
                    :class="'color-' + child.color"
                  >
                    <span>{{ getAvatarIcon(child.avatar) }}</span>
                    <small>{{ child.name }}</small>
                  </div>
                </div>
              </div>
            </div>
            <p v-else class="preview-empty">Add people to see preview</p>
          </div>
          <router-link
            :to="'/org/' + slug"
            class="preview-view-btn"
            target="_blank"
          >
            🔗 Open Full View
          </router-link>
        </aside>
      </div>

      <!-- Status Bar -->
      <div class="status-bar">
        <span class="status-item">📊 {{ nodes.length }} members</span>
        <span class="status-item" v-if="lastSaved"
          >💾 Last saved: {{ formatTime(lastSaved) }}</span
        >
        <span class="status-item unsaved" v-if="hasChanges"
          >⚠️ Unsaved changes</span
        >
      </div>
    </div>

    <!-- Node Editor Modal -->
    <transition name="fade">
      <div v-if="showEditor" class="modal-overlay" @click.self="closeEditor">
        <div class="editor-modal">
          <div class="modal-header">
            <h3>{{ editingNode ? "Edit Person" : "Add Person" }}</h3>
            <button class="close-btn" @click="closeEditor">×</button>
          </div>
          <form @submit.prevent="saveNode" class="node-form">
            <div class="form-row">
              <div class="form-group">
                <label>Name *</label>
                <input v-model="nodeForm.name" type="text" required />
              </div>
              <div class="form-group">
                <label>Position *</label>
                <input v-model="nodeForm.position" type="text" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Department</label>
                <input v-model="nodeForm.department" type="text" />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input v-model="nodeForm.email" type="email" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group full-width">
                <label>Photo URL (Optional)</label>
                <input
                  v-model="nodeForm.imageUrl"
                  type="url"
                  placeholder="https://i.imgur.com/example.jpg"
                />
                <small class="form-hint"
                  >💡 Upload your photo to
                  <a href="https://imgur.com/upload" target="_blank"
                    >imgur.com</a
                  >
                  and paste the URL here</small
                >
              </div>
            </div>
            <div class="form-row">
              <div class="form-group full-width">
                <label>Reports To (Parent)</label>
                <select v-model="selectedParentId" class="parent-select">
                  <option :value="null">-- No Manager (Root Level) --</option>
                  <option
                    v-for="node in availableParents"
                    :key="node.id"
                    :value="node.id"
                  >
                    {{ node.name }} ({{ node.position }})
                  </option>
                </select>
                <small class="form-hint"
                  >Select who this person reports to in the hierarchy</small
                >
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="cancel-btn" @click="closeEditor">
                Cancel
              </button>
              <button type="submit" class="save-btn">
                {{ editingNode ? "Update" : "Add" }}
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
      theme: "dark",
      cardStyle: "modern",
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
        avatar: "person",
        color: "blue",
      },

      themes: [
        { id: "light", name: "Light", color: "#ffffff" },
        { id: "modern-white", name: "Modern White", color: "#f8fafc" },
        { id: "dark", name: "Dark", color: "#1e293b" },
        { id: "blue", name: "Ocean", color: "#1e3a5f" },
        { id: "purple", name: "Violet", color: "#4c1d95" },
        { id: "green", name: "Forest", color: "#064e3b" },
        { id: "warm", name: "Sunset", color: "#7c2d12" },
      ],
      cardStyles: [
        { id: "modern", name: "1. Modern Clean" },
        { id: "gradient", name: "2. Gradient Glow" },
        { id: "minimal", name: "3. Minimal Line" },
        { id: "rounded", name: "4. Rounded Bubble" },
        { id: "shadow", name: "5. Deep Shadow" },
        { id: "glass", name: "6. Glassmorphism" },
        { id: "neon", name: "7. Neon Border" },
        { id: "flat", name: "8. Flat Material" },
        { id: "elegant", name: "9. Elegant Gold" },
        { id: "tech", name: "10. Tech Circuit" },
      ],
      avatarStyles: [
        { id: "person", icon: "🧑" },
        { id: "male", icon: "👨" },
        { id: "female", icon: "👩" },
        { id: "business", icon: "👔" },
        { id: "developer", icon: "👨‍💻" },
        { id: "manager", icon: "👨‍💼" },
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
    selectedParentId: {
      get() {
        return this.parentForNewNode;
      },
      set(val) {
        this.parentForNewNode = val;
      },
    },
    availableParents() {
      // When editing, exclude the current node and its descendants
      if (this.editingNode) {
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
    cardStyle() {
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
        this.cardStyle = data.custom_settings?.style || "modern";
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
              style: this.cardStyle,
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
    getAvatarIcon(id) {
      const icons = {
        person: "🧑",
        male: "👨",
        female: "👩",
        business: "👔",
        developer: "👨‍💻",
        manager: "👨‍💼",
      };
      return icons[id] || "👤";
    },
    formatTime(date) {
      return new Date(date).toLocaleTimeString();
    },
    getChildren(parentId) {
      return this.nodes.filter((n) => n.parentId === parentId);
    },
    copyPublicUrl() {
      navigator.clipboard.writeText(this.publicUrl);
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    },
    expandAll() {
      /* Placeholder */
    },
    addRootNode() {
      console.log("addRootNode called");
      this.editingNode = null;
      this.parentForNewNode = null;
      this.resetForm();
      this.showEditor = true;
      console.log("showEditor is now:", this.showEditor);
    },
    addChild(parentId) {
      console.log("addChild called with parentId:", parentId);
      this.editingNode = null;
      this.parentForNewNode = parentId;
      this.resetForm();
      this.showEditor = true;
      console.log("showEditor is now:", this.showEditor);
    },
    editNode(nodeId) {
      console.log("editNode called with nodeId:", nodeId);
      const node = this.nodes.find((n) => n.id === nodeId);
      if (node) {
        this.editingNode = node;
        this.parentForNewNode = node.parentId || null;
        this.nodeForm = { ...node };
        this.showEditor = true;
        console.log("showEditor is now:", this.showEditor);
      } else {
        console.log("Node not found!");
      }
    },
    async deleteNode(nodeId) {
      if (!confirm("Delete this person and all subordinates?")) return;

      // Collect all IDs to delete (recursively)
      const idsToDelete = new Set();
      const collectIds = (id) => {
        idsToDelete.add(id);
        this.nodes
          .filter((n) => n.parentId === id)
          .forEach((c) => collectIds(c.id));
      };
      collectIds(nodeId);

      // Filter out all nodes to delete
      this.nodes = this.nodes.filter((n) => !idsToDelete.has(n.id));

      // Auto-save to database
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
        // Update existing node
        const idx = this.nodes.findIndex((n) => n.id === this.editingNode.id);
        if (idx !== -1) {
          const updatedNode = {
            ...this.nodes[idx],
            name: this.nodeForm.name,
            position: this.nodeForm.position,
            department: this.nodeForm.department,
            email: this.nodeForm.email,
            avatar: this.nodeForm.avatar,
            color: this.nodeForm.color,
            parentId: this.parentForNewNode,
          };
          // Use splice for Vue reactivity
          this.nodes.splice(idx, 1, updatedNode);
        }
      } else {
        // Add new node
        const newNode = {
          id: Date.now().toString(),
          name: this.nodeForm.name,
          position: this.nodeForm.position,
          department: this.nodeForm.department,
          email: this.nodeForm.email,
          avatar: this.nodeForm.avatar,
          color: this.nodeForm.color,
          parentId: this.parentForNewNode,
        };
        this.nodes.push(newNode);
      }
      this.closeEditor();
      // Auto-save to database
      await this.saveChanges();
    },
  },
};
</script>

<style scoped>
.org-edit-page {
  min-height: 100vh;
  background: #0a0a1a;
  position: relative;
}

.bg-gradient {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #0f0f23, #1a1a3e);
  z-index: 0;
}

.floating-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  z-index: 0;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  top: -100px;
  right: -100px;
}
.orb-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
  bottom: -50px;
  left: -50px;
}

/* Loading/Error */
.loading-screen,
.error-screen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: #14b8a6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.error-screen h2 {
  color: white;
}
.error-screen p {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
}
.go-demo-btn {
  padding: 0.75rem 1.5rem;
  background: #14b8a6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}

/* Edit Container */
.edit-container {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.edit-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Share Bar */
.share-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(20, 184, 166, 0.1);
  border-bottom: 1px solid rgba(20, 184, 166, 0.2);
}

.share-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

.share-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 0.85rem;
}

.copy-btn {
  padding: 0.5rem 1rem;
  background: #14b8a6;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.copy-btn:hover {
  background: #0d9488;
}

.view-btn {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
  white-space: nowrap;
}

.view-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.header-left,
.header-right {
  flex: 1;
}
.header-center {
  flex: 2;
  text-align: center;
}
.header-right {
  text-align: right;
}

.back-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
}
.edit-title {
  color: white;
  font-size: 1.25rem;
  margin: 0;
}

.save-btn {
  padding: 0.6rem 1.25rem;
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Panels */
.edit-panels {
  flex: 1;
  display: grid;
  grid-template-columns: 280px 1fr 260px;
  gap: 1px;
  background: rgba(255, 255, 255, 0.05);
}

.settings-panel,
.preview-panel {
  background: rgba(0, 0, 0, 0.3);
  padding: 1.25rem;
}

.settings-panel h3,
.preview-panel h3 {
  color: white;
  font-size: 1rem;
  margin: 0 0 1rem;
}

.setting-group {
  margin-bottom: 1rem;
}

.setting-group label {
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
}

.setting-group input,
.setting-group textarea,
.setting-group select {
  width: 100%;
  padding: 0.6rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;
}

.setting-group select option {
  background: #1a1a3e;
  color: white;
}

.theme-picker {
  display: flex;
  gap: 0.4rem;
}

.theme-swatch {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.theme-swatch:hover {
  transform: scale(1.1);
}

.theme-swatch.active {
  border-color: #14b8a6;
  box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);
}

.setting-group.checkbox label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.danger-zone {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.danger-zone h4 {
  color: #ef4444;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.delete-btn {
  width: 100%;
  padding: 0.6rem;
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid #ef4444;
  border-radius: 6px;
  color: #ef4444;
  cursor: pointer;
}

/* Chart Editor */
.chart-editor {
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  overflow-y: auto;
}

.editor-toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-btn {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.tool-btn {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.nodes-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.node-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 3px solid #14b8a6;
}

.node-connector {
  color: rgba(255, 255, 255, 0.3);
  font-family: monospace;
}

.node-avatar {
  font-size: 1.25rem;
}

.node-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.node-info strong {
  color: white;
  font-size: 0.9rem;
}
.node-info span {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
}

.node-actions {
  display: flex;
  gap: 0.25rem;
}

.node-actions button {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.node-actions button:hover {
  background: rgba(255, 255, 255, 0.2);
}
.node-actions button.del:hover {
  background: #ef4444;
}

.empty-editor {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Preview Panel */
.preview-container {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 1rem;
  min-height: 200px;
  overflow-y: auto;
  max-height: 400px;
}

.preview-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.preview-node-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
}

.preview-card.color-teal {
  border-left-color: #14b8a6;
}
.preview-card.color-purple {
  border-left-color: #8b5cf6;
}
.preview-card.color-pink {
  border-left-color: #ec4899;
}
.preview-card.color-orange {
  border-left-color: #f97316;
}
.preview-card.color-green {
  border-left-color: #22c55e;
}

.preview-avatar {
  font-size: 1.5rem;
}

.preview-info {
  display: flex;
  flex-direction: column;
}

.preview-info strong {
  color: white;
  font-size: 0.85rem;
}

.preview-info small {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
}

.preview-children {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.2);
}

.preview-child-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  border-left: 3px solid #3b82f6;
}

.preview-child-card.color-teal {
  border-left-color: #14b8a6;
}
.preview-child-card.color-purple {
  border-left-color: #8b5cf6;
}
.preview-child-card.color-pink {
  border-left-color: #ec4899;
}
.preview-child-card.color-orange {
  border-left-color: #f97316;
}
.preview-child-card.color-green {
  border-left-color: #22c55e;
}

.preview-child-card span {
  font-size: 1rem;
}

.preview-child-card small {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.7rem;
}

.preview-view-btn {
  display: block;
  margin-top: 1rem;
  padding: 0.6rem;
  background: rgba(20, 184, 166, 0.2);
  border: 1px solid rgba(20, 184, 166, 0.4);
  border-radius: 8px;
  color: #14b8a6;
  text-decoration: none;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
}

.preview-view-btn:hover {
  background: rgba(20, 184, 166, 0.3);
}

.preview-empty {
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
}

/* Status Bar */
.status-bar {
  display: flex;
  gap: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.status-item {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
}
.status-item.unsaved {
  color: #fbbf24;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 1rem;
}

.editor-modal {
  background: linear-gradient(135deg, #1a1a3e, #2d2d5a);
  border-radius: 16px;
  width: 100%;
  max-width: 550px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  color: white;
  margin: 0;
}
.close-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

.node-form {
  padding: 1.25rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.form-row .form-group {
  flex: 1;
}

.form-group label {
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
}
.form-group input {
  width: 100%;
  padding: 0.6rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
}

.avatar-options,
.color-options {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
}
.avatar-btn {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.1);
  font-size: 1.1rem;
  cursor: pointer;
}
.avatar-btn.selected {
  border-color: #14b8a6;
}
.color-btn {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 2px solid transparent;
  cursor: pointer;
}
.color-btn.selected {
  border-color: white;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}
.cancel-btn,
.save-btn {
  flex: 1;
  padding: 0.7rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.cancel-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}
.save-btn {
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
  border: none;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .edit-panels {
    grid-template-columns: 1fr;
  }
  .settings-panel,
  .preview-panel {
    display: none;
  }
}

/* Parent Select Styles */
.form-group.full-width {
  grid-column: 1 / -1;
}

.parent-select {
  width: 100%;
  padding: 0.6rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
}

.parent-select option {
  background: #1a1a3e;
  color: white;
}

.form-hint {
  display: block;
  margin-top: 0.4rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
}

/* Responsive improvements */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }

  .node-row {
    flex-wrap: wrap;
  }

  .node-actions {
    width: 100%;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }

  .edit-header {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }

  .header-left,
  .header-right {
    text-align: center;
  }

  .editor-modal {
    max-width: 95%;
    max-height: 90vh;
    overflow-y: auto;
  }
}
</style>
