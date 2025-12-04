import { Resp } from "@/utils";
import type { ClientUsersRouteHandlerType } from ".";
import { HttpCodes } from "@/lib/http-status";

export const getUsers: ClientUsersRouteHandlerType<"getUsers"> = (c) => {
  return c.json(Resp.ok({ message: "User information retrieved successfully" }), HttpCodes.OK);
};
