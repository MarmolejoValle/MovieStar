import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Carousel from "../components/Carousel";

const SeriesScreen = () => {
  const [seriesLists, setSeriesLists] = useState({});
  const [visibleItems, setVisibleItems] = useState(5);
  const [loading, setLoading] = useState(true);

  const API_KEY = "fe327da4"; // Reemplaza con tu API Key de OMDb
  const categories = ["Comedy", "Drama", "Action", "Sci-Fi", "Fantasy"];

  useEffect(() => {
    const fetchSeriesByCategory = async () => {
      const lists = {};

      for (const category of categories) {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${category}&type=series`
          );
          const result = await response.json();

          if (result.Response === "True") {
            lists[category] = result.Search.sort(() => Math.random() - 0.5).slice(0, 10);
          } else {
            lists[category] = [];
          }
        } catch (error) {
          console.error(`Error al obtener series para ${category}:`, error);
          lists[category] = [];
        }
      }

      setSeriesLists(lists);
      setLoading(false);
    };

    fetchSeriesByCategory();
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

  if (loading) {
    return (
      <div className="text-white text-center mt-10">Cargando contenido...</div>
    );
  }

  return (
    <div className="bg-azulprincipal text-white">
      {/* Imagen y texto destacado */}
      <div
        className="relative h-[60vh] bg-cover bg-top"
        style={{ backgroundImage: "url('/series/theOffice2.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-azulprincipal"></div>
        <div className="relative flex flex-col items-start justify-center h-full ml-24">
          <div className="place-items-center">
            <h1 className="text-8xl font-tituloPeliHome2 mb-8">The Office</h1>
            <Button text="Ver ahora" styleType="secundary" />
          </div>
        </div>
      </div>

      {/* Carruseles por categoría */}
      {categories.map((category) => (
        <div className="my-6" key={category}>
          <h2 className="text-4xl font-semibold mb-6 ml-8">{category}</h2>
          {seriesLists[category]?.length === 0 ? (
            <div className="text-white text-center">
              No se encontraron series en la categoría {category}.
            </div>
          ) : (
            <Carousel
              items={seriesLists[category].map((item) => ({
                ...item,
                imageUrl: item.Poster,
                title: item.Title,
                year: item.Year,
                imdbID: item.imdbID,
              }))}
              visibleItems={visibleItems}
            />
          )}
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default SeriesScreen;
