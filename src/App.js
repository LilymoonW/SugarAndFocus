import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import StartPage from './pages/StartPage';
import RecipePage from './pages/RecipePage';
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/menu" element={<MenuPage />} />

      </Routes>
    </Router>
  );
}

export default App;
