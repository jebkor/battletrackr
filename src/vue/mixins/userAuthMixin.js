import Axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

const apiEndpoint = process.env.API_ENDPOINT

const userAuthMixin = {
	computed: {
		...mapGetters(['LOGIN_STATE']),
	},

	methods: {
		...mapActions(['saveLoginState', 'setLoadingState']),
		getUserInfo(id) {
			Axios.get(`${apiEndpoint}/auth/user/${id}`)
		},

		login(user) {
			let _this = this

			return Axios.post(`${apiEndpoint}/auth/login`, user, {
				withCredentials: true,
			}).then((result) => {
				_this.saveLoginState(true) // save the state
				_this.setLoadingState(false)
				return result
			}).catch((error) => {
				_this.setLoadingState(false)
				return error.response
			})
		},

		signup(user) {
			Axios.post(`${apiEndpoint}/auth/signup`, user, {
				withCredentials: true,
			}).then(result => result.data).catch(error => error)
		},

		redirectIfLoggedIn() {
			if (localStorage.user_id) {
				this.saveLoginState(true)
				this.$router.push({ path: `/user/${localStorage.user_id}/encounters`})
			}
		},

		logout() {
			let _this = this

			localStorage.removeItem('user_id')
			return Axios.get(`${apiEndpoint}/auth/logout`, {
				withCredentials: true,
			}).then(() => {
				_this.$router.push({ path: '/' }) // redirect to frontpage
				_this.saveLoginState(false)
			})
		}
	}
}


export default userAuthMixin
