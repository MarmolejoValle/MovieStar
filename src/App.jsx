import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CategorySelection from "./pages/CategorySelection";
import HomeScreen from "./pages/HomeScreen";
import SeriesScreen from "./pages/SeriesScreen";
import MoviesScreen from "./pages/MoviesScreen";
import MyLibraryScreen from "./pages/MyLibraryScreen";
import DetailScreen from "./pages/DetailScreen";
import ScrollToTop from "./components/ScrollToTop"; // Asegúrate de ajustar la ruta

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
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <HomeScreen />
            ) : isRegistered ? (
              <CategorySelection onBack={handleBack} onComplete={handleLogin} />
            ) : (
              <Login onRegister={handleRegister} onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/home"
          element={isLoggedIn ? <HomeScreen /> : <Login onRegister={handleRegister} onLogin={handleLogin} />}
        />
        <Route path="/series" element={<SeriesScreen />} />
        <Route path="/movies" element={<MoviesScreen />} />
        <Route path="/library" element={<MyLibraryScreen />} />
        <Route path="/detalle/:title" element={<DetailScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
