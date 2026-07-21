/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0033a0',
          dark: '#002277',
          light: '#e6f0ff'
        },
        background: '#f4f7fb',
        card: '#ffffff',
        text: {
          main: '#1e293b',
          muted: '#64748b'
        },
        success: {
          DEFAULT: '#10b981',
          bg: '#d1fae5'
        },
        danger: {
          DEFAULT: '#ef4444',
          bg: '#fee2e2'
        },
        warning: {
          DEFAULT: '#f59e0b',
          bg: '#fef3c7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
