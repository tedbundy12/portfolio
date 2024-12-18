/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#181818",
        "button-green": "#24B47E",
        "nav-color": "#EEEEEE",
        "desc": "#E0E0E0",
        "dark": "#1F1F1F",
      },
    },
    fontFamily: {
      def: "Roboto, sans-serif",
      custom: ["Roboto", "sans-serif"],
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
      elm: { max: "500px" },
      twm: { max: "400px" },
      f: { max: "1422px" },
      first: { max: "1226px" },
      second: { max: "1050px" },
      large: { max: "1491px" },
      maxCustom: { max: "777px" },
      int: { max: "1152px" },
      for: { max: "705px" },
      small: { max: "450px" },
      img: { max: "1250px" },
      textsmall: { max: "1225px" },
      simple: { max: "1420px" },
      verysmall: { max: "400px" },
      simpletext: { max: "745px" },
      s: { max: "600px" },
      g: { max: "421px" },
      h: { max: "331px" },
      p: { max: "1075px" },
      l: { max: "830px" },
      u: { max: "714px" },
    },
    boxShadow: {
      "custom-3d": "20px 20px 60px #bebebe, -20px -20px 60px #ffffff;",
    },
  },
  plugins: [],
};
