import React from 'react';

const Header = ({ title, subtitle, isWelcomeText = false }) => {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FFCF5E' }}>
        {title || "CALCULADORA DE LEVE"}
      </h1>
      {subtitle && (
        <p className={`text-white max-w-3xl mx-auto ${isWelcomeText ? 'text-lg md:text-xl' : ''}`}>
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default Header;