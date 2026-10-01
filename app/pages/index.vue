<script setup lang="ts">

const { open } = useCreateEventModal()

const isRefreshing = ref(false)

const events = ref([])

async function refresh() {
	isRefreshing.value = true

	setTimeout(() => isRefreshing.value = false, 2000)
}

async function onNewEvent() {
	const result = await open()

	if (result !== undefined) {
		try {
			await $fetch('/api/event', {
				method: 'POST',
				body: result
			})

		} catch (e) {
			console.debug(e)
		}
	}
}
</script>

<template>
	<UContainer class="p-8">

		<div class="flex justify-between items-center">
			<span class="text-2xl font-bold">Deine Wichtel-Events</span>

			<span class="flex items-center gap-2">
				<UButton :loading="isRefreshing" @click="refresh" variant="ghost" icon="i-lucide-rotate-ccw" />
				<UButton @click="onNewEvent" trailing-icon="i-lucide-plus">Neues Event</UButton>
			</span>
		</div>

		<USeparator class="py-5" />

		<UCard variant="subtle" :ui="{ body: 'flex cursor-pointer' }">
			<div class=" h-full w-1/2 flex flex-col gap-2">
				<div class="flex items-center gap-2">
					<span class="font-bold text-lg">Familien-Wichteln</span>
					<UBadge>2026</UBadge>
				</div>
				<span class="text-sm text-neutral-400">Teilnehmer</span>
			</div>

			<div class="h-full grow flex flex-col gap-2 items-end">
				<span>
					<UBadge variant="subtle" icon="i-lucide-circle">Offen</UBadge>
				</span>
				<span class="text-sm text-neutral-400">4 von 6 Beigetreten</span>
			</div>
		</UCard>
	</UContainer>
</template>
