/**
 * Valida se um número está dentro de um intervalo
 * @param {number} valor - O valor a ser validado
 * @param {number} min - O valor mínimo permitido
 * @param {number} max - O valor máximo permitido
 * @returns {number} - O valor ajustado caso esteja fora do intervalo
 */
export const validarIntervalo = (valor, min, max) => {
    if (valor === '' || isNaN(valor)) {
      return min;
    } else if (valor < min) {
      return min;
    } else if (valor > max) {
      return max;
    }
    return parseInt(valor);
  };
  
  /**
   * Valida se todas as categorias têm pelo menos uma opção selecionada
   * @param {Object} servicosSelecionados - Objeto com as seleções de serviços
   * @returns {Object} - Objeto com erros para cada categoria
   */
  export const validarSelecoes = (servicosSelecionados) => {
    return {
      mentoria: servicosSelecionados.mentoria.length === 0,
      acompanhamento: !servicosSelecionados.acompanhamento,
      leitura: !servicosSelecionados.leitura,
      formatacao: !servicosSelecionados.formatacao
    };
  };
  
  /**
   * Verifica se o orçamento é válido (sem erros)
   * @param {Object} erros - Objeto com erros para cada categoria
   * @returns {boolean} - true se não há erros, false caso contrário
   */
  export const temErros = (erros) => {
    return Object.values(erros).some(erro => erro);
  };