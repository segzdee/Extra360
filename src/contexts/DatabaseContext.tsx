import React, { createContext, useContext, useState } from 'react';
import { createQuantumConnection } from '../utils/db';

interface DatabaseContextType {
  executeQuery: <T>(query: string, params?: any[]) => Promise<T>;
  isConnected: boolean;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  const executeQuery = async <T,>(query: string, params: any[] = []): Promise<T> => {
    const connection = await createQuantumConnection();
    try {
      const [results] = await connection.execute(query, params);
      return results as T;
    } finally {
      await connection.end();
    }
  };

  return (
    <DatabaseContext.Provider value={{ executeQuery, isConnected }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
