CREATE TABLE IF NOT EXISTS "cats" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"full_name" text,
	"color" text,
	"bio" text DEFAULT '' NOT NULL
);
