import React, { useRef, useState } from "react";

const Carousel = ({ items, visibleItems, page, onNext, onPrev }) => {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / visibleItems);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition(e.clientX || e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentPosition = e.clientX || e.touches[0].clientX;
    setCurrentTranslate(currentPosition - startPosition);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (currentTranslate > 50) {
      onPrev();
    } else if (currentTranslate < -50) {
      onNext();
    }
    setCurrentTranslate(0);
  };

  return (
    <div
      className="relative flex items-center"
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <div className="relative w-full">
        <button
          onClick={onPrev}
          className="absolute top-1/2 left-0 -translate-y-1/2 z-10 text-white hover:bg-gradient-to-r from-azulprincipal to-transparent pr-6 pl-2 h-full"
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
        <div
          className="overflow-hidden w-full relative"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
        >
          <div
            className={`flex transition-transform duration-500 ease-in-out ${
              isDragging ? "transition-none" : ""
            }`}
            style={{
              transform: `translateX(calc(-${page * (100 / totalPages)}% + ${currentTranslate}px))`,
              width: `${(totalItems / visibleItems) * 100}%`,
            }}
          >
            {items.map((item, index) => (
              <div key={index} className="min-w-[300px] p-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onNext}
          className="absolute top-1/2 right-0 -translate-y-1/2 z-10 text-white hover:bg-gradient-to-l from-azulprincipal to-transparent pl-6 pr-2 h-full"
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
    </div>
  );
};

export default Carousel;
