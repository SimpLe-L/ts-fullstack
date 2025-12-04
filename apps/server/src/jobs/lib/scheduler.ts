import type { Cron } from "croner";

import { Cron as Croner } from "croner";
import { randomUUID } from "node:crypto";

import logger from "@/lib/logger";

import type { ScheduledTaskConfig, TaskData } from "../config";

import { DEFAULT_LOCK_TTL, DEFAULT_QUEUE_NAME } from "../config";
import { addJob } from "./queue";
import { withLock } from "./redis-lock";

const cronJobInstances = new Map<string, Cron>();


export function registerScheduledTask(config: ScheduledTaskConfig): Cron {
  const {
    name,
    pattern,
    data = {},
    options = {},
    useLock = true,
    lockTTL = DEFAULT_LOCK_TTL,
  } = config;

  if (cronJobInstances.has(name)) {
    stopScheduledTask(name);
  }

  const cronJob = new Croner(pattern, async () => {
    const executeTask = async () => {
      const job = await addJob(
        name,
        data as TaskData,
        {
          ...options,
          jobId: `${name}_${Date.now()}_${randomUUID().slice(0, 8)}`,
        },
        DEFAULT_QUEUE_NAME,
      );

      return job;
    };

    try {
      if (useLock) {
        const lockKey = `cron_${name}`;
        const result = await withLock(lockKey, executeTask, { ttl: lockTTL });

        if (result === null) {
          logger.warn({ taskName: name }, "[定时任务]: 无法获取锁，跳过执行");
        }
      }
      else {
        await executeTask();
      }
    }
    catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      logger.error(
        {
          taskName: name,
          error: errorMessage,
          stack: errorStack,
        },
        "[定时任务]: 添加任务到队列失败",
      );
    }
  });

  cronJobInstances.set(name, cronJob);
  return cronJob;
}

export function registerScheduledTasks(configs: ScheduledTaskConfig[]): void {
  for (const config of configs) {
    registerScheduledTask(config);
  }
}


export function stopScheduledTask(name: string): void {
  const cronJob = cronJobInstances.get(name);
  if (cronJob) {
    cronJob.stop();
    cronJobInstances.delete(name);
  }
}

export function pauseScheduledTask(name: string): void {
  const cronJob = cronJobInstances.get(name);
  if (cronJob) {
    cronJob.pause();
  }
}

export function resumeScheduledTask(name: string): void {
  const cronJob = cronJobInstances.get(name);
  if (cronJob) {
    cronJob.resume();
  }
}

export async function triggerScheduledTask(name: string): Promise<void> {
  const cronJob = cronJobInstances.get(name);
  if (cronJob) {
    await cronJob.trigger();
  }
  else {
    logger.warn({ taskName: name }, "[定时任务]: 任务不存在");
  }
}

export function getScheduledTaskStatus(name: string) {
  const cronJob = cronJobInstances.get(name);

  if (!cronJob) {
    return { exists: false };
  }

  return {
    exists: true,
    isRunning: cronJob.isRunning(),
    isPaused: !cronJob.isRunning() && !cronJob.isStopped(),
    isStopped: cronJob.isStopped(),
    isBusy: cronJob.isBusy(),
    nextRun: cronJob.nextRun(),
    nextRuns: cronJob.nextRuns(5),
    previousRun: cronJob.previousRun(),
    pattern: cronJob.getPattern(),
  };
}

export function getAllScheduledTasksStatus() {
  const statuses: Record<string, any> = {};

  for (const [name, cronJob] of cronJobInstances.entries()) {
    statuses[name] = {
      isRunning: cronJob.isRunning(),
      isPaused: !cronJob.isRunning() && !cronJob.isStopped(),
      isStopped: cronJob.isStopped(),
      isBusy: cronJob.isBusy(),
      nextRun: cronJob.nextRun(),
      pattern: cronJob.getPattern(),
    };
  }

  return statuses;
}


export function stopAllSchedulers(): void {
  for (const cronJob of cronJobInstances.values()) {
    cronJob.stop();
  }
  cronJobInstances.clear();
}

export function updateScheduledTask(config: ScheduledTaskConfig): Cron {
  stopScheduledTask(config.name);
  return registerScheduledTask(config);
}
