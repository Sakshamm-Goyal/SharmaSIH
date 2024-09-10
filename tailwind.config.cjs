const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode with 'class'
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Specify the paths for content scanning
  theme: {
    extend: {
      animation: {
        rotate: "rotate 5s linear infinite alternate",
        reveal: "reveal 0.5s ease-in",
        "fade-upwards": "fade-upwards 1s ease-in",
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },

      keyframes: {
        rotate: {
          "100%": { transform: "rotateY(360deg)" },
        },
        reveal: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-upwards": {
          "45%": { opacity: "0.5", width: "300px" },
          "75%": { opacity: "0.5", width: "400px" },
          "100%": { opacity: "0.1", width: "512px" },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))", // Adjust scrolling
          },
        },
      },

      colors: {
        primary: "#18A08B",
        "primary-darker": "#116f61",
        secondary: "#42B5A4",
        light: "#F8FCFB",
        dark: "#030707",
      },

      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"], // Custom fonts
      },

      gridTemplateColumns: {
        quizzes: "repeat(auto-fit, minmax(330px, 1fr))", // Custom grid templates
        options: "repeat(auto-fit, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [
    addVariablesForColors, // Custom plugin to add CSS variables for colors
  ],
};

// Custom function to create CSS variables for all theme colors
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
