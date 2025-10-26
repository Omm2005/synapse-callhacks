CREATE TABLE "canvas" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text DEFAULT 'Untitled Canvas' NOT NULL,
	"userId" text NOT NULL,
	"roomId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "canvas_roomId_unique" UNIQUE("roomId")
);
--> statement-breakpoint
ALTER TABLE "canvas" ADD CONSTRAINT "canvas_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;