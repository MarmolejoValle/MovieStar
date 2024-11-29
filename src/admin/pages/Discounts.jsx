import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../../components/Footer";

export const Discounts = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      id_movie: 101,
      name: "Buen Fin",
      description: "Descuento del 10% en todas las compras",
      fk_sales_type: 1,
      price: 10,
      date_start: "2024-11-16",
      date_end: "2024-11-19",
    },
    {
      id: 2,
      id_movie: 202,
      name: "Black Friday",
      description: "Descuento de $50 en compra de 2 Series/Peliculas",
      fk_sales_type: 2,
      price: 50,
      date_start: "2024-11-24",
      date_end: "2024-11-24",
    },
  ]);

  const [movies, setMovies] = useState([
    { id: 1, title: "Pelicula 1" },
    { id: 2, title: "Pelicula 2" },
    { id: 3, title: "Pelicula 3" },
  ]); // Lista de películas

  const handleAddPromotion = () => setShowAddForm(true);
  const handleDeletePromotion = (id) =>
    setPromotions(promotions.filter((promo) => promo.id !== id));

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const price = parseFloat(formData.get("price"));
    if (price <= 0) {
      alert("El valor debe ser mayor a 0.");
      return;
    }

    const newPromotion = {
      id: Date.now(),
      id_movie: parseInt(formData.get("id_movie")),
      name: formData.get("name"),
      description: formData.get("description"),
      fk_sales_type: parseInt(formData.get("fk_sales_type")),
      price,
      date_start: formData.get("date_start"),
      date_end: formData.get("date_end"),
    };

    setPromotions([...promotions, newPromotion]);
    setShowAddForm(false);
  };

  const today = new Date().toISOString().split("T")[0]; 

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-6">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative group"
              >
                <h2 className="text-lg font-semibold mb-2">{promo.name}</h2>
                <p className="text-sm text-gray-400">{promo.description}</p>
                <p className="text-sm text-gray-400">
                  Película ID: {promo.id_movie}
                </p>
                <p className="text-sm text-gray-400">
                  Tipo: {promo.fk_sales_type === 1 ? "Descuento (%)" : "Monto ($)"}, Valor:{" "}
                  {promo.fk_sales_type === 1 ? `${promo.price}%` : `$${promo.price}`}
                </p>
                <p className="text-sm text-gray-400">
                  Desde: {promo.date_start} hasta: {promo.date_end}
                </p>
                <button
                  className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeletePromotion(promo.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Formulario para añadir promociones */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Añadir Promoción</h2>
                <form onSubmit={handleAddSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Película</label>
                    <select
                      name="id_movie"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      required
                    >
                      <option value="">Selecciona una película</option>
                      {movies.map((movie) => (
                        <option key={movie.id} value={movie.id}>
                          {movie.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Nombre de la promoción</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Descripción</label>
                    <textarea
                      name="description"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      required
                    ></textarea>
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-sm mb-2">Tipo</label>
                      <select
                        name="fk_sales_type"
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                        required
                      >
                        <option value="1">Descuento (%)</option>
                        <option value="2">Monto ($)</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm mb-2">Valor (%/$)</label>
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
                    <label className="block text-sm mb-2">Fecha de inicio</label>
                    <input
                      type="date"
                      name="date_start"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      min={today}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Fecha de final</label>
                    <input
                      type="date"
                      name="date_end"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      min={today}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
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

// Para probar con los endpoints(modificar y probar si funciona)



/*
--Preparado para Back (Discount)--

import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Footer from "../../components/Footer";

export const Discounts = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null); // For handling errors

  // Fetch promotions and movies on component mount
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("http://192.168.110.255:2003/api/promotions");
        setPromotions(response.data);
      } catch (err) {
        setError("Error fetching promotions");
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://192.168.110.255:2003/api/movies");
        setMovies(response.data);
      } catch (err) {
        setError("Error fetching movies");
      }
    };

    fetchPromotions();
    fetchMovies();
  }, []);

  const handleAddPromotion = () => setShowAddForm(true);

  const handleDeletePromotion = async (id) => {
    try {
      await axios.delete(`http://192.168.110.255:2003/api/promotions/${id}`);
      setPromotions(promotions.filter((promo) => promo.id !== id));
    } catch (err) {
      setError("Error deleting promotion");
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const price = parseFloat(formData.get("price"));
    if (price <= 0) {
      alert("El valor debe ser mayor a 0.");
      return;
    }

    const newPromotion = {
      id_movie: parseInt(formData.get("id_movie")),
      name: formData.get("name"),
      description: formData.get("description"),
      fk_sales_type: parseInt(formData.get("fk_sales_type")),
      price,
      date_start: formData.get("date_start"),
      date_end: formData.get("date_end"),
    };

    try {
      const response = await axios.post("http://192.168.110.255:2003/api/promotions", newPromotion);
      setPromotions([...promotions, response.data]);
      setShowAddForm(false);
    } catch (err) {
      setError("Error adding promotion");
    }
  };

  const today = new Date().toISOString().split("T")[0]; 

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

          ------ Error message--------
          
          {error && (
            <div className="bg-red-500 text-white p-4 mb-4 rounded-lg">
              {error}
            </div>
          )}

          -----Tarjetas de promociones----
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-6">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative group"
              >
                <h2 className="text-lg font-semibold mb-2">{promo.name}</h2>
                <p className="text-sm text-gray-400">{promo.description}</p>
                <p className="text-sm text-gray-400">
                  Película ID: {promo.id_movie}
                </p>
                <p className="text-sm text-gray-400">
                  Tipo: {promo.fk_sales_type === 1 ? "Descuento (%)" : "Monto ($)"}, Valor:{" "}
                  {promo.fk_sales_type === 1 ? `${promo.price}%` : `$${promo.price}`}
                </p>
                <p className="text-sm text-gray-400">
                  Desde: {promo.date_start} hasta: {promo.date_end}
                </p>
                <button
                  className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeletePromotion(promo.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          -------Formulario para añadir promociones ----
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Añadir Promoción</h2>
                <form onSubmit={handleAddSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Película</label>
                    <select
                      name="id_movie"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      required
                    >
                      <option value="">Selecciona una película</option>
                      {movies.map((movie) => (
                        <option key={movie.id} value={movie.id}>
                          {movie.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Nombre de la promoción</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Descripción</label>
                    <textarea
                      name="description"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      required
                    ></textarea>
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-sm mb-2">Tipo</label>
                      <select
                        name="fk_sales_type"
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                        required
                      >
                        <option value="1">Descuento (%)</option>
                        <option value="2">Monto ($)</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm mb-2">Valor (%/$)</label>
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
                    <label className="block text-sm mb-2">Fecha de inicio</label>
                    <input
                      type="date"
                      name="date_start"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      min={today}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Fecha de final</label>
                    <input
                      type="date"
                      name="date_end"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      min={today}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
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

*/