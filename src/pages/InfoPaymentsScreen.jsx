import React from "react";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const InfoPaymentsScreen = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-b from-azulprincipal to-rojosecundario text-white flex flex-col">
      <header className="fixed w-screen px-8">
        <div className="flex w-full justify-between items-center px-4 sm:px-6 py-4">
          <img
            src="/LOGO-MS.png"
            className="h-16 sm:h-20 w-auto"
            alt="Logo MovieStar"
          />
          <Button
            text="Iniciar Sesión"
            styleType="primary"
            onClick={handleLoginRedirect}
          />
        </div>
      </header>
      <main className="flex-grow px-4 sm:px-6 py-8 max-w-5xl mx-auto w-full mt-28 cursor-default">
        <h1 className="text-start text-2xl lg:text-4xl font-bold mb-16">
          Opciones de renta y compra
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Renta por 1 semana",
              price: "$20",
              details: [
                { label: "Precio por película o serie", value: "$20" },
                { label: "Calidad de audio y video", value: "Buena" },
                {
                  label: "Dispositivos compatibles",
                  value: "Computadora, teléfono",
                },
                { label: "Anuncios", value: "Sin anuncios" },
              ],
              description:
                "Perfecto si quieres una selección rápida de entretenimiento para la semana. Accede a varios títulos a precios bajos sin largas suscripciones.",
            },
            {
              title: "Renta por 1 mes",
              price: "$70",
              details: [
                { label: "Precio por película o serie", value: "$70" },
                { label: "Calidad de audio y video", value: "Buena" },
                {
                  label: "Dispositivos compatibles",
                  value: "Computadora, teléfono",
                },
                { label: "Anuncios", value: "Sin anuncios" },
              ],
              description:
                "Ideal para quienes disfrutan ver películas regularmente sin comprometerse a una compra definitiva. Obtienes un precio reducido por película y más tiempo para disfrutarlas.",
            },
            {
              title: "Compra definitiva",
              price: "$120",
              details: [
                { label: "Precio por película o serie", value: "$120" },
                { label: "Calidad de audio y video", value: "Buena" },
                {
                  label: "Dispositivos compatibles",
                  value: "Computadora, teléfono",
                },
                { label: "Anuncios", value: "Sin anuncios" },
              ],
              description:
                "Comprar significa que tendrás acceso ilimitado a la película. Es ideal si tienes títulos favoritos que deseas ver en cualquier momento, sin límites de tiempo.",
            },
          ].map((option, index) => (
            <div
              key={index}
              className="relative border rounded-xl shadow-md text-center group transition-transform transform hover:scale-105"
            >
              <div className="bg-white duration-300 group-hover:opacity-0 group-hover:invisible p-4 rounded-xl">
                <div className="bg-black text-white w-full rounded-xl inline-block shadow text-2xl font-medium py-4">
                  {option.title}
                </div>
                <div className="mt-7 mb-16 space-y-4 text-black">
                  {option.details.map((detail, idx) => (
                    <div key={idx} className="text-left">
                      <p className="text-sm text-gray-400">{detail.label}</p>
                      <p className="font-bold">{detail.value}</p>
                      <hr className="border-gray-600 mt-1" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-white duration-300 opacity-0 group-hover:opacity-100 group-hover:visible p-4 rounded-xl">
                <div className="bg-black text-white w-full rounded-xl inline-block shadow text-2xl font-medium py-4">
                  {option.title}
                </div>
                <div className="mt-16 mb-16 space-y-4 text-black">
                  <p className="text-lg font-bold">{option.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <section className="mt-20 mb-36">
          <h2 className="text-start text-2xl lg:text-4xl font-bold mb-8">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                text: "Precios accesibles",
                description:
                  "Nuestras tarifas son más competitivas en comparación con plataformas de streaming, ofreciendo flexibilidad sin suscripciones anuales.",
              },
              {
                text: "Sin compromiso",
                description:
                  "Rentas sin preocupaciones de renovar o cancelar suscripciones.",
              },
              {
                text: "Variedad y exclusividad",
                description:
                  "Contenido único que no encontrarás en otras plataformas.",
              },
              {
                text: "Pago seguro y flexible",
                description:
                  "Opciones de pago confiables y adaptadas a tus necesidades.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-transparent border border-white mt-8 py-20 rounded-lg text-center group flex flex-col items-center justify-center"
              >
                <p className="font-bold text-2xl lg:text-3xl opacity-100 group-hover:opacity-0">
                  {item.text}
                </p>
                <div className="absolute inset-0 bg-white bg-opacity-90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg p-6">
                  <p className="text-lg lg:text-xl font-light text-center p-8">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InfoPaymentsScreen;
