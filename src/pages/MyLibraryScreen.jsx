import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

const MyLibraryScreen = () => {
  const [library, setLibrary] = useState({
    movies: [],
    series: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [moviePage, setMoviePage] = useState(0);
  const [seriesPage, setSeriesPage] = useState(0);

  // **Carga de datos**
  useEffect(() => {
    const fetchLibrary = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId || isNaN(userId)) {
        setError("No se encontró un ID de usuario válido. Inicia sesión nuevamente.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch(
          "http://192.168.1.234:2003/api/client/library",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idUser: parseInt(userId) }),
          }
        );
  
        const responseText = await response.text();
        console.log("Response:", responseText);
  
        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`);
        }
  
        const rentals = JSON.parse(responseText);
  
        const details = await Promise.all(
          rentals.map(async (rental) => {
            try {
              const omdbResponse = await fetch(
                `https://www.omdbapi.com/?i=${rental.id_movie}&apikey=fe327da4`
              );
  
              if (omdbResponse.ok) {
                const movieData = await omdbResponse.json();
                if (!movieData || movieData.Response === "False") {
                  console.warn(`OMDB no encontró datos para: ${rental.id_movie}`);
                  return null;
                }
                return {
                  ...movieData,
                  dateEnd: rental.date_end,
                  dateStart: rental.date_start,
                  price: rental.price,
                };
              }
              console.warn(`OMDB falló para: ${rental.id_movie}`);
              return null;
            } catch (err) {
              console.error(`Error al obtener datos de OMDB: ${err.message}`);
              return null;
            }
          })
        );
  
        const movies = details.filter((item) => item && item.Type === "movie");
        const series = details.filter((item) => item && item.Type === "series");
  
        setLibrary({ movies, series });
      } catch (err) {
        setError(err.message || "Error de conexión con el servidor.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchLibrary();
  }, []);
  

  // **Validar elementos válidos**
  const validateItems = (items) => {
    return items.filter(
      (item) => item.imdbID && item.Poster && item.Title
    );
  };

  const validMovies = validateItems(library.movies);
  const validSeries = validateItems(library.series);

  // **Manejo de paginación**
  const handleNextMoviePage = () => {
    if (moviePage < Math.ceil(validMovies.length / 5) - 1) {
      setMoviePage(moviePage + 1);
    }
  };

  const handlePrevMoviePage = () => {
    if (moviePage > 0) {
      setMoviePage(moviePage - 1);
    }
  };

  const handleNextSeriesPage = () => {
    if (seriesPage < Math.ceil(validSeries.length / 5) - 1) {
      setSeriesPage(seriesPage + 1);
    }
  };

  const handlePrevSeriesPage = () => {
    if (seriesPage > 0) {
      setSeriesPage(seriesPage - 1);
    }
  };

  return (
    <div className="bg-azulprincipal text-white pt-36">
      <div className="min-h-screen">
        <div className="flex justify-center items-center mb-10">
          <h2 className="bg-rojosecundario py-5 px-10 rounded-full text-5xl text-center shadow-black shadow-2xl">
            MI BIBLIOTECA
          </h2>
        </div>

        {loading ? (
          <p className="text-xl text-center">Cargando...</p>
        ) : error ? (
          <p className="text-xl text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Carrusel de Películas */}
            <div className="py-6">
              <h2 className="text-4xl font-semibold mb-6 ml-8">Películas</h2>
              {validMovies.length > 0 ? (
                <Carousel
                  items={validMovies}
                  visibleItems={5} // Número de elementos visibles
                  page={moviePage}
                  onNext={handleNextMoviePage}
                  onPrev={handlePrevMoviePage}
                />
              ) : (
                <p className="text-xl text-left mt-4 ml-16">
                  No tienes películas disponibles.
                </p>
              )}
            </div>

            {/* Carrusel de Series */}
            <div className="py-6">
              <h2 className="text-4xl font-semibold mb-6 ml-8">Series</h2>
              {validSeries.length > 0 ? (
                <Carousel
                  items={validSeries}
                  visibleItems={5} // Número de elementos visibles
                  page={seriesPage}
                  onNext={handleNextSeriesPage}
                  onPrev={handlePrevSeriesPage}
                />
              ) : (
                <p className="text-xl text-left mt-4 ml-16">
                  No tienes series disponibles.
                </p>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyLibraryScreen;
