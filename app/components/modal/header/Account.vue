<script setup lang="ts">

const props = defineProps<{
	username: string
}>()

</script>

<template>
	<div class="px-5 capitalize underline">
		{{ username }}
	</div>
</template>