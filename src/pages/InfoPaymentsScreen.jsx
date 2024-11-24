import React from "react";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
  
const InfoPaymentsScreen = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas


  const handleLoginRedirect = () => {
    navigate("/login"); // Redirige a la ruta de inicio de sesión
  };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-red-900 text-white ">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-4">
                {/* Logo */}
                <img
                    src="/LOGO-MS.png" // Cambia esto al path correcto de tu logo
                    className="h-20 w-auto" // Asegúrate de que la imagen no se distorsione
                />

                {/* Botón de iniciar sesión */}
                <Button text="Iniciar Sesión" styleType="primary" onClick={handleLoginRedirect}/>
            </header>

            {/* Opciones de renta y compra */}
            <main className="px-6 py-12">
                <h1 className="text-center text-3xl font-bold mb-8">
                    Opciones de renta y compra
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Tarjeta 1 */}
                    <div className="bg-white text-black p-6 rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-bold mb-2">Renta por 1 semana</h2>
                        <p className="text-lg mb-4">$20</p>
                        <ul className="text-sm">
                            <li>Calidad de audio y video: <span className="font-medium">Buena</span></li>
                            <li>Dispositivos compatibles: <span className="font-medium">Computadora, teléfono</span></li>
                            <li>Acceso: <span className="font-medium">Sin anuncios</span></li>
                        </ul>
                    </div>

                    {/* Tarjeta 2 */}
                    <div className="bg-white text-black p-6 rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-bold mb-2">Renta por 1 mes</h2>
                        <p className="text-lg mb-4">$70</p>
                        <ul className="text-sm">
                            <li>Calidad de audio y video: <span className="font-medium">Buena</span></li>
                            <li>Dispositivos compatibles: <span className="font-medium">Computadora, teléfono</span></li>
                            <li>Acceso: <span className="font-medium">Sin anuncios</span></li>
                        </ul>
                    </div>

                    {/* Tarjeta 3 */}
                    <div className="bg-white text-black p-6 rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-bold mb-2">Compra definitiva</h2>
                        <p className="text-lg mb-4">$120</p>
                        <ul className="text-sm">
                            <li>Calidad de audio y video: <span className="font-medium">Buena</span></li>
                            <li>Dispositivos compatibles: <span className="font-medium">Computadora, teléfono</span></li>
                            <li>Acceso: <span className="font-medium">Sin anuncios</span></li>
                        </ul>
                    </div>
                </div>

                {/* ¿Por qué elegirnos? */}
                <section className="mt-16">
                    <h2 className="text-center text-2xl font-bold mb-8">¿Por qué elegirnos?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-transparent border border-white p-6 rounded-lg text-center">
                            <p className="font-bold">Precios accesibles</p>
                        </div>
                        <div className="bg-transparent border border-white p-6 rounded-lg text-center">
                            <p className="font-bold">Sin compromiso</p>
                        </div>
                        <div className="bg-transparent border border-white p-6 rounded-lg text-center">
                            <p className="font-bold">Variedad y exclusividad</p>
                        </div>
                        <div className="bg-transparent border border-white p-6 rounded-lg text-center">
                            <p className="font-bold">Pago seguro y flexible</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default InfoPaymentsScreen;