import app from "./app";
import env from "./env";
import { logServerStart, setupGracefulShutdown, setupJobSystem, startServerWithRetry } from "./lib/server";


// await setupJobSystem();

const server = await startServerWithRetry(app, env.PORT);

await logServerStart();

setupGracefulShutdown(server);
