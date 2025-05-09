# 🧮 Calculadora De Leve

Calculadora de orçamentos para serviços de mentoria acadêmica da empresa "De Leve na Tese".

## 📋 Sobre o Projeto

Este projeto foi criado para a empresa "De Leve na Tese", um serviço de mentoria acadêmica. A calculadora permite que os clientes selecionem serviços e visualizem um orçamento em tempo real.

## ✨ Funcionalidades

- Seleção de serviços de mentoria com quantidades ajustáveis
- Escolha de períodos de acompanhamento acadêmico
- Cálculo de valores para leitura crítica e formatação ABNT baseado no número de páginas e intervalos
- Validação de formulário exigindo ao menos uma seleção em cada categoria de serviço
- Resumo detalhado do orçamento com informações de contato
- Opções para enviar orçamento por email ou solicitar contratação
- Interface responsiva e amigável para desktop e dispositivos móveis
- Feedback visual claro para seleções e validações

## 🛠️ Tecnologias Utilizadas

- React.js
- React Router para navegação entre páginas
- Tailwind CSS para estilização responsiva
- Lucide React para ícones e elementos visuais
- Session Storage para persistência de dados entre páginas

## 📁 Estrutura de Arquivos

```
calculadora-de-leve/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── CalculadoraDeLeve.js  # Seleção de serviços e validação
│   │   └── ResumoOrcamento.js    # Visualização do orçamento final
│   ├── App.js                    # Configuração de rotas
│   ├── App.css                   # Estilos globais
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Funcionalidades Detalhadas

### 📝 Página de Seleção de Serviços

- **Encontros de Mentoria**: Permite selecionar serviços de 45 minutos ou 1 hora e 30 minutos, com quantidade ajustável
- **Período de Acompanhamento**: Opções de 15 a 150 dias com preços diferenciados
- **Leitura Crítica**: Preços por página variando conforme a quantidade de páginas (até 300 páginas)
- **Formatação ABNT**: Preços por página variando conforme a quantidade de páginas (até 300 páginas)
- **Validação em Tempo Real**: Feedback visual indicando quais categorias ainda precisam de seleção

### 💰 Página de Resumo do Orçamento

- Visualização detalhada de todos os serviços selecionados
- Cálculo do valor total do orçamento
- Notificação de validade de até 5 dias úteis
- Opções para enviar por email ou solicitar contratação
- Informações de contato com ícones intuitivos