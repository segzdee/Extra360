import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DatabaseProvider } from './contexts/DatabaseContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      cacheTime: 300000,
      retry: 3,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <DatabaseProvider>
      <div className="quantum-matrix min-h-screen bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-8">Extra360 Quantum Matrix</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quantum components will be initialized here */}
          </div>
        </div>
      </div>
    </DatabaseProvider>
  </QueryClientProvider>
);

export default App;
