<template>
  <div class="org-view-page" :class="'theme-' + theme">
    <!-- Background -->
    <div class="bg-gradient" :style="{ background: themeGradient }"></div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-screen">
      <div class="loader"></div>
      <p>Loading organization chart...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-screen">
      <div class="error-icon">😕</div>
      <h2>Chart Not Found</h2>
      <p>{{ error }}</p>
      <router-link to="/org-demo" class="go-demo-btn">Try Demo</router-link>
    </div>

    <!-- Chart View -->
    <div v-else class="chart-view">
      <!-- Header -->
      <header class="view-header">
        <router-link to="/portfolio" class="back-link">← Portfolio</router-link>
        <div class="header-info">
          <h1 class="chart-title">{{ chart.title }}</h1>
          <p v-if="chart.description" class="chart-description">
            {{ chart.description }}
          </p>
        </div>
        <div class="header-actions">
          <button v-if="allowExport" @click="exportChart" class="export-btn">
            <span>📥</span> Export
          </button>
          <button class="share-btn" @click="shareChart">
            <span>📤</span> Share
          </button>
        </div>
      </header>

      <!-- Chart Canvas -->
      <div class="chart-canvas-wrapper">
        <div class="zoom-controls">
          <button @click="zoomIn" class="zoom-btn">+</button>
          <span class="zoom-level">{{ Math.round(zoom * 100) }}%</span>
          <button @click="zoomOut" class="zoom-btn">-</button>
        </div>

        <div class="chart-canvas" :style="{ transform: `scale(${zoom})` }">
          <div v-if="rootNodes.length" class="org-tree">
            <org-node-view
              v-for="node in rootNodes"
              :key="node.id"
              :node="node"
              :all-nodes="nodes"
            />
          </div>
          <div v-else class="empty-chart">
            <p>This organization chart is empty.</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="view-footer">
        <p>
          Created with
          <router-link to="/org/create">Org Chart Builder</router-link>
        </p>
      </footer>
    </div>

    <!-- Share Modal -->
    <transition name="fade">
      <div
        v-if="showShareModal"
        class="modal-overlay"
        @click.self="showShareModal = false"
      >
        <div class="share-modal">
          <h3>📤 Share This Chart</h3>
          <div class="share-link-box">
            <input :value="shareLink" readonly ref="shareInput" />
            <button @click="copyLink" class="copy-btn">
              {{ copied ? "✓" : "📋" }}
            </button>
          </div>
          <div class="share-social">
            <button @click="shareTwitter" class="social-btn twitter">
              Twitter
            </button>
            <button @click="shareLinkedIn" class="social-btn linkedin">
              LinkedIn
            </button>
            <button @click="shareWhatsApp" class="social-btn whatsapp">
              WhatsApp
            </button>
          </div>
          <button @click="showShareModal = false" class="close-modal-btn">
            Close
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { supabase } from "@/supabase.js";
import { h } from "vue";

// Read-only Node Component using render function (Vue 3 doesn't support runtime template compilation by default)
const OrgNodeView = {
  name: "OrgNodeView",
  props: ["node", "allNodes"],
  computed: {
    children() {
      return this.allNodes.filter((n) => n.parentId === this.node.id);
    },
  },
  methods: {
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
  },
  render() {
    // Build children nodes recursively
    const childNodes = this.children.length
      ? h(
          "div",
          { class: "node-children" },
          this.children.map((child) =>
            h(OrgNodeView, {
              key: child.id,
              node: child,
              allNodes: this.allNodes,
            })
          )
        )
      : null;

    // Node info section
    const nodeInfo = h("div", { class: "node-info" }, [
      h("h4", { class: "node-name" }, this.node.name),
      h("p", { class: "node-position" }, this.node.position),
      this.node.department
        ? h("p", { class: "node-department" }, this.node.department)
        : null,
    ]);

    // Main org-node card
    const orgNode = h(
      "div",
      { class: ["org-node", "color-" + this.node.color] },
      [
        h(
          "div",
          { class: "node-avatar" },
          this.getAvatarIcon(this.node.avatar)
        ),
        nodeInfo,
      ]
    );

    // Wrapper with org-node and children
    return h("div", { class: "node-wrapper" }, [orgNode, childNodes]);
  },
};

