/**
 * Formata um valor numérico como moeda brasileira (R$)
 * @param {number} valor - O valor a ser formatado
 * @returns {string} - O valor formatado como moeda brasileira
 */
export const formatarMoeda = (valor) => {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };
  
  /**
   * Formata texto de orçamento para copiar para a área de transferência
   * @param {Array} itens - Os itens do orçamento
   * @param {number} valorTotal - O valor total do orçamento
   * @returns {string} - O texto formatado
   */
  export const formatarTextoOrcamento = (itens, valorTotal) => {
    let texto = "ORÇAMENTO - DE LEVE NA TESE\n\n";
    
    // Adicionar itens
    itens.forEach(item => {
      texto += `${item.nome}: R$ ${item.valor.toFixed(2)}\n`;
    });
    
    // Adicionar total
    texto += `\nValor Total: R$ ${valorTotal.toFixed(2)}\n\n`;
    texto += "Para mais informações, entre em contato:\n";
    texto += "anacoelho@delevenatese.com | (75) 98156-3951";
    
    return texto;
  };
  
  /**
   * Formata texto para o corpo do e-mail
   * @param {Array} itens - Os itens do orçamento
   * @param {number} valorTotal - O valor total do orçamento
   * @returns {string} - O texto formatado para o corpo do e-mail
   */
  export const formatarCorpoEmail = (itens, valorTotal) => {
    let corpo = "Segue o orçamento dos serviços solicitados:\n\n";
    
    // Adicionar itens
    itens.forEach(item => {
      corpo += `${item.nome}: R$ ${item.valor.toFixed(2)}\n`;
    });
    
    // Adicionar total
    corpo += `\nValor Total: R$ ${valorTotal.toFixed(2)}`;
    
    // Adicionar informações de contato
    corpo += `\n\nPara mais informações, entre em contato:\n`;
    corpo += `anacoelho@delevenatese.com | (75) 98156-3951`;
    
    return corpo;
  };