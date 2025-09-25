"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const Cliente_1 = require("../models/Cliente");
class ClienteService {
    static cadastrarCliente(dadosCliente) {
        // Validar se o email já existe
        const clienteExistente = Cliente_1.ClienteModel.buscarPorEmail(dadosCliente.email);
        if (clienteExistente) {
            throw new Error('Já existe um cliente cadastrado com este email');
        }
        // Validar dados obrigatórios
        this.validarDadosCliente(dadosCliente);
        const cliente = Cliente_1.ClienteModel.adicionar({
            ...dadosCliente,
            ativo: true
        });
        return cliente;
    }
    static listarClientes() {
        return Cliente_1.ClienteModel.buscarTodos();
    }
    static buscarClientePorId(id) {
        const cliente = Cliente_1.ClienteModel.buscarPorId(id);
        return cliente || null;
    }
    static buscarClientePorEmail(email) {
        const cliente = Cliente_1.ClienteModel.buscarPorEmail(email);
        return cliente || null;
    }
    static atualizarCliente(id, dadosAtualizacao) {
        // Verificar se o cliente existe
        const clienteExistente = Cliente_1.ClienteModel.buscarPorId(id);
        if (!clienteExistente) {
            throw new Error('Cliente não encontrado');
        }
        // Se estiver atualizando o email, verificar se não existe outro cliente com o mesmo email
        if (dadosAtualizacao.email && dadosAtualizacao.email !== clienteExistente.email) {
            const clienteComEmail = Cliente_1.ClienteModel.buscarPorEmail(dadosAtualizacao.email);
            if (clienteComEmail) {
                throw new Error('Já existe um cliente cadastrado com este email');
            }
        }
        // Validar dados se fornecidos
        if (dadosAtualizacao.nome || dadosAtualizacao.email || dadosAtualizacao.telefone) {
            this.validarDadosCliente({
                nome: dadosAtualizacao.nome || clienteExistente.nome,
                email: dadosAtualizacao.email || clienteExistente.email,
                telefone: dadosAtualizacao.telefone || clienteExistente.telefone,
                endereco: dadosAtualizacao.endereco || clienteExistente.endereco
            });
        }
        return Cliente_1.ClienteModel.atualizar(id, dadosAtualizacao);
    }
    static excluirCliente(id) {
        const cliente = Cliente_1.ClienteModel.buscarPorId(id);
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
        return Cliente_1.ClienteModel.excluir(id);
    }
    static validarDadosCliente(dados) {
        if (!dados.nome || dados.nome.trim().length < 2) {
            throw new Error('Nome deve ter pelo menos 2 caracteres');
        }
        if (!dados.email || !this.validarEmail(dados.email)) {
            throw new Error('Email inválido');
        }
        if (!dados.telefone || !this.validarTelefone(dados.telefone)) {
            throw new Error('Telefone inválido');
        }
        if (dados.endereco) {
            this.validarEndereco(dados.endereco);
        }
    }
    static validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    static validarTelefone(telefone) {
        const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        return regex.test(telefone);
    }
    static validarEndereco(endereco) {
        if (!endereco.rua || endereco.rua.trim().length < 3) {
            throw new Error('Rua deve ter pelo menos 3 caracteres');
        }
        if (!endereco.numero || endereco.numero.trim().length < 1) {
            throw new Error('Número é obrigatório');
        }
        if (!endereco.bairro || endereco.bairro.trim().length < 2) {
            throw new Error('Bairro deve ter pelo menos 2 caracteres');
        }
        if (!endereco.cidade || endereco.cidade.trim().length < 2) {
            throw new Error('Cidade deve ter pelo menos 2 caracteres');
        }
        if (!endereco.cep || !this.validarCEP(endereco.cep)) {
            throw new Error('CEP inválido');
        }
    }
    static validarCEP(cep) {
        const regex = /^\d{5}-?\d{3}$/;
        return regex.test(cep);
    }
}
exports.ClienteService = ClienteService;
//# sourceMappingURL=ClienteService.js.map