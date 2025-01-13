import { QuantumState, Complex } from '../../types/quantum';

export class QuantumIsolation {
    private static instance: QuantumIsolation;
    private isolatedRegisters: Map<string, QuantumState>;
    private decoherenceBarrier: boolean;

    private constructor() {
        this.isolatedRegisters = new Map();
        this.decoherenceBarrier = true;
    }

    public static getInstance(): QuantumIsolation {
        if (!QuantumIsolation.instance) {
            QuantumIsolation.instance = new QuantumIsolation();
        }
        return QuantumIsolation.instance;
    }

    public isolateQuantumState(stateId: string, state: QuantumState): void {
        if (this.decoherenceBarrier) {
            this.isolatedRegisters.set(stateId, this.createIsolatedCopy(state));
        }
    }

    private createIsolatedCopy(state: QuantumState): QuantumState {
        return {
            ...state,
            stateVector: state.stateVector.map(complex => ({...complex})),
            entanglement: {...state.entanglement}
        };
    }

    public getIsolatedState(stateId: string): QuantumState | null {
        return this.isolatedRegisters.get(stateId) || null;
    }
}
