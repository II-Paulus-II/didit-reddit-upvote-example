import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const orm = drizzle(db);
