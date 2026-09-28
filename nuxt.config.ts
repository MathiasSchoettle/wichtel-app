// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
				modules: [
				 '@nuxt/eslint',
				 '@nuxt/ui',
				 '@nuxthub/core',
				 'nuxt-auth-utils',
				 '@vueuse/nuxt'
				],

				devtools: {
								enabled: true
				},

				runtimeConfig: {
								session: {
												password: 'TODO REAL PASSWORD',
												maxAge: 60 * 60 * 24 * 30 * 6,
								}
				},

				app: {
								layoutTransition: { name: 'layout', mode: 'out-in' },
				},

				css: ['~/assets/css/main.css'],

				routeRules: {
								'/': { prerender: true }
				},

				hub: {
								db: 'postgresql'
				},

				compatibilityDate: '2026-06-30',

				eslint: {
								config: {
												stylistic: {
																commaDangle: 'never',
																braceStyle: '1tbs',
																indent: 'tab'
												}
								}
				}
})