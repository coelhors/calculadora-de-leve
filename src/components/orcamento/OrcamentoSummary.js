import React from 'react';
import OrcamentoItem from './OrcamentoItem';

// Componente de resumo do orçamento
const OrcamentoSummary = ({ itens, valorTotal }) => {
  console.log("Itens recebidos no resumo:", itens);
  
  // Função para formatar valor com separador de milhares
  const formatarValor = (valor) => {
    return valor.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  
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
    
    // Usar a propriedade 'categoria' do item para classificação mais precisa
    switch(item.categoria) {
      case 'mentoria':
        mentoriaItems.push(item);
        break;
      case 'acompanhamento':
        acompanhamentoItems.push(item);
        break;
      case 'leitura':
        leituraItems.push(item);
        break;
      case 'formatacao':
        formatacaoItems.push(item);
        break;
      default:
        // Fallback para o método anterior se a categoria não estiver definida
        if (item.nome.includes("Duração de")) {
          mentoriaItems.push(item);
        } else if (item.nome.includes("dias") && !item.nome.includes("páginas")) {
          acompanhamentoItems.push(item);
        } else if (item.nome.includes("leitura crítica") || 
                   (item.nome.includes("páginas") && !item.nome.includes("formatação") && !item.formatacao) ||
                   item.nome.includes("Não vou querer leitura crítica") ||
                   (item.nome === "Não vou querer" && item.categoria === undefined && !item.formatacao)) {
          leituraItems.push(item);
        } else if (item.nome.includes("formatação ABNT") || 
                   item.formatacao || 
                   item.nome.includes("Não vou querer formatação ABNT")) {
          formatacaoItems.push(item);
        }
        break;
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
          <span className="text-xl mr-2">🧠</span>
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
          <span className="text-xl mr-2">🗓️</span>
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
          <span className="text-xl mr-2">📖</span>
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
          <span className="text-xl mr-2">📝</span>
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
        <span className="text-indigo-800">R$ {formatarValor(valorTotal)}</span>
      </div>
    </div>
  );
};

export default OrcamentoSummary;