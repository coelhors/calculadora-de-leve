import React, { useState } from 'react';
import { ThumbsUp, Mail, Copy } from 'lucide-react';
import Button from '../common/Button';

const OrcamentoActions = ({ itens, valorTotal }) => {
  const [copiado, setCopiado] = useState(false);
  
  // Função para copiar o orçamento como texto para a área de transferência
  const handleCopiar = () => {
    // Criar texto do orçamento
    let texto = "ORÇAMENTO - DE LEVE NA TESE\n\n";
    
    // Adicionar itens
    itens.forEach(item => {
      texto += `${item.nome}: R$ ${item.valor.toFixed(2)}\n`;
    });
    
    // Adicionar total
    texto += `\nValor Total: R$ ${valorTotal.toFixed(2)}\n\n`;
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
    itens.forEach(item => {
      corpo += `${item.nome}: R$ ${item.valor.toFixed(2)}\n`;
    });
    
    // Adicionar total
    corpo += `\nValor Total: R$ ${valorTotal.toFixed(2)}`;
    
    // Adicionar informações de contato ao texto do e-mail
    corpo += `\n\nPara mais informações, entre em contato:\n`;
    corpo += `anacoelho@delevenatese.com | (75) 98156-3951`;
    
    // Criar link de e-mail
    const mailtoLink = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    
    // Abrir cliente de e-mail
    window.location.href = mailtoLink;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 print:hidden">
      <Button 
        variant="success"
        className="py-4"
        icon={<ThumbsUp size={20} />}
      >
        Gostei! Quero contratar os serviços da De Leve!
      </Button>
      
      <Button 
        variant="primary"
        className="py-4"
        icon={<Mail size={20} />}
        onClick={handleEnviarEmail}
      >
        Enviar por email
      </Button>
      
      {copiado && (
        <div className="fixed top-4 right-4 bg-green-600 text-white p-3 rounded-lg shadow-lg animate-fadeIn">
          Orçamento copiado com sucesso!
        </div>
      )}
    </div>
  );
};

export default OrcamentoActions;