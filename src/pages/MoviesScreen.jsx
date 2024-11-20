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

  const moviesByGenre = {
    action: [
      {
        title: "Inception",
        image: "/peliculas/inception.jpg",
        description:
          "Inception es un emocionante thriller de ciencia ficción dirigido por Christopher Nolan que explora el mundo de los sueños. Dom Cobb, un ladrón especializado en infiltrarse en los subconscientes de sus objetivos, recibe una oportunidad única para redimirse: implantar una idea en la mente de un empresario a través del concepto de 'inception'.",
        releaseDate: "2010",
        genre: "Acción, Ciencia ficción, Suspenso",
        rating: "+13",
      },
      {
        title: "Mad Max: Fury Road",
        image: "/peliculas/madmax.jpg",
        description:
          "Mad Max: Fury Road es una película postapocalíptica llena de acción y adrenalina, donde Max Rockatansky une fuerzas con Imperator Furiosa para escapar de Immortan Joe y liberar a su pueblo. Con impactantes escenas de persecución, esta película es un espectáculo visual y narrativo.",
        releaseDate: "2015",
        genre: "Acción, Aventura",
        rating: "+16",
      },
      {
        title: "Gladiator",
        image: "/peliculas/gladiator.jpg",
        description:
          "Gladiator es un épico drama histórico dirigido por Ridley Scott que narra la historia de Maximus, un general romano traicionado que busca venganza contra el corrupto emperador Cómodo. Convertido en gladiador, lucha por recuperar su honor y su libertad.",
        releaseDate: "2000",
        genre: "Acción, Drama histórico",
        rating: "+16",
      },
    ],
    romance: [
      {
        title: "About Time",
        image: "/peliculas/abouttime.png",
        description:
          "About Time es una conmovedora historia romántica que sigue a Tim Lake, un joven que descubre que puede viajar en el tiempo. A través de sus viajes, Tim intenta conquistar a Mary y aprende valiosas lecciones sobre la vida, el amor y la familia.",
        releaseDate: "2013",
        genre: "Romance, Fantasía",
        rating: "Todo público",
      },
      {
        title: "Father",
        image: "/peliculas/father.png",
        description:
          "The Father es un poderoso drama que retrata la lucha de un hombre mayor con la pérdida de la memoria. A través de una narrativa conmovedora y actuaciones impecables, la película explora las complejidades de la vejez y las relaciones familiares.",
        releaseDate: "2020",
        genre: "Drama",
        rating: "+13",
      },
      {
        title: "Tokyo Drift",
        image: "/peliculas/tokyodrift.png",
        description:
          "The Fast and the Furious: Tokyo Drift nos transporta al mundo de las carreras ilegales en Tokio, donde Sean Boswell se adentra en la cultura del drifting para redimirse y encontrar su lugar en un nuevo entorno.",
        releaseDate: "2006",
        genre: "Acción, Aventura",
        rating: "Todo público",
      },
      {
        title: "Spider-Man",
        image: "/peliculas/spiderman.png",
        description:
          "Spider-Man cuenta la historia de Peter Parker, un estudiante tímido que adquiere habilidades arácnidas tras ser mordido por una araña modificada genéticamente. Usará estos poderes para enfrentarse al Duende Verde y proteger a Nueva York.",
        releaseDate: "2002",
        genre: "Acción, Aventura",
        rating: "Todo público",
      },
    ],
    sciFi: [
      {
        title: "Avengers",
        image: "/peliculas/avengers.png",
        description:
          "The Avengers reúne a los superhéroes más icónicos del universo Marvel para enfrentar una amenaza global: Loki, el dios de la travesura, que intenta conquistar la Tierra. Con acción, humor y un elenco estelar, esta película marcó un hito en el cine de superhéroes.",
        releaseDate: "2012",
        genre: "Acción, Ciencia ficción",
        rating: "Todo público",
      },
    ],
  };

  const trendingMovies = [
    {
      title: "About Time",
      image: "/peliculas/abouttime.png",
      description:
        "About Time es una conmovedora historia romántica que sigue a Tim Lake, un joven que descubre que puede viajar en el tiempo. A través de sus viajes, Tim intenta conquistar a Mary y aprende valiosas lecciones sobre la vida, el amor y la familia.",
      releaseDate: "2013",
      genre: "Romance, Fantasía",
      rating: "Todo público",
    },
    {
      title: "Father",
      image: "/peliculas/father.png",
      description:
        "The Father es un poderoso drama que retrata la lucha de un hombre mayor con la pérdida de la memoria. A través de una narrativa conmovedora y actuaciones impecables, la película explora las complejidades de la vejez y las relaciones familiares.",
      releaseDate: "2020",
      genre: "Drama",
      rating: "+13",
    },
    {
      title: "Tokyo Drift",
      image: "/peliculas/tokyodrift.png",
      description:
        "The Fast and the Furious: Tokyo Drift nos transporta al mundo de las carreras ilegales en Tokio, donde Sean Boswell se adentra en la cultura del drifting para redimirse y encontrar su lugar en un nuevo entorno.",
      releaseDate: "2006",
      genre: "Acción, Aventura",
      rating: "Todo público",
    },
    {
      title: "Spider-Man",
      image: "/peliculas/spiderman.png",
      description:
        "Spider-Man cuenta la historia de Peter Parker, un estudiante tímido que adquiere habilidades arácnidas tras ser mordido por una araña modificada genéticamente. Usará estos poderes para enfrentarse al Duende Verde y proteger a Nueva York.",
      releaseDate: "2002",
      genre: "Acción, Aventura",
      rating: "Todo público",
    },
    {
      title: "Avengers",
      image: "/peliculas/avengers.png",
      description:
        "The Avengers reúne a los superhéroes más icónicos del universo Marvel para enfrentar una amenaza global: Loki, el dios de la travesura, que intenta conquistar la Tierra. Con acción, humor y un elenco estelar, esta película marcó un hito en el cine de superhéroes.",
      releaseDate: "2012",
      genre: "Acción, Ciencia ficción",
      rating: "Todo público",
    },
    {
      title: "About Time",
      image: "/peliculas/abouttime.png",
      description:
        "About Time es una conmovedora historia romántica que sigue a Tim Lake, un joven que descubre que puede viajar en el tiempo. A través de sus viajes, Tim intenta conquistar a Mary y aprende valiosas lecciones sobre la vida, el amor y la familia.",
      releaseDate: "2013",
      genre: "Romance, Fantasía",
      rating: "Todo público",
    },
    {
      title: "Father",
      image: "/peliculas/father.png",
      description:
        "The Father es un poderoso drama que retrata la lucha de un hombre mayor con la pérdida de la memoria. A través de una narrativa conmovedora y actuaciones impecables, la película explora las complejidades de la vejez y las relaciones familiares.",
      releaseDate: "2020",
      genre: "Drama",
      rating: "+13",
    },
    {
      title: "Tokyo Drift",
      image: "/peliculas/tokyodrift.png",
      description:
        "The Fast and the Furious: Tokyo Drift nos transporta al mundo de las carreras ilegales en Tokio, donde Sean Boswell se adentra en la cultura del drifting para redimirse y encontrar su lugar en un nuevo entorno.",
      releaseDate: "2006",
      genre: "Acción, Aventura",
      rating: "Todo público",
    },
    {
      title: "Spider-Man",
      image: "/peliculas/spiderman.png",
      description:
        "Spider-Man cuenta la historia de Peter Parker, un estudiante tímido que adquiere habilidades arácnidas tras ser mordido por una araña modificada genéticamente. Usará estos poderes para enfrentarse al Duende Verde y proteger a Nueva York.",
      releaseDate: "2002",
      genre: "Acción, Aventura",
      rating: "Todo público",
    },
    {
      title: "Avengers",
      image: "/peliculas/avengers.png",
      description:
        "The Avengers reúne a los superhéroes más icónicos del universo Marvel para enfrentar una amenaza global: Loki, el dios de la travesura, que intenta conquistar la Tierra. Con acción, humor y un elenco estelar, esta película marcó un hito en el cine de superhéroes.",
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
        <h2 className="text-4xl font-semibold mb-6 ml-8">
          Películas populares
        </h2>
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
