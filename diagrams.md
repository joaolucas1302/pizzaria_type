
# Diagramas do Sistema - Pizzaria (versão estudantil)

Os diagramas abaixo são simples (ASCII) e focados na apresentação acadêmica.

## 1) Mapa mental (visão geral)

```
                       [ Sistema de Pizzaria ]
                         /      |       \
                        /       |        \
                   Clientes   Produtos   Pedidos
                     /  | \      |        /   \
                    Add List Busc  Cardápio  Pagamento
                                      |         |
                                   Pizzas   Entrega/Retirada
                                               |
                                           Comprovante
```

## 2) Fluxo simples de criação de pedido

```
Início
  |
Seleciona Cliente -> Lista Produtos -> Adiciona Itens
  |                                         |
Escolhe Pagamento ---------------------------|
  |
Entrega?
  |-- Sim -> Usa endereço do cliente OU informa outro
  |-- Não -> Retirada no balcão
  |
Calcula Total -> Salva Pedido -> Gera Comprovante -> Fim
```

## 3) Diagrama simples da aplicação (camadas)

```
[ Views ]
  MenuPrincipal (CLI)
  └─> chama Controllers

[ Controllers ]
  ClienteController / ProdutoController / PedidoController
  └─> usa Services

[ Services ]
  ClienteService / ProdutoService / PedidoService / PromocaoService
  └─> usa Models + Utils

[ Models ]
  Cliente / Produto / Pedido / Promocao

[ Utils ]
  CSVManager (persistência CSV)
  IDManager (IDs 1..N)
  ComprovanteGenerator (TXT)

[ Data ]
  data/*.csv (clientes, produtos, pedidos, promocoes)
```

Observação: estes esquemas são propositalmente simples para facilitar a apresentação em sala.


