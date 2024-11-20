import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
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
    ],
    comedy: [
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
    ],
    thriller: [
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
    ],
  };

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
      <Navbar />
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
