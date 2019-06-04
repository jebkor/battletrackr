import Axios from 'axios'
const apiEndpoint = process.env.API_ENDPOINT

export const userAuthMixin = {
	methods: {
		getUserInfo(id) {
			Axios.get(`${apiEndpoint}/auth/user/${id}`)
		},

		login(user) {
			return Axios.post(`${apiEndpoint}/auth/login`, user, {
				withCredentials: true
			})
		},

		signup(user) {
			Axios.post(`${apiEndpoint}/auth/signup`, user, {
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
			return Axios.get(`${apiEndpoint}/auth/logout`, {
				withCredentials: true
			}).then(result => {
				_this.$router.push({ path: '/'}) // redirect to frontpage
			})
		}
	}
}
