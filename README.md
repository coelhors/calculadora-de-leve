# Calculadora De Leve

Calculadora de orçamentos para serviços de mentoria acadêmica da empresa "De Leve na Tese".

## Sobre o Projeto

Este projeto foi criado para a empresa "De Leve na Tese", um serviço de mentoria acadêmica. A calculadora permite que os clientes selecionem serviços e visualizem um orçamento em tempo real.

## Funcionalidades

- Seleção de serviços de mentoria
- Escolha de períodos de acompanhamento
- Cálculo de valores para leitura crítica e formatação ABNT baseado no número de páginas
- Resumo detalhado do orçamento
- Interface responsiva e amigável

## Tecnologias Utilizadas

- React.js
- Tailwind CSS (via CDN ou instalação completa)
- Lucide React (para ícones)

## Como Executar o Projeto

1. Clone o repositório:
   ```
   git clone https://github.com/coelhors/calculadora-de-leve.git
   cd calculadora-de-leve
   ```

2. Instale as dependências:
   ```
   npm install
   npm install lucide-react
   ```

3. Execute o projeto:
   ```
   npm start
   ```

4. Acesse o aplicativo em:
   ```
   http://localhost:3000
   ```

## Estrutura de Arquivos

```
calculadora-de-leve/
├── public/
│   ├── index.html (com link para o CDN do Tailwind)
│   └── ...
├── src/
│   ├── components/
│   │   └── CalculadoraDeLeve.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── tailwind.config.js (opcional, se usar instalação completa)
├── postcss.config.js (opcional, se usar instalação completa)
├── package.json
└── README.md
```

## Como Personalizar

### Informações de Contato
Atualize as informações de contato no rodapé do componente CalculadoraDeLeve:

```javascript
<div className="mt-4 bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center">
  <p className="text-sm text-indigo-700">
    <strong>De Leve na Tese</strong> - Mentoria Acadêmica
  </p>
  <p className="text-xs text-indigo-600 mt-1">
    Contato: seucontato@exemplo.com | (00) 00000-0000
  </p>
</div>
```

### Cores
Você pode personalizar as cores editando as classes do Tailwind no componente. Por exemplo, para mudar a cor principal de índigo para azul, substitua classes como `bg-indigo-600` por `bg-blue-600`.

## Próximos Passos

- Implementar envio do orçamento por e-mail
- Adicionar autenticação de usuários
- Desenvolver área administrativa para gerenciar serviços e preços
- Implementar backend para armazenar orçamentos