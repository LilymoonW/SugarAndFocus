import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import StartPage from './pages/StartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
