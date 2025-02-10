import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage';
import StartPage from './pages/StartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/start" element={<StartPage />} />
      </Routes>
    </Router>
  );
}

export default App;