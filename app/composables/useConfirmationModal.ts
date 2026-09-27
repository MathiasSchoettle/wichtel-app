import ConfirmationModal from "~/components/modal/ConfirmationModal.vue"

export function useConfirmationModal(title: string, description: string) {
	const overlay = useOverlay()
	const modal = overlay.create(ConfirmationModal)

	async function open(): Promise<boolean> {
		return await modal.open({ title, description })
	}

	return {
		open
	}
}