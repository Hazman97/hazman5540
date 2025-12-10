<template>
  <div class="birthday-page" :class="templateClass">
    <!-- Loading State -->
    <div v-if="loading" class="loading-screen">
      <div class="loader"></div>
      <p>Loading birthday page...</p>
    </div>

    <!-- Not Found -->
    <div v-else-if="notFound" class="not-found-screen">
      <div class="not-found-content">
        <div class="not-found-icon">🎂</div>
        <h1>Page Not Found</h1>
        <p>This birthday page doesn't exist or has been deleted.</p>
        <router-link to="/birthday/create" class="create-link">
          Create your own birthday page →
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <template v-else>
      <!-- WELCOME SCREEN -->
      <transition name="fade">
        <div v-if="showWelcome" class="welcome-screen">
          <div class="welcome-bg"></div>

          <!-- Floating Orbs -->
          <div class="floating-orb orb-1"></div>
          <div class="floating-orb orb-2"></div>
          <div class="floating-orb orb-3"></div>

          <!-- Stars -->
          <div class="stars-container">
            <div
              v-for="i in 40"
              :key="'star-' + i"
              class="star"
              :style="getStarStyle(i)"
            ></div>
          </div>

          <!-- Floating Hearts -->
          <div class="hearts-container">
            <div
              v-for="i in 12"
              :key="'heart-' + i"
              class="floating-heart"
              :style="getHeartStyle(i)"
            >
              {{ template === "party" ? "🎈" : "💕" }}
            </div>
          </div>

          <!-- Welcome Card -->
          <div class="welcome-card">
            <div class="gift-container">
              <div class="gift-icon">🎁</div>
              <div class="gift-glow"></div>
            </div>

            <h1 class="welcome-title">{{ page.title }}</h1>
            <p v-if="page.subtitle" class="welcome-subtitle">
              {{ page.subtitle }}
            </p>

            <div class="fancy-divider">
              <span class="divider-star">✦</span>
              <span class="divider-line"></span>
              <span class="divider-gem">💎</span>
              <span class="divider-line"></span>
              <span class="divider-star">✦</span>
            </div>

            <button @click="enterCelebration" class="open-gift-btn">
              <span class="btn-icon">🎉</span>
              <span class="btn-text">Open Celebration</span>
              <span class="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </transition>

      <!-- MAIN CONTENT -->
      <main class="main-content" :class="{ visible: !showWelcome }">
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-image-container">
            <img
              :src="page.hero_image_url || defaultHeroImage"
              :alt="page.person_name"
              class="hero-image"
            />
            <div class="hero-overlay"></div>
          </div>

          <div class="hero-content">
            <div class="edition-badge">
              <span>✨ {{ templateLabel }} ✨</span>
            </div>
            <h1 class="hero-title">{{ page.title }}</h1>
            <p class="hero-subtitle">For {{ page.person_name }}</p>
          </div>
        </section>

        <!-- Quote Section -->
        <section v-if="page.subtitle" class="quote-section">
          <div class="quote-card">
            <div class="quote-decoration quote-left">"</div>
            <h2 class="quote-text">{{ page.subtitle }}</h2>
            <div class="quote-decoration quote-right">"</div>
          </div>
        </section>

        <!-- Memories Video Section -->
        <section v-if="page.memories_video_id" class="memories-section">
          <div class="memories-header">
            <h3 class="memories-title">🎬 Memories</h3>
            <p class="memories-subtitle">A video of special moments</p>
          </div>
          <div class="video-container">
            <iframe
              :src="memoriesVideoUrl"
              title="Memories Video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </section>

        <!-- Wishes Section -->
        <section class="wishes-section">
          <div class="wishes-header">
            <h3 class="wishes-title">💌 Birthday Wishes</h3>
            <p class="wishes-subtitle">Messages from friends and family</p>
          </div>

          <div v-if="wishes.length === 0" class="no-wishes">
            <div class="no-wishes-icon">📝</div>
            <p>No wishes yet. Be the first to leave one!</p>
          </div>

          <div v-else class="wishes-grid">
            <div v-for="wish in wishes" :key="wish.id" class="wish-card">
              <div v-if="wish.photo_url" class="wish-image">
                <img :src="wish.photo_url" :alt="wish.name" />
              </div>
              <div class="wish-content">
                <h4 class="wish-name">{{ wish.name }}</h4>
                <p class="wish-text">"{{ wish.wish }}"</p>
                <span class="wish-date">{{ formatDate(wish.created_at) }}</span>
              </div>
            </div>
          </div>

          <!-- Leave a Wish Button -->
          <router-link :to="`/b/${slug}/wish`" class="leave-wish-btn">
            <span class="btn-icon">💝</span>
            <span>Leave a Birthday Wish</span>
            <span class="btn-arrow">→</span>
          </router-link>
        </section>

        <!-- Footer -->
        <footer class="birthday-footer">
          <div class="footer-hearts">
            {{ template === "party" ? "🎊" : "💕" }}
          </div>
          <p class="footer-message">Happy Birthday, {{ page.person_name }}!</p>
          <p class="footer-credit">
            <router-link to="/birthday/create" class="footer-link">
              Create your own birthday page
            </router-link>
          </p>
        </footer>
      </main>

      <!-- Music Button -->
      <button
        v-show="!showWelcome && page.youtube_video_id"
        @click="toggleMusic"
        class="music-btn"
        :class="{ playing: isPlaying }"
      >
        <span class="music-icon">{{ isPlaying ? "🔊" : "🔇" }}</span>
        <div class="music-waves" v-if="isPlaying">
          <span></span><span></span><span></span>
        </div>
      </button>

      <!-- Hidden YouTube Player -->
      <div class="youtube-container">
        <div id="youtube-player"></div>
      </div>
    </template>
  </div>
