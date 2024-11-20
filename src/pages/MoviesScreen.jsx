import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
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

  const moviesByGenre = {
    action: [
      { title: "Inception", image: "/peliculas/inception.jpg" },
      { title: "Mad Max", image: "/peliculas/madmax.jpg" },
      { title: "Gladiator", image: "/peliculas/gladiator.jpg" },
      { title: "Inception", image: "/peliculas/inception.jpg" },
      { title: "Mad Max", image: "/peliculas/madmax.jpg" },
      { title: "Gladiator", image: "/peliculas/gladiator.jpg" },
      { title: "Inception", image: "/peliculas/inception.jpg" },
      { title: "Mad Max", image: "/peliculas/madmax.jpg" },
      { title: "Gladiator", image: "/peliculas/gladiator.jpg" },
      { title: "Inception", image: "/peliculas/inception.jpg" },
      { title: "Mad Max", image: "/peliculas/madmax.jpg" },
      { title: "Gladiator", image: "/peliculas/gladiator.jpg" },
    ],
    romance: [
        { title: "About Time", image: "/peliculas/abouttime.png" },
        { title: "Father", image: "/peliculas/father.png" },
        { title: "Tokyo Drift", image: "/peliculas/tokyodrift.png" },
        { title: "Spider-Man", image: "/peliculas/spiderman.png" },
        { title: "About Time", image: "/peliculas/abouttime.png" },
        { title: "Father", image: "/peliculas/father.png" },
        { title: "Tokyo Drift", image: "/peliculas/tokyodrift.png" },
        { title: "Spider-Man", image: "/peliculas/spiderman.png" },
        { title: "About Time", image: "/peliculas/abouttime.png" },
        { title: "Father", image: "/peliculas/father.png" },
        { title: "Tokyo Drift", image: "/peliculas/tokyodrift.png" },
        { title: "Spider-Man", image: "/peliculas/spiderman.png" },
    ],
    sciFi: [
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
        { title: "About Time", image: "/peliculas/abouttime.png" },
        { title: "Father", image: "/peliculas/father.png" },
        { title: "Tokyo Drift", image: "/peliculas/tokyodrift.png" },
    ],
  };

  const trendingMovies = [
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

  const handleNext = (carousel) => {
    const itemList =
      carousel === "trending" ? trendingMovies : moviesByGenre[carousel];
    setCarouselStates((prev) => ({
      ...prev,
      [carousel]:
        prev[carousel] + 1 < Math.ceil(itemList.length / visibleItems)
          ? prev[carousel] + 1
          : 0,
    }));
  };

  const handlePrev = (carousel) => {
    const itemList =
      carousel === "trending" ? trendingMovies : moviesByGenre[carousel];
    setCarouselStates((prev) => ({
      ...prev,
      [carousel]:
        (prev[carousel] - 1 + Math.ceil(itemList.length / visibleItems)) %
        Math.ceil(itemList.length / visibleItems),
    }));
  };

  return (
    <div className="bg-azulprincipal text-white">
      <Navbar />
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
          items={trendingMovies}
          visibleItems={visibleItems}
          page={carouselStates.trending}
          onNext={() => handleNext("trending")}
          onPrev={() => handlePrev("trending")}
        />
      </div>

      {Object.entries(moviesByGenre).map(([genre, items]) => (
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
      ))}

      <Footer />
    </div>
  );
};

export default MoviesScreen;
