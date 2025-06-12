import React from 'react';
import ServicoSection from './ServicoSection';
import useOrcamento from '../../hooks/useOrcamento';
import SERVICOS from '../../data/servicos';
import RadioOption from '../common/RadioOption';
import InputNumber from '../common/InputNumber';

const LeituraCriticaSection = () => {
  const { 
    servicosSelecionados, 
    paginas, 
    erros, 
    selecionarServico,
    atualizarPaginas,
    validarPaginas
  } = useOrcamento();

  // Serviço "Não vou querer leitura crítica"
  const servicoNaoQuero = SERVICOS.find(s => s.id === 12);
  
  // Serviços de leitura crítica por página
  const servicosLeitura = SERVICOS.filter(s => s.categoria === 'leitura' && s.tipo === 'porPagina');

  // Renderiza opção "Não vou querer"
  const renderNaoQuero = () => (
    <RadioOption
      selected={servicosSelecionados.leitura?.id === servicoNaoQuero.id}
      onClick={() => selecionarServico('leitura', servicoNaoQuero)}
      label={servicoNaoQuero.nome}
      valueDisplay="R$ 0,00"
    />
  );

  // Renderiza opções com páginas
  const renderOpcoesPorPagina = () => (
    servicosLeitura.map(servico => (
      <RadioOption
        key={servico.id}
        selected={servicosSelecionados.leitura?.id === servico.id}
        onClick={() => selecionarServico('leitura', servico)}
        label={servico.nome}
        valueDisplay={`R$ ${servico.valorPorPagina.toFixed(2).replace('.', ',')} a página`}
      >
        <InputNumber
          label="Número de páginas:"
          value={paginas.leitura}
          onChange={(valor) => atualizarPaginas('leitura', valor)}
          onBlur={() => validarPaginas('leitura', servico.minPaginas, servico.maxPaginas)}
          min={servico.minPaginas}
          max={servico.maxPaginas}
          helpText={`(mín: ${servico.minPaginas}, máx: ${servico.maxPaginas})`}
        />
      </RadioOption>
    ))
  );

  return (
    <ServicoSection titulo="Leitura crítica" emoji="📖" erro={erros.leitura}>
      <div className="space-y-4">
        {renderNaoQuero()}
        {renderOpcoesPorPagina()}
      </div>
    </ServicoSection>
  );
};

export default LeituraCriticaSection;