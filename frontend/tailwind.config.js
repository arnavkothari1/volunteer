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
        primary: {
          50: '#e6f1ff',
          100: '#bdd8ff',
          200: '#94beff',
          300: '#6ba4ff',
          400: '#428aff',
          500: '#1970ff',
          600: '#0056ff',
          700: '#0040cc',
          800: '#002b99',
          900: '#001566',
        },
      },
    },
  },
  plugins: [],
} 