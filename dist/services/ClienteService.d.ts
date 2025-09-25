import { Cliente } from '../models/Cliente';
export declare class ClienteService {
    static cadastrarCliente(dadosCliente: Omit<Cliente, 'id' | 'dataCadastro' | 'ativo'>): Cliente;
    static listarClientes(): Cliente[];
    static buscarClientePorId(id: string): Cliente | null;
    static buscarClientePorEmail(email: string): Cliente | null;
    static atualizarCliente(id: string, dadosAtualizacao: Partial<Omit<Cliente, 'id' | 'dataCadastro'>>): Cliente | null;
    static excluirCliente(id: string): boolean;
    private static validarDadosCliente;
    private static validarEmail;
    private static validarTelefone;
    private static validarEndereco;
    private static validarCEP;
}
//# sourceMappingURL=ClienteService.d.ts.map