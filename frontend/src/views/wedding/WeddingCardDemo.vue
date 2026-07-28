<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Card state
const isCardOpened = ref(false)
const isOpening = ref(false)
const isPlayingMusic = ref(false)
const showRsvpModal = ref(false)
const showGiftModal = ref(false)

// Wedding Details
const coupleName = "Mariani & Mazlan"
const weddingDateStr = "2026-09-19T11:00:00"
const locationName = "Dewan Perdana Bukit Beruntung Golf Club, Rawang"

// Countdown Timer
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let timerInterval: any = null

const updateCountdown = () => {
  const target = new Date(weddingDateStr).getTime()
  const now = new Date().getTime()
  const diff = target - now

  if (diff > 0) {
    days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
  } else {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
  }
}

// Open Card Action (Page 1 -> Page 2 Transition)
const handleOpenCard = () => {
  isOpening.value = true
  setTimeout(() => {
    isCardOpened.value = true
    isPlayingMusic.value = true
  }, 800)
}

// RSVP Form Data
const rsvpForm = ref({
  name: '',
  phone: '',
  attending: 'ya',
  pax: 1,
  message: ''
})

const rsvpSubmitted = ref(false)

const handleRsvpSubmit = () => {
  if (!rsvpForm.value.name) return
  rsvpSubmitted.value = true
  setTimeout(() => {
    showRsvpModal.value = false
  }, 2000)
}

// Guestbook Wishes sample data
const wishes = ref([
  { name: 'Ahmad & Keluarga', message: 'Selamat Pengantin Baru Mariani & Mazlan! Semoga kekal hingga ke jannah.', time: '2 jam lalu' },
  { name: 'Siti Nurhaliza', message: 'Barakallahulakuma! Semoga dipermudahkan segala urusan perkahwinan.', time: '5 jam lalu' },
  { name: 'Dr. Faizal', message: 'Tahniah sahabat! Nanti kami sekeluarga datang beramai-ramai.', time: '1 hari lalu' }
])

const addWish = () => {
  if (rsvpForm.value.message && rsvpForm.value.name) {
    wishes.value.unshift({
      name: rsvpForm.value.name,
      message: rsvpForm.value.message,
      time: 'Baru sahaja'
    })
  }
}

