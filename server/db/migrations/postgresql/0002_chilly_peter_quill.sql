CREATE TABLE "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"dueDate" timestamp NOT NULL,
	"creatorId" integer
);
--> statement-breakpoint
CREATE TABLE "invitee" (
	"userId" integer,
	"eventId" integer,
	CONSTRAINT "invitee_userId_eventId_pk" PRIMARY KEY("userId","eventId")
);
--> statement-breakpoint
CREATE TABLE "participant" (
	"userId" integer,
	"eventId" integer,
	"partner" integer,
	CONSTRAINT "participant_userId_eventId_pk" PRIMARY KEY("userId","eventId")
);
--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_creatorId_users_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitee" ADD CONSTRAINT "invitee_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitee" ADD CONSTRAINT "invitee_eventId_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participant" ADD CONSTRAINT "participant_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participant" ADD CONSTRAINT "participant_eventId_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participant" ADD CONSTRAINT "participant_partner_users_id_fk" FOREIGN KEY ("partner") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;