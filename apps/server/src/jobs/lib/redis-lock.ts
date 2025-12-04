import { randomUUID } from "node:crypto";

import logger from "@/lib/logger";
import redisClient from "@/lib/redis";

import { DEFAULT_LOCK_TTL, LOCK_REFRESH_INTERVAL, REDIS_KEY_PREFIX } from "../config";

export class RedisLock {
  private readonly key: string;
  private readonly value: string;
  private readonly ttl: number;
  private refreshTimer?: NodeJS.Timeout;

  constructor(key: string, ttl: number = DEFAULT_LOCK_TTL) {
    this.key = `${REDIS_KEY_PREFIX.LOCK}${key}`;
    this.value = randomUUID();
    this.ttl = ttl;
  }


  async acquire(): Promise<boolean> {
    try {
      const result = await redisClient.set(
        this.key,
        this.value,
        "EX",
        this.ttl,
        "NX",
      );

      if (result === "OK") {
        logger.info({ key: this.key }, "[分布式锁]: 成功获取锁");
        this.startRefresh();
        return true;
      }

      return false;
    }
    catch (error) {
      logger.error({ error, key: this.key }, "[分布式锁]: 获取锁失败");
      return false;
    }
  }


  async release(): Promise<boolean> {
    try {
      this.stopRefresh();

      const script = `
        if redis.call("get", KEYS[1]) == ARGV[1] then
          return redis.call("del", KEYS[1])
        else
          return 0
        end
      `;

      const result = await redisClient.eval(script, 1, this.key, this.value);

      if (result === 1) {
        logger.info({ key: this.key }, "[分布式锁]: 成功释放锁");
        return true;
      }

      logger.warn({ key: this.key }, "[分布式锁]: 锁已不存在或不属于当前持有者");
      return false;
    }
    catch (error) {
      logger.error({ error, key: this.key }, "[分布式锁]: 释放锁失败");
      return false;
    }
  }

  async isLocked(): Promise<boolean> {
    try {
      const value = await redisClient.get(this.key);
      return value === this.value;
    }
    catch (error) {
      logger.error({ error, key: this.key }, "[分布式锁]: 检查锁状态失败");
      return false;
    }
  }


  async extend(ttl?: number): Promise<boolean> {
    try {
      const newTTL = ttl || this.ttl;

      const script = `
        if redis.call("get", KEYS[1]) == ARGV[1] then
          return redis.call("expire", KEYS[1], ARGV[2])
        else
          return 0
        end
      `;

      const result = await redisClient.eval(script, 1, this.key, this.value, newTTL);

      if (result === 1) {
        logger.info({ key: this.key, ttl: newTTL }, "[分布式锁]: 成功延长锁时间");
        return true;
      }

      return false;
    }
    catch (error) {
      logger.error({ error, key: this.key }, "[分布式锁]: 延长锁时间失败");
      return false;
    }
  }


  private startRefresh(): void {
    this.refreshTimer = setInterval(async () => {
      const success = await this.extend();
      if (!success) {
        logger.warn({ key: this.key }, "[分布式锁]: 续期失败，锁可能已丢失");
        this.stopRefresh();
      }
    }, LOCK_REFRESH_INTERVAL);
  }


  private stopRefresh(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = undefined;
    }
  }
}


export async function withLock<T>(
  key: string,
  fn: () => Promise<T>,
  options: { ttl?: number; retries?: number; retryDelay?: number } = {},
): Promise<T | null> {
  const { ttl = DEFAULT_LOCK_TTL, retries = 0, retryDelay = 1000 } = options;
  const lock = new RedisLock(key, ttl);

  let attempts = 0;
  while (attempts <= retries) {
    if (await lock.acquire()) {
      try {
        const result = await fn();
        return result;
      }
      finally {
        await lock.release();
      }
    }

    attempts++;
    if (attempts <= retries) {
      logger.warn(
        { key, attempt: attempts, maxRetries: retries },
        "[分布式锁]: 获取锁失败，重试中",
      );
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }

  logger.error({ key, attempts }, "[分布式锁]: 无法获取锁");
  return null;
}
