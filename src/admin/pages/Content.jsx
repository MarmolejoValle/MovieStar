import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../../components/Footer";
import data from "../data/data.json";
import CardRow from "../components/CardRow";

export const Content = () => {
  const [isMovies, setIsMovies] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

  const currentData = isMovies ? data.movies : data.series;

  // Filtrar los datos por el término de búsqueda
  const filteredData = currentData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

            {/* Botones de Añadir y Editar */}
            <div className="flex gap-4">
              {/* <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full flex items-center">
                <span className="mr-2">➕</span> Agregar
              </button> */}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute left-3 top-2 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Tabla */}
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
              {filteredData.map((item, index) => (
                <CardRow
                  key={index}
                  image={item.image}
                  title={item.title}
                  genre={item.genre}
                  price={item.price}
                  duration={item.duration}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Content;
