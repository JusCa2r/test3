import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL!

// Create the postgres client with explicit configuration
const client = postgres(connectionString, {
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 54322,
  database: 'postgres',
  ssl: false,
})

const db = drizzle(client);

export default db;