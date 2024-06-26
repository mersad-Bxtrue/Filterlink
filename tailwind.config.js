/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    screens: {
      xs: "475px",
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      "dana": "Dana"
    },
    extend: {
      colors: {
        "primary": {
          DEFAULT: "#007bff"
        },
        "secondary": {
          DEFAULT: "#111928bf"
        },
      },
      backgroundImage: {
        "background": "url('/src/image/Project-background-min.jpeg')"
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}

