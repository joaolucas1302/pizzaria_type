"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoModel = exports.TamanhoPizza = exports.CategoriaProduto = void 0;
var CategoriaProduto;
(function (CategoriaProduto) {
    CategoriaProduto["PIZZA"] = "pizza";
    CategoriaProduto["REFRIGERANTE"] = "refrigerante";
    CategoriaProduto["SOBREMESA"] = "sobremesa";
    CategoriaProduto["OUTROS"] = "outros";
})(CategoriaProduto || (exports.CategoriaProduto = CategoriaProduto = {}));
var TamanhoPizza;
(function (TamanhoPizza) {
    TamanhoPizza["PEQUENA"] = "pequena";
    TamanhoPizza["MEDIA"] = "media";
    TamanhoPizza["GRANDE"] = "grande";
    TamanhoPizza["FAMILIA"] = "familia";
})(TamanhoPizza || (exports.TamanhoPizza = TamanhoPizza = {}));
const CSVManager_1 = require("../utils/CSVManager");
const IDManager_1 = require("../utils/IDManager");
class ProdutoModel {
    static inicializar() {
        this.carregarDados();
    }
    static adicionar(produto) {
        const novoProduto = {
            ...produto,
            id: IDManager_1.IDManager.gerarId('produto'),
            dataCadastro: new Date(),
        };
        this.produtos.push(novoProduto);
        this.salvarDados();
        return novoProduto;
    }
    static buscarTodos() {
        return this.produtos.filter(produto => produto.disponivel);
    }
    static buscarPorId(id) {
        return this.produtos.find(produto => produto.id === id && produto.disponivel);
    }
    static buscarPorCategoria(categoria) {
        return this.produtos.filter(produto => produto.categoria === categoria && produto.disponivel);
    }
    static buscarPizzas() {
        return this.buscarPorCategoria(CategoriaProduto.PIZZA);
    }
    static atualizar(id, dadosAtualizacao) {
        const index = this.produtos.findIndex(produto => produto.id === id && produto.disponivel);
        if (index === -1)
            return null;
        this.produtos[index] = { ...this.produtos[index], ...dadosAtualizacao };
        this.salvarDados();
        return this.produtos[index];
    }
    static excluir(id) {
        const index = this.produtos.findIndex(produto => produto.id === id && produto.disponivel);
        if (index === -1)
            return false;
        this.produtos[index].disponivel = false;
        this.salvarDados();
        return true;
    }
    static carregarDados() {
        this.produtos = CSVManager_1.CSVManager.carregarDados('produtos', (linha) => {
            const produto = {
                id: linha[0],
                nome: linha[1],
                descricao: linha[2],
                categoria: linha[3],
                preco: parseFloat(linha[4]),
                tamanho: linha[5] ? linha[5] : undefined,
                ingredientes: linha[6] ? JSON.parse(linha[6]) : undefined,
                disponivel: linha[7] === 'true',
                dataCadastro: new Date(linha[8])
            };
            return produto;
        });
        // Atualizar contador de IDs - agora trabalha com IDs numéricos simples
        if (this.produtos.length > 0) {
            const maxId = Math.max(...this.produtos.map(p => {
                const idNumerico = parseInt(p.id);
                return isNaN(idNumerico) ? 0 : idNumerico;
            }));
            IDManager_1.IDManager.definirContador('produto', maxId);
        }
        else {
            IDManager_1.IDManager.definirContador('produto', 0);
        }
    }
    static salvarDados() {
        CSVManager_1.CSVManager.salvarDados('produtos', this.produtos, this.headers);
    }
}
exports.ProdutoModel = ProdutoModel;
ProdutoModel.produtos = [];
ProdutoModel.headers = ['id', 'nome', 'descricao', 'categoria', 'preco', 'tamanho', 'ingredientes', 'disponivel', 'dataCadastro'];
//# sourceMappingURL=Produto.js.map