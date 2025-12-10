<template>
  <div class="submit-page">
    <!-- Background Effects -->
    <div class="bg-gradient"></div>
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>

    <!-- Stars -->
    <div class="stars-container">
      <div v-for="i in 30" :key="i" class="star" :style="getStarStyle(i)"></div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-screen">
      <div class="loader"></div>
      <p>Loading...</p>
    </div>

    <!-- Not Found -->
    <div v-else-if="notFound" class="not-found-screen">
      <div class="not-found-content">
        <div class="not-found-icon">🎂</div>
        <h1>Page Not Found</h1>
        <p>This birthday page doesn't exist.</p>
        <router-link to="/birthday/create" class="create-link">
          Create your own birthday page →
        </router-link>
      </div>
    </div>

    <!-- Success Screen -->
    <div v-else-if="submitted" class="success-wrapper">
      <transition name="fade">
        <div class="success-screen">
          <div class="success-card">
            <div class="success-icon">🎉</div>
            <h2 class="success-title">Thank You!</h2>
            <p class="success-message">
              Your birthday wish has been sent successfully.
            </p>
            <p v-if="page.wishes_require_approval" class="success-sub">
              ⏳ Your wish will appear after review.
            </p>
            <p v-else class="success-sub">
              {{ page.person_name }} will love it! 💕
            </p>

            <button @click="goToBirthday" class="view-btn">
              <span>View Birthday Page</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </transition>
    </div>

    <!-- Form Container -->
    <div v-else class="form-container">
      <div class="form-card">
        <!-- Header -->
        <div class="form-header">
          <div class="header-icon">💝</div>
          <h1 class="form-title">Wish for {{ page.person_name }}</h1>
          <p class="form-subtitle">
            Send a birthday message to make their day special
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitWish" class="wish-form">
          <!-- Name Field -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">👤</span>
              Your Name
            </label>
            <input
              v-model="name"
              type="text"
              class="form-input"
              placeholder="Enter your name"
              required
            />
          </div>

          <!-- Wish Field -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">💬</span>
              Your Birthday Wish
            </label>
            <textarea
              v-model="wish"
              class="form-textarea"
              placeholder="Write your heartfelt birthday message..."
              rows="4"
              required
            ></textarea>
          </div>

          <!-- Photo Upload -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📷</span>
              Your Photo (optional)
            </label>
            <div
              class="upload-area"
              @click="triggerUpload"
              :class="{ 'has-preview': photoPreview }"
            >
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="handleFileSelect"
                class="file-input"
              />
              <div v-if="!photoPreview" class="upload-placeholder">
                <span class="upload-icon">📸</span>
                <span class="upload-text">Click to upload photo</span>
                <span class="upload-hint">JPG, PNG (Max 5MB)</span>
              </div>
              <div v-else class="preview-container">
                <img :src="photoPreview" alt="Preview" class="preview-image" />
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

          <!-- Submit Button -->
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting" class="btn-content">
              <span class="btn-icon">💌</span>
              <span>Send Birthday Wish</span>
            </span>
            <span v-else class="btn-loading">
              <span class="spinner"></span>
              Sending...
            </span>
          </button>

          <!-- Error Message -->
          <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
        </form>
      </div>

      <!-- Back Link -->
      <router-link :to="`/b/${slug}`" class="back-link">
        ← Back to Birthday Page
      </router-link>
    </div>
  </div>
</template>

<script>
import { supabase } from "@/supabase.js";

