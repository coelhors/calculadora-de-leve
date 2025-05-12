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

  return (
    <ServicoSection titulo="Mentoria" erro={erros.mentoria}>
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
                  <span className={selecionado ? 'font-medium' : ''}>{servico.nome}</span>
                </div>
                <span className="font-medium">R$ {servico.valor.toFixed(2).replace('.', ',')} cada</span>
              </div>
              
              {selecionado && (
                <div className="ml-9 mt-3 flex items-center space-x-3">
                  <span className="text-sm text-gray-700">Número de encontros:</span>
                  <div className="flex items-center border rounded bg-white">
                    <button 
                      onClick={() => alterarQuantidadeMentoria(servico.id, -1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3">{servicoAtual.quantidade}</span>
                    <button 
                      onClick={() => alterarQuantidadeMentoria(servico.id, 1)}
                      className="px-2 py-1 hover:bg-gray-100"
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