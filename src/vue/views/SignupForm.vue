<template>
	<div>
		<form @submit.prevent="preSignup">
			<input
				v-model="firstName"
				name="first_name"
				type="text"
				placeholder="Enter first name (optional)"
			>
			<br>

			<input
				v-model="lastName"
				name="last_name"
				type="text"
				placeholder="Enter last name (optional)"
			>
			<br>

			<input
				v-model="email"
				v-validate="'required|email'"
				name="email"
				type="email"
				placeholder="Enter email"
			>
			<span>{{ errors.first('email') }}</span>
			<br>
			
			
			<input
				v-model="password"
				v-validate="'required'"
				name="password"
				type="text"
				placeholder="Enter password"
				ref="password"
			>
			<span>{{ errors.first('password') }}</span>
			<br>



			<input
				v-model="verifyPassword"
				v-validate="'confirmed:password'"
				name="verify_password"
				placeholder="Verify password"
				type="text"
				data-vv-as="password"
			>
			<span>{{ errors.first('verify_password') }}</span>

			<br>
			<br>
			<br>

			<button>Signup</button>
		</form>
	</div>
</template>

<script>
	import Axios from 'axios'
	import { userAuthMixin } from '../mixins/userAuthMixin'

	export default {
		name: 'signup-form',
		mixins: [userAuthMixin],
		data: () => ({
			firstName: null,
			lastName: null,
			email: null,
			password: null,
			verifyPassword: null
		}),
		methods: {
			preSignup() {
				const user = {
					first_name: this.firstName,
					last_name: this.lastName,
					email: this.email,
					password: this.password
				}


				this.$validator.validate().then(result => {
					if (result) {
						// Run the signup function if result is successful
						this.signup(user)
						// console.log('User: ', user)
						return
					}

					alert('Correct the errors, bitch')
				})



				// Run real signp function
				// this.signup(user)
			}
		}
	}
</script>