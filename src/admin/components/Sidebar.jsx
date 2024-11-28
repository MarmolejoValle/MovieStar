import React, { useState } from "react";

const Sidebar = ({ setSection }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`bg-gray-900 text-white w-${isExpanded ? "64" : "16"} 
        hover:w-64 transition-all duration-300 h-screen flex flex-col items-center p-4`}
      onMouseEnter={() => setIsExpanded(true)}  
      onMouseLeave={() => setIsExpanded(false)} 
    >
      {/* MovieStar or M depending on expansion */}
      <div className="text-2xl font-bold text-white mb-6">
        {isExpanded ? "MovieStar" : "M"}
      </div>

      <div
        className="text-xl mb-4 cursor-pointer"
      >
        ☰
      </div>

      <ul className="flex flex-col gap-6">
        <li
          className="hover:cursor-pointer hover:text-gray-300"
          onClick={() => setSection("Contenido")}
        >
          {isExpanded ? "📋 Contenido" : "📋"}
        </li>
        <li
          className="hover:cursor-pointer hover:text-gray-300"
          onClick={() => setSection("Estadísticas")}
        >
          {isExpanded ? "📊 Estadísticas" : "📊"}
        </li>
        <li
          className="hover:cursor-pointer hover:text-gray-300"
          onClick={() => setSection("Promociones")}
        >
          {isExpanded ? "🎁 Promociones" : "🎁"}
        </li>
      </ul>

      <div className="mt-auto hover:cursor-pointer hover:text-red-500">
        {isExpanded ? "Salir" : "🚪"}
      </div>
    </aside>
  );
};

export default Sidebar;
