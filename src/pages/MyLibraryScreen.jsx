// import React from "react";
// import Footer from "../components/Footer";
// import Carousel from "../components/Carousel";

// const MyLibraryScreen = () => {
//   const library = {
//     purchasedSeries: [
//       {
//         title: "Breaking Bad",
//         image: "/series/breakingbad.jpg",
//         description:
//           "Breaking Bad es una serie dramática que sigue la transformación de Walter White, un profesor de química convertido en narcotraficante, después de ser diagnosticado con cáncer. A medida que se involucra en el mundo de las drogas, su vida  y la de su familia se ven profundamente afectadas. La serie destaca por su narrativa intensa, desarrollo de personajes complejos, y un enfoque en temas como la ambición, la moralidad y la consecuencia de las decisiones. Protagonizada por Bryan Cranston y Aaron Paul, es considerada una de las mejores series de la televisión.",
//         releaseDate: "2008",
//         genre: "Drama, Thriller, Crimen",
//         rating: "+16",
//       },
//       {
//         title: "The Office",
//         image: "/series/theoffice.png",
//         description:
//           "The Office es una comedia de estilo documental que sigue la vida cotidiana de los empleados de Dunder Mifflin, una empresa de papel. Con momentos incómodos y personajes entrañables, la serie se ha convertido en un clásico moderno.",
//         releaseDate: "2005",
//         genre: "Comedia",
//         rating: "Todo público",
//       },
//     ],
//     purchasedMovies: [
//       {
//         title: "Inception",
//         image: "/peliculas/inception.jpg",
//         description:
//           "Inception es un emocionante thriller de ciencia ficción dirigido por Christopher Nolan que explora el mundo de los sueños. Dom Cobb, un ladrón especializado en infiltrarse en los subconscientes de sus objetivos, recibe una oportunidad única para redimirse: implantar una idea en la mente de un empresario a través del concepto de 'inception'.",
//         releaseDate: "2010",
//         genre: "Acción, Ciencia ficción, Suspenso",
//         rating: "+13",
//       },
//       {
//         title: "Mad Max: Fury Road",
//         image: "/peliculas/madmax.jpg",
//         description:
//           "Mad Max: Fury Road es una película postapocalíptica llena de acción y adrenalina, donde Max Rockatansky une fuerzas con Imperator Furiosa para escapar de Immortan Joe y liberar a su pueblo. Con impactantes escenas de persecución, esta película es un espectáculo visual y narrativo.",
//         releaseDate: "2015",
//         genre: "Acción, Aventura",
//         rating: "+16",
//       },
//     ],
//     rentedSeries: [],
//     rentedMovies: [],
//   };

//   return (
//     <div className="bg-azulprincipal text-white pt-36">
//       <div className="flex justify-center items-center mb-10">
//         <h2 className="bg-rojosecundario py-5 px-10 rounded-full text-5xl text-center shadow-black shadow-2xl">
//           MI BIBLIOTECA
//         </h2>
//       </div>
//       {Object.entries(library).map(([category, items]) => (
//         <div key={category} className="py-6">
//           <h2 className="text-4xl font-semibold mb-6 ml-8 capitalize">
//             {category === "purchasedSeries"
//               ? "Series Compradas"
//               : category === "purchasedMovies"
//               ? "Películas Compradas"
//               : category === "rentedSeries"
//               ? "Series Rentadas"
//               : "Películas Rentadas"}
//           </h2>
//           {items.length > 0 ? (
//             <Carousel items={items} visibleItems={5} page={0} />
//           ) : (
//             <p className="text-xl text-left mt-4 ml-16">
//               {category === "purchasedSeries"
//                 ? "No tienes series compradas."
//                 : category === "purchasedMovies"
//                 ? "No tienes películas compradas."
//                 : category === "rentedSeries"
//                 ? "No tienes series rentadas."
//                 : "No tienes películas rentadas."}
//             </p>
//           )}
//         </div>
//       ))}
//       <Footer />
//     </div>
//   );
// };

// export default MyLibraryScreen;

import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

const MyLibraryScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      // const userId = localStorage.getItem("userId"); 
      const userId = 3; 
      if (!userId) {
        setError("No se encontró el ID del usuario. Inicia sesión nuevamente.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://192.168.106.68:2003/api/user/library", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idUser: parseInt(userId) }),
        });

        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        } else {
          setError("Error al obtener las películas.");
        }
      } catch (err) {
        setError("Error de conexión con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-azulprincipal text-white pt-36">
      <div className="min-h-screen">
        <div className="flex justify-center items-center mb-10">
          <h2 className="bg-rojosecundario py-5 px-10 rounded-full text-5xl text-center shadow-black shadow-2xl">
            MI BIBLIOTECA
          </h2>
        </div>
        <div className="py-6">
          <h2 className="text-4xl font-semibold mb-6 ml-8">IDs de Películas</h2>
          {loading ? (
            <p className="text-xl text-center">Cargando...</p>
          ) : error ? (
            <p className="text-xl text-center text-red-500">{error}</p>
          ) : movies.length > 0 ? (
            <ul className="ml-16">
              {movies.map((movie, index) => (
                <li key={index} className="text-xl">
                  ID: {movie.id_movie}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xl text-left mt-4 ml-16">No hay películas disponibles.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyLibraryScreen;
