/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        handwriting: ['Pacifico', 'cursive'],
      },
      colors: {
        peach: {
          50: '#FFF8F5',
          100: '#FFF0EB',
          200: '#FFDDD2',
          300: '#FFC5B3',
          400: '#FFAB91',
          500: '#FF8A70',
          600: '#E07060',
          700: '#C25A4D',
          800: '#A0483D',
          900: '#7D3630',
          950: '#3D1B17',
        },
      },
    },
  },
  plugins: [],
}

