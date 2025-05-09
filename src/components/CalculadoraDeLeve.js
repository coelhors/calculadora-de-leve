import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Dados dos serviços
const SERVICOS = [
  { id: 1, nome: "Encontro de mentoria de 45 minutos", valor: 180.00, tipo: "fixo", categoria: "mentoria" },
  { id: 2, nome: "Encontro de mentoria de 1 hora e 30 minutos", valor: 307.00, tipo: "fixo", categoria: "mentoria" },
  
  { id: 3, nome: "Período de acompanhamento de 15 dias", valor: 75.00, tipo: "base", categoria: "acompanhamento" },
  { id: 4, nome: "Período de acompanhamento de 30 dias", valor: 100.00, tipo: "base", categoria: "acompanhamento" },
  { id: 5, nome: "Período de acompanhamento de 45 dias", valor: 150.00, tipo: "base", categoria: "acompanhamento" },
  { id: 6, nome: "Período de acompanhamento de 60 dias ", valor: 200.00, tipo: "base", categoria: "acompanhamento" },
  { id: 7, nome: "Período de acompanhamento de 75 dias", valor: 250.00, tipo: "base", categoria: "acompanhamento" },
  { id: 8, nome: "Período de acompanhamento de 90 dias", valor: 300.00, tipo: "base", categoria: "acompanhamento" },
  { id: 9, nome: "Período de acompanhamento de 100 dias", valor: 350.00, tipo: "base", categoria: "acompanhamento" },
  { id: 10, nome: "Período de acompanhamento de 120 dias", valor: 400.00, tipo: "base", categoria: "acompanhamento" },
  { id: 11, nome: "Período de acompanhamento de 150 dias", valor: 500.00, tipo: "base", categoria: "acompanhamento" },
  
  // Modificado conforme solicitado - ajuste nos intervalos de páginas
  { id: 12, nome: "Não vou querer leitura crítica", valor: 0.00, tipo: "fixo", categoria: "leitura" },
  { id: 13, nome: "Leitura crítica de até 25 páginas", valorPorPagina: 13.50, tipo: "porPagina", categoria: "leitura", minPaginas: 1, maxPaginas: 25 },
  { id: 14, nome: "Leitura crítica de 26 a 50 páginas", valorPorPagina: 11.50, tipo: "porPagina", categoria: "leitura", minPaginas: 26, maxPaginas: 50 },
  { id: 15, nome: "Leitura crítica de 51 a 75 páginas", valorPorPagina: 9.50, tipo: "porPagina", categoria: "leitura", minPaginas: 51, maxPaginas: 75 },
  { id: 16, nome: "Leitura crítica de 76 a 100 páginas", valorPorPagina: 7.50, tipo: "porPagina", categoria: "leitura", minPaginas: 76, maxPaginas: 100 },
  { id: 17, nome: "Leitura crítica de 101 a 300 páginas", valorPorPagina: 5.50, tipo: "porPagina", categoria: "leitura", minPaginas: 101, maxPaginas: 300 },
  
  { id: 18, nome: "Não vou querer formatação ABNT", valor: 0.00, tipo: "fixo", categoria: "formatacao" },
  { id: 19, nome: "Formatação ABNT de até 25 páginas", valorPorPagina: 8.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 1, maxPaginas: 25 },
  { id: 20, nome: "Formatação ABNT de 26 e 50 páginas", valorPorPagina: 7.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 26, maxPaginas: 50 },
  { id: 21, nome: "Formatação ABNT de 51 e 75 páginas", valorPorPagina: 6.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 51, maxPaginas: 75 },
  { id: 22, nome: "Formatação ABNT de 76 e 100 páginas", valorPorPagina: 5.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 76, maxPaginas: 100 },
  { id: 23, nome: "Formatação ABNT de 101 e 300 páginas", valorPorPagina: 4.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 101, maxPaginas: 300 }
];

