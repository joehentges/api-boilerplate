import { eq } from "drizzle-orm"

import { PrimaryKey } from "@/types"
import { database } from "@/db"
import { Cat, cats } from "@/db/schemas"

export async function getCat(catId: PrimaryKey) {
  const cat = await database.query.cats.findFirst({
    where: eq(cats.id, catId),
  })

  return cat
}

export async function getCatsByFullName(fullName: string, limit: number = 10) {
  const catsList = await database.query.cats.findMany({
    where: eq(cats.fullName, fullName),
    limit,
  })

  return catsList
}

export async function getCatsByColor(color: string, limit: number = 10) {
  const catsList = await database.query.cats.findMany({
    where: eq(cats.color, color),
    limit,
  })

  return catsList
}

export async function createCat(catParams: Pick<Cat, "fullName" | "color" | "bio">) {
  const cat = await database
    .insert(cats)
    .values({
      createdAt: new Date(),
      updatedAt: new Date(),
      ...catParams,
    })
    .returning()

  return cat
}
