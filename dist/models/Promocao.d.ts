export declare enum TipoPromocao {
    DESCONTO_PERCENTUAL = "desconto_percentual",
    DESCONTO_FIXO = "desconto_fixo",
    PIZZA_GRATIS = "pizza_gratis",
    COMBO = "combo"
}
export interface Promocao {
    id: string;
    nome: string;
    descricao: string;
    tipo: TipoPromocao;
    valor: number;
    valorMinimo?: number;
    produtosAplicaveis?: string[];
    dataInicio: Date;
    dataFim: Date;
    ativa: boolean;
    limiteUsos?: number;
    usosPorCliente?: Map<string, number>;
}
export declare class PromocaoModel {
    private static promocoes;
    private static headers;
    static inicializar(): void;
    static adicionar(promocao: Omit<Promocao, 'id' | 'usosPorCliente'>): Promocao;
    static buscarTodas(): Promocao[];
    static buscarAtivas(): Promocao[];
    static buscarPorId(id: string): Promocao | undefined;
    static aplicarPromocao(pedido: any, promocao: Promocao): number;
    private static verificarAplicabilidade;
    private static carregarDados;
    private static salvarDados;
}
//# sourceMappingURL=Promocao.d.ts.map