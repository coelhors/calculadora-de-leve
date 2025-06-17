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
            className="h-8 md:h-12 lg:h-14"
          />
        </div>

        {/* Conteúdo central */}
        <div className="flex-1 text-center mx-2 md:mx-4">
          <div className="flex items-center justify-center space-x-4 md:space-x-8 lg:space-x-10">
            <button
              onClick={handleInstagramClick}
              className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-indigo-100 hover:bg-indigo-200 rounded-full transition-colors duration-200"
              title="Siga-nos no Instagram"
            >
              <Instagram size={16} className="text-indigo-600 md:hidden" />
              <Instagram size={20} className="text-indigo-600 hidden md:block lg:hidden" />
              <Instagram size={24} className="text-indigo-600 hidden lg:block" />
            </button>
            <button
              onClick={handleEmailClick}
              className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-indigo-100 hover:bg-indigo-200 rounded-full transition-colors duration-200"
              title="Envie um email"
            >
              <Mail size={16} className="text-indigo-600 md:hidden" />
              <Mail size={20} className="text-indigo-600 hidden md:block lg:hidden" />
              <Mail size={24} className="text-indigo-600 hidden lg:block" />
            </button>
            <button
              onClick={handleLinktreeClick}
              className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-indigo-100 hover:bg-indigo-200 rounded-full transition-colors duration-200"
              title="Acesse nosso Linktree"
            >
              <TbBrandLinktree size={16} className="text-indigo-600 md:hidden" />
              <TbBrandLinktree size={20} className="text-indigo-600 hidden md:block lg:hidden" />
              <TbBrandLinktree size={24} className="text-indigo-600 hidden lg:block" />
            </button>
          </div>
        </div>

        {/* Espaço vazio à direita para balanceamento */}
        <div className="w-8 md:w-12 lg:w-14"></div>
      </div>
    </div>
  );
};

export default Footer;