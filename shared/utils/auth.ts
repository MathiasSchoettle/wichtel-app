import { z } from 'zod'

export const createAccountSchema = z.object({
	name: z.string('Benutzername darf nicht leer sein').min(3, 'Name muss mindestens 3 Zeichen lang sein'),
	email: z.email('Ungültige Email'),
	password: z.string('Passwort darf nicht leer sein').min(8, 'Mindestens 8 Zeichen')
})

export const loginAccountSchema = z.object({
	name: z.string('Benutzername darf nicht leer sein').min(3, 'Name muss mindestens 3 Zeichen lang sein'),
	password: z.string('Passwort darf nicht leer sein').min(8, 'Mindestens 8 Zeichen')
})