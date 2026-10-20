import "server-only";

import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

// node-postgres over Neon's pooled endpoint. On Vercel Fluid compute,
// attachDatabasePool closes idle clients before a function is suspended.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  // Neon drops idle connections (and scales to zero); release ours first so
  // a query never lands on a socket the server already closed (ECONNRESET).
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 10_000,
  keepAlive: true,
});

// An idle client erroring (e.g. Neon restarting) must not crash the process;
// the pool discards that client and opens a fresh one on the next query.
pool.on("error", (error) => console.error("Postgres pool error", error.message));

attachDatabasePool(pool);

export const db = drizzle({ client: pool, schema });
export { schema };
