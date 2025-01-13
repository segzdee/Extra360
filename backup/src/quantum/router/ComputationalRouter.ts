import { QuantumBridge } from '../bridge/QuantumBridge';
import { QuantumState } from '../../types/quantum';

export interface ComputationConfig {
    useQuantum: boolean;
    priority: 'quantum' | 'classical' | 'hybrid';
    timeout?: number;
}

export class ComputationalRouter {
    private bridge: QuantumBridge;
    
    constructor() {
        this.bridge = new QuantumBridge();
    }

    public async route<T>(
        computation: () => Promise<T>,
        config: ComputationConfig,
        quantumState?: QuantumState
    ): Promise<T> {
        if (!config.useQuantum || !quantumState) {
            return this.routeClassical(computation);
        }

        switch (config.priority) {
            case 'quantum':
                return this.routeQuantum(computation, quantumState);
            case 'hybrid':
                return this.routeHybrid(computation, quantumState);
            default:
                return this.routeClassical(computation);
        }
    }

    private async routeQuantum<T>(
        computation: () => Promise<T>,
        quantumState: QuantumState
    ): Promise<T> {
        return this.bridge.bridgeQuantumComputation(computation, quantumState);
    }

    private async routeClassical<T>(
        computation: () => Promise<T>
    ): Promise<T> {
        return computation();
    }

    private async routeHybrid<T>(
        computation: () => Promise<T>,
        quantumState: QuantumState
    ): Promise<T> {
        // Attempt quantum computation with classical fallback
        try {
            return await this.routeQuantum(computation, quantumState);
        } catch (error) {
            console.warn('Quantum computation failed, falling back to classical', error);
            return this.routeClassical(computation);
        }
    }
}
