import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/Button";
import InputField from "../components/InputField";
import MovieReviews from "../components/MovieReviews";
import { IP_API } from "../../config";

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
  const id = queryParams.get("id") || "N/A";
  const name = queryParams.get("name") || "Sin nombre";
  const discount = parseFloat(queryParams.get("discount")) || 0;
  const typeDiscount = queryParams.get("typeDiscount") || "Sin descuento";

  const [activeTab, setActiveTab] = useState("DETALLES");
  const [fade, setFade] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const currentYear = new Date().getFullYear();
  const releaseYear =
    releaseDate !== "N/A" ? parseInt(releaseDate.split("-")[0]) : currentYear;
  const yearsOld = releaseYear ? currentYear - releaseYear : 0;

  const calculatePrice = (basePrice, option) => {
    const discountRate = 0.02; // 2% de descuento anual
    const timeDiscount = yearsOld * discountRate * basePrice; // Descuento por antigüedad
    const priceAfterTimeDiscount = Math.max(
      basePrice - timeDiscount,
      basePrice * 0.5
    ); // Precio mínimo 50%
  
    // Verificar si el descuento aplica a esta opción
    const isRent = option.includes("Renta");
    const isPurchase = option.includes("Compra");
  
    let finalPrice = priceAfterTimeDiscount;
  
    if (
      (typeDiscount === "Renta" && isRent) ||
      (typeDiscount === "Compra" && isPurchase)
    ) {
      finalPrice = priceAfterTimeDiscount * (1 - discount / 100);
    }
  
    return finalPrice;
  };
  

  // Actualizar precios para cada opción
  const prices = {
    "Renta por 1 semana": calculatePrice(20, "Renta por 1 semana"),
    "Renta por 1 mes": calculatePrice(70, "Renta por 1 mes"),
    "Compra Definitiva": calculatePrice(120, "Compra Definitiva"),
  };

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const idMovie = title;

        console.log("Datos enviados al servidor:", { idUser: userId, id });

        const response = await fetch(`${IP_API}/api/sale/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idUser: userId, idMovie: id }),
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        setIsPurchased(data.check || false);
      } catch (error) {
        console.error("Error al verificar el estado de compra:", error);
        setIsPurchased(false);
      }
    };

    // Ejecutar la función una vez
    checkPurchaseStatus();
  }, [title]); // Solo depende de 'title' 
  

  const handleTabChange = (tab) => {
    setFade(false);
    setTimeout(() => {
      setActiveTab(tab);
      setFade(true);
    }, 300);
  };

  const handlePurchase = (option) => {
    setSelectedOption(option);
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId"); // Obtener el id del usuario desde localStorage
    const email = e.target.email.value; // Obtener el email del formulario
    const price = prices[selectedOption]; // Obtener el precio seleccionado

    // Mapear las opciones de periodo
    const periodMap = {
      "Renta por 1 semana": "week",
      "Renta por 1 mes": "month",
      "Compra Definitiva": "purchase",
    };

    const period = periodMap[selectedOption]; // Mapear la opción seleccionada al formato requerido

    if (!userId || !email || !price || !period) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    const payload = {
      period,
      idMovie: title,
      price,
      idUser: userId,
      email,
    };

    try {
      const response = await fetch(`${IP_API}/api/sale/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("dataCompra: ", data);

        alert("Compra realizada exitosamente");
        setShowForm(false); // Cerrar el formulario modal
      } else {
        const error = await response.json();
        console.error("Error en la compra:", error);
        alert("Ocurrió un error al realizar la compra. Inténtalo nuevamente.");
      }
    } catch (err) {
      console.error("Error al conectarse con el servidor:", err);
      alert("No se pudo conectar con el servidor. Inténtalo más tarde.");
    }
  };

  return (
    <div className="bg-azulprincipal text-white">
      <div className="min-h-screen w-full mb-36">
        <div
          className="relative h-[75vh] bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-azulprincipal"></div>
        </div>
        <div className="relative">
          <div className="absolute bottom-5 left-5 flex w-2/6 justify-evenly">
            <h1
              onClick={() => handleTabChange("DETALLES")}
              className={`cursor-pointer text-xl transition-all ${activeTab === "DETALLES" ? "font-extrabold" : "text-white"
                }`}
            >
              DETALLES
            </h1>
            {(isPurchased || (typeDiscount === "Renta" && discount > 0)) && (
              <h1
                onClick={() => handleTabChange("VER AHORA")}
                className={`cursor-pointer text-xl transition-all ${activeTab === "VER AHORA" ? "font-extrabold" : "text-white"
                  }`}
              >
                VER AHORA
              </h1>
            )}
            {(isPurchased || (typeDiscount === "Renta" && discount > 0)) && (
              <h1
                onClick={() => handleTabChange("RESEÑAS")}
                className={`cursor-pointer text-xl transition-all ${activeTab === "RESEÑAS" ? "font-extrabold" : "text-white"
                  }`}
              >
                RESEÑAS
              </h1>
            )}
          </div>
        </div>

        <div
          className={`pt-8 px-16 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"
            }`}
        >
          {isPurchased ? (
            activeTab === "DETALLES" ? (
              <>
                <h1 className="text-4xl font-bold">{name}</h1>
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
            ) : activeTab === "VER AHORA" ? (
              <>
                <div className="w-full flex justify-center">
                  <iframe
                    width="50%"
                    height="500"
                    src="https://www.youtube.com/embed/mXd1zTwcQ18?si=uF3feHVSf02FEMbL"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </>
            ) : activeTab === "RESEÑAS" ? (
              <MovieReviews movieId={title} />
            ) : null
          ) : (
            <div className="flex justify-center mt-10">
              {Object.keys(prices).map((option, index) => (
                <div
                  key={index}
                  className="bg-white text-black border p-3 rounded-xl text-center shadow-lg mx-20 w-1/6"
                >
                  <h3 className="text-xl font-semibold text-white bg-black p-5 mb-8 rounded-xl shadow-md shadow-black">
                    {option}
                  </h3>
                  <div className="w-full text-start pl-3">
                    <p className="text-sm mt-3 text-gray-500">
                      Precio por película o serie
                    </p>
                    <div className="font-bold text-xl mt-2">
                      {discount > 0 &&
                        ((typeDiscount === "Renta" && option.includes("Renta")) ||
                          (typeDiscount === "Compra" &&
                            option.includes("Compra"))) ? (
                        <>
                          <span className="line-through text-gray-500 mr-2">
                            ${prices[option].toFixed(2)}
                          </span>
                          <span className="text-red-500">
                            ${calculatePrice(prices[option], option).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        `$${prices[option].toFixed(2)}`
                      )}
                      <hr className="border-gray-600 mt-1" />
                    </div>
                  </div>

                  <div className="justify-center flex mt-10">
                    <Button
                      text="Comprar"
                      styleType="primary"
                      onClick={() => handlePurchase(option)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal para formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <form
            className="bg-white p-10 rounded-3xl text-black shadow-xl w-1/3 mt-28"
            onSubmit={handleFormSubmit}
          >
            <div className="mb-7">
              <div className="flex">
                <div
                  className="cursor-pointer"
                  onClick={() => setShowForm(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    width="24"
                    height="24"
                    stroke-width="2"
                  >
                    <path d="M15 6l-6 6l6 6"></path>
                  </svg>
                </div>
                <div className="-mt-2 ml-5">
                  <h2 className="text-2xl font-bold">{selectedOption}</h2>
                  <p className="text-lg font-light">
                    Ingresa tus datos y realiza el pago para ver el contenino.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4 flex justify-between">
              <div className="px-3">
                <label className=" text-lg font-semibold">Nombre</label>
                <InputField type="text" placeholder="Nombre" />
              </div>
              <div className="px-3">
                <label className=" text-lg font-semibold">Apellido</label>
                <InputField type="text" placeholder="Apellido" />
              </div>
            </div>
            <div className="px-3 mb-4">
              <label className=" text-lg font-semibold">Email</label>
              <InputField
                type="text"
                name={"email"}
                placeholder="alguien@example.com"
              />
            </div>
            <div className="px-3 mb-4">
              <label className=" text-lg font-semibold">
                Número de Tarjeta
              </label>
              <InputField
                type="text"
                name={"cardNumber"}
                placeholder="****************"
              />
            </div>
            <div className="mb-4 flex justify-between">
              <div className="px-3">
                <label className=" text-lg font-semibold">
                  Fecha de Expiración
                </label>
                <InputField
                  type="date"
                  name={"expirationDate"}
                  placeholder=""
                />
              </div>
              <div className="px-3">
                <label className=" text-lg font-semibold">CVV</label>
                <InputField type="text" name={"cvv"} placeholder="***" />
              </div>
            </div>
            <hr className="border-gray-600 mt-7 mb-3" />
            <div className="mb-4">
              <p className="text-lg font-medium">
                <strong>Total a pagar:</strong> $
                {(typeDiscount === "Renta" &&
                  selectedOption.includes("Renta")) ||
                  (typeDiscount === "Compra" && selectedOption.includes("Compra"))
                  ? calculatePrice(
                    prices[selectedOption],
                    selectedOption
                  ).toFixed(2)
                  : prices[selectedOption]?.toFixed(2)}
              </p>
              <p className="font-extralight text-sm text-rojosecundario">
                Para mayor seguridad, los datos de tu tarjeta no seran guardados
                en la aplicación.
              </p>
            </div>
            <hr className="border-gray-600 mt-3 mb-7" />
            <div className="flex justify-center">
              <Button text="Comprar" styleType="primary" />
            </div>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DetailScreen;
