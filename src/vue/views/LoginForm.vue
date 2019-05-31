<template>
	<div>
		<form @submit.prevent="sendForm">
			<input v-model="email" type="email" required> <br><br>
			<input v-model="password" type="password" required> <br>
			<br>
			<br>
			<br>

			<button>Login</button>
		</form>
	</div>
</template>

<script>
	import Axios from 'axios'
	import { userAuthMixin } from '../mixins/userAuthMixin'

	export default {
		name: 'login-form',
		mixins: [userAuthMixin],
		data: () => ({
			email: null,
			password: null
		}),
		created() {
			this.redirectIfLoggedIn()
		},
		methods: {
			sendForm() {
				let _this = this

				const userInfo = {
					email: this.email,
					password: this.password
				}

				

				this.login(userInfo).then(result => {
					localStorage.user_id = result.data.id
					_this.$router.push({path: `/user/${result.data.id}`})
				})
			}
		}
	}
</script>