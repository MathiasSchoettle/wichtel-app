import { eq, or } from "drizzle-orm";
import { users } from "hub:db:schema";

export default defineEventHandler(async (event): Promise<CreateAccountResult> => {
	const { name, email, password } = await readValidatedBody(event, createAccountSchema.parse)

	const user = await db.select().from(users).where(or(
		eq(users.name, name),
		eq(users.email, email)
	)
	).then(result => result.at(0))

	if (user !== undefined) {
		return {
			type: 'error',
			reason: {
				nameNotAvailable: user.name === name,
				emailNotAvailable: user.email === email
			}
		}
	}

	const hashedPassword = await hashPassword(password)

	const newUser = await db.insert(users).values({
		name: name,
		email: email,
		password: hashedPassword
	}).returning().then(result => result.at(0)!)

	await setUserSession(event, {
		user: {
			id: newUser.id,
			name: newUser.name
		}
	})

	return { type: 'success' }
})