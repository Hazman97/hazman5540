<template>
  <div class="org-demo-page" :class="'theme-' + selectedTheme">
    <div class="page-background"></div>

    <!-- Orphan Alert Banner -->
    <div v-if="orphanNodes.length > 0" class="orphan-alert">
      <div class="orphan-alert-content">
        <span class="orphan-icon">⚠️</span>
        <div class="orphan-text">
          <strong>Tree Structure Issue Detected!</strong>
          <span
            >{{ orphanNodes.length }} person(s) have missing parent
            connections.</span
          >
        </div>
        <button class="fix-btn" @click="showOrphanFixer = true">
          🔧 Fix Now
        </button>
      </div>
    </div>

    <!-- Header -->
    <header class="demo-header">
      <router-link to="/portfolio" class="back-link"
        >← Back to Portfolio</router-link
      >
      <div class="header-center">
        <h1 class="demo-title">Organization Chart Builder</h1>
        <p class="demo-subtitle">
          Create professional org charts for your team
        </p>
      </div>
      <router-link to="/org/create" class="cta-btn"
        >+ Create Your Own</router-link
      >
    </header>

    <!-- Toolbar -->
    <div class="toolbar">
      <div class="toolbar-section">
        <button class="tool-btn primary" @click="addRootNode">
          👤 Add Person
        </button>
        <div class="divider"></div>
        <button class="tool-btn" @click="fitChart">⊡ Fit</button>
        <button class="tool-btn" @click="expandAll">↓ Expand</button>
        <button class="tool-btn" @click="collapseAll">→ Collapse</button>
      </div>

      <div class="toolbar-section">
        <span class="label">Theme:</span>
        <div class="picker">
          <button
            v-for="t in themes"
            :key="t.id"
            class="swatch"
            :class="{ active: selectedTheme === t.id }"
            :style="{ background: t.color }"
            @click="applyTheme(t.id)"
            :title="t.name"
          ></button>
        </div>
      </div>

      <div class="toolbar-section">
        <span class="label">Style:</span>
        <select
          v-model="selectedStyle"
          @change="renderChart"
          class="style-select"
        >
          <option v-for="s in cardStyles" :key="s.id" :value="s.id">
            {{ s.name }}
          </option>
        </select>
      </div>

      <div class="toolbar-section search-section">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or ID..."
            @input="onSearch"
          />
          <span class="search-icon">🔍</span>
        </div>
        <div v-if="searchResults.length && searchQuery" class="search-results">
          <div
            v-for="r in searchResults"
            :key="r.id"
            class="search-item"
            @click="focusNode(r.id)"
          >
            <span
              class="result-avatar"
              :style="{ background: getColorValue(r.color) }"
              >{{ getInitials(r.name) }}</span
            >
            <div class="result-info">
              <strong>{{ r.name }}</strong>
              <small>{{ r.workerId }} • {{ r.position }}</small>
            </div>
          </div>
        </div>
      </div>

      <div class="toolbar-section">
        <button class="tool-btn export-btn" @click="exportChart">
          📥 Export PNG
        </button>
      </div>
    </div>

    <!-- Department Legend -->
    <div class="department-legend">
      <span class="legend-label">Departments:</span>
      <div
        v-for="dept in departments"
        :key="dept.name"
        class="dept-tag"
        :style="{
          background: dept.color + '20',
          borderColor: dept.color,
          color: dept.color,
        }"
      >
        <span class="dept-dot" :style="{ background: dept.color }"></span>
        {{ dept.name }} ({{ dept.count }})
      </div>
      <div class="legend-stats">
        <span class="stat">👥 {{ nodes.length }} employees</span>
        <span v-if="orphanNodes.length" class="stat warning"
          >⚠️ {{ orphanNodes.length }} orphan(s)</span
        >
      </div>
    </div>

    <!-- Chart Container -->
    <div class="chart-area" ref="chartArea">
      <div ref="chartContainer" class="chart-canvas"></div>
    </div>

    <!-- Demo Badge -->
    <div class="demo-badge">
      🎯 Demo Mode — <router-link to="/org/create">Create yours</router-link> to
      save & share
    </div>

    <!-- Node Editor Modal -->
    <div v-if="showEditor" class="modal-backdrop" @click.self="closeEditor">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ modalTitle }}</h3>
          <button class="close-btn" @click="closeEditor">×</button>
        </div>
        <form @submit.prevent="saveNode" class="modal-body">
          <div class="field">
            <label>Worker ID *</label>
            <div class="id-input-row">
              <input
                v-model="nodeForm.workerId"
                type="text"
                placeholder="EMP001"
                required
                :readonly="isReplacing"
              />
              <button
                type="button"
                class="generate-id-btn"
                @click="generateWorkerId"
                v-if="!isReplacing"
              >
                🔄 Generate
              </button>
            </div>
            <small v-if="workerIdError" class="error-text">{{
              workerIdError
            }}</small>
          </div>
          <div class="field">
            <label>Name *</label>
            <input
              v-model="nodeForm.name"
              type="text"
              placeholder="John Doe"
              required
            />
          </div>
          <div class="field">
            <label>Position *</label>
            <input
              v-model="nodeForm.position"
              type="text"
              placeholder="CEO, Manager..."
              required
            />
          </div>
          <div class="field">
            <label>Department</label>
            <input
              v-model="nodeForm.department"
              type="text"
              placeholder="Engineering, Sales..."
              list="dept-list"
            />
            <datalist id="dept-list">
              <option v-for="d in uniqueDepartments" :key="d" :value="d" />
            </datalist>
          </div>
          <div class="field">
            <label>Email</label>
            <input
              v-model="nodeForm.email"
              type="email"
              placeholder="john@company.com"
            />
          </div>
          <div class="field">
            <label>Phone</label>
            <input
              v-model="nodeForm.phone"
              type="text"
              placeholder="+1 234 567 890"
            />
          </div>
          <div class="field">
            <label>Photo</label>
            <div class="photo-tabs">
              <button
                type="button"
                :class="{ active: photoMode === 'upload' }"
                @click="photoMode = 'upload'"
              >
                📤 Upload
              </button>
              <button
                type="button"
                :class="{ active: photoMode === 'url' }"
                @click="photoMode = 'url'"
              >
                🔗 URL
              </button>
            </div>
            <div v-if="photoMode === 'upload'" class="photo-upload">
              <input
                type="file"
                accept="image/*"
                @change="handlePhotoUpload"
                id="photo-upload"
                hidden
              />
              <label for="photo-upload" class="upload-area">
                <div v-if="nodeForm.imageUrl" class="preview-img">
                  <img :src="nodeForm.imageUrl" alt="Preview" />
                  <button
                    type="button"
                    class="remove-img"
                    @click.prevent="nodeForm.imageUrl = ''"
                  >
                    ×
                  </button>
                </div>
                <div v-else class="upload-placeholder">
                  <span>📷</span><small>Click to upload</small>
                </div>
              </label>
            </div>
            <div v-else class="photo-url">
              <input
                v-model="nodeForm.imageUrl"
                type="text"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>
          <div class="field">
            <label>Card Color</label>
            <div class="color-row">
              <button
                v-for="c in colors"
                :key="c.id"
                type="button"
                class="color-swatch"
                :class="{ active: nodeForm.color === c.id }"
                :style="{ background: c.value }"
                @click="nodeForm.color = c.id"
              ></button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="closeEditor">
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              {{
                isReplacing
                  ? "Replace Person"
                  : editingNode
                  ? "Save Changes"
                  : "Add Person"
              }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Action Menu Modal -->
    <div
      v-if="showActionMenu"
      class="modal-backdrop"
      @click.self="closeActionMenu"
    >
      <div class="action-menu-modal">
        <div class="action-menu-header">
          <div class="selected-person">
            <span
              class="person-avatar"
              :style="{ background: getColorValue(selectedNode?.color) }"
              >{{ getInitials(selectedNode?.name || "") }}</span
            >
            <div class="person-details">
              <strong>{{ selectedNode?.name }}</strong>
              <small
                >{{ selectedNode?.workerId }} •
                {{ selectedNode?.position }}</small
              >
            </div>
          </div>
          <button class="close-btn" @click="closeActionMenu">×</button>
        </div>
        <div class="action-menu-body">
          <button class="action-item" @click="handleAddSubordinate">
            <span class="action-icon">➕</span>
            <div class="action-text">
              <strong>Add Subordinate</strong
              ><small>Add someone reporting to this person</small>
            </div>
          </button>
          <button class="action-item" @click="handleEditPerson">
            <span class="action-icon">✏️</span>
            <div class="action-text">
              <strong>Edit Details</strong
              ><small>Update name, position, photo, etc.</small>
            </div>
          </button>
          <button class="action-item replace" @click="handleReplacePerson">
            <span class="action-icon">🔄</span>
            <div class="action-text">
              <strong>Replace Person</strong
              ><small
                >New person takes this position (keeps subordinates)</small
              >
            </div>
          </button>
          <button class="action-item danger" @click="handleDeletePerson">
            <span class="action-icon">🗑️</span>
            <div class="action-text">
              <strong>Remove from Chart</strong>
              <small v-if="getSubordinateCount(selectedNode?.id) > 0"
                >⚠️ {{ getSubordinateCount(selectedNode?.id) }} subordinate(s)
                will need reassignment</small
              >
              <small v-else>Remove this person from org chart</small>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Orphan Fixer Modal -->
    <div
      v-if="showOrphanFixer"
      class="modal-backdrop"
      @click.self="showOrphanFixer = false"
    >
      <div class="orphan-modal">
        <div class="modal-header">
          <h3>⚠️ Fix Broken Tree Structure</h3>
          <button class="close-btn" @click="showOrphanFixer = false">×</button>
        </div>
        <div class="orphan-modal-body">
          <p class="orphan-intro">
            The following people have missing parent connections. Their
            manager/supervisor no longer exists in the chart. Please assign them
            to a new parent or make them a root node.
          </p>

          <div
            v-for="orphan in orphanNodes"
            :key="orphan.id"
            class="orphan-item"
          >
            <div class="orphan-person">
              <span
                class="orphan-avatar"
                :style="{ background: getColorValue(orphan.color) }"
                >{{ getInitials(orphan.name) }}</span
              >
              <div class="orphan-info">
                <strong>{{ orphan.name }}</strong>
                <small>{{ orphan.workerId }} • {{ orphan.position }}</small>
                <div class="orphan-error">
                  ❌ Parent ID "{{ orphan.parentId }}" not found
                </div>
              </div>
            </div>
            <div class="orphan-fix">
              <label>Assign new parent:</label>
              <select v-model="orphanFixes[orphan.id]" class="orphan-select">
                <option value="">-- Make Root (No Parent) --</option>
                <option
                  v-for="p in getValidParents(orphan.id)"
                  :key="p.id"
                  :value="p.id"
                >
                  {{ p.name }} ({{ p.workerId }})
                </option>
              </select>
            </div>
          </div>

          <div class="orphan-actions">
            <button class="btn-secondary" @click="showOrphanFixer = false">
              Cancel
            </button>
            <button class="btn-primary" @click="applyOrphanFixes">
              ✅ Apply Fixes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OrgChart } from "d3-org-chart";
