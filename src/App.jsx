import React, { useState } from "react";
import Login from "./pages/Login";
import CategorySelection from "./pages/CategorySelection";
import HomeScreen from "./pages/HomeScreen";

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegister = () => {
    setIsRegistered(true);
  };

  const handleBack = () => {
    setIsRegistered(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <HomeScreen />
      ) : isRegistered ? (
        <CategorySelection onBack={handleBack} onComplete={handleLogin} />
      ) : (
        <Login onRegister={handleRegister} onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
