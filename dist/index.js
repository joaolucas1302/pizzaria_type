"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuPrincipal_1 = require("./views/MenuPrincipal");
const CSVManager_1 = require("./utils/CSVManager");
const IDManager_1 = require("./utils/IDManager");
const Cliente_1 = require("./models/Cliente");
const Produto_1 = require("./models/Produto");
const Pedido_1 = require("./models/Pedido");
const Promocao_1 = require("./models/Promocao");
// Função principal
function main() {
    try {
        console.log('🚀 Iniciando Sistema de Pizzaria...\n');
        // Inicializar sistema de dados
        CSVManager_1.CSVManager.inicializarArquivosCSV();
        IDManager_1.IDManager.inicializarContadores();
        // Inicializar modelos
        Cliente_1.ClienteModel.inicializar();
        Produto_1.ProdutoModel.inicializar();
        Pedido_1.PedidoModel.inicializar();
        Promocao_1.PromocaoModel.inicializar();
        console.log('Sistema inicializado com sucesso!');
        console.log('Dados:');
        console.log(`   Clientes: ${Cliente_1.ClienteModel.buscarTodos().length}`);
        console.log(`   Produtos: ${Produto_1.ProdutoModel.buscarTodos().length}`);
        console.log(`   Pedidos: ${Pedido_1.PedidoModel.buscarTodos().length}`);
        console.log(`   Promoções: ${Promocao_1.PromocaoModel.buscarTodas().length}\n`);
        // Executar o menu principal
        MenuPrincipal_1.MenuPrincipal.executar();
    }
    catch (error) {
        console.error('❌ Erro fatal no sistema:', error);
        process.exit(1);
    }
}
// Executar o sistema
main();
//# sourceMappingURL=index.js.map