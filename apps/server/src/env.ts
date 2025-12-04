/* eslint-disable node/no-process-env */
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { z } from "zod";

import { parseEnvOrExit } from "@/utils/zod-validator";

expand(config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === "test" ? ".env.test" : ".env",
  ),
}));

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  DATABASE_URL: z.string().refine(
    val => process.env.NODE_ENV !== "production" || val !== "",
    { message: "database url required" },
  ),
  REDIS_URL: z.string().refine(
    val => process.env.NODE_ENV !== "production" || val !== "",
    { message: "redis url required" },
  ),
  CLIENT_JWT_SECRET: z.string().min(32, "JWT密钥长度至少32字符,建议使用强随机字符串"),
  ADMIN_JWT_SECRET: z.string().min(32, "JWT密钥长度至少32字符,建议使用强随机字符串"),

  /** 云服务商R2访问密钥ID */
  ACCESS_KEY_ID: z.string(),
  /** 云服务商R2访问密钥 */
  SECRET_ACCESS_KEY: z.string(),
  /** 云服务商R2终端节点 */
  ENDPOINT: z.url(),
  /** 云服务商R2存储桶名称 */
  BUCKET_NAME: z.string().default("default-bucket"),

});

export type Env = z.infer<typeof EnvSchema>;

export default parseEnvOrExit(EnvSchema);
