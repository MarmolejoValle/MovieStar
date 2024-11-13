import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-bold">MovieStar</div>
      <div className="space-x-8 text-white">
        <a href="#" className="hover:text-gray-400">Inicio</a>
        <a href="#" className="hover:text-gray-400">Series</a>
        <a href="#" className="hover:text-gray-400">Películas</a>
        <a href="#" className="hover:text-gray-400">Mi Biblioteca</a>
      </div>
      <div className="text-white">
        <i className="fas fa-user-circle text-2xl"></i>
      </div>
    </nav>
  );
};

export default Navbar;
