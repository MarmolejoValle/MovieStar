import React, { useState } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import InputField from "../components/InputField"; // Importar el componente InputField

const ProfileScreen = () => {
  const categories = [
    "Acción",
    "Comedia",
    "Drama",
    "Ciencia ficción",
    "Suspenso",
    "Terror",
    "Romance",
    "Aventura",
    "Animación",
    "Documentales",
    "Fantasía",
    "Misterio",
    "Familia",
    "Musicales",
    "Crimen",
  ];

  const [name, setName] = useState("Jared Adrián Juárez Bernal");
  const [email, setEmail] = useState("alguien@example.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      if (selectedCategories.length < 5) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const handleSaveProfile = () => {
    console.log("Datos del perfil guardados:", { name, email });
  };

  const handleChangePassword = () => {
    if (password === confirmPassword) {
      console.log("Contraseña actualizada:", password);
    } else {
      console.log("Las contraseñas no coinciden.");
    }
  };

  const handleUpdateCategories = () => {
    if (selectedCategories.length !== 5) {
      setError("Debes seleccionar 5 categorías.");
      return;
    }
    setError("");
    console.log("Categorías actualizadas:", selectedCategories);
  };

  return (
    <div className="w-full bg-azulprincipal text-white flex items-center justify-center py-10 pt-28">
      <div className="w-5/6 justify-center">
        <h1 className="text-3xl font-bold mb-8 w-full">Mi perfil</h1>
        {/* Formulario de perfil */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-transparent text-white p-6 rounded-xl w-80">
            <h2 className="text-xl font-bold mb-4">Información de perfil</h2>
            <label className="block mb-4">
              Nombre completo
              <InputField
                type="text"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block mb-4">
              Correo electrónico
              <InputField
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <Button
              text="Guardar datos"
              styleType="primary"
              onClick={handleSaveProfile}
            />
          </div>
          {/* Formulario de cambio de contraseña */}
          <div className="bg-white text-black p-6 rounded-xl w-80">
            <h2 className="text-xl font-bold mb-4">Nueva contraseña</h2>
            <label className="block mb-4">
              Nueva contraseña
              <InputField
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="block mb-4">
              Confirma tu nueva contraseña
              <InputField
                type="password"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <Button
              text="Confirmar"
              styleType="primary"
              onClick={handleChangePassword}
            />
          </div>
        </div>

        {/* Selección de categorías */}
        <div className="bg-white text-black p-6 rounded-xl w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-4">
            Elige solo 5 categorías que más te gusten
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  disabled={
                    !selectedCategories.includes(category) &&
                    selectedCategories.length >= 5
                  }
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-lg font-semibold mt-2">{error}</p>
          )}
          <Button
            text="Actualizar gustos"
            styleType="primary"
            onClick={handleUpdateCategories}
            className="mt-4"
          />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProfileScreen;
