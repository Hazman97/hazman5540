<template>
  <div class="birthday-page">
    <!-- WELCOME SCREEN - PREMIUM DESIGN -->
    <transition name="fade">
      <div v-if="showWelcome" class="welcome-screen">
        <!-- Animated Gradient Background -->
        <div class="welcome-bg"></div>

        <!-- Floating Orbs with Glow -->
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
        <div class="floating-orb orb-4"></div>

        <!-- Animated Stars -->
        <div class="stars-container">
          <div
            v-for="i in 50"
            :key="'star-' + i"
            class="star"
            :style="getStarStyle(i)"
          ></div>
        </div>

        <!-- Floating Hearts -->
        <div class="hearts-container">
          <div
            v-for="i in 15"
            :key="'heart-' + i"
            class="floating-heart"
            :style="getHeartStyle(i)"
          >
            💕
          </div>
        </div>

        <!-- Glowing Rings -->
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="ring ring-3"></div>

        <!-- Main Welcome Card -->
        <div class="welcome-card">
          <!-- Animated Gift Box -->
          <div class="gift-container">
            <div class="gift-box">
              <div class="gift-lid">
                <div class="gift-bow"></div>
              </div>
              <div class="gift-body">
                <div class="gift-ribbon-v"></div>
                <div class="gift-ribbon-h"></div>
              </div>
            </div>
            <div class="gift-sparkles">
              <span>✨</span><span>💫</span><span>⭐</span><span>✨</span>
            </div>
            <div class="gift-glow"></div>
          </div>

          <!-- Title with Animation -->
          <h1 class="welcome-title">
            <span class="title-line">Kehadiranmu</span>
          </h1>

          <p class="welcome-subtitle">Adalah Hadiah Terindah</p>

          <!-- Decorative Divider -->
          <div class="fancy-divider">
            <span class="divider-star">✦</span>
            <span class="divider-line"></span>
            <span class="divider-gem">💎</span>
            <span class="divider-line"></span>
            <span class="divider-star">✦</span>
          </div>

          <p class="divider-text">ANUGERAH TERINDAH</p>

          <!-- Premium Button -->
          <button @click="enterCelebration" class="open-gift-btn">
            <span class="btn-bg"></span>
            <span class="btn-content">
              <span class="btn-icon">🎁</span>
              <span class="btn-text">Buka Hadiah</span>
              <span class="btn-arrow">→</span>
            </span>
            <span class="btn-shine"></span>
            <span class="btn-border"></span>
          </button>

          <!-- Hint Text -->
          <p class="card-hint">Klik untuk membuka kejutan istimewa</p>
        </div>

        <!-- Bottom Hint -->
        <div class="bottom-hint">
          <span class="hint-icon">👆</span>
          <span class="hint-text">Sentuh Untuk Mula</span>
        </div>
      </div>
    </transition>

    <!-- MAIN CONTENT -->
    <main class="main-content" :class="{ visible: !showWelcome }">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="hero-image-container">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop"
            alt="Maa"
            class="hero-image"
          />
          <div class="hero-overlay"></div>
        </div>

        <div class="hero-content">
          <div class="edition-badge">
            <span>✨ Edisi Istimewa ✨</span>
          </div>
          <h1 class="hero-title">Selamat Hari Lahir</h1>
          <p class="hero-subtitle">Untuk Ratu Hati Kami</p>
        </div>
      </section>

      <!-- QUOTE SECTION -->
      <section class="quote-section">
        <div class="quote-card">
          <div class="quote-decoration quote-left">"</div>
          <h2 class="quote-text">
            Membesarkan <strong>13 cahaya mata</strong> bukanlah tugas yang
            mudah, namun Maa melakukannya dengan penuh kasih sayang.
          </h2>
          <div class="quote-decoration quote-right">"</div>

          <div class="quote-footer">
            <span class="footer-line"></span>
            <span class="footer-text">Terima Kasih Maa</span>
            <span class="footer-line"></span>
          </div>
        </div>
      </section>

      <!-- INFINITE GALLERY -->
      <section class="gallery-section">
        <div class="gallery-header">
          <h3 class="gallery-title">13 Permata Hati</h3>
          <p class="gallery-subtitle">Kami Sayang Maa</p>
        </div>

        <div class="gallery-wrapper" ref="galleryWrapper">
          <div class="gallery-track" ref="galleryTrack">
            <div
              v-for="(sibling, idx) in displaySiblings"
              :key="idx"
              class="gallery-card"
            >
              <img :src="sibling.img" :alt="sibling.name" class="card-image" />
              <div class="card-overlay">
                <span class="card-number">Permata #{{ (idx % 13) + 1 }}</span>
                <h4 class="card-name">{{ sibling.name }}</h4>
                <div class="card-wish">
                  <p>"{{ sibling.wish }}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="birthday-footer">
        <div class="footer-hearts">💕</div>
        <p class="footer-message">Sayang Maa Selamanya</p>
        <p class="footer-credit">Dibuat dengan ❤️ oleh Anak-Anakmu</p>
      </footer>
    </main>

    <!-- FLOATING MUSIC BUTTON -->
    <button
      v-show="!showWelcome"
      @click="toggleMusic"
      class="music-btn"
      :class="{ playing: isPlaying }"
    >
      <span class="music-icon">{{ isPlaying ? "🔊" : "🔇" }}</span>
      <div class="music-waves" v-if="isPlaying">
        <span></span><span></span><span></span>
      </div>
    </button>

    <!-- HIDDEN YOUTUBE PLAYER -->
    <!-- Replace VIDEO_ID with your YouTube video ID -->
    <!-- Example: for https://www.youtube.com/watch?v=dQw4w9WgXcQ, the ID is dQw4w9WgXcQ -->
    <div class="youtube-container">
      <div id="youtube-player"></div>
    </div>
  </div>
