/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/template.html"],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "Arial"],
        poppins: ["Poppins", "Arial"],
      },
      colors: {
        transparent: "transparent",
        white: "#f6f6f4",
        black: "#111",
        red: "#B22727",
        orange: "#EE5007",
        yellow: "#F8CB2E",
        blue: "#006E7F",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
