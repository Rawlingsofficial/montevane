// Loads drizzle/seed.sql into the database. Run after `npm run db:migrate`:
//   npm run db:seed
import { readFileSync } from "node:fs";

import { config } from "dotenv";
import pg from "pg";

config({ path: ".env.local" });

const client = new pg.Client({ connectionString: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL });
await client.connect();
try {
  await client.query(readFileSync(new URL("../drizzle/seed.sql", import.meta.url), "utf8"));
  console.log("Seed data loaded.");
} finally {
  await client.end();
}
