import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary', 
  icon = null,
  type = 'button'
}) => {
  // Estilos base
  const baseClasses = "font-medium py-2 px-4 rounded-lg transition flex items-center justify-center";
  
  // Variantes de estilo ajustadas para melhor visibilidade em fundo roxo
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    link: "text-yellow-300 hover:text-yellow-400 bg-transparent", // Mudado para amarelo para melhor visibilidade
  };
  
  // Classes combinadas
  const buttonClasses = `${baseClasses} ${variants[variant]} ${className}`;
  
  return (
    <button 
      type={type} 
      className={buttonClasses}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;