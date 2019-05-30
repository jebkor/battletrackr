<template>
	<v-app
		:dark="darkTheme"
		id="inspire"
	>
		<v-toolbar
			color="primary"
			dark
			fixed
			clipped-left
			app
		>
			<v-toolbar-title>Health Tracker</v-toolbar-title>
		</v-toolbar>

		<v-content>
			<v-container
				fluid
				fill-height
				grid-list-lg
			>
				<v-layout
					row
					wrap
				>
					<v-flex xs12>
						<transition>
							<router-view></router-view>
						</transition>
					</v-flex>

					<v-flex xs12>
						<v-btn @click="logout()">Logout</v-btn>
						<v-switch
							:label="'Dark theme'"
							v-model="darkTheme"
							@change="setDarkMode(darkTheme)"
						></v-switch>
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
	import { userAuthMixin } from './mixins/userAuthMixin'

	export default {
		mixins: [userAuthMixin],
		data() {
			return {
				drawer: false,
				drawerMobile: false,
				message: "stuff",
				routes: this.$router.options.routes,
				darkTheme: false
			}
		},

		mounted() {
			// Set the dark theme on mount
			this.darkTheme = this.loadDarkMode()
		},

		methods: {
			// Set the localStorage item
			setDarkMode(input) {
				window.localStorage.setItem('darkTheme', input)
			},

			// Load and return the value of the localStorage item
			loadDarkMode() {
				let darkMode = window.localStorage.getItem('darkTheme')

				// Convert the string value as a bool for use as a prop in the markup
				if (darkMode == "true") return true
				else if (darkMode == "false") return false
			}
		},

		watch: {
			// Watch the prop for changes to apply the correct darkTheme value
			darkTheme() {
				this.darkTheme = this.loadDarkMode()
			}
		}
	}
</script>