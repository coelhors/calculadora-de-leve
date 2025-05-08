import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CalculadoraDeLeve from './components/CalculadoraDeLeve';
import ResumoOrcamento from './components/ResumoOrcamento';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CalculadoraDeLeve />} />
          <Route path="/resumo" element={<ResumoOrcamento />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;