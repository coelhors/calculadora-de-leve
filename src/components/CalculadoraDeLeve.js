import React from 'react';
import { useNavigate } from 'react-router-dom';
import useOrcamento from '../hooks/useOrcamento';
import Header from './layout/Header';
import Button from './common/Button';
import MentoriaSection from './calculadora/MentoriaSection';
import AcompanhamentoSection from './calculadora/AcompanhamentoSection';
import LeituraCriticaSection from './calculadora/LeituraCriticaSection';
import FormatacaoSection from './calculadora/FormatacaoSection';
import logo from '../assets/images/logo.png'; // Importação do logo

const CalculadoraDeLeve = () => {
  const navigate = useNavigate();
  const { verificarErros, salvarOrcamento, itensOrcamento } = useOrcamento();

  // Função para lidar com o clique no botão "Calcular!"
  const handleGerarOrcamento = () => {
    // Verifica se todas as categorias têm uma opção selecionada
    if (!verificarErros()) {
      // Exibe mensagem de erro e faz scroll até o topo para mostrar as categorias com erro
      alert("Por favor, selecione pelo menos uma opção em cada categoria antes de gerar o orçamento.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Logging para debug
    console.log("Itens do orçamento antes de navegar:", itensOrcamento);
    
    // Salvar dados para recuperar na próxima página
    salvarOrcamento();
    
    // Redirecionar para a página de resumo
    navigate('/resumo');
  };

  const welcomeText = (
    <>
      Oie! Esta é a calculadora da <strong>De Leve na Tese</strong>. De forma simples, você consegue escolher as opções de serviços que melhor atendem as suas necessidades. Vamos lá?!
    </>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header 
        title="CALCULADORA DE LEVE" 
        subtitle={welcomeText}
        isWelcomeText={true}
      />
      
      {/* Logo - alinhado à esquerda */}
      <div className="flex justify-start mt-6 mb-8">
        <img 
          src={logo} 
          alt="Logo De Leve na Tese" 
          className="h-16 md:h-20"
        />
      </div>
      
      {/* Seção de seleção de serviços */}
      <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
        <MentoriaSection />
        <AcompanhamentoSection />
        <LeituraCriticaSection />
        <FormatacaoSection />
      </div>
      
      {/* Botão para calcular com tamanho ajustado e texto maior */}
      <div className="flex justify-center mb-8">
        <button 
          onClick={handleGerarOrcamento}
          className="btn-orcamento text-xl px-20 py-4"
        >
          Calcular!
        </button>
      </div>
    </div>
  );
};

export default CalculadoraDeLeve;