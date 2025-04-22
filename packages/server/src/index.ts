import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/signup", (c) => {
  return c.text("Hello Hono!");
});

app.get("/login", (c) => {
  return c.text("Hello Hono!");
});

app.get("/logout", (c) => {
  return c.text("Hello Hono!");
});

export default {
  port: 8110,
  fetch: app.fetch,
};
