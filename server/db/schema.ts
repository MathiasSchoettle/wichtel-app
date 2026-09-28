import { pgTable, text, serial, timestamp, integer, primaryKey, boolean } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: serial().primaryKey(),
	name: text().notNull().unique(),
	email: text().notNull().unique(),
	password: text().notNull(),
	createdAt: timestamp().notNull().defaultNow(),
})

// a wichtel event
export const event = pgTable('event', {
	id: serial().primaryKey(),
	name: text().notNull(),
	dueDate: timestamp().notNull(),
	creatorId: integer().references(() => users.id)
})

// a participant of a wichtel event
export const participant = pgTable('participant', {
	userId: integer().references(() => users.id),
	eventId: integer().references(() => event.id),
	partner: integer().references(() => users.id)
}, (table) => [
	primaryKey({ columns: [table.userId, table.eventId] }),
])

// a potential participant who was invited to a wichtel event
export const invitee = pgTable('invitee', {
	userId: integer().references(() => users.id),
	eventId: integer().references(() => event.id),
}, (table) => [
	primaryKey({ columns: [table.userId, table.eventId] })
])