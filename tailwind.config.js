/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        'moveBackground':{
          '0%':{
            'background-position':'0 0'
              },
          '50%':{
              'background-position':'400% 0'
              },
          '100%':{
              'background-position': '0 0'
              }
        }
      },
      animation:{
        'flap': 'moveBackground 20s linear infinite',
      }
    },
  },
  plugins: [],
}
