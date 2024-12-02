import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Carousel from "../components/Carousel";

const MoviesScreen = () => {
  const [visibleItems, setVisibleItems] = useState(5);
  const [carouselStates, setCarouselStates] = useState({
    trending: 0,
    action: 0,
    romance: 0,
    sciFi: 0,
  });
  const [moviesByGenre, setMoviesByGenre] = useState({
    action: [],
    romance: [],
    sciFi: [],
    trending: [],
  });

  const API_KEY = "fe327da4"; // Reemplaza con tu API Key de OMDb

  const genres = ["action", "romance", "sciFi"];

  // Fetching movies by genre from OMDb API
  const fetchMoviesByGenre = async (genre) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${genre}&type=movie`
      );
      const result = await response.json();

      if (result.Response === "True") {
        return result.Search;
      } else {
        console.log(`No movies found for genre: ${genre}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      return [];
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=trending&type=movie`
      );
      const result = await response.json();
      if (result.Response === "True") {
        return result.Search;
      }
      return [];
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      const trending = await fetchTrendingMovies();
      setMoviesByGenre((prev) => ({
        ...prev,
        trending,
      }));

      for (const genre of genres) {
        const genreMovies = await fetchMoviesByGenre(genre);
        setMoviesByGenre((prev) => ({
          ...prev,
          [genre]: genreMovies,
        }));
      }
    };

    loadMovies();
  }, []);

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

  const handleNext = (carousel) => {
    const itemList = carousel === "trending" ? moviesByGenre.trending : moviesByGenre[carousel];
    setCarouselStates((prev) => ({
      ...prev,
      [carousel]:
        prev[carousel] + 1 < Math.ceil(itemList.length / visibleItems)
          ? prev[carousel] + 1
          : 0,
    }));
  };

  const handlePrev = (carousel) => {
    const itemList = carousel === "trending" ? moviesByGenre.trending : moviesByGenre[carousel];
    setCarouselStates((prev) => ({
      ...prev,
      [carousel]:
        (prev[carousel] - 1 + Math.ceil(itemList.length / visibleItems)) %
        Math.ceil(itemList.length / visibleItems),
    }));
  };

  return (
    <div className="bg-azulprincipal text-white">
      <div
        className="relative h-[60vh] bg-cover bg-top"
        style={{ backgroundImage: "url('/peliculas/inception.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-azulprincipal"></div>
        <div className="relative flex flex-col items-start justify-center h-full ml-24">
          <div className="place-items-center">
            <h1 className="text-8xl font-tituloPeliHome2 mb-8">Inception</h1>
            <Button text="Ver ahora" styleType="secundary" />
          </div>
        </div>
      </div>

      <div className="my-6">
        <h2 className="text-4xl font-semibold mb-6 ml-8">Películas populares</h2>
        <Carousel
          items={moviesByGenre.trending}
          visibleItems={visibleItems}
          page={carouselStates.trending}
          onNext={() => handleNext("trending")}
          onPrev={() => handlePrev("trending")}
        />
      </div>

      {Object.entries(moviesByGenre).map(([genre, items]) =>
        genre !== "trending" && items.length > 0 ? (
          <div key={genre} className="my-6">
            <h2 className="text-4xl font-semibold mb-6 ml-8 capitalize">
              {genre === "action"
                ? "Acción"
                : genre === "romance"
                ? "Romance"
                : "Ciencia Ficción"}
            </h2>
            <Carousel
              items={items}
              visibleItems={visibleItems}
              page={carouselStates[genre]}
              onNext={() => handleNext(genre)}
              onPrev={() => handlePrev(genre)}
            />
          </div>
        ) : null
      )}

      <Footer />
    </div>
  );
};

export default MoviesScreen;
