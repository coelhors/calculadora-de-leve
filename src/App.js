import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CalculadoraDeLeve from './components/CalculadoraDeLeve';
import ResumoOrcamento from './components/ResumoOrcamento';
import { OrcamentoProvider } from './contexts/OrcamentoContext';

function App() {
  return (
    <div className="App">
      <OrcamentoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<CalculadoraDeLeve />} />
            <Route path="/resumo" element={<ResumoOrcamento />} />
          </Routes>
        </Router>
      </OrcamentoProvider>
    </div>
  );
}

export default App;