// Categorias de serviços
const CATEGORIAS = [
  { id: "mentoria", nome: "Encontros de Mentoria", multi: true },
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
  
  // Função para validar se todas as categorias têm pelo menos uma opção selecionada
  const validarSelecoes = () => {
    const novoErros = {
      mentoria: servicosSelecionados.mentoria.length === 0,
      acompanhamento: !servicosSelecionados.acompanhamento,
      leitura: !servicosSelecionados.leitura,
      formatacao: !servicosSelecionados.formatacao
    };
    
    setErros(novoErros);
    
    // Retorna true se não houver erros (todas as categorias têm seleções)
    return !Object.values(novoErros).some(erro => erro);
  };

  // Efeito para verificar seleções iniciais quando o componente carrega
  useEffect(() => {
    // Verifica se alguma categoria não tem seleção
    const novoErros = {
      mentoria: servicosSelecionados.mentoria.length === 0,
      acompanhamento: !servicosSelecionados.acompanhamento,
      leitura: !servicosSelecionados.leitura,
      formatacao: !servicosSelecionados.formatacao
    };
    
    setErros(novoErros);
  }, [servicosSelecionados]);

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
      
      // Limpa erro se algum serviço foi selecionado
      if (servicosAtuais.length > 0) {
        setErros(prev => ({...prev, mentoria: false}));
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
          
          // Se não houver mais serviços, marca erro
          if (servicosAtuais.length === 0) {
            setErros(prev => ({...prev, mentoria: true}));
          }
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
      // Marca erro para esta categoria
      setErros(prev => ({...prev, [categoria]: true}));
      return;
    }
    
    setServicosSelecionados(prev => ({...prev, [categoria]: servico}));
    // Limpa erro para esta categoria
    setErros(prev => ({...prev, [categoria]: false}));
    
    // Redefine a quantidade de páginas quando selecionar "não querer" serviço
    if (servico.valor === 0 && (categoria === 'leitura' || categoria === 'formatacao')) {
      setPaginas(prev => ({...prev, [categoria]: 0}));
    } else if (servico.tipo === 'porPagina') {
      // Define o número mínimo de páginas quando selecionar um serviço por página
      setPaginas(prev => ({...prev, [categoria]: servico.minPaginas}));
    }
  }, []);
  
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
  
  // Função para lidar com o clique no botão "Gerar Orçamento"
  const handleGerarOrcamento = () => {
    // Verifica se todas as categorias têm uma opção selecionada
    if (!validarSelecoes()) {
      // Exibe mensagem de erro e faz scroll até o topo para mostrar as categorias com erro
      alert("Por favor, selecione pelo menos uma opção em cada categoria antes de gerar o orçamento.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
  
  // Renderizar serviços para uma categoria específica
  const renderizarServicos = (categoria) => {
    const servicos = SERVICOS.filter(s => s.categoria === categoria.id);
    
    return (
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl font-bold text-indigo-800 mb-1 sm:mb-0">{categoria.nome}</h2>
          {erros[categoria.id] && (
            <span className="text-red-600 text-sm font-medium">
              ⚠️ Selecione pelo menos uma opção
            </span>
          )}
        </div>
        
        {/* Serviços de Mentoria (múltipla escolha) */}
        {categoria.id === 'mentoria' && (
          <div className={`grid gap-4 ${erros.mentoria ? 'border-red-300 border-2 rounded-lg p-2' : ''}`}>
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
                    <span className="font-medium">R$ {servico.valor.toFixed(2).replace('.', ',')} cada</span>
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
          <div className={`grid gap-4 ${erros.acompanhamento ? 'border-red-300 border-2 rounded-lg p-2' : ''}`}>
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
                    <span className="font-medium">R$ {servico.valor.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Serviços de Leitura Crítica (modificado com abordagem direta) */}
        {categoria.id === 'leitura' && (
          <div className={`space-y-4 ${erros.leitura ? 'border-red-300 border-2 rounded-lg p-2' : ''}`}>
            {/* Opção "não querer" */}
            <div 
              className={`border rounded-lg p-4 bg-white shadow-sm cursor-pointer ${
                servicosSelecionados.leitura?.id === 12 ? 'border-indigo-600' : ''
              }`}
              onClick={() => selecionarServico('leitura', SERVICOS.find(s => s.id === 12))}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
                      servicosSelecionados.leitura?.id === 12 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'
                    }`}
                  >
                    {servicosSelecionados.leitura?.id === 12 && <Check size={14} />}
                  </div>
                  <span className={servicosSelecionados.leitura?.id === 12 ? 'font-medium' : ''}>
                    Não vou querer leitura crítica
                  </span>
                </div>
                <span className="font-medium">R$ 0,00</span>
              </div>
            </div>
            
            {/* Opção até 25 páginas */}
            <div 
              className={`border rounded-lg p-4 bg-white shadow-sm cursor-pointer ${
                servicosSelecionados.leitura?.id === 13 ? 'border-indigo-600' : ''
              }`}
            >
              <div 
                className="flex items-center justify-between mb-3"
                onClick={() => selecionarServico('leitura', SERVICOS.find(s => s.id === 13))}
              >
                <div className="flex items-center">
                  <div 
                    className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
                      servicosSelecionados.leitura?.id === 13 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'
                    }`}
                  >
                    {servicosSelecionados.leitura?.id === 13 && <Check size={14} />}
                  </div>
                  <span className={servicosSelecionados.leitura?.id === 13 ? 'font-medium' : ''}>
                    Leitura crítica (até 25 páginas)
                  </span>
                </div>
                <span className="font-medium">
                  R$ 13,50 a página
                </span>
              </div>
              
              {servicosSelecionados.leitura?.id === 13 && (
                <div className="ml-9 flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Número de páginas:</span>
                  <input
                    type="number"
                    min="1"
                    max="25"
                    value={paginas.leitura}
                    onChange={(e) => {
                      // Permite qualquer entrada, mesmo temporariamente inválida
                      const valor = e.target.value === '' ? '' : parseInt(e.target.value);
                      setPaginas({...paginas, leitura: valor});
                    }}
                    onBlur={() => validarPaginas('leitura', 1, 25)}
                    className="w-20 border rounded py-1 px-2 text-center"
                  />
                  <span className="text-sm text-gray-600">
                    (min: 1, max: 25)
                  </span>
                </div>
              )}
            </div>
            
            {/* Opção 26 a 50 páginas */}
            <div 
              className={`border rounded-lg p-4 bg-white shadow-sm cursor-pointer ${
                servicosSelecionados.leitura?.id === 14 ? 'border-indigo-600' : ''
              }`}
            >
              <div 
                className="flex items-center justify-between mb-3"
                onClick={() => selecionarServico('leitura', SERVICOS.find(s => s.id === 14))}
              >
                <div className="flex items-center">
                  <div 
                    className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
                      servicosSelecionados.leitura?.id === 14 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'
                    }`}
                  >
                    {servicosSelecionados.leitura?.id === 14 && <Check size={14} />}
                  </div>
                  <span className={servicosSelecionados.leitura?.id === 14 ? 'font-medium' : ''}>
                    Leitura crítica (de 26 a 50 páginas)
                  </span>
                </div>
                <span className="font-medium">
                  R$ 11,50 a página
                </span>
              </div>
              
              {servicosSelecionados.leitura?.id === 14 && (
                <div className="ml-9 flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Número de páginas:</span>
                  <input
                    type="number"
                    min="26"
                    max="50"
                    value={paginas.leitura}
                    onChange={(e) => {
                      const valor = e.target.value === '' ? '' : parseInt(e.target.value);
                      setPaginas({...paginas, leitura: valor});
                    }}
                    onBlur={() => validarPaginas('leitura', 26, 50)}
                    className="w-20 border rounded py-1 px-2 text-center"
                  />
                  <span className="text-sm text-gray-600">
                    (min: 26, max: 50)
                  </span>
                </div>
              )}
            </div>
            
            {/* Opção 51 a 75 páginas */}
            <div 
              className={`border rounded-lg p-4 bg-white shadow-sm cursor-pointer ${
                servicosSelecionados.leitura?.id === 15 ? 'border-indigo-600' : ''
              }`}
            >
              <div 
                className="flex items-center justify-between mb-3"
                onClick={() => selecionarServico('leitura', SERVICOS.find(s => s.id === 15))}
              >
                <div className="flex items-center">
                  <div 
                    className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
                      servicosSelecionados.leitura?.id === 15 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'
                    }`}
                  >
                    {servicosSelecionados.leitura?.id === 15 && <Check size={14} />}
                  </div>
                  <span className={servicosSelecionados.leitura?.id === 15 ? 'font-medium' : ''}>
                    Leitura crítica (de 51 a 75 páginas)
                  </span>
                </div>
                <span className="font-medium">
                  R$ 9,50 a página
                </span>
              </div>
              
              {servicosSelecionados.leitura?.id === 15 && (
                <div className="ml-9 flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Número de páginas:</span>
                  <input
                    type="number"
                    min="51"
                    max="75"
                    value={paginas.leitura}
                    onChange={(e) => {
                      const valor = e.target.value === '' ? '' : parseInt(e.target.value);
                      setPaginas({...paginas, leitura: valor});
                    }}
                    onBlur={() => validarPaginas('leitura', 51, 75)}
                    className="w-20 border rounded py-1 px-2 text-center"
                  />
                  <span className="text-sm text-gray-600">
                    (min: 51, max: 75)
                  </span>
                </div>
              )}
            </div>
            
            {/* Opção 76 a 100 páginas */}
            <div 
              className={`border rounded-lg p-4 bg-white shadow-sm cursor-pointer ${
                servicosSelecionados.leitura?.id === 16 ? 'border-indigo-600' : ''
              }`}
            >
              <div 
                className="flex items-center justify-between mb-3"
                onClick={() => selecionarServico('leitura', SERVICOS.find(s => s.id === 16))}
              >
                <div className="flex items-center">
                  <div 
                    className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
                      servicosSelecionados.leitura?.id === 16 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'
                    }`}
                  >
                    {servicosSelecionados.leitura?.id === 16 && <Check size={14} />}
                  </div>
                  <span className={servicosSelecionados.leitura?.id === 16 ? 'font-medium' : ''}>
                    Leitura crítica (de 76 a 100 páginas)
                  </span>
                </div>
                <span className="font-medium">
                  R$ 7,50 a página
                </span>
              </div>
              
              {servicosSelecionados.leitura?.id === 16 && (
                <div className="ml-9 flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Número de páginas:</span>
                  <input
                    type="number"
                    min="76"
                    max="100"
                    value={paginas.leitura}
                    onChange={(e) => {
                      const valor = e.target.value === '' ? '' : parseInt(e.target.value);
                      setPaginas({...paginas, leitura: valor});
                    }}
                    onBlur={() => validarPaginas('leitura', 76, 100)}
                    className="w-20 border rounded py-1 px-2 text-center"
                  />
                  <span className="text-sm text-gray-600">
                    (min: 76, max: 100)
                  </span>
                </div>
              )}
            </div>
            
            {/* Opção 101 a 300 páginas */}
            <div 
              className={`border rounded-lg p-4 bg-white shadow-sm cursor-pointer ${
                servicosSelecionados.leitura?.id === 17 ? 'border-indigo-600' : ''
              }`}
            >
              <div 
                className="flex items-center justify-between mb-3"
                onClick={() => selecionarServico('leitura', SERVICOS.find(s => s.id === 17))}
              >
                <div className="flex items-center">
                  <div 
                    className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
                      servicosSelecionados.leitura?.id === 17 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'
                    }`}
                  >
                    {servicosSelecionados.leitura?.id === 17 && <Check size={14} />}
                  </div>
                  <span className={servicosSelecionados.leitura?.id === 17 ? 'font-medium' : ''}>
                    Leitura crítica (de 101 a 300 páginas)
                  </span>
                </div>
                <span className="font-medium">
                  R$ 5,50 a página
                </span>
              </div>
              
              {servicosSelecionados.leitura?.id === 17 && (
                <div className="ml-9 flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Número de páginas:</span>
                  <input
                    type="number"
                    min="101"
                    max="300"
                    value={paginas.leitura}
                    onChange={(e) => {
                      const valor = e.target.value === '' ? '' : parseInt(e.target.value);
                      setPaginas({...paginas, leitura: valor});
                    }}
                    onBlur={() => validarPaginas('leitura', 101, 300)}
                    className="w-20 border rounded py-1 px-2 text-center"
                  />
                  <span className="text-sm text-gray-600">
                    (min: 101, max: 300)
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Serviços de Formatação */}
        {categoria.id === 'formatacao' && (
          <div className={`space-y-4 ${erros.formatacao ? 'border-red-300 border-2 rounded-lg p-2' : ''}`}>
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
                      <span className="font-medium">R$ {servico.valor.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                );
              })
            }
            
            {/* Opção com entrada de páginas */}
            {servicos
              .filter(s => s.tipo === "porPagina")
              .map(servico => {
                const selecionado = servicosSelecionados.formatacao?.id === servico.id;
                
                return (
                  <div 
                    key={servico.id} 
                    className={`border rounded-lg p-4 bg-white shadow-sm ${
                      selecionado ? 'border-indigo-600' : ''
                    }`}
                  >
                    <div 
                      className="flex items-center justify-between mb-3 cursor-pointer"
                      onClick={() => selecionarServico('formatacao', servico)}
                    >
                      <div className="flex items-center">
                        <div 
                          className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border ${
                            selecionado ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'
                          }`}
                        >
                          {selecionado && <Check size={14} />}
                        </div>
                        <span className={selecionado ? 'font-medium' : ''}>
                          {servico.nome}
                        </span>
                      </div>
                      <span className="font-medium">
                        R$ {servico.valorPorPagina.toFixed(2).replace('.', ',')} a página
                      </span>
                    </div>
                    
                    {selecionado && (
                      <div className="ml-9 flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Número de páginas:</span>
                        <input
                          type="number"
                          min={servico.minPaginas}
                          max={servico.maxPaginas}
                          value={paginas.formatacao}
                          onChange={(e) => {
                            const valor = e.target.value === '' ? '' : parseInt(e.target.value);
                            setPaginas({...paginas, formatacao: valor});
                          }}
                          onBlur={() => validarPaginas('formatacao', servico.minPaginas, servico.maxPaginas)}
                          className="w-20 border rounded py-1 px-2 text-center"
                        />
                        <span className="text-sm text-gray-600">
                          (min: {servico.minPaginas}, max: {servico.maxPaginas})
                        </span>
                      </div>
                    )}
                  </div>
                );
              })
            }
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
      <button 
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition mb-8"
        onClick={handleGerarOrcamento}
      >
        Gerar Orçamento
      </button>
      
      {/* Rodapé removido conforme solicitado */}
    </div>
  );
};

export default CalculadoraDeLeve;