import React from 'react';
import ServicoSection from './ServicoSection';
import useOrcamento from '../../hooks/useOrcamento';
import SERVICOS from '../../data/servicos';
import RadioOption from '../common/RadioOption';
import InputNumber from '../common/InputNumber';

const FormatacaoSection = () => {
  const { 
    servicosSelecionados, 
    paginas, 
    erros, 
    selecionarServico,
    atualizarPaginas,
    validarPaginas
  } = useOrcamento();

  // Serviço "Não vou querer formatação ABNT"
  const servicoNaoQuero = SERVICOS.find(s => s.id === 18);
  
  // Serviços de formatação por página
  const servicosFormatacao = SERVICOS.filter(s => s.categoria === 'formatacao' && s.tipo === 'porPagina');
  
  return (
    <ServicoSection titulo="Formatação ABNT" emoji="📝" erro={erros.formatacao}>
      <div className="space-y-4">
        {/* Opção "Não vou querer" */}
        <RadioOption
          selected={servicosSelecionados.formatacao?.id === servicoNaoQuero.id}
          onClick={() => selecionarServico('formatacao', servicoNaoQuero)}
          label={servicoNaoQuero.nome}
          valueDisplay="R$ 0,00"
        />
        
        {/* Opções com páginas */}
        {servicosFormatacao.map(servico => (
          <RadioOption
            key={servico.id}
            selected={servicosSelecionados.formatacao?.id === servico.id}
            onClick={() => selecionarServico('formatacao', servico)}
            label={servico.nome}
            valueDisplay={`R$ ${servico.valorPorPagina.toFixed(2).replace('.', ',')} a página`}
          >
            <InputNumber
              label="Número de páginas:"
              value={paginas.formatacao}
              onChange={(valor) => atualizarPaginas('formatacao', valor)}
              onBlur={() => validarPaginas('formatacao', servico.minPaginas, servico.maxPaginas)}
              min={servico.minPaginas}
              max={servico.maxPaginas}
              helpText={`(mín: ${servico.minPaginas}, máx: ${servico.maxPaginas})`}
            />
          </RadioOption>
        ))}
      </div>
    </ServicoSection>
  );
};

export default FormatacaoSection;