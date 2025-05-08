import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Dados dos serviços
const SERVICOS = [
  { id: 1, nome: "Encontro de mentoria (45 minutos)", valor: 180.00, tipo: "fixo", categoria: "mentoria" },
  { id: 2, nome: "Encontro de mentoria (1h30)", valor: 307.00, tipo: "fixo", categoria: "mentoria" },
  
  { id: 3, nome: "Período de acompanhamento (15 dias)", valor: 75.00, tipo: "base", categoria: "acompanhamento" },
  { id: 4, nome: "Período de acompanhamento (30 dias)", valor: 100.00, tipo: "base", categoria: "acompanhamento" },
  { id: 5, nome: "Período de acompanhamento (45 dias)", valor: 150.00, tipo: "base", categoria: "acompanhamento" },
  { id: 6, nome: "Período de acompanhamento (60 dias)", valor: 200.00, tipo: "base", categoria: "acompanhamento" },
  { id: 7, nome: "Período de acompanhamento (75 dias)", valor: 250.00, tipo: "base", categoria: "acompanhamento" },
  { id: 8, nome: "Período de acompanhamento (90 dias)", valor: 300.00, tipo: "base", categoria: "acompanhamento" },
  { id: 9, nome: "Período de acompanhamento (100 dias)", valor: 350.00, tipo: "base", categoria: "acompanhamento" },
  { id: 10, nome: "Período de acompanhamento (120 dias)", valor: 400.00, tipo: "base", categoria: "acompanhamento" },
  { id: 11, nome: "Período de acompanhamento (150 dias)", valor: 500.00, tipo: "base", categoria: "acompanhamento" },
  
  { id: 12, nome: "Leitura crítica (se o cliente não quiser leitura)", valor: 0.00, tipo: "fixo", categoria: "leitura" },
  { id: 13, nome: "Leitura crítica (até 25 páginas)", valorPorPagina: 13.50, tipo: "porPagina", categoria: "leitura", minPaginas: 1, maxPaginas: 25 },
  { id: 14, nome: "Leitura crítica (de 25 a 50 páginas)", valorPorPagina: 11.50, tipo: "porPagina", categoria: "leitura", minPaginas: 26, maxPaginas: 50 },
  { id: 15, nome: "Leitura crítica (de 50 a 75 páginas)", valorPorPagina: 9.50, tipo: "porPagina", categoria: "leitura", minPaginas: 51, maxPaginas: 75 },
  { id: 16, nome: "Leitura crítica (de 75 a 100 páginas)", valorPorPagina: 7.50, tipo: "porPagina", categoria: "leitura", minPaginas: 76, maxPaginas: 100 },
  { id: 17, nome: "Leitura crítica (de 100 a 300 páginas)", valorPorPagina: 5.50, tipo: "porPagina", categoria: "leitura", minPaginas: 101, maxPaginas: 300 },
  
  { id: 18, nome: "Formatação (se o cliente não quiser Formatação)", valor: 0.00, tipo: "fixo", categoria: "formatacao" },
  { id: 19, nome: "Formatação ABNT (até 25 páginas)", valorPorPagina: 8.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 1, maxPaginas: 25 },
  { id: 20, nome: "Formatação ABNT (de 25 a 50 páginas)", valorPorPagina: 7.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 26, maxPaginas: 50 },
  { id: 21, nome: "Formatação ABNT (de 50 a 75 páginas)", valorPorPagina: 6.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 51, maxPaginas: 75 },
  { id: 22, nome: "Formatação ABNT (de 75 a 100 páginas)", valorPorPagina: 5.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 76, maxPaginas: 100 },
  { id: 23, nome: "Formatação ABNT (de 100 a 300 páginas)", valorPorPagina: 4.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 101, maxPaginas: 300 }
];

// Categorias de serviços
const CATEGORIAS = [
  { id: "mentoria", nome: "Mentoria", multi: true },
  { id: "acompanhamento", nome: "Período de Acompanhamento", multi: false },
  { id: "leitura", nome: "Leitura Crítica", multi: false },
  { id: "formatacao", nome: "Formatação ABNT", multi: false }
];

