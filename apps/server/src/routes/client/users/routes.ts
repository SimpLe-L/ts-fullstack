import { createRoute, z } from "@hono/zod-openapi";

import { IdUUIDParamsSchema, RefineResultSchema } from "@/lib/refine";
import { HttpCodes } from "@/lib/http-status";
import { jsonContent } from "@/lib/openapi";

const tags = ["/users"];

export const getUsers = createRoute({
  path: "/users",
  method: "get",
  tags,
  summary: "get user list",
  responses: {
    [HttpCodes.OK]: jsonContent(
      RefineResultSchema(z.object({
        message: z.string().optional(),
      })),
      "user list response success",
    ),
  },
});

export const getUserInfo = createRoute({
  path: "/users/{id}",
  method: "get",
  tags,
  summary: "get user info",
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    [HttpCodes.OK]: jsonContent(
      RefineResultSchema(z.object({
        message: z.string().optional(),
      })),
      "user info response success",
    ),
  },
});
