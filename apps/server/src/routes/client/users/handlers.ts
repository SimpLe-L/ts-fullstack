import { Resp } from "@/utils";
import type { ClientUsersRouteHandlerType } from ".";
import { HttpCodes } from "@/lib/http-status";

export const getUsers: ClientUsersRouteHandlerType<"getUsers"> = (c) => {
  // Handler logic to get user information
  // This is a placeholder; actual implementation will depend on your application's logic
  return c.json(Resp.ok({ message: "User information retrieved successfully" }), HttpCodes.OK);
};

export const getUserInfo: ClientUsersRouteHandlerType<"getUserInfo"> = (c) => {
  // Handler logic to get user information
  // This is a placeholder; actual implementation will depend on your application's logic
  return c.json(Resp.ok({ message: "getUserInfo" }), HttpCodes.OK);
};

