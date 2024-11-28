import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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

  const [activeTab, setActiveTab] = useState("DETALLES");
  const [fade, setFade] = useState(true);

  const handleTabChange = (tab) => {
    setFade(false); // Inicia el desvanecimiento de salida
    setTimeout(() => {
      setActiveTab(tab); // Cambia el contenido después del desvanecimiento
      setFade(true); // Activa el desvanecimiento de entrada
    }, 300); // Tiempo de la transición (en milisegundos)
  };

  return (
    <div className="bg-azulprincipal text-white">
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
            <h1
              onClick={() => handleTabChange("DETALLES")}
              className={`cursor-pointer text-xl  transition-all ${
                activeTab === "DETALLES" ? "font-extrabold	" : "text-white"
              }`}
            >
              DETALLES
            </h1>
            <h1
              onClick={() => handleTabChange("VER AHORA")}
              className={`cursor-pointer text-xl transition-all ${
                activeTab === "VER AHORA" ? "font-extrabold	" : "text-white"
              }`}
            >
              VER AHORA
            </h1>
          </div>
          <hr className="border-t border-gray-300 mx-10" />
        </div>
        <div className={`pt-8 px-16 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
          {activeTab === "DETALLES" ? (
            <>
              <h1 className="text-4xl font-bold">{title}</h1>
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
            </>
          ) : (
            <div className="mb-16">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/mXd1zTwcQ18?si=uF3feHVSf02FEMbL"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailScreen;
