import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ onClose }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchError("Por favor, ingresa un término de búsqueda.");
      return;
    }

    try {
      setSearchError(""); // Limpiar error previo
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=fe327da4&s=${query}`
      );
      const data = await response.json();
      console.log('DATA DE MOVIE: ', data);


      if (data.Search) {
        const formattedResults = data.Search.map((movie) => ({
          id: movie.imdbID,
          title: movie.Title,
          image: movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png",
          description: "Descripción no disponible.",
          releaseDate: movie.Year,
          genre: "No especificado",
          rating: "Sin clasificar",
          name: movie.Title,
          discount: 0,
          typeDiscount: "Sin descuento",
        }));

        setSearchResults(formattedResults);
      } else {
        setSearchResults([]);
        setSearchError(data.Error || "No se encontraron resultados.");
      }
    } catch (error) {
      console.error("Error al buscar películas:", error);
      setSearchError("Hubo un error al realizar la búsqueda. Inténtalo nuevamente.");
    }
  };

  const handleMovieSelect = (movie) => {
    const {
      image,
      description,
      releaseDate,
      genre,
      rating,
      id,
      name,
      discount,
      typeDiscount,
    } = movie;

    navigate(
      `/detalle/${id}?image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}&releaseDate=${encodeURIComponent(releaseDate)}&genre=${encodeURIComponent(genre)}&rating=${encodeURIComponent(rating)}&id=${encodeURIComponent(
        movie.id || movie.imdbID
      )}&name=${encodeURIComponent(name)}&discount=${encodeURIComponent(discount)}&typeDiscount=${encodeURIComponent(typeDiscount)}`
    );

    // Cerrar el modal
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black w-11/12 md:w-1/2 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Buscar Películas</h2>
        <input
          type="text"
          placeholder="Escribe el nombre de la película..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(e.target.value);
          }}
        />
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              const query = document.querySelector(".search-bar input").value;
              handleSearch(query);
            }}
          >
            Buscar
          </button>
        </div>

        {/* Mensajes de error */}
        {searchError && <p className="mt-4 text-center text-red-500">{searchError}</p>}

        {/* Resultados */}
        {searchResults.length > 0 && (
          <div className="mt-6 max-h-64 overflow-y-auto">
            <ul className="space-y-2">
              {searchResults.map((movie) => (
                <li
                  key={movie.id}
                  className="flex items-center space-x-4 mb-2 p-2 border rounded hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  onClick={() => handleMovieSelect(movie)}
                >
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{movie.title}</h3>
                    <p className="text-sm text-gray-600">{movie.releaseDate}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;