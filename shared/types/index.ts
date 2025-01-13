export interface ServiceConfig {
  name: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
}

export interface HealthCheck {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: Date;
  details: Record<string, any>;
}