</template>

<script>
import { supabase } from "@/supabase.js";

export default {
  name: "BirthdayMaa",
  data() {
    return {
      showWelcome: true,
      isPlaying: false,
      scrollPos: 0,
      scrollSpeed: 1,
      isDragging: false,
      animationId: null,
      player: null,
      submittedWishes: [], // Wishes from Supabase
      // ========== YOUTUBE CONFIGURATION ==========
      // Change this to your YouTube video ID
      // Example: for https://www.youtube.com/watch?v=abc123xyz, use "abc123xyz"
      youtubeVideoId: "57jZJ2QpKRg", // Replace with your song
      // Start time in seconds (adjust this to skip intros, etc.)
      startTimeSeconds: 3,
      // Volume (0-100)
      volume: 60,
      // ============================================
      // Default siblings (shown if no Supabase submissions)
      defaultSiblings: [
        {
          name: "Anak Sulung",
          wish: "Terima kasih Maa, ajar erti pengorbanan. Jasa Maa tidak terbalas dengan wang ringgit.",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
        },
        {
          name: "Anak Kedua",
          wish: "Senyuman Maa kekuatan kami. Bila Maa senyum, dunia rasa tenang.",
          img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop",
        },
        {
          name: "Anak Ketiga",
          wish: "Maa inspirasi dunia akhirat. Terima kasih didik kami jadi manusia berguna.",
          img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop",
        },
        {
          name: "Anak Ke-4",
          wish: "Semoga Maa sihat sentiasa. Panjang umur dan murah rezeki selalu.",
          img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop",
        },
        {
          name: "Anak Ke-5",
          wish: "Memori dengan Maa paling indah. Masakan Maa tiada tandingan di dunia ni.",
          img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop",
        },
        {
          name: "Anak Ke-6",
          wish: "Happy Birthday Superwoman! Maa wanita paling kuat dalam dunia.",
          img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop",
        },
        {
          name: "Anak Ke-7",
          wish: "Kasih Maa tiada tandingan. Walau apa pun terjadi, Maa tetap nombor satu.",
          img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=400&fit=crop",
        },
        {
          name: "Anak Ke-8",
          wish: "Pelukan kami untuk Maa. Rindu sangat nak peluk cium Maa hari-hari.",
          img: "https://images.unsplash.com/photo-1554151228-14d9def656ec?w=300&h=400&fit=crop",
        },
        {
          name: "Anak Ke-9",
          wish: "Terima kasih didikan Maa. Maa ajar kami erti sabar dan syukur.",
          img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=300&h=400&fit=crop",
        },
        {
          name: "Anak Ke-10",
          wish: "Rindu masakan Maa! Nasi goreng Maa paling sedap dalam dunia.",
          img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop",
        },
        {
          name: "Anak Ke-11",
          wish: "Bangga jadi anak Maa. Terima kasih sebab tak pernah putus asa dengan kami.",
          img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=400&fit=crop",
        },
        {
          name: "Anak Ke-12",
          wish: "Maa tak pernah lelah. Rehatlah Maa, sekarang giliran kami bahagiakan Maa.",
          img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop",
        },
        {
          name: "Anak Bongsu",
          wish: "Syukur ada Maa penyayang. Terima kasih manjakan adik. Sayang Maa ketat-ketat!",
          img: "https://images.unsplash.com/photo-1521119989659-a83eee488058?w=300&h=400&fit=crop",
        },
      ],
    };
  },
  computed: {
    // Use submitted wishes if available, otherwise use defaults
    siblings() {
      if (this.submittedWishes.length > 0) {
        return this.submittedWishes.map((w) => ({
          name: w.name,
          wish: w.wish,
          img:
            w.photo_url ||
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
        }));
      }
      return this.defaultSiblings;
    },
    displaySiblings() {
      // Triple the siblings for infinite scroll effect
      return [...this.siblings, ...this.siblings, ...this.siblings];
    },
  },
  async mounted() {
    // Fetch wishes from Supabase
    await this.fetchWishes();
    // Load YouTube IFrame API
    this.loadYouTubeAPI();
  },
  methods: {
    async fetchWishes() {
      try {
        const { data, error } = await supabase
          .from("birthday_wishes")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error fetching wishes:", error);
          return;
        }

        if (data && data.length > 0) {
          this.submittedWishes = data;
        }
      } catch (e) {
        console.error("Failed to fetch wishes:", e);
      }
    },
    loadYouTubeAPI() {
      // Check if API is already loaded
      if (window.YT && window.YT.Player) {
        this.initPlayer();
        return;
      }

      // Load the API script
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Set up the callback
      window.onYouTubeIframeAPIReady = () => {
        this.initPlayer();
      };
    },

    initPlayer() {
      this.player = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: this.youtubeVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          start: this.startTimeSeconds,
          loop: 1,
          playlist: this.youtubeVideoId, // Required for loop to work
        },
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
        },
      });
    },

    onPlayerReady(event) {
      event.target.setVolume(this.volume);
    },

    onPlayerStateChange(event) {
      // Update playing state based on player state
      if (event.data === window.YT.PlayerState.PLAYING) {
        this.isPlaying = true;
      } else if (
        event.data === window.YT.PlayerState.PAUSED ||
        event.data === window.YT.PlayerState.ENDED
      ) {
        this.isPlaying = false;
      }
    },

    getParticleStyle(i) {
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`,
      };
    },

    getStarStyle(i) {
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
        transform: `scale(${0.5 + Math.random() * 1})`,
      };
    },

    getHeartStyle(i) {
      return {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${8 + Math.random() * 7}s`,
        fontSize: `${0.8 + Math.random() * 1.5}rem`,
        opacity: 0.3 + Math.random() * 0.4,
      };
    },

    async enterCelebration() {
      this.showWelcome = false;

      // Try to play YouTube music
      if (this.player && this.player.playVideo) {
        try {
          this.player.seekTo(this.startTimeSeconds);
          this.player.playVideo();
          this.isPlaying = true;
        } catch (e) {
          console.log("Autoplay blocked, use floating button");
          this.isPlaying = false;
        }
      }

      // Fire confetti
      this.fireConfetti();

      // Start gallery scroll
      this.$nextTick(() => {
        this.startGalleryScroll();
      });
    },

    toggleMusic() {
      if (!this.player) return;

      try {
        if (this.isPlaying) {
          this.player.pauseVideo();
          this.isPlaying = false;
        } else {
          this.player.playVideo();
          this.isPlaying = true;
        }
      } catch (e) {
        console.log("Error toggling music:", e);
      }
    },

    fireConfetti() {
      // Check if confetti is loaded
      if (typeof confetti === "undefined") {
        // Load confetti dynamically
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
        script.onload = () => this.doConfetti();
        document.head.appendChild(script);
      } else {
        this.doConfetti();
      }
    },

    doConfetti() {
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      const fire = (particleRatio, opts) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ["#f43f5e", "#ff9fb3"],
      });
      fire(0.2, { spread: 60, colors: ["#ffc9d6", "#ffffff"] });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ["#f43f5e", "#d4af37"],
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: ["#ffd700", "#ff69b4"],
      });
    },

    startGalleryScroll() {
      const wrapper = this.$refs.galleryWrapper;
      const track = this.$refs.galleryTrack;
      if (!wrapper || !track) return;

      const animateScroll = () => {
        if (!this.isDragging) {
          this.scrollPos += this.scrollSpeed;
          if (this.scrollPos >= track.scrollWidth / 3) {
            this.scrollPos = 0;
          }
          wrapper.scrollLeft = this.scrollPos;
        }
        this.animationId = requestAnimationFrame(animateScroll);
      };

      animateScroll();

      // Mouse/Touch events
      wrapper.addEventListener("mousedown", this.handleDragStart);
      wrapper.addEventListener("mousemove", this.handleDragMove);
      wrapper.addEventListener("mouseup", this.handleDragEnd);
      wrapper.addEventListener("mouseleave", this.handleDragEnd);
      wrapper.addEventListener("touchstart", this.handleTouchStart);
      wrapper.addEventListener("touchmove", this.handleTouchMove);
      wrapper.addEventListener("touchend", this.handleDragEnd);
    },

    handleDragStart(e) {
      this.isDragging = true;
      this.startX = e.pageX - this.$refs.galleryWrapper.offsetLeft;
      this.scrollLeft = this.$refs.galleryWrapper.scrollLeft;
    },

    handleDragMove(e) {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - this.$refs.galleryWrapper.offsetLeft;
      const walk = (x - this.startX) * 2;
      this.$refs.galleryWrapper.scrollLeft = this.scrollLeft - walk;
      this.scrollPos = this.$refs.galleryWrapper.scrollLeft;
    },

    handleDragEnd() {
      this.isDragging = false;
    },

    handleTouchStart(e) {
      this.isDragging = true;
      this.startX = e.touches[0].pageX - this.$refs.galleryWrapper.offsetLeft;
      this.scrollLeft = this.$refs.galleryWrapper.scrollLeft;
    },

    handleTouchMove(e) {
      if (!this.isDragging) return;
      const x = e.touches[0].pageX - this.$refs.galleryWrapper.offsetLeft;
      const walk = (x - this.startX) * 2;
      this.$refs.galleryWrapper.scrollLeft = this.scrollLeft - walk;
      this.scrollPos = this.$refs.galleryWrapper.scrollLeft;
    },
  },

  beforeUnmount() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    // Destroy YouTube player
    if (this.player && this.player.destroy) {
      this.player.destroy();
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600&family=Dancing+Script:wght@500;600;700&display=swap");

/* ===== VARIABLES ===== */
:root {
  --rose-50: #fff0f3;
  --rose-100: #ffe3e9;
  --rose-200: #ffc9d6;
  --rose-300: #ff9fb3;
  --rose-400: #ff6b8b;
  --rose-500: #f43f5e;
  --rose-600: #e11d48;
  --rose-800: #9f1239;
  --rose-900: #881337;
  --rose-950: #4c0519;
  --gold: #d4af37;
  --gold-light: #fdf2d0;
  --gold-dark: #b08d55;
}

.birthday-page {
  font-family: "Poppins", sans-serif;
  background: var(--rose-50);
  color: #1f2937;
  overflow-x: hidden;
  min-height: 100vh;
}

/* ===== WELCOME SCREEN - PREMIUM DESIGN ===== */
.welcome-screen {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.welcome-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    #1a0a14 0%,
    #2d0a1f 20%,
    #4a0d2f 40%,
    #6b1040 60%,
    #4a0d2f 80%,
    #1a0a14 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 50% 100%;
  }
}