import * as d3 from "d3";
import html2canvas from "html2canvas";

export default {
  name: "OrgChartDemo",
  data() {
    return {
      chart: null,
      selectedTheme: "light",
      selectedStyle: "modern",
      searchQuery: "",
      searchResults: [],
      photoMode: "upload",
      showEditor: false,
      showActionMenu: false,
      showOrphanFixer: false,
      editingNode: null,
      selectedNode: null,
      parentForNewNode: null,
      isReplacing: false,
      workerIdError: "",
      nextIdNumber: 9,
      orphanFixes: {},
      nodes: [
        {
          id: "1",
          workerId: "EMP001",
          name: "Sarah Johnson",
          position: "CEO",
          department: "Executive",
          email: "sarah@company.com",
          phone: "",
          parentId: "",
          color: "blue",
          imageUrl: "",
        },
        {
          id: "2",
          workerId: "EMP002",
          name: "Michael Chen",
          position: "CTO",
          department: "Technology",
          email: "michael@company.com",
          phone: "",
          parentId: "1",
          color: "cyan",
          imageUrl: "",
        },
        {
          id: "3",
          workerId: "EMP003",
          name: "Emily Davis",
          position: "CFO",
          department: "Finance",
          email: "emily@company.com",
          phone: "",
          parentId: "1",
          color: "green",
          imageUrl: "",
        },
        {
          id: "4",
          workerId: "EMP004",
          name: "James Wilson",
          position: "COO",
          department: "Operations",
          email: "james@company.com",
          phone: "",
          parentId: "1",
          color: "orange",
          imageUrl: "",
        },
        {
          id: "5",
          workerId: "EMP005",
          name: "Alex Kim",
          position: "Lead Developer",
          department: "Technology",
          email: "alex@company.com",
          phone: "",
          parentId: "2",
          color: "cyan",
          imageUrl: "",
        },
        {
          id: "6",
          workerId: "EMP006",
          name: "Lisa Wang",
          position: "Designer",
          department: "Design",
          email: "lisa@company.com",
          phone: "",
          parentId: "2",
          color: "pink",
          imageUrl: "",
        },
        {
          id: "7",
          workerId: "EMP007",
          name: "David Brown",
          position: "Accountant",
          department: "Finance",
          email: "david@company.com",
          phone: "",
          parentId: "3",
          color: "green",
          imageUrl: "",
        },
        {
          id: "8",
          workerId: "EMP008",
          name: "Rachel Green",
          position: "HR Manager",
          department: "HR",
          email: "rachel@company.com",
          phone: "",
          parentId: "4",
          color: "purple",
          imageUrl: "",
        },
      ],
      nodeForm: {
        workerId: "",
        name: "",
        position: "",
        department: "",
        email: "",
        phone: "",
        imageUrl: "",
        color: "blue",
      },
      themes: [
        { id: "light", name: "Light", color: "#ffffff" },
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
      colors: [
        { id: "blue", value: "#3b82f6" },
        { id: "cyan", value: "#06b6d4" },
        { id: "green", value: "#10b981" },
        { id: "purple", value: "#8b5cf6" },
        { id: "pink", value: "#ec4899" },
        { id: "orange", value: "#f97316" },
        { id: "red", value: "#ef4444" },
        { id: "gray", value: "#6b7280" },
      ],
      departmentColors: {
        Executive: "#3b82f6",
        Technology: "#06b6d4",
        Finance: "#10b981",
        Operations: "#f97316",
        Design: "#ec4899",
        HR: "#8b5cf6",
        Marketing: "#f59e0b",
        Sales: "#ef4444",
      },
    };
  },
  computed: {
    modalTitle() {
      if (this.isReplacing) return "Replace Person";
      if (this.editingNode) return "Edit Person";
      return "Add Person";
    },
    departments() {
      const depts = {};
      this.nodes.forEach((n) => {
        if (n.department) {
          if (!depts[n.department])
            depts[n.department] = {
              name: n.department,
              count: 0,
              color:
                this.departmentColors[n.department] ||
                this.getColorValue(n.color),
            };
          depts[n.department].count++;
        }
      });
      return Object.values(depts);
    },
    uniqueDepartments() {
      return [...new Set(this.nodes.map((n) => n.department).filter(Boolean))];
    },
    orphanNodes() {
      const nodeIds = new Set(this.nodes.map((n) => n.id));
      return this.nodes.filter((n) => n.parentId && !nodeIds.has(n.parentId));
    },
    validNodes() {
      const nodeIds = new Set(this.nodes.map((n) => n.id));
      return this.nodes.filter((n) => !n.parentId || nodeIds.has(n.parentId));
    },
  },
  watch: {
    orphanNodes: {
      immediate: true,
      handler(newVal) {
        // Initialize orphan fixes with empty values
        newVal.forEach((orphan) => {
          if (!(orphan.id in this.orphanFixes)) {
            this.orphanFixes[orphan.id] = "";
          }
        });
      },
    },
  },
  mounted() {
    this.renderChart();
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("orgNodeClick", (e) =>
      this.openActionMenu(e.detail)
    );
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    getTheme() {
      const configs = {
        light: {
          bg: "#f8fafc",
          card: "#ffffff",
          text: "#1e293b",
          sub: "#64748b",
          border: "#e2e8f0",
          link: "#94a3b8",
        },
        dark: {
          bg: "#0f172a",
          card: "#1e293b",
          text: "#f1f5f9",
          sub: "#94a3b8",
          border: "#334155",
          link: "#475569",
        },
        blue: {
          bg: "#0c1929",
          card: "#1e3a5f",
          text: "#e0f2fe",
          sub: "#7dd3fc",
          border: "#2563eb",
          link: "#3b82f6",
        },
        purple: {
          bg: "#1e1033",
          card: "#2e1065",
          text: "#f3e8ff",
          sub: "#c4b5fd",
          border: "#7c3aed",
          link: "#8b5cf6",
        },
        green: {
          bg: "#022c22",
          card: "#064e3b",
          text: "#d1fae5",
          sub: "#6ee7b7",
          border: "#059669",
          link: "#10b981",
        },
        warm: {
          bg: "#1c1210",
          card: "#431407",
          text: "#fef3c7",
          sub: "#fcd34d",
          border: "#ea580c",
          link: "#f97316",
        },
      };
      return configs[this.selectedTheme] || configs.light;
    },
    getColorValue(id) {
      const map = {
        blue: "#3b82f6",
        cyan: "#06b6d4",
        green: "#10b981",
        purple: "#8b5cf6",
        pink: "#ec4899",
        orange: "#f97316",
        red: "#ef4444",
        gray: "#6b7280",
      };
      return map[id] || "#3b82f6";
    },
    getInitials(name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    },
    getSubordinateCount(nodeId) {
      if (!nodeId) return 0;
      let count = 0;
      const countChildren = (id) => {
        const children = this.nodes.filter((n) => n.parentId === id);
        count += children.length;
        children.forEach((c) => countChildren(c.id));
      };
      countChildren(nodeId);
      return count;
    },
    getValidParents(excludeId) {
      return this.validNodes.filter((n) => n.id !== excludeId);
    },
    applyOrphanFixes() {
      this.orphanNodes.forEach((orphan) => {
        const newParentId = this.orphanFixes[orphan.id] || "";
        const idx = this.nodes.findIndex((n) => n.id === orphan.id);
        if (idx !== -1) {
          this.nodes[idx].parentId = newParentId;
        }
      });
      this.orphanFixes = {};
      this.showOrphanFixer = false;
      this.renderChart();
    },
    generateWorkerId() {
      const existingIds = this.nodes.map((n) => n.workerId);
      let newId;
      do {
        newId = `EMP${String(this.nextIdNumber++).padStart(3, "0")}`;
      } while (existingIds.includes(newId));
      this.nodeForm.workerId = newId;
      this.workerIdError = "";
    },
    validateWorkerId() {
      const id = this.nodeForm.workerId.trim();
      if (!id) {
        this.workerIdError = "Worker ID is required";
        return false;
      }
      const existing = this.nodes.find(
        (n) => n.workerId === id && n.id !== this.editingNode?.id
      );
      if (existing) {
        this.workerIdError = `ID "${id}" already used by ${existing.name}`;
        return false;
      }
      this.workerIdError = "";
      return true;
    },
    onSearch() {
      const q = this.searchQuery.toLowerCase();
      if (!q) {
        this.searchResults = [];
        return;
      }
      this.searchResults = this.nodes
        .filter(
          (n) =>
            n.name.toLowerCase().includes(q) ||
            n.workerId.toLowerCase().includes(q) ||
            n.position.toLowerCase().includes(q) ||
            (n.department && n.department.toLowerCase().includes(q))
        )
        .slice(0, 5);
    },
    focusNode(nodeId) {
      this.searchQuery = "";
      this.searchResults = [];
      if (this.chart) this.chart.setCentered(nodeId).render();
    },
    openActionMenu(nodeId) {
      this.selectedNode = this.nodes.find((n) => n.id === nodeId);
      if (this.selectedNode) this.showActionMenu = true;
    },
    closeActionMenu() {
      this.showActionMenu = false;
      this.selectedNode = null;
    },
    handleAddSubordinate() {
      this.closeActionMenu();
      this.addChild(this.selectedNode.id);
    },
    handleEditPerson() {
      this.closeActionMenu();
      this.editNode(this.selectedNode.id);
    },
    handleReplacePerson() {
      this.closeActionMenu();
      this.replaceNode(this.selectedNode.id);
    },
    handleDeletePerson() {
      this.closeActionMenu();
      this.deleteNode(this.selectedNode.id);
    },
    handlePhotoUpload(e) {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.nodeForm.imageUrl = ev.target.result;
      };
      reader.readAsDataURL(file);
    },
    getCardStyle(data, theme) {
      const color = this.getColorValue(data.color);
      const deptColor = this.departmentColors[data.department] || color;
      const initials = this.getInitials(data.name);

      // Extended palette for premium look
      const bg = theme.card;
      const text = theme.text;
      const sub = theme.sub;
      const border = theme.border;

      const avatarContent = data.imageUrl
        ? `<img src="${data.imageUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" />`
        : `<div style="width:100%;height:100%;background:${color};color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.2rem;border-radius:inherit;">${initials}</div>`;

      // Badge logic
      const deptBadge = data.department
        ? `<span style="padding:4px 10px;background:${deptColor}15;color:${deptColor};border-radius:20px;font-size:0.65rem;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;border:1px solid ${deptColor}30;">${data.department}</span>`
        : "";

      const idBadge = `<span style="font-family:'Monaco',monospace;font-size:0.6rem;opacity:0.6;background:${theme.text}10;padding:2px 6px;border-radius:4px;">${data.workerId}</span>`;

      // 1. Modern Clean (Horizontal)
      if (this.selectedStyle === "modern") {
        return `
          <div style="width:100%;height:100%;background:${bg};border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.05);border:1px solid ${border};display:flex;align-items:center;padding:16px;gap:16px;font-family:'Inter',sans-serif;position:relative;overflow:hidden;transition:all 0.3s ease;">
            <div style="position:absolute;left:0;top:0;bottom:0;width:4px;background:${color};"></div>
            <div style="width:56px;height:56px;border-radius:50%;flex-shrink:0;box-shadow:0 4px 10px rgba(0,0,0,0.1);">${avatarContent}</div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:0.95rem;font-weight:700;color:${text};margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${data.name}</div>
              <div style="font-size:0.75rem;color:${color};font-weight:500;margin-bottom:6px;">${data.position}</div>
              <div style="display:flex;gap:6px;align-items:center;">${deptBadge} ${idBadge}</div>
            </div>
            <div style="position:absolute;right:10px;top:10px;opacity:0;">•••</div>
          </div>`;
      }

      // 2. Gradient Glow (Vertical Premium)
      if (this.selectedStyle === "gradient") {
        return `
          <div style="width:100%;height:100%;background:linear-gradient(145deg, ${bg}, ${bg});border-radius:20px;box-shadow:0 10px 30px -10px ${color}60;border:1px solid ${color}40;display:flex;flex-direction:column;align-items:center;padding:24px 16px;font-family:'Inter',sans-serif;position:relative;overflow:hidden;">
            <div style="position:absolute;top:0;left:0;right:0;height:6px;background:linear-gradient(90deg, ${color}, ${deptColor});"></div>
            <div style="width:80px;height:80px;border-radius:50%;margin-bottom:16px;padding:3px;background:linear-gradient(135deg, ${color}, ${deptColor});box-shadow:0 8px 20px -5px ${color}50;">
              <div style="width:100%;height:100%;border-radius:50%;border:3px solid ${bg};overflow:hidden;">${avatarContent}</div>
            </div>
            <div style="text-align:center;width:100%;">
              <div style="font-size:1.1rem;font-weight:700;color:${text};margin-bottom:4px;">${
          data.name
        }</div>
              <div style="font-size:0.8rem;color:${color};font-weight:600;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px;">${
          data.position
        }</div>
              <div style="display:flex;justify-content:center;gap:6px;flex-wrap:wrap;">${deptBadge}</div>
              <div style="margin-top:12px;border-top:1px solid ${border}80;padding-top:12px;width:100%;display:flex;justify-content:center;gap:15px;color:${sub};font-size:0.75rem;">
                <span>ID: <strong>${data.workerId}</strong></span>
                <span>Subs: <strong>${this.getSubordinateCount(
                  data.id
                )}</strong></span>
              </div>
            </div>
          </div>`;
      }

      // 3. Minimal Line (Horizontal Simple)
      if (this.selectedStyle === "minimal") {
        return `
          <div style="width:100%;height:100%;background:${bg};border-radius:8px;border:1px solid ${border};display:flex;align-items:center;padding:12px;gap:12px;font-family:'Inter',sans-serif;box-shadow:0 2px 4px rgba(0,0,0,0.03);">
            <div style="width:42px;height:42px;border-radius:6px;overflow:hidden;">${avatarContent}</div>
            <div>
              <div style="font-size:0.9rem;font-weight:600;color:${text};">${data.name}</div>
              <div style="font-size:0.75rem;color:${sub};">${data.position}</div>
            </div>
            <div style="margin-left:auto;height:100%;width:3px;background:${color};border-radius:2px;"></div>
          </div>`;
      }

      // 4. Rounded Bubble (Vertical)
      if (this.selectedStyle === "rounded") {
        return `
          <div style="width:100%;height:100%;background:${bg};border-radius:24px;border:2px solid ${
          theme.bg === "#f8fafc" ? "#f1f5f9" : "#334155"
        };display:flex;flex-direction:column;align-items:center;padding:20px;font-family:'dm sans',sans-serif;position:relative;">
            <div style="width:70px;height:70px;border-radius:24px;margin-bottom:14px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.08);transform:rotate(-3deg);border:3px solid white;">${avatarContent}</div>
            <div style="font-size:1rem;font-weight:700;color:${text};margin-bottom:2px;">${
          data.name
        }</div>
            <div style="font-size:0.75rem;color:${sub};margin-bottom:12px;">${
          data.position
        }</div>
            ${deptBadge}
            <div style="position:absolute;top:15px;right:15px;width:8px;height:8px;border-radius:50%;background:${color};"></div>
          </div>`;
      }

      // 5. Deep Shadow (Vertical Dark Mode inspired)
      if (this.selectedStyle === "shadow") {
        return `
          <div style="width:100%;height:100%;background:${bg};border-radius:16px;box-shadow:0 15px 35px -10px rgba(0,0,0,0.15), 0 5px 15px -5px rgba(0,0,0,0.05);display:flex;flex-direction:column;align-items:center;padding:0;overflow:hidden;font-family:'Inter',sans-serif;">
            <div style="width:100%;height:80px;background:linear-gradient(135deg, ${color}, ${deptColor});position:relative;">
              <div style="position:absolute;bottom:-35px;left:50%;transform:translateX(-50%);width:70px;height:70px;border-radius:50%;border:4px solid ${bg};overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,0.2);">${avatarContent}</div>
            </div>
            <div style="padding:40px 20px 20px;text-align:center;width:100%;">
              <div style="font-size:1rem;font-weight:700;color:${text};">${data.name}</div>
              <div style="font-size:0.75rem;color:${color};font-weight:600;margin-bottom:8px;">${data.position}</div>
              ${idBadge}
            </div>
          </div>`;
      }

      // 6. Glassmorphism (Vertical)
      if (this.selectedStyle === "glass") {
        return `
          <div style="width:100%;height:100%;background:${bg}99;backdrop-filter:blur(12px);border-radius:24px;border:1px solid ${border}80;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;font-family:'Inter',sans-serif;position:relative;box-shadow:0 8px 32px rgba(0,0,0,0.05);">
            <div style="position:absolute;inset:0;background:linear-gradient(135deg, ${color}10, transparent);border-radius:24px;pointer-events:none;"></div>
            <div style="width:72px;height:72px;border-radius:20px;margin-bottom:14px;overflow:hidden;border:1px solid ${color}40;padding:4px;background:${bg}60;">
               <div style="width:100%;height:100%;border-radius:14px;overflow:hidden;">${avatarContent}</div>
            </div>
            <div style="font-size:1.05rem;font-weight:600;color:${text};">${data.name}</div>
            <div style="font-size:0.75rem;color:${sub};margin-bottom:10px;">${data.position}</div>
            <div style="display:flex;gap:6px;">
              ${deptBadge}
            </div>
          </div>`;
      }

      // 7. Neon Border (Cyberpunk)
      if (this.selectedStyle === "neon") {
        const neonColor = theme.dark ? color : "#2563eb";
        return `
          <div style="width:100%;height:100%;background:${bg};border-radius:4px;border:2px solid ${neonColor};box-shadow:0 0 15px ${neonColor}40, inset 0 0 10px ${neonColor}10;display:flex;flex-direction:column;padding:20px;position:relative;font-family:'Sora',sans-serif;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:15px;">
              <div style="width:50px;height:50px;border-radius:4px;overflow:hidden;border:1px solid ${neonColor};">${avatarContent}</div>
              <span style="font-family:'Monaco',monospace;font-size:0.7rem;color:${neonColor};">${data.workerId}</span>
            </div>
            <div style="margin-top:auto;">
              <div style="font-size:1rem;font-weight:700;color:${text};letter-spacing:-0.5px;">${data.name}</div>
              <div style="font-size:0.75rem;color:${neonColor};text-transform:uppercase;letter-spacing:1px;margin-top:4px;">${data.position}</div>
            </div>
            <div style="position:absolute;bottom:0;right:0;width:0;height:0;border-style:solid;border-width:0 0 20px 20px;border-color:transparent transparent ${neonColor} transparent;"></div>
          </div>`;
      }

      // 8. Flat Material (Colorful Vertical)
      if (this.selectedStyle === "flat") {
        return `
          <div style="width:100%;height:100%;background:${color};border-radius:16px;display:flex;flex-direction:column;align-items:center;padding:24px;color:white;font-family:'Inter',sans-serif;box-shadow:0 10px 25px -5px ${color}60;">
            <div style="width:70px;height:70px;border-radius:50%;margin-bottom:16px;overflow:hidden;border:3px solid rgba(255,255,255,0.3);">${avatarContent}</div>
            <div style="font-size:1.1rem;font-weight:700;margin-bottom:4px;">${
              data.name
            }</div>
            <div style="font-size:0.8rem;opacity:0.9;font-weight:500;margin-bottom:12px;">${
              data.position
            }</div>
            <div style="background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:20px;font-size:0.7rem;backdrop-filter:blur(4px);">${
              data.department || "General"
            }</div>
          </div>`;
      }

      // 9. Elegant Gold (Luxury)
      if (this.selectedStyle === "elegant") {
        return `
          <div style="width:100%;height:100%;background:${bg};border-radius:2px;border:1px solid #d4af37;display:flex;flex-direction:column;align-items:center;padding:20px;font-family:'Playfair Display',serif;position:relative;box-shadow:inset 0 0 0 4px ${bg}, inset 0 0 0 5px #d4af37;">
            <div style="width:60px;height:60px;border-radius:50%;margin-bottom:12px;overflow:hidden;border:1px solid #d4af37;padding:2px;">
              <div style="width:100%;height:100%;border-radius:50%;overflow:hidden;">${avatarContent}</div>
            </div>
            <div style="font-size:1.1rem;font-weight:700;color:${text};font-style:italic;">${data.name}</div>
            <div style="font-size:0.7rem;color:#d4af37;letter-spacing:1px;text-transform:uppercase;margin:4px 0 10px;">${data.position}</div>
            <div style="width:30px;height:1px;background:#d4af37;"></div>
            <div style="margin-top:10px;font-family:'Inter',sans-serif;font-size:0.6rem;color:${sub};">${data.workerId}</div>
          </div>`;
      }

      // 10. Tech Circuit (Futuristic)
      if (this.selectedStyle === "tech") {
        return `
          <div style="width:100%;height:100%;background:${bg};border-radius:12px;border:1px solid ${color}60;display:flex;flex-direction:column;padding:2px;position:relative;font-family:'Rajdhani',sans-serif;clip-path:polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);">
            <div style="background:${color}10;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:15px;clip-path:inherit;">
              <div style="position:absolute;top:0;left:15px;right:0;height:1px;background:${color};"></div>
              <div style="position:absolute;bottom:0;right:15px;left:0;height:1px;background:${color};"></div>
              
              <div style="width:64px;height:64px;margin-bottom:12px;position:relative;">
                <div style="position:absolute;inset:-4px;border-radius:50%;border:1px dashed ${color};animation:spin 10s linear infinite;"></div>
                <div style="width:100%;height:100%;border-radius:50%;overflow:hidden;border:2px solid ${color};">${avatarContent}</div>
              </div>
              
              <div style="font-size:1.2rem;font-weight:700;color:${text};text-transform:uppercase;">${data.name}</div>
              <div style="font-size:0.8rem;color:${color};font-weight:600;">${data.position}</div>
              <div style="margin-top:8px;font-size:0.65rem;background:${color};color:${bg};padding:2px 8px;border-radius:2px;">${data.department}</div>
            </div>
          </div>`;
      }

      // Fallback with cleaner generic style
      return `
        <div style="width:100%;height:100%;background:${bg};border-radius:8px;border:1px solid ${border};display:flex;justify-content:center;align-items:center;padding:10px;text-align:center;">
          <div style="font-weight:600;color:${text}">${data.name}</div>
        </div>`;
    },
    renderChart() {
      const container = this.$refs.chartContainer;
      if (!container) return;
      const theme = this.getTheme();

      // Only render valid nodes (exclude orphans)
      const chartData = this.validNodes.map((n) => ({
        ...n,
        parentId: n.parentId || null,
      }));

      this.chart = new OrgChart()
        .container(container)
        .data(chartData)
        .nodeWidth((d) => 250)
        .nodeHeight((d) =>
          this.selectedStyle === "minimal" || this.selectedStyle === "modern"
            ? 120
            : 280
        )
        .childrenMargin((d) => 50)
        .compactMarginBetween((d) => 35)
        .siblingsMargin((d) => 35)
        .neighbourMargin((d) => 50)
        .buttonContent(
          ({ node }) =>
            `<div style="width:18px;height:18px;border-radius:50%;background:${
              theme.link
            };color:white;display:flex;align-items:center;justify-content:center;font-size:11px;cursor:pointer;box-shadow:0 2px 4px rgba(0,0,0,0.2);">${
              node.children ? "−" : "+"
            }</div>`
        )
        .nodeContent((d) => this.getCardStyle(d.data, theme))
        .onNodeClick((d) => {
          this.openActionMenu(d.data.id);
        })
        .linkUpdate(function (d) {
          d3.select(this).attr("stroke", theme.link).attr("stroke-width", 2);
        })
        .render();

      setTimeout(() => this.chart?.fit(), 100);
    },
    applyTheme(id) {
      this.selectedTheme = id;
      this.renderChart();
    },
    handleResize() {
      this.chart?.render();
      setTimeout(() => this.chart?.fit(), 100);
    },
    fitChart() {
      this.chart?.fit();
    },
    expandAll() {
      this.chart?.expandAll();
    },
    collapseAll() {
      this.chart?.collapseAll();
    },
    addRootNode() {
      this.editingNode = null;
      this.parentForNewNode = null;
      this.isReplacing = false;
      this.nodeForm = {
        workerId: "",
        name: "",
        position: "",
        department: "",
        email: "",
        phone: "",
        imageUrl: "",
        color: "blue",
      };
      this.generateWorkerId();
      this.photoMode = "upload";
      this.showEditor = true;
    },
    addChild(parentId) {
      this.editingNode = null;
      this.parentForNewNode = parentId;
      this.isReplacing = false;
      this.nodeForm = {
        workerId: "",
        name: "",
        position: "",
        department: "",
        email: "",
        phone: "",
        imageUrl: "",
        color: "blue",
      };
      this.generateWorkerId();
      this.photoMode = "upload";
      this.showEditor = true;
    },
    editNode(nodeId) {
      const node = this.nodes.find((n) => n.id === nodeId);
      if (node) {
        this.editingNode = node;
        this.isReplacing = false;
        this.nodeForm = { ...node };
        this.photoMode = node.imageUrl?.startsWith("data:") ? "upload" : "url";
        this.showEditor = true;
      }
    },
    replaceNode(nodeId) {
      const node = this.nodes.find((n) => n.id === nodeId);
      if (node) {
        this.editingNode = node;
        this.isReplacing = true;
        this.nodeForm = {
          workerId: node.workerId,
          name: "",
          position: node.position,
          department: node.department,
          email: "",
          phone: "",
          imageUrl: "",
          color: node.color,
        };
        this.photoMode = "upload";
        this.showEditor = true;
      }
    },
    deleteNode(nodeId) {
      const subCount = this.getSubordinateCount(nodeId);
      const node = this.nodes.find((n) => n.id === nodeId);
      const msg =
        subCount > 0
          ? `Remove ${node?.name}?\n\n⚠️ ${subCount} subordinate(s) will be disconnected and need to be reassigned to a new manager.`
          : `Remove ${node?.name}? This cannot be undone.`;

      if (confirm(msg)) {
        // Only delete this person, NOT their subordinates
        // Subordinates become orphans and will show in the fix modal
        this.nodes = this.nodes.filter((n) => n.id !== nodeId);
        this.renderChart();

        // If orphans were created, show the fixer modal automatically
        if (this.orphanNodes.length > 0) {
          setTimeout(() => {
            this.showOrphanFixer = true;
          }, 300);
        }
      }
    },
    closeEditor() {
      this.showEditor = false;
      this.editingNode = null;
      this.isReplacing = false;
      this.workerIdError = "";
    },
    saveNode() {
      if (!this.validateWorkerId()) return;

      if (this.editingNode) {
        const idx = this.nodes.findIndex((n) => n.id === this.editingNode.id);
        if (idx !== -1)
          this.nodes[idx] = { ...this.nodes[idx], ...this.nodeForm };
      } else {
        this.nodes.push({
          id: Date.now().toString(),
          ...this.nodeForm,
          parentId: this.parentForNewNode || "",
        });
      }
      this.closeEditor();
      this.renderChart();
    },
    async exportChart() {
      try {
        const chartArea = this.$refs.chartArea;
        if (!chartArea) {
          alert("No chart");
          return;
        }
        const canvas = await html2canvas(chartArea, {
          backgroundColor: this.getTheme().bg,
          scale: 2,
          useCORS: true,
          logging: false,
        });
        const link = document.createElement("a");
        link.download = `org-chart-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch (err) {
        alert("Export failed");
      }
    },
  },
};
</script>

<style scoped>
.org-demo-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Inter", system-ui, sans-serif;
}
.theme-light {
  background: #f8fafc;
  color: #1e293b;
}
.theme-dark {
  background: #0f172a;
  color: #f1f5f9;
}
.theme-blue {
  background: #0c1929;
  color: #e0f2fe;
}
.theme-purple {
  background: #1e1033;
  color: #f3e8ff;
}
.theme-green {
  background: #022c22;
  color: #d1fae5;
}
.theme-warm {
  background: #1c1210;
  color: #fef3c7;
}
.page-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: inherit;
}

/* Orphan Alert Banner */
.orphan-alert {
  background: linear-gradient(90deg, #fef3c7, #fde68a);
  border-bottom: 2px solid #f59e0b;
  padding: 0.6rem 1.5rem;
}
.orphan-alert-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 1200px;
  margin: 0 auto;
}
.orphan-icon {
  font-size: 1.3rem;
}
.orphan-text {
  flex: 1;
}
.orphan-text strong {
  display: block;
  color: #92400e;
  font-size: 0.85rem;
}
.orphan-text span {
  color: #a16207;
  font-size: 0.75rem;
}
.fix-btn {
  padding: 0.4rem 0.8rem;
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.75rem;
  cursor: pointer;
}
.fix-btn:hover {
  background: #d97706;
}

/* Modern Floating Header */
.demo-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 20;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
}
.demo-header > * {
  pointer-events: auto;
}

.back-link {
  color: #475569;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.8);
  padding: 8px 16px;
  border-radius: 30px;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.2s;
}
.back-link:hover {
  background: white;
  color: #0f172a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.header-center {
  text-align: center;
  pointer-events: none;
}
.demo-title {
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0;
  color: #0f172a;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.5);
}
.demo-subtitle {
  display: none;
}

.cta-btn {
  padding: 0.6rem 1.2rem;
  background: #0f172a;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.8rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
  transition: all 0.2s;
}
.cta-btn:hover {
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.25);
  transform: translateY(-1px);
}

/* Floating Toolbar Island */
.toolbar {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1),
    0 2px 10px -2px rgba(0, 0, 0, 0.05);
  z-index: 20;
  flex-wrap: nowrap;
}

.toolbar-section {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.tool-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: none;
}
.tool-btn:hover {
  background: #f1f5f9;
  color: #1e293b;
  transform: none;
  box-shadow: none;
}
.tool-btn.primary {
  background: #eff6ff;
  color: #2563eb;
  box-shadow: none;
}
.tool-btn.primary:hover {
  background: #dbeafe;
}
.export-btn {
  background: #fdf4ff !important;
  color: #9333ea !important;
}
.export-btn:hover {
  background: #fae8ff !important;
}

.divider {
  width: 1px;
  height: 24px;
  background: #e2e8f0;
  margin: 0 6px;
}

.label {
  font-size: 0.65rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-right: 6px;
}
.picker {
  display: flex;
  gap: 4px;
}
.swatch {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.swatch:hover {
  transform: scale(1.1);
  z-index: 2;
}
.swatch.active {
  border-color: #0f172a;
  transform: scale(1.1);
  z-index: 2;
}

.style-select {
  padding: 6px 10px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  color: #1e293b;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: none;
}
.style-select:hover {
  background: #f8fafc;
  border-color: #e2e8f0;
}

/* Expanding Search */
.search-section {
  position: relative;
}
.search-box input {
  padding: 8px 12px 8px 36px;
  width: 40px;
  height: 36px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 20px;
  color: transparent;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: none;
}
.search-box input:focus,
.search-box input:not(:placeholder-shown) {
  width: 240px;
  background: white;
  border-color: #e2e8f0;
  color: #1e293b;
  cursor: text;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  opacity: 0.5;
  pointer-events: none;
  transition: 0.2s;
}
.search-box input:focus + .search-icon,
.search-box input:not(:placeholder-shown) + .search-icon {
  opacity: 1;
  color: #2563eb;
}

.search-results {
  position: absolute;
  top: 120%;
  right: 0;
  left: auto;
  width: 280px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(0, 0, 0, 0.03);
  padding: 6px;
  margin: 0;
  border: none;
}
.search-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  color: #1e293b;
  transition: 0.1s;
}
.search-item:hover {
  background: #f1f5f9;
}
.result-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: 600;
}
.result-info strong {
  display: block;
  font-size: 0.8rem;
}
.result-info small {
  color: #64748b;
  font-size: 0.7rem;
}

/* Floating Legend Widget */
.department-legend {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 10px 40px -5px rgba(0, 0, 0, 0.1);
  z-index: 20;
  min-width: 200px;
  max-width: 300px;
}
.legend-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}
.dept-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  background: transparent;
  border: none;
  color: #334155;
  transition: 0.2s;
}
.dept-tag:hover {
  background: rgba(0, 0, 0, 0.04);
}
.dept-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.legend-stats {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #64748b;
}
.legend-stats .warning {
  color: #d97706;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
}

.chart-area {
  flex: 1;
  overflow: hidden;
  padding: 0.5rem;
}
.chart-canvas {
  width: 100%;
  height: 100%;
  min-height: 350px;
}

.demo-badge {
  position: fixed;
  bottom: 0.6rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.3rem 0.8rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 50px;
  font-size: 0.7rem;
  z-index: 50;
}
.demo-badge a {
  color: #60a5fa;
  text-decoration: none;
}

/* UI Updates */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.tool-btn {
  background: white;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-weight: 500;
  color: #475569;
  transition: all 0.2s;
}
.tool-btn:hover {
  background: #f8fafc;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
.tool-btn.primary {
  background: #0ea5e9;
  color: white;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.3);
}
.tool-btn.primary:hover {
  background: #0284c7;
  box-shadow: 0 6px 12px -2px rgba(14, 165, 233, 0.4);
}
.style-select {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 500;
  color: #334155;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.search-box input {
  padding: 0.4rem 0.8rem 0.4rem 2rem;
  width: 200px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}
.search-box input:focus {
  width: 240px;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}
.theme-dark .tool-btn,
.theme-blue .tool-btn,
.theme-purple .tool-btn,
.theme-green .tool-btn,
.theme-warm .tool-btn {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
}
.theme-dark .tool-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}
.theme-dark .search-box input {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
  color: white;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}
.modal {
  background: white;
  border-radius: 14px;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  color: #1e293b;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 1.1rem;
  border-bottom: 1px solid #e2e8f0;
}
.modal-header h3 {
  margin: 0;
  font-size: 1rem;
}
.close-btn {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  background: #f1f5f9;
  color: #64748b;
  font-size: 1rem;
  cursor: pointer;
}
.modal-body {
  padding: 1rem;
}
.field {
  margin-bottom: 0.9rem;
}
.field label {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #64748b;
}
.field input {
  width: 100%;
  padding: 0.5rem 0.6rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 0.85rem;
}
.field input:focus {
  outline: none;
  border-color: #3b82f6;
}
.error-text {
  color: #ef4444;
  font-size: 0.7rem;
}
.id-input-row {
  display: flex;
  gap: 0.4rem;
}
.id-input-row input {
  flex: 1;
}
.generate-id-btn {
  padding: 0.4rem 0.6rem;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 0.75rem;
  cursor: pointer;
  white-space: nowrap;
}
.photo-tabs {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}
.photo-tabs button {
  flex: 1;
  padding: 0.35rem;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 0.75rem;
  cursor: pointer;
}
.photo-tabs button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}
.upload-area {
  display: block;
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  padding: 0.8rem;
  text-align: center;
  cursor: pointer;
}
.upload-placeholder {
  color: #94a3b8;
}
.upload-placeholder span {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.3rem;
}
.preview-img {
  position: relative;
  display: inline-block;
}
.preview-img img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}
.remove-img {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: #ef4444;
  color: white;
  cursor: pointer;
  font-size: 12px;
}
.color-row {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}
.color-swatch {
  width: 26px;
  height: 26px;
  border-radius: 5px;
  border: 2px solid transparent;
  cursor: pointer;
}
.color-swatch.active {
  border-color: #1e293b;
}
.modal-footer {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.9rem;
}
.btn-secondary,
.btn-primary {
  flex: 1;
  padding: 0.55rem;
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}
.btn-secondary {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #475569;
}
.btn-primary {
  background: #3b82f6;
  border: none;
  color: white;
}

/* Action Menu */
.action-menu-modal {
  background: white;
  border-radius: 14px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  color: #1e293b;
}
.action-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}
.selected-person {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.person-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}
.person-details strong {
  display: block;
  font-size: 0.9rem;
}
.person-details small {
  color: #64748b;
  font-size: 0.75rem;
}
.action-menu-body {
  padding: 0.5rem;
}
.action-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
}
.action-item:hover {
  background: #f1f5f9;
}
.action-item.replace:hover {
  background: #fef3c7;
}
.action-item.danger:hover {
  background: #fee2e2;
}
.action-icon {
  font-size: 1.2rem;
  width: 32px;
  text-align: center;
}
.action-text strong {
  display: block;
  font-size: 0.85rem;
  color: #1e293b;
}
.action-text small {
  color: #64748b;
  font-size: 0.7rem;
}
.action-item.danger .action-text small {
  color: #ef4444;
}

/* Orphan Fixer Modal */
.orphan-modal {
  background: white;
  border-radius: 14px;
  width: 100%;
  max-width: 500px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  color: #1e293b;
}
.orphan-modal-body {
  padding: 1rem;
}
.orphan-intro {
  font-size: 0.8rem;
  color: #64748b;
  margin: 0 0 1rem;
  line-height: 1.5;
}
.orphan-item {
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 10px;
  padding: 0.9rem;
  margin-bottom: 0.75rem;
}
.orphan-person {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
}
.orphan-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 12px;
}
.orphan-info strong {
  display: block;
  font-size: 0.85rem;
}
.orphan-info small {
  color: #64748b;
  font-size: 0.7rem;
}
.orphan-error {
  margin-top: 0.3rem;
  font-size: 0.7rem;
  color: #dc2626;
  font-weight: 500;
}
.orphan-fix {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.orphan-fix label {
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 500;
}
.orphan-select {
  padding: 0.45rem 0.6rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 0.8rem;
  background: white;
}
.orphan-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

@media (max-width: 768px) {
  .demo-header {
    flex-direction: column;
    gap: 0.4rem;
  }
  .toolbar {
    justify-content: center;
  }
  .search-box input {
    width: 110px;
  }
  .orphan-alert-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
