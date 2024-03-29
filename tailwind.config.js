/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
      fontFamily: {
        SecularOne: ["SecularOne"],
      },
      colors: {
        green: {
          DEFAULT: "#06d6a0",
        },
        orange: {
          DEFAULT: "#ff8a00",
        },
        gray: {
          DEFAULT: "#eeeeee",
          darker: "#3c3c3c",
          lighter: "#c6c6c6",
          lightest: "#f2f0f0",
        },
        black: {
          DEFAULT: "#272727",
          800: "#404040",
        },
        primary: {
          DEFAULT: "#53a2be",
          800: "#498da6",
        },
        secondary: {
          DEFAULT: "#dd2d4a",
          800: "#c42741",
        },
        base: "#fffdfd",
      },
    },
  },
  plugins: [],
};
