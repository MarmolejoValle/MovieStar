import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

const MyLibraryScreen = () => {
  const library = {
    purchasedSeries: [
      { title: "Breaking Bad", image: "/series/breakingbad.png" },
      { title: "Peaky Blinders", image: "/series/peakyblinders.png" },
    ],
    purchasedMovies: [
      { title: "Inception", image: "/peliculas/inception.jpg" },
      { title: "Gladiator", image: "/peliculas/gladiator.jpg" },
    ],
    rentedSeries: [],
    rentedMovies: [],
  };

  return (
    <div className="bg-azulprincipal text-white pt-36">
      <Navbar />

      {Object.entries(library).map(([category, items]) => (
        <div key={category} className="py-6">
          <h2 className="text-4xl font-semibold mb-6 ml-8 capitalize">
            {category === "purchasedSeries"
              ? "Series Compradas"
              : category === "purchasedMovies"
              ? "Películas Compradas"
              : category === "rentedSeries"
              ? "Series Rentadas"
              : "Películas Rentadas"}
          </h2>
          {items.length > 0 ? (
            <Carousel items={items} visibleItems={5} page={0} />
          ) : (
            <p className="text-xl text-left mt-4 ml-16">
              {category === "purchasedSeries"
                ? "No tienes series compradas."
                : category === "purchasedMovies"
                ? "No tienes películas compradas."
                : category === "rentedSeries"
                ? "No tienes series rentadas."
                : "No tienes películas rentadas."}
            </p>
          )}
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default MyLibraryScreen;
