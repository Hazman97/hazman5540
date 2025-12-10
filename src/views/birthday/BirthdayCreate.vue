<template>
  <div class="create-page">
    <!-- Background Effects -->
    <div class="bg-gradient"></div>
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>

    <!-- Stars -->
    <div class="stars-container">
      <div v-for="i in 30" :key="i" class="star" :style="getStarStyle(i)"></div>
    </div>

    <!-- Success Screen -->
    <transition name="fade">
      <div v-if="created" class="success-screen">
        <div class="success-card">
          <div class="success-icon">🎉</div>
          <h2 class="success-title">Birthday Page Created!</h2>
          <p class="success-message">
            Your birthday page for <strong>{{ personName }}</strong> is ready!
          </p>

          <!-- Share Link -->
          <div class="link-box">
            <label>📤 Shareable Link (for friends):</label>
            <div class="link-row">
              <input type="text" :value="shareLink" readonly ref="shareInput" />
              <button @click="copyShareLink" class="copy-btn">
                {{ copied === "share" ? "✓" : "📋" }}
              </button>
            </div>
          </div>

          <!-- Management Link -->
          <div class="link-box management">
            <label>🔐 Management Link (save this!):</label>
            <div class="link-row">
              <input
                type="text"
                :value="manageLink"
                readonly
                ref="manageInput"
              />
              <button @click="copyManageLink" class="copy-btn">
                {{ copied === "manage" ? "✓" : "📋" }}
              </button>
            </div>
            <p class="warning-text">
              ⚠️ Save this link! You need it to manage wishes.
            </p>
          </div>

          <div class="success-buttons">
            <button @click="viewPage" class="primary-btn">
              <span>View Birthday Page</span>
              <span>→</span>
            </button>
            <button @click="createAnother" class="secondary-btn">
              Create Another
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Creation Form -->
    <div v-if="!created" class="form-container">
      <div class="form-card">
        <!-- Progress Steps -->
        <div class="progress-bar">
          <div
            v-for="s in 3"
            :key="s"
            class="progress-step"
            :class="{ active: step >= s, current: step === s }"
          >
            <span class="step-number">{{ s }}</span>
          </div>
        </div>

        <!-- Header -->
        <div class="form-header">
          <div class="header-icon">{{ stepIcons[step - 1] }}</div>
          <h1 class="form-title">{{ stepTitles[step - 1] }}</h1>
          <p class="form-subtitle">{{ stepDescriptions[step - 1] }}</p>
        </div>

        <!-- Step 1: Basic Info -->
        <div v-if="step === 1" class="step-content">
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">👤</span>
              Birthday Person's Name
            </label>
            <input
              v-model="personName"
              type="text"
              class="form-input"
              placeholder="e.g., Ahmad, Mama, Sarah"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">🎂</span>
              Page Title
            </label>
            <input
              v-model="title"
              type="text"
              class="form-input"
              placeholder="e.g., Happy Birthday Mama!"
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">💬</span>
              Subtitle (optional)
            </label>
            <input
              v-model="subtitle"
              type="text"
              class="form-input"
              placeholder="e.g., Celebrating 50 wonderful years"
            />
          </div>
        </div>

        <!-- Step 2: Choose Template -->
        <div v-if="step === 2" class="step-content">
          <div class="templates-grid">
            <div
              v-for="t in templates"
              :key="t.id"
              class="template-card"
              :class="{ selected: template === t.id }"
              @click="template = t.id"
            >
              <div class="template-preview" :style="{ background: t.gradient }">
                <span class="template-icon">{{ t.icon }}</span>
              </div>
              <h4 class="template-name">{{ t.name }}</h4>
              <p class="template-desc">{{ t.description }}</p>
              <div v-if="template === t.id" class="selected-badge">✓</div>
            </div>
          </div>
        </div>

        <!-- Step 3: Customize -->
        <div v-if="step === 3" class="step-content">
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">🎵</span>
              Background Music (YouTube ID)
            </label>
            <input
              v-model="youtubeVideoId"
              type="text"
              class="form-input"
              placeholder="e.g., dQw4w9WgXcQ (optional)"
            />
            <p class="input-hint">Paste the video ID from YouTube URL</p>
          </div>

          <div class="form-group" v-if="youtubeVideoId">
            <label class="form-label">
              <span class="label-icon">⏱️</span>
              Start Time (seconds)
            </label>
            <div class="time-input-row">
              <input
                v-model.number="youtubeStartTime"
                type="number"
                min="0"
                class="form-input time-input"
                placeholder="0"
              />
              <span class="time-preview">{{
                formatTime(youtubeStartTime)
              }}</span>
            </div>
            <p class="input-hint">Skip intro - music starts at this time</p>
          </div>

          <!-- Memories Video Section -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">🎬</span>
              Memories Video (YouTube ID)
            </label>
            <input
              v-model="memoriesVideoId"
              type="text"
              class="form-input"
              placeholder="e.g., dQw4w9WgXcQ"
            />
            <div class="video-instructions">
              <p class="instruction-title">📹 How to add video:</p>
              <ol class="instruction-steps">
                <li>Upload your video to <strong>YouTube</strong></li>
                <li>
                  Copy the video ID from the URL<br />
                  <span class="url-example"
                    >youtube.com/watch?v=<strong>dQw4w9WgXcQ</strong></span
                  >
                </li>
                <li>Paste the ID above</li>
              </ol>
            </div>
          </div>

          <div v-if="memoriesVideoId" class="audio-choice-box">
            <p class="audio-choice-title">🔊 Which audio to use?</p>
            <div class="audio-options">
              <label class="audio-option" :class="{ selected: useVideoSound }">
                <input type="radio" v-model="useVideoSound" :value="true" />
                <span class="audio-icon">🎬</span>
                <span class="audio-text">Video's sound</span>
              </label>
              <label class="audio-option" :class="{ selected: !useVideoSound }">
                <input type="radio" v-model="useVideoSound" :value="false" />
                <span class="audio-icon">🎵</span>
                <span class="audio-text">Background music</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📷</span>
              Hero Image (optional)
            </label>
            <div
              class="upload-area"
              @click="triggerUpload"
              :class="{ 'has-preview': heroPreview }"
            >
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="handleFileSelect"
                class="file-input"
              />
              <div v-if="!heroPreview" class="upload-placeholder">
                <span class="upload-icon">📸</span>
                <span class="upload-text">Click to upload hero image</span>
              </div>
              <div v-else class="preview-container">
                <img :src="heroPreview" alt="Preview" class="preview-image" />
                <button
                  type="button"
                  @click.stop="removePhoto"
                  class="remove-btn"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="wishesRequireApproval" />
              <span class="checkbox-custom"></span>
              <span>Require approval for wishes</span>
            </label>
            <p class="input-hint">
              If enabled, you must approve wishes before they appear
            </p>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="nav-buttons">
          <button
            v-if="step > 1"
            @click="step--"
            class="back-btn"
            type="button"
          >
            ← Back
          </button>
          <button
            v-if="step < 3"
            @click="nextStep"
            class="next-btn"
            :disabled="!canProceed"
          >
            Next →
          </button>
          <button
            v-if="step === 3"
            @click="createPage"
            class="create-btn"
            :disabled="isSubmitting"
          >
            <span v-if="!isSubmitting">🎉 Create Birthday Page</span>
            <span v-else class="loading">Creating...</span>
          </button>
        </div>

        <!-- Error Message -->
        <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
      </div>

      <!-- Back to home -->
      <router-link to="/" class="back-link">← Back to Home</router-link>
    </div>
  </div>
