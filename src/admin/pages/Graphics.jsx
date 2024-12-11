import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../../components/Footer";
import CardRow from "../components/Card";
import { IP_API } from "../../../config";
import Line from "../components/graphic";

const Graphics = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]); // Estado para los datos de la gráfica
  const [chartLoading, setChartLoading] = useState(false);

  const OMDB_API_KEY = "fe327da4"; // Reemplaza con tu API key de OMDb

  useEffect(() => {
    // Cargar datos desde el endpoint principal
    const fetchTopSellingProducts = async () => {
      try {
        const response = await fetch(`${IP_API}/api/sale/all/1`);
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

  useEffect(() => {
    // Seleccionar el primer producto automáticamente cuando los datos estén disponibles
    if (topSellingProducts.length > 0 && !selectedProduct) {
      setSelectedProduct(topSellingProducts[0]);
    }
  }, [topSellingProducts]);

  useEffect(() => {
    // Cargar los datos de la gráfica para el producto seleccionado
    if (selectedProduct) {
      const fetchChartData = async () => {
        setChartLoading(true); // Muestra el estado de carga
        try {
          const response = await fetch(
            `http://192.168.1.78:2003/api/sale/statistics/${selectedProduct.id}`
          );
          const data = await response.json();
          console.log(data);
          

          // Convertir los datos al formato adecuado para la gráfica
          const formattedData = data.map((item) => ({
            time: new Date(item.date).toISOString().split("T")[0], // Formato de fecha (YYYY-MM-DD)
            value: item.total,
          }));

          setChartData(formattedData);
        } catch (error) {
          console.error("Error al cargar los datos de la gráfica:", error);
          setChartData([]);
        } finally {
          setChartLoading(false); // Finaliza el estado de carga
        }
      };

      fetchChartData();
    }
  }, [selectedProduct]);

  const handleCardClick = (product) => {
    setSelectedProduct(product); // Actualizar el producto seleccionado
    console.log("Producto seleccionado:", product);
  };

  return (
    <>
      <div className="flex bg-azulprincipal">
        <Sidebar />
        <div className="flex-grow mx-10 text-white text-center mb-4">
          <h1 className="mt-16 font-semibold text-5xl">Estadísticas</h1>
          <div className="w-full h-fit justify-between mt-7">
            {selectedProduct && (
              <div className="flex bg-gray-800 rounded-lg px-24 py-6">
                {/* Imagen del producto */}
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-1/12 max-w-sm rounded-lg object-cover shadow-black shadow-lg"
                />

                <div className="ml-6 text-left self-center">
                  <p className="text-4xl font-bold mb-6">
                    {selectedProduct.name}
                  </p>
                  <p>{selectedProduct.genre}</p>
                </div>
              </div>
            )}
            <div className="flex justify-around w-full border border-white border-t-transparent rounded-lg">
              <div className="bg-gray-600 rounded-lg m-12 w-1/3">
                {loading ? (
                  <p>Cargando datos...</p>
                ) : (
                  <div className="h-96 overflow-y-scroll scrollbar">
                    <div className="grid grid-cols-1 gap-4">
                      {topSellingProducts.map((product) => (
                        <CardRow
                          key={product.id}
                          title={product.name}
                          image={product.image}
                          onClick={() => handleCardClick(product)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-2/3">
                <div className="flex justify-around m-16 ">
                  <div className="w-1/3 mr-5">
                    <p className="bg-zinc-200 text-black rounded-xl">
                      <div className="font-thin text-zinc-500 text-lg text-left ml-5 pt-3">
                        TOTAL VENDIDO
                      </div>
                      <div className="text-right mr-16 pb-5 text-3xl">
                        <p>${selectedProduct?.total}</p>
                      </div>
                    </p>
                  </div>
                  <div className="mr-5">
                    <p className="bg-zinc-200 text-black rounded-full">
                      <div className="text-center py-8 text-3xl">
                        {selectedProduct?.sales}
                      </div>
                    </p>
                    <div className="font-thin mt-3 text-white text-sm text-center">
                      VENTAS TOTALES
                    </div>
                  </div>
                </div>
                <div className="h-64">
                  {/* Renderizar la gráfica con los datos obtenidos */}
                  {chartLoading ? (
                    <p>Cargando gráfica...</p>
                  ) : (
                    <Line data={chartData} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Graphics;
