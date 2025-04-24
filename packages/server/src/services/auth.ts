import { z } from "zod";
import { createSession, generateSessionToken } from "../lib/auth";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import db from "../../db";
import { userTable } from "../../db/schema";
import { eq, or } from "drizzle-orm";
import { ProblemJson } from "../types";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const signupSchema = z.object({
  username: z
    .string()
    .min(5, "username is too short")
    .max(25, "username is too long"),
  email: z.string().email("not a valid email"),
  password: z.string().min(8, "Password is too short"),
});

export const authApi = new Hono()
  .post("/signup", zValidator("json", signupSchema), async (c) => {
    const data = c.req.valid("json");

    const usersWithMatchingIdentifiers = await db
      .select()
      .from(userTable)
      .where(
        or(
          eq(userTable.email, data.email),
          eq(userTable.username, data.username)
        )
      )
      .limit(1);

    if (usersWithMatchingIdentifiers.length) {
      return c.json(
        {
          status: 409,
          title: `email or username are already taken`,
        } as ProblemJson,
        409
      );
    }

    // Hashing Password::
    const hashedPassword = await Bun.password.hash(data.password);

    // Creating A New User::
    await db.insert(userTable).values({ ...data, hashedPassword });

    return c.json(
      {
        status: 201,
        title: `user ${data.username} created successfully`,
      },
      201
    );
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

    const generatedToken = generateSessionToken();
    await createSession(generatedToken, userdata[0].id);

    return c.json({
      success: true,
      message: `${data.email} is ${data.password}`,
    });
  })
  .post("/logout", (c) => {
    return c.text("Hello Hono!");
  });