</template>

<script>
import { supabase } from "@/supabase.js";

export default {
  name: "BirthdayView",
  data() {
    return {
      loading: true,
      notFound: false,
      showWelcome: true,
      isPlaying: false,
      player: null,
      page: null,
      wishes: [],
      slug: "",
    };
  },
  computed: {
    template() {
      return this.page?.template || "rose";
    },
    templateClass() {
      return `template-${this.template}`;
    },
    templateLabel() {
      const labels = {
        rose: "Elegant Edition",
        party: "Party Edition",
        minimal: "Classic Edition",
        ocean: "Ocean Edition",
        sunset: "Sunset Edition",
        galaxy: "Galaxy Edition",
      };
      return labels[this.template] || "Special Edition";
    },
    defaultHeroImage() {
      return "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=800&fit=crop";
    },
    memoriesVideoUrl() {
      if (!this.page?.memories_video_id) return null;
      // If use_video_sound is true, play video with sound (mute=0)
      // If false, mute video and play background music instead
      const mute = this.page.use_video_sound ? 0 : 1;
      return `https://www.youtube.com/embed/${this.page.memories_video_id}?autoplay=1&mute=${mute}&loop=1&playlist=${this.page.memories_video_id}&rel=0&modestbranding=1`;
    },
  },
  async mounted() {
    this.slug = this.$route.params.slug;
    await this.loadPage();
  },
  methods: {
    async loadPage() {
      try {
        // Fetch the birthday page
        const { data: pageData, error: pageError } = await supabase
          .from("birthday_pages")
          .select("*")
          .eq("slug", this.slug)
          .single();

        if (pageError || !pageData) {
          this.notFound = true;
          this.loading = false;
          return;
        }

        this.page = pageData;

        // Fetch approved wishes
        const { data: wishesData } = await supabase
          .from("birthday_wishes")
          .select("*")
          .eq("page_id", pageData.id)
          .or("status.eq.approved,status.is.null")
          .order("created_at", { ascending: false });

        this.wishes = wishesData || [];

        // Load YouTube player if music is configured
        if (this.page.youtube_video_id) {
          this.loadYouTubeAPI();
        }

        this.loading = false;
      } catch (error) {
        console.error("Error loading page:", error);
        this.notFound = true;
        this.loading = false;
      }
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

    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },

    async enterCelebration() {
      this.showWelcome = false;

      // Try to play music
      if (this.player && this.player.playVideo) {
        try {
          this.player.seekTo(this.page.youtube_start_time || 0);
          this.player.playVideo();
          this.isPlaying = true;
        } catch (e) {
          console.log("Autoplay blocked");
        }
      }

      // Fire confetti
      this.fireConfetti();
    },

    loadYouTubeAPI() {
      if (window.YT && window.YT.Player) {
        this.initPlayer();
        return;
      }

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        this.initPlayer();
      };
    },

    initPlayer() {
      this.player = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: this.page.youtube_video_id,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          start: this.page.youtube_start_time || 0,
          loop: 1,
          playlist: this.page.youtube_video_id,
        },
        events: {
          onReady: (e) => e.target.setVolume(60),
          onStateChange: this.onPlayerStateChange,
        },
      });
    },

    onPlayerStateChange(event) {
      if (event.data === window.YT.PlayerState.PLAYING) {
        this.isPlaying = true;
      } else if (
        event.data === window.YT.PlayerState.PAUSED ||
        event.data === window.YT.PlayerState.ENDED
      ) {
        this.isPlaying = false;
      }
    },

    toggleMusic() {
      if (!this.player) return;
      try {
        if (this.isPlaying) {
          this.player.pauseVideo();
        } else {
          this.player.playVideo();
        }
      } catch (e) {
        console.log("Error toggling music:", e);
      }
    },

    fireConfetti() {
      if (typeof confetti === "undefined") {
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
      const colors = {
        rose: ["#f43f5e", "#ff9fb3", "#ffc9d6", "#d4af37"],
        party: ["#8b5cf6", "#ec4899", "#06b6d4", "#fbbf24"],
        minimal: ["#6b7280", "#9ca3af", "#d1d5db", "#f3f4f6"],
        ocean: ["#0ea5e9", "#06b6d4", "#22d3ee", "#a5f3fc"],
        sunset: ["#f97316", "#fb923c", "#fbbf24", "#c73659"],
        galaxy: ["#8b5cf6", "#a855f7", "#c084fc", "#e879f9"],
      };

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.7 },
        colors: colors[this.template] || colors.rose,
      });
    },
  },

  beforeUnmount() {
    if (this.player && this.player.destroy) {
      this.player.destroy();
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap");

/* ===== BASE STYLES ===== */
.birthday-page {
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ===== TEMPLATE COLORS ===== */
.template-rose {
  --primary: #f43f5e;
  --primary-dark: #e11d48;
  --bg-gradient-1: #1a0a14;
  --bg-gradient-2: #4a0d2f;
  --bg-gradient-3: #6b1040;
  --accent: #d4af37;
  --text: #fff0f3;
}

.template-party {
  --primary: #8b5cf6;
  --primary-dark: #7c3aed;
  --bg-gradient-1: #0f0c29;
  --bg-gradient-2: #302b63;
  --bg-gradient-3: #24243e;
  --accent: #fbbf24;
  --text: #f3e8ff;
}

.template-minimal {
  --primary: #6b7280;
  --primary-dark: #4b5563;
  --bg-gradient-1: #1f2937;
  --bg-gradient-2: #374151;
  --bg-gradient-3: #4b5563;
  --accent: #f9fafb;
  --text: #f9fafb;
}

.template-ocean {
  --primary: #0ea5e9;
  --primary-dark: #0284c7;
  --bg-gradient-1: #0c2461;
  --bg-gradient-2: #1e3a5f;
  --bg-gradient-3: #3d5a80;
  --accent: #22d3ee;
  --text: #e0f2fe;
}

.template-sunset {
  --primary: #f97316;
  --primary-dark: #ea580c;
  --bg-gradient-1: #450a0a;
  --bg-gradient-2: #7c2d12;
  --bg-gradient-3: #c73659;
  --accent: #fbbf24;
  --text: #fff7ed;
}

.template-galaxy {
  --primary: #a855f7;
  --primary-dark: #9333ea;
  --bg-gradient-1: #0f0f23;
  --bg-gradient-2: #2d1b69;
  --bg-gradient-3: #5b21b6;
  --accent: #e879f9;
  --text: #faf5ff;
}

/* ===== LOADING ===== */
.loading-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--bg-gradient-1),
    var(--bg-gradient-2)
  );
  color: white;
}

