export interface QuantumState {
    stateVector: Complex[];
    numQubits: number;
    coherence: number;
    entanglement: EntanglementMetrics;
}

export interface Complex {
    real: number;
    imaginary: number;
}

export interface EntanglementMetrics {
    concurrence: number;
    tangle: number;
    vonNeumannEntropy: number;
}

export interface QuantumGate {
    matrix: Complex[][];
    name: string;
    description: string;
}

export interface MeasurementResult {
    outcome: boolean;
    probability: number;
    collapseState: QuantumState;
}

export interface QuantumConfig {
    numQubits: number;
    errorCorrectionThreshold: number;
    decoherenceRate: number;
    maxEntanglement: number;
}
