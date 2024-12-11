import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../../components/Footer";
import { IP_API } from "../../../config";

export const Discounts = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(
          `${IP_API}/api/promotion/viewAll`
        );
        if (!response.ok) {
          throw new Error("Error al obtener promociones");
        }
        const data = await response.json();
        setPromotions(data);
      } catch (error) {
        console.error("Error al cargar promociones:", error);
      }
    };

    fetchPromotions();
  }, []);

  const handleAddPromotion = () => setShowAddForm(true);
  const handleDeletePromotion = async (id) => {
    try {
      const response = await fetch(
        `${IP_API}/api/promotion/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error en el servidor:", errorData);
        alert("Hubo un problema al eliminar la promoción.");
        return;
      }

      // Si la solicitud es exitosa, elimina la promoción localmente
      setPromotions(promotions.filter((promo) => promo.id !== id));
      alert("Promoción eliminada exitosamente.");
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      alert("Ocurrió un error al eliminar la promoción.");
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMovie) {
      alert("Por favor, selecciona una película o serie.");
      return;
    }
    
    const formData = new FormData(e.target);
    console.log('formData: ',formData);
    
    const price = parseFloat(formData.get("price"));
    if (price <= 0) {
      alert("El valor debe ser mayor a 0.");
      return;
    }

    const newPromotion = {
      movieName:selectedMovie.title,
      url: selectedMovie.url,
      dateStart: formData.get("date_start"),
      dateEnd: formData.get("date_end"),
      discount: price,
      idMovie: selectedMovie.id,
      saleType: formData.get("fk_sales_type"),
      name: formData.get("name"),
    };

    try {
      const response = await fetch(
        `${IP_API}/api/promotion/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPromotion),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error en el servidor:", errorData);
        alert("Hubo un problema al agregar la promoción.");
        return;
      }

      const result = await response.json();
      console.log("Promoción agregada exitosamente:", result);

      setPromotions([...promotions, { id: Date.now(), ...newPromotion }]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      alert("Ocurrió un error al agregar la promoción.");
    }
  };

  const handleSearchMovies = async () => {
    if (!searchQuery) return;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=fe327da4&s=${searchQuery}`
      );
      const data = await response.json();
      console.log('RESPUESTA API: ', data);
      
      if (data.Response === "True") {
        setMovies(
          data.Search.map((movie) => ({ id: movie.imdbID, title: movie.Title, url: movie.Poster }))
        );
      } else {
        alert("No se encontraron resultados.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <>
      <div className="flex bg-azulprincipal min-h-screen">
        <Sidebar />
        <div className="flex-grow ml-28 text-white">
          <div className="text-center mt-16">
            <h1 className="font-semibold text-5xl">Promociones</h1>
            <div className="mt-6 flex justify-center gap-4">
              <button
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md"
                onClick={handleAddPromotion}
              >
                Añadir Promoción
              </button>
            </div>
          </div>

          {/* Tarjetas de promociones */}
          {/* Tarjetas de promociones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-6">
            {promotions.length > 0 ? (
              promotions.map((promo) => (
                <div
                  key={promo.id}
                  className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative group"
                >
                  <h2 className="text-lg font-semibold mb-2">{promo.name}</h2>
                  <p className="text-sm text-gray-400">Película ID: {promo.id_movie}</p>
                  <p className="text-sm text-gray-400">
                    Tipo: {promo.saleType === "1" ? "Renta" : "Compra"}
                  </p>
                  <p className="text-sm text-gray-400">
                    Desde: {promo.dateStart} hasta: {promo.dateEnd}
                  </p>
                  <button
                    className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeletePromotion(promo.id)}
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <p className="text-left text-gray-400 text-lg">
                No hay promociones disponibles en este momento.
              </p>
            )}
          </div>


          {/* Formulario para añadir promociones */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
              <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Añadir Promoción</h2>
                <form onSubmit={handleAddSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">
                      Buscar película o serie
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-lg"
                        placeholder="Ejemplo: Spiderman"
                      />
                      <button
                        type="button"
                        onClick={handleSearchMovies}
                        className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Resultados</label>
                    <ul className="bg-gray-800 border border-gray-700 rounded-lg max-h-40 overflow-y-auto">
                      {movies.map((movie) => (
                        <li
                          key={movie.id}
                          className={`p-2 cursor-pointer hover:bg-gray-700 ${selectedMovie?.id === movie.id ? "bg-gray-700" : ""
                            }`}
                          onClick={() => setSelectedMovie(movie)}
                        >
                          {movie.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">
                      Película seleccionada
                    </label>
                    <input
                      type="text"
                      value={selectedMovie ? selectedMovie.title : ""}
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">
                      Nombre de la promoción
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-sm mb-2">Tipo</label>
                      <select
                        name="fk_sales_type"
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                        required
                      >
                        <option value="1">Renta</option>
                        <option value="2">Compra</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm mb-2">Valor (%)</label>
                      <input
                        type="number"
                        name="price"
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                        min="0.01"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">
                      Fecha de inicio
                    </label>
                    <input
                      type="date"
                      name="date_start"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      defaultValue={today}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">
                      Fecha de finalización
                    </label>
                    <input
                      type="date"
                      name="date_end"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      defaultValue={today}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-700 rounded-lg"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Discounts;