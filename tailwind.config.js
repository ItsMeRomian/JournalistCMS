/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("@tailwindcss/line-clamp")],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "node_modules/tailvue/dist/tailvue.es.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Spectral", "sans-serif"],
      serif: ["sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "0.5rem",
        sm: "2rem", //min 640
        lg: "4rem", // min 768
        xl: "5rem", // min 1024
        "2xl": "10rem", //min 1536
      },
    },

    extend: {
      colors: {
        sandlight: "#dcd7d0",
        sandDark: "#CBC5BC",
        reddish: "#C1867B",
        reddishDark: "#bf6a5a",
        dark: "#0D0600",
        subtitle: "#343434",
        broken: "#F8F7F3",
      },
    },
  },
  plugins: [],
};
