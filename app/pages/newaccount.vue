<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
	layout: 'bare',
	pageTransition: { name: 'auth', mode: 'out-in' }
})
const { fetch: refreshSession } = useUserSession()

const form = useTemplateRef('form')
const showPassword = ref(false)
const isSigningUp = ref(false)

const state = reactive<Partial<CreateAccountSchema>>({
	name: undefined,
	email: undefined,
	password: undefined
})

async function onSubmit(event: FormSubmitEvent<CreateAccountSchema>) {
	try {
		isSigningUp.value = true
		const result = await $fetch('/api/createAccount', {
			method: 'POST',
			body: event.data
		})

		if (result.type === 'success') {
			await refreshSession()
			await navigateTo('/')
		} else {
			const errors: FormError[] = []

			if (result.reason.nameNotAvailable) {
				errors.push({
					name: 'name',
					message: 'Dieser Nutzername ist nicht mehr verfügbar',
				})
			}

			if (result.reason.emailNotAvailable) {
				errors.push({
					name: 'email',
					message: 'Diese Mail Adresse ist nicht mehr verfügbar',
				})
			}

			form.value?.setErrors(errors)
		}
	} finally {
		isSigningUp.value = false
	}
}

</script>

<template>
	<div class="h-screen w-screen flex flex-col gap-10 items-center justify-center">
		<UCard class="w-120">

			<template #header>
				<div class="flex flex-col items-center space-y-2 m-2">

					<UIcon name="i-lucide-user-round-plus" class="size-8" />

					<h1 class="text-xl font-bold">Account Erstellen</h1>

					<p class="text-center text-sm font-light text-neutral-400">
						Das erste mal hier? Dann erstelle hier deinen Wichtel Account.
					</p>
				</div>
			</template>

			<UForm :disabled="isSigningUp" id="new-account-form" ref="form" :schema="createAccountSchema" :state="state"
				class="space-y-4 p-3" @submit="onSubmit">
				<UFormField required label="Benutzername" name="name">
					<UInput v-model="state.name" class="w-full" placeholder="wichtel082" />
				</UFormField>

				<UFormField required label="Email" name="email">
					<UInput v-model="state.email" placeholder="email@beispiel.net" class="w-full" />
				</UFormField>

				<UFormField required label="Passwort" name="password">
					<UInput v-model="state.password" :type="showPassword ? 'text' : 'password'" class="w-full"
						placeholder="passwort123">
						<template #trailing>
							<UButton color="neutral" variant="link" size="sm"
								:icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
								:aria-label="showPassword ? 'Hide password' : 'Show password'"
								:aria-pressed="showPassword" aria-controls="password"
								@click="showPassword = !showPassword" />
						</template>
					</UInput>
				</UFormField>
			</UForm>

			<template #footer>
				<div class="flex justify-between">
					<NuxtLink to="/login">
						<UButton variant="soft">Ich habe bereits einen Account</UButton>
					</NuxtLink>
					<UButton :loading="isSigningUp" type="submit" form="new-account-form">Erstellen</UButton>
				</div>
			</template>
		</UCard>
	</div>
</template>