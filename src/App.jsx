import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import CategorySelection from "./pages/CategorySelection";
import HomeScreen from "./pages/HomeScreen";
import SeriesScreen from "./pages/SeriesScreen";
import MoviesScreen from "./pages/MoviesScreen";
import MyLibraryScreen from "./pages/MyLibraryScreen";
import DetailScreen from "./pages/DetailScreen";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";

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

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <ScrollToTop />
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : isRegistered ? (
              <CategorySelection onBack={handleBack} onComplete={handleLogin} />
            ) : (
              <Login onRegister={handleRegister} onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/home"
          element={isLoggedIn ? <HomeScreen /> : <Navigate to="/" replace />}
        />
        <Route
          path="/series"
          element={isLoggedIn ? <SeriesScreen /> : <Navigate to="/" replace />}
        />
        <Route
          path="/movies"
          element={isLoggedIn ? <MoviesScreen /> : <Navigate to="/" replace />}
        />
        <Route
          path="/library"
          element={
            isLoggedIn ? <MyLibraryScreen /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/detalle/:title"
          element={isLoggedIn ? <DetailScreen /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
