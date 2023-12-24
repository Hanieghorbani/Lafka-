/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a5102e",
        info: "#e4584b",
        price:'#4d2c21',
        secondary: "#f9c744",
        dark: "#333333",
      },
      boxShadow: {
        "border-b-secondary": "0 3px 0px 0px #F2CE5F",
        "border-b-white": "0 2px 0px 0px white",
      },
      backgroundImage: {
        "img-burst3": "url('../public/imgs/bg/vintage-burst3.png')",
        "img-tomato": "url('../public/imgs/bg/blur-tomato.png')",
        "img-fries": "url('../public/imgs/bg/blur-fries (1).png')",
        "img-cheese": "url('../public/imgs/bg/blur-cheese.png')",
        "img-about": "url('../public/imgs/bg/back-about-title-burger.jpg')",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "ping-slow": "ping 2s linear infinite",
        shadow: "shadow 2s linear infinite",
      },
    },
    screens: {
      sm: "280px",
      smMd:'500px',
      md: "768px",
      mdLg:'850px',
      lg: "976px",
      xl: "1200px",
    },
  },
  plugins: [require("flowbite/plugin")],
}
