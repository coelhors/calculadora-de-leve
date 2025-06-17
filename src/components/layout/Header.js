import React from 'react';

const Header = ({ title, subtitle, isWelcomeText = false }) => {
  return (
    <header className="mb-4">
      <h1 className="title-font text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-center" style={{ color: '#FFCF5E' }}>
        {title || "CALCULADORA DE LEVE"}
      </h1>
      {subtitle && (
        <p className={`title-font text-white max-w-3xl mx-auto ${isWelcomeText ? 'text-base md:text-xl lg:text-2xl' : ''} text-center`}>
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default Header;