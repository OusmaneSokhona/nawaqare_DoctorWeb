import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private redis!: Redis;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    try {
      const redisUrl = this.configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
      this.redis = new Redis(redisUrl);

      this.redis.on('error', (error) => {
        this.logger.error('Redis connection error:', error);
      });

      this.redis.on('connect', () => {
        this.logger.log('Redis connected successfully');
      });

      await this.redis.ping();
      this.logger.log('Redis is ready');
    } catch (error) {
      this.logger.error('Failed to connect to Redis:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.redis.quit();
      this.logger.log('Redis disconnected');
    } catch (error) {
      this.logger.error('Error closing Redis connection:', error);
    }
  }

  async set(key: string, value: string | object, ttl?: number): Promise<void> {
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      if (ttl) {
        await this.redis.setex(key, ttl, serialized);
      } else {
        await this.redis.set(key, serialized);
      }
    } catch (error) {
      this.logger.error(`Error setting key ${key}:`, error);
      throw error;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.redis.get(key);
    } catch (error) {
      this.logger.error(`Error getting key ${key}:`, error);
      throw error;
    }
  }

  async getJson<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      this.logger.error(`Error getting JSON key ${key}:`, error);
      throw error;
    }
  }

  async del(key: string | string[]): Promise<number> {
    try {
      const keys = Array.isArray(key) ? key : [key];
      return await this.redis.del(...keys);
    } catch (error) {
      this.logger.error(`Error deleting key:`, error);
      throw error;
    }
  }

  async setex(key: string, ttl: number, value: string | object): Promise<void> {
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      await this.redis.setex(key, ttl, serialized);
    } catch (error) {
      this.logger.error(`Error in setex for key ${key}:`, error);
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      this.logger.error(`Error checking key existence ${key}:`, error);
      throw error;
    }
  }

  async incr(key: string): Promise<number> {
    try {
      return await this.redis.incr(key);
    } catch (error) {
      this.logger.error(`Error incrementing key ${key}:`, error);
      throw error;
    }
  }

  async expire(key: string, ttl: number): Promise<number> {
    try {
      return await this.redis.expire(key, ttl);
    } catch (error) {
      this.logger.error(`Error setting expiration for key ${key}:`, error);
      throw error;
    }
  }

  async ttl(key: string): Promise<number> {
    try {
      return await this.redis.ttl(key);
    } catch (error) {
      this.logger.error(`Error getting TTL for key ${key}:`, error);
      throw error;
    }
  }

  async flushDb(): Promise<void> {
    try {
      await this.redis.flushdb();
      this.logger.log('Redis database flushed');
    } catch (error) {
      this.logger.error('Error flushing Redis database:', error);
      throw error;
    }
  }

  getClient(): Redis {
    return this.redis;
  }
}
