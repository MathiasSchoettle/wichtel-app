<script setup lang="ts">

const props = defineProps<{
	title: string
	description: string
}>()

const emit = defineEmits<{
	close: [boolean]
}>()

</script>

<template>
	<UModal :ui="{ content: 'p-5' }">
		<slot />

		<template #content>
			<div class="flex flex-col items-center">
				<h1 class="font-bold text-2xl">{{ title }}</h1>
				<p class="text-neutral-500">{{ description }}</p>

				<div class="pt-5 flex gap-5">
					<UButton label="Abbruch" variant="outline" @click="emit('close', false)" />
					<UButton label="Bestätigen" @click="emit('close', true)" />
				</div>
			</div>
		</template>
	</UModal>
</template>