/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./App.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#4E3F92',
        secondary: '#332958',
      },
    },
    fontFamily: {},
  },
  plugins: ['Kavoon_Regular'],
};
