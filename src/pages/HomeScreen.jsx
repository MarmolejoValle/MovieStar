import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Carousel from "../components/Carousel";
import { IP_API } from "../../config";

const HomeScreen = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [promotionsList, setPromotionsList] = useState([]);
  const [genreLists, setGenreLists] = useState({});
  const [seriesPage, setSeriesPage] = useState(0);
  const [moviesPage, setMoviesPage] = useState(0);
  const [promoPage, setPromoPage] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);
  const [loading, setLoading] = useState(true);

  const API_KEY = "fe327da4"; // Reemplaza con tu API Key de OMDb
  // const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];
  const genres = ["Action"];

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(
          `${IP_API}/api/promotion/viewAll`
        );
        const result = await response.json();

        const today = new Date();
        const activePromotions = result.filter((promo) => {
          const startDate = new Date(promo.date_start);
          const endDate = new Date(promo.date_end);
          return today >= startDate && today <= endDate;
        });

        const promosWithDetails = await Promise.all(
          activePromotions.map(async (promo) => {
            try {
              const movieResponse = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&i=${promo.id_movie}`
              );
              const movieData = await movieResponse.json();
                          


              if (movieData.Response === "True") {
                return {
                  ...promo,
                  id: promo.id_movie,
                  title: movieData.Title,
                  poster: movieData.Poster,
                  year: movieData.Year,
                };
              }
              return null;
            } catch (error) {
              console.error(
                "Error fetching movie details for promotion:",
                error
              );
              return null;
            }
          })
        );

        setPromotionsList(promosWithDetails.filter((promo) => promo !== null));
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    const fetchRandomData = async (type) => {
      const randomWords = ["avengers", "man", "dark", "game", "war"];
      let attempts = 0;
      let data = [];

      while (attempts < 5 && data.length === 0) {
        try {
          const randomWord =
            randomWords[Math.floor(Math.random() * randomWords.length)];
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${randomWord}&type=${type}`
          );
          const result = await response.json();

          if (result.Response === "True") {
            data = result.Search.sort(() => Math.random() - 0.5).slice(0, 10);
          } else {
            attempts++;
          }
        } catch (error) {
          console.error("Error fetching random data:", error);
          attempts++;
        }
      }

      return data;
    };

    const fetchContent = async () => {
      setLoading(true);
      const seriesData = await fetchRandomData("series");
      const moviesData = await fetchRandomData("movie");
      const genreData = {};

      for (const genre of genres) {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${genre}&type=movie`
          );
          const result = await response.json();

          if (result.Response === "True") {
            genreData[genre] = result.Search.sort(
              () => Math.random() - 0.5
            ).slice(0, 10);
          } else {
            genreData[genre] = [];
          }
        } catch (error) {
          console.error(`Error fetching genre data for ${genre}:`, error);
          genreData[genre] = [];
        }
      }

      await fetchPromotions();

      setSeriesList(seriesData);
      setMoviesList(moviesData);
      setGenreLists(genreData);
      setLoading(false);
      
    };

    fetchContent();
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

  const totalPromoPages = Math.ceil(promotionsList.length / visibleItems);
  const totalSeriesPages = Math.ceil(seriesList.length / visibleItems);
  const totalMoviesPages = Math.ceil(moviesList.length / visibleItems);

  if (loading) {
    return (
      <div className="text-white text-center mt-10">Cargando contenido...</div>
    );
  }

  return (
    <div className="bg-azulprincipal text-white">
      {/* Imagen destacada */}
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

      {/* Carrusel de promociones */}
      <div className="my-6">
        <h2 className="text-4xl font-semibold mb-6 ml-8">
          Series y películas en promoción
        </h2>
        <Carousel
          items={promotionsList.map((promo) => ({
            ...promo,
            Poster: promo.poster || "https://via.placeholder.com/300",
            Title: promo.title || "Sin título",
            Year: promo.year || "Sin año",
            Discount: promo.discount || 0,
            typeDiscount: promo.type === "Compra" || promo.type === "Renta"
              ? promo.type
              : "Renta", // Valor predeterminado si no viene el tipo
          }))}
          visibleItems={visibleItems}
          page={promoPage}
          onNext={() =>
            setPromoPage((prev) => (prev + 1 < totalPromoPages ? prev + 1 : 0))
          }
          onPrev={() =>
            setPromoPage(
              (prev) => (prev - 1 + totalPromoPages) % totalPromoPages
            )
          }
        />
      </div>

      {/* Carrusel de series */}
      <div className="my-6">
        <h2 className="text-4xl font-semibold mb-6 ml-8">Series para ti</h2>
        <Carousel
          items={seriesList.map((item) => ({
            ...item,
            imageUrl: item.Poster,
            title: item.Title,
            year: item.Year,
          }))}
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

      {/* Carrusel de películas */}
      <div className="my-6">
        <h2 className="text-4xl font-semibold mb-6 ml-8">Películas para ti</h2>
        <Carousel
          items={moviesList.map((item) => ({
            ...item,
            imageUrl: item.Poster,
            title: item.Title,
            year: item.Year,
          }))}
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

      {/* Carruseles por género */}
      {Object.entries(genreLists).map(([genre, items]) => (
        <div className="my-6" key={genre}>
          <h2 className="text-4xl font-semibold mb-6 ml-8">{genre}</h2>
          <Carousel
            items={items.map((item) => ({
              ...item,
              imageUrl: item.Poster,
              title: item.Title,
              year: item.Year,
            }))}
            visibleItems={visibleItems}
          />
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default HomeScreen;
