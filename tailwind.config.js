/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        shark: {
          black: '#050505',
          dark: '#0a0a0a',
          card: '#121214',
          panel: '#18181b',
          border: '#27272a'
        },
        crimson: {
          DEFAULT: '#e11d48',
          bright: '#ff1744',
          dark: '#9f1239',
          glow: 'rgba(225, 29, 72, 0.45)'
        }
      },
      fontFamily: {
        display: ['Oswald', 'Montserrat', 'sans-serif'],
        sans: ['Montserrat', 'Plus Jakarta Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
};
