import { Hono } from "hono";
import { authApi } from "./services/auth";

const app = new Hono();

app.route("/api/auth", authApi);

export default {
  port: 8110,
  fetch: app.fetch,
};
