/** @type {import('tailwindcss').Config} */
import formplugins from "@tailwindcss/forms";
import preline from "preline/plugin";
import typography from "@tailwindcss/typography";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            img: {
              borderRadius: ".2em",
            },
            span: {
              color: "current",
            },
            strong: {
              color: "current",
            },
            em: {
              color: "current",
            },
          },
        },
      },
    },
  },
  plugins: [formplugins, preline, typography],
  darkMode: "class",
  /* corePlugins: {
    preflight: false,
  } */
};
