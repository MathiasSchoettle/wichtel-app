<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
	layout: 'bare',
	pageTransition: { name: 'auth', mode: 'out-in' }
})

const { fetch: refreshSession } = useUserSession()
const toast = useToast()

const form = useTemplateRef('form')
const showPassword = ref(false)
const isLogginIn = ref(false)

const state = reactive<Partial<LoginAccountSchema>>({
	name: undefined,
	password: undefined
})

async function onSubmit(event: FormSubmitEvent<LoginAccountSchema>) {
	try {
		isLogginIn.value = true
		await $fetch('/api/login', {
			method: 'POST',
			body: event.data
		})
		await refreshSession()
		await navigateTo('/')
	} catch (error) {
		toast.add({
			title: 'Fehler',
			description: 'Deine Login-Daten sind fehlerhaft',
			icon: 'i-lucide-triangle-alert',
			color: 'error',
			progress: false,
			duration: 2000,
		})
	} finally {
		isLogginIn.value = false
	}
}

</script>

<template>
	<div class="h-screen w-screen flex flex-col gap-10 items-center justify-center">
		<UCard class="w-120">

			<template #header>
				<div class="flex flex-col items-center space-y-2 m-2">

					<UIcon name="i-lucide-log-in" class="size-8" />

					<h1 class="text-xl font-bold">Anmelden</h1>

					<p class="text-center text-sm font-light text-neutral-400">
						Du hast schon einen Account? Dann melde dich hier mit deinem Nutzername und Passwort an.
					</p>
				</div>
			</template>

			<UForm :disabled="isLogginIn" id="login-form" ref="form" :state="state" class="space-y-4 p-3"
				@submit="onSubmit">
				<UFormField required label="Benutzername" name="name">
					<UInput v-model="state.name" class="w-full" placeholder="wichtel082" />
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
					<NuxtLink to="/newaccount">
						<UButton variant="soft">Ich habe noch keinen Account</UButton>
					</NuxtLink>
					<UButton :loading="isLogginIn" type="submit" form="login-form" @click="form?.submit()">
						Einloggen
					</UButton>
				</div>
			</template>
		</UCard>
	</div>
</template>