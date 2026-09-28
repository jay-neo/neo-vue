import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // Updated to include standard Vue project structure
  ],
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
    },
  },
  plugins: [],
} satisfies Config
