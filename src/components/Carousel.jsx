import React from "react";

const Carousel = ({ items, visibleItems, page, onNext, onPrev }) => {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / visibleItems);

  return (
    <div className="relative flex items-center">
      <button onClick={onPrev} className="text-white" aria-label="Previous">
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
      <div className="overflow-hidden w-full relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${page * (100 / totalPages)}%)`,
            width: `${(totalItems / visibleItems) * 100}%`,
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="min-w-[300px] p-2">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <button onClick={onNext} className="text-white" aria-label="Next">
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
          <path d="M9 6l6 6l-6 6"></path>
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
