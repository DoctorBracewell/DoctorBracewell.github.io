module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        black: "#090a0b",
        red: "#fb2339",
        white: "#faf0f0",
      },
      fontFamily: {
        serif: ["Josefin Slab", "Open Sans", "sans-serif"],
        display: ["Yatra One", "serif"],
        vanilla: ["Pacifico", "cursive"],
      },
    },
  },
  plugins: [],
};
