import React, { createContext, useState, useEffect } from 'react';

// Criação do contexto
export const OrcamentoContext = createContext();

export const OrcamentoProvider = ({ children }) => {
  // Estado para armazenar serviços selecionados
  const [servicosSelecionados, setServicosSelecionados] = useState({
    mentoria: [],
    acompanhamento: null,
    leitura: null,
    formatacao: null
  });
  
  // Estado para armazenar quantidades de páginas
  const [paginas, setPaginas] = useState({
    leitura: 0,
    formatacao: 0
  });
  
  // Estado para controlar mensagens de erro
  const [erros, setErros] = useState({
    mentoria: false,
    acompanhamento: false,
    leitura: false,
    formatacao: false
  });
  
  // Estado para armazenar o valor total do orçamento
  const [valorTotal, setValorTotal] = useState(0);
  
  // Estado para rastrear os itens selecionados para o resumo
  const [itensOrcamento, setItensOrcamento] = useState([]);

  // Função para verificar erros
  const verificarErros = () => {
    const novoErros = {
      mentoria: servicosSelecionados.mentoria.length === 0,
      acompanhamento: !servicosSelecionados.acompanhamento,
      leitura: !servicosSelecionados.leitura,
      formatacao: !servicosSelecionados.formatacao
    };
    
    setErros(novoErros);
    return !Object.values(novoErros).some(erro => erro);
  };

  // Função para selecionar serviço de mentoria (múltipla escolha)
  const toggleServicoMentoria = (servico) => {
    setServicosSelecionados(prev => {
      const servicosAtuais = [...prev.mentoria];
      const index = servicosAtuais.findIndex(s => s.id === servico.id);
      
      if (index >= 0) {
        // Remove serviço
        servicosAtuais.splice(index, 1);
      } else {
        // Adiciona serviço
        servicosAtuais.push({...servico, quantidade: 1});
      }
      
      return {...prev, mentoria: servicosAtuais};
    });
  };
  
  // Função para alterar quantidade de sessões de mentoria
  const alterarQuantidadeMentoria = (id, incremento) => {
    setServicosSelecionados(prev => {
      const servicosAtuais = [...prev.mentoria];
      const index = servicosAtuais.findIndex(s => s.id === id);
      
      if (index >= 0) {
        const novaQuantidade = servicosAtuais[index].quantidade + incremento;
        
        if (novaQuantidade <= 0) {
          // Remove serviço se quantidade for 0 ou menos
          servicosAtuais.splice(index, 1);
        } else {
          // Atualiza quantidade
          servicosAtuais[index] = {
            ...servicosAtuais[index],
            quantidade: novaQuantidade
          };
        }
      }
      
      return {...prev, mentoria: servicosAtuais};
    });
  };
  
  // Função para selecionar serviço de categoria exclusiva (apenas um)
  const selecionarServico = (categoria, servico) => {
    if (!servico) {
      setServicosSelecionados(prev => ({...prev, [categoria]: null}));
      return;
    }
    
    setServicosSelecionados(prev => ({...prev, [categoria]: servico}));
    
    // Redefine a quantidade de páginas quando selecionar "não querer" serviço
    if (servico.valor === 0 && (categoria === 'leitura' || categoria === 'formatacao')) {
      setPaginas(prev => ({...prev, [categoria]: 0}));
    } else if (servico.tipo === 'porPagina') {
      // Define o número mínimo de páginas quando selecionar um serviço por página
      setPaginas(prev => ({...prev, [categoria]: servico.minPaginas}));
    }
  };

  // Função para atualizar quantidade de páginas
  const atualizarPaginas = (categoria, valor) => {
    if (valor === '' || isNaN(valor)) {
      setPaginas(prev => ({...prev, [categoria]: ''}));
    } else {
      setPaginas(prev => ({...prev, [categoria]: parseInt(valor)}));
    }
  };

  // Função para validar número de páginas ao perder o foco
  const validarPaginas = (categoria, min, max) => {
    let valor = paginas[categoria];
    
    // Se estiver vazio ou não for um número, use o mínimo
    if (valor === '' || isNaN(valor)) {
      setPaginas(prev => ({...prev, [categoria]: min}));
    } 
    // Se for menor que o mínimo, use o mínimo
    else if (valor < min) {
      setPaginas(prev => ({...prev, [categoria]: min}));
    } 
    // Se for maior que o máximo, use o máximo
    else if (valor > max) {
      setPaginas(prev => ({...prev, [categoria]: max}));
    }
  };

  // Efeito para calcular o valor total e atualizar os itens do orçamento
  useEffect(() => {
    let valorTotal = 0;
    const itens = [];
    
    // Adicionar serviços de mentoria - com ordenação específica
    // Primeiro, encontros de 45 minutos (id: 1)
    const mentoria45Min = servicosSelecionados.mentoria.find(s => s.id === 1);
    if (mentoria45Min) {
      const valorServico = mentoria45Min.valor * mentoria45Min.quantidade;
      valorTotal += valorServico;
      
      itens.push({
        nome: `${mentoria45Min.nome} (${mentoria45Min.quantidade}x)`,
        valor: valorServico
      });
    }
    
    // Depois, encontros de 1h30 (id: 2)
    const mentoria1h30 = servicosSelecionados.mentoria.find(s => s.id === 2);
    if (mentoria1h30) {
      const valorServico = mentoria1h30.valor * mentoria1h30.quantidade;
      valorTotal += valorServico;
      
      itens.push({
        nome: `${mentoria1h30.nome} (${mentoria1h30.quantidade}x)`,
        valor: valorServico
      });
    }
    
    // Adicionar serviço de acompanhamento
    if (servicosSelecionados.acompanhamento) {
      valorTotal += servicosSelecionados.acompanhamento.valor;
      
      itens.push({
        nome: servicosSelecionados.acompanhamento.nome,
        valor: servicosSelecionados.acompanhamento.valor
      });
    }
    
    // Adicionar serviço de leitura crítica (inclui opção de não querer)
    if (servicosSelecionados.leitura) {
      if (servicosSelecionados.leitura.tipo === "porPagina") {
        const valorLeitura = servicosSelecionados.leitura.valorPorPagina * paginas.leitura;
        valorTotal += valorLeitura;
        
        itens.push({
          nome: `${servicosSelecionados.leitura.nome} (${paginas.leitura} páginas)`,
          valor: valorLeitura
        });
      } else if (servicosSelecionados.leitura.tipo === "fixo") {
        // Adiciona a opção "Não vou querer leitura crítica" com valor zero
        itens.push({
          nome: servicosSelecionados.leitura.nome,
          valor: 0
        });
      }
    }
    
    // Adicionar serviço de formatação (inclui opção de não querer)
    if (servicosSelecionados.formatacao) {
      if (servicosSelecionados.formatacao.tipo === "porPagina") {
        const valorFormatacao = servicosSelecionados.formatacao.valorPorPagina * paginas.formatacao;
        valorTotal += valorFormatacao;
        
        itens.push({
          nome: `${servicosSelecionados.formatacao.nome} (${paginas.formatacao} páginas)`,
          valor: valorFormatacao
        });
      } else if (servicosSelecionados.formatacao.tipo === "fixo") {
        // Adiciona a opção "Não vou querer formatação ABNT" com valor zero
        itens.push({
          nome: servicosSelecionados.formatacao.nome,
          valor: 0
        });
      }
    }
    
    setValorTotal(valorTotal);
    setItensOrcamento(itens);
  }, [servicosSelecionados, paginas]);

  // Efeito para verificar seleções iniciais quando o componente carrega
  useEffect(() => {
    verificarErros();
  }, [servicosSelecionados]);

  // Salvar orçamento no sessionStorage
  const salvarOrcamento = () => {
    sessionStorage.setItem('orcamento', JSON.stringify({
      itens: itensOrcamento,
      valorTotal: valorTotal
    }));
  };

  // Carregar orçamento do sessionStorage
  const carregarOrcamento = () => {
    const orcamentoSalvo = sessionStorage.getItem('orcamento');
    if (orcamentoSalvo) {
      return JSON.parse(orcamentoSalvo);
    }
    return null;
  };

  return (
    <OrcamentoContext.Provider 
      value={{ 
        servicosSelecionados, 
        paginas, 
        erros,
        valorTotal,
        itensOrcamento,
        toggleServicoMentoria, 
        alterarQuantidadeMentoria, 
        selecionarServico,
        atualizarPaginas,
        validarPaginas,
        verificarErros,
        salvarOrcamento,
        carregarOrcamento
      }}
    >
      {children}
    </OrcamentoContext.Provider>
  );
};

export default OrcamentoProvider;