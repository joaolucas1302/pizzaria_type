import { Pedido, ItemPedido, StatusPedido, FormaPagamento } from '../models/Pedido';
export declare class PedidoService {
    static criarPedido(dadosPedido: {
        clienteId: string;
        itens: Omit<ItemPedido, 'precoUnitario'>[];
        formaPagamento: FormaPagamento;
        observacoes?: string;
        enderecoEntrega?: any;
    }): Pedido;
    static listarPedidos(): Pedido[];
    static buscarPedidoPorId(id: string): Pedido | null;
    static buscarPedidosPorCliente(clienteId: string): Pedido[];
    static buscarPedidosPorStatus(status: StatusPedido): Pedido[];
    static atualizarStatusPedido(id: string, status: StatusPedido): Pedido | null;
    static buscarPedidosDoDia(data?: Date): Pedido[];
    static buscarPedidosDoMes(ano: number, mes: number): Pedido[];
    static gerarRelatorioVendasDiario(data?: Date): {
        data: Date;
        totalPedidos: number;
        totalVendas: number;
        pizzasVendidas: number;
        pedidosPorStatus: Record<StatusPedido, number>;
    };
    static gerarRelatorioVendasMensal(ano: number, mes: number): {
        ano: number;
        mes: number;
        totalPedidos: number;
        totalVendas: number;
        pizzasVendidas: number;
        pedidosPorStatus: Record<StatusPedido, number>;
        vendasPorDia: Array<{
            dia: number;
            vendas: number;
            pizzas: number;
        }>;
    };
    private static processarItens;
    private static calcularTaxaEntrega;
}
//# sourceMappingURL=PedidoService.d.ts.map