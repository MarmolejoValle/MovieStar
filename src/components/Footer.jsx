import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-azulprincipal text-gray-400 text-center p-4 text-sm w-full">
      <div className="flex justify-center space-x-14">
        <div className="text-center">
          <p className="text-white pb-2">Contáctanos</p>
          <p>777 123 4567</p>
          <p>
            <a
              href="mailto:moviestarsup@gmail.com"
              className="text-white hover:underline"
            >
              moviestarsup@gmail.com
            </a>
          </p>
        </div>
        <div className="h-19 w-px bg-gray-500"></div>
        <div className="text-center">
          <p className="text-white font-medium pb-2">Información</p>
          {/* Ruta a InfoPaymentsScreen */}
          <Link to="/info-payments">
            <p className="text-gray-500 hover:underline cursor-pointer">
              Paquetes y formas de pago
            </p>
          </Link>
        </div>
      </div>
      <div className="mt-6 mx-10 h-px bg-gray-500"></div>
      <p className="py-4">© 2024 MovieStar Inc. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
