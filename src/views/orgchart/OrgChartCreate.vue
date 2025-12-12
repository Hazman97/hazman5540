<template>
  <div class="create-page">
    <!-- Background Effects -->
    <div class="bg-gradient"></div>
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>

    <!-- Success Screen -->
    <transition name="fade">
      <div v-if="created" class="success-screen">
        <div class="success-card">
          <div class="success-icon">🎉</div>
          <h2 class="success-title">Organization Chart Created!</h2>
          <p class="success-message">
            Your chart for <strong>{{ companyName }}</strong> is ready!
          </p>

          <!-- Share Link -->
          <div class="link-box">
            <label>📤 Shareable Link:</label>
            <div class="link-row">
              <input type="text" :value="shareLink" readonly ref="shareInput" />
              <button @click="copyShareLink" class="copy-btn">
                {{ copied === "share" ? "✓" : "📋" }}
              </button>
            </div>
          </div>

          <!-- Management Link -->
          <div class="link-box management">
            <label>🔐 Edit Link (save this!):</label>
            <div class="link-row">
              <input type="text" :value="editLink" readonly ref="editInput" />
              <button @click="copyEditLink" class="copy-btn">
                {{ copied === "edit" ? "✓" : "📋" }}
              </button>
            </div>
            <p class="warning-text">
              ⚠️ Save this link to edit your chart later!
            </p>
          </div>

          <div class="success-buttons">
            <button @click="viewChart" class="primary-btn">
              <span>View Chart</span>
              <span>→</span>
            </button>
            <button @click="createAnother" class="secondary-btn">
              Create Another
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Creation Form -->
    <div v-if="!created" class="form-container">
      <div class="form-card">
        <!-- Progress Steps -->
        <div class="progress-bar">
          <div
            v-for="s in 4"
            :key="s"
            class="progress-step"
            :class="{ active: step >= s, current: step === s }"
          >
            <span class="step-number">{{ s }}</span>
          </div>
        </div>

        <!-- Header -->
        <div class="form-header">
          <div class="header-icon">{{ stepIcons[step - 1] }}</div>
          <h1 class="form-title">{{ stepTitles[step - 1] }}</h1>
          <p class="form-subtitle">{{ stepDescriptions[step - 1] }}</p>
        </div>

        <!-- Step 1: Company Info -->
        <div v-if="step === 1" class="step-content">
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">🏢</span>
              Company/Team Name
            </label>
            <input
              v-model="companyName"
              type="text"
              class="form-input"
              placeholder="e.g., Acme Corporation"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">🔗</span>
              URL Slug
            </label>
            <div class="slug-input-wrapper">
              <span class="slug-prefix">/org/</span>
              <input
                v-model="slug"
                type="text"
                class="form-input slug-input"
                placeholder="acme-corp"
                @input="formatSlug"
              />
            </div>
            <p class="input-hint">
              Your chart will be at: {{ baseUrl }}/org/{{ slug || "your-slug" }}
            </p>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📝</span>
              Description (optional)
            </label>
            <textarea
              v-model="description"
              class="form-textarea"
              placeholder="A brief description of your organization..."
              rows="3"
            ></textarea>
          </div>
        </div>

        <!-- Step 2: Choose Theme -->
        <div v-if="step === 2" class="step-content">
          <div class="templates-grid">
            <div
              v-for="t in themes"
              :key="t.id"
              class="template-card"
              :class="{ selected: selectedTheme === t.id }"
              @click="selectedTheme = t.id"
            >
              <div class="template-preview" :style="{ background: t.gradient }">
                <span class="template-icon">{{ t.icon }}</span>
              </div>
              <h4 class="template-name">{{ t.name }}</h4>
              <p class="template-desc">{{ t.description }}</p>
              <div v-if="selectedTheme === t.id" class="selected-badge">✓</div>
            </div>
          </div>
        </div>

        <!-- Step 3: Build Structure -->
        <div v-if="step === 3" class="step-content build-step">
          <div class="builder-area">
            <div class="builder-toolbar">
              <button @click="addRootNode" class="add-btn">
                <span>➕</span> Add Person
              </button>
            </div>

            <div class="nodes-list" v-if="nodes.length">
              <div
                v-for="node in nodes"
                :key="node.id"
                class="node-item"
                :style="{ marginLeft: getNodeIndent(node) + 'px' }"
              >
                <span class="node-avatar">{{
                  getAvatarIcon(node.avatar)
                }}</span>
                <div class="node-details">
                  <strong>{{ node.name }}</strong>
                  <small>{{ node.position }}</small>
                </div>
                <div class="node-actions">
                  <button
                    @click="addChildTo(node.id)"
                    class="action-btn"
                    title="Add subordinate"
                  >
                    ➕
                  </button>
                  <button
                    @click="editNode(node.id)"
                    class="action-btn"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    @click="deleteNode(node.id)"
                    class="action-btn delete"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="empty-builder">
              <p>No members yet. Click "Add Person" to start.</p>
            </div>
          </div>
        </div>

        <!-- Step 4: Customize -->
        <div v-if="step === 4" class="step-content">
          <div class="customize-preview">
            <div class="preview-label">📱 Preview</div>
            <div class="preview-chart" :class="'theme-' + selectedTheme">
              <div
                v-for="node in rootNodes"
                :key="node.id"
                class="preview-node"
              >
                <div class="preview-card" :class="'color-' + node.color">
                  <span class="preview-avatar">{{
                    getAvatarIcon(node.avatar)
                  }}</span>
                  <strong>{{ node.name }}</strong>
                  <small>{{ node.position }}</small>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="allowExport" />
              <span class="checkbox-custom"></span>
              <span>Allow viewers to export chart</span>
            </label>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="nav-buttons">
          <button
            v-if="step > 1"
            @click="step--"
            class="back-btn"
            type="button"
          >
            ← Back
          </button>
          <button
            v-if="step < 4"
            @click="nextStep"
            class="next-btn"
            :disabled="!canProceed"
          >
            Next →
          </button>
          <button
            v-if="step === 4"
            @click="createChart"
            class="create-btn"
            :disabled="isSubmitting"
          >
            <span v-if="!isSubmitting">🎉 Create Chart</span>
            <span v-else class="loading">Creating...</span>
          </button>
        </div>

        <!-- Error Message -->
        <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
      </div>

      <router-link to="/org-demo" class="back-link"
        >← Try Demo First</router-link
      >
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
            <div class="form-group">
              <label>Name *</label>
              <input
                v-model="nodeForm.name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
            <div class="form-group">
              <label>Position *</label>
              <input
                v-model="nodeForm.position"
                type="text"
                placeholder="CEO, Manager..."
                required
              />
            </div>
            <div class="form-group">
              <label>Department</label>
              <input
                v-model="nodeForm.department"
                type="text"
                placeholder="Engineering..."
              />
            </div>
            <div class="form-group">
              <label>Avatar</label>
              <div class="avatar-options">
                <button
                  v-for="av in avatarStyles"
                  :key="av.id"
                  type="button"
                  class="avatar-btn"
                  :class="{ selected: nodeForm.avatar === av.id }"
                  @click="nodeForm.avatar = av.id"
                >
                  {{ av.icon }}
                </button>
              </div>
            </div>
            <div class="form-group">
              <label>Card Color</label>
              <div class="color-options">
                <button
                  v-for="color in cardColors"
                  :key="color.id"
                  type="button"
                  class="color-btn"
                  :class="{ selected: nodeForm.color === color.id }"
                  :style="{ background: color.value }"
                  @click="nodeForm.color = color.id"
                ></button>
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
  name: "OrgChartCreate",
  data() {
    return {
      step: 1,
      companyName: "",
      slug: "",
      description: "",
      selectedTheme: "corporate",
      allowExport: true,
      nodes: [],
      isSubmitting: false,
      errorMsg: "",
      created: false,
      createdSlug: null,
      ownerToken: null,
      copied: null,

      // Editor state
      showEditor: false,
      editingNode: null,
      parentForNewNode: null,
      nodeForm: {
        name: "",
        position: "",
        department: "",
        avatar: "person",
        color: "blue",
      },

      stepTitles: [
        "Company Info",
        "Choose Theme",
        "Build Structure",
        "Finalize",
      ],
      stepDescriptions: [
        "Enter your company or team details",
        "Pick a beautiful theme for your chart",
        "Add people to your organization",
        "Review and create your chart",
      ],
      stepIcons: ["🏢", "🎨", "👥", "✨"],

      themes: [
        {
          id: "corporate",
          name: "Corporate",
          description: "Professional navy theme",
          icon: "🏢",
          gradient: "linear-gradient(135deg, #1e3a5f, #2d5a87)",
        },
        {
          id: "modern",
          name: "Modern",
          description: "Vibrant gradients",
          icon: "✨",
          gradient: "linear-gradient(135deg, #667eea, #764ba2)",
        },
        {
          id: "creative",
          name: "Creative",
          description: "Bold & colorful",
          icon: "🎨",
          gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
        },
        {
          id: "minimal",
          name: "Minimal",
          description: "Clean grayscale",
          icon: "⚪",
          gradient: "linear-gradient(135deg, #434343, #000000)",
        },
        {
          id: "dark",
          name: "Dark",
          description: "Sleek dark mode",
          icon: "🌙",
          gradient: "linear-gradient(135deg, #0f0f23, #1a1a2e)",
        },
        {
          id: "nature",
          name: "Nature",
          description: "Fresh green tones",
          icon: "🌿",
          gradient: "linear-gradient(135deg, #134e5e, #71b280)",
        },
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
    baseUrl() {
      return window.location.origin;
    },
    canProceed() {
      if (this.step === 1) return this.companyName.trim() && this.slug.trim();
      if (this.step === 3) return this.nodes.length > 0;
      return true;
    },
    shareLink() {
      return `${this.baseUrl}/org/${this.createdSlug}`;
    },
    editLink() {
      return `${this.baseUrl}/org/${this.createdSlug}/edit?token=${this.ownerToken}`;
    },
    rootNodes() {
      return this.nodes.filter((n) => !n.parentId);
    },
  },
  watch: {
    companyName(val) {
      if (
        !this.slug ||
        this.slug === this.generateSlug(this.companyName.slice(0, -1))
      ) {
        this.slug = this.generateSlug(val);
      }
    },
  },
  methods: {
    generateSlug(text) {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .substring(0, 50);
    },
    formatSlug() {
      this.slug = this.slug
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-|-$/g, "");
    },
    nextStep() {
      if (this.canProceed) this.step++;
    },
    getNodeIndent(node) {
      let indent = 0;
      let current = node;
      while (current.parentId) {
        indent += 30;
        current = this.nodes.find((n) => n.id === current.parentId) || {
          parentId: null,
        };
      }
      return indent;
    },
    getAvatarIcon(avatarId) {
      const icons = {
        person: "🧑",
        male: "👨",
        female: "👩",
        business: "👔",
        developer: "👨‍💻",
        manager: "👨‍💼",
      };
      return icons[avatarId] || "👤";
    },
    addRootNode() {
      this.editingNode = null;
      this.parentForNewNode = null;
      this.resetForm();
      this.showEditor = true;
    },
    addChildTo(parentId) {
      this.editingNode = null;
      this.parentForNewNode = parentId;
      this.resetForm();
      this.showEditor = true;
    },
    editNode(nodeId) {
      const node = this.nodes.find((n) => n.id === nodeId);
      if (node) {
        this.editingNode = node;
        this.nodeForm = { ...node };
        this.showEditor = true;
      }
    },
    deleteNode(nodeId) {
      if (confirm("Delete this person?")) {
        const deleteRecursive = (id) => {
          const children = this.nodes.filter((n) => n.parentId === id);
          children.forEach((c) => deleteRecursive(c.id));
          this.nodes = this.nodes.filter((n) => n.id !== id);
        };
        deleteRecursive(nodeId);
      }
    },
    resetForm() {
      this.nodeForm = {
        name: "",
        position: "",
        department: "",
        avatar: "person",
        color: "blue",
      };
    },
    closeEditor() {
      this.showEditor = false;
      this.editingNode = null;
      this.parentForNewNode = null;
    },
    saveNode() {
      if (this.editingNode) {
        const idx = this.nodes.findIndex((n) => n.id === this.editingNode.id);
        if (idx !== -1)
          this.nodes[idx] = { ...this.nodes[idx], ...this.nodeForm };
      } else {
        this.nodes.push({
          id: Date.now().toString(),
          ...this.nodeForm,
          parentId: this.parentForNewNode,
        });
      }
      this.closeEditor();
    },
    async createChart() {
      this.isSubmitting = true;
      this.errorMsg = "";

      try {
        this.ownerToken =
          Math.random().toString(36).substring(2) + Date.now().toString(36);

        const { data, error } = await supabase
          .from("org_charts")
          .insert({
            slug: this.slug,
            title: this.companyName,
            description: this.description,
            theme: this.selectedTheme,
            owner_token: this.ownerToken,
            chart_data: this.nodes,
            custom_settings: { allowExport: this.allowExport },
          })
          .select()
          .single();

        if (error) throw error;

        this.createdSlug = this.slug;
        this.created = true;
      } catch (err) {
        console.error("Error creating chart:", err);
        this.errorMsg =
          err.message || "Failed to create chart. Please try again.";
      } finally {
        this.isSubmitting = false;
      }
    },
    copyShareLink() {
      navigator.clipboard.writeText(this.shareLink);
      this.copied = "share";
      setTimeout(() => (this.copied = null), 2000);
    },
    copyEditLink() {
      navigator.clipboard.writeText(this.editLink);
      this.copied = "edit";
      setTimeout(() => (this.copied = null), 2000);
    },
    viewChart() {
      this.$router.push(`/org/${this.createdSlug}`);
    },
    createAnother() {
      this.created = false;
      this.step = 1;
      this.companyName = "";
      this.slug = "";
      this.description = "";
      this.nodes = [];
      this.selectedTheme = "corporate";
    },
  },
};
</script>

