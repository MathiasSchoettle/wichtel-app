<script setup lang="ts">
import Account from '~/components/modal/header/Account.vue'

const { user, clear: clearSession, ready, loggedIn } = useUserSession()

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

const { open } = useConfirmationModal('Abmelden', 'Bist du dir sicher dass du dich abmelden möchtest?')

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
				<span class="text-2xl">
					🎁
				</span>
			</template>

			<template #right>
				<Account :username="username" />
				<UButton variant="ghost" icon="i-lucide-log-out" @click="handleLogout" />
				<UColorModeButton />
			</template>
		</UHeader>

		<UMain>
			<NuxtPage />
		</UMain>
	</UPage>
</template>