<script setup lang="ts">
const { user, clear: clearSession } = useUserSession()

const username = computed<string>((previous) => {
	if (user.value?.name !== undefined) {
		return user.value.name
	}

	return previous ?? 'Unbekannt'
})

async function logout() {
	await clearSession()
	await navigateTo('login')
}

const { open } = useConfirmationModal('Abmelden', 'Bist du dir sicher dasss du dich abmelden möchtest?')

function handleLogout() {
	open().then(doLogout => {
		if (doLogout) {
			logout()
		}
	})
}

</script>

<template>
	<UPage>
		<UHeader>
			<template #title>
				<h1>Wichtel App</h1>
			</template>


			<template #right>
				<p>Hallo {{ username }}</p>
				<UButton variant="ghost" icon="i-lucide-log-out" @click="handleLogout" />
				<UColorModeButton />
			</template>
		</UHeader>

		<UMain>
			<NuxtPage />
		</UMain>
	</UPage>
</template>