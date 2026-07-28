<template>
  <div class="w-full bg-[#141414] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden font-mono text-xs text-[#F5F0E8] my-8 transition-colors">
    <!-- Terminal Window Top Bar -->
    <div class="flex items-center justify-between px-4 py-3 bg-[#1D1D1D] border-b border-[#2A2A2A]">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-[#FF5F56] inline-block"></span>
        <span class="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
        <span class="w-3 h-3 rounded-full bg-[#27C93F] inline-block"></span>
        <span class="ml-2 text-[11px] text-[#8A8A8A] font-semibold">hazman-recruiter-cli ~ bash v2.6</span>
      </div>
      <div class="flex items-center gap-2 text-[10px] text-[#E8C976]">
        <span class="w-2 h-2 rounded-full bg-[#27C93F] animate-pulse"></span>
        <span>OPEN FOR OPPORTUNITIES</span>
      </div>
    </div>

    <!-- Terminal Display Screen Area -->
    <div ref="logContainer" class="p-4 sm:p-5 h-72 sm:h-80 overflow-y-auto space-y-1 text-[11px] sm:text-xs leading-relaxed bg-[#0F0F0F] font-mono">
      <div v-for="(log, i) in logs" :key="i" class="whitespace-pre-wrap break-words">
        <span :class="log.colorClass || 'text-[#F5F0E8]'">{{ log.message }}</span>
      </div>

      <!-- Typing Blinking Cursor Indicator -->
      <div v-if="isTyping" class="inline-block w-2 h-4 bg-[#E8C976] animate-pulse align-middle ml-1"></div>
    </div>

    <!-- Terminal Prompt Input Line -->
    <div class="px-4 py-2 bg-[#171717] border-t border-[#262626] flex items-center gap-2 text-xs font-mono">
      <span class="text-[#00FF66] font-bold">[HAZMAN-CLI ~]$</span>
      <input
        v-model="inputCommand"
        type="text"
        placeholder="Type command (1-4, 'help', 'clear')..."
        class="flex-1 bg-transparent text-[#F5F0E8] focus:outline-none font-mono text-xs placeholder-[#6E655F]"
        :disabled="isTyping"
        @keydown.enter.prevent="handleCommandSubmit"
      />
      <kbd class="hidden sm:inline-block px-2 py-0.5 text-[10px] bg-[#242424] text-[#8A8A8A] rounded border border-[#333333]">
        ENTER ↵
      </kbd>
    </div>

    <!-- Recruiter Interactive Quick Action Buttons -->
    <div class="p-3 bg-[#1A1A1A] border-t border-[#2A2A2A] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-2">
        <!-- Command 1: Tech Stack -->
        <button 
          @click="execTechStack"
          :disabled="isTyping"
          class="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2D2D2D] text-[#E8C976] border border-[#333333] hover:border-[#E8C976]/50 transition-all text-[11px] font-medium flex items-center gap-1.5 cursor-pointer active:scale-95 focus-ring disabled:opacity-50"
        >
          <span>🛠️ cat tech-stack.sh</span>
        </button>

        <!-- Command 2: Metrics -->
        <button 
          @click="execMetrics"
          :disabled="isTyping"
          class="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2D2D2D] text-[#64FFDA] border border-[#333333] hover:border-[#64FFDA]/50 transition-all text-[11px] font-medium flex items-center gap-1.5 cursor-pointer active:scale-95 focus-ring disabled:opacity-50"
        >
          <span>⚡ ./eval-metrics.sh</span>
        </button>

        <!-- Command 3: Live Telemetry Stream -->
        <button 
          @click="execLiveStream"
          :disabled="isTyping"
          class="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2D2D2D] text-[#00FF66] border border-[#333333] hover:border-[#27C93F]/50 transition-all text-[11px] font-medium flex items-center gap-1.5 cursor-pointer active:scale-95 focus-ring disabled:opacity-50"
        >
          <span>📡 live-stream --telemetry</span>
        </button>

        <!-- Command 4: Hire & Resume PDF -->
        <button 
          @click="execHireContact"
          :disabled="isTyping"
          class="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2D2D2D] text-[#F5F0E8] border border-[#333333] hover:border-[#F5F0E8]/50 transition-all text-[11px] font-medium flex items-center gap-1.5 cursor-pointer active:scale-95 focus-ring disabled:opacity-50"
        >
          <span>📄 cat hire-hazman.md</span>
        </button>
      </div>

      <button 
        @click="resetTerminal"
        class="px-2.5 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2D2D2D] text-[#8A8A8A] hover:text-[#F5F0E8] transition-colors text-[10px] focus-ring self-end sm:self-auto"
      >
        Reset Screen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

interface LogLine {
  message: string;
  colorClass?: string;
}

const logContainer = ref<HTMLElement | null>(null);
const inputCommand = ref('');
const isTyping = ref(false);

const getTime = () => {
  const d = new Date();
  return d.toTimeString().split(' ')[0];
};

const logs = ref<LogLine[]>([]);

const scrollToBottom = () => {
  nextTick(() => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight;
    }
  });
};

