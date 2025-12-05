import app from "./app";
import env from "./env";
import { setupGracefulShutdown, startServerWithRetry } from "./lib/server";


const server = await startServerWithRetry(app, env.PORT);

setupGracefulShutdown(server);
