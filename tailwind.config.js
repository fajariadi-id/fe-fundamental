/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/template.html"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "Arial"],
        poppins: ["Poppins", "Arial"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
