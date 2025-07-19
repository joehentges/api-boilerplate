import { createId } from "@paralleldrive/cuid2"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const catsTable = pgTable("cats", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  dateCreated: timestamp("date_created", { mode: "date" }).notNull().defaultNow(),
  dateUpdated: timestamp("date_updated", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  fullName: text("full_name"),
  color: text("color"),
  bio: text("bio").notNull().default(""),
})

export type Cat = typeof catsTable.$inferSelect
