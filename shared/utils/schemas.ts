import z from "zod"

function today() {
	return new Date().toDateString()
}

export const createEventSchema = z.object({
	name: z.string('Name darf nicht leer sein').min(3, 'Name muss mindestens 3 Zeichen lang sein'),
	dueDate: z.iso.date().refine(date => date < today(), { message: 'Datum darf nicht in der Vergangeheit sein' })
})

