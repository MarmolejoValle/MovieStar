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

  useEffect(() => {
    const fetchLibrary = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("No se encontró el ID del usuario. Inicia sesión nuevamente.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://192.168.1.234:2003/api/client/library",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idUser: parseInt(userId) }),
          }
        );

        if (response.ok) {
          const rentals = await response.json();

          // Fetch detalles de cada película/serie desde OMDb
          const details = await Promise.all(
            rentals.map(async (rental) => {
              const omdbResponse = await fetch(
                `https://www.omdbapi.com/?i=${rental.id_movie}&apikey=fe327da4`
              );

              if (omdbResponse.ok) {
                const movieData = await omdbResponse.json();
                return {
                  ...movieData,
                  dateEnd: rental.date_end, // Fecha de fin de renta
                  dateStart: rental.date_start, // Fecha de inicio de renta
                  price: rental.price, // Precio de la renta
                };
              }
              return null;
            })
          );

          // Filtrar nulos y clasificar por tipo
          const movies = details.filter(
            (item) => item && item.Type === "movie"
          );
          const series = details.filter(
            (item) => item && item.Type === "series"
          );

          setLibrary({ movies, series });
        } else {
          setError("Error al obtener la biblioteca del usuario.");
        }
      } catch (err) {
        setError("Error de conexión con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

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
            {/* Section for Movies */}
            <div className="py-6">
              <h2 className="text-4xl font-semibold mb-6 ml-8">Películas</h2>
              {library.movies.length > 0 ? (
                <Carousel items={library.movies} visibleItems={5} page={0} />
              ) : (
                <p className="text-xl text-left mt-4 ml-16">
                  No tienes películas disponibles.
                </p>
              )}
            </div>

            {/* Section for Series */}
            <div className="py-6">
              <h2 className="text-4xl font-semibold mb-6 ml-8">Series</h2>
              {library.series.length > 0 ? (
                <Carousel items={library.series} visibleItems={5} page={0} />
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
