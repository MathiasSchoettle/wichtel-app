<script setup>
useHead({
	meta: [
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
	],
	link: [
		{ rel: 'icon', href: '/favicon.ico' }
	],
	htmlAttrs: {
		lang: 'en'
	},
	title: 'Wichtel App'
})
const toaster = { position: 'top-center' }
</script>

<template>
	<UApp :toaster="toaster">
		<NuxtLayout />
	</UApp>
</template>

<style>
.auth-enter-active,
.auth-leave-active {
	transition: all 0.3s;
}

.auth-enter-from,
.auth-leave-to {
	opacity: 0;
	transform: translate(0, -2em);
	scale: 0.85;
}

.layout-enter-active,
.layout-leave-active {
	transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
	filter: opacity(0);
}
</style>
