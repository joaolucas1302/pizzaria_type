"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoService = void 0;
const Pedido_1 = require("../models/Pedido");
const ProdutoService_1 = require("./ProdutoService");
const ClienteService_1 = require("./ClienteService");
const PromocaoService_1 = require("./PromocaoService");
class PedidoService {
    static criarPedido(dadosPedido) {
        // Verificar se o cliente existe
        const cliente = ClienteService_1.ClienteService.buscarClientePorId(dadosPedido.clienteId);
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
        // Validar e processar itens
        const itensProcessados = this.processarItens(dadosPedido.itens);
        // Calcular subtotal
        const subtotal = itensProcessados.reduce((total, item) => total + (item.precoUnitario * item.quantidade), 0);
        // Aplicar promoções
        const { desconto, promocaoAplicada } = PromocaoService_1.PromocaoService.aplicarMelhorPromocao({
            clienteId: dadosPedido.clienteId,
            itens: itensProcessados,
            subtotal
        });
        // Calcular taxa de entrega (se aplicável)
        const taxaEntrega = this.calcularTaxaEntrega(subtotal, dadosPedido.enderecoEntrega);
        // Calcular total
        const total = Pedido_1.PedidoModel.calcularTotal(itensProcessados, desconto, taxaEntrega);
        const pedido = Pedido_1.PedidoModel.adicionar({
            clienteId: dadosPedido.clienteId,
            itens: itensProcessados,
            status: Pedido_1.StatusPedido.PENDENTE,
            formaPagamento: dadosPedido.formaPagamento,
            subtotal,
            desconto,
            taxaEntrega,
            total,
            observacoes: dadosPedido.observacoes,
            enderecoEntrega: dadosPedido.enderecoEntrega
        });
        return pedido;
    }
    static listarPedidos() {
        return Pedido_1.PedidoModel.buscarTodos();
    }
    static buscarPedidoPorId(id) {
        const pedido = Pedido_1.PedidoModel.buscarPorId(id);
        return pedido || null;
    }
    static buscarPedidosPorCliente(clienteId) {
        return Pedido_1.PedidoModel.buscarPorCliente(clienteId);
    }
    static buscarPedidosPorStatus(status) {
        return Pedido_1.PedidoModel.buscarPorStatus(status);
    }
    static atualizarStatusPedido(id, status) {
        const pedido = Pedido_1.PedidoModel.buscarPorId(id);
        if (!pedido) {
            throw new Error('Pedido não encontrado');
        }
        return Pedido_1.PedidoModel.atualizarStatus(id, status);
    }
    static buscarPedidosDoDia(data = new Date()) {
        return Pedido_1.PedidoModel.buscarPorData(data);
    }
    static buscarPedidosDoMes(ano, mes) {
        return Pedido_1.PedidoModel.buscarPorMes(ano, mes);
    }
    static gerarRelatorioVendasDiario(data = new Date()) {
        const pedidos = this.buscarPedidosDoDia(data);
        const totalPedidos = pedidos.length;
        const totalVendas = pedidos.reduce((total, pedido) => total + pedido.total, 0);
        const pizzasVendidas = pedidos.reduce((total, pedido) => {
            return total + pedido.itens.reduce((subtotal, item) => {
                const produto = ProdutoService_1.ProdutoService.buscarProdutoPorId(item.produtoId);
                return subtotal + (produto?.categoria === 'pizza' ? item.quantidade : 0);
            }, 0);
        }, 0);
        const pedidosPorStatus = pedidos.reduce((acc, pedido) => {
            acc[pedido.status] = (acc[pedido.status] || 0) + 1;
            return acc;
        }, {});
        return {
            data,
            totalPedidos,
            totalVendas,
            pizzasVendidas,
            pedidosPorStatus
        };
    }
    static gerarRelatorioVendasMensal(ano, mes) {
        const pedidos = this.buscarPedidosDoMes(ano, mes);
        const totalPedidos = pedidos.length;
        const totalVendas = pedidos.reduce((total, pedido) => total + pedido.total, 0);
        const pizzasVendidas = pedidos.reduce((total, pedido) => {
            return total + pedido.itens.reduce((subtotal, item) => {
                const produto = ProdutoService_1.ProdutoService.buscarProdutoPorId(item.produtoId);
                return subtotal + (produto?.categoria === 'pizza' ? item.quantidade : 0);
            }, 0);
        }, 0);
        const pedidosPorStatus = pedidos.reduce((acc, pedido) => {
            acc[pedido.status] = (acc[pedido.status] || 0) + 1;
            return acc;
        }, {});
        // Agrupar vendas por dia
        const vendasPorDia = Array.from({ length: 31 }, (_, i) => {
            const dia = i + 1;
            const pedidosDoDia = pedidos.filter(pedido => pedido.dataPedido.getDate() === dia);
            const vendas = pedidosDoDia.reduce((total, pedido) => total + pedido.total, 0);
            const pizzas = pedidosDoDia.reduce((total, pedido) => {
                return total + pedido.itens.reduce((subtotal, item) => {
                    const produto = ProdutoService_1.ProdutoService.buscarProdutoPorId(item.produtoId);
                    return subtotal + (produto?.categoria === 'pizza' ? item.quantidade : 0);
                }, 0);
            }, 0);
            return { dia, vendas, pizzas };
        }).filter(dia => dia.vendas > 0);
        return {
            ano,
            mes,
            totalPedidos,
            totalVendas,
            pizzasVendidas,
            pedidosPorStatus,
            vendasPorDia
        };
    }
    static processarItens(itens) {
        return itens.map(item => {
            const produto = ProdutoService_1.ProdutoService.buscarProdutoPorId(item.produtoId);
            if (!produto) {
                throw new Error(`Produto com ID ${item.produtoId} não encontrado`);
            }
            if (!produto.disponivel) {
                throw new Error(`Produto ${produto.nome} não está disponível`);
            }
            if (item.quantidade <= 0) {
                throw new Error(`Quantidade deve ser maior que zero para o produto ${produto.nome}`);
            }
            return {
                ...item,
                precoUnitario: produto.preco
            };
        });
    }
    static calcularTaxaEntrega(subtotal, enderecoEntrega) {
        // Taxa de entrega gratuita para pedidos acima de R$ 50,00
        if (subtotal >= 50) {
            return 0;
        }
        // Taxa de entrega de R$ 5,00 para pedidos abaixo de R$ 50,00
        return enderecoEntrega ? 5 : 0;
    }
}
exports.PedidoService = PedidoService;
//# sourceMappingURL=PedidoService.js.map