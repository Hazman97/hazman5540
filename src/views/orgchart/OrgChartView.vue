<template>
  <div class="org-view-page" :class="'theme-' + selectedTheme">
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
      </header>

      <!-- Toolbar -->
      <div class="toolbar">
        <div class="toolbar-section">
          <button class="tool-btn" @click="fitChart">⊡ Fit</button>
          <button class="tool-btn" @click="expandAll">↓ Expand</button>
          <button class="tool-btn" @click="collapseAll">→ Collapse</button>
        </div>

        <div class="toolbar-section search-section">
          <div class="search-box">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name..."
              @input="onSearch"
            />
            <span class="search-icon">🔍</span>
          </div>
          <div
            v-if="searchResults.length && searchQuery"
            class="search-results"
          >
            <div
              v-for="r in searchResults"
              :key="r.id"
              class="search-item"
              @click="focusNode(r.id)"
            >
              <span
                class="result-avatar"
                :style="{ background: getColorValue(r.color) }"
              >
                {{ getInitials(r.name) }}
              </span>
              <div class="result-info">
                <strong>{{ r.name }}</strong>
                <small>{{ r.position }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="toolbar-section">
          <button v-if="allowExport" @click="exportToPng" class="export-btn">
            📥 Export PNG
          </button>
          <button class="share-btn" @click="shareChart">📤 Share</button>
        </div>
      </div>

      <!-- D3 Chart Container -->
      <div class="chart-canvas-wrapper">
        <div ref="chartContainer" class="chart-container"></div>
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
import { OrgChart } from "d3-org-chart";
import * as d3 from "d3";
import html2canvas from "html2canvas";

export default {
  name: "OrgChartView",
  data() {
    return {
      loading: true,
      error: null,
      chart: null,
      chartInstance: null,
      nodes: [],
      selectedTheme: "dark",
      selectedStyle: "modern",
      allowExport: true,
      showShareModal: false,
      copied: false,
      searchQuery: "",
      searchResults: [],
      colors: {
        blue: "#3b82f6",
        cyan: "#06b6d4",
        green: "#10b981",
        purple: "#8b5cf6",
        pink: "#ec4899",
        orange: "#f97316",
        red: "#ef4444",
        teal: "#14b8a6",
      },
    };
  },
  computed: {
    shareLink() {
      return window.location.href;
    },
    themeGradient() {
      const gradients = {
        // Matching Demo page themes
        light: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
        "modern-white":
          "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)",
        dark: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        blue: "linear-gradient(135deg, #0c1929 0%, #1e3a5f 50%, #0c1929 100%)",
        purple:
          "linear-gradient(135deg, #1e1033 0%, #4c1d95 50%, #1e1033 100%)",
        green: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #022c22 100%)",
        warm: "linear-gradient(135deg, #1c1210 0%, #7c2d12 50%, #1c1210 100%)",
      };
      return gradients[this.selectedTheme] || gradients.dark;
    },
  },
  async mounted() {
    await this.loadChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
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
        this.selectedTheme = data.theme || "dark";
        this.selectedStyle = data.custom_settings?.style || "modern";
        this.allowExport = data.custom_settings?.allowExport !== false;

        console.log("Loaded nodes:", this.nodes);
        console.log("Theme:", this.selectedTheme, "Style:", this.selectedStyle);

        // Set loading to false first so the DOM renders
        this.loading = false;

        // Then render chart after DOM is ready
        this.$nextTick(() => {
          this.renderChart();
        });
      } catch (err) {
        console.error("Error loading chart:", err);
        this.error =
          "This organization chart does not exist or has been removed.";
        this.loading = false;
      }
    },
    getTheme() {
      const configs = {
        // Themes matching Demo page
        light: {
          bg: "#f8fafc",
          card: "#ffffff",
          text: "#1e293b",
          sub: "#64748b",
          border: "#e2e8f0",
          link: "#94a3b8",
        },
        "modern-white": {
          bg: "#ffffff",
          card: "#f8fafc",
          text: "#0f172a",
          sub: "#475569",
          border: "#cbd5e1",
          link: "#64748b",
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
      return configs[this.selectedTheme] || configs.dark;
    },
    getColorValue(id) {
      return this.colors[id] || "#3b82f6";
    },
    getInitials(name) {
      if (!name) return "?";
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    },
    getCardStyle(data, theme) {
      const color = this.getColorValue(data.color);
      const initials = this.getInitials(data.name);
      const bg = theme.card;
      const text = theme.text;
      const sub = theme.sub;

      const avatarContent = `<div style="width:100%;height:100%;background:${color};color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.2rem;border-radius:inherit;">${initials}</div>`;

      const deptBadge = data.department
        ? `<span style="padding:4px 10px;background:${color}15;color:${color};border-radius:20px;font-size:0.65rem;font-weight:600;text-transform:uppercase;border:1px solid ${color}30;">${data.department}</span>`
        : "";

      // Modern Clean (Horizontal)
      if (this.selectedStyle === "modern") {
        return `
          <div style="width:100%;height:100%;background:${bg};border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.15);border:1px solid ${
          theme.border
        };display:flex;align-items:center;padding:16px;gap:16px;font-family:'Inter',sans-serif;position:relative;overflow:hidden;">
            <div style="position:absolute;left:0;top:0;bottom:0;width:4px;background:${color};"></div>
            <div style="width:56px;height:56px;border-radius:50%;flex-shrink:0;box-shadow:0 4px 10px rgba(0,0,0,0.1);">${avatarContent}</div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:0.95rem;font-weight:700;color:${text};margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${
          data.name
        }</div>
              <div style="font-size:0.75rem;color:${color};font-weight:500;margin-bottom:6px;">${
          data.position || ""
        }</div>
              <div style="display:flex;gap:6px;align-items:center;">${deptBadge}</div>
            </div>
          </div>`;
      }

      // Gradient Glow (Vertical Premium)
      if (this.selectedStyle === "gradient") {
        return `
          <div style="width:100%;height:100%;background:linear-gradient(145deg, ${bg}, ${bg});border-radius:20px;box-shadow:0 10px 30px -10px ${color}60;border:1px solid ${color}40;display:flex;flex-direction:column;align-items:center;padding:24px 16px;font-family:'Inter',sans-serif;position:relative;overflow:hidden;">
            <div style="position:absolute;top:0;left:0;right:0;height:6px;background:linear-gradient(90deg, ${color}, ${color}80);"></div>
            <div style="width:80px;height:80px;border-radius:50%;margin-bottom:16px;padding:3px;background:linear-gradient(135deg, ${color}, ${color}80);box-shadow:0 8px 20px -5px ${color}50;">
              <div style="width:100%;height:100%;border-radius:50%;border:3px solid ${bg};overflow:hidden;">${avatarContent}</div>
            </div>
            <div style="text-align:center;width:100%;">
              <div style="font-size:1.1rem;font-weight:700;color:${text};margin-bottom:4px;">${
          data.name
        }</div>
              <div style="font-size:0.8rem;color:${color};font-weight:600;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px;">${
          data.position || ""
        }</div>
              <div style="display:flex;justify-content:center;gap:6px;flex-wrap:wrap;">${deptBadge}</div>
            </div>
          </div>`;
      }

      // Minimal Line
      if (this.selectedStyle === "minimal") {
        return `
          <div style="width:100%;height:100%;background:${bg};border-radius:8px;border:1px solid ${
          theme.border
        };display:flex;align-items:center;padding:12px;gap:12px;font-family:'Inter',sans-serif;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
            <div style="width:42px;height:42px;border-radius:6px;overflow:hidden;">${avatarContent}</div>
            <div>
              <div style="font-size:0.9rem;font-weight:600;color:${text};">${
          data.name
        }</div>
              <div style="font-size:0.75rem;color:${sub};">${
          data.position || ""
        }</div>
            </div>
            <div style="margin-left:auto;height:100%;width:3px;background:${color};border-radius:2px;"></div>
          </div>`;
      }

      // Glassmorphism
      if (this.selectedStyle === "glass") {
        return `
          <div style="width:100%;height:100%;background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);border-radius:16px;border:1px solid rgba(255,255,255,0.2);display:flex;flex-direction:column;align-items:center;padding:20px;font-family:'Inter',sans-serif;">
            <div style="width:70px;height:70px;border-radius:50%;margin-bottom:12px;box-shadow:0 8px 20px rgba(0,0,0,0.2);overflow:hidden;border:3px solid ${color};">${avatarContent}</div>
            <div style="font-size:1rem;font-weight:700;color:white;margin-bottom:4px;">${
              data.name
            }</div>
            <div style="font-size:0.8rem;color:${color};margin-bottom:8px;">${
          data.position || ""
        }</div>
            ${deptBadge}
          </div>`;
      }

      // Rounded Bubble
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
          data.position || ""
        }</div>
            ${deptBadge}
            <div style="position:absolute;top:15px;right:15px;width:8px;height:8px;border-radius:50%;background:${color};"></div>
          </div>`;
      }

      // Deep Shadow
      if (this.selectedStyle === "shadow") {
        return `
          <div style="width:100%;height:100%;background:${bg};border-radius:16px;box-shadow:0 15px 35px -10px rgba(0,0,0,0.15), 0 5px 15px -5px rgba(0,0,0,0.05);display:flex;flex-direction:column;align-items:center;padding:0;overflow:hidden;font-family:'Inter',sans-serif;">
            <div style="width:100%;height:80px;background:linear-gradient(135deg, ${color}, ${color});position:relative;">
              <div style="position:absolute;bottom:-35px;left:50%;transform:translateX(-50%);width:70px;height:70px;border-radius:50%;border:4px solid ${bg};overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,0.2);">${avatarContent}</div>
            </div>
            <div style="padding:40px 20px 20px;text-align:center;width:100%;">
              <div style="font-size:1rem;font-weight:700;color:${text};">${
          data.name
        }</div>
              <div style="font-size:0.75rem;color:${color};font-weight:600;margin-bottom:8px;">${
          data.position || ""
        }</div>
              ${deptBadge}
            </div>
          </div>`;
      }

      // Neon Border
      if (this.selectedStyle === "neon") {
        const neonColor = color;
        return `
          <div style="width:100%;height:100%;background:${bg};border-radius:4px;border:2px solid ${neonColor};box-shadow:0 0 15px ${neonColor}40, inset 0 0 10px ${neonColor}10;display:flex;flex-direction:column;padding:20px;position:relative;font-family:'Sora',sans-serif;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:15px;">
              <div style="width:50px;height:50px;border-radius:4px;overflow:hidden;border:1px solid ${neonColor};">${avatarContent}</div>
            </div>
            <div style="margin-top:auto;">
              <div style="font-size:1rem;font-weight:700;color:${text};letter-spacing:-0.5px;">${
          data.name
        }</div>
              <div style="font-size:0.75rem;color:${neonColor};text-transform:uppercase;letter-spacing:1px;margin-top:4px;">${
          data.position || ""
        }</div>
            </div>
            <div style="position:absolute;bottom:0;right:0;width:0;height:0;border-style:solid;border-width:0 0 20px 20px;border-color:transparent transparent ${neonColor} transparent;"></div>
          </div>`;
      }

      // Flat Material
      if (this.selectedStyle === "flat") {
        return `
          <div style="width:100%;height:100%;background:${color};border-radius:16px;display:flex;flex-direction:column;align-items:center;padding:24px;color:white;font-family:'Inter',sans-serif;box-shadow:0 10px 25px -5px ${color}60;">
            <div style="width:70px;height:70px;border-radius:50%;margin-bottom:16px;overflow:hidden;border:3px solid rgba(255,255,255,0.3);">${avatarContent}</div>
            <div style="font-size:1.1rem;font-weight:700;margin-bottom:4px;">${
              data.name
            }</div>
            <div style="font-size:0.8rem;opacity:0.9;font-weight:500;margin-bottom:12px;">${
              data.position || ""
            }</div>
            <div style="background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:20px;font-size:0.7rem;backdrop-filter:blur(4px);">${
              data.department || "General"
            }</div>
          </div>`;
      }

      // Elegant Gold
      if (this.selectedStyle === "elegant") {
        return `
          <div style="width:100%;height:100%;background:${bg};border-radius:2px;border:1px solid #d4af37;display:flex;flex-direction:column;align-items:center;padding:20px;font-family:'Playfair Display',serif;position:relative;box-shadow:inset 0 0 0 4px ${bg}, inset 0 0 0 5px #d4af37;">
            <div style="width:60px;height:60px;border-radius:50%;margin-bottom:12px;overflow:hidden;border:1px solid #d4af37;padding:2px;">
              <div style="width:100%;height:100%;border-radius:50%;overflow:hidden;">${avatarContent}</div>
            </div>
            <div style="font-size:1.1rem;font-weight:700;color:${text};font-style:italic;">${
          data.name
        }</div>
            <div style="font-size:0.7rem;color:#d4af37;letter-spacing:1px;text-transform:uppercase;margin:4px 0 10px;">${
              data.position || ""
            }</div>
            <div style="width:30px;height:1px;background:#d4af37;"></div>
          </div>`;
      }

      // Tech Circuit
      if (this.selectedStyle === "tech") {
        return `
          <div style="width:100%;height:100%;background:${bg};border-radius:12px;border:1px solid ${color}60;display:flex;flex-direction:column;padding:2px;position:relative;font-family:'Rajdhani',sans-serif;clip-path:polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);">
            <div style="background:${color}10;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:15px;clip-path:inherit;">
              <div style="position:absolute;top:0;left:15px;right:0;height:1px;background:${color};"></div>
              <div style="position:absolute;bottom:0;right:15px;left:0;height:1px;background:${color};"></div>
              
              <div style="width:64px;height:64px;margin-bottom:12px;position:relative;">
                <div style="width:100%;height:100%;border-radius:50%;overflow:hidden;border:2px solid ${color};">${avatarContent}</div>
              </div>
              
              <div style="font-size:1.2rem;font-weight:700;color:${text};text-transform:uppercase;">${
          data.name
        }</div>
              <div style="font-size:0.8rem;color:${color};font-weight:600;">${
          data.position || ""
        }</div>
              <div style="margin-top:8px;font-size:0.65rem;background:${color};color:${bg};padding:2px 8px;border-radius:2px;">${
          data.department || ""
        }</div>
            </div>
          </div>`;
      }

      // Fallback
      return `
        <div style="width:100%;height:100%;background:${bg};border-radius:8px;border:1px solid ${theme.border};display:flex;justify-content:center;align-items:center;padding:10px;text-align:center;">
          <div style="font-weight:600;color:${text}">${data.name}</div>
        </div>`;
    },
    renderChart() {
      const container = this.$refs.chartContainer;
      if (!container) {
        console.error("Chart container not found");
        return;
      }
      if (!this.nodes.length) {
        console.warn("No nodes to render");
        return;
      }

      const theme = this.getTheme();

      // D3 org chart needs empty string for root nodes, not null
      const chartData = this.nodes.map((n) => ({
        ...n,
        parentId: n.parentId || "",
      }));

      console.log("Rendering chart with data:", chartData);
      console.log("Theme:", theme);
      console.log("Style:", this.selectedStyle);

      try {
        this.chartInstance = new OrgChart()
          .container(container)
          .data(chartData)
          .nodeWidth((d) => 250)
          .nodeHeight((d) =>
            this.selectedStyle === "minimal" || this.selectedStyle === "modern"
              ? 100
              : 200
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
          .linkUpdate(function (d) {
            d3.select(this).attr("stroke", theme.link).attr("stroke-width", 2);
          })
          .render();

        console.log("Chart rendered successfully");
        setTimeout(() => this.chartInstance?.fit(), 100);
      } catch (err) {
        console.error("Error rendering chart:", err);
      }
    },
    handleResize() {
      this.chartInstance?.render();
      setTimeout(() => this.chartInstance?.fit(), 100);
    },
    fitChart() {
      this.chartInstance?.fit();
    },
    expandAll() {
      this.chartInstance?.expandAll();
    },
    collapseAll() {
      this.chartInstance?.collapseAll();
    },
    onSearch() {
      const q = this.searchQuery.toLowerCase().trim();
      if (!q) {
        this.searchResults = [];
        return;
      }
      this.searchResults = this.nodes
        .filter(
          (n) =>
            n.name?.toLowerCase().includes(q) ||
            n.position?.toLowerCase().includes(q) ||
            n.department?.toLowerCase().includes(q)
        )
        .slice(0, 5);
    },
    focusNode(nodeId) {
      this.chartInstance?.setCentered(nodeId)?.render();
      this.searchQuery = "";
      this.searchResults = [];
    },
    async exportToPng() {
      const container = this.$refs.chartContainer;
      if (!container) return;

      try {
        const canvas = await html2canvas(container, {
          backgroundColor: null,
          scale: 2,
        });
        const link = document.createElement("a");
        link.download = `${this.chart.title || "org-chart"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch (err) {
        console.error("Export failed:", err);
        alert("Export failed. Please try again.");
      }
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
      }&url=${encodeURIComponent(this.shareLink)}`;
      window.open(url, "_blank");
    },
    shareLinkedIn() {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        this.shareLink
      )}`;
      window.open(url, "_blank");
    },
    shareWhatsApp() {
      const url = `https://wa.me/?text=Check out ${
        this.chart.title
      }: ${encodeURIComponent(this.shareLink)}`;
      window.open(url, "_blank");
    },
    exportChart() {
      alert("Export functionality coming soon!");
    },
  },
};
</script>

