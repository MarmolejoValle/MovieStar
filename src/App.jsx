import React, { useState } from 'react';
import Login from './pages/Login';
import CategorySelection from './pages/CategorySelection';

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    setIsRegistered(true);
  };

  const handleBack = () => {
    setIsRegistered(false);
  };

  return (
    <div className="App">
      {isRegistered ? (
        <CategorySelection onBack={handleBack} />
      ) : (
        <Login onRegister={handleRegister} />
      )}
    </div>
  );
};

export default App;