/* Floating Orbs */
.floating-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  animation: orbFloat 10s ease-in-out infinite;
}

.orb-1 {
  top: -20%;
  left: -15%;
  width: 60vw;
  height: 60vw;
  max-width: 500px;
  max-height: 500px;
  background: radial-gradient(
    circle,
    rgba(255, 100, 150, 0.4),
    transparent 70%
  );
}

.orb-2 {
  bottom: -20%;
  right: -15%;
  width: 70vw;
  height: 70vw;
  max-width: 600px;
  max-height: 600px;
  background: radial-gradient(circle, rgba(255, 180, 50, 0.3), transparent 70%);
  animation-delay: 3s;
}

.orb-3 {
  top: 30%;
  right: 10%;
  width: 40vw;
  height: 40vw;
  max-width: 300px;
  max-height: 300px;
  background: radial-gradient(
    circle,
    rgba(200, 100, 255, 0.25),
    transparent 70%
  );
  animation-delay: 5s;
}

.orb-4 {
  bottom: 20%;
  left: 5%;
  width: 35vw;
  height: 35vw;
  max-width: 250px;
  max-height: 250px;
  background: radial-gradient(
    circle,
    rgba(255, 150, 200, 0.3),
    transparent 70%
  );
  animation-delay: 7s;
}

