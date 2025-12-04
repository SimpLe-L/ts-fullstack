import { allScheduledTasks, gracefulShutdownJobSystem, startJobSystem, taskProcessors } from "@/jobs";
import logger from "@/lib/logger";


export async function setupJobSystem(onStartup?: () => Promise<void>): Promise<void> {

  await startJobSystem(taskProcessors, allScheduledTasks);

  if (onStartup) {
    try {
      await onStartup();
    }
    catch (error) {
      logger.warn({ error }, "[task system]: Startup callback error");
    }
  }
}

export async function shutdownJobSystem(): Promise<void> {
  await gracefulShutdownJobSystem();
  logger.info("[task system]: already shutdown");
}