export default {
  name: "SubmitWishPublic",
  data() {
    return {
      loading: true,
      notFound: false,
      slug: "",
      page: null,
      name: "",
      wish: "",
      photoFile: null,
      photoPreview: null,
      isSubmitting: false,
      submitted: false,
      errorMsg: "",
    };
  },
  async mounted() {
    this.slug = this.$route.params.slug;
    await this.loadPage();
  },
  methods: {
    async loadPage() {
      try {
        const { data, error } = await supabase
          .from("birthday_pages")
          .select("id, person_name, title, wishes_require_approval")
          .eq("slug", this.slug)
          .single();

        if (error || !data) {
          this.notFound = true;
        } else {
          this.page = data;
        }
      } catch (e) {
        console.error("Error loading page:", e);
        this.notFound = true;
      } finally {
        this.loading = false;
      }
    },

    getStarStyle(i) {
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
      };
    },

    triggerUpload() {
      this.$refs.fileInput.click();
    },

    handleFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        this.errorMsg = "Image too large. Maximum 5MB.";
        return;
      }

      if (!file.type.startsWith("image/")) {
        this.errorMsg = "Please select an image file.";
        return;
      }

      this.photoFile = file;
      this.errorMsg = "";

      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    removePhoto() {
      this.photoFile = null;
      this.photoPreview = null;
      this.$refs.fileInput.value = "";
    },

    async submitWish() {
      if (!this.name.trim() || !this.wish.trim()) {
        this.errorMsg = "Please enter your name and wish.";
        return;
      }

      this.isSubmitting = true;
      this.errorMsg = "";

      try {
        let photoUrl = null;

        // Upload photo if selected
        if (this.photoFile) {
          try {
            const fileName = `wishes/${Date.now()}_${this.photoFile.name.replace(
              /[^a-zA-Z0-9.]/g,
              "_"
            )}`;

            const { error: uploadError } = await supabase.storage
              .from("birthday-photos")
              .upload(fileName, this.photoFile);

            if (!uploadError) {
              const { data: urlData } = supabase.storage
                .from("birthday-photos")
                .getPublicUrl(fileName);
              photoUrl = urlData.publicUrl;
            }
          } catch (uploadErr) {
            console.error("Photo upload failed:", uploadErr);
            // Continue without photo
          }
        }

        // Determine status based on page settings
        const status = this.page.wishes_require_approval
          ? "pending"
          : "approved";

        // Insert wish
        const { error: insertError } = await supabase
          .from("birthday_wishes")
          .insert([
            {
              page_id: this.page.id,
              name: this.name.trim(),
              wish: this.wish.trim(),
              photo_url: photoUrl,
              status: status,
            },
          ]);

        if (insertError) {
          throw new Error("Failed to send wish. Please try again.");
        }

        // Success!
        this.submitted = true;
        this.fireConfetti();
      } catch (error) {
        this.errorMsg =
          error.message || "Error sending wish. Please try again.";
      } finally {
        this.isSubmitting = false;
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
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#8b5cf6", "#ec4899", "#fbbf24"],
      });
    },

    goToBirthday() {
      this.$router.push(`/b/${this.slug}`);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap");

.submit-page {
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

/* Loading */
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.loader {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Not Found */
.not-found-screen {
  text-align: center;
  color: white;
}

.not-found-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.not-found-content h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.not-found-content p {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
}

.create-link {
  color: #8b5cf6;
  text-decoration: none;
}

/* Form Container */
.form-container {
  width: 100%;
  max-width: 500px;
  z-index: 10;
}

.form-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  padding: 2.5rem 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
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

.form-input,
.form-textarea {
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

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* Upload Area */
.upload-area {
  position: relative;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
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

.upload-hint {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
}

.preview-container {
  position: relative;
  width: 100%;
}

.preview-image {
  width: 100%;
  height: 200px;
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
  font-size: 1rem;
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

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border: none;
  border-radius: 100px;
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  font-size: 1.2rem;
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
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
.success-wrapper {
  position: fixed;
  inset: 0;
  z-index: 100;
}

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
  padding: 3rem 2.5rem;
  text-align: center;
  max-width: 400px;
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
  font-size: 2rem;
  color: white;
  margin-bottom: 0.5rem;
}

.success-message {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
}

.success-sub {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.view-btn {
  display: inline-flex;
  align-items: center;
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

.view-btn:hover {
  transform: scale(1.05);
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
</style>
