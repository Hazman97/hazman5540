// Shared Org Chart Styling Utilities
// Extracts the complex d3-org-chart card HTML generators so they can be reused
// across Demo, Create, Edit, and View modes without duplication.

export const orgChartThemes = [
  { id: "light", name: "Light", color: "#ffffff", gradient: "linear-gradient(135deg, #f0f4f8, #d9e2ec)" },
  { id: "dark", name: "Dark", color: "#1e293b", gradient: "linear-gradient(135deg, #0f172a, #1e293b)" },
  { id: "blue", name: "Ocean", color: "#1e3a5f", gradient: "linear-gradient(135deg, #0c1929, #1e3a5f)" },
  { id: "purple", name: "Violet", color: "#4c1d95", gradient: "linear-gradient(135deg, #1e1033, #4c1d95)" },
  { id: "green", name: "Forest", color: "#064e3b", gradient: "linear-gradient(135deg, #022c22, #064e3b)" },
  { id: "warm", name: "Sunset", color: "#7c2d12", gradient: "linear-gradient(135deg, #1c1210, #7c2d12)" },
];

export const orgChartStyles = [
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
];

export const orgChartColors = [
  { id: "blue", value: "#3b82f6" },
  { id: "cyan", value: "#06b6d4" },
  { id: "green", value: "#10b981" },
  { id: "purple", value: "#8b5cf6" },
  { id: "pink", value: "#ec4899" },
  { id: "orange", value: "#f97316" },
  { id: "red", value: "#ef4444" },
  { id: "gray", value: "#6b7280" },
];

export const orgChartDepartmentColors = {
  Executive: "#3b82f6",
  Technology: "#06b6d4",
  Finance: "#10b981",
  Operations: "#f97316",
  Design: "#ec4899",
  HR: "#8b5cf6",
  Marketing: "#f59e0b",
  Sales: "#ef4444",
};

export function getTheme(themeId) {
  const configs = {
    light: { bg: "#f8fafc", card: "#ffffff", text: "#1e293b", sub: "#64748b", border: "#e2e8f0", link: "#94a3b8" },
    "modern-white": { bg: "#ffffff", card: "#f8fafc", text: "#0f172a", sub: "#475569", border: "#cbd5e1", link: "#64748b" },
    dark: { bg: "#0f172a", card: "#1e293b", text: "#f1f5f9", sub: "#94a3b8", border: "#334155", link: "#475569", isDark: true },
    blue: { bg: "#0c1929", card: "#1e3a5f", text: "#e0f2fe", sub: "#7dd3fc", border: "#2563eb", link: "#3b82f6", isDark: true },
    purple: { bg: "#1e1033", card: "#2e1065", text: "#f3e8ff", sub: "#c4b5fd", border: "#7c3aed", link: "#8b5cf6", isDark: true },
    green: { bg: "#022c22", card: "#064e3b", text: "#d1fae5", sub: "#6ee7b7", border: "#059669", link: "#10b981", isDark: true },
    warm: { bg: "#1c1210", card: "#431407", text: "#fef3c7", sub: "#fcd34d", border: "#ea580c", link: "#f97316", isDark: true },
  };
  return configs[themeId] || configs.light;
}

export function getColorValue(id) {
  const colorObj = orgChartColors.find(c => c.id === id);
  return colorObj ? colorObj.value : "#3b82f6";
}

