"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoService = void 0;
const Produto_1 = require("../models/Produto");
class ProdutoService {
    static cadastrarProduto(dadosProduto) {
        // Validar dados obrigatórios
        this.validarDadosProduto(dadosProduto);
        const produto = Produto_1.ProdutoModel.adicionar({
            ...dadosProduto,
            disponivel: true
        });
        return produto;
    }
    static listarProdutos() {
        return Produto_1.ProdutoModel.buscarTodos();
    }
    static listarProdutosPorCategoria(categoria) {
        return Produto_1.ProdutoModel.buscarPorCategoria(categoria);
    }
    static listarPizzas() {
        return Produto_1.ProdutoModel.buscarPizzas();
    }
    static buscarProdutoPorId(id) {
        const produto = Produto_1.ProdutoModel.buscarPorId(id);
        return produto || null;
    }
    static atualizarProduto(id, dadosAtualizacao) {
        // Verificar se o produto existe
        const produtoExistente = Produto_1.ProdutoModel.buscarPorId(id);
        if (!produtoExistente) {
            throw new Error('Produto não encontrado');
        }
        // Validar dados se fornecidos
        if (dadosAtualizacao.nome || dadosAtualizacao.preco || dadosAtualizacao.categoria) {
            this.validarDadosProduto({
                nome: dadosAtualizacao.nome || produtoExistente.nome,
                descricao: dadosAtualizacao.descricao || produtoExistente.descricao,
                categoria: dadosAtualizacao.categoria || produtoExistente.categoria,
                preco: dadosAtualizacao.preco || produtoExistente.preco,
                tamanho: dadosAtualizacao.tamanho || produtoExistente.tamanho,
                ingredientes: dadosAtualizacao.ingredientes || produtoExistente.ingredientes
            });
        }
        return Produto_1.ProdutoModel.atualizar(id, dadosAtualizacao);
    }
    static excluirProduto(id) {
        const produto = Produto_1.ProdutoModel.buscarPorId(id);
        if (!produto) {
            throw new Error('Produto não encontrado');
        }
        return Produto_1.ProdutoModel.excluir(id);
    }
    static buscarProdutosPorNome(nome) {
        const produtos = Produto_1.ProdutoModel.buscarTodos();
        return produtos.filter(produto => produto.nome.toLowerCase().includes(nome.toLowerCase()));
    }
    static buscarPizzasPorTamanho(tamanho) {
        const pizzas = Produto_1.ProdutoModel.buscarPizzas();
        return pizzas.filter(pizza => pizza.tamanho === tamanho);
    }
    static buscarProdutosPorFaixaPreco(precoMin, precoMax) {
        const produtos = Produto_1.ProdutoModel.buscarTodos();
        return produtos.filter(produto => produto.preco >= precoMin && produto.preco <= precoMax);
    }
    static validarDadosProduto(dados) {
        if (!dados.nome || dados.nome.trim().length < 2) {
            throw new Error('Nome do produto deve ter pelo menos 2 caracteres');
        }
        if (!dados.descricao || dados.descricao.trim().length < 5) {
            throw new Error('Descrição deve ter pelo menos 5 caracteres');
        }
        if (!dados.categoria) {
            throw new Error('Categoria é obrigatória');
        }
        if (!dados.preco || dados.preco <= 0) {
            throw new Error('Preço deve ser maior que zero');
        }
        // Validações específicas para pizzas
        if (dados.categoria === Produto_1.CategoriaProduto.PIZZA) {
            if (!dados.tamanho) {
                throw new Error('Tamanho é obrigatório para pizzas');
            }
            if (!dados.ingredientes || dados.ingredientes.length === 0) {
                throw new Error('Ingredientes são obrigatórios para pizzas');
            }
        }
    }
}
exports.ProdutoService = ProdutoService;
//# sourceMappingURL=ProdutoService.js.map