.loader {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ===== NOT FOUND ===== */
.not-found-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  padding: 2rem;
}

.not-found-content {
  text-align: center;
  color: white;
}

.not-found-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.not-found-content h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.not-found-content p {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
}

.create-link {
  color: #8b5cf6;
  text-decoration: none;
  font-weight: 500;
}

.create-link:hover {
  text-decoration: underline;
}

/* ===== WELCOME SCREEN ===== */
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
    var(--bg-gradient-1),
    var(--bg-gradient-2),
    var(--bg-gradient-3)
  );
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

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

@keyframes orbFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(20px, -20px) scale(1.05);
  }
}

/* Stars */
.stars-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.star {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

/* Hearts */
.hearts-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-heart {
  position: absolute;
  bottom: -50px;
  animation: floatUp 15s linear infinite;
}

@keyframes floatUp {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
}

/* Welcome Card */
.welcome-card {
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  padding: 3rem 2.5rem;
  text-align: center;
  max-width: 450px;
  margin: 0 1rem;
}

.gift-container {
  margin-bottom: 1.5rem;
}

.gift-icon {
  font-size: 4rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.welcome-title {
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  color: white;
  margin-bottom: 0.5rem;
}

.welcome-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.fancy-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
}

.divider-line {
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}

.divider-star,
.divider-gem {
  color: var(--accent);
  font-size: 0.8rem;
}

.open-gift-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border: none;
  border-radius: 100px;
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.open-gift-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.btn-icon {
  font-size: 1.2rem;
}

/* ===== MAIN CONTENT ===== */
.main-content {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s;
  background: linear-gradient(
    180deg,
    var(--bg-gradient-1),
    var(--bg-gradient-2)
  );
}

.main-content.visible {
  opacity: 1;
  pointer-events: auto;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-gradient-1);
  overflow: hidden;
}

