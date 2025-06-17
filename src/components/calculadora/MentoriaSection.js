import React from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import ServicoSection from './ServicoSection';
import useOrcamento from '../../hooks/useOrcamento';
import SERVICOS from '../../data/servicos';

const MentoriaSection = () => {
  const { 
    servicosSelecionados, 
    erros, 
    toggleServicoMentoria, 
    alterarQuantidadeMentoria 
  } = useOrcamento();

  // Filtrar serviços da categoria mentoria
  const servicosMentoria = SERVICOS.filter(s => s.categoria === 'mentoria');

  // Função para lidar com mudança direta no input
  const handleQuantidadeChange = (servicoId, valor) => {
    const novaQuantidade = parseInt(valor);
    
    // Se o valor estiver vazio ou não for um número válido, não faz nada
    if (valor === '' || isNaN(novaQuantidade)) {
      return;
    }
    
    // Validar limites (mínimo 1, máximo 100)
    if (novaQuantidade < 1 || novaQuantidade > 100) {
      return;
    }
    
    const servicoAtual = servicosSelecionados.mentoria.find(s => s.id === servicoId);
    if (servicoAtual) {
      const diferenca = novaQuantidade - servicoAtual.quantidade;
      
      // Usar a função existente para alterar a quantidade
      for (let i = 0; i < Math.abs(diferenca); i++) {
        alterarQuantidadeMentoria(servicoId, diferenca > 0 ? 1 : -1);
      }
    }
  };

  // Função para validar no blur (quando o campo perde o foco)
  const handleQuantidadeBlur = (servicoId, valor) => {
    const novaQuantidade = parseInt(valor);
    
    // Se estiver vazio ou inválido, voltar para 1
    if (valor === '' || isNaN(novaQuantidade) || novaQuantidade < 1) {
      const servicoAtual = servicosSelecionados.mentoria.find(s => s.id === servicoId);
      if (servicoAtual) {
        const diferenca = 1 - servicoAtual.quantidade;
        for (let i = 0; i < Math.abs(diferenca); i++) {
          alterarQuantidadeMentoria(servicoId, diferenca > 0 ? 1 : -1);
        }
      }
    }
    // Se for maior que 100, limitar a 100
    else if (novaQuantidade > 100) {
      const servicoAtual = servicosSelecionados.mentoria.find(s => s.id === servicoId);
      if (servicoAtual) {
        const diferenca = 100 - servicoAtual.quantidade;
        for (let i = 0; i < Math.abs(diferenca); i++) {
          alterarQuantidadeMentoria(servicoId, diferenca > 0 ? 1 : -1);
        }
      }
    }
  };

  return (
    <ServicoSection titulo="Mentoria" emoji="🧠" erro={erros.mentoria}>
      <div className="grid gap-4">
        {servicosMentoria.map(servico => {
          const selecionado = servicosSelecionados.mentoria.some(s => s.id === servico.id);
          const servicoAtual = servicosSelecionados.mentoria.find(s => s.id === servico.id);
          
          return (
            <div 
              key={servico.id} 
              style={{
                backgroundColor: selecionado ? '#FFCF5E' : 'white',
                borderColor: selecionado ? '#4C477C' : '#e5e7eb'
              }}
              className="border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <button
                    onClick={() => toggleServicoMentoria(servico)}
                    className="w-6 h-6 rounded-md mr-3 flex items-center justify-center border"
                    style={{
                      backgroundColor: selecionado ? '#4C477C' : 'white',
                      borderColor: selecionado ? '#4C477C' : '#d1d5db'
                    }}
                  >
                    {selecionado && <Check size={16} className="text-white" />}
                  </button>
                  <span className={`text-lg ${selecionado ? 'font-medium' : ''}`}>{servico.nome}</span>
                </div>
                <span className="font-medium text-lg">R$ {servico.valor.toFixed(2).replace('.', ',')} cada</span>
              </div>
              
              {selecionado && (
                <div className="ml-9 mt-3 flex items-center space-x-3">
                  <span className="text-base text-gray-700">Número de encontros:</span>
                  <div className="flex items-center border rounded bg-white">
                    <button 
                      onClick={() => alterarQuantidadeMentoria(servico.id, -1)}
                      className="px-2 py-1 hover:bg-gray-100"
                      disabled={servicoAtual.quantidade <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={servicoAtual.quantidade}
                      onChange={(e) => handleQuantidadeChange(servico.id, e.target.value)}
                      onBlur={(e) => handleQuantidadeBlur(servico.id, e.target.value)}
                      className="w-16 px-2 py-1 text-center border-0 focus:outline-none focus:ring-0"
                    />
                    <button 
                      onClick={() => alterarQuantidadeMentoria(servico.id, 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                      disabled={servicoAtual.quantidade >= 100}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ServicoSection>
  );
};

export default MentoriaSection;