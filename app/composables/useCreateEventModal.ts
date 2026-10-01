import CreateEventModal from "~/components/modal/CreateEventModal.vue"

export function useCreateEventModal() {
	const overlay = useOverlay()
	const modal = overlay.create(CreateEventModal)

	async function open(): Promise<CreateEventSchema | undefined> {
		return await modal.open()
	}

	return {
		open
	}
}