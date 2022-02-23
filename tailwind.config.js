module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/icon/home.svg')",
        github: "url('/icon/github.svg')",
        code: "url('/icon/code.svg')",
      },
      colors: {
        black: "#090a0b",
        red: "#f42a3e",
        white: "#faf0f0",
        gray: "#27292A",
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
