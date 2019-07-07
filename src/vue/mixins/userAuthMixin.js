import Axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

const apiEndpoint = process.env.API_ENDPOINT

const userAuthMixin = {
  computed: {
    ...mapGetters(['LOGIN_STATE']),
  },

  methods: {
    ...mapActions(['saveLoginState', 'saveLoginState', 'setLoadingState']),

    // Handle the login request, and set their login status. 
    // Mainly used for menu items and display of the logout button
    login (user) {
      const that = this

      return Axios.post(`${apiEndpoint}/auth/login`, user, {
        withCredentials: true,
      }).then((result) => {
        that.saveLoginState(true) // save the state
        localStorage.setItem('loggedIn', 1)
        return result
      }).catch((error) => {
        localStorage.removeItem('loggedIn')
        that.saveLoginState(false)
        return error.response
      })
    },

    // Handle the signup request
    signup (user) {
      return Axios.post(`${apiEndpoint}/auth/signup`, user, {
        withCredentials: true,
      })
    },

    // Intended for redirecting if users tried to access another users encounters.
    // redirectIfLoggedIn () {
    //   if (localStorage.user_id) {
    //     this.$router.push({ path: `/user/${localStorage.user_id}/encounters` })
    //   }
    // },

    // If the user is not logged in, they shouldn't be able to see the encounters page
    // even if the page is going to be blank, because of a 'null' user
    redirectIfNotLoggedIn () {
      if (!localStorage.loggedIn || !this.LOGIN_STATE) {
        localStorage.removeItem('loggedIn')
        this.saveLoginState(false)
        this.$router.push({ path: '/' })
      }
    },

    // When the user clicks the logout button, remove all traces of their logged in status
    logout () {
      const that = this

      localStorage.removeItem('user_id')
      return Axios.get(`${apiEndpoint}/auth/logout`, {
        withCredentials: true,
      }).then(() => {
        that.saveLoginState(false)
        localStorage.removeItem('loggedIn')
        that.$router.push({ path: '/' }) // redirect to login page
      })
    }
  }
}


export default userAuthMixin
