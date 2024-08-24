import daisyui from "daisyui";
import { light, dark } from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-kanit)"],
        serif: ["var(--font-inter)", "var(--font-kanit)"],
        mono: ["var(--font-inter)", "var(--font-kanit)"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...light,
          primary: "#006FEE",
          secondary: "#7828C8",
          success: "#17C964",
          warning: "#F5A524",
          error: "#F31260",
        },
        dark: {
          ...dark,
          primary: "#006FEE",
          secondary: "#7828C8",
          success: "#17C964",
          warning: "#F5A524",
          error: "#F31260",
        },
      },
    ],
  },
};
