import { Produto, CategoriaProduto, TamanhoPizza } from '../models/Produto';
export declare class ProdutoService {
    static cadastrarProduto(dadosProduto: Omit<Produto, 'id' | 'dataCadastro' | 'disponivel'>): Produto;
    static listarProdutos(): Produto[];
    static listarProdutosPorCategoria(categoria: CategoriaProduto): Produto[];
    static listarPizzas(): Produto[];
    static buscarProdutoPorId(id: string): Produto | null;
    static atualizarProduto(id: string, dadosAtualizacao: Partial<Omit<Produto, 'id' | 'dataCadastro'>>): Produto | null;
    static excluirProduto(id: string): boolean;
    static buscarProdutosPorNome(nome: string): Produto[];
    static buscarPizzasPorTamanho(tamanho: TamanhoPizza): Produto[];
    static buscarProdutosPorFaixaPreco(precoMin: number, precoMax: number): Produto[];
    private static validarDadosProduto;
}
//# sourceMappingURL=ProdutoService.d.ts.map