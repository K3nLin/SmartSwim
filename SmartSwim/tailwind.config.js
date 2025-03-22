/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#4E3F92',
        secondary: '#332958',
        input_border: '#2A224B',
        input_field: '#828185',
      },
      fontFamily: {
        kavoon: ['Kavoon-Regular'],
      },
    },
  },
  // plugins: ['Kavoon-Regular'],
};
