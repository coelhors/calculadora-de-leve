import React from 'react';
import { Check } from 'lucide-react';

const RadioOption = ({ 
  selected, 
  onClick, 
  label, 
  value,
  className = '',
  valueDisplay = null,
  children = null
}) => {
  return (
    <div 
      className={`border rounded-lg p-4 bg-white shadow-sm cursor-pointer ${
        selected ? 'border-indigo-600' : ''
      } ${className}`}
    >
      <div 
        className="flex items-center justify-between"
        onClick={onClick}
      >
        <div className="flex items-center">
          <div 
            className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
              selected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'
            }`}
          >
            {selected && <Check size={14} />}
          </div>
          <span className={selected ? 'font-medium' : ''}>{label}</span>
        </div>
        
        {valueDisplay && (
          <span className="font-medium">{valueDisplay}</span>
        )}
      </div>
      
      {selected && children && (
        <div className="ml-9 mt-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default RadioOption;