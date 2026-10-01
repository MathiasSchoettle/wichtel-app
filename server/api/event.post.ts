import { event } from "hub:db:schema";

export default defineEventHandler(async (e) => {

	const { user } = await requireUserSession(e)

	try {
		const body = await readValidatedBody(e, createEventSchema.parse)

		await db.insert(event).values({
			name: body.name,
			dueDate: new Date(Date.parse(body.dueDate)),
			creatorId: user.id,
		})
	} catch (error) {
		console.log(error)
	}
})