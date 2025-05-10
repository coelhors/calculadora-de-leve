import { useContext } from 'react';
import { OrcamentoContext } from '../contexts/OrcamentoContext';

// Hook personalizado para acessar o contexto do orçamento
const useOrcamento = () => {
  const context = useContext(OrcamentoContext);
  
  if (!context) {
    throw new Error('useOrcamento deve ser usado dentro de um OrcamentoProvider');
  }
  
  return context;
};

export default useOrcamento;