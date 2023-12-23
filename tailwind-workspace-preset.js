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
        norway: {
          50: '#f6f8f5',
          100: '#e9f0e8',
          200: '#d4e1d1',
          300: '#aac3a4',
          400: '#87a880',
          500: '#66895e',
          600: '#516f4a',
          700: '#41593c',
          800: '#374833',
          900: '#2d3c2b',
          950: '#151f14',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
