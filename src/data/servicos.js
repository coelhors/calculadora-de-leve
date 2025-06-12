// Dados dos serviços
const SERVICOS = [
    { id: 1, nome: "Duração de 45 minutos", valor: 180.00, tipo: "fixo", categoria: "mentoria" },
    { id: 2, nome: "Duração de 1 hora e 30 minutos", valor: 307.00, tipo: "fixo", categoria: "mentoria" },
    
    { id: 3, nome: "De 15 dias", valor: 75.00, tipo: "base", categoria: "acompanhamento" },
    { id: 4, nome: "De 30 dias", valor: 100.00, tipo: "base", categoria: "acompanhamento" },
    { id: 5, nome: "De 45 dias", valor: 150.00, tipo: "base", categoria: "acompanhamento" },
    { id: 6, nome: "De 60 dias ", valor: 200.00, tipo: "base", categoria: "acompanhamento" },
    { id: 7, nome: "De 75 dias", valor: 250.00, tipo: "base", categoria: "acompanhamento" },
    { id: 8, nome: "De 90 dias", valor: 300.00, tipo: "base", categoria: "acompanhamento" },
    { id: 9, nome: "De 100 dias", valor: 350.00, tipo: "base", categoria: "acompanhamento" },
    { id: 10, nome: "De 120 dias", valor: 400.00, tipo: "base", categoria: "acompanhamento" },
    { id: 11, nome: "De 150 dias", valor: 500.00, tipo: "base", categoria: "acompanhamento" },
    
    // Leitura crítica - removido "De" da primeira opção
    { id: 12, nome: "Não vou querer", valor: 0.00, tipo: "fixo", categoria: "leitura" },
    { id: 13, nome: "Até 25 páginas", valorPorPagina: 13.50, tipo: "porPagina", categoria: "leitura", minPaginas: 1, maxPaginas: 25 },
    { id: 14, nome: "De 26 a 50 páginas", valorPorPagina: 11.50, tipo: "porPagina", categoria: "leitura", minPaginas: 26, maxPaginas: 50 },
    { id: 15, nome: "De 51 a 75 páginas", valorPorPagina: 9.50, tipo: "porPagina", categoria: "leitura", minPaginas: 51, maxPaginas: 75 },
    { id: 16, nome: "De 76 a 100 páginas", valorPorPagina: 7.50, tipo: "porPagina", categoria: "leitura", minPaginas: 76, maxPaginas: 100 },
    { id: 17, nome: "De 101 a 300 páginas", valorPorPagina: 5.50, tipo: "porPagina", categoria: "leitura", minPaginas: 101, maxPaginas: 300 },
    
    // Formatação ABNT - removido "De" da primeira opção
    { id: 18, nome: "Não vou querer", valor: 0.00, tipo: "fixo", categoria: "formatacao" },
    { id: 19, nome: "Até 25 páginas", valorPorPagina: 8.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 1, maxPaginas: 25 },
    { id: 20, nome: "De 26 a 50 páginas", valorPorPagina: 7.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 26, maxPaginas: 50 },
    { id: 21, nome: "De 51 a 75 páginas", valorPorPagina: 6.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 51, maxPaginas: 75 },
    { id: 22, nome: "De 76 a 100 páginas", valorPorPagina: 5.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 76, maxPaginas: 100 },
    { id: 23, nome: "De 101 a 300 páginas", valorPorPagina: 4.50, tipo: "porPagina", categoria: "formatacao", minPaginas: 101, maxPaginas: 300 }
  ];
  
  export default SERVICOS;