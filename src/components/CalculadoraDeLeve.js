import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrcamento from '../hooks/useOrcamento';
import Header from './layout/Header';
import MentoriaSection from './calculadora/MentoriaSection';
import AcompanhamentoSection from './calculadora/AcompanhamentoSection';
import LeituraCriticaSection from './calculadora/LeituraCriticaSection';
import FormatacaoSection from './calculadora/FormatacaoSection';
import logo from '../assets/images/logo.png'; // Importação do logo

const CalculadoraDeLeve = () => {
  const navigate = useNavigate();
  const { verificarErros, salvarOrcamento, itensOrcamento } = useOrcamento();
  const [showModal, setShowModal] = useState(false);

  // Função para lidar com o clique no botão "C A L C U L A R !"
  const handleGerarOrcamento = () => {
    // Verifica se todas as categorias têm uma opção selecionada
    if (!verificarErros()) {
      // Exibe modal de erro e faz scroll até o topo para mostrar as categorias com erro
      setShowModal(true);
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

  // Função para fechar o modal
  const closeModal = () => {
    setShowModal(false);
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
          C A L C U L A R !
        </button>
      </div>

      {/* Modal de erro */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4 shadow-xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-red-600 flex items-center">
                <span className="text-3xl mr-3">❌</span>
                Oops! Algo deu errado!
              </h3>
            </div>
            <p className="text-gray-700 mb-8 text-xl">
              Por favor, selecione pelo menos uma opção em cada categoria de serviço antes de calcular o orçamento.
            </p>
            <div className="flex justify-end">
              <button 
                onClick={closeModal}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculadoraDeLeve;