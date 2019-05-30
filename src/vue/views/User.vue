<template>
	<div>
		<h1>User page</h1>
		<h2>Email: {{ email }}</h2>
	</div>
</template>

<script>
	import Axios from 'axios'

	export default {
		name: 'user',
		data: () => ({
			email: null
		}),
		created() {
			this.doStuff()
		},
		methods: {
			doStuff() {
				let _this = this

				Axios.get(`http://localhost:3000/user/${_this.$route.params.id}`, {
					withCredentials: true
				}).then(user => {
					_this.email = user.data.email
				}).catch(error => {
					_this.$router.push({ path: '/login' })
				})
			}
		},
		watch: {
			'$route.params.id': function () {
				this.doStuff()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>