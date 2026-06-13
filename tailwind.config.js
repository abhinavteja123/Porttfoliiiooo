/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F4F2EC",
        ink: "#14141A",
        "ink-soft": "#3A3A44",
        iris: {
          a: "#6E8BFF",
          b: "#FF8FB1",
        },
        mint: "#8FF0C8",
      },
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "fluid-sm": "clamp(0.85rem, 0.8rem + 0.25vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.92rem + 0.4vw, 1.25rem)",
        "fluid-lg": "clamp(1.4rem, 1.1rem + 1.4vw, 2.2rem)",
        "fluid-xl": "clamp(2.2rem, 1.4rem + 3.8vw, 4.5rem)",
        "fluid-2xl": "clamp(3rem, 1rem + 9vw, 9rem)",
        "fluid-3xl": "clamp(3.5rem, 0.5rem + 13vw, 13rem)",
      },
      backgroundImage: {
        iris: "linear-gradient(120deg, #6E8BFF 0%, #FF8FB1 100%)",
        "iris-soft": "linear-gradient(120deg, #6E8BFF22 0%, #FF8FB122 100%)",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        liquid: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