export default {
  name: "OrgChartView",
  components: { OrgNodeView },
  data() {
    return {
      loading: true,
      error: null,
      chart: null,
      nodes: [],
      theme: "corporate",
      allowExport: true,
      zoom: 1,
      showShareModal: false,
      copied: false,
    };
  },
  computed: {
    rootNodes() {
      return this.nodes.filter((n) => !n.parentId);
    },
    shareLink() {
      return window.location.href;
    },
    themeGradient() {
      const gradients = {
        corporate:
          "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        modern:
          "linear-gradient(135deg, #1a1a3e 0%, #4c3a77 50%, #1a1a3e 100%)",
        creative:
          "linear-gradient(135deg, #2d1f3d 0%, #6b3a5b 50%, #2d1f3d 100%)",
        minimal:
          "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
        dark: "linear-gradient(135deg, #0a0a14 0%, #1a1a2e 50%, #0a0a14 100%)",
        nature:
          "linear-gradient(135deg, #0d2818 0%, #1a4d34 50%, #0d2818 100%)",
      };
      return gradients[this.theme] || gradients.corporate;
    },
  },
  async mounted() {
    await this.loadChart();
  },
  methods: {
    async loadChart() {
      const slug = this.$route.params.slug;
      console.log("Loading chart with slug:", slug);

      try {
        const { data, error } = await supabase
          .from("org_charts")
          .select("*")
          .eq("slug", slug)
          .single();

        console.log("Supabase response:", { data, error });

        if (error) throw error;
        if (!data) throw new Error("Chart not found");

        this.chart = data;
        this.nodes = data.chart_data || [];
        this.theme = data.theme || "corporate";
        this.allowExport = data.custom_settings?.allowExport !== false;

        console.log("Loaded nodes:", this.nodes);
        console.log(
          "Root nodes:",
          this.nodes.filter((n) => !n.parentId)
        );
      } catch (err) {
        console.error("Error loading chart:", err);
        this.error =
          "This organization chart does not exist or has been removed.";
      } finally {
        this.loading = false;
      }
    },
    zoomIn() {
      this.zoom = Math.min(this.zoom + 0.1, 1.5);
    },
    zoomOut() {
      this.zoom = Math.max(this.zoom - 0.1, 0.5);
    },
    shareChart() {
      this.showShareModal = true;
    },
    copyLink() {
      navigator.clipboard.writeText(this.shareLink);
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    },
    shareTwitter() {
      const url = `https://twitter.com/intent/tweet?text=Check out ${
        this.chart.title
      } organization chart&url=${encodeURIComponent(this.shareLink)}`;
      window.open(url, "_blank");
    },
    shareLinkedIn() {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        this.shareLink
      )}`;
      window.open(url, "_blank");
    },
    shareWhatsApp() {
      const url = `https://wa.me/?text=Check out ${this.chart.title} organization chart: ${this.shareLink}`;
      window.open(url, "_blank");
    },
    exportChart() {
      alert(
        "Export feature - In a production version, this would generate a PNG/PDF of the chart."
      );
    },
  },
};
</script>

<style scoped>
.org-view-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.bg-gradient {
  position: fixed;
  inset: 0;
  z-index: 0;
}

/* Loading */
.loading-screen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.loader {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: #14b8a6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-screen p {
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1rem;
}

/* Error */
.error-screen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  text-align: center;
  padding: 2rem;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.error-screen h2 {
  color: white;
  margin-bottom: 0.5rem;
}

.error-screen p {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
}

.go-demo-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
}

/* Chart View */
.chart-view {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.view-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.back-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.back-link:hover {
  color: #14b8a6;
}

.header-info {
  flex: 1;
  text-align: center;
}

.chart-title {
  color: white;
  font-size: 1.5rem;
  margin: 0;
}

.chart-description {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.export-btn,
.share-btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  transition: all 0.3s;
}

.export-btn:hover,
.share-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Chart Canvas */
.chart-canvas-wrapper {
  flex: 1;
  position: relative;
  overflow: auto;
  padding: 2rem;
}

.zoom-controls {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 0.5rem;
  border-radius: 10px;
  z-index: 50;
}

.zoom-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
}

