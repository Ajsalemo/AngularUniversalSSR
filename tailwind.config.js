const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  prefix: "",
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "main-background-placeholder": "url('/assets/images/beach.jpg')",
      }),
      width: {
        "1/7": "14%",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
