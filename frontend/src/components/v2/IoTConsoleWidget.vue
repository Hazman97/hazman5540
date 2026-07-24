<template>
  <div class="w-full bg-[#141414] dark:bg-[#141414] bg-[#1E1B18] border border-[#2A2A2A] dark:border-[#2A2A2A] border-[#3D352E] rounded-2xl shadow-2xl overflow-hidden font-mono text-xs text-[#F5F0E8] my-8">
    <!-- Console Header Bar -->
    <div class="flex items-center justify-between px-4 py-3 bg-[#1D1D1D] dark:bg-[#1D1D1D] bg-[#292420] border-b border-[#2A2A2A] dark:border-[#2A2A2A] border-[#3D352E]">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-[#FF5F56] inline-block"></span>
        <span class="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
        <span class="w-3 h-3 rounded-full bg-[#27C93F] inline-block"></span>
        <span class="ml-2 text-[11px] text-[#8A8A8A] dark:text-[#8A8A8A] text-[#A89F95] font-semibold">hazman-iot-telemetry-console ~ bash</span>
      </div>
      <div class="flex items-center gap-2 text-[10px] text-[#E8C976] dark:text-[#E8C976] text-[#F3D78A]">
        <span class="w-2 h-2 rounded-full bg-[#27C93F] animate-ping"></span>
        <span>SYSTEM LIVE</span>
      </div>
    </div>

    <!-- Live Log Feed Output Area -->
    <div ref="logContainer" class="p-4 sm:p-5 h-48 sm:h-56 overflow-y-auto space-y-2 text-[11px] sm:text-xs leading-relaxed bg-[#0F0F0F] dark:bg-[#0F0F0F] bg-[#171412]">
      <div v-for="(log, i) in logs" :key="i" class="flex items-start gap-2">
        <span class="text-[#8A8A8A] dark:text-[#8A8A8A] text-[#A89F95] shrink-0">[{{ log.timestamp }}]</span>
        <span 
          class="font-semibold shrink-0"
          :class="{
            'text-[#E8C976]': log.type === 'esp32',
            'text-[#27C93F]': log.type === 'gps',
            'text-[#64FFDA]': log.type === 'mesh',
            'text-[#FF5F56]': log.type === 'system',
          }"
        >
          [{{ log.tag }}]
        </span>
        <span class="text-[#F5F0E8]/90 break-all">{{ log.message }}</span>
      </div>
    </div>

    <!-- Interactive Terminal Controls -->
    <div class="p-3 bg-[#1A1A1A] dark:bg-[#1A1A1A] bg-[#24201C] border-t border-[#2A2A2A] dark:border-[#2A2A2A] border-[#3D352E] flex flex-wrap items-center justify-between gap-2">
      <div class="flex flex-wrap items-center gap-2">
        <button 
          @click="triggerPing"
          class="px-3 py-1.5 rounded-lg bg-[#242424] dark:bg-[#242424] bg-[#2E2823] hover:bg-[#38302A] text-[#E8C976] border border-[#333333] dark:border-[#333333] border-[#4A4037] hover:border-[#E8C976]/40 transition-all text-[11px] flex items-center gap-1.5 cursor-pointer active:scale-95 focus-ring"
        >
          <span>📡 Ping ESP32 Target</span>
        </button>

        <button 
          @click="triggerGPS"
          class="px-3 py-1.5 rounded-lg bg-[#242424] dark:bg-[#242424] bg-[#2E2823] hover:bg-[#38302A] text-[#27C93F] border border-[#333333] dark:border-[#333333] border-[#4A4037] hover:border-[#27C93F]/40 transition-all text-[11px] flex items-center gap-1.5 cursor-pointer active:scale-95 focus-ring"
        >
          <span>🚗 Stream Teltonika GPS</span>
        </button>

        <button 
          @click="triggerMesh"
          class="px-3 py-1.5 rounded-lg bg-[#242424] dark:bg-[#242424] bg-[#2E2823] hover:bg-[#38302A] text-[#64FFDA] border border-[#333333] dark:border-[#333333] border-[#4A4037] hover:border-[#64FFDA]/40 transition-all text-[11px] flex items-center gap-1.5 cursor-pointer active:scale-95 focus-ring"
        >
          <span>🌐 Check Rajant Mesh</span>
        </button>
      </div>

      <button 
        @click="clearLogs"
        class="px-2.5 py-1.5 rounded-lg bg-[#242424] dark:bg-[#242424] bg-[#2E2823] hover:bg-[#38302A] text-[#8A8A8A] dark:text-[#8A8A8A] text-[#A89F95] hover:text-[#F5F0E8] transition-colors text-[10px] focus-ring"
      >
        Clear Console
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

interface LogEntry {
  timestamp: string;
  tag: string;
  type: 'esp32' | 'gps' | 'mesh' | 'system';
  message: string;
}

const logContainer = ref<HTMLElement | null>(null);

const getTime = () => {
  const d = new Date();
  return d.toTimeString().split(' ')[0] + '.' + Math.floor(d.getMilliseconds() / 100);
};

const logs = ref<LogEntry[]>([
  { timestamp: getTime(), tag: 'SYSTEM', type: 'system', message: 'Mindnrobotics telemetry engine initialized.' },
  { timestamp: getTime(), tag: 'ESP32-TARGET-01', type: 'esp32', message: 'Embedded Target MCU connected via WebSocket. Signal: -58dBm.' },
  { timestamp: getTime(), tag: 'TELTONIKA-FMC920', type: 'gps', message: 'Fleet Vehicle #04 telemetry packet ingested -> Lat: 3.0738° N, Lon: 101.5183° E.' },
  { timestamp: getTime(), tag: 'RAJANT-MESH', type: 'mesh', message: 'Rajant BreadCrumb node 10.0.4.12 mesh link established (100 Mbps).' },
]);

let timer: number;

const addLog = (tag: string, type: 'esp32' | 'gps' | 'mesh' | 'system', message: string) => {
  logs.value.push({ timestamp: getTime(), tag, type, message });
  if (logs.value.length > 25) {
    logs.value.shift();
  }
  nextTick(() => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight;
    }
  });
};

const triggerPing = () => {
  const targetId = Math.floor(Math.random() * 8) + 1;
  const latency = Math.floor(Math.random() * 15) + 8;
  addLog(`ESP32-TARGET-0${targetId}`, 'esp32', `Target hit detected! Latency: ${latency}ms. Relaying hit event to web UI.`);
};

const triggerGPS = () => {
  const speed = Math.floor(Math.random() * 40) + 40;
  const lat = (3.0738 + (Math.random() - 0.5) * 0.01).toFixed(4);
  const lon = (101.5183 + (Math.random() - 0.5) * 0.01).toFixed(4);
  addLog('TELTONIKA-FMC920', 'gps', `Vehicle #02 speed: ${speed} km/h | Coords: ${lat}° N, ${lon}° E -> Ingested into PostgreSQL.`);
};

const triggerMesh = () => {
  const rssi = Math.floor(Math.random() * 15) - 68;
  addLog('RAJANT-MESH', 'mesh', `Node 10.0.4.18 RSSI: ${rssi} dBm. Starlink uplink backhaul latency: 28ms.`);
};

const clearLogs = () => {
  logs.value = [];
  addLog('SYSTEM', 'system', 'Console cleared by user.');
};

onMounted(() => {
  timer = window.setInterval(() => {
    const randomEvent = Math.random();
    if (randomEvent < 0.35) {
      triggerPing();
    } else if (randomEvent < 0.7) {
      triggerGPS();
    } else {
      triggerMesh();
    }
  }, 6000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
