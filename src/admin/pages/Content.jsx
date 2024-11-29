import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../../components/Footer";
import data from "../data/data.json";
import CardRow from "../components/CardRow";

export const Content = () => {
  const [isMovies, setIsMovies] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [showEditForm, setShowEditForm] = useState(false); // Mostrar el formulario de edición
  const [selectedItem, setSelectedItem] = useState(null); // Item seleccionado para editar
  const [editedData, setEditedData] = useState({
    title: "",
    genre: "",
    price: "",
    duration: "",
  });

  const currentData = isMovies ? data.movies : data.series;

  // Filtrar los datos por el término de búsqueda
  const filteredData = currentData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = () => {
    setShowEditForm(true); // Abrir el modal de edición
  };

  const handleItemSelect = (event) => {
    const selected = currentData.find(
      (item) => item.title === event.target.value
    );
    setSelectedItem(selected);
    setEditedData({
      title: selected.title,
      genre: selected.genre,
      price: selected.price,
      duration: selected.duration,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const updatedData = currentData.map((item) =>
      item.title === selectedItem.title ? { ...item, ...editedData } : item
    );
    isMovies ? (data.movies = updatedData) : (data.series = updatedData);
    setShowEditForm(false); // Cerrar el modal después de guardar los cambios
  };

  const handleCloseModal = () => {
    setShowEditForm(false); // Cerrar el modal al hacer clic en la "X"
  };

  return (
    <>
      <div className="flex bg-azulprincipal">
        <Sidebar />
        <div className="flex-grow ml-28 mr-24 text-white">
          {/* Título */}
          <div className="text-center">
            <h1 className="mt-16 font-serif text-6xl">Contenido</h1>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mt-10">
            {/* Switch para Películas/Series */}
            <div className="flex items-center bg-gray-700 rounded-full p-1 w-40">
              <button
                className={`w-1/2 py-1 rounded-full ${isMovies ? "bg-white text-black" : "text-white"}`}
                onClick={() => setIsMovies(true)}
              >
                Películas
              </button>
              <button
                className={`w-1/2 py-1 rounded-full ${!isMovies ? "bg-white text-black" : "text-white"}`}
                onClick={() => setIsMovies(false)}
              >
                Series
              </button>
            </div>

            {/* Botón de Editar */}
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full flex items-center"
                onClick={handleEditClick}
              >
                <span className="mr-2">✏️</span> Editar
              </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar"
                className="bg-gray-700 text-white text-center rounded-full py-2 px-4 pl-10 w-64 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute left-3 top-2 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Tabla */}
          <div className="mt-12">
            {/* Fila de encabezados */}
            <div className="flex justify-between bg-gray-800 rounded-lg p-4 text-left font-semibold text-center">
              <div className="w-1/5"></div>
              <div className="w-1/5">Título</div>
              <div className="w-1/5">Género</div>
              <div className="w-1/5">Precio</div>
              <div className="w-1/5">Duración</div>
              <div className="w-1/5">Calificación</div>
            </div>

            {/* Cards */}
            <div className="mt-4 space-y-4">
              {filteredData.map((item, index) => (
                <CardRow
                  key={index}
                  image={item.image}
                  title={item.title}
                  genre={item.genre}
                  price={`$${item.price}`} // Aquí concatenamos el símbolo de dólar
                  duration={item.duration}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Edición */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
            {/* Botón de cierre */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-2xl text-gray-300 hover:text-white"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Editar {isMovies ? "Película" : "Serie"}</h2>
            <form>
              {/* Seleccionar Película o Serie */}
              <div className="mb-4">
                <label className="block text-sm mb-2">Seleccionar {isMovies ? "Película" : "Serie"}</label>
                <select
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                  onChange={handleItemSelect}
                  value={selectedItem ? selectedItem.title : ""}
                >
                  <option value="">Seleccione una opción</option>
                  {currentData.map((item) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Campos de edición */}
              {selectedItem && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Título</label>
                    <input
                      type="text"
                      name="title"
                      value={editedData.title}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm mb-2">Género</label>
                    <input
                      type="text"
                      name="genre"
                      value={editedData.genre}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm mb-2">Precio</label>
                    <input
                      type="number"
                      name="price"
                      value={editedData.price}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm mb-2">Duración</label>
                    <input
                      type="text"
                      name="duration"
                      value={editedData.duration}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                    />
                  </div>

                  {/* Botones de cancelar y guardar */}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setShowEditForm(false)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveChanges}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full"
                    >
                      Guardar cambios
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Content;
