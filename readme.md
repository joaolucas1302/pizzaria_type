# 🍕 Sistema de Pizzaria - Versão Estudantil

Sistema simples de gestão de pizzaria em TypeScript.

## 🚀 Como usar

### 1. Instalar dependências
```bash
npm install
```

### 2. Compilar
```bash
npm run build
```

### 3. Sistema zerado
O sistema está zerado e pronto para você configurar manualmente.

## 📁 Estrutura

```
src/
├── models/          # Cliente, Produto, Pedido
├── utils/           # IDManager, ComprovanteGenerator
└── index.ts         # Arquivo principal

data/                # Dados em CSV
├── clientes.csv
├── produtos.csv
└── pedidos.csv
```

## ⚙️ Funcionalidades

- ✅ IDs sequenciais (1, 2, 3...)
- ✅ Gerenciamento de clientes
- ✅ Gerenciamento de produtos
- ✅ Criação de pedidos
- ✅ Comprovante automático
- ✅ Salvamento em CSV

## 🎯 Scripts

- `npm run build` - Compila TypeScript
- `npm start` - Executa o sistema
- `node verificar_sistema.js` - Verifica se está funcionando

## 📝 Como adicionar dados

```javascript
// Adicionar cliente
ClienteModel.adicionar({
    nome: 'Nome',
    email: 'email@teste.com',
    telefone: '(11) 99999-9999',
    endereco: { rua: 'Rua', numero: '123', bairro: 'Bairro', cidade: 'Cidade', cep: '01234-567' },
    ativo: true
});

// Adicionar produto
ProdutoModel.adicionar({
    nome: 'Pizza Margherita',
    descricao: 'Pizza com molho e mussarela',
    categoria: 'pizza',
    preco: 35.90,
    disponivel: true
});

// Criar pedido
PedidoModel.adicionar({
    clienteId: '1',
    itens: [{ produtoId: '1', quantidade: 1, precoUnitario: 35.90 }],
    status: 'pendente',
    formaPagamento: 'dinheiro',
    subtotal: 35.90,
    desconto: 0,
    taxaEntrega: 5.00,
    total: 40.90
});
```



