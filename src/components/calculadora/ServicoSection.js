import React from 'react';

const ServicoSection = ({ titulo, erro, emoji, children }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 
          className="text-lg md:text-2xl font-bold mb-1 sm:mb-0 flex items-center"
          style={{ color: '#4C477C' }}
        >
          {emoji && <span className="mr-2">{emoji}</span>}
          {titulo}
        </h2>
        {erro && (
          <span className="text-red-600 text-sm md:text-lg font-medium">
            ⚠️ Selecione pelo menos uma opção
          </span>
        )}
      </div>
      
      <div className={`${erro ? 'border-red-300 border-2 rounded-lg p-2' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default ServicoSection;