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
    { id: 20, nome: "Formatação ABNT de 26 a 50 páginas", valorPorPagina: 7.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 26, maxPaginas: 50 },
    { id: 21, nome: "Formatação ABNT de 51 a 75 páginas", valorPorPagina: 6.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 51, maxPaginas: 75 },
    { id: 22, nome: "Formatação ABNT de 76 a 100 páginas", valorPorPagina: 5.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 76, maxPaginas: 100 },
    { id: 23, nome: "Formatação ABNT de 101 a 300 páginas", valorPorPagina: 4.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 101, maxPaginas: 300 }
  ];
  
  export default SERVICOS;