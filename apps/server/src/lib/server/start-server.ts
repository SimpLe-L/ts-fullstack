import type { ServerType } from "@hono/node-server";

import { serve } from "@hono/node-server";
import env from "@/env";

import logger from "@/lib/logger";

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

type FetchApp = {
  fetch: (...args: any[]) => Response | Promise<Response>;
};


export async function startServerWithRetry(app: FetchApp, port: number, maxRetries = 5, retryDelay = 1000): Promise<ServerType> {

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    let serverInstance: ServerType | undefined;

    try {
      const server = await new Promise<ServerType>((resolve, reject) => {
        serverInstance = serve({ fetch: app.fetch, port });

        const errorHandler = (error: Error) => {
          reject(error);
        };

        const listeningHandler = () => {
          serverInstance!.removeListener("error", errorHandler);
          resolve(serverInstance!);
        };

        serverInstance.once("error", errorHandler);
        serverInstance.once("listening", listeningHandler);
      });

      const message = ` 🚀 server start success → (http://localhost:${env.PORT}) `;
      logger.info(message);

      return server;
    }
    catch (error: unknown) {
      const isAddressInUse = error instanceof Error
        && "code" in error
        && error.code === "EADDRINUSE";

      if (isAddressInUse && attempt < maxRetries) {
        logger.warn(
          { attempt, maxRetries, port, retryDelay },
          `[app]: port ${port} was already in use， ${retryDelay}ms start retry（ ${attempt}/${maxRetries} times）`,
        );
        await sleep(retryDelay);
      }
      else {
        throw error;
      }
    }
  }

  throw new Error(`[app]: start server failed after ${maxRetries} times`);
}
