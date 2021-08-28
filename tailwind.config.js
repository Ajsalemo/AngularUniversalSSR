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
        beach: "url('/assets/images/beach.jpg')",
        desert: "url('/assets/images/desert.jpg')",
        waves: "url('/assets/images/waves.jpg')",
        mountain: "url('/assets/images/mountain.jpg')",
        leaves: "url('/assets/images/leaves.jpg')",
      }),
      width: {
        "1/7": "14%",
        ft: "fit-content",
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
