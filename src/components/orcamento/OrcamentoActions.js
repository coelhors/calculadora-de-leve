import React from 'react';
import { ThumbsUp, Mail } from 'lucide-react';
import Button from '../common/Button';

const OrcamentoActions = ({ itens, valorTotal }) => {
  
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
    <div className="flex flex-col gap-4 mb-8 print:hidden">
      {/* Botão para enviar por email (agora em cima) */}
      <Button 
        variant="primary"
        className="py-3 md:py-4 text-base md:text-xl"
        icon={<Mail size={20} />}
        onClick={handleEnviarEmail}
      >
        Enviar este orçamento para o meu e-mail
      </Button>
      
      {/* Botão para contratar (agora embaixo) */}
      <Button 
        variant="success"
        className="py-3 md:py-4 text-base md:text-xl"
        icon={<ThumbsUp size={20} />}
      >
        Gostei! Quero contratar os serviços da De Leve!
      </Button>
    </div>
  );
};

export default OrcamentoActions;