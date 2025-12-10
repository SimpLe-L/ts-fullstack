import { createTanstackQueryAPIClient } from '@repo/api/client';

export const apiClient = createTanstackQueryAPIClient({
  serverUrl: process.env.PUBLIC_SERVER_URLz!,
  apiPath: `/${process.env.PUBLIC_SERVER_API_PATH!}`,
});
