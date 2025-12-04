import env from "@/env";
import logger from "@/lib/logger";

export async function logServerStart(): Promise<void> {
  const message = ` 🚀 server start success → (http://localhost:${env.PORT}) `;

  logger.info(message);
}
