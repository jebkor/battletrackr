<template>
	<v-layout
		row
		wrap
		align-center
		justify-center
	>
		<v-flex
			xs12
			lg4
		>
			<v-card>
				<v-card-title>
					<form @submit.prevent>
						<v-text-field
							v-model="email"
							v-validate="'required|email'"
							:error-messages="errors.collect('email')"
							name="email"
							type="email"
							label="E-mail"
							id="email"
							data-vv-name="email"
							required
							solo
						></v-text-field>

						<v-text-field
							v-model="password"
							v-validate="'required'"
							:error-messages="errors.collect('password')"
							name="password"
							label="Password"
							id="password"
							type="password"
							data-vv-name="password"
							required
							solo
						></v-text-field>

						<v-btn
							color="primary"
							@click="sendForm"
						>Login</v-btn>
					</form>
				</v-card-title>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import Axios from 'axios'
	import { mapGetters, mapActions } from 'vuex'
	import { userAuthMixin } from '../mixins/userAuthMixin'
	import { setTimeout } from 'timers';

	export default {
		name: 'login-form',
		mixins: [userAuthMixin],
		data: () => ({
			email: null,
			password: null
		}),
		created() {
			// this.redirectIfLoggedIn()
		},
		methods: {
			...mapActions(['setLoadingState']),
			sendForm() {
				let _this = this

				const userInfo = {
					email: this.email,
					password: this.password
				}

				this.setLoadingState(true)

				setTimeout(() => {
					_this.login(userInfo).then(result => {
						localStorage.user_id = result.data.id

						_this.$router.push({ path: `/user/${result.data.id}/encounters` })
					})
				}, 2000) // simulate waiting for request
			}
		}
	}
</script>

<style lang="scss">
form {
	width: 100%;
}

.login__form .v-text-field--solo > .v-input__control > .v-input__slot {
	background-color: hsl(0, 0%, 94%) !important;
}
</style>
