export interface Cliente {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    endereco: {
        rua: string;
        numero: string;
        bairro: string;
        cidade: string;
        cep: string;
    };
    dataCadastro: Date;
    ativo: boolean;
}
export declare class ClienteModel {
    private static clientes;
    private static headers;
    static inicializar(): void;
    static adicionar(cliente: Omit<Cliente, 'id' | 'dataCadastro'>): Cliente;
    static buscarTodos(): Cliente[];
    static buscarPorId(id: string): Cliente | undefined;
    static buscarPorEmail(email: string): Cliente | undefined;
    static atualizar(id: string, dadosAtualizacao: Partial<Omit<Cliente, 'id' | 'dataCadastro'>>): Cliente | null;
    static excluir(id: string): boolean;
    private static carregarDados;
    private static salvarDados;
}
//# sourceMappingURL=Cliente.d.ts.map