const pushLog = (line: LogLine) => {
  logs.value.push(line);
  if (logs.value.length > 60) {
    logs.value.shift();
  }
  scrollToBottom();
};

// Line-by-line typing queue with dynamic real-time timestamp updating!
const typeLines = async (linesToType: LogLine[], delayMs = 3000) => {
  isTyping.value = true;
  for (const item of linesToType) {
    const liveTime = getTime();
    // Update timestamp dynamically for each output line
    const formattedMsg = item.message.replace(/\[\d{2}:\d{2}:\d{2}\]/g, `[${liveTime}]`);
    pushLog({
      ...item,
      message: formattedMsg
    });
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  isTyping.value = false;
};

// Initial State: Each menu line appears one by one with a 3.0s delay and LIVE timestamp for each line
const initInitialState = async () => {
  logs.value = [];
  const menuLines: LogLine[] = [
    { message: '[00:00:00] [SYSTEM] Hazman Interactive Terminal v2.6 Ready.', colorClass: 'text-[#E8C976] font-semibold' },
    { message: '[00:00:00] [HAZMAN] Software & IoT Engineer | CS Degree + E&E Diploma', colorClass: 'text-[#64FFDA] font-semibold' },
    { message: '[00:00:00] [SYSTEM] Type or click a command below to evaluate candidate:\n', colorClass: 'text-[#8A8A8A]' },
    { message: '  > 1. cat tech-stack.sh      -- View full technical capabilities & protocols', colorClass: 'text-[#E8C976]' },
    { message: '  > 2. ./eval-metrics.sh      -- Show key production systems & quantified metrics', colorClass: 'text-[#64FFDA]' },
    { message: '  > 3. live-stream --telemetry-- Simulate real-time ESP32 & FMC920 TCP packet stream', colorClass: 'text-[#00FF66]' },
    { message: '  > 4. cat hire-hazman.md     -- Direct contact info & download updated resume PDF\n', colorClass: 'text-[#F5F0E8]' },
  ];
  await typeLines(menuLines, 3000);
};

// Command 1: cat tech-stack.sh
const execTechStack = async () => {
  if (isTyping.value) return;
  const lines: LogLine[] = [
    { message: '\n[HAZMAN-CLI ~]$ cat tech-stack.sh\n', colorClass: 'text-[#00FF66] font-bold' },
    { message: '[TECH STACK MATRIX]', colorClass: 'text-[#E8C976] font-bold' },
    { message: '+-------------------+---------------------------------------------------+', colorClass: 'text-[#E8C976]' },
    { message: '| Domain            | Technologies & Infrastructure                     |', colorClass: 'text-[#E8C976]' },
    { message: '+-------------------+---------------------------------------------------+', colorClass: 'text-[#E8C976]' },
    { message: '| Frontend & UI     | Vue 3 (Composition API), React, Vite, Tailwind    |', colorClass: 'text-[#F5F0E8]' },
    { message: '| Backend & APIs    | Node.js, Express, Hono v4, REST, WebSockets, C++  |', colorClass: 'text-[#F5F0E8]' },
    { message: '| IoT & Telemetry   | ESP32, Teltonika FMC920, TCP Raw Sockets, ROS 2   |', colorClass: 'text-[#F5F0E8]' },
    { message: '| Databases & Cloud | PostgreSQL, Cloudflare D1/R2, Supabase, Vercel    |', colorClass: 'text-[#F5F0E8]' },
    { message: '| Field Networking  | Rajant Kinetic Mesh, MP2P Wireless, Starlink      |', colorClass: 'text-[#F5F0E8]' },
    { message: '+-------------------+---------------------------------------------------+', colorClass: 'text-[#E8C976]' },
  ];
  await typeLines(lines, 100);
};

// Command 2: ./eval-metrics.sh
const execMetrics = async () => {
  if (isTyping.value) return;
  const lines: LogLine[] = [
    { message: '\n[HAZMAN-CLI ~]$ ./eval-metrics.sh\n', colorClass: 'text-[#00FF66] font-bold' },
    { message: '[EXECUTING CORE SYSTEM METRICS EVALUATION...]', colorClass: 'text-[#64FFDA] font-bold' },
    { message: '[✔] Shooting Range System : WebSockets + ESP32 -> <15ms hit response latency achieved.', colorClass: 'text-[#64FFDA]' },
    { message: '[✔] MindGPS Telemetry Engine: Node.js TCP -> 500+ pkts/sec ingested into PostgreSQL (99.9% uptime).', colorClass: 'text-[#64FFDA]' },
    { message: '[✔] CanopyNet Dashboard   : Vue 3 + ROS 2 Telemetry -> Real-time field UGV spatial mapping.', colorClass: 'text-[#64FFDA]' },
    { message: '[✔] PKT Enterprise Portal : Vue + WMS API -> Onboarded 1,000+ logistics users & vendors.', colorClass: 'text-[#64FFDA]' },
  ];
  await typeLines(lines, 200);
};

// Command 3: live-stream --telemetry
const execLiveStream = async () => {
  if (isTyping.value) return;
  const lines: LogLine[] = [
    { message: '\n[HAZMAN-CLI ~]$ live-stream --telemetry\n', colorClass: 'text-[#00FF66] font-bold' },
    { message: '[LIVE SIMULATION: TELTONIKA TCP STREAM + ESP32 TARGET WEBSOCKETS]', colorClass: 'text-[#E8C976] font-bold' },
    { message: '[00:00:00] [ESP32-TARGET-01]  [WS] Hit detected! Piezo Sensor Signal -> Latency: 12ms [HIT CONFIRMED]', colorClass: 'text-[#00FF66]' },
    { message: '[00:00:00] [FMC920-GPS-092]  [TCP] Raw Binary Ingested -> 000f422414863492...', colorClass: 'text-[#64FFDA]' },
    { message: '                             └── Decoded: Lat 3.0729° N, Lon 101.5194° E | Speed: 46 km/h | Satellites: 14', colorClass: 'text-[#8A8A8A]' },
    { message: '[00:00:00] [SYSTEM] Pipeline Status: 524 pkts/sec | DB Ingestion: OK | Socket Connections: Active', colorClass: 'text-[#E8C976]' },
  ];
  await typeLines(lines, 300);
};

// Command 4: cat hire-hazman.md
const execHireContact = async () => {
  if (isTyping.value) return;
  const lines: LogLine[] = [
    { message: '\n[HAZMAN-CLI ~]$ cat hire-hazman.md\n', colorClass: 'text-[#00FF66] font-bold' },
    { message: '[CANDIDATE CONTACT DETAILS]', colorClass: 'text-[#F5F0E8] font-bold' },
    { message: '- Name          : Hazman Adanan', colorClass: 'text-[#F5F0E8]' },
    { message: '- Current Status: Open for Software & IoT Engineering opportunities', colorClass: 'text-[#E8C976]' },
    { message: '- Location      : Malaysia (Open to Hybrid / Remote / On-Site)', colorClass: 'text-[#F5F0E8]' },
    { message: '- Email         : hazmanadanan@gmail.com', colorClass: 'text-[#64FFDA]' },
    { message: '- LinkedIn      : linkedin.com/in/hazman-adanan', colorClass: 'text-[#64FFDA]' },
    { message: "- Resume PDF    : Hazman's-resume-july-2026.pdf\n", colorClass: 'text-[#00FF66]' },
    { message: '[SYSTEM] Triggering direct resume PDF download...', colorClass: 'text-[#E8C976]' },
  ];
  await typeLines(lines, 150);

  const link = document.createElement('a');
  link.href = "/Hazman's-resume-july-2026.pdf";
  link.download = "Hazman's-resume-july-2026.pdf";
  link.click();
};

const handleCommandSubmit = () => {
  if (isTyping.value) return;
  const cmd = inputCommand.value.trim().toLowerCase();
  inputCommand.value = '';

  if (!cmd) return;

  if (cmd === '1' || cmd.includes('tech') || cmd.includes('stack')) {
    execTechStack();
  } else if (cmd === '2' || cmd.includes('eval') || cmd.includes('metric')) {
    execMetrics();
  } else if (cmd === '3' || cmd.includes('live') || cmd.includes('telemetry')) {
    execLiveStream();
  } else if (cmd === '4' || cmd.includes('hire') || cmd.includes('resume') || cmd.includes('contact')) {
    execHireContact();
  } else if (cmd === 'clear' || cmd === 'reset') {
    resetTerminal();
  } else if (cmd === 'help') {
    initInitialState();
  } else {
    pushLog({
      message: `\n[HAZMAN-CLI ~]$ ${cmd}\nCommand not recognized. Try '1', '2', '3', '4', or 'help'.`,
      colorClass: 'text-[#FF5F56]'
    });
  }
};

const resetTerminal = () => {
  initInitialState();
};

onMounted(() => {
  initInitialState();
});
</script>
