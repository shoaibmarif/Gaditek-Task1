/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // Blue
        secondary: "#facc15", // Yellow
        neutral: "#f3f4f6", // Gray
      },
    },
  },
  plugins: [],
};
