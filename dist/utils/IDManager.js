"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDManager = void 0;
class IDManager {
    static gerarId(tipo) {
        const contadorAtual = this.contadores.get(tipo) || 0;
        const novoContador = contadorAtual + 1;
        this.contadores.set(tipo, novoContador);
        // Retorna apenas o número sequencial (1, 2, 3, 4, 5, 6...)
        return novoContador.toString();
    }
    static definirContador(tipo, valor) {
        this.contadores.set(tipo, valor);
    }
    static obterContador(tipo) {
        return this.contadores.get(tipo) || 0;
    }
    static inicializarContadores() {
        // Os contadores serão inicializados quando os dados forem carregados
        this.contadores.set('cliente', 0);
        this.contadores.set('produto', 0);
        this.contadores.set('pedido', 0);
        this.contadores.set('promocao', 0);
    }
}
exports.IDManager = IDManager;
IDManager.contadores = new Map();
//# sourceMappingURL=IDManager.js.map