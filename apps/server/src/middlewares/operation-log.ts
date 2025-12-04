import type { Context, MiddlewareHandler } from "hono";
import type { JWTPayload } from "hono/utils/jwt/types";

import { differenceInMilliseconds, format } from "date-fns";

import env from "@/env";
import logger from "@/lib/logger";

const LogType = {
  OPERATION: "OPERATION",

  LOGIN: "LOGIN",
} as const;

export type LogTypeType = (typeof LogType)[keyof typeof LogType];


export function operationLog(options: { moduleName: string; description: string }): MiddlewareHandler {
  return async (c: Context, next) => {
    const startTime = new Date();
    const method = c.req.method;
    const urlPath = new URL(c.req.url).pathname;
    const ip = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "unknown";
    const userAgent = c.req.header("user-agent") || "";

    let [body, params]: [unknown | null, ParamsType | null] = [null, null];

    try {
      if (method !== "GET" && method !== "DELETE") {
        body = await c.req.json<unknown>().catch(() => null);
      }
      params = c.req.query();
    }
    catch (error) {
      logger.warn({ error }, "request body parse error");
    }

    await next();

    const requestId = c.get("requestId");
    const endTime = new Date();
    const durationMs = differenceInMilliseconds(endTime, startTime);

    const payload: JWTPayload | undefined = c.get("jwtPayload");
    if (!payload) {
      return;
    }

    const { sub: userId, username } = payload;

    let response: unknown = null;
    try {
      const resClone = c.res.clone();
      response = await resClone.json().catch(() => null);
    }
    catch (error) {
      logger.warn({ error }, "响应体解析失败");
    }

    const logEntry = {
      type: LogType.OPERATION,
      requestId,
      moduleName: options.moduleName,
      description: options.description,
      method,
      urlPath,
      ip,
      userAgent,
      userId,
      username,
      body,
      params,
      response,
      startTime: format(startTime, "yyyy-MM-dd HH:mm:ss"),
      endTime: format(endTime, "yyyy-MM-dd HH:mm:ss"),
      durationMs,
    };

    // 你可以选择你自己的日志写入方式 比如 阿里云 sls，并移除这个控制台输出日志
    if (env.NODE_ENV === "production") {
      logger.info(logEntry, "操作日志");
    }
  };
}
