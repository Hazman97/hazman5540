<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Selected Theme for 3D Hero Mockup Preview
const activeTheme = ref('khat')

const themes = [
  { id: 'khat', name: 'Khat Gold Classic', font: 'Amiri', color: 'from-amber-600 to-amber-900', badge: 'Terlaris ★' },
  { id: 'floral', name: 'Modern Floral', font: 'Playfair Display', color: 'from-rose-500 to-pink-900', badge: 'Populer' },
  { id: 'emerald', name: 'Royal Emerald', font: 'Cinzel', color: 'from-emerald-600 to-teal-950', badge: 'Elegan' },
  { id: 'minimalist', name: 'Velvet Black', font: 'Outfit', color: 'from-slate-700 to-slate-950', badge: 'Baru' }
]

// Feature Badges for Hero
const features = [
  { icon: '📝', name: 'RSVP Digital' },
  { icon: '💸', name: 'Money Gift QR' },
  { icon: '🎁', name: 'Wishlist' },
  { icon: '📖', name: 'Guestbook' },
  { icon: '🎵', name: 'Lagu Latar' },
  { icon: '📍', name: 'Waze & Maps' },
  { icon: '📞', name: 'Hubungi' },
  { icon: '📅', name: 'Add to Calendar' }
]

// Card Gallery Items
const templates = [
  { id: 1, name: 'Khat Gold 001', theme: 'khat', tag: 'POPULAR ★', bg: 'bg-amber-950/90', couple: 'Mariani & Mazlan' },
  { id: 2, name: 'Floral Rose 002', theme: 'floral', tag: 'POPULAR ★', bg: 'bg-rose-950/90', couple: 'Sofia & Adam' },
  { id: 3, name: 'Royal Emerald 003', theme: 'emerald', tag: 'TERBARU', bg: 'bg-emerald-950/90', couple: 'Amira & Hariz' },
  { id: 4, name: 'Traditional Khat 004', theme: 'minimalist', tag: 'POPULAR ★', bg: 'bg-slate-900', couple: 'Siti & Zafir' }
]

// Preview Modal State
const selectedTemplateModal = ref<any>(null)

const openDemoCard = () => {
  router.push('/wedding/demo')
}
</script>

