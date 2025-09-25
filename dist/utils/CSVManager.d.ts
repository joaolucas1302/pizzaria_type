export declare class CSVManager {
    private static dataDir;
    static salvarDados<T>(nomeArquivo: string, dados: T[], headers: string[]): void;
    static carregarDados<T>(nomeArquivo: string, converterLinha: (linha: string[]) => T): T[];
    private static converterParaCSV;
    private static parsearLinhaCSV;
    static inicializarArquivosCSV(): void;
}
//# sourceMappingURL=CSVManager.d.ts.map