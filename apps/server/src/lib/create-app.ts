import { OpenAPIHono } from "@hono/zod-openapi";
import { pinoLogger } from "hono-pino";
import { bodyLimit } from "hono/body-limit";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { trimTrailingSlash } from "hono/trailing-slash";

import type { AppBindings } from "@/types/lib";

import { createRateLimiter, DEFAULT_RATE_LIMIT } from "@/lib/rate-limit";
import { HttpCodes } from "@/lib/http-status"
import { notFound, onError } from "@/lib/error-handler";
import { defaultHook } from "@/lib/openapi";
import { Resp } from "@/utils";

import logger from "./logger";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();

  /** 1. request id */
  app.use(requestId());

  /** 2. logs */
  app.use(pinoLogger({ pino: logger }));

  /** 3. safe headers */
  app.use(secureHeaders());

  /** 4. timeout */
  app.use(timeout(30000));

  /** 5. request rate */
  app.use(createRateLimiter(DEFAULT_RATE_LIMIT));

  /** 6. basic */
  app.use(trimTrailingSlash());
  app.use(cors());

  /** 7. request body limit */
  app.use(bodyLimit({
    maxSize: 1 * 1024 * 1024,
    onError: (c) => {
      return c.json(Resp.fail("request body too large (max 1MB）"), HttpCodes.REQUEST_TOO_LONG);
    },
  }));

  app.use(compress());
  // app.use(serveEmojiFavicon("📝"));

  /** 9. error handler */
  app.notFound(notFound);
  app.onError(onError);

  return app;
}

export function createTestApp() {
  const app = createRouter();
  app.use(requestId())
    .use(pinoLogger({ pino: logger }));
  app.notFound(notFound);
  app.onError(onError);
  return app;
}
