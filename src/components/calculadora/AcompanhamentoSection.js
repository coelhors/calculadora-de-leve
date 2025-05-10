import React from 'react';
import ServicoSection from './ServicoSection';
import useOrcamento from '../../hooks/useOrcamento';
import SERVICOS from '../../data/servicos';
import RadioOption from '../common/RadioOption';

const AcompanhamentoSection = () => {
  const { servicosSelecionados, erros, selecionarServico } = useOrcamento();

  // Filtrar serviços da categoria acompanhamento
  const servicosAcompanhamento = SERVICOS.filter(s => s.categoria === 'acompanhamento');

  return (
    <ServicoSection titulo="Período de Acompanhamento" erro={erros.acompanhamento}>
      <div className="grid gap-4">
        {servicosAcompanhamento.map(servico => (
          <RadioOption
            key={servico.id}
            selected={servicosSelecionados.acompanhamento?.id === servico.id}
            onClick={() => selecionarServico('acompanhamento', servico)}
            label={servico.nome}
            valueDisplay={`R$ ${servico.valor.toFixed(2).replace('.', ',')}`}
          />
        ))}
      </div>
    </ServicoSection>
  );
};

export default AcompanhamentoSection;