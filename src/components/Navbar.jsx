import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Cerrar sesión");
    onLogout(); // Llama a la función onLogout pasada como prop
    navigate("/login"); // Redirige a la pantalla de Login después de cerrar sesión
  };

  return (
    <nav className="fixed top-0 left-0 w-full px-4 py-2 flex justify-between items-center bg-gradient-to-b from-azulprincipal to-transparent z-50 font-semibold">
      <div className="space-x-8 text-white flex items-center w-6/12 justify-between">
        <img
          src="/LOGO-MS.png"
          alt="Logo de la Empresa"
          className="left-16 h-20 w-auto"
        />
        <div className="text-xl w-2/3 justify-evenly flex space-x-4">
          <Link to="/home" className="relative group">
            Inicio
            <span className="block absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link to="/series" className="relative group">
            Series
            <span className="block absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link to="/movies" className="relative group">
            Películas
            <span className="block absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link to="/library" className="relative group">
            Mi Biblioteca
            <span className="block absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </Link>
        </div>
      </div>
      <div className="text-white flex w-auto justify-between items-center relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="24"
          height="24"
          strokeWidth="3"
          className="cursor-pointer"
        >
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
          <path d="M21 21l-6 -6"></path>
        </svg>
        <div
          className="flex items-center pl-12 pr-4 cursor-pointer"
          onClick={toggleMenu}
        >
          <img
            src="/profile.png"
            alt="foto-perfil"
            className="rounded-full mx-1"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
            strokeWidth="3"
            className={`transform transition-transform duration-300 ${isMenuOpen ? "rotate-180" : "rotate-0"}`}
          >
            <path d="M6 9l6 6l6 -6"></path>
          </svg>
        </div>
        {isMenuOpen && (
          <div className="absolute top-14 right-4 bg-white text-black rounded-lg shadow-md w-52">
            <ul className="pt-2">
              <li className="flex px-4 py-2 hover:font-extrabold duration-100 ease-in-out cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  width="24"
                  height="24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="currentColor"
                  className="mr-3"
                >
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                </svg>
                <Link to="/profile">Perfil</Link>
              </li>
              <li className="flex px-4 py-2 hover:font-extrabold duration-100 ease-in-out cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  width="24"
                  height="24"
                  strokeWidth="2"
                  className="mr-3"
                >
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                  <path d="M12 9h.01"></path>
                  <path d="M11 12h1v4h1"></path>
                </svg>
                <Link to="/help-center">Centro de Ayuda</Link>
              </li>
              <hr className="border-t border-black mx-2 mt-2" />
              <li
                className="px-4 py-2 hover:font-bold duration-200 ease-in-out cursor-pointer text-center font-extralight"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
