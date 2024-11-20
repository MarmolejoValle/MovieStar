import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Carousel from "../components/Carousel";

const HomeScreen = () => {
  const [seriesPage, setSeriesPage] = useState(0);
  const [moviesPage, setMoviesPage] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);

  const seriesList = [
    { title: "Breaking Bad", image: "/series/breakingbad.png" },
    { title: "The Office", image: "/series/theoffice.png" },
    { title: "The Big Bang Theory", image: "/series/bigbang.png" },
    { title: "Better Call Saul", image: "/series/bettercallsaul.png" },
    { title: "Peaky Blinders", image: "/series/peakyblinders.png" },
    { title: "Friends", image: "/series/friends.png" },
    { title: "Stranger Things", image: "/series/strangerthings.png" },
  ];

  const moviesList = [
    { title: "About Time", image: "/peliculas/abouttime.png" },
    { title: "Father", image: "/peliculas/father.png" },
    { title: "Tokyo Drift", image: "/peliculas/tokyodrift.png" },
    { title: "Spider-Man", image: "/peliculas/spiderman.png" },
    { title: "Avengers", image: "/peliculas/avengers.png" },
    { title: "About Time", image: "/peliculas/abouttime.png" },
    { title: "Father", image: "/peliculas/father.png" },
    { title: "Tokyo Drift", image: "/peliculas/tokyodrift.png" },
    { title: "Spider-Man", image: "/peliculas/spiderman.png" },
    { title: "Avengers", image: "/peliculas/avengers.png" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const itemWidth = 300;
      const visibleItems = Math.floor((window.innerWidth - 100) / itemWidth);
      setVisibleItems(visibleItems);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSeriesPages = Math.ceil(seriesList.length / visibleItems);
  const totalMoviesPages = Math.ceil(moviesList.length / visibleItems);

  return (
    <div className="bg-azulprincipal text-white">
      <Navbar />
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/peliculas/yourname_background.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-azulprincipal"></div>
        <div className="relative flex flex-col items-start justify-center h-full ml-24">
          <h1 className="text-8xl font-tituloPeliHome mb-8">your name</h1>
          <Button text="Ver ahora" styleType="secundary" />
        </div>
      </div>

      <div className="my-6">
        <h2 className="text-4xl font-semibold mb-6 ml-8">Series para ti</h2>
        <Carousel
          items={seriesList}
          visibleItems={visibleItems}
          page={seriesPage}
          onNext={() =>
            setSeriesPage((prev) =>
              prev + 1 < totalSeriesPages ? prev + 1 : 0
            )
          }
          onPrev={() =>
            setSeriesPage(
              (prev) => (prev - 1 + totalSeriesPages) % totalSeriesPages
            )
          }
        />
      </div>

      <div className="my-6">
        <h2 className="text-4xl font-semibold mb-6 ml-8">Películas para ti</h2>
        <Carousel
          items={moviesList}
          visibleItems={visibleItems}
          page={moviesPage}
          onNext={() =>
            setMoviesPage((prev) =>
              prev + 1 < totalMoviesPages ? prev + 1 : 0
            )
          }
          onPrev={() =>
            setMoviesPage(
              (prev) => (prev - 1 + totalMoviesPages) % totalMoviesPages
            )
          }
        />
      </div>

      <Footer />
    </div>
  );
};

export default HomeScreen;
