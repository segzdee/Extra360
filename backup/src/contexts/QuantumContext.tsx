import React, { createContext, useContext, useState, useCallback } from 'react';
import { QuantumDatabase } from '../quantum/database/QuantumDatabase';
import { ErrorCorrection } from '../quantum/error/ErrorCorrection';
import type { QuantumState, QueryResult } from '../types/quantum';

interface QuantumContextType {
    quantumState: QuantumState | null;
    executeQuery: <T>(query: string, params?: any[]) => Promise<QueryResult<T>>;
    performErrorCorrection: () => void;
    metrics: {
        errorCorrectionEvents: number;
        queryCount: number;
        averageCoherence: number;
    };
}

const QuantumContext = createContext<QuantumContextType | undefined>(undefined);

export const QuantumProvider: React.FC<{ children: React.ReactNode }> = ({ 
    children 
}) => {
    const [database] = useState(() => new QuantumDatabase(8));
    const [errorCorrection] = useState(() => new ErrorCorrection(8));
    const [metrics, setMetrics] = useState({
        errorCorrectionEvents: 0,
        queryCount: 0,
        averageCoherence: 1.0
    });

    const executeQuery = useCallback(async <T,>(
        query: string,
        params: any[] = []
    ): Promise<QueryResult<T>> => {
        const result = await database.executeQuantumQuery<T>(query, params);
        setMetrics(prev => ({
            ...prev,
            queryCount: prev.queryCount + 1,
            averageCoherence: (prev.averageCoherence * prev.queryCount + 
                result.quantumMetrics.coherence) / (prev.queryCount + 1)
        }));
        return result;
    }, [database]);

    const performErrorCorrection = useCallback(() => {
        const state = database.getQuantumMetrics();
        if (errorCorrection.isErrorCorrectionNeeded(state)) {
            setMetrics(prev => ({
                ...prev,
                errorCorrectionEvents: prev.errorCorrectionEvents + 1
            }));
        }
    }, [database, errorCorrection]);

    return (
        <QuantumContext.Provider value={{
            quantumState: database.getQuantumMetrics(),
            executeQuery,
            performErrorCorrection,
            metrics
        }}>
            {children}
        </QuantumContext.Provider>
    );
};

export const useQuantum = () => {
    const context = useContext(QuantumContext);
    if (context === undefined) {
        throw new Error('useQuantum must be used within a QuantumProvider');
    }
    return context;
};
