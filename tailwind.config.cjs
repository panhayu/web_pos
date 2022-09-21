/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        'blue': 'var(--blue)',
        'light-blue': 'var(--light-blue)',
        'gray': 'var(--gray)',
        'dark-gray': 'var(--dark-gray)',
        'light-gray': 'var(--light-gray)',
        'red': 'var(--red)',
        'light-red': 'var(--light-red)',
      },
    },
  },
  plugins: [],
}