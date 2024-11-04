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
      ffm: { max: "700px" },
      sm: { max: "590px" },
      ssm: { max: "550px" },
      em: { max: "390px" },
      nm: { max: "438px" },
      tm: { max: "468px" },
      elm: {max: "500px"},
      twm: {max: "400px"}
    },
    boxShadow: {
      "custom-3d":
        "20px 20px 60px #bebebe, -20px -20px 60px #ffffff;",
    },
  },
  plugins: [],
};
