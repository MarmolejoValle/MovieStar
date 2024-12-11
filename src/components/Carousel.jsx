import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Carousel = ({ items, visibleItems, page, onNext, onPrev }) => {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / visibleItems);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [lastTranslate, setLastTranslate] = useState(0);

  // **Funciones para Drag**
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition(e.clientX || e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentPosition = e.clientX || e.touches[0].clientX;
    const translateAmount = currentPosition - startPosition + lastTranslate;
    setCurrentTranslate(translateAmount);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Restaura la posición si el drag no es significativo
    const containerWidth = containerRef.current.offsetWidth;
    const threshold = containerWidth / 4; // Cambia página solo si arrastras 25%
    if (currentTranslate > threshold && page > 0) {
      onPrev(); // Ir a la página anterior
    } else if (currentTranslate < -threshold && page < totalPages - 1) {
      onNext(); // Ir a la siguiente página
    }

    // Restaura el estado
    setLastTranslate(0);
    setCurrentTranslate(0);
  };

  useEffect(() => {
    // Agregar y limpiar eventos para mouse/touch
    const handleEnd = () => handleMouseUp();
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, currentTranslate, page]);

  return (
    <div className="relative flex items-center">
      {/* Botón "Prev" */}
      <button
        onClick={onPrev}
        disabled={page === 0}
        className={`absolute top-1/2 left-0 -translate-y-1/2 z-10 text-white hover:bg-gradient-to-r from-azulprincipal to-transparent pr-6 pl-2 h-full ${page === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        aria-label="Previous"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="24"
          height="24"
        >
          <path d="M15 6l-6 6l6 6"></path>
        </svg>
      </button>

      {/* Contenedor del Carrusel */}
      <div
        className="overflow-hidden w-full relative"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
      >
        <div
          className={`flex transition-transform duration-500 ease-in-out ${isDragging ? "transition-none" : ""
            }`}
          style={{
            transform: `translateX(calc(-${page * (100 / totalPages)}% + ${currentTranslate}px))`,
            width: `${(totalItems / visibleItems) * 100}%`,
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="min-w-[300px] p-2">
              <Link
                to={`/detalle/${item.imdbID}?image=${encodeURIComponent(
                  item.Poster
                )}&description=${encodeURIComponent(
                  item.Plot || item.Description
                )}&releaseDate=${encodeURIComponent(
                  item.Year
                )}&genre=${encodeURIComponent(
                  item.Genre || item.Type
                )}&rating=${encodeURIComponent(
                  item.imdbRating || "N/A"
                )}&id=${encodeURIComponent(
                  item.id || "N/A"
                )}&name=${encodeURIComponent(item.Title || "N/A")}${item.date_end
                    ? `&dateEnd=${encodeURIComponent(item.dateEnd)}`
                    : ""
                  }${item.discount
                    ? `&discount=${encodeURIComponent(item.discount)}`
                    : ""
                  }${item.typeDiscount
                    ? `&typeDiscount=${encodeURIComponent(item.typeDiscount)}`
                    : ""
                  }`}
              >
                <img
                  src={item.Poster}
                  alt={item.Title}
                  className="w-full h-40 rounded-lg object-cover"
                />
                <h3 className="mt-2 text-center text-xl font-semibold">
                  {item.Title}{" "}
                  <span className="text-sm text-gray-500">
                    ({item.typeDiscount === "Compra" ? "Comprada" : "Renta"})
                  </span>
                </h3>
                {/* Mostrar fecha de fin de renta solo si está disponible */}
                {item.dateEnd && (
                  <p className="text-sm text-center text-gray-400">
                    Fin de renta:{" "}
                    {new Date(item.dateEnd).toLocaleDateString()}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Botón "Next" */}
      <button
        onClick={onNext}
        disabled={page === totalPages - 1}
        className={`absolute top-1/2 right-0 -translate-y-1/2 z-10 text-white hover:bg-gradient-to-l from-azulprincipal to-transparent pl-6 pr-2 h-full ${page === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        aria-label="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="24"
          height="24"
        >
          <path d="M9 6l6 6l-6 6"></path>
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
