export enum ErrorCategory {
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NETWORK = 'network',
  DATABASE = 'database',
  EXTERNAL_SERVICE = 'external_service'
}

export interface ApplicationError {
  id: string;
  category: ErrorCategory;
  code: string;
  message: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
}

export class ExtendedError extends Error {
  public id: string;
  public category: ErrorCategory;
  public code: string;
  public context?: Record<string, any>;

  constructor(
    message: string, 
    category: ErrorCategory, 
    code: string, 
    context?: Record<string, any>
  ) {
    super(message);
    this.id = `ERR-${Date.now()}`;
    this.category = category;
    this.code = code;
    this.context = context;
  }

  toJSON() {
    return {
      id: this.id,
      message: this.message,
      category: this.category,
      code: this.code,
      context: this.context
    };
  }
}
