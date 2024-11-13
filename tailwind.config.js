/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'azulprincipal': '#13161A',
        'rojosecundario': '#A62940',
      },
    },
  },
  plugins: [],
}
