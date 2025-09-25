# Manual de Utilização - Sistema de Pizzaria (versão estudantil)

Aplicação em linha de comando (CLI) em TypeScript para gerenciar uma pizzaria: clientes, produtos, pedidos e comprovantes.

## 1) Estrutura do projeto e dependências

Estrutura (resumo):
```
src/
  controllers/    # Fluxo do menu e ações
  models/         # Regras de dados (Cliente/Produto/Pedido/Promocao)
  services/       # Lógica de negócio
  utils/          # CSVManager, IDManager, ComprovanteGenerator
  views/          # MenuPrincipal (interface de texto)
  index.ts        # Ponto de entrada
data/
  clientes.csv | produtos.csv | pedidos.csv | promocoes.csv
dist/           # Saída compilada (gerada pelo tsc)
```

Dependências (package.json):
- Execução/CLI: `readline-sync`, `chalk`
- Dev: `typescript`, `ts-node`, `@types/node`, `@types/readline-sync`, `jest`, `@types/jest`

## 2) Instalação e execução (passo a passo)

1. Instalar dependências:
```
npm install
```
2. Compilar TypeScript para `dist/`:
```
npm run build
```
3. Rodar a aplicação (CLI):
```
npm start
```

Observações:
- Os dados são salvos em CSV na pasta `data/`.
- IDs são numéricos e sequenciais por tipo (1, 2, 3, ...).
- Ao criar um pedido, o comprovante é gerado automaticamente e salvo em TXT na área de trabalho.

## 3) Como usar (rápido)

- Menu Principal → escolha entre Clientes, Produtos, Pedidos e Relatórios.
- Clientes → cadastrar/listar/buscar/atualizar/excluir.
- Produtos → cadastrar/listar/filtrar pizzas/atualizar/excluir.
- Pedidos → informar cliente, itens, pagamento, entrega ou retirada.
- Entrega → o sistema oferece usar o endereço do cliente ou informar outro.

## 4) Diagramas explicativos

Os diagramas em texto (ASCII) estão em `docs/diagrams.md`:
- Mapa mental (visão geral da aplicação)
- Fluxo simples de criação de pedido
- Diagrama simples da aplicação (camadas)

## 5) Solução rápida de problemas

- Erro ao compilar: rode `npm run build` e verifique se o `typescript` está instalado.
- Erro ao executar: rode `npm install` e depois `npm start`.
- Nada é salvo: confirme se a pasta `data/` existe e o usuário tem permissão de escrita.


