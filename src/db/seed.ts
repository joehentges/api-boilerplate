import "dotenv/config"

import { faker } from "@faker-js/faker"

import { database, pg } from "./index"
import { cats } from "./schemas"

async function main() {
  const catsSeed = await database
    .insert(cats)
    .values(
      faker.helpers.multiple(
        () => {
          const time = faker.date.anytime()
          return {
            fullName: faker.person.fullName(),
            color: faker.color.human(),
            createdAt: time,
            updatedAt: time,
          }
        },
        {
          count: 5,
        }
      )
    )
    .onConflictDoNothing()
    .returning()

  await pg.end()
}

main()
