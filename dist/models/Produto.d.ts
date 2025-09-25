export declare enum CategoriaProduto {
    PIZZA = "pizza",
    REFRIGERANTE = "refrigerante",
    SOBREMESA = "sobremesa",
    OUTROS = "outros"
}
export declare enum TamanhoPizza {
    PEQUENA = "pequena",
    MEDIA = "media",
    GRANDE = "grande",
    FAMILIA = "familia"
}
export interface Produto {
    id: string;
    nome: string;
    descricao: string;
    categoria: CategoriaProduto;
    preco: number;
    tamanho?: TamanhoPizza;
    ingredientes?: string[];
    disponivel: boolean;
    dataCadastro: Date;
}
export declare class ProdutoModel {
    private static produtos;
    private static headers;
    static inicializar(): void;
    static adicionar(produto: Omit<Produto, 'id' | 'dataCadastro'>): Produto;
    static buscarTodos(): Produto[];
    static buscarPorId(id: string): Produto | undefined;
    static buscarPorCategoria(categoria: CategoriaProduto): Produto[];
    static buscarPizzas(): Produto[];
    static atualizar(id: string, dadosAtualizacao: Partial<Omit<Produto, 'id' | 'dataCadastro'>>): Produto | null;
    static excluir(id: string): boolean;
    private static carregarDados;
    private static salvarDados;
}
//# sourceMappingURL=Produto.d.ts.map