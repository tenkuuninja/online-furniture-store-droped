const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        green: colors.green,
        skeleton: {
          light: '#D1D5DB',
          DEFAULT: '#9CA3AF',
          dark: '#6B7280'
        },
        primary: colors.emerald,
      },
    },
  },
  plugins: [],
}
