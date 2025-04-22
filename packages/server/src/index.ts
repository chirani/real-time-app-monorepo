import { Hono } from "hono";
import { invalidateAllSessions } from "./lib/auth";

const app = new Hono();

const authApi = new Hono()
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .post("/signup", (c) => {
    return c.text("Hello Hono!");
  })
  .post("/login", (c) => {
    return c.text("Hello Hono!");
  })
  .post("/logout", (c) => {
    return c.text("Hello Hono!");
  });

app.route("/api/auth", authApi);

export default {
  port: 8110,
  fetch: app.fetch,
};
