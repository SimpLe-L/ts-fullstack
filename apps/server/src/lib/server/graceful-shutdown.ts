import type { ServerType } from "@hono/node-server";

import logger from "@/lib/logger";

// import { shutdownJobSystem } from "./job-system";

export async function setupGracefulShutdown(server: ServerType): Promise<void> {
  const gracefulShutdown = async (signal: string) => {
    logger.info({ signal }, "[app]: shutting down");

    await new Promise<void>((resolve) => {
      server.close(() => {
        logger.info("[app]: HTTP server closed");
        resolve();
      });
    });

    // await shutdownJobSystem();

    logger.info("[app]: shutdown complete, exiting");
    process.exit(0);
  };

  process.on("SIGTERM", () => void gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => void gracefulShutdown("SIGINT"));
}
