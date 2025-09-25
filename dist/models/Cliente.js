"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteModel = void 0;
const CSVManager_1 = require("../utils/CSVManager");
const IDManager_1 = require("../utils/IDManager");
class ClienteModel {
    static inicializar() {
        this.carregarDados();
    }
    static adicionar(cliente) {
        const novoCliente = {
            ...cliente,
            id: IDManager_1.IDManager.gerarId('cliente'),
            dataCadastro: new Date(),
        };
        this.clientes.push(novoCliente);
        this.salvarDados();
        return novoCliente;
    }
    static buscarTodos() {
        return this.clientes.filter(cliente => cliente.ativo);
    }
    static buscarPorId(id) {
        return this.clientes.find(cliente => cliente.id === id && cliente.ativo);
    }
    static buscarPorEmail(email) {
        return this.clientes.find(cliente => cliente.email === email && cliente.ativo);
    }
    static atualizar(id, dadosAtualizacao) {
        const index = this.clientes.findIndex(cliente => cliente.id === id && cliente.ativo);
        if (index === -1)
            return null;
        this.clientes[index] = { ...this.clientes[index], ...dadosAtualizacao };
        this.salvarDados();
        return this.clientes[index];
    }
    static excluir(id) {
        const index = this.clientes.findIndex(cliente => cliente.id === id && cliente.ativo);
        if (index === -1)
            return false;
        this.clientes[index].ativo = false;
        this.salvarDados();
        return true;
    }
    static carregarDados() {
        this.clientes = CSVManager_1.CSVManager.carregarDados('clientes', (linha) => {
            const cliente = {
                id: linha[0],
                nome: linha[1],
                email: linha[2],
                telefone: linha[3],
                endereco: JSON.parse(linha[4] || '{}'),
                dataCadastro: new Date(linha[5]),
                ativo: linha[6] === 'true'
            };
            return cliente;
        });
        // Atualizar contador de IDs - agora trabalha com IDs numéricos simples
        if (this.clientes.length > 0) {
            const maxId = Math.max(...this.clientes.map(c => {
                const idNumerico = parseInt(c.id);
                return isNaN(idNumerico) ? 0 : idNumerico;
            }));
            IDManager_1.IDManager.definirContador('cliente', maxId);
        }
        else {
            IDManager_1.IDManager.definirContador('cliente', 0);
        }
    }
    static salvarDados() {
        CSVManager_1.CSVManager.salvarDados('clientes', this.clientes, this.headers);
    }
}
exports.ClienteModel = ClienteModel;
ClienteModel.clientes = [];
ClienteModel.headers = ['id', 'nome', 'email', 'telefone', 'endereco', 'dataCadastro', 'ativo'];
//# sourceMappingURL=Cliente.js.map