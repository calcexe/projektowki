/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: ({ theme }) => ({
        ...theme("spacing"),
        page: 512,
      }),
      minWidth: ({ theme }) => ({
        ...theme("spacing"),
        page: 1024,
      }),
      colors: {
        mint: {
          regular: "#95D0CE",
          dark: "#3C8683",
        },
        purple: {
          regular: "#8B63AF",
          dark: "#7D53A0",
        },
        gray: {
          lighter: "#39393D",
          100: "#1C1C1E",
          200: "#2C2C2E",
          300: "#39393C",
          400: "#4B4B4E",
          500: "#545457",
          600: "#646468",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
