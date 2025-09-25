"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuPrincipal = void 0;
const ClienteController_1 = require("../controllers/ClienteController");
const ProdutoController_1 = require("../controllers/ProdutoController");
const PedidoController_1 = require("../controllers/PedidoController");
const PromocaoService_1 = require("../services/PromocaoService");
class MenuPrincipal {
    static exibirMenu() {
        console.log('\n' + '='.repeat(50));
        console.log('SISTEMA DE PIZZARIA');
        console.log('='.repeat(50));
        console.log('\n1. Gerenciar Clientes');
        console.log('2. Gerenciar Produtos');
        console.log('3. Gerenciar Pedidos');
        console.log('4. Relatórios de Vendas');
        console.log('5. Sair');
        console.log('\n' + '='.repeat(50));
    }
    static exibirMenuClientes() {
        console.log('\n' + '='.repeat(30));
        console.log('GERENCIAR CLIENTES');
        console.log('='.repeat(30));
        console.log('\n1. Cadastrar Cliente');
        console.log('2. Listar Clientes');
        console.log('3. Buscar Cliente');
        console.log('4. Atualizar Cliente');
        console.log('5. Excluir Cliente');
        console.log('6. Voltar ao Menu Principal');
        console.log('\n' + '='.repeat(30));
    }
    static exibirMenuProdutos() {
        console.log('\n' + '='.repeat(30));
        console.log('GERENCIAR PRODUTOS');
        console.log('='.repeat(30));
        console.log('\n1. Cadastrar Produto');
        console.log('2. Listar Produtos');
        console.log('3. Listar Pizzas');
        console.log('4. Buscar Produto');
        console.log('5. Atualizar Produto');
        console.log('6. Excluir Produto');
        console.log('7. Voltar ao Menu Principal');
        console.log('\n' + '='.repeat(30));
    }
    static exibirMenuPedidos() {
        console.log('\n' + '='.repeat(30));
        console.log('GERENCIAR PEDIDOS');
        console.log('='.repeat(30));
        console.log('\n1. Criar Pedido');
        console.log('2. Listar Pedidos');
        console.log('3. Atualizar Status do Pedido');
        console.log('4. Voltar ao Menu Principal');
        console.log('\n' + '='.repeat(30));
    }
    static exibirMenuRelatorios() {
        console.log('\n' + '='.repeat(30));
        console.log('RELATÓRIOS DE VENDAS');
        console.log('='.repeat(30));
        console.log('\n1. Relatório Diário');
        console.log('2. Relatório Mensal');
        console.log('3. Voltar ao Menu Principal');
        console.log('\n' + '='.repeat(30));
    }
    static executar() {
        // Inicializar promoções padrão
        PromocaoService_1.PromocaoService.criarPromocoesPadrao();
        let executando = true;
        while (executando) {
            this.exibirMenu();
            const opcao = this.readline.question('Escolha uma opção: ');
            switch (opcao) {
                case '1':
                    this.executarMenuClientes();
                    break;
                case '2':
                    this.executarMenuProdutos();
                    break;
                case '3':
                    this.executarMenuPedidos();
                    break;
                case '4':
                    this.executarMenuRelatorios();
                    break;
                case '5':
                    console.log('\nObrigado por usar o Sistema de Pizzaria!');
                    executando = false;
                    break;
                default:
                    console.log('\n❌ Opção inválida. Tente novamente.');
            }
        }
    }
    static executarMenuClientes() {
        let executando = true;
        while (executando) {
            this.exibirMenuClientes();
            const opcao = this.readline.question('Escolha uma opção: ');
            switch (opcao) {
                case '1':
                    try {
                        ClienteController_1.ClienteController.cadastrarCliente();
                    }
                    catch (error) {
                        // Erro já foi tratado no controller
                    }
                    break;
                case '2':
                    ClienteController_1.ClienteController.listarClientes();
                    break;
                case '3':
                    ClienteController_1.ClienteController.buscarCliente();
                    break;
                case '4':
                    ClienteController_1.ClienteController.atualizarCliente();
                    break;
                case '5':
                    ClienteController_1.ClienteController.excluirCliente();
                    break;
                case '6':
                    executando = false;
                    break;
                default:
                    console.log('\n❌ Opção inválida. Tente novamente.');
            }
            if (executando) {
                this.readline.question('\nPressione Enter para continuar...');
            }
        }
    }
    static executarMenuProdutos() {
        let executando = true;
        while (executando) {
            this.exibirMenuProdutos();
            const opcao = this.readline.question('Escolha uma opção: ');
            switch (opcao) {
                case '1':
                    try {
                        ProdutoController_1.ProdutoController.cadastrarProduto();
                    }
                    catch (error) {
                        // Erro já foi tratado no controller
                    }
                    break;
                case '2':
                    ProdutoController_1.ProdutoController.listarProdutos();
                    break;
                case '3':
                    ProdutoController_1.ProdutoController.listarPizzas();
                    break;
                case '4':
                    ProdutoController_1.ProdutoController.buscarProduto();
                    break;
                case '5':
                    ProdutoController_1.ProdutoController.atualizarProduto();
                    break;
                case '6':
                    ProdutoController_1.ProdutoController.excluirProduto();
                    break;
                case '7':
                    executando = false;
                    break;
                default:
                    console.log('\n❌ Opção inválida. Tente novamente.');
            }
            if (executando) {
                this.readline.question('\nPressione Enter para continuar...');
            }
        }
    }
    static executarMenuPedidos() {
        let executando = true;
        while (executando) {
            this.exibirMenuPedidos();
            const opcao = this.readline.question('Escolha uma opção: ');
            switch (opcao) {
                case '1':
                    try {
                        PedidoController_1.PedidoController.criarPedido();
                    }
                    catch (error) {
                        // Erro já foi tratado no controller
                    }
                    break;
                case '2':
                    PedidoController_1.PedidoController.listarPedidos();
                    break;
                case '3':
                    PedidoController_1.PedidoController.atualizarStatusPedido();
                    break;
                case '4':
                    executando = false;
                    break;
                default:
                    console.log('\n❌ Opção inválida. Tente novamente.');
            }
            if (executando) {
                this.readline.question('\nPressione Enter para continuar...');
            }
        }
    }
    static executarMenuRelatorios() {
        let executando = true;
        while (executando) {
            this.exibirMenuRelatorios();
            const opcao = this.readline.question('Escolha uma opção: ');
            switch (opcao) {
                case '1':
                    PedidoController_1.PedidoController.gerarRelatorioVendasDiario();
                    break;
                case '2':
                    PedidoController_1.PedidoController.gerarRelatorioVendasMensal();
                    break;
                case '3':
                    executando = false;
                    break;
                default:
                    console.log('\n❌ Opção inválida. Tente novamente.');
            }
            if (executando) {
                this.readline.question('\nPressione Enter para continuar...');
            }
        }
    }
}
exports.MenuPrincipal = MenuPrincipal;
MenuPrincipal.readline = require('readline-sync');
//# sourceMappingURL=MenuPrincipal.js.map