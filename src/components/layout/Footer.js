import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center mb-8 print:bg-white print:border-t print:border-gray-200 print:border-l-0 print:border-r-0 print:border-b-0 print:mt-16">
      <p className="text-lg text-indigo-700">
        <strong>De Leve na Tese</strong> - Mentoria Acadêmica
      </p>
      <p className="text-base text-indigo-600 mt-1 flex items-center justify-center space-x-3">
        <span className="flex items-center">
          <Mail size={18} className="mr-1 text-indigo-500" />
          <span>anacoelho@delevenatese.com</span>
        </span>
        <span className="flex items-center">
          <Phone size={18} className="mr-1 text-indigo-500" />
          <span>(75) 98156-3951</span>
        </span>
      </p>
    </div>
  );
};

export default Footer;