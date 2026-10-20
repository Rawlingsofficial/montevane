import "server-only";

import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

// node-postgres over Neon's pooled endpoint. On Vercel Fluid compute,
// attachDatabasePool closes idle clients before a function is suspended.
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
attachDatabasePool(pool);

export const db = drizzle({ client: pool, schema });
export { schema };
