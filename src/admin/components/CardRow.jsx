import React from "react";

// Importa las imágenes directamente al inicio del archivo
import avengers from "../assets/imgs/avengers.jpg";
import frozen from "../assets/imgs/frozenII.jpg";
import darkKnight from "../assets/imgs/darkKnight.jpg";
import breakingBad from "../assets/imgs/breakingBad.jpg";
import strangerThings from "../assets/imgs/strangerThings.jpg";
import got from "../assets/imgs/got.jpg";

// Crea un objeto con las imágenes
const images = {
  "avengers.jpg": avengers,
  "frozenII.jpg": frozen,
  "darkKnight.jpg": darkKnight,
  "breakingBad.jpg": breakingBad,
  "strangerThings.jpg": strangerThings,
  "got.jpg": got,
};

const CardRow = ({ image, title, genre, price, duration, rating }) => {
  return (
    <div className="flex items-center bg-gray-700 rounded-lg p-4 text-center">
      <div className="w-1/5 flex justify-center">
        {/* Usar las imágenes importadas directamente */}
        <img
          src={images[image]} // Usar el nombre de la imagen del archivo JSON
          alt={title}
          className="w-12 h-16 rounded"
        />
      </div>
      <div className="w-1/5">{title}</div>
      <div className="w-1/5">{genre}</div>
      <div className="w-1/5">{price}</div>
      <div className="w-1/5">{duration}</div>
      <div className="w-1/5">{rating}</div>
    </div>
  );
};

export default CardRow;
