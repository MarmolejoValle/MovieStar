import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomeScreen = () => {
  const seriesList = [
    { title: 'Breaking Bad', image: '/series/breakingbad.png' },
    { title: 'The Office', image: '/series/theoffice.png' },
    { title: 'The Big Bang Theory', image: '/series/bigbang.png' },
    { title: 'Better Call Saul', image: '/series/bettercallsaul.png' },
    { title: 'Peaky Blinders', image: '/series/peakyblinders.png' },
  ];

  const moviesList = [
    { title: 'About Time', image: '/peliculas/abouttime.png' },
    { title: 'Father', image: '/peliculas/father.png' },
    { title: 'Tokyo Drift', image: '/peliculas/tokyodrift.png' },
    { title: 'Spider-Man', image: '/peliculas/spiderman.png' },
    { title: 'Avengers', image: '/peliculas/avengers.png' },
  ];

  return (
    <div className="bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Banner principal */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('/peliculas/yourname_background.png')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold">your name</h1>
          <p className="text-lg mt-2">君の名は</p>
          <button className="mt-4 bg-white text-black font-semibold px-6 py-2 rounded-full">Reproducir</button>
        </div>
      </div>

      {/* Series para ti */}
      <div className="px-8 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Series para ti</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {seriesList.map((serie, index) => (
            <div key={index} className="min-w-[200px]">
              <img src={serie.image} alt={serie.title} className="w-full h-auto rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Películas para ti */}
      <div className="px-8 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Películas para ti</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {moviesList.map((movie, index) => (
            <div key={index} className="min-w-[200px]">
              <img src={movie.image} alt={movie.title} className="w-full h-auto rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeScreen;
