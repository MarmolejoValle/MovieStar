import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import InfoPaymentsScreen from "./pages/InfoPaymentsScreen";
import CategorySelection from "./pages/CategorySelection";
import HomeScreen from "./pages/HomeScreen";
import SeriesScreen from "./pages/SeriesScreen";
import MoviesScreen from "./pages/MoviesScreen";
import MyLibraryScreen from "./pages/MyLibraryScreen";
import DetailScreen from "./pages/DetailScreen";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import ProfileScreen from "./pages/ProfileScreen";
import Content from "./admin/pages/Content"; 
import Disconts from "./admin/pages/Discounts";
import Sidebar from "./admin/components/Sidebar"; 
import NavbarAdmin from "./admin/components/NavbarAdmin"; 
import Graphics from "./admin/pages/Graphics";


const AppContent = ({
  isLoggedIn,
  handleLogout,
  isRegistered,
  handleRegister,
  handleBack,
  handleLogin,
}) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/info-payments"];
  const shouldShowNavbar =
    isLoggedIn && !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {shouldShowNavbar && <Navbar onLogout={handleLogout} />}
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
        <Route
          path="/profile"
          element={isLoggedIn ? <ProfileScreen /> : <Navigate to="/" replace />}
        />
        <Route path="/info-payments" element={<InfoPaymentsScreen />} />
        <Route path="/Content" element={<Content/>} />
        <Route path="/Disconts" element={<Disconts/>} />
        <Route path="/Graphics" element={<Graphics/>} />
      </Routes>
    </>
  );
};

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
      <AppContent
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        isRegistered={isRegistered}
        handleRegister={handleRegister}
        handleBack={handleBack}
        handleLogin={handleLogin}
      />
    </Router>
  );
};

export default App;
