<template>
	<v-app
		:dark="darkTheme"
		id="inspire"
	>
		<v-navigation-drawer
			:value="drawerState"
			fixed
			app
			clipped
		>
			<v-list dense>
				<v-list-tile @click>
					<v-list-tile-action>
						<v-icon>home</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Home</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click>
					<v-list-tile-action>
						<v-icon>contact_mail</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Contact</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>

		<v-toolbar
			color="red"
			dense
			fixed
			clipped-left
			app
		>
			<v-toolbar-side-icon @click.stop="handleDrawer()"></v-toolbar-side-icon>
			<v-toolbar-title>BattleTrackr.io</v-toolbar-title>
		</v-toolbar>

		<v-content v-cloak>
			<v-container
				fluid
				fill-height
				grid-list-lg
			>
				<transition
					name="fade-in-right"
					mode="out-in"
				>
					<router-view></router-view>
				</transition>

				<!-- <v-btn @click="logout()">Logout</v-btn>
				<v-switch
					:label="'Dark theme'"
					v-model="darkTheme"
					@change="setDarkMode(darkTheme)"
				></v-switch>-->
			</v-container>
		</v-content>

		<div
			v-if="LOADING"
			class="loader"
		>
			<font-awesome-icon
				:icon="['fal', 'dice-d20']"
				class="fa-icon rotating"
			/>
		</div>
	</v-app>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
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

		computed: {
			...mapGetters(['LOADING', 'DRAWER_STATE']),
			drawerState() {
				return this.DRAWER_STATE
			}
		},

		methods: {
			...mapActions(['saveDrawerState']),
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
			},

			handleDrawer() {
				let input = !this.drawerState
				this.saveDrawerState(input)
			}
		},

		watch: {
			// Watch the prop for changes to apply the correct darkTheme value
			darkTheme() {
				this.darkTheme = this.loadDarkMode()
			},
		}
	}
</script>