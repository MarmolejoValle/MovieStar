import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

const SeriesScreen = () => {
  const [seriesPage, setSeriesPage] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);

  const seriesList = [
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

  const totalSeriesPages = Math.ceil(seriesList.length / visibleItems);

  return (
    <div className="bg-azulprincipal text-white">
      <Navbar />
      <div className="my-6">
        <h1 className="text-4xl font-semibold mb-6 ml-8">Series más populares</h1>
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
      <Footer />
    </div>
  );
};

export default SeriesScreen;
