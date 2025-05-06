/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#C14600',
        secondary: '#FF9D23',
        lightBrown: '#E5D0AC',
        paleYellow: '#FEF9E1',

        darkBase: '#1A1A1A',
        darkSecondary: '#2D2D2D',
        textDark: '#EAEAEA',
        darkAccent: '#FF9D23',
        darkHighlight: '#C14600',
      },
    },
  },
  plugins: [],
  extend: {
    animation: {
      fadeIn: 'fadeIn 1.2s ease-out both',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0, transform: 'translateY(10px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
  }  
}
