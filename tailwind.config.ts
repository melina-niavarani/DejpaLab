import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8eaf0',
          100: '#c5c9d6',
          200: '#9fa5b8',
          300: '#79819a',
          400: '#5c6684',
          500: '#1F2A58',
          600: '#1a2349',
          700: '#151c3a',
          800: '#10152b',
          900: '#0a0e1c',
          DEFAULT: '#1F2A58',
        },
        secondary: {
          50: '#fce8e9',
          100: '#f8c5c7',
          200: '#f49ea1',
          300: '#f0777b',
          400: '#ed595d',
          500: '#DF2528',
          600: '#c92124',
          700: '#b31d20',
          800: '#9d191c',
          900: '#771114',
          DEFAULT: '#DF2528',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        farsi: ['var(--font-iranian-sans)', 'Tahoma', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

