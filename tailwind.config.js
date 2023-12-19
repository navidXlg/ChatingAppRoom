/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        enter: 'enter 3s easeIn 1s',
      }
      ,
      keyframes: {
        enter: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1},
        }
      }
    },
    maxWidth: {
      '15': '15rem',
    }
  },
  plugins: [],
}