.zoom-level {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  min-width: 50px;
  text-align: center;
}

.chart-canvas {
  min-height: 500px;
  display: flex;
  justify-content: center;
  padding: 2rem;
  transition: transform 0.3s;
  transform-origin: center top;
}

/* Tree Styles */
.org-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.node-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.node-wrapper::before {
  content: "";
  position: absolute;
  top: -20px;
  width: 2px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
}

.org-tree > .node-wrapper::before {
  display: none;
}

.org-node {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  min-width: 180px;
  text-align: center;
}

.org-node.color-blue {
  border-left: 4px solid #3b82f6;
}
.org-node.color-teal {
  border-left: 4px solid #14b8a6;
}
.org-node.color-purple {
  border-left: 4px solid #8b5cf6;
}
.org-node.color-pink {
  border-left: 4px solid #ec4899;
}
.org-node.color-orange {
  border-left: 4px solid #f97316;
}
.org-node.color-green {
  border-left: 4px solid #22c55e;
}
.org-node.color-red {
  border-left: 4px solid #ef4444;
}
.org-node.color-slate {
  border-left: 4px solid #64748b;
}

.node-avatar {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.node-name {
  color: white;
  font-size: 1rem;
  margin: 0;
}

.node-position {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin: 0.25rem 0 0;
}

.node-department {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  margin: 0.25rem 0 0;
}

.node-children {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 20px;
  position: relative;
}

.node-children::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 180px);
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
}

.empty-chart {
  text-align: center;
  padding: 4rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Footer */
.view-footer {
  padding: 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
}

.view-footer a {
  color: #14b8a6;
  text-decoration: none;
}

/* Share Modal */
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

.share-modal {
  background: linear-gradient(135deg, #1a1a3e, #2d2d5a);
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.share-modal h3 {
  color: white;
  margin-bottom: 1.5rem;
}

.share-link-box {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.share-link-box input {
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

.share-social {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.social-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.85rem;
}

.social-btn.twitter {
  background: #1da1f2;
}
.social-btn.linkedin {
  background: #0077b5;
}
.social-btn.whatsapp {
  background: #25d366;
}

.close-modal-btn {
  padding: 0.75rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  cursor: pointer;
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

/* Theme Variations */
.theme-corporate .org-node {
  background: rgba(30, 58, 95, 0.8);
}
.theme-modern .org-node {
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.4),
    rgba(118, 75, 162, 0.4)
  );
}
.theme-creative .org-node {
  background: linear-gradient(
    135deg,
    rgba(240, 147, 251, 0.3),
    rgba(245, 87, 108, 0.3)
  );
}
.theme-minimal .org-node {
  background: rgba(67, 67, 67, 0.8);
  border-radius: 8px;
}
.theme-dark .org-node {
  background: rgba(15, 15, 35, 0.9);
}
.theme-nature .org-node {
  background: linear-gradient(
    135deg,
    rgba(19, 78, 94, 0.6),
    rgba(113, 178, 128, 0.3)
  );
}

/* Responsive Design */
@media (max-width: 768px) {
  .view-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    text-align: center;
  }

  .back-link {
    align-self: flex-start;
  }

  .header-actions {
    width: 100%;
    justify-content: center;
  }

  .chart-title {
    font-size: 1.25rem;
  }

  .chart-canvas-wrapper {
    padding: 1rem;
  }

  .chart-canvas {
    padding: 1rem;
    min-height: 400px;
  }

  .org-node {
    min-width: 140px;
    padding: 1rem;
  }

  .node-avatar {
    font-size: 1.5rem;
  }

  .node-name {
    font-size: 0.9rem;
  }

  .node-children {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .node-children::before {
    width: 2px;
    height: calc(100% - 40px);
    top: auto;
    left: 50%;
    transform: translateX(-50%) translateY(-20px);
  }

  .zoom-controls {
    bottom: 1rem;
    right: 1rem;
    padding: 0.25rem;
  }

  .zoom-btn {
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }

  .share-modal {
    padding: 1.5rem;
    max-width: 95%;
  }

  .share-social {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .org-node {
    min-width: 120px;
    padding: 0.75rem;
  }

  .header-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .header-actions button {
    width: 100%;
  }
}
</style>
