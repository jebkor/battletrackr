export default {
  // The state that contains the data
  state: {
    drawer: true,
    loggedIn: false,
  },

  // Mutations set/change the state, should ideally need actions to run
  mutations: {
    setDrawer (state, drawerState) {
      state.drawer = drawerState
    },

    setLoginState (state, loginState) {
      state.loggedIn = loginState
    },
  },

  // Actions call a mutation with data as a param, in order to save/change data
  // Can use ...mapActions([])
  actions: {
    saveDrawerState ({
      commit,
    }, drawerState) {
      commit('setDrawer', drawerState)
    },

    saveLoginState ({
      commit,
    }, loginState) {
      if (localStorage.user_id) {
        commit('setLoginState', true)
        return
      }

      commit('setLoginState', loginState)
    },
  },

  // Used in the frontend to display the data
  // Can use ...mapGetters([])
  getters: {
    DRAWER_STATE: state => state.drawer,

    LOGIN_STATE: state => state.loggedIn,
  },
}
