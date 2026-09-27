export default defineNuxtRouteMiddleware((to) => {
	const { loggedIn } = useUserSession()

	if (!loggedIn.value) {
		const isAuthRoute = to.path === '/login' || to.path === '/newaccount'

		if (!isAuthRoute) {
			return navigateTo('/login')
		}
	}
})