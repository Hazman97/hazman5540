<template>
  <div class="create-page">
    <!-- Modern Background -->
    <div class="page-bg"></div>

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
/* Modern Theme matching OrgChartDemo */
.create-page {
  min-height: 100vh;
  background: #f8fafc;
  font-family: "Inter", system-ui, sans-serif;
  color: #1e293b;
  display: flex;
  flex-direction: column;
}

/* Form Container */
.form-container {
  max-width: 800px;
  margin: 3rem auto;
  padding: 0 1.5rem;
  width: 100%;
}

.form-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.05),
    0 8px 16px -4px rgba(0, 0, 0, 0.02);
  padding: 2.5rem;
  border: 1px solid #e2e8f0;
}

/* Progress Bar */
.progress-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  position: relative;
}

.progress-step {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  border: 2px solid #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  position: relative;
  z-index: 2;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.progress-step.active {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #334155;
}

.progress-step.current {
  background: #0f172a;
  border-color: #0f172a;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
}

.progress-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 2px;
  background: #e2e8f0;
  z-index: 1;
}

/* Header */
.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.header-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  width: 80px;
  height: 80px;
  border-radius: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  border: 1px solid #e2e8f0;
}

.form-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.form-subtitle {
  color: #64748b;
  font-size: 1rem;
}

/* Form Groups */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
}

.label-icon {
  margin-right: 0.4rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #1e293b;
  transition: all 0.2s;
  background: #f8fafc;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.slug-input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
  overflow: hidden;
  transition: all 0.2s;
}

.slug-input-wrapper:focus-within {
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.slug-prefix {
  padding: 0 0.75rem;
  color: #94a3b8;
  font-weight: 500;
  background: #f1f5f9;
  height: 46px;
  display: flex;
  align-items: center;
  border-right: 1px solid #e2e8f0;
}

.slug-input {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  padding-left: 0.75rem;
}

.input-hint {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #64748b;
}

/* Theme Grid */
.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

.template-card {
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  background: white;
}

.template-card:hover {
  transform: translateY(-2px);
  border-color: #cbd5e1;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.05);
}

.template-card.selected {
  border-color: #0f172a;
  background: #f8fafc;
}

.template-preview {
  height: 80px;
  border-radius: 10px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.template-name {
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.template-desc {
  font-size: 0.8rem;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
}

.selected-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  background: #0f172a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  border: 2px solid white;
}

/* Builder Step */
.builder-toolbar {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
}

.add-btn {
  background: #0f172a;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.add-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.2);
}

.nodes-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.node-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.2s;
  position: relative;
}

.node-item::before {
  content: "";
  position: absolute;
  left: -20px;
  top: 50%;
  width: 15px;
  height: 2px;
  background: #e2e8f0;
  display: none; /* Only show for children */
}

.node-item:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.node-avatar {
  width: 36px;
  height: 36px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.node-details {
  flex: 1;
}

.node-details strong {
  display: block;
  font-size: 0.9rem;
  color: #1e293b;
}

.node-details small {
  color: #64748b;
  font-size: 0.8rem;
}

.node-actions {
  display: flex;
  gap: 0.5rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.node-item:hover .node-actions {
  opacity: 1;
}

.action-btn {
  background: transparent;
  border: 1px solid transparent;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  color: #64748b;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #f1f5f9;
  border-color: #e2e8f0;
  color: #1e293b;
}

.action-btn.delete:hover {
  background: #fef2f2;
  border-color: #fecaca;
  color: #ef4444;
}

/* Nav Buttons */
.nav-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
}

.back-btn {
  background: transparent;
  color: #64748b;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
}

.back-btn:hover {
  background: #f1f5f9;
  color: #334155;
}

.next-btn,
.create-btn {
  background: #0f172a;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.next-btn:hover,
.create-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.25);
  background: #1e293b;
}

.next-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.editor-modal {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  animation: modalSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalSlide {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #0f172a;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #f1f5f9;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.node-form {
  padding: 1.5rem;
}

.avatar-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.avatar-btn {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-btn:hover {
  background: #f8fafc;
  transform: translateY(-1px);
}

.avatar-btn.selected {
  border-color: #0f172a;
  background: #f1f5f9;
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.1);
}

.color-options {
  display: flex;
  gap: 0.75rem;
}

.color-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 2px solid white;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-btn.selected {
  transform: scale(1.1);
  box-shadow: 0 0 0 2px #0f172a;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-btn,
.save-btn {
  flex: 1;
  padding: 0.75rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
}

.cancel-btn {
  background: white;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

.cancel-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.save-btn {
  background: #0f172a;
  border: none;
  color: white;
}

.save-btn:hover {
  background: #1e293b;
}

/* Success Screen */
.success-screen {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.success-card {
  background: white;
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.success-title {
  font-size: 1.8rem;
  color: #0f172a;
  margin-bottom: 1rem;
}

.success-message {
  color: #64748b;
  margin-bottom: 2rem;
}

.link-box {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: left;
  border: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
}

.link-box.management {
  background: #fff7ed;
  border-color: #ffedd5;
}

.link-box label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.link-row {
  display: flex;
  gap: 0.5rem;
}

.link-row input {
  flex: 1;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  color: #334155;
  background: white;
}

.copy-btn {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: #f1f5f9;
}

.warning-text {
  font-size: 0.8rem;
  color: #c2410c;
  margin-top: 0.75rem;
  font-weight: 500;
}

.success-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.primary-btn {
  background: #0f172a;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.secondary-btn {
  background: transparent;
  color: #64748b;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.secondary-btn:hover {
  color: #334155;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 640px) {
  .form-card {
    padding: 1.5rem;
  }
  .header-icon {
    font-size: 2.5rem;
    width: 64px;
    height: 64px;
  }
  .form-title {
    font-size: 1.5rem;
  }
}
</style>
