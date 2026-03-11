<template>
  <div v-if="error" class="error-boundary">
    <div class="error-card">
      <div class="error-icon">⚠️</div>
      <h2 class="error-title">Something went wrong</h2>
      <p class="error-message">{{ error.message || 'An unexpected error occurred.' }}</p>
      <div class="error-actions">
        <button @click="retry" class="retry-btn">
          🔄 Try Again
        </button>
        <router-link to="/" class="home-btn">
          🏠 Go Home
        </router-link>
      </div>
    </div>
  </div>
  <slot v-else></slot>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue';

const error = ref(null);

onErrorCaptured((err, instance, info) => {
  error.value = err;
  console.error('ErrorBoundary caught:', err, info);
  return false; // Prevent error from propagating further
});

const retry = () => {
  error.value = null;
};
</script>

<style scoped>
.error-boundary {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.error-card {
  max-width: 28rem;
  width: 100%;
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  text-align: center;
}

.dark .error-card {
  background: #1e293b;
  border-color: #334155;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.dark .error-title {
  color: #f1f5f9;
}

.error-message {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.dark .error-message {
  color: #94a3b8;
}

.error-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.retry-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.retry-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.home-btn {
  padding: 0.75rem 1.5rem;
  background: #f1f5f9;
  color: #475569;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.dark .home-btn {
  background: #334155;
  color: #94a3b8;
}

.home-btn:hover {
  background: #e2e8f0;
}

.dark .home-btn:hover {
  background: #475569;
}
</style>
