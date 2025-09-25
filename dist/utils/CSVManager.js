"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVManager = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class CSVManager {
    static salvarDados(nomeArquivo, dados, headers) {
        try {
            if (!fs.existsSync(this.dataDir)) {
                fs.mkdirSync(this.dataDir, { recursive: true });
            }
            const caminhoArquivo = path.join(this.dataDir, `${nomeArquivo}.csv`);
            // Converter dados para CSV
            const csvContent = this.converterParaCSV(dados, headers);
            fs.writeFileSync(caminhoArquivo, csvContent, 'utf8');
        }
        catch (error) {
            console.error(`Erro ao salvar dados em ${nomeArquivo}.csv:`, error);
        }
    }
    static carregarDados(nomeArquivo, converterLinha) {
        try {
            const caminhoArquivo = path.join(this.dataDir, `${nomeArquivo}.csv`);
            if (!fs.existsSync(caminhoArquivo)) {
                return [];
            }
            const conteudo = fs.readFileSync(caminhoArquivo, 'utf8');
            const linhas = conteudo.split('\n').filter(linha => linha.trim());
            if (linhas.length <= 1) {
                return []; // Apenas cabeçalho ou arquivo vazio
            }
            // Pular cabeçalho e converter linhas
            const dados = linhas.slice(1).map(linha => {
                const valores = this.parsearLinhaCSV(linha);
                return converterLinha(valores);
            });
            return dados;
        }
        catch (error) {
            console.error(`Erro ao carregar dados de ${nomeArquivo}.csv:`, error);
            return [];
        }
    }
    static converterParaCSV(dados, headers) {
        let csv = headers.join(',') + '\n';
        dados.forEach(item => {
            const valores = headers.map(header => {
                const valor = item[header];
                if (valor === null || valor === undefined) {
                    return '';
                }
                // Se for string e contiver vírgula, aspas ou quebra de linha, colocar entre aspas
                if (typeof valor === 'string' && (valor.includes(',') || valor.includes('"') || valor.includes('\n'))) {
                    return `"${valor.replace(/"/g, '""')}"`;
                }
                // Se for objeto (como endereço), converter para JSON
                if (typeof valor === 'object' && valor !== null) {
                    return `"${JSON.stringify(valor).replace(/"/g, '""')}"`;
                }
                return valor.toString();
            });
            csv += valores.join(',') + '\n';
        });
        return csv;
    }
    static parsearLinhaCSV(linha) {
        const valores = [];
        let valorAtual = '';
        let dentroDeAspas = false;
        let i = 0;
        while (i < linha.length) {
            const char = linha[i];
            if (char === '"') {
                if (dentroDeAspas && linha[i + 1] === '"') {
                    // Aspas duplas escapadas
                    valorAtual += '"';
                    i += 2;
                }
                else {
                    // Inverter estado das aspas
                    dentroDeAspas = !dentroDeAspas;
                    i++;
                }
            }
            else if (char === ',' && !dentroDeAspas) {
                valores.push(valorAtual.trim());
                valorAtual = '';
                i++;
            }
            else {
                valorAtual += char;
                i++;
            }
        }
        valores.push(valorAtual.trim());
        return valores;
    }
    static inicializarArquivosCSV() {
        // Criar diretório de dados se não existir
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
        // Criar arquivos CSV vazios se não existirem
        const arquivos = [
            { nome: 'clientes', headers: ['id', 'nome', 'email', 'telefone', 'endereco', 'dataCadastro', 'ativo'] },
            { nome: 'produtos', headers: ['id', 'nome', 'descricao', 'categoria', 'preco', 'tamanho', 'ingredientes', 'disponivel', 'dataCadastro'] },
            { nome: 'pedidos', headers: ['id', 'clienteId', 'itens', 'status', 'formaPagamento', 'subtotal', 'desconto', 'taxaEntrega', 'total', 'observacoes', 'dataPedido', 'dataEntrega', 'enderecoEntrega'] },
            { nome: 'promocoes', headers: ['id', 'nome', 'descricao', 'tipo', 'valor', 'valorMinimo', 'produtosAplicaveis', 'dataInicio', 'dataFim', 'ativa', 'limiteUsos'] }
        ];
        arquivos.forEach(arquivo => {
            const caminhoArquivo = path.join(this.dataDir, `${arquivo.nome}.csv`);
            if (!fs.existsSync(caminhoArquivo)) {
                fs.writeFileSync(caminhoArquivo, arquivo.headers.join(',') + '\n', 'utf8');
            }
        });
    }
}
exports.CSVManager = CSVManager;
CSVManager.dataDir = path.join(__dirname, '..', '..', 'data');
//# sourceMappingURL=CSVManager.js.map