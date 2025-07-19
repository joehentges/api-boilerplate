import "dotenv/config"

import { redis } from "@/client/redis"

import { database, pg } from "./index"
import { catsTable } from "./schemas"

async function main() {
  const catsSeed = await database
    .insert(catsTable)
    .values([
      {
        fullName: "Volco",
        color: "red",
      },
      {
        fullName: "Ghost",
        color: "white",
      },
      {
        fullName: "Kimberly",
        color: "brown",
      },
    ])
    .onConflictDoNothing()
    .returning()

  await pg.end()

  await redis.flushall()

  await redis.disconnect()
}

main()
