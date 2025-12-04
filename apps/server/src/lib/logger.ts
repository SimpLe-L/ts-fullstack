import type { DestinationStream } from "pino";

import pino from "pino";

import env from "@/env";

let options: DestinationStream | undefined;

if (env.NODE_ENV === "development") {
  try {
    const pretty = await import("pino-pretty");
    options = pretty.default({
      colorize: true,
    });
  }
  catch {
    // todo pino-pretty uninstall
  }
}

const logger = pino({ level: env.LOG_LEVEL || "info" }, options);

export default logger;
