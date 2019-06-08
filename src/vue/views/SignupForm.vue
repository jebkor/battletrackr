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
					<h1>Sign up</h1>

					<form @submit.prevent>
						<v-text-field
							id="first_name"
							v-model="firstName"
							name="first_name"
							type="text"
							placeholder="Enter first name (optional)"
							solo
						/>

						<v-text-field
							id="last_name"
							v-model="lastName"
							name="last_name"
							type="text"
							placeholder="Enter last name (optional)"
							solo
						/>

						<v-text-field
							id="email"
							v-model="email"
							v-validate="'required|email'"
							:error-messages="errors.collect('email')"
							name="email"
							type="email"
							placeholder="Enter email"
							data-vv-name="email"
							required
							solo
						/>

						<v-text-field
							id="password"
							ref="password"
							v-model="password"
							v-validate="'required'"
							:error-messages="errors.collect('password')"
							name="password"
							type="password"
							data-vv-name="password"
							placeholder="Enter password"
							required
							solo
						/>

						<v-text-field
							id="verify_password"
							v-model="verifyPassword"
							v-validate="'confirmed:password'"
							:error-messages="errors.collect('verify_password')"
							name="verify_password"
							placeholder="Verify password"
							type="password"
							data-vv-as="password"
							solo
						/>

						<v-btn
							color="primary"
							@click="preSignup"
						>
							Signup
						</v-btn>

						<div class="login__link text-xs-center">
							<p>
								Already have an account?
								<router-link :to="'/login'">
									Login here
								</router-link>
							</p>
						</div>
					</form>
				</v-card-title>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import userAuthMixin from '../mixins/userAuthMixin'

	export default {
		name: 'signup-form',

		mixins: [userAuthMixin],

		data: () => ({
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			verifyPassword: '',
		}),

		methods: {
			preSignup() {
				const user = {
					first_name: this.firstName,
					last_name: this.lastName,
					email: this.email,
					password: this.password,
				}


				this.$validator.validate().then((result) => {
					if (result) {
						// Run the signup function if result is successful
						this.signup(user)
						return
					}
					alert('Correct the errors, please')
				})
			},
		},
	}
</script>


<style lang="scss" scoped>
.login__link {
	margin-top: 60px;
	opacity: 0.6;

	a {
		text-decoration: none;
		color: initial;

		&:hover {
			text-decoration: underline;
		}
	}
}
</style>
