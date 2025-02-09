/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4E3F92",
        secondary: "#332958",
        input_field: "#828185",
      },
      fontFamily: {
        kavoon: ["Kavoon_400Regular"],
      },
    },
  },
  plugins: [],
};
