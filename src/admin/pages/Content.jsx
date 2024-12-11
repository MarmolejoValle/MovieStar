import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../../components/Footer";
import CardRow from "../components/CardRow";
import { IP_API } from "../../../config";

export const Content = () => {
  const [isMovies, setIsMovies] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [topSales, setTopSales] = useState([]);
  const OMDB_API_KEY = "fe327da4"; // Reemplaza con tu clave de API de OMDB

  useEffect(() => {
    const fetchTopSales = async () => {
      try {
        const response = await fetch(`${IP_API}/api/sale/all/1`);
        const data = await response.json();
  
        const enrichedData = await Promise.all(
          data.map(async (sale) => {
            if (!sale.id_movie) {
              console.warn(`ID de película faltante para venta:`, sale);
              return {
                total: sale.total || 0,
                sales: sale.sales || 0,
                title: "ID de película no disponible",
                genre: "N/A",
                type: "N/A",
                image: "https://via.placeholder.com/150",
              };
            }
        
            try {
              const omdbResponse = await fetch(
                `https://www.omdbapi.com/?i=${sale.id_movie}&apikey=${OMDB_API_KEY}`
              );
              const omdbData = await omdbResponse.json();
              return {
                total: sale.total || 0,
                sales: sale.sales || 0,
                title: omdbData.Title || "Desconocido",
                genre: omdbData.Genre || "Desconocido",
                type: omdbData.Type || "Desconocido",
                image: omdbData.Poster || "https://via.placeholder.com/150",
              };
            } catch (error) {
              console.error(
                `Error al obtener datos de OMDb para ${sale.id_movie}:`,
                error
              );
              return {
                total: sale.total || 0,
                sales: sale.sales || 0,
                title: "Error al cargar datos",
                genre: "N/A",
                type: "N/A",
                image: "https://via.placeholder.com/150",
              };
            }
          })
        );
        
  
        console.log("Enriched Data:", enrichedData); // Verifica el formato final de los datos
        setTopSales(enrichedData);
      } catch (error) {
        console.error("Error al cargar datos del API:", error);
      }
    };
  
    fetchTopSales();
  }, []);
  

  // Filtrar resultados por búsqueda
  const filteredData = topSales.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex bg-azulprincipal">
        <Sidebar />
        <div className="flex-grow ml-28 mr-24 text-white">
          {/* Título */}
          <div className="text-center">
            <h1 className="mt-16 font-serif text-6xl">Contenido más vendido</h1>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mt-10">
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
            <div className="flex justify-between bg-gray-800 rounded-lg p-4 font-semibold text-center">
              <div className="w-1/5">Imagen</div>
              <div className="w-1/5">Total Recaudado</div>
              <div className="w-1/5">Cantidad Vendida</div>
              <div className="w-1/5">Título</div>
              <div className="w-1/5">Género</div>
              <div className="w-1/5">Tipo</div>
            </div>

            {/* Cards */}
            <div className="mt-4 space-y-4">
              {filteredData.map((item, index) => (
                <CardRow
                  key={index}
                  image={item.image} // Imagen de la película o serie
                  total={`$${item.total}`} // Total recaudado
                  sales={item.sales} // Cantidad de ventas
                  title={item.title} // Título de la película o serie
                  genre={item.genre} // Género de la película o serie
                  type={item.type} // Tipo de película o serie (Movie/Series)
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Content;