.hero-image-container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--bg-gradient-1),
    var(--bg-gradient-2)
  );
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  max-height: 100%;
}

/* For landscape images, allow cover mode */
@media (min-aspect-ratio: 16/9) {
  .hero-image {
    object-fit: cover;
  }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4),
    var(--bg-gradient-1)
  );
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2rem;
}

.edition-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1.5rem;
  border-radius: 100px;
  margin-bottom: 1rem;
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 500;
}

.hero-title {
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  color: white;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
}

/* Quote Section */
.quote-section {
  padding: 4rem 1.5rem;
  text-align: center;
}

.quote-card {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
}

.quote-decoration {
  font-family: "Playfair Display", serif;
  font-size: 4rem;
  color: var(--accent);
  opacity: 0.5;
  position: absolute;
  top: -20px;
}

.quote-left {
  left: -10px;
}
.quote-right {
  right: -10px;
}

.quote-text {
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  color: white;
  font-style: italic;
  line-height: 1.8;
  padding: 0 2rem;
}

/* Wishes Section */
.wishes-section {
  padding: 4rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.wishes-header {
  text-align: center;
  margin-bottom: 2rem;
}

.wishes-title {
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  color: white;
  margin-bottom: 0.5rem;
}

.wishes-subtitle {
  color: rgba(255, 255, 255, 0.6);
}

.no-wishes {
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  margin-bottom: 2rem;
}

.no-wishes-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-wishes p {
  color: rgba(255, 255, 255, 0.6);
}

.wishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.wish-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s;
}

.wish-card:hover {
  transform: translateY(-5px);
}

.wish-image img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.wish-content {
  padding: 1.5rem;
}

.wish-name {
  color: var(--accent);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.wish-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 0.8rem;
}

.wish-date {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
}

/* Leave Wish Button */
.leave-wish-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  max-width: 400px;
  margin: 2rem auto 0;
  padding: 1.2rem 2rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border: none;
  border-radius: 100px;
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
}

.leave-wish-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Footer */
.birthday-footer {
  text-align: center;
  padding: 4rem 1.5rem;
  background: var(--bg-gradient-1);
}

.footer-hearts {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.footer-message {
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 0.5rem;
}

.footer-credit {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
}

.footer-link {
  color: var(--accent);
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}

/* Music Button */
.music-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 50;
  transition: all 0.3s;
}

.music-btn:hover {
  transform: scale(1.1);
  background: rgba(0, 0, 0, 0.7);
}

.music-btn.playing {
  border-color: var(--primary);
}

.music-icon {
  font-size: 1.5rem;
}

.music-waves {
  display: flex;
  gap: 3px;
  margin-top: 5px;
}

.music-waves span {
  width: 3px;
  height: 10px;
  background: var(--primary);
  border-radius: 3px;
  animation: wave 0.5s ease-in-out infinite;
}

.music-waves span:nth-child(2) {
  animation-delay: 0.1s;
}
.music-waves span:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes wave {
  0%,
  100% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(1);
  }
}

/* YouTube Container */
.youtube-container {
  position: fixed;
  top: -1000px;
  left: -1000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 600px) {
  .hero-title {
    font-size: 2rem;
  }

  .welcome-title {
    font-size: 1.5rem;
  }

  .quote-text {
    font-size: 1.2rem;
  }

  .music-btn {
    width: 50px;
    height: 50px;
    bottom: 1rem;
    right: 1rem;
  }
}

/* Memories Video Section */
.memories-section {
  padding: 3rem 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.memories-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.memories-title {
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  color: white;
  margin-bottom: 0.3rem;
}

.memories-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  background: rgba(0, 0, 0, 0.3);
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