@keyframes orbFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -20px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 30px) scale(0.95);
  }
  75% {
    transform: translate(20px, 20px) scale(1.02);
  }
}

/* Animated Stars */
.stars-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.star {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;
  box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.5);
}

.star:nth-child(3n) {
  background: #ffd700;
  box-shadow: 0 0 8px 3px rgba(255, 215, 0, 0.6);
}

.star:nth-child(5n) {
  background: #ff69b4;
  box-shadow: 0 0 8px 3px rgba(255, 105, 180, 0.5);
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Floating Hearts */
.hearts-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-heart {
  position: absolute;
  bottom: -50px;
  animation: floatUp linear infinite;
  filter: drop-shadow(0 0 10px rgba(255, 100, 150, 0.5));
}

@keyframes floatUp {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-120vh) rotate(360deg) scale(0.5);
    opacity: 0;
  }
}

/* Glowing Rings */
.ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(255, 180, 200, 0.2);
  animation: ringPulse 4s ease-in-out infinite;
}

.ring-1 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ring-2 {
  width: 450px;
  height: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 1s;
  border-color: rgba(255, 215, 0, 0.15);
}

.ring-3 {
  width: 600px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 2s;
  border-color: rgba(255, 150, 200, 0.1);
}

@keyframes ringPulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.2;
  }
}

