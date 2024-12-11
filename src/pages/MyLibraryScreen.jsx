import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import { IP_API } from "../../config";

const MyLibraryScreen = () => {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);

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
        const response = await fetch(`${IP_API}/api/client/library`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idUser: userId }),
        });

        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`);
        }

        const rentals = await response.json();

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
                  typeDiscount: rental.type_discount,
                };
              }
              console.warn(`OMDB falló para: ${rental.id_movie}`);
              return null;
            } catch (err) {
              console.error(`Error al obtener datos de OMDB: ${err}`);
              return null;
            }
          })
        );

        const validContent = details.filter((item) => item !== null);
        setLibrary(validContent);
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

  const validLibrary = validateItems(library);

  // **Manejo de paginación**
  const handleNextPage = () => {
    if (page < Math.ceil(validLibrary.length / 5) - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
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
            {/* Carrusel de Contenido */}
            <div className="py-6">
              <h2 className="text-4xl font-semibold mb-6 ml-8">Contenido Comprado</h2>
              {validLibrary.length > 0 ? (
                <Carousel
                  items={validLibrary}
                  visibleItems={5} // Número de elementos visibles
                  page={page}
                  onNext={handleNextPage}
                  onPrev={handlePrevPage}
                />
              ) : (
                <p className="text-xl text-left mt-4 ml-16">
                  No tienes contenido comprado disponible.
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
