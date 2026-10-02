<template>
  <div class="w-full bg-[#141414] border border-[#E6E0D4] dark:border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden font-mono text-xs text-[#F5F0E8] my-8 transition-colors print:hidden">
    <!-- Terminal Window Top Bar -->
    <div class="flex items-center justify-between px-4 py-3 bg-[#1D1D1D] border-b border-[#2A2A2A]">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-[#FF5F56] inline-block"></span>
        <span class="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
        <span class="w-3 h-3 rounded-full bg-[#27C93F] inline-block"></span>
        <span class="ml-2 text-[11px] text-[#9E9E9E] font-semibold">hazman-recruiter-cli ~ bash v2.6</span>
      </div>
      <div class="flex items-center gap-3 text-[10px] text-[#E8C976]">
        <button 
          @click="toggleSound" 
          class="px-2 py-0.5 rounded bg-[#242424] hover:bg-[#333333] text-[#E8C976] border border-[#333333] transition-colors focus-ring cursor-pointer font-mono"
          :title="isSoundEnabled ? 'Mute Terminal Audio FX' : 'Enable Mechanical Keyboard Audio FX'"
        >
          {{ isSoundEnabled ? 'Audio: ON' : 'Audio: OFF' }}
        </button>
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[#27C93F] animate-pulse"></span>
          <span>OPEN FOR OPPORTUNITIES</span>
        </div>
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
        class="flex-1 bg-transparent text-[#F5F0E8] focus:outline-none font-mono text-xs placeholder-[#9E9E9E]"
        :disabled="isTyping"
        @keydown.enter.prevent="handleCommandSubmit"
      />
      <kbd class="hidden sm:inline-block px-2 py-0.5 text-[10px] bg-[#242424] text-[#9E9E9E] rounded border border-[#333333]">
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
          class="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2D2D2D] text-[#E8C976] border border-[#333333] hover:border-[#E8C976]/50 transition-all text-[11px] font-medium flex items-center gap-1.5 cursor-pointer active:scale-95 focus-ring disabled:opacity-50 font-mono"
        >
          <span>cat tech-stack.sh</span>
        </button>

        <!-- Command 2: Metrics -->
        <button 
          @click="execMetrics"
          :disabled="isTyping"
          class="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2D2D2D] text-[#64FFDA] border border-[#333333] hover:border-[#64FFDA]/50 transition-all text-[11px] font-medium flex items-center gap-1.5 cursor-pointer active:scale-95 focus-ring disabled:opacity-50 font-mono"
        >
          <span>./eval-metrics.sh</span>
        </button>

        <!-- Command 3: Live Telemetry Stream -->
        <button 
          @click="execLiveStream"
          :disabled="isTyping"
          class="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2D2D2D] text-[#00FF66] border border-[#333333] hover:border-[#27C93F]/50 transition-all text-[11px] font-medium flex items-center gap-1.5 cursor-pointer active:scale-95 focus-ring disabled:opacity-50 font-mono"
        >
          <span>live-stream --telemetry</span>
        </button>

        <!-- Command 4: Hire & Resume PDF -->
        <button 
          @click="execHireContact"
          :disabled="isTyping"
          class="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2D2D2D] text-[#F5F0E8] border border-[#333333] hover:border-[#F5F0E8]/50 transition-all text-[11px] font-medium flex items-center gap-1.5 cursor-pointer active:scale-95 focus-ring disabled:opacity-50 font-mono"
        >
          <span>cat hire-hazman.md</span>
        </button>

        <!-- Command 5: Copy Email -->
        <button 
          @click="copyEmail"
          :disabled="isTyping"
          class="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2D2D2D] text-[#E8C976] border border-[#333333] hover:border-[#E8C976]/50 transition-all text-[11px] font-medium flex items-center gap-1.5 cursor-pointer active:scale-95 focus-ring disabled:opacity-50 font-mono"
        >
          <span>Copy Email</span>
        </button>
      </div>

      <button 
        @click="resetTerminal"
        class="px-2.5 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2D2D2D] text-[#9E9E9E] hover:text-[#F5F0E8] transition-colors text-[10px] focus-ring self-end sm:self-auto cursor-pointer"
      >
        Reset Screen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useSiteContent } from '@/composables/useSiteContent';

const { profile } = useSiteContent();
const resumeFileName = () => decodeURIComponent(profile.value.resumeUrl.split('/').pop() || 'resume.pdf');

interface LogLine {
  message: string;
  colorClass?: string;
}

const logContainer = ref<HTMLElement | null>(null);
const inputCommand = ref('');
const isTyping = ref(false);
const isSoundEnabled = ref(false);
let audioCtx: AudioContext | null = null;

const playClickSound = (freq = 800, type: OscillatorType = 'sine', duration = 0.04) => {
  if (!isSoundEnabled.value) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Ignore audio context autoplay policy restrictions
  }
};

