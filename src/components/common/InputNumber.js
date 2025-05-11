import React from 'react';

const InputNumber = ({ 
  value, 
  onChange, 
  onBlur, 
  min, 
  max, 
  label, 
  className = '',
  helpText
}) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="w-20 border rounded py-1 px-2 text-center bg-white"
      />
      {helpText && <span className="text-sm text-gray-700">{helpText}</span>}
    </div>
  );
};

export default InputNumber;