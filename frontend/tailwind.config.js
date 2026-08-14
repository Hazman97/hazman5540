/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a192f',
        secondary: '#112240',
        accent: '#64ffda',
        text: '#8892b0',
        heading: '#ccd6f6',
        theme: {
          bg: '#FAF7F2',
          bgDark: '#0F0F0F',
          surface: '#FFFFFF',
          surfaceDark: '#1A1A1A',
          surfaceSubtle: '#F5F0E8',
          surfaceSubtleDark: '#141414',
          subtle: '#F0EBE1',
          subtleDark: '#242424',
          border: '#E6E0D4',
          borderDark: '#2A2A2A',
          primary: '#B5502F',
          primaryDark: '#E8C976',
          text: '#2A2421',
          textDark: '#F5F0E8',
          muted: '#524A45',
          mutedDark: '#9E9E9E',
          success: '#1F8A38',
          successDark: '#27C93F',
          warning: '#B45309',
          warningDark: '#FFBD2E',
          error: '#C92A2A',
          errorDark: '#FF5F56',
        },
        v2: {
          bg: '#FAF7F2',
          bgDark: '#0F0F0F',
          surface: '#FFFFFF',
          surfaceDark: '#1A1A1A',
          subtle: '#F0EBE1',
          subtleDark: '#242424',
          gold: '#E8C976',
          terracotta: '#B5502F',
          cream: '#F5F0E8',
          muted: '#524A45',
          mutedDark: '#9E9E9E',
          border: '#E6E0D4',
          borderDark: '#2A2A2A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        'xl': '0.75rem',  // 12px for cards
        '2xl': '1rem',    // 16px for containers
      },
    },
  },
  plugins: [],
}