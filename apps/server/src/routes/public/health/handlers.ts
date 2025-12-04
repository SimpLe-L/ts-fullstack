import { format } from "date-fns";

import { HttpCodes } from "@/lib/http-status";
import { Resp } from "@/utils";

import type { HealthRouteHandlerType } from ".";

export const get: HealthRouteHandlerType<"get"> = async (c) => {
  return c.json(Resp.ok({
    status: "ok",
    timestamp: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  }), HttpCodes.OK);
};
