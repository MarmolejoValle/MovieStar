import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const chartOptions = {
  layout: {
    textColor: "white",
    background: { type: "solid", color: "#13161A" },
  },
};

const Line = ({ data }) => {
  const chartContainer = useRef(null); // Referencia al contenedor del gráfico
  const chartInstance = useRef(null); // Referencia a la instancia del gráfico
  const seriesInstance = useRef(null); // Referencia a la serie de datos

  useEffect(() => {
    if (chartContainer.current) {
      // Crear el gráfico solo si no existe
      if (!chartInstance.current) {
        const chart = createChart(chartContainer.current, {
          width: chartContainer.current.clientWidth,
          height: chartContainer.current.clientHeight,
          ...chartOptions,
        });

        chart.applyOptions({
          rightPriceScale: {
            scaleMargins: {
              top: 0.4,
              bottom: 0.15,
            },
          },
          crosshair: {
            horzLine: {
              visible: false,
              labelVisible: false,
            },
          },
          grid: {
            vertLines: {
              visible: false,
            },
            horzLines: {
              visible: false,
            },
          },
        });

        // Crear la serie de área
        const areaSeries = chart.addAreaSeries({
          topColor: "#2962FF",
          bottomColor: "rgba(41, 98, 255, 0.28)",
          lineColor: "#2962FF",
          lineWidth: 2,
          crossHairMarkerVisible: false,
        });

        chartInstance.current = chart;
        seriesInstance.current = areaSeries;
      }

      // Actualizar los datos de la serie
      if (seriesInstance.current && data && data.length > 0) {
        seriesInstance.current.setData(data);
        chartInstance.current.timeScale().fitContent();
      }
    }

    // Función de limpieza
    return () => {
      if (chartInstance.current) {
        chartInstance.current.remove();
        chartInstance.current = null;
        seriesInstance.current = null;
      }
    };
  }, [data]); // Se ejecuta cada vez que cambian los datos

  return <div ref={chartContainer} className="w-full h-full"></div>;
};

export default Line;