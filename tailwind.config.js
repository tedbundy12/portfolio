/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      def: "Roboto, sans-serif",
    },
    screens: {
      fm: { max: "880px" },
      sm: { max: "817px" },
      tm: { max: "786px" },
      fm: { max: "750px" },
    },
  },
  plugins: [],
};
