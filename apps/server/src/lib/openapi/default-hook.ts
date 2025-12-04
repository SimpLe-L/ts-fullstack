import type { Hook } from "@hono/zod-openapi";

import { HttpCodes } from "../http-status";

export const defaultHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: result.success,
        error: {
          name: result.error.name,
          issues: result.error.issues,
        },
      },
      HttpCodes.UNPROCESSABLE_ENTITY,
    );
  }
};