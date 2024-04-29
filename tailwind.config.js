/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FAF8FF",
        primary: "#4E60DE",
        secondary: "#00BE89",
      },
      textColor: {
        black: "#474555",
      },
    },
  },
  plugins: [],
};
