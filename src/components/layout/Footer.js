import React from 'react';
import { Mail, Instagram } from 'lucide-react';
import { TbBrandLinktree } from 'react-icons/tb';
import logoFooter from '../../assets/images/logo-footer.png';

const Footer = () => {
  // Função para abrir o Instagram
  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/delevenatese/', '_blank');
  };

  // Função para abrir o cliente de email
  const handleEmailClick = () => {
    window.location.href = 'mailto:anacoelho@delevenatese.com';
  };

  // Função para abrir o Linktree
  const handleLinktreeClick = () => {
    window.open('https://linktr.ee/DeLeveNaTese', '_blank');
  };

  return (
    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-8 print:bg-white print:border-t print:border-gray-200 print:border-l-0 print:border-r-0 print:border-b-0 print:mt-16">
      <div className="flex items-center justify-between">
        {/* Logo alinhado à esquerda */}
        <div className="flex items-center">
          <img 
            src={logoFooter} 
            alt="De Leve na Tese" 
            className="h-12 md:h-16"
          />
        </div>

        {/* Conteúdo central */}
        <div className="flex-1 text-center mx-4">
          <p className="text-xl text-indigo-700 mb-3">
            <strong>De Leve na Tese</strong> - Suas palavras são o meu compromisso <strong>💛</strong>
          </p>
          <div className="flex items-center justify-center space-x-12">
            <button
              onClick={handleInstagramClick}
              className="flex items-center justify-center w-14 h-14 bg-indigo-100 hover:bg-indigo-200 rounded-full transition-colors duration-200"
              title="Siga-nos no Instagram"
            >
              <Instagram size={28} className="text-indigo-600" />
            </button>
            <button
              onClick={handleEmailClick}
              className="flex items-center justify-center w-14 h-14 bg-indigo-100 hover:bg-indigo-200 rounded-full transition-colors duration-200"
              title="Envie um email"
            >
              <Mail size={28} className="text-indigo-600" />
            </button>
            <button
              onClick={handleLinktreeClick}
              className="flex items-center justify-center w-14 h-14 bg-indigo-100 hover:bg-indigo-200 rounded-full transition-colors duration-200"
              title="Acesse nosso Linktree"
            >
              <TbBrandLinktree size={28} className="text-indigo-600" />
            </button>
          </div>
        </div>

        {/* Espaço vazio à direita para balanceamento */}
        <div className="w-12 md:w-16"></div>
      </div>
    </div>
  );
};

export default Footer;