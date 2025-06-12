import React from 'react';

const Header = ({ title, subtitle, isWelcomeText = false }) => {
  return (
    <header className="mb-4">
      <h1 className="title-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ color: '#FFCF5E' }}>
        {title || "CALCULADORA DE LEVE"}
      </h1>
      {subtitle && (
        <p className={`text-white max-w-3xl mx-auto ${isWelcomeText ? 'text-lg md:text-xl' : ''} text-center`}>
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default Header;