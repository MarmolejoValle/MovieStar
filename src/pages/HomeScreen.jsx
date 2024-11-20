import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Carousel from "../components/Carousel";

const HomeScreen = () => {
  const [seriesPage, setSeriesPage] = useState(0);
  const [moviesPage, setMoviesPage] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);

  const seriesList = [
    {
      title: "Breaking Bad",
      image: "/series/breakingbad.jpg",
      description:
        "Breaking Bad es una serie dramática que sigue la transformación de Walter White, un profesor de química convertido en narcotraficante, después de ser diagnosticado con cáncer. A medida que se involucra en el mundo de las drogas, su vida  y la de su familia se ven profundamente afectadas. La serie destaca por su narrativa intensa, desarrollo de personajes complejos, y un enfoque en temas como la ambición, la moralidad y la consecuencia de las decisiones. Protagonizada por Bryan Cranston y Aaron Paul, es considerada una de las mejores series de la televisión.",
      releaseDate: "2008",
      genre: "Drama criminal, Suspenso",
      rating: "+18",
    },
    {
      title: "The Office",
      image: "/series/theoffice.png",
      description:
        "The Office es una comedia que sigue el día a día en una oficina, liderada por el excéntrico Michael Scott.",
      releaseDate: "2005",
      genre: "Comedia, Sitcom",
      rating: "Todo público",
    },
    {
      title: "The Big Bang Theory",
      image: "/series/bigbang.png",
      description:
        "Una serie cómica que narra las experiencias de un grupo de amigos nerds mientras exploran el amor, la amistad y la ciencia.",
      releaseDate: "2007",
      genre: "Comedia, Sitcom",
      rating: "Todo público",
    },
    {
      title: "Better Call Saul",
      image: "/series/bettercallsaul.png",
      description:
        "Precuela de Breaking Bad que explora la vida de Jimmy McGill antes de convertirse en el abogado Saul Goodman.",
      releaseDate: "2015",
      genre: "Drama, Crimen",
      rating: "+18",
    },
    {
      title: "Peaky Blinders",
      image: "/series/peakyblinders.png",
      description:
        "Un drama histórico que sigue a la familia Shelby, un clan de gánsteres en el Birmingham de principios del siglo XX.",
      releaseDate: "2013",
      genre: "Drama histórico, Crimen",
      rating: "+16",
    },
    {
      title: "Friends",
      image: "/series/friends.png",
      description:
        "Una comedia sobre un grupo de amigos que navegan por la vida y el amor en Nueva York.",
      releaseDate: "1994",
      genre: "Comedia, Sitcom",
      rating: "Todo público",
    },
    {
      title: "Stranger Things",
      image: "/series/strangerthings.png",
      description:
        "Una serie de ciencia ficción que mezcla misterio y aventuras cuando un grupo de niños descubre experimentos secretos del gobierno.",
      releaseDate: "2016",
      genre: "Ciencia ficción, Suspenso",
      rating: "+13",
    },
  ];

  const moviesList = [
    {
      title: "About Time",
      image: "/peliculas/abouttime.png",
      description:
        "Una emotiva película sobre un hombre que descubre que puede viajar en el tiempo y utiliza este poder para mejorar su vida amorosa.",
      releaseDate: "2013",
      genre: "Romance, Fantasía",
      rating: "Todo público",
    },
    {
      title: "Father",
      image: "/peliculas/father.png",
      description:
        "Un drama conmovedor sobre un hombre mayor que lucha contra la pérdida de la memoria mientras su hija trata de apoyarlo.",
      releaseDate: "2020",
      genre: "Drama",
      rating: "+13",
    },
    {
      title: "Tokyo Drift",
      image: "/peliculas/tokyodrift.png",
      description:
        "La tercera entrega de la franquicia Rápidos y Furiosos, que lleva las carreras ilegales al mundo de Tokio.",
      releaseDate: "2006",
      genre: "Acción, Aventura",
      rating: "Todo público",
    },
    {
      title: "Spider-Man",
      image: "/peliculas/spiderman.png",
      description:
        "La historia de Peter Parker, quien obtiene poderes arácnidos y lucha contra el crimen como Spider-Man.",
      releaseDate: "2002",
      genre: "Acción, Aventura",
      rating: "Todo público",
    },
    {
      title: "Avengers",
      image: "/peliculas/avengers.png",
      description:
        "Un grupo de superhéroes se une para proteger al mundo de amenazas inimaginables.",
      releaseDate: "2012",
      genre: "Acción, Ciencia ficción",
      rating: "Todo público",
    },
    {
      title: "About Time",
      image: "/peliculas/abouttime.png",
      description:
        "Una emotiva película sobre un hombre que descubre que puede viajar en el tiempo y utiliza este poder para mejorar su vida amorosa.",
      releaseDate: "2013",
      genre: "Romance, Fantasía",
      rating: "Todo público",
    },
    {
      title: "Father",
      image: "/peliculas/father.png",
      description:
        "Un drama conmovedor sobre un hombre mayor que lucha contra la pérdida de la memoria mientras su hija trata de apoyarlo.",
      releaseDate: "2020",
      genre: "Drama",
      rating: "+13",
    },
    {
      title: "Tokyo Drift",
      image: "/peliculas/tokyodrift.png",
      description:
        "La tercera entrega de la franquicia Rápidos y Furiosos, que lleva las carreras ilegales al mundo de Tokio.",
      releaseDate: "2006",
      genre: "Acción, Aventura",
      rating: "Todo público",
    },
    {
      title: "Spider-Man",
      image: "/peliculas/spiderman.png",
      description:
        "La historia de Peter Parker, quien obtiene poderes arácnidos y lucha contra el crimen como Spider-Man.",
      releaseDate: "2002",
      genre: "Acción, Aventura",
      rating: "Todo público",
    },
    {
      title: "Avengers",
      image: "/peliculas/avengers.png",
      description:
        "Un grupo de superhéroes se une para proteger al mundo de amenazas inimaginables.",
      releaseDate: "2012",
      genre: "Acción, Ciencia ficción",
      rating: "Todo público",
    },
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