</template>

<script>
import { supabase } from "@/supabase.js";

export default {
  name: "BirthdayCreate",
  data() {
    return {
      step: 1,
      personName: "",
      title: "",
      subtitle: "",
      template: "rose",
      youtubeVideoId: "",
      youtubeStartTime: 0,
      memoriesVideoId: "",
      useVideoSound: false,
      heroFile: null,
      heroPreview: null,
      wishesRequireApproval: false,
      isSubmitting: false,
      errorMsg: "",
      created: false,
      createdPageId: null,
      createdSlug: null,
      ownerToken: null,
      copied: null,

      stepTitles: [
        "Who's the Birthday Star?",
        "Choose a Template",
        "Customize Your Page",
      ],
      stepDescriptions: [
        "Enter the birthday person's details",
        "Pick a beautiful design for the page",
        "Add music, images, and settings",
      ],
      stepIcons: ["🌟", "🎨", "⚙️"],

      templates: [
        {
          id: "rose",
          name: "Elegant Rose",
          description: "Romantic pink & gold",
          icon: "🌹",
          gradient: "linear-gradient(135deg, #4a0d2f, #6b1040)",
        },
        {
          id: "party",
          name: "Party Celebration",
          description: "Festive purple vibes",
          icon: "🎊",
          gradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
        },
        {
          id: "minimal",
          name: "Modern Minimal",
          description: "Clean & sophisticated",
          icon: "✨",
          gradient: "linear-gradient(135deg, #2d3436, #636e72)",
        },
        {
          id: "ocean",
          name: "Ocean Dreams",
          description: "Calm blue waves",
          icon: "🌊",
          gradient: "linear-gradient(135deg, #0c2461, #1e3a5f, #3d5a80)",
        },
        {
          id: "sunset",
          name: "Golden Sunset",
          description: "Warm orange glow",
          icon: "🌅",
          gradient: "linear-gradient(135deg, #c73659, #f97316, #fbbf24)",
        },
        {
          id: "galaxy",
          name: "Galaxy Night",
          description: "Cosmic starry theme",
          icon: "🌌",
          gradient: "linear-gradient(135deg, #0f0f23, #2d1b69, #5b21b6)",
        },
      ],
    };
  },
  computed: {
    canProceed() {
      if (this.step === 1) {
        return this.personName.trim().length > 0;
      }
      return true;
    },
    shareLink() {
      return `${window.location.origin}/b/${this.createdSlug}`;
    },
    manageLink() {
      return `${window.location.origin}/birthday/manage/${this.createdPageId}?token=${this.ownerToken}`;
    },
  },
  methods: {
    getStarStyle(i) {
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
      };
    },

    nextStep() {
      if (this.canProceed) {
        // Auto-generate title if not provided
        if (this.step === 1 && !this.title.trim()) {
          this.title = `Happy Birthday ${this.personName}!`;
        }
        this.step++;
      }
    },

    triggerUpload() {
      this.$refs.fileInput.click();
    },

    handleFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        this.errorMsg = "Image too large. Maximum 10MB.";
        return;
      }

      if (!file.type.startsWith("image/")) {
        this.errorMsg = "Please select an image file.";
        return;
      }

      this.heroFile = file;
      this.errorMsg = "";

      const reader = new FileReader();
      reader.onload = (e) => {
        this.heroPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    removePhoto() {
      this.heroFile = null;
      this.heroPreview = null;
      this.$refs.fileInput.value = "";
    },

    generateSlug(name) {
      // Create URL-friendly slug from name
      const base = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const random = Math.random().toString(36).substring(2, 8);
      return `${base}-${random}`;
    },

    generateOwnerToken() {
      // Generate a secure random token
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
    },

    formatTime(seconds) {
      if (!seconds || seconds <= 0) return "0:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    },

    async createPage() {
      if (!this.personName.trim()) {
        this.errorMsg = "Please enter the birthday person's name.";
        return;
      }

      this.isSubmitting = true;
      this.errorMsg = "";

      try {
        // Generate slug and owner token
        this.createdSlug = this.generateSlug(this.personName);
        this.ownerToken = this.generateOwnerToken();

        let heroImageUrl = null;

        // Upload hero image if provided
        if (this.heroFile) {
          const fileName = `heroes/${Date.now()}_${this.heroFile.name.replace(
            /[^a-zA-Z0-9.]/g,
            "_"
          )}`;

          const { error: uploadError } = await supabase.storage
            .from("birthday-photos")
            .upload(fileName, this.heroFile);

          if (!uploadError) {
            const { data: urlData } = supabase.storage
              .from("birthday-photos")
              .getPublicUrl(fileName);
            heroImageUrl = urlData.publicUrl;
          }
        }

        // Create the birthday page
        const { data, error } = await supabase
          .from("birthday_pages")
          .insert([
            {
              owner_token: this.ownerToken,
              slug: this.createdSlug,
              title: this.title.trim() || `Happy Birthday ${this.personName}!`,
              person_name: this.personName.trim(),
              subtitle: this.subtitle.trim() || null,
              hero_image_url: heroImageUrl,
              template: this.template,
              youtube_video_id: this.youtubeVideoId.trim() || null,
              youtube_start_time: this.youtubeStartTime || 0,
              memories_video_id: this.memoriesVideoId.trim() || null,
              use_video_sound: this.useVideoSound,
              wishes_require_approval: this.wishesRequireApproval,
            },
          ])
          .select()
          .single();

        if (error) {
          // Check for duplicate slug
          if (error.code === "23505") {
            // Try again with new slug
            this.createdSlug = this.generateSlug(this.personName);
            const { data: retryData, error: retryError } = await supabase
              .from("birthday_pages")
              .insert([
                {
                  owner_token: this.ownerToken,
                  slug: this.createdSlug,
                  title:
                    this.title.trim() || `Happy Birthday ${this.personName}!`,
                  person_name: this.personName.trim(),
                  subtitle: this.subtitle.trim() || null,
                  hero_image_url: heroImageUrl,
                  template: this.template,
                  youtube_video_id: this.youtubeVideoId.trim() || null,
                  youtube_start_time: this.youtubeStartTime || 0,
                  memories_video_id: this.memoriesVideoId.trim() || null,
                  use_video_sound: this.useVideoSound,
                  wishes_require_approval: this.wishesRequireApproval,
                },
              ])
              .select()
              .single();

            if (retryError) throw retryError;
            this.createdPageId = retryData.id;
          } else {
            throw error;
          }
        } else {
          this.createdPageId = data.id;
        }

        // Store in localStorage for easy access
        const ownedPages = JSON.parse(
          localStorage.getItem("ownedBirthdayPages") || "{}"
        );
        ownedPages[this.createdPageId] = {
          token: this.ownerToken,
          slug: this.createdSlug,
          title: this.title,
          personName: this.personName,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem("ownedBirthdayPages", JSON.stringify(ownedPages));

        this.created = true;
      } catch (error) {
        console.error("Error creating page:", error);
        this.errorMsg =
          error.message || "Failed to create birthday page. Please try again.";
      } finally {
        this.isSubmitting = false;
      }
    },

    copyShareLink() {
      navigator.clipboard.writeText(this.shareLink);
      this.copied = "share";
      setTimeout(() => (this.copied = null), 2000);
    },

    copyManageLink() {
      navigator.clipboard.writeText(this.manageLink);
      this.copied = "manage";
      setTimeout(() => (this.copied = null), 2000);
    },

    viewPage() {
      this.$router.push(`/b/${this.createdSlug}`);
    },

    createAnother() {
      // Reset form
      this.step = 1;
      this.personName = "";
      this.title = "";
      this.subtitle = "";
      this.template = "rose";
      this.youtubeVideoId = "";
      this.youtubeStartTime = 0;
      this.memoriesVideoId = "";
      this.useVideoSound = false;
      this.heroFile = null;
      this.heroPreview = null;
      this.wishesRequireApproval = false;
      this.created = false;
      this.createdPageId = null;
      this.createdSlug = null;
      this.ownerToken = null;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap");

.create-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
  font-family: "Poppins", sans-serif;
}

/* Background */
.bg-gradient {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  z-index: -2;
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
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  z-index: -1;
  animation: orbFloat 8s ease-in-out infinite;
}

.orb-1 {
  top: -20%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  max-width: 400px;
  max-height: 400px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent);
}

.orb-2 {
  bottom: -20%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  max-width: 500px;
  max-height: 500px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent);
  animation-delay: 3s;
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
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
}

.star {
  position: absolute;
  width: 3px;
  height: 3px;
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

/* Form Container */
.form-container {
  width: 100%;
  max-width: 550px;
  z-index: 10;
}

.form-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 2rem;
  padding: 2.5rem 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

/* Progress Bar */
.progress-bar {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
}

.progress-bar::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 25%;
  right: 25%;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%);
}

