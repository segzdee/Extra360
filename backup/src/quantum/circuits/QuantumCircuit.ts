import { QuantumCore } from '../core/QuantumCore';
import { QuantumGates } from '../gates/QuantumGates';
import { QuantumState, MeasurementResult } from '../../types/quantum';

export class QuantumCircuit {
    private core: QuantumCore;
    private gateHistory: { gate: string; qubit: number; }[];

    constructor(numQubits: number = 8) {
        this.core = new QuantumCore({ numQubits });
        this.gateHistory = [];
    }

    public applyHadamard(qubit: number): void {
        this.applyGate('H', qubit);
    }

    public applyCNOT(controlQubit: number, targetQubit: number): void {
        if (controlQubit === targetQubit) {
            throw new Error('Control and target qubits must be different');
        }
        this.core.applyOperation(QuantumGates.CNOT.matrix, targetQubit);
        this.gateHistory.push({ gate: 'CNOT', qubit: targetQubit });
    }

    public measure(): MeasurementResult {
        const state = this.core.getState();
        const outcome = Math.random() > 0.5;
        
        return {
            outcome,
            probability: outcome ? state.coherence : 1 - state.coherence,
            collapseState: state
        };
    }

    private applyGate(gateName: string, qubit: number): void {
        const gate = QuantumGates[gateName];
        if (!gate) {
            throw new Error(`Unknown gate: ${gateName}`);
        }
        this.core.applyOperation(gate.matrix, qubit);
        this.gateHistory.push({ gate: gateName, qubit });
    }

    public getState(): QuantumState {
        return this.core.getState();
    }

    public getCircuitDepth(): number {
        return this.gateHistory.length;
    }
}
