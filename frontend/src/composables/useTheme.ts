import { ref, onMounted } from 'vue';

const isDark = ref<boolean>(true);

export function useTheme() {
  const updateTheme = () => {
    const html = document.documentElement;
    if (isDark.value) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    updateTheme();
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDark.value = savedTheme === 'dark';
    } else {
      isDark.value = true;
    }
    updateTheme();
  };

  onMounted(() => {
    initTheme();
  });

  return {
    isDark,
    toggleTheme,
  };
}
