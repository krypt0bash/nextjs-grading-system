/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "arimo": "Arimo, sans-serif",
        "poppins": "Poppins, sans-serif",
      },
      backgroundImage: {
        'login-image': "url('../public/loginimage.png')",
      }
    },
  },
  plugins: [require('daisyui')],

  daisyui: {
    styled: false
  }
}