/* Welcome Card - Premium Glass */
.welcome-card {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 3rem 2.5rem;
  max-width: 450px;
  width: 90%;
  margin: 0 1rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2.5rem;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), 0 0 80px rgba(255, 100, 150, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  animation: cardFloat 6s ease-in-out infinite;
}

@keyframes cardFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Gift Box - CSS Only */
.gift-container {
  position: relative;
  margin-bottom: 2rem;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gift-box {
  position: relative;
  animation: giftBounce 2s ease-in-out infinite;
}

.gift-body {
  width: 80px;
  height: 60px;
  background: linear-gradient(135deg, #e11d48, #f43f5e);
  border-radius: 8px;
  position: relative;
  box-shadow: 0 10px 30px rgba(225, 29, 72, 0.4);
}

.gift-lid {
  width: 90px;
  height: 25px;
  background: linear-gradient(135deg, #be0f3e, #e11d48);
  border-radius: 6px;
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  animation: lidWobble 2s ease-in-out infinite;
}

.gift-bow {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #d4af37, #ffd700);
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.5);
}

.gift-bow::before,
.gift-bow::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 12px;
  background: linear-gradient(135deg, #d4af37, #ffd700);
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.gift-bow::before {
  left: -15px;
}
.gift-bow::after {
  right: -15px;
}

.gift-ribbon-v {
  position: absolute;
  width: 15px;
  height: 100%;
  background: linear-gradient(90deg, #d4af37, #ffd700, #d4af37);
  left: 50%;
  transform: translateX(-50%);
}

.gift-ribbon-h {
  position: absolute;
  width: 100%;
  height: 15px;
  background: linear-gradient(180deg, #d4af37, #ffd700, #d4af37);
  top: 50%;
  transform: translateY(-50%);
}

.gift-sparkles {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  font-size: 1.2rem;
}

.gift-sparkles span {
  animation: sparkleFloat 2s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
}

.gift-sparkles span:nth-child(1) {
  animation-delay: 0s;
}
.gift-sparkles span:nth-child(2) {
  animation-delay: 0.5s;
}
.gift-sparkles span:nth-child(3) {
  animation-delay: 1s;
}
.gift-sparkles span:nth-child(4) {
  animation-delay: 1.5s;
}

@keyframes sparkleFloat {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-20px) scale(1.3);
    opacity: 1;
  }
}

@keyframes giftBounce {
  0%,
  100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-15px) rotate(2deg);
  }
}

@keyframes lidWobble {
  0%,
  100% {
    transform: translateX(-50%) rotate(-1deg);
  }
  50% {
    transform: translateX(-50%) rotate(1deg) translateY(-3px);
  }
}

.gift-glow {
  position: absolute;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.4), transparent 70%);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: glowPulse 2s ease-in-out infinite;
  z-index: -1;
}

