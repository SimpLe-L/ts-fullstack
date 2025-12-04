import { API_ADMIN_PATH, API_BASE_PATH, DOC_ENDPOINT } from "@/configs";

import type { AppConfig } from "./types";

export const APP_CONFIG: AppConfig[] = [
  {
    name: "admin",
    title: "admin apis",
    token: "your-admin-token",
  },
  {
    name: "client",
    title: "app apis",
    token: "your-client-token",
  },
  {
    name: "public",
    title: "public apis",
  },
];

export const OPENAPI_VERSION = "3.1.0";

export const SCALAR_CONFIG = {
  theme: "kepler",
  layout: "modern",
  defaultHttpClient: { targetKey: "js", clientKey: "fetch" },
} as const;

export { API_ADMIN_PATH, API_BASE_PATH, DOC_ENDPOINT };
