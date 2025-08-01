import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import { env } from "@/env"

import * as schema from "./schemas"

let database: PostgresJsDatabase<typeof schema>
let pg: ReturnType<typeof postgres>

if (env.NODE_ENV === "production") {
  pg = postgres(env.DATABASE_URL)
  database = drizzle(pg, { schema })
} else {
  if (!(global as any).database!) {
    pg = postgres(env.DATABASE_URL)
    ;(global as any).database = drizzle(pg, { schema })
  }
  database = (global as any).database
}

export { database, pg }
