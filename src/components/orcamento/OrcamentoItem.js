import React from 'react';

const OrcamentoItem = ({ nome, valor }) => {
  return (
    <div className="py-2 flex justify-between">
      <span className="text-gray-700">{nome}</span>
      <span className="font-medium">R$ {valor.toFixed(2).replace('.', ',')}</span>
    </div>
  );
};

export default OrcamentoItem;