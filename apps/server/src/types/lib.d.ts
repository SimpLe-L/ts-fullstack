import type { RouteConfig as HonoRouteConfig, OpenAPIHono, RouteHandler } from "@hono/zod-openapi";
import type { Schema } from "hono";
import type { PinoLogger } from "hono-pino";
import type { JWTPayload } from "hono/utils/jwt/types";

export type AppBindings = {
  Variables: {
    logger: PinoLogger;
    requestId: string;
    jwtPayload: JWTPayload & {
      roles: string[];
      sub: string;
    };
  };
};

export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

export type AppRouteHandler<R extends HonoRouteConfig> = RouteHandler<R, AppBindings>;
