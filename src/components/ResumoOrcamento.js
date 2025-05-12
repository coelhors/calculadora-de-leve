import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Button from './common/Button';
import OrcamentoSummary from './orcamento/OrcamentoSummary';
import OrcamentoValidity from './orcamento/OrcamentoValidity';
import OrcamentoActions from './orcamento/OrcamentoActions';

const ResumoOrcamento = () => {
  const navigate = useNavigate();
  
  // Estado para armazenar os dados do orçamento
  const [orcamentoData, setOrcamentoData] = useState({
    itens: [],
    valorTotal: 0
  });
  
  // Efeito para carregar os dados do orçamento do sessionStorage
  useEffect(() => {
    const orcamentoSalvo = sessionStorage.getItem('orcamento');
    
    if (orcamentoSalvo) {
      setOrcamentoData(JSON.parse(orcamentoSalvo));
    } else {
      // Se não houver dados, voltar para a página inicial
      navigate('/');
    }
  }, [navigate]);
  
  // Função para voltar para a página de seleção de serviços
  const handleVoltar = () => {
    navigate('/');
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header 
        title="RESUMO DO ORÇAMENTO" 
      />
      
      {/* Botão para voltar */}
      <div className="mb-6">
        <Button 
          onClick={handleVoltar}
          variant="link"
          icon={<ChevronLeft size={20} />}
          className="text-lg"
        >
          Voltar para a tela de seleção de serviços
        </Button>
      </div>
      
      {/* Resumo do orçamento */}
      <OrcamentoSummary 
        itens={orcamentoData.itens}
        valorTotal={orcamentoData.valorTotal}
      />
      
      {/* Mensagem de validade do orçamento */}
      <OrcamentoValidity />
      
      {/* Ações do orçamento */}
      <OrcamentoActions 
        itens={orcamentoData.itens}
        valorTotal={orcamentoData.valorTotal}
      />
      
      {/* Rodapé com informações de contato */}
      <Footer />
    </div>
  );
};

export default ResumoOrcamento;