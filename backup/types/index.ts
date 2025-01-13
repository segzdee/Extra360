export interface User {
  id: string;
  email: string;
  role: 'client' | 'staff' | 'agency' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
}

export interface Shift {
  id: string;
  clientId: string;
  staffId?: string;
  startTime: Date;
  endTime: Date;
  status: 'open' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  hourlyRate: number;
}

// Add more shared types
