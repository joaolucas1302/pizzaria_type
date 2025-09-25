import { Promocao } from '../models/Promocao';
export declare class PromocaoService {
    static criarPromocao(dadosPromocao: Omit<Promocao, 'id' | 'usosPorCliente' | 'ativa'>): Promocao;
    static listarPromocoes(): Promocao[];
    static listarPromocoesAtivas(): Promocao[];
    static buscarPromocaoPorId(id: string): Promocao | null;
    static aplicarMelhorPromocao(dadosPedido: {
        clienteId: string;
        itens: any[];
        subtotal: number;
    }): {
        desconto: number;
        promocaoAplicada: Promocao | null;
    };
    static desativarPromocao(id: string): boolean;
    static ativarPromocao(id: string): boolean;
    static criarPromocoesPadrao(): void;
    private static validarDadosPromocao;
}
//# sourceMappingURL=PromocaoService.d.ts.map