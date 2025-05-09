import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, ChevronLeft, Copy, Mail, Clock, ThumbsUp, Heart, Phone } from 'lucide-react';

const ResumoOrcamento = () => {
  const navigate = useNavigate();
  
  // Estado para armazenar os dados do orçamento
  const [orcamentoData, setOrcamentoData] = useState({
    itens: [],
    valorTotal: 0
  });
  
  // Estado para mostrar notificação de ação
  const [copiado, setCopiado] = useState(false);
  
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
  
  // Função para copiar o orçamento como texto para a área de transferência
  const handleCopiar = () => {
    // Criar texto do orçamento
    let texto = "ORÇAMENTO - DE LEVE NA TESE\n\n";
    
    // Adicionar itens
    orcamentoData.itens.forEach(item => {
      texto += `${item.nome}: R$ ${item.valor.toFixed(2)}\n`;
    });
    
    // Adicionar total
    texto += `\nValor Total: R$ ${orcamentoData.valorTotal.toFixed(2)}\n\n`;
    texto += "Para mais informações, entre em contato:\n";
    texto += "anacoelho@delevenatese.com | (75) 98156-3951";
    
    // Copiar para área de transferência
    navigator.clipboard.writeText(texto)
      .then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
      })
      .catch(err => {
        console.error('Erro ao copiar: ', err);
        alert('Não foi possível copiar o orçamento. Por favor, tente novamente.');
      });
  };
  
  // Função para enviar orçamento por e-mail
  const handleEnviarEmail = () => {
    // Criar corpo do e-mail
    let assunto = "Orçamento - De Leve na Tese";
    let corpo = "Segue o orçamento dos serviços solicitados:\n\n";
    
    // Adicionar itens
    orcamentoData.itens.forEach(item => {
      corpo += `${item.nome}: R$ ${item.valor.toFixed(2)}\n`;
    });
    
    // Adicionar total
    corpo += `\nValor Total: R$ ${orcamentoData.valorTotal.toFixed(2)}`;
    
    // Adicionar informações de contato ao texto do e-mail
    corpo += `\n\nPara mais informações, entre em contato:\n`;
    corpo += `anacoelho@delevenatese.com | (75) 98156-3951`;
    
    // Criar link de e-mail
    const mailtoLink = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    
    // Abrir cliente de e-mail
    window.location.href = mailtoLink;
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">RESUMO DO ORÇAMENTO</h1>
        <p className="text-gray-600">De Leve na Tese - Mentoria Acadêmica</p>
      </header>
      
      {/* Botão para voltar */}
      <div className="mb-6">
        <button 
          onClick={handleVoltar}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ChevronLeft size={20} className="mr-1" />
          Voltar para seleção de serviços
        </button>
      </div>
      
      {/* Resumo do orçamento */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-100 mb-8 print:shadow-none print:border-none">
        <div className="flex items-center mb-6 text-indigo-800 print:mb-8">
          <Calculator className="mr-2" />
          <h2 className="text-xl font-bold">Resumo do Orçamento</h2>
        </div>
        
        <div className="divide-y">
          {orcamentoData.itens.map((item, index) => (
            <div key={index} className="py-3 flex justify-between">
              <span className="text-gray-700">{item.nome}</span>
              <span className="font-medium">R$ {item.valor.toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="py-4 flex justify-between font-bold text-lg border-t-2 border-indigo-200 mt-2">
          <span>Total</span>
          <span className="text-indigo-800">R$ {orcamentoData.valorTotal.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Mensagem de validade do orçamento - Destacada conforme solicitado */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-300 mb-8 text-center flex justify-center items-center">
        <div className="text-yellow-700 font-medium flex items-center">
          <Clock size={24} className="text-yellow-600 mr-2 flex-shrink-0" />
          <p className="text-yellow-800">
            Este orçamento é válido por <span className="font-bold">até 5 dias úteis</span> a partir da data de geração.
          </p>
        </div>
      </div>
      
      {/* Ações do orçamento - não mostrar ao imprimir */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 print:hidden">
        <button 
          className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-4 rounded-lg transition shadow"
        >
          <ThumbsUp size={20} className="mr-2" />
          Gostei! Quero contratar os serviços da De Leve!
        </button>
        
        <button 
          onClick={handleEnviarEmail}
          className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 px-4 rounded-lg transition shadow"
        >
          <Mail size={20} className="mr-2" />
          Enviar por email
        </button>
      </div>
      
      {/* Rodapé - mostrado na impressão também */}
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center mb-8 print:bg-white print:border-t print:border-gray-200 print:border-l-0 print:border-r-0 print:border-b-0 print:mt-16">
        <p className="text-sm text-indigo-700">
          <strong>De Leve na Tese</strong> - Mentoria Acadêmica
        </p>
        <p className="text-xs text-indigo-600 mt-1 flex items-center justify-center space-x-3">
          <span className="flex items-center">
            <Mail size={14} className="mr-1 text-indigo-500" />
            <span>anacoelho@delevenatese.com</span>
          </span>
          <span className="flex items-center">
            <Phone size={14} className="mr-1 text-indigo-500" />
            <span>(75) 98156-3951</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResumoOrcamento;