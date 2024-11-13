import React, { useState } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";

const CategorySelection = ({ onBack }) => {
  const categories = [
    "Acción",
    "Comedia",
    "Drama",
    "Ciencia ficción",
    "Suspenso",
    "Terror",
    "Romance",
    "Aventura",
    "Animación",
    "Documentales",
    "Fantasía",
    "Misterio",
    "Familia",
    "Musicales",
    "Crimen",
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      if (selectedCategories.length < 5) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const handleSubmit = () => {
    console.log("Categorías seleccionadas:", selectedCategories);
  };

  return (
    <div>
      <img
        src="/LOGO-MS.png"
        alt="Logo de la Empresa"
        className="absolute top-8 left-16 h-20 w-auto"
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-azulprincipal text-white">
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button onClick={onBack} className="text-white mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <h1 className="text-5xl font-semibold">
            Selecciona tus categorías de películas favoritas
          </h1>
        </div>
        <div className="place-items-end">
          <div className="mt-16 mb-6 bg-white p-9 pt-5 rounded-3xl text-black place-items-center text-2xl">
            <div>
              <p className="text-black mb-7">
                Elige <span className="font-bold">solo 5</span> categorías que
                más te gusten para recibir recomendaciones personalizadas.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-x-24 gap-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    disabled={
                      !selectedCategories.includes(category) &&
                      selectedCategories.length >= 5
                    }
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
          <Button
            text="Crear Cuenta"
            styleType="primary"
            onClick={handleSubmit}
            className="mt-8"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategorySelection;
