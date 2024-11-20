import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DetailScreen = () => {
  const { title } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const image = queryParams.get("image");
  const description =
    queryParams.get("description") || "Descripción no disponible.";
  const releaseDate = queryParams.get("releaseDate") || "N/A";
  const genre = queryParams.get("genre") || "No especificado";
  const rating = queryParams.get("rating") || "Sin clasificar";

  return (
    <div className="bg-azulprincipal text-white">
      <Navbar />
      <div className="h-screen w-full mb-36">
        <div
          className="relative h-[75vh] bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-azulprincipal"></div>
        </div>
        <div className="relative">
          <div className="absolute bottom-5 left-5 flex w-1/6 justify-evenly">
            <h1 className="bottom-5 left-5 text-xl font-bold">VER AHORA</h1>
            <h1 className="bottom-5 left-5 text-xl font-bold">DETALLES</h1>
          </div>
          <hr className="border-t border-gray-300 mx-10" />
        </div>
        <div className="pt-8 px-16">
          <h1 className="bottom-5 left-5 text-4xl font-bold">{title}</h1>
          <p className="text-lg mt-7 mr-5">{description}</p>
          <div className="flex md:flex-row mr-36 mt-8">
            <div className="mt-7 flex w-full justify-between">
              <p className="flex flex-col">
                <strong className="text-xl">Fecha de estreno:</strong>
                {releaseDate}
              </p>
              <p className="flex flex-col">
                <strong className="text-xl">Género:</strong>
                {genre}
              </p>
              <p className="flex flex-col">
                <strong className="text-xl">Clasificación:</strong>
                {rating}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailScreen;
