import React from 'react';
import { Clock } from 'lucide-react';

const OrcamentoValidity = () => {
  return (
    <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-300 mb-8 text-center flex justify-center items-center">
      <div className="text-yellow-700 font-medium flex items-center">
        <Clock size={32} className="text-yellow-600 mr-2 flex-shrink-0" />
        <p className="text-yellow-800 text-base md:text-xl">
          Este orçamento é válido por <span className="font-bold">até 5 dias úteis</span> a partir da data de geração
        </p>
      </div>
    </div>
  );
};

export default OrcamentoValidity;