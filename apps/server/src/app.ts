import { jwt } from "hono/jwt";

import configureOpenAPI from "@/lib/openapi";
// import * as allAdminExports from "@/routes/admin";
import * as allClientExports from "@/routes/client";
import * as allPublicExports from "@/routes/public";

import env from "./env";
import createApp from "./lib/create-app";
// import { authorize } from "./middlewares/authorize";
import { operationLog } from "./middlewares/operation-log";

const { adminApp, clientApp, publicApp, configureMainDoc } = configureOpenAPI();

const app = createApp();

configureMainDoc?.(app);

const publicRoutes = Object.values(allPublicExports);
publicRoutes.forEach((route) => {
  publicApp.route("/", route);
});

const clientRoutes = Object.values(allClientExports);
clientApp.use("/*", jwt({ secret: env.CLIENT_JWT_SECRET }));
clientRoutes.forEach((route) => {
  clientApp.route("/", route);
});


// 用 trpc 请参考 https://github.com/honojs/hono/issues/2399#issuecomment-2675421823

// const { auth: authModule, ...otherAdminModules } = allAdminExports;
// const otherAdminRoutes = Object.values(otherAdminModules);

// adminApp.route("/", authModule);

adminApp.use("/*", jwt({ secret: env.ADMIN_JWT_SECRET }));
// adminApp.use("/*", authorize());
adminApp.use("/*", operationLog({ moduleName: "后台管理", description: "后台管理操作日志" }));

// otherAdminRoutes.forEach((route) => {
//   adminApp.route("/", route);
// });

app.route("/", publicApp);
app.route("/", clientApp);
// app.route("/", adminApp);


export default app;
