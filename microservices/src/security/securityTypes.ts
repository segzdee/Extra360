import { MicroserviceType } from '../types/architecture';

export interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  level: SecurityLevel;
  rules: SecurityRule[];
}

export interface SecurityRule {
  type: SecurityRuleType;
  enforcement: EnforcementLevel;
  conditions: Record<string, any>;
}

export enum SecurityRuleType {
  IP_RESTRICTION = 'ip_restriction',
  RATE_LIMITING = 'rate_limiting',
  DATA_ENCRYPTION = 'data_encryption',
  ACCESS_CONTROL = 'access_control'
}

export enum EnforcementLevel {
  LOG = 'log',
  WARN = 'warn',
  BLOCK = 'block',
  QUARANTINE = 'quarantine'
}

export enum SecurityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  timestamp: Date;
  ipAddress: string;
  serviceType: MicroserviceType;
  securityLevel: SecurityLevel;
  status: 'success' | 'failed' | 'blocked';
}
