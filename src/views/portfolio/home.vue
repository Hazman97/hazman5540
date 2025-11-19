<template>
  <div class="min-h-screen flex items-center justify-center px-[5%] md:px-[10%] lg:px-[15%] relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 dark:bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 dark:bg-secondary/30 rounded-full blur-[100px] -z-10"></div>

    <div class="flex flex-col justify-center z-10 max-w-4xl">
      <p class="text-teal-500 dark:text-accent font-mono mb-5 animate-fade-in-down">Hi, my name is</p>
      
      <h1 class="text-5xl md:text-7xl font-bold text-slate-800 dark:text-heading mb-4 animate-fade-in-up delay-100">
        Hazman Adanan.
      </h1>
      
      <h2 class="text-4xl md:text-6xl font-bold text-slate-500 dark:text-text mb-8 animate-fade-in-up delay-200">
        I build things for the web.
      </h2>

      <p class="text-slate-600 dark:text-text text-lg md:text-xl max-w-xl mb-12 leading-relaxed animate-fade-in-up delay-300">
        I'm a Programmer with a strong background in IT Support and Networking. 
        I combine coding expertise with a deep understanding of infrastructure to build efficient, well-supported software.
      </p>

      <div class="flex flex-wrap gap-6 animate-fade-in-up delay-400">
        <router-link to="/portfolio#contact">
          <button class="px-8 py-4 border-2 border-teal-500 text-teal-500 dark:text-accent dark:border-accent rounded hover:bg-teal-500/10 dark:hover:bg-accent/10 transition-all duration-300 font-mono text-sm">
            Contact Me
          </button>
        </router-link>
        
        <button @click="downloadResume" class="px-8 py-4 bg-teal-500 text-white dark:bg-accent dark:text-primary rounded hover:bg-teal-600 dark:hover:bg-accent/90 transition-all duration-300 font-mono text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-1">
          Get My Resume
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    downloadResume() {
      const link = document.createElement('a');
      link.href = '/Hazman_resume_OCT2025.pdf';
      link.download = 'Hazman_resume_OCT2025';
      link.click();
    }
  },
};
</script>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
