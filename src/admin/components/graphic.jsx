import React, { useEffect, useRef } from "react";
import { createChart } from 'lightweight-charts';

const chartOptions = {
    layout: {
        textColor: 'white',
        background: { type: 'solid', color: '#13161A' },
    },
};

export const Line = () => {
    const chartContainer = useRef(null); // Referencia al contenedor del gráfico
    const chartInstance = useRef(null);  // Referencia a la instancia del gráfico

    useEffect(() => {
        // Si ya existe un gráfico, lo eliminamos
        if (chartInstance.current) {
            chartInstance.current.remove(); // Elimina el gráfico anterior
        }

        if (chartContainer.current) {
            const chart = createChart(chartContainer.current, chartOptions);
            chartInstance.current = chart; // Guardamos la nueva instancia

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

            const areaSeries = chart.addAreaSeries({
                topColor: '#2962FF',
                bottomColor: 'rgba(41, 98, 255, 0.28)',
                lineColor: '#2962FF',
                lineWidth: 2,
                crossHairMarkerVisible: false,
            });

            const data = [
                { time: '2018-10-19', value: 26.19 },
                { time: '2018-10-23', value: 25.83 },
                { time: '2018-10-24', value: 25.78 },
                { time: '2018-10-25', value: 25.82 },
                { time: '2018-10-26', value: 25.81 },
            ];

            areaSeries.setData(data); // Asignamos los datos a la serie
            chart.timeScale().fitContent();
        }

        // Función de limpieza: Elimina el gráfico cuando el componente se desmonta
        return () => {
            if (chartInstance.current) {
                chartInstance.current.remove();
                chartInstance.current = null; // Asegura que no se acceda a un gráfico eliminado
            }
        };
    }, []); // Este useEffect solo se ejecutará una vez al montar el componente

    return (
        <div ref={chartContainer} className=" w-full h-36"></div>
    );
};

export default Line;
