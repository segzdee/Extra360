import { Redis } from 'ioredis';

export class CacheManager {
  private static instance: CacheManager;
  private redis: Redis;
  private localCache: Map<string, { value: any; expiry: number }>;
  
  private constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      retryStrategy: (times) => Math.min(times * 50, 2000)
    });

    this.localCache = new Map();
    this.setupRedisListeners();
  }

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  private setupRedisListeners(): void {
    this.redis.on('error', (error) => {
      console.error('Redis Error:', error);
      // Fallback to local cache
    });

    this.redis.on('connect', () => {
      console.log('Redis connected');
    });
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      // Try Redis first
      const redisValue = await this.redis.get(key);
      if (redisValue) {
        return JSON.parse(redisValue);
      }

      // Fallback to local cache
      const localValue = this.localCache.get(key);
      if (localValue && localValue.expiry > Date.now()) {
        return localValue.value;
      }

      return null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttl: number = 300): Promise<void> {
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
      this.localCache.set(key, {
        value,
        expiry: Date.now() + (ttl * 1000)
      });
    } catch (error) {
      console.error('Cache set error:', error);
      // Still set local cache even if Redis fails
      this.localCache.set(key, {
        value,
        expiry: Date.now() + (ttl * 1000)
      });
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key);
      this.localCache.delete(key);
    } catch (error) {
      console.error('Cache delete error:', error);
      this.localCache.delete(key);
    }
  }

  async flush(): Promise<void> {
    try {
      await this.redis.flushall();
      this.localCache.clear();
    } catch (error) {
      console.error('Cache flush error:', error);
      this.localCache.clear();
    }
  }
}
