export const USER_ROLES = {
  CLIENT: 'client',
  STAFF: 'staff',
  AGENCY: 'agency',
  ADMIN: 'admin'
} as const;

export const SHIFT_STATUS = {
  OPEN: 'open',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

export const API_ROUTES = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  SHIFTS: '/api/shifts',
  PAYMENTS: '/api/payments'
} as const;
