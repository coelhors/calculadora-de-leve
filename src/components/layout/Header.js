import React from 'react';

const Header = ({ title, subtitle }) => {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-indigo-800 mb-2" style={{ color: '#FFCF5E' }}>
        {title || "CALCULADORA DE LEVE"}
      </h1>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </header>
  );
};

export default Header;