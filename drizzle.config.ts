import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "mysql://user:password@localhost:3306/db",
  },
  migrations: {
    migrationsFolder: "./drizzle/migrations",
  },
});
