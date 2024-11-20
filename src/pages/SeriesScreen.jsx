import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Carousel from "../components/Carousel";

const SeriesScreen = () => {
  const [visibleItems, setVisibleItems] = useState(5);
  const [carouselStates, setCarouselStates] = useState({
    series: 0,
    drama: 0,
    comedy: 0,
    thriller: 0,
  });

  const seriesByGenre = {
    drama: [
      {
        "title": "Breaking Bad",
        "image": "/series/breakingbad.jpg",
        "description": "Breaking Bad es una serie dramática que sigue la transformación de Walter White, un profesor de química convertido en narcotraficante, después de ser diagnosticado con cáncer. A medida que se involucra en el mundo de las drogas, su vida  y la de su familia se ven profundamente afectadas. La serie destaca por su narrativa intensa, desarrollo de personajes complejos, y un enfoque en temas como la ambición, la moralidad y la consecuencia de las decisiones. Protagonizada por Bryan Cranston y Aaron Paul, es considerada una de las mejores series de la televisión.",
        "releaseDate": "2008",
        "genre": "Drama, Thriller, Crimen",
        "rating": "+16"
      },
      {
        "title": "Better Call Saul",
        "image": "/series/bettercallsaul.png",
        "description": "Better Call Saul es una precuela de Breaking Bad que narra la evolución de Jimmy McGill, un abogado de poca monta que se convierte en el inescrupuloso Saul Goodman. La serie combina drama legal con momentos de humor negro.",
        "releaseDate": "2015",
        "genre": "Drama, Crimen",
        "rating": "+16"
      },
      {
        "title": "Peaky Blinders",
        "image": "/series/peakyblinders.png",
        "description": "Peaky Blinders sigue las hazañas de la familia Shelby en el Birmingham de la posguerra. Conocidos por sus trajes elegantes y su brutalidad, los Shelby buscan expandir su imperio mientras enfrentan enemigos y traiciones.",
        "releaseDate": "2013",
        "genre": "Drama, Crimen, Histórico",
        "rating": "+16"
      },
      {
        "title": "Stranger Things",
        "image": "/series/strangerthings.png",
        "description": "Stranger Things combina ciencia ficción y nostalgia ochentera en una historia donde un grupo de niños se enfrenta a fenómenos paranormales y monstruos provenientes de otra dimensión, conocida como 'El Otro Lado'.",
        "releaseDate": "2016",
        "genre": "Drama, Ciencia Ficción, Misterio",
        "rating": "+13"
      }
    ],
    comedy: [
      {
        "title": "The Office",
        "image": "/series/theoffice.png",
        "description": "The Office es una comedia de estilo documental que sigue la vida cotidiana de los empleados de Dunder Mifflin, una empresa de papel. Con momentos incómodos y personajes entrañables, la serie se ha convertido en un clásico moderno.",
        "releaseDate": "2005",
        "genre": "Comedia",
        "rating": "Todo público"
      },
      {
        "title": "The Big Bang Theory",
        "image": "/series/bigbang.png",
        "description": "The Big Bang Theory es una comedia que narra las vidas de un grupo de amigos nerds y su interacción con el mundo social, especialmente con Penny, su vecina y opuesta en muchos sentidos.",
        "releaseDate": "2007",
        "genre": "Comedia",
        "rating": "Todo público"
      },
      {
        "title": "Friends",
        "image": "/series/friends.png",
        "description": "Friends es una icónica comedia que sigue las vidas de seis amigos en Nueva York. A lo largo de diez temporadas, exploran relaciones, carreras y la complejidad de la amistad adulta.",
        "releaseDate": "1994",
        "genre": "Comedia, Romance",
        "rating": "Todo público"
      }
    ],
    thriller: [
      {
        "title": "Breaking Bad",
        "image": "/series/breakingbad.jpg",
        "description": "Breaking Bad es una serie dramática que sigue la transformación de Walter White, un profesor de química convertido en narcotraficante, después de ser diagnosticado con cáncer. A medida que se involucra en el mundo de las drogas, su vida  y la de su familia se ven profundamente afectadas. La serie destaca por su narrativa intensa, desarrollo de personajes complejos, y un enfoque en temas como la ambición, la moralidad y la consecuencia de las decisiones. Protagonizada por Bryan Cranston y Aaron Paul, es considerada una de las mejores series de la televisión.",
        "releaseDate": "2008",
        "genre": "Drama, Thriller, Crimen",
        "rating": "+16"
      },
      {
        "title": "Stranger Things",
        "image": "/series/strangerthings.png",
        "description": "Stranger Things combina ciencia ficción y nostalgia ochentera en una historia donde un grupo de niños se enfrenta a fenómenos paranormales y monstruos provenientes de otra dimensión, conocida como 'El Otro Lado'.",
        "releaseDate": "2016",
        "genre": "Drama, Ciencia Ficción, Misterio",
        "rating": "+13"
      }
    ],
  };

  const seriesList = [
    {
      "title": "Breaking Bad",
      "image": "/series/breakingbad.jpg",
      "description": "Breaking Bad es una serie dramática que sigue la transformación de Walter White, un profesor de química convertido en narcotraficante, después de ser diagnosticado con cáncer. A medida que se involucra en el mundo de las drogas, su vida  y la de su familia se ven profundamente afectadas. La serie destaca por su narrativa intensa, desarrollo de personajes complejos, y un enfoque en temas como la ambición, la moralidad y la consecuencia de las decisiones. Protagonizada por Bryan Cranston y Aaron Paul, es considerada una de las mejores series de la televisión.",
      "releaseDate": "2008",
      "genre": "Drama, Thriller, Crimen",
      "rating": "+16"
    },
    {
      "title": "The Office",
      "image": "/series/theoffice.png",
      "description": "The Office es una comedia de estilo documental que sigue la vida cotidiana de los empleados de Dunder Mifflin, una empresa de papel. Con momentos incómodos y personajes entrañables, la serie se ha convertido en un clásico moderno.",
      "releaseDate": "2005",
      "genre": "Comedia",
      "rating": "Todo público"
    },
    {
      "title": "The Big Bang Theory",
      "image": "/series/bigbang.png",
      "description": "The Big Bang Theory es una comedia que narra las vidas de un grupo de amigos nerds y su interacción con el mundo social, especialmente con Penny, su vecina y opuesta en muchos sentidos.",
      "releaseDate": "2007",
      "genre": "Comedia",
      "rating": "Todo público"
    },
    {
      "title": "Better Call Saul",
      "image": "/series/bettercallsaul.png",
      "description": "Better Call Saul es una precuela de Breaking Bad que narra la evolución de Jimmy McGill, un abogado de poca monta que se convierte en el inescrupuloso Saul Goodman. La serie combina drama legal con momentos de humor negro.",
      "releaseDate": "2015",
      "genre": "Drama, Crimen",
      "rating": "+16"
    },
    {
      "title": "Peaky Blinders",
      "image": "/series/peakyblinders.png",
      "description": "Peaky Blinders sigue las hazañas de la familia Shelby en el Birmingham de la posguerra. Conocidos por sus trajes elegantes y su brutalidad, los Shelby buscan expandir su imperio mientras enfrentan enemigos y traiciones.",
      "releaseDate": "2013",
      "genre": "Drama, Crimen, Histórico",
      "rating": "+16"
    },
    {
      "title": "Friends",
      "image": "/series/friends.png",
      "description": "Friends es una icónica comedia que sigue las vidas de seis amigos en Nueva York. A lo largo de diez temporadas, exploran relaciones, carreras y la complejidad de la amistad adulta.",
      "releaseDate": "1994",
      "genre": "Comedia, Romance",
      "rating": "Todo público"
    },
    {
      "title": "Stranger Things",
      "image": "/series/strangerthings.png",
      "description": "Stranger Things combina ciencia ficción y nostalgia ochentera en una historia donde un grupo de niños se enfrenta a fenómenos paranormales y monstruos provenientes de otra dimensión, conocida como 'El Otro Lado'.",
      "releaseDate": "2016",
      "genre": "Drama, Ciencia Ficción, Misterio",
      "rating": "+13"
    }
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
      carousel === "series" ? seriesList : seriesByGenre[carousel];
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
      carousel === "series" ? seriesList : seriesByGenre[carousel];
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

      <div className="my-6">
        <h2 className="text-4xl font-semibold mb-6 ml-8">Series para ti</h2>
        <Carousel
          items={seriesList}
          visibleItems={visibleItems}
          page={carouselStates.series}
          onNext={() => handleNext("series")}
          onPrev={() => handlePrev("series")}
        />
      </div>

      {Object.entries(seriesByGenre).map(([genre, items]) => (
        <div key={genre} className="my-6">
          <h2 className="text-4xl font-semibold mb-6 ml-8 capitalize">
            {genre === "drama"
              ? "Drama"
              : genre === "comedy"
              ? "Comedia"
              : "Thriller"}
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

export default SeriesScreen;
