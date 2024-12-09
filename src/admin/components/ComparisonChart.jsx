import React from "react";
import { Bar } from "react-chartjs-2";

const ComparisonChart = ({ products }) => {
  // Extraer datos para la gráfica
  const labels = products.map((product) => product.name); // Nombres de las películas
  const salesData = products.map((product) => product.sales); // Ventas de las películas
  const totalData = products.map((product) => product.total); // Total vendido por película

  const data = {
    labels,
    datasets: [
      {
        label: "Ventas",
        data: salesData,
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Azul claro
        borderColor: "rgba(54, 162, 235, 1)", // Azul oscuro
        borderWidth: 1,
      },
      {
        label: "Total Vendido ($)",
        data: totalData,
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Rojo claro
        borderColor: "rgba(255, 99, 132, 1)", // Rojo oscuro
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-gray-600 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Comparativa de Películas</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ComparisonChart;
