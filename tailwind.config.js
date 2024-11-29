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
        'azulsecundario': '#393D43',
      },
      fontFamily: {
        tituloPeliHome: ['Lavishly Yours', 'cursive'],
        tituloPeliHome2: ['Geist Mono', 'normal'],
      },
    },
  },
  plugins: [],
}
