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
      className={`border rounded-lg p-4 shadow-sm cursor-pointer ${className}`}
      style={{
        backgroundColor: selected ? '#FFCF5E' : 'white',
        borderColor: selected ? '#4C477C' : '#e5e7eb'
      }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className="w-6 h-6 rounded-full mr-3 flex items-center justify-center border"
            style={{
              backgroundColor: selected ? '#4C477C' : 'white',
              borderColor: selected ? '#4C477C' : '#d1d5db'
            }}
          >
            {selected && <Check size={14} className="text-white" />}
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