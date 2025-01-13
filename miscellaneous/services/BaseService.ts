import { EventEmitter } from 'events';
import { Logger } from './Logger';
import { CacheManager } from './CacheManager';
import { ErrorHandler } from './ErrorHandler';

export abstract class BaseService extends EventEmitter {
  protected logger: Logger;
  protected cache: CacheManager;
  protected errorHandler: ErrorHandler;
  
  constructor() {
    super();
    this.logger = new Logger(this.constructor.name);
    this.cache = CacheManager.getInstance();
    this.errorHandler = new ErrorHandler();
    this.initializeService();
  }

  protected abstract initializeService(): void;

  protected async executeWithTransaction<T>(
    operation: () => Promise<T>,
    errorMessage: string
  ): Promise<T> {
    const transaction = await this.startTransaction();
    try {
      const result = await operation();
      await this.commitTransaction(transaction);
      return result;
    } catch (error) {
      await this.rollbackTransaction(transaction);
      throw this.errorHandler.handleError(error, errorMessage);
    }
  }

  protected async withCache<T>(
    key: string,
    operation: () => Promise<T>,
    options = { ttl: 300 }
  ): Promise<T> {
    try {
      const cachedResult = await this.cache.get(key);
      if (cachedResult) return cachedResult;

      const result = await operation();
      await this.cache.set(key, result, options.ttl);
      return result;
    } catch (error) {
      this.logger.error('Cache operation failed', error);
      return operation();
    }
  }

  protected abstract startTransaction(): Promise<any>;
  protected abstract commitTransaction(transaction: any): Promise<void>;
  protected abstract rollbackTransaction(transaction: any): Promise<void>;

  protected emitServiceEvent(event: string, data: any): void {
    this.emit(event, {
      timestamp: new Date(),
      service: this.constructor.name,
      data
    });
  }
}
