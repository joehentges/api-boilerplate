CREATE TABLE IF NOT EXISTS "cats" (
	"id" text PRIMARY KEY NOT NULL,
	"date_created" timestamp DEFAULT now() NOT NULL,
	"date_updated" timestamp DEFAULT now() NOT NULL,
	"full_name" text,
	"color" text,
	"bio" text DEFAULT '' NOT NULL
);
