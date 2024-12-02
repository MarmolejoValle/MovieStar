import React from "react";

const CardRow = ({ image, title, genre, type, total, sales }) => {
  return (
    <div className="flex items-center bg-gray-700 rounded-lg p-4 text-center">
      <div className="w-1/5 flex justify-center">
        <img
          src={image} 
          alt={title}
          className="w-12 h-16 rounded"
        />
      </div>
      <div className="w-1/5">{total}</div>
      <div className="w-1/5">{sales}</div>
      <div className="w-1/5">{title}</div>
      <div className="w-1/5">{genre}</div>
      <div className="w-1/5">{type}</div>
    </div>
  );
};

export default CardRow;