<style scoped>
/* Reuse styles from OrgChartDemo + BirthdayCreate patterns */
.create-page {
  min-height: 100vh;
  background: #0a0a1a;
  position: relative;
  overflow-x: hidden;
}

.bg-gradient {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%);
  z-index: 0;
}

.floating-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  z-index: 0;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
  top: -100px;
  right: -100px;
  animation: float 8s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  bottom: -100px;
  left: -100px;
  animation: float 10s ease-in-out infinite reverse;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

/* Form Container */
.form-container {
  position: relative;
  z-index: 10;
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
}

/* Progress Bar */
.progress-bar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.progress-step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  position: relative;
}

.progress-step.active {
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
}

.progress-step.current {
  box-shadow: 0 0 20px rgba(20, 184, 166, 0.5);
}

.step-number {
  color: white;
  font-weight: 600;
}

/* Header */
.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.header-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.form-title {
  font-size: 1.75rem;
  color: white;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: rgba(255, 255, 255, 0.6);
}

/* Form Groups */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.label-icon {
  font-size: 1.1rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #14b8a6;
  background: rgba(255, 255, 255, 0.12);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.slug-input-wrapper {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  overflow: hidden;
}

.slug-prefix {
  padding: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.05);
}

.slug-input {
  border: none;
  border-radius: 0;
}

