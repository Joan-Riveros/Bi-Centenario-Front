/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#0F4C75',
        secondary: '#3282B8',
        accent: '#BBE1FA',
        base: '#1B262C',
        light: '#F1F5F9', 
        darkSecondary: '#0D1B2A', 
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        gradient: 'gradient 10s ease infinite',
        fadeIn: 'fadeIn 1.2s ease-out both',
      },
      backgroundImage: {
        'light-gradient': 'linear-gradient(135deg, #ffffff, #f1f5f9, #e2e8f0)',
        'dark-gradient': 'linear-gradient(135deg, #0F4C75, #1B262C, #3F0D99)',
      },
      backgroundSize: {
        'full': '400% 400%',
      },
    },
  },
  plugins: [],
};
