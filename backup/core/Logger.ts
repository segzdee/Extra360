export class Logger {
  private serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  info(message: string, meta?: any): void {
    this.log('INFO', message, meta);
  }

  error(message: string, error?: any): void {
    this.log('ERROR', message, error);
  }

  warn(message: string, meta?: any): void {
    this.log('WARN', message, meta);
  }

  debug(message: string, meta?: any): void {
    this.log('DEBUG', message, meta);
  }

  private log(level: string, message: string, meta?: any): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      service: this.serviceName,
      message,
      ...(meta && { meta })
    };

    console.log(JSON.stringify(logEntry));
  }
}
