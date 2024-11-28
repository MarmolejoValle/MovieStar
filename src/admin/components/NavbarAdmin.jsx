import React, { useState } from "react";
import { FaPlus, FaEdit, FaSearch } from "react-icons/fa"; // Iconos

const NavbarAdmin = () => {
  const [isPeliculas, setIsPeliculas] = useState(true);

  const toggleSwitch = () => {
    setIsPeliculas(!isPeliculas);
  };

  return (
    <header className="flex items-center justify-between bg-gray-900 p-4 text-white">
      {/* Switch Películas/Series */}
      <div className="flex items-center">
        <label className="flex items-center cursor-pointer">
          <span className="text-sm mr-2">{isPeliculas ? "Películas" : "Series"}</span>
          <div
            className={`relative w-10 h-6 rounded-full ${
              isPeliculas ? "bg-green-600" : "bg-blue-600"
            }`}
            onClick={toggleSwitch}
          >
            <div
              className={`absolute w-4 h-4 bg-white rounded-full top-1 ${
                isPeliculas ? "left-1" : "right-1"
              } transition-all`}
            ></div>
          </div>
        </label>
      </div>

      {/* Barra de búsqueda */}
      <div className="flex items-center w-1/2 bg-gray-800 rounded px-3 py-1">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Buscar"
          className="ml-2 w-full bg-transparent text-sm placeholder-gray-400 text-white focus:outline-none"
        />
      </div>

      {/* Botones */}
      <div className="flex space-x-2">
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          <FaPlus className="mr-2" />
          Agregar
        </button>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <FaEdit className="mr-2" />
          Editar
        </button>
      </div>
    </header>
  );
};

export default NavbarAdmin;
