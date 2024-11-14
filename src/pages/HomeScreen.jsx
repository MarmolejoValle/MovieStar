import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

const HomeScreen = () => {
  const [seriesPage, setSeriesPage] = useState(0);
  const [moviesPage, setMoviesPage] = useState(0);
  const itemsPerPage = 5; // Número de elementos completos que queremos mostrar por página
  const visibleNextItem = 1; // Número de elementos parciales visibles en la siguiente página

  const seriesList = [
    { title: "Breaking Bad", image: "/series/breakingbad.png" },
    { title: "The Office", image: "/series/theoffice.png" },
    { title: "The Big Bang Theory", image: "/series/bigbang.png" },
    { title: "Better Call Saul", image: "/series/bettercallsaul.png" },
    { title: "Peaky Blinders", image: "/series/peakyblinders.png" },
    { title: "Friends", image: "/series/friends.png" },
    { title: "Stranger Things", image: "/series/strangerthings.png" },
    { title: "Dark", image: "/series/dark.png" },
    { title: "Mindhunter", image: "/series/mindhunter.png" },
    { title: "Narcos", image: "/series/narcos.png" },
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
  ];

  const handleNextSeries = () => {
    if (seriesPage < Math.ceil(seriesList.length / (itemsPerPage + visibleNextItem)) - 1) {
      setSeriesPage(seriesPage + 1);
    }
  };

  const handlePrevSeries = () => {
    if (seriesPage > 0) {
      setSeriesPage(seriesPage - 1);
    }
  };

  const handleNextMovies = () => {
    if (moviesPage < Math.ceil(moviesList.length / (itemsPerPage + visibleNextItem)) - 1) {
      setMoviesPage(moviesPage + 1);
    }
  };

  const handlePrevMovies = () => {
    if (moviesPage > 0) {
      setMoviesPage(moviesPage - 1);
    }
  };

  const getTransformValue = (page, itemsCount) => {
    const itemWidthPercentage = 100 / (itemsPerPage + visibleNextItem);
    return `translateX(-${page * itemWidthPercentage * (itemsPerPage + visibleNextItem)}%)`;
  };

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
        <div className="relative flex items-center">
          <button onClick={handlePrevSeries} className="text-white p-2">
            ◀
          </button>
          <div className="overflow-hidden w-full relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: getTransformValue(seriesPage, seriesList.length),
                width: `${(seriesList.length / (itemsPerPage + visibleNextItem)) * 100}%`,
              }}
            >
              {seriesList.map((serie, index) => (
                <div key={index} className="min-w-[300px] p-2">
                  <img
                    src={serie.image}
                    alt={serie.title}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleNextSeries} className="text-white p-2">
            ▶
          </button>
        </div>
      </div>

      <div className="px-8 mt-11">
        <h2 className="text-4xl font-semibold mb-6">Películas para ti</h2>
        <div className="relative flex items-center">
          <button onClick={handlePrevMovies} className="text-white p-2">
            ◀
          </button>
          <div className="overflow-hidden w-full relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: getTransformValue(moviesPage, moviesList.length),
                width: `${(moviesList.length / (itemsPerPage + visibleNextItem)) * 100}%`,
              }}
            >
              {moviesList.map((movie, index) => (
                <div key={index} className="min-w-[300px] p-2">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleNextMovies} className="text-white p-2">
            ▶
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomeScreen;
