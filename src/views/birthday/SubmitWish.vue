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

    <!-- Success Screen -->
    <transition name="fade">
      <div v-if="submitted" class="success-screen">
        <div class="success-card">
          <div class="success-icon">🎉</div>
          <h2 class="success-title">Terima Kasih!</h2>
          <p class="success-message">
            Ucapan anda telah dihantar dengan jayanya.
          </p>
          <p class="success-sub">Maa pasti akan gembira! 💕</p>

          <button @click="goToBirthday" class="view-btn">
            <span>Lihat Halaman Birthday</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </transition>

    <!-- Form Container -->
    <div v-if="!submitted" class="form-container">
      <div class="form-card">
        <!-- Header -->
        <div class="form-header">
          <div class="header-icon">💝</div>
          <h1 class="form-title">Ucapan Untuk Maa</h1>
          <p class="form-subtitle">
            Isi maklumat di bawah untuk menghantar ucapan anda
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitWish" class="wish-form">
          <!-- Child Number Dropdown -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">👤</span>
              Anak Ke Berapa?
            </label>
            <select v-model="childNumber" class="form-select" required>
              <option value="" disabled>-- Pilih --</option>
              <option value="1">Anak Sulung (1)</option>
              <option value="2">Anak Kedua (2)</option>
              <option value="3">Anak Ke-3</option>
              <option value="4">Anak Ke-4</option>
              <option value="5">Anak Ke-5</option>
              <option value="6">Anak Ke-6</option>
              <option value="7">Anak Ke-7</option>
              <option value="8">Anak Ke-8</option>
              <option value="9">Anak Ke-9</option>
              <option value="10">Anak Ke-10</option>
              <option value="11">Anak Ke-11</option>
              <option value="12">Anak Ke-12</option>
              <option value="13">Anak Bongsu (13)</option>
            </select>
          </div>

          <!-- Wish Field -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">💬</span>
              Ucapan Untuk Maa
            </label>
            <textarea
              v-model="wish"
              class="form-textarea"
              placeholder="Tulis ucapan cinta anda untuk Maa..."
              rows="4"
              required
            ></textarea>
          </div>

          <!-- Photo Upload -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📷</span>
              Gambar Anda
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
                <span class="upload-text">Klik untuk upload gambar</span>
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
              <span>Hantar Ucapan</span>
            </span>
            <span v-else class="btn-loading">
              <span class="spinner"></span>
              Menghantar...
            </span>
          </button>

          <!-- Error Message -->
          <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
        </form>
      </div>

      <!-- Back Link -->
      <router-link to="/birthday-maa" class="back-link">
        ← Kembali ke Halaman Birthday
      </router-link>
    </div>
  </div>
</template>

<script>
import { supabase } from "@/supabase.js";

export default {
  name: "SubmitWish",
  data() {
    return {
      childNumber: "",
      wish: "",
      photoFile: null,
      photoPreview: null,
      isSubmitting: false,
      submitted: false,
      errorMsg: "",
      // Child names mapping
      childNames: {
        1: "Anak Sulung",
        2: "Anak Kedua",
        3: "Anak Ke-3",
        4: "Anak Ke-4",
        5: "Anak Ke-5",
        6: "Anak Ke-6",
        7: "Anak Ke-7",
        8: "Anak Ke-8",
        9: "Anak Ke-9",
        10: "Anak Ke-10",
        11: "Anak Ke-11",
        12: "Anak Ke-12",
        13: "Anak Bongsu",
      },
    };
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

    triggerUpload() {
      this.$refs.fileInput.click();
    },

    handleFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file size (5MB max)
      if (file.size > 15 * 1024 * 1024) {
        this.errorMsg = "Gambar terlalu besar. Maksimum 5MB.";
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        this.errorMsg = "Sila pilih fail gambar sahaja.";
        return;
      }

      this.photoFile = file;
      this.errorMsg = "";

      // Create preview
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
      if (!this.childNumber || !this.wish.trim()) {
        this.errorMsg = "Sila pilih anak ke berapa dan isi ucapan.";
        return;
      }

      // Get the name from the child number
      const name = this.childNames[this.childNumber];

      this.isSubmitting = true;
      this.errorMsg = "";

      try {
        let photoUrl = null;

        // Upload photo if selected
        if (this.photoFile) {
          try {
            const fileName = `${Date.now()}_${this.photoFile.name.replace(
              /[^a-zA-Z0-9.]/g,
              "_"
            )}`;

            const { data: uploadData, error: uploadError } =
              await supabase.storage
                .from("birthday-photos")
                .upload(fileName, this.photoFile);

            if (uploadError) {
              console.error("Upload error:", uploadError);
              // Continue without photo if upload fails
              console.log("Continuing without photo due to upload error");
            } else {
              // Get public URL
              const { data: urlData } = supabase.storage
                .from("birthday-photos")
                .getPublicUrl(fileName);

              photoUrl = urlData.publicUrl;
            }
          } catch (uploadErr) {
            console.error("Photo upload failed:", uploadErr);
            // Continue without photo - don't block the submission
          }
        }

        // Insert wish into database
        const { error: insertError } = await supabase
          .from("birthday_wishes")
          .insert([
            {
              name: name,
              wish: this.wish.trim(),
              photo_url: photoUrl,
            },
          ]);

        if (insertError) {
          console.error("Insert error:", insertError);

          // Check if it's a table not found error
          if (insertError.message && insertError.message.includes("relation")) {
            throw new Error("Jadual database tidak wujud. Sila hubungi admin.");
          }
          throw new Error("Gagal menghantar ucapan. Sila cuba lagi.");
        }

        // Success!
        this.submitted = true;
        this.fireConfetti();
      } catch (error) {
        this.errorMsg = error.message || "Ralat berlaku. Sila cuba lagi.";
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
        colors: ["#f43f5e", "#d4af37", "#ff69b4", "#ffd700"],
      });
    },

    goToBirthday() {
      this.$router.push("/birthday-maa");
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
  background: linear-gradient(135deg, #1a0a14, #2d0a1f, #4a0d2f, #2d0a1f);
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
  background: radial-gradient(circle, rgba(255, 100, 150, 0.3), transparent);
}

.orb-2 {
  bottom: -20%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  max-width: 500px;
  max-height: 500px;
  background: radial-gradient(circle, rgba(255, 180, 50, 0.2), transparent);
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
  font-size: 2rem;
  color: white;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: rgba(255, 200, 220, 0.7);
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
.form-textarea,
.form-select {
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
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #d4af37;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.2rem;
  padding-right: 3rem;
}

.form-select option {
  background: #2d0a1f;
  color: white;
  padding: 0.5rem;
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
  border-color: #d4af37;
  background: rgba(212, 175, 55, 0.1);
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
  background: #e11d48;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #d4af37, #ffd700);
  border: none;
  border-radius: 100px;
  color: #1a0a14;
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
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error Message */
.error-message {
  color: #ff6b8b;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

/* Back Link */
.back-link {
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  color: rgba(255, 200, 220, 0.6);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.back-link:hover {
  color: #d4af37;
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
  color: rgba(255, 200, 220, 0.9);
  margin-bottom: 0.5rem;
}

.success-sub {
  color: rgba(255, 200, 220, 0.7);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.view-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #d4af37, #ffd700);
  border: none;
  border-radius: 100px;
  color: #1a0a14;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
}

.view-btn:hover {
  transform: scale(1.05);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
