import { eq } from "drizzle-orm";
import { event } from "hub:db:schema";

export default defineEventHandler(async e => {
	const { user } = await requireUserSession(e)

	return await db.select().from(event).where(eq(event.creatorId, user.id))
})