export declare enum StatusPedido {
    PENDENTE = "pendente",
    PREPARANDO = "preparando",
    PRONTO = "pronto",
    ENTREGUE = "entregue",
    CANCELADO = "cancelado"
}
export declare enum FormaPagamento {
    DINHEIRO = "dinheiro",
    CARTAO_CREDITO = "cartao_credito",
    CARTAO_DEBITO = "cartao_debito",
    PIX = "pix",
    VALE_REFEICAO = "vale_refeicao"
}
export interface ItemPedido {
    produtoId: string;
    quantidade: number;
    precoUnitario: number;
    observacoes?: string;
}
export interface Pedido {
    id: string;
    clienteId: string;
    itens: ItemPedido[];
    status: StatusPedido;
    formaPagamento: FormaPagamento;
    subtotal: number;
    desconto: number;
    taxaEntrega: number;
    total: number;
    observacoes?: string;
    dataPedido: Date;
    dataEntrega?: Date;
    enderecoEntrega?: {
        rua: string;
        numero: string;
        bairro: string;
        cidade: string;
        cep: string;
    };
}
export declare class PedidoModel {
    private static pedidos;
    private static headers;
    static inicializar(): void;
    static adicionar(pedido: Omit<Pedido, 'id' | 'dataPedido'>): Pedido;
    private static gerarComprovanteAutomatico;
    static buscarTodos(): Pedido[];
    static buscarPorId(id: string): Pedido | undefined;
    static buscarPorCliente(clienteId: string): Pedido[];
    static buscarPorStatus(status: StatusPedido): Pedido[];
    static buscarPorData(data: Date): Pedido[];
    static buscarPorMes(ano: number, mes: number): Pedido[];
    static atualizarStatus(id: string, status: StatusPedido): Pedido | null;
    static calcularTotal(itens: ItemPedido[], desconto?: number, taxaEntrega?: number): number;
    private static carregarDados;
    private static salvarDados;
}
//# sourceMappingURL=Pedido.d.ts.map