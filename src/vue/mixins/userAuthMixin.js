import Axios from 'axios'

export const userAuthMixin = {
	methods: {
		getUserInfo(id) {
			Axios.get(`http://localhost:3000/auth/user/${id}`)
		},

		login(user) {
			return Axios.post('http://localhost:3000/auth/login', user, {
				withCredentials: true
			})
		},

		signup(user) {
			Axios.post('http://localhost:3000/auth/signup', user, {
				withCredentials: true
			}).then(result => {
				return result.data
			}).catch(error => {
				return error
			})
		},

		redirectIfLoggedIn() {
			if (localStorage.user_id) {
				this.$router.push({ path: `/user/${localStorage.user_id}`})
			}
		},

		logout() {
			let _this = this

			localStorage.removeItem('user_id')
			return Axios.get('http://localhost:3000/auth/logout', {
				withCredentials: true
			}).then(result => {
				_this.$router.push({ path: '/'}) // redirect to frontpage
			})

		}

	}
}