onMounted(() => {
  updateCountdown()
  timerInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<template>
  <div class="wedding-experience bg-slate-950 min-h-screen text-slate-100 font-sans relative overflow-x-hidden selection:bg-amber-500 selection:text-slate-900">
    
    <!-- Floating Back to Platform Landing Button -->
    <div class="fixed top-4 left-4 z-50">
      <button 
        @click="router.push('/wedding')" 
        class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-medium text-amber-200 hover:bg-slate-800 transition-all shadow-lg hover:scale-105"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Landing Page
      </button>
    </div>

    <!-- Floating Background Music Player Button (Shown when card is open) -->
    <div v-if="isCardOpened" class="fixed top-4 right-4 z-50">
      <button 
        @click="isPlayingMusic = !isPlayingMusic"
        class="flex items-center gap-2 px-3.5 py-2 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-semibold backdrop-blur-md shadow-xl transition-all hover:scale-105 animate-pulse"
      >
        <span class="relative flex h-2.5 w-2.5">
          <span v-if="isPlayingMusic" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5" :class="isPlayingMusic ? 'bg-amber-500' : 'bg-slate-500'"></span>
        </span>
        <svg v-if="isPlayingMusic" class="w-4 h-4 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        <svg v-else class="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
        <span>{{ isPlayingMusic ? 'Lagu Dimainkan 🎵' : 'Mute Lagu' }}</span>
      </button>
    </div>

    <!-- PAGE 1: REALISTIC PHYSICAL PAPER CARD COVER (PAGE UNOPENED) -->
    <Transition name="gatefold">
      <div 
        v-if="!isCardOpened" 
        class="fixed inset-0 z-40 flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40"
        :class="{ 'opening-animation': isOpening }"
      >
        <!-- REALISTIC PAPER CARD WRAPPER -->
        <div class="real-paper-card w-full max-w-[420px] min-h-[660px] relative rounded-2xl shadow-2xl p-6 flex flex-col justify-between items-center text-center overflow-hidden border border-amber-200/20 transform transition-transform duration-700 hover:scale-[1.01]">
          
          <!-- Subtle Paper Texture Overlay -->
          <div class="absolute inset-0 bg-[radial-gradient(#b89e6c_0.8px,transparent_0.8px)] [background-size:12px_12px] opacity-15 pointer-events-none"></div>
          
          <!-- Outer Embossed Shadow Border -->
          <div class="absolute inset-2 rounded-xl border border-amber-600/30 inset-shadow pointer-events-none"></div>

          <!-- CARD HEADER ORNAMENT (KHAT / ARABIC BISMILLAH) -->
          <div class="z-10 pt-4">
            <div class="khat-text text-amber-600 font-serif text-xl tracking-widest gold-foil-effect mb-2">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <p class="text-[11px] tracking-[0.25em] uppercase font-semibold text-amber-800/80">
              WALIMATULURUS / JEMPUTAN KAHWIN
            </p>
          </div>

          <!-- CARD CENTER: COUPLE NAMES & DATE -->
          <div class="z-10 py-6 space-y-4 my-auto">
            <p class="text-xs italic text-amber-900/70 font-serif">Dengan penuh kesyukuran, kami menjemput Dato' / Datin / Tuan / Puan / Encik / Cik ke majlis perkahwinan</p>
            
            <h1 class="font-serif text-4xl sm:text-5xl font-extrabold gold-foil-effect leading-tight tracking-wide">
              Mariani<br/>
              <span class="text-2xl font-light text-amber-700 tracking-normal">&amp;</span><br/>
              Mazlan
            </h1>

            <div class="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto my-3"></div>

            <div class="space-y-1">
              <p class="text-xs font-bold tracking-widest text-slate-800 uppercase">Sabtu | 19 September 2026</p>
              <p class="text-[11px] text-amber-900/80 font-medium">Bukit Beruntung Golf Club, Rawang</p>
            </div>
          </div>

          <!-- CARD FOOTER: WAX SEAL BUTTON ("BUKA KAD") -->
          <div class="z-10 pb-4 space-y-3 w-full flex flex-col items-center">
            <p class="text-[10px] uppercase tracking-widest text-amber-900/60 font-semibold animate-pulse">Tekan Cap Lilin Untuk Buka Kad</p>
            
            <button 
              @click="handleOpenCard"
              class="wax-seal-btn group flex flex-col items-center justify-center relative cursor-pointer"
            >
              <div class="wax-seal-outer"></div>
              <div class="seal-content text-amber-100 flex flex-col items-center justify-center">
                <span class="font-serif font-extrabold text-sm tracking-wider group-hover:scale-110 transition-transform">M & M</span>
                <span class="text-[9px] uppercase font-semibold tracking-widest opacity-90">BUKA</span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </Transition>

    <!-- PAGE 2: FULL DIGITAL INVITATION EXPERIENCE (WHEN CARD IS OPENED) -->
    <div v-if="isCardOpened" class="digital-invitation-body max-w-lg mx-auto bg-slate-900 min-h-screen border-x border-slate-800 shadow-2xl relative">
      
      <!-- HERO HEADER COVER IMAGE SECTION -->
      <div class="relative h-[480px] w-full overflow-hidden flex flex-col justify-end p-6 text-center">
        <!-- Background Decorative Gradient & Pattern -->
        <div class="absolute inset-0 bg-gradient-to-b from-amber-950/40 via-slate-950/70 to-slate-900 z-10"></div>
        <div class="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        
        <!-- Floral / Ornament Top Header -->
        <div class="absolute top-12 inset-x-0 mx-auto w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
        
        <div class="relative z-20 space-y-3 pb-4">
          <span class="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-widest uppercase">
            Jemputan Walimatulurus
          </span>
          <h1 class="font-serif text-4xl sm:text-5xl text-amber-200 font-extrabold tracking-wide drop-shadow-md">
            Mariani &amp; Mazlan
          </h1>
          <p class="text-sm text-slate-300 font-light">Sabtu, 19 September 2026</p>
        </div>

        <!-- Scroll Indicator -->
        <div class="relative z-20 flex justify-center mt-2">
          <div class="animate-bounce p-2 text-amber-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      <!-- COUNTDOWN TIMER SECTION -->
      <div class="px-6 py-8 bg-slate-900/90 border-y border-amber-500/10 text-center">
        <h2 class="text-xs uppercase tracking-[0.2em] font-semibold text-amber-400 mb-4">Menghitung Hari Ke Majlis</h2>
        <div class="grid grid-cols-4 gap-3 max-w-xs mx-auto">
          <div class="bg-slate-800/80 border border-amber-500/20 rounded-xl p-3 shadow-lg">
            <span class="block text-2xl font-bold font-mono text-amber-300">{{ days }}</span>
            <span class="text-[10px] text-slate-400 uppercase font-medium">Hari</span>
          </div>
          <div class="bg-slate-800/80 border border-amber-500/20 rounded-xl p-3 shadow-lg">
            <span class="block text-2xl font-bold font-mono text-amber-300">{{ hours }}</span>
            <span class="text-[10px] text-slate-400 uppercase font-medium">Jam</span>
          </div>
          <div class="bg-slate-800/80 border border-amber-500/20 rounded-xl p-3 shadow-lg">
            <span class="block text-2xl font-bold font-mono text-amber-300">{{ minutes }}</span>
            <span class="text-[10px] text-slate-400 uppercase font-medium">Minit</span>
          </div>
          <div class="bg-slate-800/80 border border-amber-500/20 rounded-xl p-3 shadow-lg">
            <span class="block text-2xl font-bold font-mono text-amber-300">{{ seconds }}</span>
            <span class="text-[10px] text-slate-400 uppercase font-medium">Saat</span>
          </div>
        </div>
      </div>

      <!-- EVENT DETAILS & TIMELINE SECTION -->
      <div class="p-6 space-y-6">
        <div class="text-center space-y-2">
          <h2 class="font-serif text-2xl text-amber-200 font-bold">Atur Cara Majlis</h2>
          <p class="text-xs text-slate-400">Dewan Perdana Bukit Beruntung Golf Club</p>
        </div>

        <div class="space-y-4">
          <div class="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
            <div class="bg-amber-500/10 p-3 rounded-lg text-amber-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">11:00 AM - 4:00 PM</span>
              <h3 class="font-semibold text-slate-100 text-sm">Ketibaan Tetamu &amp; Jamuan Makan</h3>
              <p class="text-xs text-slate-400 mt-1">Sajian pelbagai hidangan tradisional &amp; pencuci mulut</p>
            </div>
          </div>

          <div class="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
            <div class="bg-amber-500/10 p-3 rounded-lg text-amber-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">12:30 PM</span>
              <h3 class="font-semibold text-slate-100 text-sm">Ketibaan Pengantin &amp; Acara Bersanding</h3>
              <p class="text-xs text-slate-400 mt-1">Upacara merenjis &amp; potong kek perkahwinan</p>
            </div>
          </div>
        </div>
      </div>

      <!-- LOCATION / MAP SECTION -->
      <div class="p-6 bg-slate-900/60 border-t border-slate-800 space-y-4 text-center">
        <h2 class="font-serif text-xl text-amber-200 font-bold">Lokasi Majlis</h2>
        <p class="text-xs text-slate-300 max-w-xs mx-auto">
          {{ locationName }}
        </p>

        <!-- Direct Map Action Buttons -->
        <div class="flex items-center justify-center gap-3 pt-2">
          <a 
            href="https://waze.com" 
            target="_blank"
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md hover:scale-105"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            Navigasi Waze
          </a>
          <a 
            href="https://maps.google.com" 
            target="_blank"
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md hover:scale-105"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            Google Maps
          </a>
        </div>
      </div>

      <!-- INTERACTIVE ACTIONS (RSVP & MONEY GIFT) -->
      <div class="p-6 grid grid-cols-2 gap-4 border-t border-slate-800">
        <button 
          @click="showRsvpModal = true"
          class="flex flex-col items-center justify-center p-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-lg hover:scale-105 group"
        >
          <svg class="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span class="text-xs">Sahkan Kehadiran (RSVP)</span>
        </button>

        <button 
          @click="showGiftModal = true"
          class="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-amber-500/30 text-amber-300 font-bold transition-all shadow-lg hover:scale-105 group"
        >
          <svg class="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-xs">Salam Kaut / Gift QR</span>
        </button>
      </div>

      <!-- GUESTBOOK WISHES FEED -->
      <div class="p-6 border-t border-slate-800 space-y-4">
        <h2 class="font-serif text-xl text-amber-200 font-bold text-center">Ucapan &amp; Doa Restu</h2>
        
        <div class="space-y-3 max-h-64 overflow-y-auto pr-1">
          <div v-for="(item, idx) in wishes" :key="idx" class="bg-slate-800/50 border border-slate-700/40 rounded-xl p-3 space-y-1">
            <div class="flex justify-between items-center text-xs">
              <span class="font-semibold text-amber-300">{{ item.name }}</span>
              <span class="text-[10px] text-slate-500">{{ item.time }}</span>
            </div>
            <p class="text-xs text-slate-300 font-light italic">"{{ item.message }}"</p>
          </div>
        </div>
      </div>

      <!-- RSVP MODAL -->
      <div v-if="showRsvpModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div class="bg-slate-900 border border-amber-500/30 w-full max-w-sm rounded-2xl p-6 space-y-4 shadow-2xl relative">
          <button @click="showRsvpModal = false" class="absolute top-3 right-3 text-slate-400 hover:text-white">✕</button>
          
          <h3 class="font-serif text-xl font-bold text-amber-200 text-center">Borang Kehadiran (RSVP)</h3>
          
          <div v-if="rsvpSubmitted" class="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-center space-y-2">
            <p class="text-emerald-400 text-sm font-bold">Terima Kasih! 🎉</p>
            <p class="text-xs text-emerald-200">Kehadiran anda telah berjaya direkodkan.</p>
          </div>

          <form v-else @submit.prevent="handleRsvpSubmit" class="space-y-3">
            <div>
              <label class="block text-xs text-slate-400 mb-1">Nama Penuh</label>
              <input v-model="rsvpForm.name" required type="text" placeholder="Masukkan nama anda" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500" />
            </div>

            <div>
              <label class="block text-xs text-slate-400 mb-1">Nombor Telefon</label>
              <input v-model="rsvpForm.phone" type="tel" placeholder="012-3456789" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500" />
            </div>

            <div>
              <label class="block text-xs text-slate-400 mb-1">Pengesahan Kehadiran</label>
              <select v-model="rsvpForm.attending" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500">
                <option value="ya">Hadir</option>
                <option value="tidak">Tidak Hadir</option>
              </select>
            </div>

            <div v-if="rsvpForm.attending === 'ya'">
              <label class="block text-xs text-slate-400 mb-1">Bilangan Tetamu (Termasuk Anda)</label>
              <input v-model.number="rsvpForm.pax" type="number" min="1" max="10" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500" />
            </div>

            <div>
              <label class="block text-xs text-slate-400 mb-1">Ucapan &amp; Doa</label>
              <textarea v-model="rsvpForm.message" rows="3" placeholder="Tuliskan ucapan anda..." class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"></textarea>
            </div>

            <button @click="addWish" type="submit" class="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md">
              Hantar Pengesahan
            </button>
          </form>
        </div>
      </div>

      <!-- GIFT / SALAM KAUT MODAL -->
      <div v-if="showGiftModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div class="bg-slate-900 border border-amber-500/30 w-full max-w-sm rounded-2xl p-6 space-y-4 shadow-2xl text-center relative">
          <button @click="showGiftModal = false" class="absolute top-3 right-3 text-slate-400 hover:text-white">✕</button>

          <h3 class="font-serif text-xl font-bold text-amber-200">Salam Kaut Digital</h3>
          <p class="text-xs text-slate-400">Imbas QR Code di bawah untuk memberikan hadiah digital kepada pengantin</p>

          <div class="bg-white p-4 rounded-xl inline-block shadow-inner mx-auto my-2">
            <!-- Simulated QR Code -->
            <div class="w-44 h-44 bg-slate-900 rounded-lg flex flex-col items-center justify-center p-2 text-center text-amber-400">
              <svg class="w-24 h-24 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              <span class="text-[10px] font-mono text-slate-300">DuitNow / Touch 'n Go QR</span>
            </div>
          </div>

          <div class="text-xs text-slate-300 space-y-1 bg-slate-800/80 p-3 rounded-xl">
            <p class="font-semibold text-amber-300">Maybank: 1623 4819 0921</p>
            <p class="text-[11px] text-slate-400">a.n Mariani Binti Hassan</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* REALISTIC PAPER CARD COVER STYLING */
.real-paper-card {
  background-color: #FAF7F2;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.6),
    0 4px 16px rgba(0, 0, 0, 0.2),
    inset 0 0 30px rgba(180, 140, 75, 0.15);
}

/* GOLD FOIL EFFECT */
.gold-foil-effect {
  background: linear-gradient(
    135deg,
    #996515 0%,
    #D4AF37 25%,
    #F3E5AB 50%,
    #AA771C 75%,
    #8B6508 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* WAX SEAL BUTTON STYLING */
.wax-seal-btn {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #a81c1c, #580c0c);
  border: 3px solid #771515;
  box-shadow: 
    0 8px 20px rgba(0,0,0,0.4),
    inset -4px -4px 8px rgba(0,0,0,0.5),
    inset 4px 4px 8px rgba(255,255,255,0.3);
}

.wax-seal-btn:hover {
  transform: scale(1.08) translateY(-2px);
}

/* GATEFOLD ANIMATION FOR CARD OPENING */
.gatefold-leave-active {
  transition: all 0.8s cubic-bezier(0.7, 0, 0.3, 1);
}

.gatefold-leave-to {
  opacity: 0;
  transform: scale(1.1) rotateY(15deg);
}

.animate-spin-slow {
  animation: spin 6s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
