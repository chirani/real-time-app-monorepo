import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database("database.db");
const db = drizzle({ client: sqlite });

export default db;
