export enum MicroserviceType {
  AUTH = 'authentication',
  USER_MANAGEMENT = 'user_management',
  SHIFT_MANAGEMENT = 'shift_management',
  PAYMENT = 'payment',
  NOTIFICATION = 'notification',
  COMPLIANCE = 'compliance',
  REPORTING = 'reporting'
}

export interface MicroserviceConfig {
  type: MicroserviceType;
  version: string;
  securityLevel: SecurityLevel;
  scalingStrategy: ScalingStrategy;
}

export enum SecurityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ScalingStrategy {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  HYBRID = 'hybrid'
}

export interface MicroserviceHealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  responseTime: number;
  errorRate: number;
}
