import React from "react";

const CardRow = ({ image, title, onClick }) => {
  return (
    <div
      className="flex items-center rounded-lg p-4 text-center hover:bg-gray-800 m-2 transition duration-500 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-1/5 flex justify-center">
        <img src={image} alt={title} className="w-12 h-16 rounded" />
      </div>

      <div className="w-4/5 text-white text-left ml-4">{title}</div>
    </div>
  );
};

export default CardRow;