.progress-step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: all 0.3s;
}

.progress-step.active {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-color: transparent;
}

.progress-step.current {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
}

.step-number {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Header */
.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.header-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.form-title {
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  color: white;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

/* Form Groups */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.label-icon {
  font-size: 1rem;
}

.form-input {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}

.input-hint {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
  margin-top: 0.3rem;
}

/* Time Input */
.time-input-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.time-input {
  flex: 1;
  max-width: 150px;
}

.time-preview {
  color: #8b5cf6;
  font-weight: 600;
  font-size: 1.1rem;
  min-width: 60px;
}

/* Templates Grid */
.templates-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
}

@media (max-width: 500px) {
  .templates-grid {
    grid-template-columns: 1fr;
    max-height: 350px;
  }
}

.template-card {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.template-card:hover {
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-5px);
}

.template-card.selected {
  border-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
}

.template-preview {
  width: 100%;
  height: 80px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.8rem;
}

.template-icon {
  font-size: 2rem;
}

.template-name {
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.template-desc {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
}

.selected-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  background: #8b5cf6;
  border-radius: 50%;
  color: white;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Upload Area */
.upload-area {
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
}

.upload-area.has-preview {
  padding: 0;
  border-style: solid;
}

.file-input {
  display: none;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.upload-icon {
  font-size: 2.5rem;
}

.upload-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.preview-container {
  position: relative;
  width: 100%;
}

.preview-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 0.8rem;
}

.remove-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.remove-btn:hover {
  transform: scale(1.1);
  background: #ef4444;
}

/* Checkbox */
.checkbox-group {
  display: flex;
  flex-direction: column;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
}

.checkbox-label input {
  display: none;
}

.checkbox-custom {
  width: 22px;
  height: 22px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.checkbox-label input:checked + .checkbox-custom {
  background: #8b5cf6;
  border-color: #8b5cf6;
}

.checkbox-label input:checked + .checkbox-custom::after {
  content: "✓";
  color: white;
  font-size: 0.8rem;
}

/* Navigation Buttons */
.nav-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.back-btn,
.next-btn,
.create-btn {
  flex: 1;
  padding: 1rem;
  border-radius: 100px;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.back-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.next-btn {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
}

.next-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
}

.next-btn:disabled,
.create-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.create-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.create-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
}

/* Error Message */
.error-message {
  color: #f87171;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

/* Back Link */
.back-link {
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.back-link:hover {
  color: #8b5cf6;
}

/* Success Screen */
.success-screen {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.success-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  padding: 2.5rem 2rem;
  text-align: center;
  max-width: 500px;
  width: 100%;
  animation: scaleIn 0.5s ease;
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 1s ease infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.success-title {
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  color: white;
  margin-bottom: 0.5rem;
}

.success-message {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}

.success-message strong {
  color: #8b5cf6;
}

/* Link Boxes */
.link-box {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: left;
}

.link-box label {
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.link-box.management {
  border: 1px solid rgba(251, 191, 36, 0.3);
  background: rgba(251, 191, 36, 0.05);
}

.link-row {
  display: flex;
  gap: 0.5rem;
}

.link-row input {
  flex: 1;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: white;
  font-family: monospace;
  font-size: 0.85rem;
}

.copy-btn {
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: #8b5cf6;
}

.warning-text {
  color: #fbbf24;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

/* Success Buttons */
.success-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.primary-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border: none;
  border-radius: 100px;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
}

.primary-btn:hover {
  transform: scale(1.02);
}

.secondary-btn {
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  color: white;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  transition: all 0.3s;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Audio Choice Box */
.audio-choice-box {
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.audio-choice-title {
  color: white;
  font-weight: 500;
  margin-bottom: 0.8rem;
  text-align: center;
}

.audio-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

.audio-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
}

.audio-option:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.audio-option.selected {
  background: rgba(139, 92, 246, 0.2);
  border-color: #8b5cf6;
}

.audio-option input[type="radio"] {
  display: none;
}

.audio-icon {
  font-size: 1.5rem;
}

.audio-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 500;
}

/* Video Instructions */
.video-instructions {
  margin-top: 0.8rem;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.8rem;
  border-left: 3px solid #8b5cf6;
}

.instruction-title {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.instruction-steps {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin: 0;
  padding-left: 1.2rem;
  line-height: 1.6;
}

.instruction-steps li {
  margin-bottom: 0.3rem;
}

.instruction-steps strong {
  color: #8b5cf6;
}

.url-example {
  display: inline-block;
  margin-top: 0.2rem;
  font-family: monospace;
  font-size: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
}
</style>
