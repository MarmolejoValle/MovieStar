import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Footer from "../components/Footer";

const Login = ({ onRegister, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  
  const fixedEmail = "Jared";
  const fixedPassword = "12345678";

  const handleLogin = () => {
    if (email === fixedEmail && password === fixedPassword) {
      onLogin();
    } else {
      setErrorMessage("Correo o contraseña incorrectos.");
    }
  };

  const handleRegister = () => {
    if (password.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }
    setErrorMessage("");
    onRegister();
  };

  return (
    <div
      className="flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/backgroundLOGIN.jpg')" }}
    >
      <div className="flex flex-col justify-center items-center flex-grow h-screen bg-black bg-opacity-70">
        <img
          src="/LOGO-MS.png"
          alt="Logo de la Empresa"
          className="absolute top-8 left-16 h-20 w-auto"
        />
        <div className="border border-zinc-700 backdrop-blur-sm p-8 pt-7 rounded-3xl text-white text-center max-w-sm w-full shadow-sm shadow-zinc-500">
          <div className="flex items-center justify-center mb-3">
            {isRegistering && (
              <button
                className="absolute left-5 text-white text-xl"
                onClick={() => setIsRegistering(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24"
                  height="24"
                >
                  <path d="M15 6l-6 6l6 6"></path>
                </svg>
              </button>
            )}
            <h2 className="text-3xl font-medium">
              {isRegistering ? "Crear Cuenta" : "Inicia sesión"}
            </h2>
          </div>
          <div className="px-6">
            {isRegistering ? (
              <>
                <InputField type="text" placeholder="Nombre completo" />
                <InputField type="email" placeholder="Correo electrónico" />
                <div className="text-left">
                  <InputField
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <small className="text-zinc-400">* Mínimo 8 caracteres</small>
                </div>
                <div className="text-left -mt-4">
                  <InputField
                    type="password"
                    placeholder="Confirmar Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <small className="text-zinc-400">* Mínimo 8 caracteres</small>
                </div>
              </>
            ) : (
              <>
                <InputField
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )}
          </div>

          {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}

          {isRegistering ? (
            <div className="flex mt-6 mb-2 justify-center">
              <Button
                text="Crear Cuenta"
                styleType="primary"
                onClick={handleRegister}
              />
            </div>
          ) : (
            <div className="flex mt-6 mb-2 justify-between">
              <Button text="Iniciar Sesión" styleType="primary" onClick={handleLogin} />
              <Button
                text="Crear Cuenta"
                styleType="secondary"
                onClick={() => setIsRegistering(true)}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
