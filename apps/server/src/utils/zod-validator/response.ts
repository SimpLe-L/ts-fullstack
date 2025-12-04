import { z, ZodError } from "zod";

export const respErr = z.object({
  message: z.string().optional().describe("error message"),
  stack: z.string().optional().describe("error stack"),
  error: z.object({
    name: z.string().describe("error name"),
    issues: z.array(z.object({
      code: z.string().describe("error code"),
      path: z.array(z.union([z.string(), z.number()])).describe("error path"),
      message: z.string().describe("error message"),
    })).optional().describe("error issues"),
  }).optional().describe("error object"),
}).catchall(z.unknown()).describe("response error");

type RespErr = z.infer<typeof respErr>;

export class Resp {

  static fail(
    input: string | Error | ZodError,
    extra?: Record<string, unknown>,
  ): RespErr {
    let message: string;
    let error: RespErr["error"];

    if (typeof input === "string") {
      message = input;
    }
    else if (input instanceof ZodError) {
      message = z.prettifyError(input);
      error = {
        name: input.name,
        issues: input.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(p => typeof p === "symbol" ? p.toString() : p),
        })),
      };
    }
    else {
      message = input.message || "Unknown error";
    }

    return {
      message,
      ...(extra || {}),
      ...(error ? { error } : {}),
    };
  }

  static ok<T = ParamsType>(data: T): {
    data: T;
  } {
    return {
      data,
    };
  }
}
