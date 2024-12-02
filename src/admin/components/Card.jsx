import React from "react";

const CardRow = ({ image, title }) => {
  return (
    <div className="flex items-center rounded-lg p-4 text-center hover:bg-gray-800 m-2 transition duration-500">
      <div className="w-1/5 flex justify-center">
        <img
          src={image} 
          alt={title}
          className="w-12 h-16 rounded"
        />
      </div>

      <div className="w-1/5 text-white">{title}</div>
 
    </div>
  );
};

export default CardRow;
