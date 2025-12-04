import type { JobsOptions, Processor } from "bullmq";

import env from "@/env";

export type TaskData = {
  [key: string]: any;
};


export type TaskOptions = {
  idempotencyKey?: string;
} & JobsOptions;


export type WorkerConfig = {
  concurrency?: number; // 并发数，默认 1
  maxStalledCount?: number; // 最大停滞次数，默认 1
  stalledInterval?: number; // 停滞检查间隔（毫秒），默认 30000
};


export type ScheduledTaskConfig = {
  name: string; // 任务名称
  pattern: string; // Cron 表达式
  data?: TaskData; // 任务数据
  options?: TaskOptions; // 任务选项
  useLock?: boolean; // 是否使用分布式锁，默认 true
  lockTTL?: number; // 锁过期时间（秒），默认 60
};

export type ProcessorRegistration = {
  name: string; // 任务名称
  processor: Processor; // 处理器函数
};


export type JobSystemConfig = {
  queueName?: string; // 队列名称，默认 'default'
  defaultJobOptions?: TaskOptions; // 默认任务选项
  workerConfig?: WorkerConfig; // 默认 Worker 配置
};

/**
 * 幂等性记录
 */
export type IdempotencyRecord = {
  jobId: string;
  taskName: string;
  result?: any;
  addedAt: string;
  createdAt: string;
  expiresAt: string;
};


export const DEFAULT_QUEUE_NAME = "default";
export const DEFAULT_WORKER_CONCURRENCY = 5;
export const DEFAULT_MAX_STALLED_COUNT = 1;
export const DEFAULT_STALLED_INTERVAL = 30000;

export const DEFAULT_JOB_ATTEMPTS = 3;
export const DEFAULT_BACKOFF_TYPE = "exponential";
export const DEFAULT_BACKOFF_DELAY = 5000;

export const DEFAULT_LOCK_TTL = 60;
export const LOCK_REFRESH_INTERVAL = 10000;

export const DEFAULT_IDEMPOTENCY_TTL = 7 * 24 * 3600;

export const REDIS_KEY_PREFIX = {
  LOCK: "job:lock:",
  IDEMPOTENCY: "job:idem:",
} as const;

export const jobSystemConfig: JobSystemConfig = {
  queueName: DEFAULT_QUEUE_NAME,
  workerConfig: {
    concurrency: env.NODE_ENV === "production" ? 10 : DEFAULT_WORKER_CONCURRENCY,
    maxStalledCount: DEFAULT_MAX_STALLED_COUNT,
    stalledInterval: DEFAULT_STALLED_INTERVAL,
  },
  defaultJobOptions: {
    attempts: DEFAULT_JOB_ATTEMPTS,
    backoff: {
      type: DEFAULT_BACKOFF_TYPE,
      delay: DEFAULT_BACKOFF_DELAY,
    },
    removeOnComplete: { age: 3600, count: 100 },
    removeOnFail: { age: 24 * 3600, count: 500 },
  },
};


export function mergeJobOptions(
  custom?: TaskOptions,
  defaults: TaskOptions = jobSystemConfig.defaultJobOptions!,
): TaskOptions {
  if (!custom)
    return defaults;

  let mergedBackoff = defaults.backoff;
  if (custom.backoff !== undefined) {
    if (typeof custom.backoff === "object" && typeof defaults.backoff === "object") {
      mergedBackoff = { ...defaults.backoff, ...custom.backoff };
    }
    else {
      mergedBackoff = custom.backoff;
    }
  }

  return { ...defaults, ...custom, backoff: mergedBackoff };
}
