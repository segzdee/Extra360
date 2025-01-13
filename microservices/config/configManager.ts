import * as fs from 'fs';
import * as path from 'path';

export interface ConfigurationOptions {
  environment: 'development' | 'staging' | 'production';
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
  security: {
    jwtSecret: string;
    rateLimitWindowMs: number;
    rateLimitMaxRequests: number;
  };
}

export class ConfigManager {
  private static instance: ConfigManager;
  private config: ConfigurationOptions;

  private constructor() {
    this.loadConfiguration();
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private loadConfiguration() {
    const env = process.env.NODE_ENV || 'development';
    const configPath = path.resolve(__dirname, `${env}.json`);

    try {
      const configFile = fs.readFileSync(configPath, 'utf8');
      this.config = JSON.parse(configFile);
    } catch (error) {
      console.error('Failed to load configuration:', error);
      // Fallback to default configuration
      this.config = this.getDefaultConfiguration();
    }
  }

  private getDefaultConfiguration(): ConfigurationOptions {
    return {
      environment: 'development',
      logLevel: 'debug',
      database: {
        host: 'localhost',
        port: 5432,
        username: 'dev_user',
        password: 'dev_password'
      },
      security: {
        jwtSecret: 'default_secret_key',
        rateLimitWindowMs: 15 * 60 * 1000, // 15 minutes
        rateLimitMaxRequests: 100
      }
    };
  }

  public getConfig(): ConfigurationOptions {
    return this.config;
  }

  public get<K extends keyof ConfigurationOptions>(key: K): ConfigurationOptions[K] {
    return this.config[key];
  }
}

export const configManager = ConfigManager.getInstance();