const CalculadoraDeLeve = () => {
  const navigate = useNavigate();
  
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
  
  // Estado para controlar tooltips
  const [showTooltip, setShowTooltip] = useState({
    leitura: false,
    formatacao: false
  });
  
  // Estado para armazenar o valor total do orçamento
  const [valorTotal, setValorTotal] = useState(0);
  
  // Estado para rastrear os itens selecionados para o resumo
  const [itensOrcamento, setItensOrcamento] = useState([]);

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
  const selecionarServico = useCallback((categoria, servico) => {
    if (!servico) {
      setServicosSelecionados(prev => ({...prev, [categoria]: null}));
      return;
    }
    
    setServicosSelecionados(prev => ({...prev, [categoria]: servico}));
    
    // Redefine a quantidade de páginas quando selecionar "não querer" serviço
    if (servico.valor === 0 && (categoria === 'leitura' || categoria === 'formatacao')) {
      setPaginas(prev => ({...prev, [categoria]: 0}));
    }
  }, []);
  
  // Função para atualizar quantidade de páginas
  const alterarPaginas = (categoria, valor) => {
    // Não permita alterar páginas se o serviço não estiver selecionado ou for "não querer"
    if (!servicosSelecionados[categoria] || servicosSelecionados[categoria].valor === 0) {
      return;
    }
    
    // Garante que o valor seja pelo menos 0
    const novoValor = Math.max(0, valor);
    
    setPaginas(prev => ({...prev, [categoria]: novoValor}));
  };
  
  // Função para determinar automaticamente o serviço apropriado com base na quantidade de páginas
  const determinarServicoComBaseEmPaginas = useCallback((categoria) => {
    const qtdPaginas = paginas[categoria];
    
    if (qtdPaginas <= 0) {
      // Se não houver páginas, seleciona o serviço "não querer"
      const servicoNaoQuerer = SERVICOS.find(s => 
        s.categoria === categoria && s.tipo === "fixo" && s.valor === 0
      );
      
      selecionarServico(categoria, servicoNaoQuerer);
      return;
    }
    
    // Encontra o serviço adequado para a quantidade de páginas
    const servicoAdequado = SERVICOS.find(s => 
      s.categoria === categoria && s.tipo === "porPagina" && 
      qtdPaginas >= s.minPaginas && qtdPaginas <= s.maxPaginas
    );
    
    if (servicoAdequado) {
      selecionarServico(categoria, servicoAdequado);
    }
  }, [paginas, selecionarServico]);
  
  // Efeito para determinar automaticamente o serviço adequado com base nas páginas
  useEffect(() => {
    if (paginas.leitura > 0) {
      determinarServicoComBaseEmPaginas('leitura');
    }
  }, [paginas.leitura, determinarServicoComBaseEmPaginas]);
  
  useEffect(() => {
    if (paginas.formatacao > 0) {
      determinarServicoComBaseEmPaginas('formatacao');
    }
  }, [paginas.formatacao, determinarServicoComBaseEmPaginas]);
  
  // Efeito para calcular o valor total e atualizar os itens do orçamento
  useEffect(() => {
    let valorTotal = 0;
    const itens = [];
    
    // Adicionar serviços de mentoria
    servicosSelecionados.mentoria.forEach(servico => {
      const valorServico = servico.valor * servico.quantidade;
      valorTotal += valorServico;
      
      itens.push({
        nome: `${servico.nome} (${servico.quantidade}x)`,
        valor: valorServico
      });
    });
    
    // Adicionar serviço de acompanhamento
    if (servicosSelecionados.acompanhamento) {
      valorTotal += servicosSelecionados.acompanhamento.valor;
      
      itens.push({
        nome: servicosSelecionados.acompanhamento.nome,
        valor: servicosSelecionados.acompanhamento.valor
      });
    }
    
    // Adicionar serviço de leitura crítica
    if (servicosSelecionados.leitura && servicosSelecionados.leitura.tipo === "porPagina") {
      const valorLeitura = servicosSelecionados.leitura.valorPorPagina * paginas.leitura;
      valorTotal += valorLeitura;
      
      itens.push({
        nome: `${servicosSelecionados.leitura.nome} (${paginas.leitura} páginas)`,
        valor: valorLeitura
      });
    }
    
    // Adicionar serviço de formatação
    if (servicosSelecionados.formatacao && servicosSelecionados.formatacao.tipo === "porPagina") {
      const valorFormatacao = servicosSelecionados.formatacao.valorPorPagina * paginas.formatacao;
      valorTotal += valorFormatacao;
      
      itens.push({
        nome: `${servicosSelecionados.formatacao.nome} (${paginas.formatacao} páginas)`,
        valor: valorFormatacao
      });
    }
    
    setValorTotal(valorTotal);
    setItensOrcamento(itens);
  }, [servicosSelecionados, paginas]);
  
  // Função para lidar com o clique no botão "Gerar Orçamento"
  const handleGerarOrcamento = () => {
    if (itensOrcamento.length === 0) {
      alert("Por favor, selecione pelo menos um serviço para gerar o orçamento.");
      return;
    }
    
    // Armazenar dados do orçamento no sessionStorage para recuperar na próxima página
    sessionStorage.setItem('orcamento', JSON.stringify({
      itens: itensOrcamento,
      valorTotal: valorTotal
    }));
    
    // Redirecionar para a página de resumo
    navigate('/resumo');
  };
  
  // Renderizar serviços para uma categoria específica
  const renderizarServicos = (categoria) => {
    const servicos = SERVICOS.filter(s => s.categoria === categoria.id);
    
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-indigo-800">{categoria.nome}</h2>
        
        {/* Serviços de Mentoria (múltipla escolha) */}
        {categoria.id === 'mentoria' && (
          <div className="grid gap-4">
            {servicos.map(servico => {
              const selecionado = servicosSelecionados.mentoria.some(s => s.id === servico.id);
              const servicoAtual = servicosSelecionados.mentoria.find(s => s.id === servico.id);
              
              return (
                <div key={servico.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleServicoMentoria(servico)}
                        className={`w-6 h-6 rounded-md mr-3 flex items-center justify-center ${
                          selecionado ? 'bg-indigo-600 text-white' : 'border border-gray-300'
                        }`}
                      >
                        {selecionado && <Check size={16} />}
                      </button>
                      <span className={selecionado ? 'font-medium' : ''}>{servico.nome}</span>
                    </div>
                    <span className="font-medium">R$ {servico.valor.toFixed(2)}</span>
                  </div>
                  
                  {selecionado && (
                    <div className="ml-9 mt-3 flex items-center space-x-3">
                      <span className="text-sm text-gray-600">Quantidade:</span>
                      <div className="flex items-center border rounded">
                        <button 
                          onClick={() => alterarQuantidadeMentoria(servico.id, -1)}
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3">{servicoAtual.quantidade}</span>
                        <button 
                          onClick={() => alterarQuantidadeMentoria(servico.id, 1)}
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        
        {/* Serviços de Acompanhamento (exclusivo) */}
        {categoria.id === 'acompanhamento' && (
          <div className="grid gap-4">
            {servicos.map(servico => {
              const selecionado = servicosSelecionados.acompanhamento?.id === servico.id;
              
              return (
                <div 
                  key={servico.id} 
                  className={`border rounded-lg p-4 bg-white shadow-sm cursor-pointer ${
                    selecionado ? 'border-indigo-600' : ''
                  }`}
                  onClick={() => selecionarServico('acompanhamento', servico)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
                          selecionado ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'
                        }`}
                      >
                        {selecionado && <Check size={14} />}
                      </div>
                      <span className={selecionado ? 'font-medium' : ''}>{servico.nome}</span>
                    </div>
                    <span className="font-medium">R$ {servico.valor.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Serviços de Leitura Crítica */}
        {categoria.id === 'leitura' && (
          <div className="space-y-4">
            {/* Opção "não querer" */}
            {servicos
              .filter(s => s.tipo === "fixo")
              .map(servico => {
                const selecionado = servicosSelecionados.leitura?.id === servico.id;
                
                return (
                  <div 
                    key={servico.id} 
                    className={`border rounded-lg p-4 bg-white shadow-sm cursor-pointer ${
                      selecionado ? 'border-indigo-600' : ''
                    }`}
                    onClick={() => selecionarServico('leitura', servico)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
                            selecionado ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'
                          }`}
                        >
                          {selecionado && <Check size={14} />}
                        </div>
                        <span className={selecionado ? 'font-medium' : ''}>{servico.nome}</span>
                      </div>
                      <span className="font-medium">R$ {servico.valor.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })
            }
            
            {/* Opção com entrada de páginas */}
            <div 
              className={`border rounded-lg p-4 bg-white shadow-sm ${
                servicosSelecionados.leitura && servicosSelecionados.leitura.tipo === "porPagina" 
                  ? 'border-indigo-600' 
                  : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div 
                    className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
                      servicosSelecionados.leitura && servicosSelecionados.leitura.tipo === "porPagina" 
                        ? 'border-indigo-600 bg-indigo-600 text-white' 
                        : 'border-gray-300'
                    }`}
                  >
                    {servicosSelecionados.leitura && servicosSelecionados.leitura.tipo === "porPagina" && (
                      <Check size={14} />
                    )}
                  </div>
                  <span 
                    className={servicosSelecionados.leitura && servicosSelecionados.leitura.tipo === "porPagina" ? 'font-medium' : ''}
                  >
                    Leitura crítica
                  </span>
                  
                  <div 
                    className="relative ml-2"
                    onMouseEnter={() => setShowTooltip(prev => ({...prev, leitura: true}))}
                    onMouseLeave={() => setShowTooltip(prev => ({...prev, leitura: false}))}
                  >
                    <span className="cursor-help text-indigo-600 font-bold">?</span>
                    {showTooltip.leitura && (
                      <div className="absolute z-10 w-72 bg-gray-800 text-white text-sm rounded p-2 -left-20 top-6">
                        <p className="text-xs">Preços por página:</p>
                        <ul className="text-xs mt-1">
                          {servicos
                            .filter(s => s.tipo === "porPagina")
                            .map(s => (
                              <li key={s.id}>
                                {s.nome.replace('Leitura crítica ', '')}: R$ {s.valorPorPagina.toFixed(2)}
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                {servicosSelecionados.leitura && servicosSelecionados.leitura.tipo === "porPagina" && (
                  <span className="font-medium">
                    R$ {(servicosSelecionados.leitura.valorPorPagina * paginas.leitura).toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="ml-9 flex items-center space-x-3">
                <span className="text-sm text-gray-600">Número de páginas:</span>
                <input
                  type="number"
                  min="0"
                  value={paginas.leitura}
                  onChange={(e) => alterarPaginas('leitura', parseInt(e.target.value || 0))}
                  onClick={() => {
                    // Se não houver serviço selecionado, seleciona o primeiro serviço por página
                    if (!servicosSelecionados.leitura || servicosSelecionados.leitura.tipo !== "porPagina") {
                      const primeiroServicoPorPagina = servicos.find(s => s.tipo === "porPagina");
                      if (primeiroServicoPorPagina) {
                        selecionarServico('leitura', primeiroServicoPorPagina);
                      }
                    }
                  }}
                  className={`w-20 border rounded py-1 px-2 text-center ${
                    !servicosSelecionados.leitura || servicosSelecionados.leitura.valor === 0 
                      ? 'bg-gray-100' 
                      : ''
                  }`}
                  disabled={!servicosSelecionados.leitura || servicosSelecionados.leitura.valor === 0}
                />
                
                {servicosSelecionados.leitura && servicosSelecionados.leitura.tipo === "porPagina" && (
                  <span className="text-sm text-gray-600">
                    a R$ {servicosSelecionados.leitura.valorPorPagina.toFixed(2)} cada página
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Serviços de Formatação */}
        {categoria.id === 'formatacao' && (
          <div className="space-y-4">
            {/* Opção "não querer" */}
            {servicos
              .filter(s => s.tipo === "fixo")
              .map(servico => {
                const selecionado = servicosSelecionados.formatacao?.id === servico.id;
                
                return (
                  <div 
                    key={servico.id} 
                    className={`border rounded-lg p-4 bg-white shadow-sm cursor-pointer ${
                      selecionado ? 'border-indigo-600' : ''
                    }`}
                    onClick={() => selecionarServico('formatacao', servico)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
                            selecionado ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'
                          }`}
                        >
                          {selecionado && <Check size={14} />}
                        </div>
                        <span className={selecionado ? 'font-medium' : ''}>{servico.nome}</span>
                      </div>
                      <span className="font-medium">R$ {servico.valor.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })
            }
            
            {/* Opção com entrada de páginas */}
            <div 
              className={`border rounded-lg p-4 bg-white shadow-sm ${
                servicosSelecionados.formatacao && servicosSelecionados.formatacao.tipo === "porPagina" 
                  ? 'border-indigo-600' 
                  : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div 
                    className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
                      servicosSelecionados.formatacao && servicosSelecionados.formatacao.tipo === "porPagina" 
                        ? 'border-indigo-600 bg-indigo-600 text-white' 
                        : 'border-gray-300'
                    }`}
                  >
                    {servicosSelecionados.formatacao && servicosSelecionados.formatacao.tipo === "porPagina" && (
                      <Check size={14} />
                    )}
                  </div>
                  <span 
                    className={servicosSelecionados.formatacao && servicosSelecionados.formatacao.tipo === "porPagina" ? 'font-medium' : ''}
                  >
                    Formatação ABNT
                  </span>
                  
                  <div 
                    className="relative ml-2"
                    onMouseEnter={() => setShowTooltip(prev => ({...prev, formatacao: true}))}
                    onMouseLeave={() => setShowTooltip(prev => ({...prev, formatacao: false}))}
                  >
                    <span className="cursor-help text-indigo-600 font-bold">?</span>
                    {showTooltip.formatacao && (
                      <div className="absolute z-10 w-72 bg-gray-800 text-white text-sm rounded p-2 -left-20 top-6">
                        <p className="text-xs">Preços por página:</p>
                        <ul className="text-xs mt-1">
                          {servicos
                            .filter(s => s.tipo === "porPagina")
                            .map(s => (
                              <li key={s.id}>
                                {s.nome.replace('Formatação ABNT ', '')}: R$ {s.valorPorPagina.toFixed(2)}
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                {servicosSelecionados.formatacao && servicosSelecionados.formatacao.tipo === "porPagina" && (
                  <span className="font-medium">
                    R$ {(servicosSelecionados.formatacao.valorPorPagina * paginas.formatacao).toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="ml-9 flex items-center space-x-3">
                <span className="text-sm text-gray-600">Número de páginas:</span>
                <input
                  type="number"
                  min="0"
                  value={paginas.formatacao}
                  onChange={(e) => alterarPaginas('formatacao', parseInt(e.target.value || 0))}
                  onClick={() => {
                    // Se não houver serviço selecionado, seleciona o primeiro serviço por página
                    if (!servicosSelecionados.formatacao || servicosSelecionados.formatacao.tipo !== "porPagina") {
                      const primeiroServicoPorPagina = servicos.find(s => s.tipo === "porPagina");
                      if (primeiroServicoPorPagina) {
                        selecionarServico('formatacao', primeiroServicoPorPagina);
                      }
                    }
                  }}
                  className={`w-20 border rounded py-1 px-2 text-center ${
                    !servicosSelecionados.formatacao || servicosSelecionados.formatacao.valor === 0 
                      ? 'bg-gray-100' 
                      : ''
                  }`}
                  disabled={!servicosSelecionados.formatacao || servicosSelecionados.formatacao.valor === 0}
                />
                
                {servicosSelecionados.formatacao && servicosSelecionados.formatacao.tipo === "porPagina" && (
                  <span className="text-sm text-gray-600">
                    a R$ {servicosSelecionados.formatacao.valorPorPagina.toFixed(2)} cada página
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">CALCULADORA DE LEVE</h1>
        <p className="text-gray-600">Simule seu orçamento para serviços de mentoria acadêmica</p>
      </header>
      
      {/* Seção de seleção de serviços (coluna única) */}
      <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
        {CATEGORIAS.map(categoria => renderizarServicos(categoria))}
      </div>
      
      {/* Botão para gerar orçamento */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-100 mb-8">
        <button 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition"
          onClick={handleGerarOrcamento}
        >
          Gerar Orçamento
        </button>
      </div>
      
      {/* Rodapé removido conforme solicitado */}
    </div>
  );
};

export default CalculadoraDeLeve;