.input-hint {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

/* Templates Grid */
.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.template-card {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
  border-radius: 16px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  text-align: center;
}

.template-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.2);
}

.template-card.selected {
  border-color: #14b8a6;
  background: rgba(20, 184, 166, 0.1);
}

.template-preview {
  width: 100%;
  height: 80px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.template-icon {
  font-size: 2rem;
}

.template-name {
  color: white;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.template-desc {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
}

.selected-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 24px;
  height: 24px;
  background: #14b8a6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

/* Builder */
.builder-area {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 1rem;
  min-height: 300px;
}

.builder-toolbar {
  margin-bottom: 1rem;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.add-btn:hover {
  transform: translateY(-2px);
}

.nodes-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.node-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border-left: 3px solid #14b8a6;
}

.node-avatar {
  font-size: 1.5rem;
}

.node-details {
  flex: 1;
}

.node-details strong {
  color: white;
  display: block;
}

.node-details small {
  color: rgba(255, 255, 255, 0.6);
}

.node-actions {
  display: flex;
  gap: 0.25rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.action-btn.delete:hover {
  background: #ef4444;
}

.empty-builder {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Navigation Buttons */
.nav-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.back-btn,
.next-btn,
.create-btn {
  flex: 1;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.back-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.next-btn,
.create-btn {
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
  border: none;
  color: white;
}

.next-btn:disabled,
.create-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.next-btn:not(:disabled):hover,
.create-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(20, 184, 166, 0.3);
}

/* Back Link */
.back-link {
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.3s;
}

.back-link:hover {
  color: #14b8a6;
}

/* Success Screen */
.success-screen {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.success-card {
  background: linear-gradient(135deg, #1a1a3e, #2d2d5a);
  border-radius: 24px;
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.success-title {
  color: white;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.success-message {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

.link-box {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: left;
}

.link-box label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.5rem;
}

.link-row {
  display: flex;
  gap: 0.5rem;
}

.link-row input {
  flex: 1;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 0.85rem;
}

.copy-btn {
  padding: 0 1rem;
  background: #14b8a6;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

.warning-text {
  color: #fbbf24;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.success-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.primary-btn,
.secondary-btn {
  flex: 1;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.primary-btn {
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
  border: none;
  color: white;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

/* Modal - reuse from Demo */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 1rem;
}

.editor-modal {
  background: linear-gradient(135deg, #1a1a3e, #2d2d5a);
  border-radius: 20px;
  width: 100%;
  max-width: 450px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  color: white;
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
}

.node-form {
  padding: 1.25rem;
}

.node-form .form-group {
  margin-bottom: 1rem;
}

.node-form label {
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
}

.node-form input {
  width: 100%;
  padding: 0.7rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
}

.avatar-options,
.color-options {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.avatar-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.1);
  font-size: 1.25rem;
  cursor: pointer;
}

.avatar-btn.selected {
  border-color: #14b8a6;
  background: rgba(20, 184, 166, 0.2);
}

.color-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 2px solid transparent;
  cursor: pointer;
}

.color-btn.selected {
  border-color: white;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.cancel-btn,
.save-btn {
  flex: 1;
  padding: 0.75rem;
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

/* Checkbox */
.checkbox-group {
  margin-top: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}

.checkbox-label input {
  display: none;
}

.checkbox-custom {
  width: 22px;
  height: 22px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  position: relative;
}

.checkbox-label input:checked + .checkbox-custom {
  background: #14b8a6;
  border-color: #14b8a6;
}

.checkbox-label input:checked + .checkbox-custom::after {
  content: "✓";
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
}

/* Preview */
.customize-preview {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.preview-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.preview-chart {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.preview-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  min-width: 120px;
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
  display: block;
  margin-bottom: 0.5rem;
}

.preview-card strong {
  color: white;
  display: block;
  font-size: 0.9rem;
}

.preview-card small {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
}

.error-message {
  color: #ef4444;
  text-align: center;
  margin-top: 1rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    padding: 1rem;
    min-height: auto;
  }

  .form-card {
    padding: 1.25rem;
    border-radius: 16px;
  }

  .form-title {
    font-size: 1.25rem;
  }

  .form-subtitle {
    font-size: 0.85rem;
  }

  .progress-bar {
    gap: 0.5rem;
  }

  .progress-step {
    width: 32px;
    height: 32px;
  }

  .templates-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .template-preview {
    height: 60px;
  }

  .template-icon {
    font-size: 1.5rem;
  }

  .nav-buttons {
    flex-direction: column;
    gap: 0.75rem;
  }

  .nav-buttons button {
    width: 100%;
  }

  .nodes-list {
    max-height: 300px;
  }

  .node-item {
    padding: 0.75rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .node-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .success-card {
    padding: 1.5rem;
  }

  .success-title {
    font-size: 1.25rem;
  }

  .link-row input {
    font-size: 0.75rem;
  }

  .success-buttons {
    flex-direction: column;
    gap: 0.75rem;
  }

  .success-buttons button {
    width: 100%;
  }

  /* Modal adjustments */
  .editor-modal {
    max-width: 95%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .avatar-options,
  .color-options {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .header-icon {
    font-size: 2rem;
  }

  .templates-grid {
    grid-template-columns: 1fr;
  }

  .slug-input-wrapper {
    flex-direction: column;
  }

  .slug-prefix {
    border-radius: 12px 12px 0 0;
  }

  .slug-input {
    border-radius: 0 0 12px 12px;
  }
}
</style>
