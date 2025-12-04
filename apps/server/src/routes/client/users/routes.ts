import { createRoute, z } from "@hono/zod-openapi";

import { RefineResultSchema } from "@/lib/refine";
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