@keyframes glowPulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 0.9;
  }
}

/* Title */
.welcome-title {
  font-family: "Playfair Display", serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 20px rgba(255, 100, 150, 0.5);
}

.title-line {
  display: block;
  animation: titleGlow 3s ease-in-out infinite;
}

@keyframes titleGlow {
  0%,
  100% {
    text-shadow: 0 4px 20px rgba(255, 100, 150, 0.5);
  }
  50% {
    text-shadow: 0 4px 40px rgba(255, 100, 150, 0.8),
      0 0 60px rgba(255, 215, 0, 0.3);
  }
}

.welcome-subtitle {
  font-family: "Dancing Script", cursive;
  font-size: 1.5rem;
  color: rgba(255, 200, 220, 0.9);
  margin-bottom: 1.5rem;
}

/* Fancy Divider */
.fancy-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.divider-star {
  color: #ffd700;
  font-size: 0.8rem;
  animation: starSpin 4s linear infinite;
}

.divider-line {
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #d4af37, transparent);
}

.divider-gem {
  font-size: 1.2rem;
  animation: gemPulse 2s ease-in-out infinite;
}

@keyframes starSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes gemPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.divider-text {
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  color: rgba(255, 200, 220, 0.7);
  font-weight: 600;
  margin-bottom: 2rem;
}

/* Premium Button */
.open-gift-btn {
  position: relative;
  width: 100%;
  padding: 1.2rem 2rem;
  background: transparent;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.open-gift-btn:hover {
  transform: scale(1.02) translateY(-2px);
}

.open-gift-btn:active {
  transform: scale(0.98);
}

.btn-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #d4af37, #ffd700, #d4af37);
  background-size: 200% 200%;
  animation: btnGradient 3s ease infinite;
  border-radius: 100px;
}

@keyframes btnGradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.btn-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: #1a0a14;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.btn-icon {
  font-size: 1.3rem;
}

.btn-text {
  text-transform: uppercase;
}

.btn-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.open-gift-btn:hover .btn-arrow {
  transform: translateX(5px);
}

.btn-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  animation: btnShine 3s ease-in-out infinite;
}

@keyframes btnShine {
  0% {
    transform: translateX(-100%);
  }
  50%,
  100% {
    transform: translateX(100%);
  }
}

.btn-border {
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #fff, #ffd700, #fff);
  border-radius: 100px;
  z-index: -1;
  opacity: 0.5;
  animation: borderGlow 2s ease-in-out infinite;
}

@keyframes borderGlow {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

.card-hint {
  margin-top: 1.5rem;
  font-size: 0.75rem;
  color: rgba(255, 200, 220, 0.5);
  font-style: italic;
}

/* Bottom Hint */
.bottom-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.4);
  animation: hintBounce 2s ease-in-out infinite;
}

.hint-icon {
  font-size: 1rem;
}

.hint-text {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

@keyframes hintBounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* ===== MAIN CONTENT ===== */
.main-content {
  opacity: 0;
  pointer-events: none;
  transition: opacity 1s ease;
}

.main-content.visible {
  opacity: 1;
  pointer-events: auto;
}

/* ===== HERO SECTION ===== */
.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.hero-image-container {
  position: absolute;
  inset: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 5s ease;
}

.hero-section:hover .hero-image {
  transform: scale(1.05);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    var(--rose-900) 0%,
    rgba(136, 19, 55, 0.7) 30%,
    rgba(136, 19, 55, 0.3) 60%,
    transparent 100%
  );
}

.hero-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  padding-bottom: 4rem;
  text-align: center;
}

@media (min-width: 768px) {
  .hero-content {
    text-align: left;
    padding: 4rem;
  }
}

