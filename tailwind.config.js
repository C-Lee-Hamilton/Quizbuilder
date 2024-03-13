/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        golf: "url('/src/media/grass.png')",
      },
      fontFamily: {
        TradeWinds: ["TradeWinds", "sans-serif"],
      },
      colors: {},
      boxShadow: {
        custom: "0 4px 6px 0 rgba(0, 0, 0, 0.5)",
      },
      textShadow: {
        // Define your text shadow styles here
        none: "0px 0px 0px 0px rgba(0,0,0,0)",
        default: "2.5px 2.5px 3.5px rgba(146, 125, 94, 0.6)", // A simple shadow with 50% opacity
        dark: "3px 3px 4px rgba(146, 125, 94, 0.75)", // A darker shadow
      },
      screens: {
        sm: "300px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {};
      Object.entries(theme("textShadow")).forEach(([name, value]) => {
        newUtilities[`.text-shadow-${name}`] = {
          textShadow: value,
        };
      });
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
