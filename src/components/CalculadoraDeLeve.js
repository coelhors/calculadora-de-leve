import React from 'react';
import { useNavigate } from 'react-router-dom';
import useOrcamento from '../hooks/useOrcamento';
import Header from './layout/Header';
import Button from './common/Button';
import MentoriaSection from './calculadora/MentoriaSection';
import AcompanhamentoSection from './calculadora/AcompanhamentoSection';
import LeituraCriticaSection from './calculadora/LeituraCriticaSection';
import FormatacaoSection from './calculadora/FormatacaoSection';

const CalculadoraDeLeve = () => {
  const navigate = useNavigate();
  const { verificarErros, salvarOrcamento } = useOrcamento();

  // Função para lidar com o clique no botão "Gerar Orçamento"
  const handleGerarOrcamento = () => {
    // Verifica se todas as categorias têm uma opção selecionada
    if (!verificarErros()) {
      // Exibe mensagem de erro e faz scroll até o topo para mostrar as categorias com erro
      alert("Por favor, selecione pelo menos uma opção em cada categoria antes de gerar o orçamento.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Salvar dados para recuperar na próxima página
    salvarOrcamento();
    
    // Redirecionar para a página de resumo
    navigate('/resumo');
  };

  return (
    <div className="max-w-4xl mx-auto p-4" style={{ backgroundColor: '#6D63A7', minHeight: '100vh' }}>
      <Header 
        title="CALCULADORA DE LEVE" 
        subtitle="Simule seu orçamento para serviços de mentoria acadêmica" 
      />
      
      {/* Seção de seleção de serviços */}
      <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
        <MentoriaSection />
        <AcompanhamentoSection />
        <LeituraCriticaSection />
        <FormatacaoSection />
      </div>
      
      {/* Botão para gerar orçamento */}
      <Button 
        onClick={handleGerarOrcamento}
        className="w-full py-3 px-4 mb-8"
      >
        Gerar Orçamento
      </Button>
    </div>
  );
};

export default CalculadoraDeLeve;