# Diagramas do Sistema de Pizzaria

Este documento contém os diagramas explicativos do sistema de gerenciamento de pizzaria.

## 1. Mapa Mental - Visão Geral do Sistema

```
                    SISTEMA DE PIZZARIA
                           |
        ┌─────────────────┼─────────────────┐
        |                 |                 |
    CLIENTES          PRODUTOS          PEDIDOS
        |                 |                 |
    ┌───┴───┐         ┌───┴───┐         ┌───┴───┐
    |       |         |       |         |       |
  Cadastro Listagem  Pizzas Bebidas   Criação Entrega
    |       |         |       |         |       |
  Busca   Edição    Sobremesas Acompanhamentos  Retirada Comprovante
    |       |         |       |         |       |
  Dados   Histórico  Preços  Categorias  Pagamento Relatórios
```

## 2. Fluxo de Criação de Pedido

```
INÍCIO
  |
  ▼
Selecionar Cliente
  |
  ▼
Cliente existe?
  ├─ NÃO → Cadastrar Cliente
  └─ SIM → Continuar
  |
  ▼
Listar Produtos Disponíveis
  |
  ▼
Adicionar Itens ao Pedido
  |
  ▼
Escolher Forma de Pagamento
  |
  ▼
Tipo de Entrega?
  ├─ ENTREGA → Usar endereço do cliente OU informar novo
  └─ RETIRADA → Balcão
  |
  ▼
Aplicar Promoções Disponíveis
  |
  ▼
Calcular Total Final
  |
  ▼
Confirmar Pedido
  |
  ▼
Salvar Pedido
  |
  ▼
Gerar Comprovante
  |
  ▼
FIM
```

## 3. Arquitetura da Aplicação

```
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                  │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ MenuPrincipal   │  │ ClienteController│  │ProdutoCtrl  │ │
│  │                 │  │                 │  │             │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ PedidoController│  │ RelatorioCtrl   │  │Comprovante  │ │
│  │                 │  │                 │  │Generator    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE SERVIÇOS                      │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ ClienteService  │  │ ProdutoService  │  │PedidoService│ │
│  │                 │  │                 │  │             │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ PromocaoService │  │ CSVManager      │  │ IDManager   │ │
│  │                 │  │                 │  │             │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE DADOS                         │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ ClienteModel    │  │ ProdutoModel    │  │ PedidoModel │ │
│  │                 │  │                 │  │             │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ PromocaoModel   │  │ Arquivos CSV    │  │ Comprovantes│ │
│  │                 │  │                 │  │ (TXT)       │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```



Estes diagramas fornecem uma visão completa da arquitetura e funcionamento do sistema de pizzaria, facilitando o entendimento e a manutenção do código.
