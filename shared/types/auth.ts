export type CreateAccountSchema = {
	name: string
	email: string
	password: string
}

export type CreateAccountResult =
	| { type: 'success' }
	| { type: 'error', reason: { nameNotAvailable: boolean, emailNotAvailable: boolean } }

export type LoginAccountSchema = {
	name: string
	password: string
}