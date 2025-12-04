import * as _tanstack_react_query0 from "@tanstack/react-query";
import { AxiosError } from "axios";

//#region src/user.d.ts
declare const useGetUserQuery: () => _tanstack_react_query0.UseQueryResult<{
  createAt: Date;
  updateAt: Date;
  id: Buffer;
  name: Buffer;
  email: Buffer;
  password: Buffer;
}[], AxiosError<unknown, any>>;
declare const useGetUserInfoQuery: (id: number) => _tanstack_react_query0.UseQueryResult<{
  createAt: Date;
  updateAt: Date;
  id: Buffer;
  name: Buffer;
  email: Buffer;
  password: Buffer;
}[], AxiosError<unknown, any>>;
declare const useCreateUserMutation: () => _tanstack_react_query0.UseMutationResult<{
  name: Buffer;
  email: Buffer;
  password: Buffer;
  createAt?: Date | undefined;
  updateAt?: Date | undefined;
  id?: any;
}, boolean, AxiosError<unknown, any>, unknown>;
//#endregion
export { useCreateUserMutation, useGetUserInfoQuery, useGetUserQuery };