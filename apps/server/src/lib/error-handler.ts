import type { NotFoundHandler, ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { HttpCodes, RespStatus } from "./http-status";

import ProcessEnv from "@/env";
import { Resp } from "@/utils";

export const notFound: NotFoundHandler = (c) => {
  return c.json(Resp.fail(`${RespStatus.NOT_FOUND} - ${c.req.path}`), HttpCodes.NOT_FOUND);
};

export const onError: ErrorHandler = (err, c) => {
  const currentStatus = "status" in err
    ? err.status
    : c.newResponse(null).status;
  const statusCode = currentStatus !== HttpCodes.OK
    ? (currentStatus as ContentfulStatusCode)
    : HttpCodes.INTERNAL_SERVER_ERROR;

  const env = c.env?.NODE_ENV || ProcessEnv?.NODE_ENV;
  return c.json(Resp.fail(err.message, {
    stack: env === "production"
      ? undefined
      : err.stack,
  }), statusCode);
};


