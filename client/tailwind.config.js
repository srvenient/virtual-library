/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            bbva: ['BentonSansBBVA', 'sans-serif'],
            bbvaBold: ['BentonSansBBVABold', 'sans-serif'],
            bbvaLight: ['BentonSansBBVALight', 'sans-serif'],
        }
    },
  },
  plugins: [],
}