export function getDepartmentColor(deptName) {
  if (orgChartDepartmentColors[deptName]) return orgChartDepartmentColors[deptName];
  // Hash color
  const colors = orgChartColors.map((c) => c.value);
  let hash = 0;
  for (let i = 0; i < deptName.length; i++) {
    hash = deptName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

/**
 * Returns the HTML string for a D3 org chart node card.
 */
export function getCardStyle(data, themeId, styleId, getSubordinateCount = (id) => 0) {
  const theme = getTheme(themeId);
  const color = getColorValue(data.color);
  const deptColor = getDepartmentColor(data.department || "");
  const initials = getInitials(data.name);

  const bg = theme.card;
  const text = theme.text;
  const sub = theme.sub;
  const border = theme.border;

  const avatarContent = data.imageUrl
    ? `<img src="${data.imageUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" />`
    : `<div style="width:100%;height:100%;background:${color};color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.2rem;border-radius:inherit;">${initials}</div>`;

  const deptBadge = data.department
    ? `<span style="padding:4px 10px;background:${deptColor}15;color:${deptColor};border-radius:20px;font-size:0.65rem;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;border:1px solid ${deptColor}30;">${data.department}</span>`
    : "";

  const idBadge = data.workerId ? `<span style="font-family:'Monaco',monospace;font-size:0.6rem;opacity:0.6;background:${theme.text}10;padding:2px 6px;border-radius:4px;">${data.workerId}</span>` : "";

  if (styleId === "modern") {
    return `
      <div style="width:100%;height:100%;background:${bg};border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.05);border:1px solid ${border};display:flex;align-items:center;padding:16px;gap:16px;font-family:'Inter',sans-serif;position:relative;overflow:hidden;transition:all 0.3s ease;">
        <div style="position:absolute;left:0;top:0;bottom:0;width:4px;background:${color};"></div>
        <div style="width:56px;height:56px;border-radius:50%;flex-shrink:0;box-shadow:0 4px 10px rgba(0,0,0,0.1);">${avatarContent}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.95rem;font-weight:700;color:${text};margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${data.name || ''}</div>
          <div style="font-size:0.75rem;color:${color};font-weight:500;margin-bottom:6px;">${data.position || ''}</div>
          <div style="display:flex;gap:6px;align-items:center;">${deptBadge} ${idBadge}</div>
        </div>
        <div style="position:absolute;right:10px;top:10px;opacity:0;">•••</div>
      </div>`;
  }

  if (styleId === "gradient") {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(145deg, ${bg}, ${bg});border-radius:20px;box-shadow:0 10px 30px -10px ${color}60;border:1px solid ${color}40;display:flex;flex-direction:column;align-items:center;padding:24px 16px;font-family:'Inter',sans-serif;position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;left:0;right:0;height:6px;background:linear-gradient(90deg, ${color}, ${deptColor});"></div>
        <div style="width:80px;height:80px;border-radius:50%;margin-bottom:16px;padding:3px;background:linear-gradient(135deg, ${color}, ${deptColor});box-shadow:0 8px 20px -5px ${color}50;">
          <div style="width:100%;height:100%;border-radius:50%;border:3px solid ${bg};overflow:hidden;">${avatarContent}</div>
        </div>
        <div style="text-align:center;width:100%;">
          <div style="font-size:1.1rem;font-weight:700;color:${text};margin-bottom:4px;">${data.name || ''}</div>
          <div style="font-size:0.8rem;color:${color};font-weight:600;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px;">${data.position || ''}</div>
          <div style="display:flex;justify-content:center;gap:6px;flex-wrap:wrap;">${deptBadge}</div>
          <div style="margin-top:12px;border-top:1px solid ${border}80;padding-top:12px;width:100%;display:flex;justify-content:center;gap:15px;color:${sub};font-size:0.75rem;">
            ${data.workerId ? `<span>ID: <strong>${data.workerId}</strong></span>` : ''}
            <span>Subs: <strong>${getSubordinateCount(data.id)}</strong></span>
          </div>
        </div>
      </div>`;
  }

  if (styleId === "minimal") {
    return `
      <div style="width:100%;height:100%;background:${bg};border-radius:8px;border:1px solid ${border};display:flex;align-items:center;padding:12px;gap:12px;font-family:'Inter',sans-serif;box-shadow:0 2px 4px rgba(0,0,0,0.03);">
        <div style="width:42px;height:42px;border-radius:6px;overflow:hidden;">${avatarContent}</div>
        <div>
          <div style="font-size:0.9rem;font-weight:600;color:${text};">${data.name || ''}</div>
          <div style="font-size:0.75rem;color:${sub};">${data.position || ''}</div>
        </div>
        <div style="margin-left:auto;height:100%;width:3px;background:${color};border-radius:2px;"></div>
      </div>`;
  }

  if (styleId === "rounded") {
    return `
      <div style="width:100%;height:100%;background:${bg};border-radius:24px;border:2px solid ${theme.bg === "#f8fafc" ? "#f1f5f9" : "#334155"};display:flex;flex-direction:column;align-items:center;padding:20px;font-family:'dm sans',sans-serif;position:relative;">
        <div style="width:70px;height:70px;border-radius:24px;margin-bottom:14px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.08);transform:rotate(-3deg);border:3px solid white;">${avatarContent}</div>
        <div style="font-size:1rem;font-weight:700;color:${text};margin-bottom:2px;">${data.name || ''}</div>
        <div style="font-size:0.75rem;color:${sub};margin-bottom:12px;">${data.position || ''}</div>
        ${deptBadge}
        <div style="position:absolute;top:15px;right:15px;width:8px;height:8px;border-radius:50%;background:${color};"></div>
      </div>`;
  }

  if (styleId === "shadow") {
    return `
      <div style="width:100%;height:100%;background:${bg};border-radius:16px;box-shadow:0 15px 35px -10px rgba(0,0,0,0.15), 0 5px 15px -5px rgba(0,0,0,0.05);display:flex;flex-direction:column;align-items:center;padding:0;overflow:hidden;font-family:'Inter',sans-serif;">
        <div style="width:100%;height:80px;background:linear-gradient(135deg, ${color}, ${deptColor});position:relative;">
          <div style="position:absolute;bottom:-35px;left:50%;transform:translateX(-50%);width:70px;height:70px;border-radius:50%;border:4px solid ${bg};overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,0.2);">${avatarContent}</div>
        </div>
        <div style="padding:40px 20px 20px;text-align:center;width:100%;">
          <div style="font-size:1rem;font-weight:700;color:${text};">${data.name || ''}</div>
          <div style="font-size:0.75rem;color:${color};font-weight:600;margin-bottom:8px;">${data.position || ''}</div>
          ${idBadge}
        </div>
      </div>`;
  }

  if (styleId === "glass") {
    return `
      <div style="width:100%;height:100%;background:${bg}99;backdrop-filter:blur(12px);border-radius:24px;border:1px solid ${border}80;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;font-family:'Inter',sans-serif;position:relative;box-shadow:0 8px 32px rgba(0,0,0,0.05);">
        <div style="position:absolute;inset:0;background:linear-gradient(135deg, ${color}10, transparent);border-radius:24px;pointer-events:none;"></div>
        <div style="width:72px;height:72px;border-radius:20px;margin-bottom:14px;overflow:hidden;border:1px solid ${color}40;padding:4px;background:${bg}60;">
           <div style="width:100%;height:100%;border-radius:14px;overflow:hidden;">${avatarContent}</div>
        </div>
        <div style="font-size:1.05rem;font-weight:600;color:${text};">${data.name || ''}</div>
        <div style="font-size:0.75rem;color:${sub};margin-bottom:10px;">${data.position || ''}</div>
        <div style="display:flex;gap:6px;">
          ${deptBadge}
        </div>
      </div>`;
  }

  if (styleId === "neon") {
    const neonColor = theme.isDark ? color : "#2563eb";
    return `
      <div style="width:100%;height:100%;background:${bg};border-radius:4px;border:2px solid ${neonColor};box-shadow:0 0 15px ${neonColor}40, inset 0 0 10px ${neonColor}10;display:flex;flex-direction:column;padding:20px;position:relative;font-family:'Sora',sans-serif;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:15px;">
          <div style="width:50px;height:50px;border-radius:4px;overflow:hidden;border:1px solid ${neonColor};">${avatarContent}</div>
          <span style="font-family:'Monaco',monospace;font-size:0.7rem;color:${neonColor};">${data.workerId || ''}</span>
        </div>
        <div style="margin-top:auto;">
          <div style="font-size:1rem;font-weight:700;color:${text};letter-spacing:-0.5px;">${data.name || ''}</div>
          <div style="font-size:0.75rem;color:${neonColor};text-transform:uppercase;letter-spacing:1px;margin-top:4px;">${data.position || ''}</div>
        </div>
        <div style="position:absolute;bottom:0;right:0;width:0;height:0;border-style:solid;border-width:0 0 20px 20px;border-color:transparent transparent ${neonColor} transparent;"></div>
      </div>`;
  }

  if (styleId === "flat") {
    return `
      <div style="width:100%;height:100%;background:${color};border-radius:16px;display:flex;flex-direction:column;align-items:center;padding:24px;color:white;font-family:'Inter',sans-serif;box-shadow:0 10px 25px -5px ${color}60;">
        <div style="width:70px;height:70px;border-radius:50%;margin-bottom:16px;overflow:hidden;border:3px solid rgba(255,255,255,0.3);">${avatarContent}</div>
        <div style="font-size:1.1rem;font-weight:700;margin-bottom:4px;">${data.name || ''}</div>
        <div style="font-size:0.8rem;opacity:0.9;font-weight:500;margin-bottom:12px;">${data.position || ''}</div>
        <div style="background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:20px;font-size:0.7rem;backdrop-filter:blur(4px);">${data.department || "General"}</div>
      </div>`;
  }

  if (styleId === "elegant") {
    return `
      <div style="width:100%;height:100%;background:${bg};border-radius:2px;border:1px solid #d4af37;display:flex;flex-direction:column;align-items:center;padding:20px;font-family:'Playfair Display',serif;position:relative;box-shadow:inset 0 0 0 4px ${bg}, inset 0 0 0 5px #d4af37;">
        <div style="width:60px;height:60px;border-radius:50%;margin-bottom:12px;overflow:hidden;border:1px solid #d4af37;padding:2px;">
          <div style="width:100%;height:100%;border-radius:50%;overflow:hidden;">${avatarContent}</div>
        </div>
        <div style="font-size:1.1rem;font-weight:700;color:${text};font-style:italic;">${data.name || ''}</div>
        <div style="font-size:0.7rem;color:#d4af37;letter-spacing:1px;text-transform:uppercase;margin:4px 0 10px;">${data.position || ''}</div>
        <div style="width:30px;height:1px;background:#d4af37;"></div>
        <div style="margin-top:10px;font-family:'Inter',sans-serif;font-size:0.6rem;color:${sub};">${data.workerId || ''}</div>
      </div>`;
  }

  if (styleId === "tech") {
    return `
      <div style="width:100%;height:100%;background:${bg};border-radius:12px;border:1px solid ${color}60;display:flex;flex-direction:column;padding:2px;position:relative;font-family:'Rajdhani',sans-serif;clip-path:polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);">
        <div style="background:${color}10;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:15px;clip-path:inherit;">
          <div style="position:absolute;top:0;left:15px;right:0;height:1px;background:${color};"></div>
          <div style="position:absolute;bottom:0;right:15px;left:0;height:1px;background:${color};"></div>
          <div style="width:64px;height:64px;margin-bottom:12px;position:relative;">
            <div style="position:absolute;inset:-4px;border-radius:50%;border:1px dashed ${color};animation:spin 10s linear infinite;"></div>
            <div style="width:100%;height:100%;border-radius:50%;overflow:hidden;border:2px solid ${color};">${avatarContent}</div>
          </div>
          <div style="font-size:1.2rem;font-weight:700;color:${text};text-transform:uppercase;">${data.name || ''}</div>
          <div style="font-size:0.8rem;color:${color};font-weight:600;">${data.position || ''}</div>
          <div style="margin-top:8px;font-size:0.65rem;background:${color};color:${bg};padding:2px 8px;border-radius:2px;">${data.department || ''}</div>
        </div>
      </div>`;
  }

  // Fallback
  return `
    <div style="width:100%;height:100%;background:${bg};border-radius:8px;border:1px solid ${border};display:flex;justify-content:center;align-items:center;padding:10px;text-align:center;">
      <div style="font-weight:600;color:${text}">${data.name || ''}</div>
    </div>`;
}