<style>
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

.loading-screen p {
  color: white;
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
  background: #14b8a6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
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
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.back-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.9rem;
}

.header-info {
  text-align: center;
  flex: 1;
}

.chart-title {
  color: white;
  font-size: 1.5rem;
  margin: 0;
}

.chart-description {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  margin: 0.25rem 0 0;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.tool-btn,
.export-btn,
.share-btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.tool-btn:hover,
.export-btn:hover,
.share-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Toolbar */
.toolbar {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.75rem 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.toolbar-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.search-section {
  flex: 1;
  position: relative;
  max-width: 300px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 0.85rem;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.search-icon {
  position: absolute;
  left: 0.5rem;
  font-size: 0.85rem;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(30, 41, 59, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-top: 0.25rem;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  cursor: pointer;
  transition: background 0.2s;
}

.search-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.result-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
}

.result-info {
  display: flex;
  flex-direction: column;
}

.result-info strong {
  color: white;
  font-size: 0.85rem;
}

.result-info small {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
}

.label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
}

.picker {
  display: flex;
  gap: 0.3rem;
}

.swatch {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid transparent;
  cursor: pointer;
}

.swatch.active {
  border-color: #14b8a6;
  box-shadow: 0 0 8px rgba(20, 184, 166, 0.5);
}

.style-select {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.85rem;
}

.style-select option {
  background: #1e293b;
  color: white;
}

/* Chart Container */
.chart-canvas-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.chart-container {
  width: 100%;
  height: calc(100vh - 180px);
}

/* Footer */
.view-footer {
  padding: 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  background: rgba(0, 0, 0, 0.3);
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
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.85rem;
}

.copy-btn {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: #14b8a6;
  border: none;
  color: white;
  cursor: pointer;
}

.share-social {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.social-btn {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
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
  padding: 0.6rem 2rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
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

/* Responsive */
@media (max-width: 768px) {
  .view-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .toolbar {
    flex-wrap: wrap;
    justify-content: center;
  }

  .chart-container {
    height: calc(100vh - 250px);
  }
}
</style>
