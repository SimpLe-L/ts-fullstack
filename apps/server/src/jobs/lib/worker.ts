import type { Job, JobProgress, Processor, QueueEvents, Worker } from "bullmq";

import { QueueEvents as BullQueueEvents, Worker as BullWorker } from "bullmq";

import logger from "@/lib/logger";
import { getBullMQConnection } from "@/lib/redis";

import type { WorkerConfig } from "../config";

import { DEFAULT_QUEUE_NAME, jobSystemConfig } from "../config";

const workerInstances = new Map<string, Worker>();
const processorRegistry = new Map<string, Processor>();
const queueEventsInstances = new Map<string, QueueEvents>();


export function registerProcessor(taskName: string, processor: Processor): void {
  processorRegistry.set(taskName, processor);
  logger.debug({ taskName }, "[Worker]: 处理器已注册");
}

export function registerProcessors(processors: Record<string, Processor>): void {
  for (const [name, processor] of Object.entries(processors)) {
    registerProcessor(name, processor);
  }
}


export function createWorker(
  queueName: string = DEFAULT_QUEUE_NAME,
  config?: WorkerConfig,
): Worker {
  if (workerInstances.has(queueName)) {
    void stopWorker(queueName);
  }

  const workerConfig = config ? { ...jobSystemConfig.workerConfig!, ...config } : jobSystemConfig.workerConfig!;

  const worker = new BullWorker(
    queueName,
    async (job: Job) => {
      const startTime = Date.now();
      const processor = processorRegistry.get(job.name);

      if (!processor) {
        const error = `未找到任务处理器: ${job.name}`;
        logger.error(
          {
            taskName: job.name,
            jobId: job.id,
            availableProcessors: Array.from(processorRegistry.keys()),
          },
          "[Worker]: 处理器未注册",
        );
        throw new Error(error);
      }

      try {
        logger.info(
          {
            taskName: job.name,
            jobId: job.id,
            attemptsMade: job.attemptsMade,
            data: job.data,
          },
          "[Worker]: 开始处理任务",
        );

        const result = await processor(job, job.token);

        return result;
      }
      catch (error) {
        const duration = Date.now() - startTime;
        logger.error(
          {
            taskName: job.name,
            jobId: job.id,
            duration,
            attemptsMade: job.attemptsMade,
            attemptsTotal: job.opts.attempts || 3,
            data: job.data,
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
          },
          "[Worker]: 任务处理失败",
        );
        throw error;
      }
    },
    {
      connection: getBullMQConnection(),
      concurrency: workerConfig.concurrency,
      maxStalledCount: workerConfig.maxStalledCount,
      stalledInterval: workerConfig.stalledInterval,
    },
  );

  attachWorkerListeners(worker, queueName);

  const queueEvents = new BullQueueEvents(queueName, {
    connection: getBullMQConnection(),
  });
  attachQueueEventListeners(queueEvents, queueName);

  workerInstances.set(queueName, worker);
  queueEventsInstances.set(queueName, queueEvents);

  logger.info(
    {
      queueName,
      concurrency: workerConfig.concurrency,
      maxStalledCount: workerConfig.maxStalledCount,
      stalledInterval: workerConfig.stalledInterval,
    },
    "[Worker]: Worker 已创建并启动",
  );

  return worker;
}


function attachWorkerListeners(worker: Worker, queueName: string): void {
  worker.on("completed", (job: Job, result: any) => {
    const duration = job.finishedOn ? job.finishedOn - job.processedOn! : 0;
    logger.info(
      {
        queueName,
        taskName: job.name,
        jobId: job.id,
        duration,
        attemptsMade: job.attemptsMade,
        resultType: typeof result,
      },
      "[Worker]: 任务完成",
    );
  });

  worker.on("failed", (job: Job | undefined, error: Error) => {
    if (job) {
      logger.error(
        {
          queueName,
          taskName: job.name,
          jobId: job.id,
          attemptsMade: job.attemptsMade,
          attemptsTotal: job.opts.attempts || 3,
          data: job.data,
          error: error.message,
          stack: error.stack,
        },
        "[Worker]: 任务彻底失败（重试已用尽）",
      );
    }
    else {
      logger.error(
        {
          queueName,
          error: error.message,
        },
        "[Worker]: 未知任务失败",
      );
    }
  });

  worker.on("stalled", (jobId: string, prev: string) => {
    logger.warn(
      {
        queueName,
        jobId,
        previousState: prev,
      },
      "[Worker]: 任务停滞（可能处理器崩溃）",
    );
  });

  worker.on("error", (err: Error) => {
    logger.error(
      {
        queueName,
        error: err.message,
        stack: err.stack,
      },
      "[Worker]: Worker 内部错误",
    );
  });

  worker.on("active", (job: Job) => {
    logger.debug(
      {
        queueName,
        taskName: job.name,
        jobId: job.id,
      },
      "[Worker]: 任务激活",
    );
  });

  worker.on("progress", (job: Job, progress: JobProgress) => {
    logger.debug(
      {
        queueName,
        taskName: job.name,
        jobId: job.id,
        progress,
      },
      "[Worker]: 任务进度更新",
    );
  });
}

function attachQueueEventListeners(queueEvents: QueueEvents, queueName: string): void {
  queueEvents.on("retries-exhausted", ({ jobId, attemptsMade }) => {
    logger.error(
      {
        queueName,
        jobId,
        attemptsMade,
      },
      "[队列事件]: 任务重试已用尽",
    );
  });
}

export async function stopWorker(queueName: string = DEFAULT_QUEUE_NAME): Promise<void> {
  const worker = workerInstances.get(queueName);
  const queueEvents = queueEventsInstances.get(queueName);

  if (worker) {
    await worker.close();
    workerInstances.delete(queueName);
  }

  if (queueEvents) {
    await queueEvents.close();
    queueEventsInstances.delete(queueName);
  }

  logger.info({ queueName }, "[Worker]: Worker 和 QueueEvents 已停止");
}

export async function pauseWorker(
  queueName: string = DEFAULT_QUEUE_NAME,
  force?: boolean,
): Promise<void> {
  const worker = workerInstances.get(queueName);
  if (worker) {
    await worker.pause(force);
    logger.info({ queueName, force }, "[Worker]: Worker 已暂停");
  }
}


export async function resumeWorker(queueName: string = DEFAULT_QUEUE_NAME): Promise<void> {
  const worker = workerInstances.get(queueName);
  if (worker) {
    await worker.resume();
    logger.info({ queueName }, "[Worker]: Worker 已恢复");
  }
}


export async function shutdownWorkers(): Promise<void> {
  const promises = Array.from(workerInstances.keys()).map(queueName =>
    stopWorker(queueName),
  );
  await Promise.all(promises);

  logger.info("[Worker]: 所有 Worker 已关闭");
}

export function getWorkerStatus(queueName: string = DEFAULT_QUEUE_NAME) {
  const worker = workerInstances.get(queueName);

  if (!worker) {
    return { exists: false };
  }

  return {
    exists: true,
    isPaused: worker.isPaused(),
    isRunning: worker.isRunning(),
    concurrency: worker.concurrency,
  };
}

export function getAllWorkerStatus() {
  const statuses: Record<string, any> = {};

  for (const [queueName, worker] of workerInstances.entries()) {
    statuses[queueName] = {
      isPaused: worker.isPaused(),
      isRunning: worker.isRunning(),
      concurrency: worker.concurrency,
    };
  }

  return statuses;
}
