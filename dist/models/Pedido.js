"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoModel = exports.FormaPagamento = exports.StatusPedido = void 0;
var StatusPedido;
(function (StatusPedido) {
    StatusPedido["PENDENTE"] = "pendente";
    StatusPedido["PREPARANDO"] = "preparando";
    StatusPedido["PRONTO"] = "pronto";
    StatusPedido["ENTREGUE"] = "entregue";
    StatusPedido["CANCELADO"] = "cancelado";
})(StatusPedido || (exports.StatusPedido = StatusPedido = {}));
var FormaPagamento;
(function (FormaPagamento) {
    FormaPagamento["DINHEIRO"] = "dinheiro";
    FormaPagamento["CARTAO_CREDITO"] = "cartao_credito";
    FormaPagamento["CARTAO_DEBITO"] = "cartao_debito";
    FormaPagamento["PIX"] = "pix";
    FormaPagamento["VALE_REFEICAO"] = "vale_refeicao";
})(FormaPagamento || (exports.FormaPagamento = FormaPagamento = {}));
const CSVManager_1 = require("../utils/CSVManager");
const IDManager_1 = require("../utils/IDManager");
const ComprovanteGenerator_1 = require("../utils/ComprovanteGenerator");
const Cliente_1 = require("./Cliente");
class PedidoModel {
    static inicializar() {
        this.carregarDados();
    }
    static adicionar(pedido) {
        const novoPedido = {
            ...pedido,
            id: IDManager_1.IDManager.gerarId('pedido'),
            dataPedido: new Date(),
        };
        this.pedidos.push(novoPedido);
        this.salvarDados();
        // Gerar comprovante automaticamente
        this.gerarComprovanteAutomatico(novoPedido);
        return novoPedido;
    }
    static gerarComprovanteAutomatico(pedido) {
        try {
            const cliente = Cliente_1.ClienteModel.buscarPorId(pedido.clienteId);
            if (cliente) {
                const comprovante = ComprovanteGenerator_1.ComprovanteGenerator.gerarComprovante(pedido, cliente);
                const dataAtual = new Date().toISOString().split('T')[0];
                const horaAtual = new Date().toLocaleTimeString('pt-BR').replace(/:/g, '-');
                const nomeArquivo = `comprovante_pedido_${pedido.id}_${dataAtual}_${horaAtual}`;
                ComprovanteGenerator_1.ComprovanteGenerator.salvarComprovante(comprovante, nomeArquivo);
                console.log(`\nComprovante do pedido ${pedido.id} gerado!`);
            }
        }
        catch (error) {
            console.log(`\nErro ao gerar comprovante: ${error}`);
        }
    }
    static buscarTodos() {
        return this.pedidos;
    }
    static buscarPorId(id) {
        return this.pedidos.find(pedido => pedido.id === id);
    }
    static buscarPorCliente(clienteId) {
        return this.pedidos.filter(pedido => pedido.clienteId === clienteId);
    }
    static buscarPorStatus(status) {
        return this.pedidos.filter(pedido => pedido.status === status);
    }
    static buscarPorData(data) {
        const inicioDia = new Date(data);
        inicioDia.setHours(0, 0, 0, 0);
        const fimDia = new Date(data);
        fimDia.setHours(23, 59, 59, 999);
        return this.pedidos.filter(pedido => pedido.dataPedido >= inicioDia && pedido.dataPedido <= fimDia);
    }
    static buscarPorMes(ano, mes) {
        const inicioMes = new Date(ano, mes - 1, 1);
        const fimMes = new Date(ano, mes, 0, 23, 59, 59, 999);
        return this.pedidos.filter(pedido => pedido.dataPedido >= inicioMes && pedido.dataPedido <= fimMes);
    }
    static atualizarStatus(id, status) {
        const index = this.pedidos.findIndex(pedido => pedido.id === id);
        if (index === -1)
            return null;
        this.pedidos[index].status = status;
        if (status === StatusPedido.ENTREGUE) {
            this.pedidos[index].dataEntrega = new Date();
        }
        this.salvarDados();
        return this.pedidos[index];
    }
    static calcularTotal(itens, desconto = 0, taxaEntrega = 0) {
        const subtotal = itens.reduce((total, item) => total + (item.precoUnitario * item.quantidade), 0);
        return subtotal - desconto + taxaEntrega;
    }
    static carregarDados() {
        this.pedidos = CSVManager_1.CSVManager.carregarDados('pedidos', (linha) => {
            const pedido = {
                id: linha[0],
                clienteId: linha[1],
                itens: JSON.parse(linha[2] || '[]'),
                status: linha[3],
                formaPagamento: linha[4],
                subtotal: parseFloat(linha[5]),
                desconto: parseFloat(linha[6]),
                taxaEntrega: parseFloat(linha[7]),
                total: parseFloat(linha[8]),
                observacoes: linha[9] || undefined,
                dataPedido: new Date(linha[10]),
                dataEntrega: linha[11] ? new Date(linha[11]) : undefined,
                enderecoEntrega: linha[12] ? JSON.parse(linha[12]) : undefined
            };
            return pedido;
        });
        // Atualizar contador de IDs - agora trabalha com IDs numéricos simples
        if (this.pedidos.length > 0) {
            const maxId = Math.max(...this.pedidos.map(p => {
                const idNumerico = parseInt(p.id);
                return isNaN(idNumerico) ? 0 : idNumerico;
            }));
            IDManager_1.IDManager.definirContador('pedido', maxId);
        }
        else {
            IDManager_1.IDManager.definirContador('pedido', 0);
        }
    }
    static salvarDados() {
        CSVManager_1.CSVManager.salvarDados('pedidos', this.pedidos, this.headers);
    }
}
exports.PedidoModel = PedidoModel;
PedidoModel.pedidos = [];
PedidoModel.headers = ['id', 'clienteId', 'itens', 'status', 'formaPagamento', 'subtotal', 'desconto', 'taxaEntrega', 'total', 'observacoes', 'dataPedido', 'dataEntrega', 'enderecoEntrega'];
//# sourceMappingURL=Pedido.js.map