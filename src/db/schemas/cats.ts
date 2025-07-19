import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const catsTable = pgTable("cats", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  fullName: text("full_name"),
  color: text("color"),
  bio: text("bio").notNull().default(""),
})

export type Cat = typeof catsTable.$inferSelect
