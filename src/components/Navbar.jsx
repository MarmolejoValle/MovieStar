import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full px-4 py-2 flex justify-between items-center bg-gradient-to-b from-azulprincipal to-transparent z-50 font-semibold">
      <div className="space-x-8 text-white flex items-center w-6/12 justify-between">
        <img
          src="/LOGO-MS.png"
          alt="Logo de la Empresa"
          className="left-16 h-20 w-auto"
        />
        <div className="text-xl w-2/3 justify-evenly flex space-x-4">
          <Link to="/" className="relative group">
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
      <div className="text-white flex w-auto justify-between items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x-bind:width="size"
          x-bind:height="size"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          x-bind:stroke-width="stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="24"
          height="24"
          strokeWidth="3"
        >
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
          <path d="M21 21l-6 -6"></path>
        </svg>
        <div className="flex items-center pl-12 pr-4">
          <img src="/profile.png" alt="foto-perfil" className="rounded-full mx-1" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x-bind:width="size"
            x-bind:height="size"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            x-bind:stroke-width="stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
            strokeWidth="3"
          >
            <path d="M6 9l6 6l6 -6"></path>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