.edition-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 100px;
  margin-bottom: 1.5rem;
}

.edition-badge span {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: white;
  font-weight: 600;
}

.hero-title {
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  line-height: 1.1;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 4.5rem;
  }
}

.hero-subtitle {
  font-family: "Dancing Script", cursive;
  font-size: 2rem;
  color: var(--rose-200);
}

@media (min-width: 768px) {
  .hero-subtitle {
    font-size: 3rem;
  }
}

/* ===== QUOTE SECTION ===== */
.quote-section {
  padding: 6rem 1.5rem;
  background: white;
  position: relative;
}

.quote-card {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(255, 240, 243, 0.5),
    rgba(255, 255, 255, 0.8)
  );
  border-radius: 2rem;
  box-shadow: 0 20px 60px rgba(244, 63, 94, 0.1);
}

.quote-decoration {
  font-family: "Playfair Display", serif;
  font-size: 6rem;
  color: var(--rose-200);
  line-height: 1;
  position: absolute;
  opacity: 0.5;
}

.quote-left {
  top: -1rem;
  left: 1rem;
}

.quote-right {
  bottom: -3rem;
  right: 1rem;
}

.quote-text {
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .quote-text {
    font-size: 1.75rem;
  }
}

.quote-text strong {
  font-family: "Playfair Display", serif;
  font-weight: 600;
  color: var(--rose-500);
}

.quote-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.footer-line {
  width: 50px;
  height: 1px;
  background: var(--rose-300);
}

.footer-text {
  font-family: "Dancing Script", cursive;
  font-size: 1.5rem;
  color: var(--rose-400);
}

/* ===== GALLERY SECTION ===== */
.gallery-section {
  padding: 4rem 0;
  background: var(--rose-50);
  overflow: hidden;
}

.gallery-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
}

.gallery-title {
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.gallery-subtitle {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--rose-400);
  font-weight: 600;
}

.gallery-wrapper {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  cursor: grab;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  );
}

.gallery-wrapper:active {
  cursor: grabbing;
}

.gallery-track {
  display: inline-flex;
  gap: 2rem;
  padding: 1rem 2rem;
}

.gallery-card {
  position: relative;
  width: 320px;
  height: 500px;
  flex-shrink: 0;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.gallery-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

.card-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.gallery-card:hover .card-image {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    var(--rose-950) 0%,
    rgba(76, 5, 25, 0.9) 30%,
    rgba(76, 5, 25, 0.4) 60%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
}

.card-number {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 201, 214, 0.9);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.card-name {
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.card-wish {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 120px;
  overflow-y: auto;
}

.card-wish p {
  font-size: 0.875rem;
  color: white;
  font-style: italic;
  line-height: 1.6;
  white-space: normal;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* ===== FOOTER ===== */
.birthday-footer {
  background: white;
  padding: 4rem 1.5rem;
  text-align: center;
  border-top: 1px solid var(--rose-100);
}

.footer-hearts {
  font-size: 2rem;
  margin-bottom: 1rem;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.footer-message {
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--rose-900);
  margin-bottom: 1rem;
}

.footer-credit {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #9ca3af;
}

/* ===== MUSIC BUTTON ===== */
.music-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 50;
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.music-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.music-btn:active {
  transform: scale(0.95);
}

.music-btn.playing {
  background: linear-gradient(135deg, var(--rose-500), var(--rose-600));
  border-color: var(--rose-400);
}

.music-icon {
  font-size: 1.5rem;
}

.music-waves {
  position: absolute;
  bottom: -8px;
  display: flex;
  gap: 3px;
}

.music-waves span {
  width: 3px;
  height: 8px;
  background: white;
  border-radius: 3px;
  animation: wave 0.5s ease-in-out infinite;
}

.music-waves span:nth-child(2) {
  animation-delay: 0.1s;
  height: 12px;
}

.music-waves span:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes wave {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
}

/* ===== TRANSITIONS ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ===== SCROLLBAR HIDE ===== */
.gallery-wrapper::-webkit-scrollbar {
  display: none;
}

.gallery-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ===== YOUTUBE CONTAINER ===== */
.youtube-container {
  position: fixed;
  top: -9999px;
  left: -9999px;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  z-index: -1;
}

/* ===== BUTTON FIX ===== */
.open-gift-btn {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