<template>
  <div class="wedding-landing min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
    
    <!-- TOP NAVIGATION BAR -->
    <header class="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        
        <!-- Brand Logo -->
        <div class="flex items-center gap-3 cursor-pointer" @click="router.push('/portfolio')">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">
            K
          </div>
          <div>
            <span class="font-serif font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              KahwinNow <span class="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono">V2 Demo</span>
            </span>
          </div>
        </div>

        <!-- Nav Links -->
        <nav class="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-slate-300 uppercase">
          <a href="#hero" class="hover:text-purple-400 transition-colors">Utama</a>
          <a href="#features" class="hover:text-purple-400 transition-colors">Ciri Kad</a>
          <a href="#templates" class="hover:text-purple-400 transition-colors">Pilihan Tema</a>
          <a href="#pricing" class="hover:text-purple-400 transition-colors">Pakej</a>
        </nav>

        <!-- CTA Button -->
        <div class="flex items-center gap-3">
          <button 
            @click="openDemoCard"
            class="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>Lihat Demo Live</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>

      </div>
    </header>

    <!-- HERO SECTION WITH DYNAMIC 3D PHONE MOCKUP -->
    <section id="hero" class="relative pt-12 pb-20 px-6 overflow-hidden">
      <!-- Background Glow Effects -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        <!-- LEFT COLUMN: VALUE PROP & FEATURE PILLS -->
        <div class="space-y-6 text-center md:text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-wide">
            <span>✨ Kad Kahwin Digital No. 1 Malaysia</span>
          </div>

          <h1 class="font-serif text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
            KAD KAHWIN <br/>
            <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              DIGITAL MEWAH
            </span>
          </h1>

          <p class="text-sm sm:text-base text-slate-300 font-light max-w-lg">
            Jemputan perkahwinan digital kini lebih anggun dengan animasi sampul kertas realistik, RSVP automatik, lokasi Waze, dan lagu latar kegemaran anda.
          </p>

          <!-- FEATURE PILLS GRID -->
          <div class="grid grid-cols-4 gap-2 pt-2 max-w-md mx-auto md:mx-0">
            <div 
              v-for="(f, i) in features" 
              :key="i"
              class="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-800/80 transition-all cursor-default group"
            >
              <span class="text-xl mb-1 group-hover:scale-125 transition-transform">{{ f.icon }}</span>
              <span class="text-[10px] font-semibold text-slate-300 text-center leading-tight">{{ f.name }}</span>
            </div>
          </div>

          <!-- HERO ACTION BUTTONS -->
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
            <button 
              @click="openDemoCard"
              class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-pink-500 text-sm font-extrabold text-white shadow-xl shadow-purple-600/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>TEMPAH KAD SEKARANG</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </button>

            <a 
              href="#templates"
              class="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-sm font-bold text-slate-200 hover:bg-slate-800 transition-all"
            >
              LIHAT PAKEJ &amp; TEMA
            </a>
          </div>
        </div>

        <!-- RIGHT COLUMN: INTERACTIVE 3D PHONE MOCKUP WITH LIVE THEME SWITCHER -->
        <div class="flex flex-col items-center justify-center space-y-6">
          
          <!-- Theme Switcher Tabs -->
          <div class="flex items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-full shadow-lg text-xs font-semibold">
            <button 
              v-for="t in themes" 
              :key="t.id"
              @click="activeTheme = t.id"
              class="px-3 py-1.5 rounded-full transition-all"
              :class="activeTheme === t.id ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-slate-400 hover:text-white'"
            >
              {{ t.name }}
            </button>
          </div>

          <!-- 3D ANGLED PHONE FRAME MOCKUP -->
          <div class="relative w-full max-w-[290px] h-[540px] perspective-1000 group">
            
            <!-- Outer Phone Bezel -->
            <div 
              class="w-full h-full bg-slate-900 border-4 border-slate-700/80 rounded-[40px] shadow-2xl p-3 relative overflow-hidden transition-all duration-700 transform group-hover:rotate-y-0 group-hover:rotate-x-0"
              style="transform: rotateY(-12deg) rotateX(6deg);"
            >
              <!-- Speaker Notch -->
              <div class="absolute top-2 inset-x-0 mx-auto w-24 h-4 bg-slate-950 rounded-b-xl z-30 flex items-center justify-center">
                <div class="w-8 h-1 bg-slate-800 rounded-full"></div>
              </div>

              <!-- Phone Screen Content -->
              <div class="w-full h-full rounded-[30px] overflow-hidden relative flex flex-col justify-between p-5 text-center bg-slate-950 border border-slate-800">
                
                <!-- Dynamic Theme Background Gradient -->
                <div 
                  class="absolute inset-0 bg-gradient-to-b transition-all duration-700 opacity-90"
                  :class="themes.find(t => t.id === activeTheme)?.color"
                ></div>

                <!-- Gold Foil Ornament inside screen -->
                <div class="relative z-10 pt-8">
                  <span class="text-[10px] uppercase font-mono tracking-widest text-amber-300">WALIMATULURUS</span>
                  <h3 class="font-serif text-2xl font-bold text-amber-200 mt-2">Mariani &amp; Mazlan</h3>
                  <p class="text-[10px] text-amber-100/80 mt-1">Sabtu | 19 September 2026</p>
                </div>

                <!-- Center Wax Seal Button simulation -->
                <div class="relative z-10 my-auto py-4">
                  <div 
                    @click="openDemoCard"
                    class="w-16 h-16 rounded-full bg-gradient-to-tr from-red-800 to-red-600 border-2 border-red-400 mx-auto flex flex-col items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform"
                  >
                    <span class="text-[10px] font-bold text-amber-200 uppercase">BUKA</span>
                    <span class="text-[8px] text-amber-100/90 font-mono">KAD</span>
                  </div>
                  <p class="text-[9px] text-slate-300 mt-3 animate-pulse">Tekan Cap Lilin Untuk Demo Live</p>
                </div>

                <!-- Footer Feature Pills inside phone screen -->
                <div class="relative z-10 flex justify-center gap-2 pt-2 border-t border-white/10 text-[10px]">
                  <span class="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-slate-200">📍 Map</span>
                  <span class="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-slate-200">📝 RSVP</span>
                  <span class="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-slate-200">🎵 Music</span>
                </div>

              </div>
            </div>

            <!-- Floating Badge Accent -->
            <div class="absolute -bottom-4 -right-4 z-20 px-4 py-2 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-xl animate-bounce">
              🔥 100% Mobile Responsive
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- DEMO REAL CARD COVER SHOWCASE BANNER -->
    <section class="py-12 bg-gradient-to-r from-purple-950/60 via-slate-900 to-pink-950/60 border-y border-purple-500/20 px-6">
      <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">Inovasi Rekabentuk Kad Sebenar</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Pengalaman Sampul Surat &amp; Kad Kertas Realistik
          </h2>
          <p class="text-xs text-slate-300 mt-2 max-w-lg">
            Tetamu anda akan melihat paparan kad kertas bertekstur berserta *Gold Foil Stamping* dan *Wax Seal* 3D sebelum membuka kad digital anda.
          </p>
        </div>

        <button 
          @click="openDemoCard"
          class="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg hover:scale-105 whitespace-nowrap"
        >
          Cuba Buka Kad Sekarang ✉️
        </button>
      </div>
    </section>

    <!-- TEMPLATES GALLERY SECTION -->
    <section id="templates" class="py-20 px-6 max-w-6xl mx-auto space-y-12">
      <div class="text-center space-y-3">
        <h2 class="font-serif text-3xl sm:text-4xl font-extrabold text-white">
          Koleksi Tema Paling Molek &amp; Moden
        </h2>
        <p class="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Pilih daripada pelbagai corak Khat Arab, Floral pastel, dan tema kontemporari mewah.
        </p>
      </div>

      <!-- TEMPLATE CARDS GRID -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="tpl in templates" 
          :key="tpl.id"
          class="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col justify-between hover:border-purple-500/40 transition-all hover:-translate-y-2 group shadow-xl"
        >
          <!-- Phone Frame Preview inside Gallery Card -->
          <div class="relative h-72 rounded-2xl overflow-hidden p-4 flex flex-col justify-between text-center" :class="tpl.bg">
            <!-- Badge -->
            <div class="self-start">
              <span class="px-2.5 py-1 rounded-full bg-red-600 text-white text-[9px] font-extrabold tracking-wider">
                {{ tpl.tag }}
              </span>
            </div>

            <!-- Card Content Mockup -->
            <div class="my-auto space-y-1">
              <span class="text-[9px] font-mono text-amber-300 uppercase">Walimatulurus</span>
              <h4 class="font-serif text-lg font-bold text-amber-100">{{ tpl.couple }}</h4>
              <p class="text-[9px] text-slate-300">Sabtu, 19 Sept 2026</p>
            </div>

            <!-- Bottom Action Simulation -->
            <div class="flex justify-center gap-1 text-[8px] text-slate-300">
              <span class="px-2 py-0.5 rounded bg-black/40">RSVP</span>
              <span class="px-2 py-0.5 rounded bg-black/40">Waze</span>
              <span class="px-2 py-0.5 rounded bg-black/40">QR Gift</span>
            </div>
          </div>

          <!-- Gallery Card Details & Action Buttons -->
          <div class="pt-4 space-y-3">
            <h3 class="font-semibold text-sm text-slate-200 text-center">{{ tpl.name }}</h3>
            
            <div class="grid grid-cols-2 gap-2">
              <button 
                @click="openDemoCard"
                class="py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all text-center"
              >
                Tempah
              </button>
              <button 
                @click="openDemoCard"
                class="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 font-bold text-xs transition-all text-center"
              >
                Preview Live
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-slate-800/80 py-8 px-6 text-center text-xs text-slate-500 space-y-2">
      <p>© 2026 KahwinNow V2 Demo System — Hazman Portfolio</p>
      <p class="text-[10px] text-slate-600">Direka bentuk khas untuk memberikan pengalaman UI/UX &amp; Animasi Kad Digital Terbaik.</p>
    </footer>

  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.rotate-y-0 {
  transform: rotateY(0deg) rotateX(0deg) !important;
}
</style>
