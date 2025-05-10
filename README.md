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
- Context API para gerenciamento de estado
- Tailwind CSS para estilização responsiva
- Lucide React para ícones e elementos visuais
- Session Storage para persistência de dados entre páginas

## 📁 Estrutura de Arquivos

O projeto segue uma arquitetura modular baseada em responsabilidades específicas:

```
calculadora-de-leve/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── common/                     # Componentes base reutilizáveis
│   │   │   ├── Button.js               # Botão com variantes de estilo
│   │   │   ├── InputNumber.js          # Campo de entrada numérica com validação
│   │   │   └── RadioOption.js          # Opção de seleção tipo radio personalizada
│   │   ├── calculadora/                # Componentes específicos da calculadora
│   │   │   ├── AcompanhamentoSection.js # Seção de períodos de acompanhamento
│   │   │   ├── FormatacaoSection.js    # Seção de formatação ABNT
│   │   │   ├── LeituraCriticaSection.js # Seção de leitura crítica
│   │   │   ├── MentoriaSection.js      # Seção de encontros de mentoria
│   │   │   └── ServicoSection.js       # Componente base para seções de serviço
│   │   ├── orcamento/                  # Componentes do resumo de orçamento
│   │   │   ├── OrcamentoActions.js     # Botões de ação (copiar, enviar email)
│   │   │   ├── OrcamentoItem.js        # Item individual do orçamento
│   │   │   ├── OrcamentoSummary.js     # Visualização do resumo do orçamento
│   │   │   └── OrcamentoValidity.js    # Notificação de validade do orçamento
│   │   ├── layout/                     # Componentes de layout
│   │   │   ├── Header.js               # Cabeçalho das páginas
│   │   │   └── Footer.js               # Rodapé com informações de contato
│   │   ├── CalculadoraDeLeve.js        # Página principal da calculadora
│   │   └── ResumoOrcamento.js          # Página de visualização do orçamento final
│   ├── contexts/                       # Gerenciamento de estado global
│   │   └── OrcamentoContext.js         # Context API para dados do orçamento
│   ├── data/                           # Dados estáticos da aplicação
│   │   ├── categorias.js               # Configuração das categorias de serviços
│   │   └── servicos.js                 # Lista de serviços disponíveis com preços
│   ├── hooks/                          # Hooks personalizados
│   │   └── useOrcamento.js             # Hook para acessar o contexto de orçamento
│   ├── utils/                          # Funções utilitárias
│   │   ├── formatters.js               # Formatação de moeda, texto, etc.
│   │   └── validators.js               # Validação de dados e formulários
│   ├── App.js                          # Configuração de rotas e providers
│   ├── App.css                         # Estilos globais da aplicação
│   ├── index.js                        # Ponto de entrada da aplicação React
│   └── index.css                       # Configurações CSS base e variáveis
├── tailwind.config.js                  # Configuração do Tailwind CSS
├── postcss.config.js                   # Configuração do PostCSS
├── package.json                        # Dependências e scripts
└── README.md                           # Documentação do projeto
```

### Detalhamento dos Principais Componentes

#### 🔄 Context API (`/contexts`)
- **OrcamentoContext.js**: Gerencia todo o estado da aplicação, incluindo seleções de serviços, quantidades, páginas e cálculos de valores.

#### 🪝 Hooks Personalizados (`/hooks`)
- **useOrcamento.js**: Facilita o acesso ao contexto de orçamento em qualquer componente, encapsulando a lógica do `useContext`.

#### 🧩 Componentes Comuns (`/components/common`)
- **Button.js**: Botão configurável com várias variantes de estilo (primário, secundário, link).
- **InputNumber.js**: Campo de entrada numérica com validação de valores mínimos e máximos.
- **RadioOption.js**: Implementação personalizada de opção tipo radio com suporte a conteúdo adicional.

#### 📋 Componentes da Calculadora (`/components/calculadora`)
- **ServicoSection.js**: Componente base para todas as seções de serviço, com suporte a validação.
- **MentoriaSection.js**: Permite selecionar e ajustar a quantidade de sessões de mentoria.
- **AcompanhamentoSection.js**: Oferece opções de períodos de acompanhamento.
- **LeituraCriticaSection.js**: Gerencia opções de leitura crítica com diferentes intervalos de páginas.
- **FormatacaoSection.js**: Gerencia opções de formatação ABNT com diferentes intervalos de páginas.

#### 💰 Componentes do Orçamento (`/components/orcamento`)
- **OrcamentoSummary.js**: Exibe todos os itens selecionados e o valor total.
- **OrcamentoItem.js**: Renderiza cada item individual do orçamento.
- **OrcamentoValidity.js**: Exibe a notificação de validade do orçamento.
- **OrcamentoActions.js**: Implementa as ações de copiar para área de transferência e enviar por email.

#### 🏗️ Componentes de Layout (`/components/layout`)
- **Header.js**: Cabeçalho responsivo com título e subtítulo configuráveis.
- **Footer.js**: Rodapé com informações de contato e marca.

#### 🛠️ Utilitários (`/utils`)
- **formatters.js**: Contém funções para formatação de valores monetários e preparação de texto para email/cópia.
- **validators.js**: Implementa validações de intervalo numérico e de seleções obrigatórias.

#### 📊 Dados da Aplicação (`/data`)
- **servicos.js**: Contém todos os serviços oferecidos com seus preços e configurações.
- **categorias.js**: Define as categorias de serviços e suas propriedades.

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





## 📋 Arquitetura do Projeto

Este projeto segue os princípios de arquitetura modular e componentes reutilizáveis. Utilizamos:

- **Context API**: Para gerenciamento de estado global da aplicação
- **Custom Hooks**: Para encapsular lógica e facilitar o acesso ao estado
- **Componentes Funcionais**: Utilizamos React Hooks em componentes funcionais
- **Componentes Atômicos**: Organização em componentes pequenos e reutilizáveis
- **Separação de Responsabilidades**: Componentes de UI separados da lógica de negócios