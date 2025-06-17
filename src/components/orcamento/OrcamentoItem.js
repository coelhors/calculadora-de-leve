import React from 'react';

const OrcamentoItem = ({ nome, valor }) => {
  // Função para formatar valor com separador de milhares
  const formatarValor = (valor) => {
    return valor.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="py-2 flex justify-between">
      <span className="text-gray-700 text-xl">{nome}</span>
      <span className="font-medium text-xl">R$ {formatarValor(valor)}</span>
    </div>
  );
};

export default OrcamentoItem;