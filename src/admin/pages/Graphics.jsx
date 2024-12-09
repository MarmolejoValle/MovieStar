import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../../components/Footer";
import CardRow from "../components/Card";
import ComparisonChart from "../components/ComparisonChart";

const Graphics = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const [loading, setLoading] = useState(true);

  const OMDB_API_KEY = "tu_api_key_omdb"; // Reemplaza con tu API key de OMDb

  useEffect(() => {
    // Cargar datos desde el endpoint principal
    const fetchTopSellingProducts = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.234:2003/api/sale/all/1"
        );
        const data = await response.json();

        // Buscar información adicional en OMDb para cada película
        const enrichedProducts = await Promise.all(
          data.map(async (item) => {
            try {
              const omdbResponse = await fetch(
                `https://www.omdbapi.com/?i=${item.id_movie}&apikey=${OMDB_API_KEY}`
              );
              const omdbData = await omdbResponse.json();

              // Combinar datos del endpoint original con OMDb
              return {
                id: item.id_movie,
                sales: item.sales,
                total: item.total,
                name: omdbData.Title || `Movie ID: ${item.id_movie}`, // Título de OMDb o ID de respaldo
                image: omdbData.Poster || "https://via.placeholder.com/100", // Póster de OMDb o placeholder
                year: omdbData.Year || "N/A",
                genre: omdbData.Genre || "N/A",
                plot: omdbData.Plot || "Descripción no disponible.",
              };
            } catch (error) {
              console.error(
                `Error al obtener datos de OMDb para ${item.id_movie}:`,
                error
              );
              return {
                id: item.id_movie,
                sales: item.sales,
                total: item.total,
                name: `Movie ID: ${item.id_movie}`,
                image: "https://via.placeholder.com/100",
                year: "N/A",
                genre: "N/A",
                plot: "Descripción no disponible.",
              };
            }
          })
        );

        setTopSellingProducts(enrichedProducts);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellingProducts();
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product); // Guardar el producto seleccionado en el estado
  };

  return (
    <>
      <div className="flex bg-azulprincipal">
        <Sidebar />
        <div className="flex-grow ml-10 text-white text-center mb-4">
          <h1 className="mt-16 font-semibold text-5xl">Estadísticas</h1>
          <div className="w-full h-fit flex flex-col justify-start mt-7">
            <div className="p-2 bg-gray-600">
              <h2 className="text-3xl font-semibold mb-4">
                Top 10 Productos Más Vendidos
              </h2>
              {loading ? (
                <p>Cargando datos...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topSellingProducts.map((product) => (
                    <CardRow
                      key={product.id}
                      title={product.name}
                      image={product.image}
                      onClick={() => handleCardClick(product)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* {!loading && (
            <div className="mt-8">
              <ComparisonChart products={topSellingProducts} />
            </div>
          )} */}
          {selectedProduct && (
            <div className="mt-8 p-4 bg-gray-800 rounded-lg text-left">
              <h2 className="text-4xl font-bold mb-4">Detalles del Producto</h2>
              <p>
                <strong>Título:</strong> {selectedProduct.name}
              </p>
              <p>
                <strong>Año:</strong> {selectedProduct.year}
              </p>
              <p>
                <strong>Género:</strong> {selectedProduct.genre}
              </p>
              <p>
                <strong>Ventas:</strong> {selectedProduct.sales}
              </p>
              <p>
                <strong>Total Vendido:</strong> ${selectedProduct.total}
              </p>
              <p>
                <strong>Sinopsis:</strong> {selectedProduct.plot}
              </p>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="mt-4 w-32 h-32 object-cover"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Graphics;
