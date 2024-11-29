import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../../components/Footer";

export const Disconts = () => {
  const [showAddForm, setShowAddForm] = useState(false); 
  const [promotions, setPromotions] = useState([
    // Ejemplo de promociones activas
    { 
      id: 1, 
      name: "Buen Fin", 
      description: "Descuento del 10% en todas las compras", 
      tipo: "Desc", 
      valor: 10, 
      startDate: "2024-11-16", 
      endDate: "2024-11-19" 
    },
    { 
      id: 2, 
      name: "Black Friday", 
      description: "Descuento de $50 en compra de 2 Series/Peliculas", 
      tipo: "Monto", 
      valor: 50, 
      startDate: "2024-11-24", 
      endDate: "2024-11-24" 
    }
  ]);

  const handleAddPromotion = () => setShowAddForm(true); 
  const handleDeletePromotion = (id) =>
    setPromotions(promotions.filter((promo) => promo.id !== id)); 

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newPromotion = {
      id: Date.now(),
      name: formData.get("name"), 
      description: formData.get("description"), 
      tipo: formData.get("tipo"), 
      valor: parseFloat(formData.get("valor")), 
      startDate: formData.get("startDate"), 
      endDate: formData.get("endDate"), 
    };
  
    setPromotions([...promotions, newPromotion]); 
    setShowAddForm(false); 
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-6">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative group"
              >
                <h2 className="text-lg font-semibold mb-2">{promo.name}</h2>
                <p className="text-sm text-gray-400">{promo.description}</p>
                <p className="text-sm text-gray-400">
                  Tipo: {promo.tipo}, Valor: {promo.tipo === "Desc" ? `${promo.valor}%` : `$${promo.valor}`}
                </p>
                <p className="text-sm text-gray-400">
                  Desde: {promo.startDate} hasta: {promo.endDate}
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
                        name="tipo"
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                        required
                      >
                        <option value="Desc">Descuento (%)</option>
                        <option value="Monto">Monto ($)</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm mb-2">Valor (%/$)</label>
                      <input
                        type="number"
                        name="valor"
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Fecha de inicio</label>
                    <input
                      type="date"
                      name="startDate"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Fecha de final</label>
                    <input
                      type="date"
                      name="endDate"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
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
    </>
  );
};

export default Disconts;
