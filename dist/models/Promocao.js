"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromocaoModel = exports.TipoPromocao = void 0;
var TipoPromocao;
(function (TipoPromocao) {
    TipoPromocao["DESCONTO_PERCENTUAL"] = "desconto_percentual";
    TipoPromocao["DESCONTO_FIXO"] = "desconto_fixo";
    TipoPromocao["PIZZA_GRATIS"] = "pizza_gratis";
    TipoPromocao["COMBO"] = "combo";
})(TipoPromocao || (exports.TipoPromocao = TipoPromocao = {}));
const CSVManager_1 = require("../utils/CSVManager");
const IDManager_1 = require("../utils/IDManager");
class PromocaoModel {
    static inicializar() {
        this.carregarDados();
    }
    static adicionar(promocao) {
        const novaPromocao = {
            ...promocao,
            id: IDManager_1.IDManager.gerarId('promocao'),
            usosPorCliente: new Map(),
        };
        this.promocoes.push(novaPromocao);
        this.salvarDados();
        return novaPromocao;
    }
    static buscarTodas() {
        return this.promocoes.filter(promocao => promocao.ativa);
    }
    static buscarAtivas() {
        const agora = new Date();
        return this.promocoes.filter(promocao => promocao.ativa &&
            promocao.dataInicio <= agora &&
            promocao.dataFim >= agora);
    }
    static buscarPorId(id) {
        return this.promocoes.find(promocao => promocao.id === id);
    }
    static aplicarPromocao(pedido, promocao) {
        // Verificar se a promoção é aplicável
        if (!this.verificarAplicabilidade(pedido, promocao)) {
            return 0;
        }
        let desconto = 0;
        switch (promocao.tipo) {
            case TipoPromocao.DESCONTO_PERCENTUAL:
                desconto = (pedido.subtotal * promocao.valor) / 100;
                break;
            case TipoPromocao.DESCONTO_FIXO:
                desconto = promocao.valor;
                break;
            case TipoPromocao.PIZZA_GRATIS:
                // Implementar lógica para pizza grátis
                break;
            case TipoPromocao.COMBO:
                // Implementar lógica para combo
                break;
        }
        // Atualizar contador de usos
        if (promocao.limiteUsos) {
            const usosAtuais = promocao.usosPorCliente?.get(pedido.clienteId) || 0;
            promocao.usosPorCliente?.set(pedido.clienteId, usosAtuais + 1);
        }
        return Math.min(desconto, pedido.subtotal);
    }
    static verificarAplicabilidade(pedido, promocao) {
        // Verificar se está dentro do período de validade
        const agora = new Date();
        if (agora < promocao.dataInicio || agora > promocao.dataFim) {
            return false;
        }
        // Verificar valor mínimo
        if (promocao.valorMinimo && pedido.subtotal < promocao.valorMinimo) {
            return false;
        }
        // Verificar limite de usos por cliente
        if (promocao.limiteUsos) {
            const usosAtuais = promocao.usosPorCliente?.get(pedido.clienteId) || 0;
            if (usosAtuais >= promocao.limiteUsos) {
                return false;
            }
        }
        return true;
    }
    static carregarDados() {
        this.promocoes = CSVManager_1.CSVManager.carregarDados('promocoes', (linha) => {
            const promocao = {
                id: linha[0],
                nome: linha[1],
                descricao: linha[2],
                tipo: linha[3],
                valor: parseFloat(linha[4]),
                valorMinimo: linha[5] ? parseFloat(linha[5]) : undefined,
                produtosAplicaveis: linha[6] ? JSON.parse(linha[6]) : undefined,
                dataInicio: new Date(linha[7]),
                dataFim: new Date(linha[8]),
                ativa: linha[9] === 'true',
                limiteUsos: linha[10] ? parseInt(linha[10]) : undefined,
                usosPorCliente: new Map()
            };
            return promocao;
        });
        // Atualizar contador de IDs - agora trabalha com IDs numéricos simples
        if (this.promocoes.length > 0) {
            const maxId = Math.max(...this.promocoes.map(p => {
                const idNumerico = parseInt(p.id);
                return isNaN(idNumerico) ? 0 : idNumerico;
            }));
            IDManager_1.IDManager.definirContador('promocao', maxId);
        }
        else {
            IDManager_1.IDManager.definirContador('promocao', 0);
        }
    }
    static salvarDados() {
        CSVManager_1.CSVManager.salvarDados('promocoes', this.promocoes, this.headers);
    }
}
exports.PromocaoModel = PromocaoModel;
PromocaoModel.promocoes = [];
PromocaoModel.headers = ['id', 'nome', 'descricao', 'tipo', 'valor', 'valorMinimo', 'produtosAplicaveis', 'dataInicio', 'dataFim', 'ativa', 'limiteUsos'];
//# sourceMappingURL=Promocao.js.map