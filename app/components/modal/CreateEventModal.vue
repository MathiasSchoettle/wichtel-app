<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
import type { FormSubmitEvent } from '@nuxt/ui'

const emit = defineEmits<{
	close: [CreateEventSchema | undefined]
}>()

const state = reactive<Partial<CreateEventSchema>>({})

function onSubmit(event: FormSubmitEvent<CreateEventSchema>) {
	emit('close', event.data)
}

const df = new DateFormatter('de', {
	dateStyle: 'medium'
})

const minDate = today(getLocalTimeZone()).add({ days: 1 })
const modelValue = shallowRef(minDate)

watch(modelValue, value => {
	const year = `${value.year}`
	const month = `${value.month}`.padStart(2, '0')
	const day = `${value.day}`.padStart(2, '0')

	state.dueDate = `${year}-${month}-${day}`
}, { immediate: true })

</script>

<template>
	<UModal :ui="{ footer: 'justify-end' }" title="Neues Event"
		description="Erstelle ein neues Event und lade andere Mitglieder dazu ein.">
		<template #body>
			<UForm id="create-event-form" :schema="createEventSchema" :state="state" @submit="onSubmit"
				class="flex gap-4">
				<UFormField required label="Event Name" class="grow" name="name">
					<UInput v-model="state.name" class="w-full" placeholder="Weihnachten" />
				</UFormField>

				<UPopover>
					<UFormField required label="Enddatum" name="dueDate">
						<UButton class="px-5 w-42" color="neutral" variant="subtle" icon="i-lucide-calendar">
							{{ df.format(modelValue.toDate(getLocalTimeZone())) }}
						</UButton>
					</UFormField>

					<template #content="{ close }">
						<UCalendar @update:model-value="close" :min-value="minDate" v-model="modelValue" class="p-2" />
					</template>
				</UPopover>
			</UForm>
		</template>

		<template #footer>
			<UButton variant="ghost" @click="$emit('close', undefined)">Abbruch</UButton>
			<UButton type="submit" form="create-event-form">Erstellen</UButton>
		</template>
	</UModal>
</template>