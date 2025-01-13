import { Complex, QuantumGate } from '../../types/quantum';

export class QuantumGates {
    private static createGate(matrix: Complex[][], name: string, description: string): QuantumGate {
        return { matrix, name, description };
    }

    // Hadamard Gate - Creates quantum superposition
    static readonly H: QuantumGate = this.createGate(
        [
            [{ real: 1/Math.SQRT2, imaginary: 0 }, { real: 1/Math.SQRT2, imaginary: 0 }],
            [{ real: 1/Math.SQRT2, imaginary: 0 }, { real: -1/Math.SQRT2, imaginary: 0 }]
        ],
        'Hadamard',
        'Creates superposition states'
    );

    // Pauli-X Gate (NOT Gate) - Bit flip
    static readonly X: QuantumGate = this.createGate(
        [
            [{ real: 0, imaginary: 0 }, { real: 1, imaginary: 0 }],
            [{ real: 1, imaginary: 0 }, { real: 0, imaginary: 0 }]
        ],
        'Pauli-X',
        'Quantum NOT operation'
    );

    // Pauli-Z Gate - Phase flip
    static readonly Z: QuantumGate = this.createGate(
        [
            [{ real: 1, imaginary: 0 }, { real: 0, imaginary: 0 }],
            [{ real: 0, imaginary: 0 }, { real: -1, imaginary: 0 }]
        ],
        'Pauli-Z',
        'Phase flip operation'
    );

    // CNOT Gate - Controlled-NOT for entanglement
    static readonly CNOT: QuantumGate = this.createGate(
        [
            [{ real: 1, imaginary: 0 }, { real: 0, imaginary: 0 }, { real: 0, imaginary: 0 }, { real: 0, imaginary: 0 }],
            [{ real: 0, imaginary: 0 }, { real: 1, imaginary: 0 }, { real: 0, imaginary: 0 }, { real: 0, imaginary: 0 }],
            [{ real: 0, imaginary: 0 }, { real: 0, imaginary: 0 }, { real: 0, imaginary: 0 }, { real: 1, imaginary: 0 }],
            [{ real: 0, imaginary: 0 }, { real: 0, imaginary: 0 }, { real: 1, imaginary: 0 }, { real: 0, imaginary: 0 }]
        ],
        'CNOT',
        'Creates quantum entanglement'
    );
}