const toggleSound = () => {
  isSoundEnabled.value = !isSoundEnabled.value;
  if (isSoundEnabled.value) {
    playClickSound(900, 'triangle', 0.08);
  }
};

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
  playClickSound(600, 'sine', 0.02);
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

// Initial State: Boot sequence appears instantly so recruiters see full summary without waiting or clicking
const initInitialState = async () => {
  logs.value = [
    { message: '[SYSTEM] Hazman Interactive Terminal v2.6 Ready.', colorClass: 'text-[#E8C976] font-semibold' },
    { message: '[HAZMAN] Software & IoT Engineer | CS Degree (UMT) + E&E Diploma (PIS)', colorClass: 'text-[#64FFDA] font-semibold' },
    { message: '--------------------------------------------------------------------------------', colorClass: 'text-[#333333]' },
    { message: 'CORE TECH: Node.js • Vue 3 • React • Express TCP • PostgreSQL • ESP32 • WebSockets', colorClass: 'text-[#F5F0E8] font-bold' },
    { message: 'FOCUS:     Range control systems | GPS fleet telemetry | Field mesh networks', colorClass: 'text-[#27C93F]' },
    { message: '--------------------------------------------------------------------------------', colorClass: 'text-[#333333]' },
    { message: 'Click any quick action button below or type a command to inspect details:\n', colorClass: 'text-[#9E9E9E]' },
  ];
  scrollToBottom();
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
    { message: '[✔] Shooting Range System : WebSockets + ESP32 -> real-time hit detection to the control screen.', colorClass: 'text-[#64FFDA]' },
    { message: '[✔] MindGPS Telemetry Engine: Node.js TCP -> Teltonika telemetry parsed into PostgreSQL.', colorClass: 'text-[#64FFDA]' },
    { message: '[✔] CanopyNet Dashboard   : Vue 3 teleops UI -> live UGV control (ROS 2 by teammate).', colorClass: 'text-[#64FFDA]' },
    { message: '[✔] PKT Enterprise Portal : Vue + Tailwind -> security portal & e-claim for internal staff.', colorClass: 'text-[#64FFDA]' },
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
    { message: `- Name          : ${profile.value.name}`, colorClass: 'text-[#F5F0E8]' },
    { message: '- Current Status: Open for Software & IoT Engineering opportunities', colorClass: 'text-[#E8C976]' },
    { message: '- Location      : Malaysia (Open to Hybrid / Remote / On-Site)', colorClass: 'text-[#F5F0E8]' },
    { message: `- Email         : ${profile.value.email}`, colorClass: 'text-[#64FFDA]' },
    { message: `- LinkedIn      : ${profile.value.linkedin.replace(/^https?:\/\/(www\.)?/, '')}`, colorClass: 'text-[#64FFDA]' },
    { message: `- Resume PDF    : ${resumeFileName()}\n`, colorClass: 'text-[#00FF66]' },
    { message: '[SYSTEM] Triggering direct resume PDF download...', colorClass: 'text-[#E8C976]' },
  ];
  await typeLines(lines, 150);

  const link = document.createElement('a');
  link.href = profile.value.resumeUrl;
  link.download = resumeFileName();
  link.click();
};

const copyEmail = async () => {
  if (isTyping.value) return;
  try {
    await navigator.clipboard.writeText(profile.value.email);
    pushLog({
      message: `\n[HAZMAN-CLI ~]$ copy email\n[✔] SUCCESS: Email address "${profile.value.email}" copied to clipboard!`,
      colorClass: 'text-[#00FF66] font-bold'
    });
  } catch (err) {
    pushLog({
      message: `\n[HAZMAN-CLI ~]$ copy email\n[!] Email: ${profile.value.email}`,
      colorClass: 'text-[#E8C976]'
    });
  }
};

const handleCommandSubmit = () => {
  if (isTyping.value) return;
  const cmd = inputCommand.value.trim().toLowerCase();
  inputCommand.value = '';

  if (!cmd) return;

  if (cmd === '1' || cmd.includes('tech') || cmd.includes('stack') || cmd.includes('skills')) {
    execTechStack();
  } else if (cmd === '2' || cmd.includes('eval') || cmd.includes('metric') || cmd.includes('status')) {
    execMetrics();
  } else if (cmd === '3' || cmd.includes('live') || cmd.includes('telemetry')) {
    execLiveStream();
  } else if (cmd === '4' || cmd.includes('hire') || cmd.includes('resume') || cmd.includes('whoami')) {
    execHireContact();
  } else if (cmd === 'copy' || cmd.includes('email')) {
    copyEmail();
  } else if (cmd === 'clear' || cmd === 'reset') {
    resetTerminal();
  } else if (cmd === 'help') {
    initInitialState();
  } else {
    pushLog({
      message: `\n[HAZMAN-CLI ~]$ ${cmd}\nCommand not recognized. Try '1', '2', '3', '4', 'copy', or 'help'.`,
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
