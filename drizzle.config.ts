import { defineConfig } from "drizzle-kit";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  out: "./lib/db/migrations",
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",

  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },

  extensionsFilters: ["postgis"],
  schemaFilter: "public",
  tablesFilter: "*",

  introspect: {
    casing: "camel",
  },

  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },

  breakpoints: true,
  strict: true,
  verbose: true,
});