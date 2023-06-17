/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3F9D9F",
        primaryLight: "#3AD7BA",
        textGreen: "#007862",
        linkBlue: "#0063AA",
        uploadLight: "#CAFFF5",
      },
    },
  },
  plugins: [],
};
