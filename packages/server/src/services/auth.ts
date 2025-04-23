import { z } from "zod";
import { createSession } from "../lib/auth";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import db from "../../db";
import { userTable } from "../../db/schema";
import { eq } from "drizzle-orm";

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const signupSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const authApi = new Hono()
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .post("/signup", zValidator("json", signupSchema), (c) => {
    const data = c.req.valid("json");
    return c.json({
      success: true,
      message: `registering ${data.email} with ${data.email}`,
    });
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const data = c.req.valid("json");

    const userdata = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, data.email))
      .limit(1);

    if (userdata.length === 0) {
      return c.json({
        error: 404,
        message: `There is no user for this email: ${data.email}`,
      });
    }

    await createSession("", userdata[0].id);

    return c.json({
      success: true,
      message: `${data.email} is ${data.password}`,
    });
  })
  .post("/logout", (c) => {
    return c.text("Hello Hono!");
  });
