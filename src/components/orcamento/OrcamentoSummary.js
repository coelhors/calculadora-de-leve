import React, { useContext } from 'react';
import { FileText, BookOpen, FileText as FileIcon, Brain, Calendar } from 'lucide-react';
import OrcamentoItem from './OrcamentoItem';

// Componente de resumo do orçamento
const OrcamentoSummary = ({ itens, valorTotal }) => {
  console.log("Itens recebidos no resumo:", itens);
  
  // Arrays vazios para cada categoria
  const mentoriaItems = [];
  const acompanhamentoItems = [];
  const leituraItems = [];
  const formatacaoItems = [];
  
  // Classificar cada item na sua categoria correta
  itens.forEach(item => {
    if (!item || !item.nome) return;
    
    // Para debugging
    console.log("Classificando item:", item);
    
    // Forçar formatação ABNT correta - Solução para garantir que formatação ABNT seja classificada corretamente
    if (item.nome.includes("formatação ABNT") || (item.nome.includes("páginas") && item.formatacao)) {
      console.log("Item classificado como formatação ABNT:", item);
      formatacaoItems.push(item);
      return;
    }
    
    // Mentoria
    if (item.nome.includes("Duração de")) {
      mentoriaItems.push(item);
      return;
    }
    
    // Período de acompanhamento
    if (item.nome.includes("dias") && !item.nome.includes("páginas")) {
      acompanhamentoItems.push(item);
      return;
    }
    
    // Leitura crítica
    if (item.nome.includes("leitura crítica") || 
        (item.nome.includes("páginas") && !item.nome.includes("formatação") && !item.formatacao)) {
      leituraItems.push(item);
      return;
    }
  });

  // Para debugging
  console.log({
    mentoria: mentoriaItems,
    acompanhamento: acompanhamentoItems,
    leitura: leituraItems,
    formatacao: formatacaoItems
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-100 mb-8 print:shadow-none print:border-none">
      {/* Seção de Mentoria */}
      <div className="mb-6">
        <div className="flex items-center mb-3 pb-2 border-b border-gray-200">
          <Brain size={18} className="text-indigo-700 mr-2" />
          <h3 className="text-lg font-bold text-indigo-800">Mentoria</h3>
        </div>
        <div className="pl-2">
          {mentoriaItems.length > 0 ? (
            mentoriaItems.map((item, index) => (
              <OrcamentoItem
                key={`mentoria-${index}`}
                nome={item.nome}
                valor={item.valor}
              />
            ))
          ) : (
            <p className="text-gray-500 italic">Nenhum serviço de mentoria selecionado</p>
          )}
        </div>
      </div>
      
      {/* Seção de Período de Acompanhamento */}
      <div className="mb-6">
        <div className="flex items-center mb-3 pb-2 border-b border-gray-200">
          <Calendar size={18} className="text-indigo-700 mr-2" />
          <h3 className="text-lg font-bold text-indigo-800">Período de acompanhamento</h3>
        </div>
        <div className="pl-2">
          {acompanhamentoItems.length > 0 ? (
            acompanhamentoItems.map((item, index) => (
              <OrcamentoItem
                key={`acompanhamento-${index}`}
                nome={item.nome}
                valor={item.valor}
              />
            ))
          ) : (
            <p className="text-gray-500 italic">Nenhum período de acompanhamento selecionado</p>
          )}
        </div>
      </div>
      
      {/* Seção de Leitura Crítica */}
      <div className="mb-6">
        <div className="flex items-center mb-3 pb-2 border-b border-gray-200">
          <BookOpen size={18} className="text-indigo-700 mr-2" />
          <h3 className="text-lg font-bold text-indigo-800">Leitura crítica</h3>
        </div>
        <div className="pl-2">
          {leituraItems.length > 0 ? (
            leituraItems.map((item, index) => (
              <OrcamentoItem
                key={`leitura-${index}`}
                nome={item.nome}
                valor={item.valor}
              />
            ))
          ) : (
            <p className="text-gray-500 italic">Nenhum serviço de leitura crítica selecionado</p>
          )}
        </div>
      </div>
      
      {/* Seção de Formatação ABNT */}
      <div className="mb-6">
        <div className="flex items-center mb-3 pb-2 border-b border-gray-200">
          <FileIcon size={18} className="text-indigo-700 mr-2" />
          <h3 className="text-lg font-bold text-indigo-800">Formatação ABNT</h3>
        </div>
        <div className="pl-2">
          {formatacaoItems.length > 0 ? (
            formatacaoItems.map((item, index) => (
              <OrcamentoItem
                key={`formatacao-${index}`}
                nome={item.nome}
                valor={item.valor}
              />
            ))
          ) : (
            <p className="text-gray-500 italic">Nenhum serviço de formatação ABNT selecionado</p>
          )}
        </div>
      </div>
      
      {/* Total */}
      <div className="py-4 flex justify-between font-bold text-lg border-t-2 border-indigo-200 mt-4">
        <span>Total</span>
        <span className="text-indigo-800">R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
      </div>
    </div>
  );
};

export default OrcamentoSummary;