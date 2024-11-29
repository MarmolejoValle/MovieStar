import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../../components/Footer";
import avengers from "../assets/imgs/avengers.jpg";
import darkKnight from "../assets/imgs/darkKnight.jpg";
import frozen from "../assets/imgs/frozenII.jpg";
import breakingBad from "../assets/imgs/breakingBad.jpg";
import strangerThings from "../assets/imgs/strangerThings.jpg";
import got from "../assets/imgs/got.jpg";

export const Contenido = () => {
  // Estado para controlar la vista actual (Películas o Series)
  const [isMovies, setIsMovies] = useState(true);

 
  const movies = [
    {
      image: avengers,
      title: "Avengers: Endgame",
      genre: "Acción, Aventura, Ciencia Ficción",
      price: "80 $",
      duration: "181 minutos",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      image: frozen,
      title: "Frozen II",
      genre: "Animación, Aventura, Fantasía",
      price: "65 $",
      duration: "103 minutos",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      image: darkKnight,
      title: "El Caballero de la Noche",
      genre: "Acción, Crimen, Drama",
      price: "50 $",
      duration: "152 minutos",
      rating: "⭐⭐⭐⭐⭐",
    },
  ];

  
  const series = [
    {
      image: breakingBad, 
      title: "Breaking Bad",
      genre: "Crimen, Drama, Suspenso",
      price: "120 $",
      duration: "5 temporadas",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      image: strangerThings,
      title: "Stranger Things",
      genre: "Drama, Fantasía, Terror",
      price: "100 $",
      duration: "4 temporadas",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      image: got,
      title: "Game of Thrones",
      genre: "Drama, Fantasía, Aventura",
      price: "150 $",
      duration: "8 temporadas",
      rating: "⭐⭐⭐⭐⭐",
    },
  ];

  return (
    <>
      <div className="flex bg-azulprincipal">
        <Sidebar />

        <div className="flex-grow ml-28 mr-24 text-white">
          {/* Título */}
          <div className="text-center">
            <h1 className="mt-16 font-serif text-6xl">Contenido</h1>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mt-10">
            {/* Switch para Películas/Series */}
            <div className="flex items-center bg-gray-700 rounded-full p-1 w-40">
              <button
                className={`w-1/2 py-1 rounded-full ${
                  isMovies ? "bg-white text-black" : "text-white"
                }`}
                onClick={() => setIsMovies(true)}
              >
                Películas
              </button>
              <button
                className={`w-1/2 py-1 rounded-full ${
                  !isMovies ? "bg-white text-black" : "text-white"
                }`}
                onClick={() => setIsMovies(false)}
              >
                Series
              </button>
            </div>

            {/* Botones */}
            <div className="flex gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full flex items-center">
                <span className="mr-2">➕</span> Agregar
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full flex items-center">
                <span className="mr-2">✏️</span> Editar
              </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar"
                className="bg-gray-700 text-white text-center rounded-full py-2 px-4 pl-10 w-64 focus:outline-none"
              />
              <span className="absolute left-3 top-2 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Body */}
          <div className="mt-12">
            {/* Fila de encabezados */}
            <div className="flex justify-between bg-gray-800 rounded-lg p-4 text-left font-semibold text-center">
              <div className="w-1/5"></div>
              <div className="w-1/5">Título</div>
              <div className="w-1/5">Género</div>
              <div className="w-1/5">Precio</div>
              <div className="w-1/5">Duración</div>
              <div className="w-1/5">Calificación</div>
            </div>

            {/* Cards */}
            <div className="mt-4 space-y-4">
              {(isMovies ? movies : series).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-700 rounded-lg p-4 text-center"
                >
                  <div className="w-1/5 flex justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-16 rounded"
                    />
                  </div>
                  <div className="w-1/5">{item.title}</div>
                  <div className="w-1/5">{item.genre}</div>
                  <div className="w-1/5">{item.price}</div>
                  <div className="w-1/5">{item.duration}</div>
                  <div className="w-1/5">{item.rating}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contenido;
