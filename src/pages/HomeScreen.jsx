import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

const Carousel = ({ items, visibleItems, page, onNext, onPrev }) => {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / visibleItems);

  return (
    <div className="relative flex items-center">
      <button onClick={onPrev} className="text-white p-2" aria-label="Previous">
        ◀
      </button>
      <div className="overflow-hidden w-full relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${page * (100 / totalPages)}%)`,
            width: `${(totalItems / visibleItems) * 100}%`,
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="min-w-[300px] p-2">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <button onClick={onNext} className="text-white p-2" aria-label="Next">
        ▶
      </button>
    </div>
  );
};

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
          <div className="place-items-center">
            <h1 className="text-9xl font-tituloPeliHome">your name</h1>
            <div className="flex w-1/3 justify-between mb-8">
              <p className="text-lg mt-2">君</p>
              <p className="text-lg mt-2">の</p>
              <p className="text-lg mt-2">名</p>
              <p className="text-lg mt-2">は</p>
            </div>
            <Button text="Ver ahora" styleType="secundary" />
          </div>
        </div>
      </div>

      <div className="px-8">
        <h2 className="text-4xl font-semibold mb-6">Series para ti</h2>
        <Carousel
          items={seriesList}
          visibleItems={visibleItems}
          page={seriesPage}
          onNext={() =>
            setSeriesPage((prev) => (prev + 1 < totalSeriesPages ? prev + 1 : 0))
          }
          onPrev={() => setSeriesPage((prev) => (prev - 1 + totalSeriesPages) % totalSeriesPages)}
        />
      </div>

      <div className="px-8 mt-11">
        <h2 className="text-4xl font-semibold mb-6">Películas para ti</h2>
        <Carousel
          items={moviesList}
          visibleItems={visibleItems}
          page={moviesPage}
          onNext={() =>
            setMoviesPage((prev) => (prev + 1 < totalMoviesPages ? prev + 1 : 0))
          }
          onPrev={() => setMoviesPage((prev) => (prev - 1 + totalMoviesPages) % totalMoviesPages)}
        />
      </div>

      <Footer />
    </div>
  );
};

export default HomeScreen;
