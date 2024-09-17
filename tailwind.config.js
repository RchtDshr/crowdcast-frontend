const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#009B67',
      },
      fontFamily: {
        primary: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [],
}