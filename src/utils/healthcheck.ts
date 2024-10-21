import { ServerRoute } from "@hapi/hapi";

const healthCheckRoute: ServerRoute = {
  method: "GET",
  path: "/health",
  handler: (request, h) => {
    return h.response({ status: "ok" }).code(200);
  },
};

export default healthCheckRoute;
