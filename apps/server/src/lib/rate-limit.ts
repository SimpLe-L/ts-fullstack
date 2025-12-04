import type { Context } from "hono";
import type { Store } from "hono-rate-limiter";
import type { RedisReply } from "rate-limit-redis";

import { rateLimiter } from "hono-rate-limiter";
import { RedisStore } from "rate-limit-redis";
import { z } from "zod";

import type { AppBindings } from "@/types/lib";

import redisClient from "@/lib/redis";


const ioredisStore = new RedisStore({
  sendCommand: (...args) => {
    const [command, ...commandArgs] = args;
    return redisClient.call(command, ...commandArgs) as Promise<RedisReply>;
  },
}) as unknown as Store<AppBindings>;

const ipv4Schema = z.ipv4();
const ipv6Schema = z.ipv6();

function validateIp(ip: string): string | null {
  const ipv4Result = ipv4Schema.safeParse(ip);
  if (ipv4Result.success)
    return ipv4Result.data;

  const ipv6Result = ipv6Schema.safeParse(ip);
  if (ipv6Result.success)
    return ipv6Result.data;

  return null;
}
function getClientIdentifier(c: Context<AppBindings>) {
  // 1. X-Forwarded-For
  const xff = c.req.header("X-Forwarded-For");
  if (xff) {
    const ip = xff.split(",")[0].trim();
    if (validateIp(ip))
      return ip;
  }

  const real = c.req.header("X-Real-IP");
  if (real && validateIp(real))
    return real;

  // @ts-expect-error: Node.js adapter adds `incoming` but TS defs don’t include it
  const incoming = c.req.raw?.incoming;
  const socketIp
    = incoming?.socket?.remoteAddress
    || incoming?.connection?.remoteAddress;

  if (socketIp && validateIp(socketIp))
    return socketIp;

  return "0.0.0.0";
}

export type RateLimitOptions = {
  windowMs: number;
  limit: number;
  keyGenerator?: (c: Context<AppBindings>) => string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
};


export function createRateLimiter(options: RateLimitOptions) {
  return rateLimiter({
    windowMs: options.windowMs,
    limit: options.limit,
    standardHeaders: "draft-6",
    keyGenerator: options.keyGenerator ?? getClientIdentifier,
    store: ioredisStore,
    skipSuccessfulRequests: options.skipSuccessfulRequests ?? false,
    skipFailedRequests: options.skipFailedRequests ?? false,
  });
}

export const DEFAULT_RATE_LIMIT: RateLimitOptions = {
  windowMs: 1 * 60 * 1000,
  limit: 100,
};
