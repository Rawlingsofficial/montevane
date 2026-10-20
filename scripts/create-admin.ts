// Creates (or resets the password of) an admin account:
//   npm run admin:create -- you@example.com "a-long-password"
import { config } from "dotenv";
import pg from "pg";

import { hashPassword } from "../lib/auth/session.ts";

config({ path: ".env.local" });

const [email, password] = process.argv.slice(2);
if (!email?.includes("@") || !password || password.length < 10) {
  console.error('Usage: npm run admin:create -- <email> "<password, 10+ characters>"');
  process.exit(1);
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL });
await client.connect();
try {
  await client.query(
    `insert into admins (email, password_hash) values ($1, $2)
     on conflict (email) do update set password_hash = excluded.password_hash`,
    [email.trim().toLowerCase(), await hashPassword(password)]
  );
  console.log(`Admin ready: ${email}`);
} finally {
  await client.end();
}
