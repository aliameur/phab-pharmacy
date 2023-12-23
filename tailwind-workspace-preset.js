/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        montserrat: ['var(--font-montserrat)'],
      },
      colors: {
        'mineral-green': {
          50: '#f5f8f7',
          100: '#dfe8e5',
          200: '#bfd0cc',
          300: '#97b1ab',
          400: '#71908a',
          500: '#577570',
          600: '#46605c',
          700: '#394c4a',
          800: '#303f3d',
          900: '#2b3634',
          950: '#151e1c',
        },
        pampas: {
          50: '#f8f6f4',
          100: '#f0ece6',
          200: '#ded6ca',
          300: '#cabaa7',
          400: '#b39a84',
          500: '#a4846b',
          600: '#97745f',
          700: '#7e5f50',
          800: '#674f45',
          900: '#54423a',
          950: '#2d211e',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
