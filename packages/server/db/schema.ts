import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

import type { InferSelectModel } from "drizzle-orm";

export const userTable = sqliteTable("user", {
  email: text("email").unique().notNull(),
  username: text("username").unique().notNull(),
  id: integer("id").primaryKey(),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at", {
    mode: "timestamp",
  }).notNull(),
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
