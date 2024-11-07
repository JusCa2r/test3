import { defineConfig } from "drizzle-kit";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./libdb/schema.ts",

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

  entities: {
    roles: {
      provider: '',
      exclude: [],
      include: []
    }
  },

  breakpoints: true,
  strict: true,
  verbose: true,
});