import React from 'react';
import { FileText } from 'lucide-react';
import OrcamentoItem from './OrcamentoItem';

const OrcamentoSummary = ({ itens, valorTotal }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-100 mb-8 print:shadow-none print:border-none">
      <div className="flex items-center mb-6 text-indigo-800 print:mb-8">
        <FileText className="mr-2" />
        <h2 className="text-xl font-bold">Resumo do Orçamento</h2>
      </div>
      
      <div className="divide-y">
        {itens.map((item, index) => (
          <OrcamentoItem
            key={index}
            nome={item.nome}
            valor={item.valor}
          />
        ))}
      </div>
      
      <div className="py-4 flex justify-between font-bold text-lg border-t-2 border-indigo-200 mt-2">
        <span>Total</span>
        <span className="text-indigo-800">R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
      </div>
    </div>
  );
};

export default OrcamentoSummary;