import { eq } from "drizzle-orm";
import { users } from "hub:db:schema";
import { loginAccountSchema } from "~~/shared/utils/auth";

export default defineEventHandler(async (event) => {
	const { name, password } = await readValidatedBody(event, loginAccountSchema.parse)

	const user = await db.select().from(users).where(eq(users.name, name)).then(result => result.at(0))

	if (user === undefined) {
		throw createError({
			status: 401,
			message: 'Bad credentials',
		})
	}

	const passwordMatches = await verifyPassword(user?.password, password)

	if (!passwordMatches) {
		throw createError({
			status: 401,
			message: 'Bad credentials',
		})
	}

	await setUserSession(event, {
		user: {
			id: user.id,
			name: user.name
		}
	})
})