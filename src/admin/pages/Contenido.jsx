import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavbarAdmin"; 

const Contenido = () => {
  const peliculas = [
    {
      titulo: "Avengers: Endgame",
      genero: "Acción, Aventura, Ciencia Ficción",
      precio: "80 $",
      duracion: "181 minutos",
      calificacion: 5,
    },
    {
      titulo: "Frozen II",
      genero: "Animación, Aventura, Fantasía",
      precio: "65 $",
      duracion: "103 minutos",
      calificacion: 4,
    },
    {
      titulo: "El Caballero de la Noche",
      genero: "Acción, Crimen, Drama",
      precio: "50 $",
      duracion: "152 minutos",
      calificacion: 5,
    },
  ];

  const renderStars = (count) => {
    return Array(count).fill("⭐").join("");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-900">
        {/* Navbar */}
        <Navbar />

        <div className="p-6">
          {/* Título */}
          <h1 className="text-3xl font-bold text-white mb-6">Contenido</h1>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse border border-gray-700 text-white">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2">Título</th>
                  <th className="px-4 py-2">Género</th>
                  <th className="px-4 py-2">Precio</th>
                  <th className="px-4 py-2">Duración</th>
                  <th className="px-4 py-2">Calificación</th>
                </tr>
              </thead>
              <tbody>
                {peliculas.map((pelicula, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    }`}
                  >
                    <td className="px-4 py-2">{pelicula.titulo}</td>
                    <td className="px-4 py-2">{pelicula.genero}</td>
                    <td className="px-4 py-2">{pelicula.precio}</td>
                    <td className="px-4 py-2">{pelicula.duracion}</td>
                    <td className="px-4 py-2">{renderStars(pelicula.calificacion)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contenido;
