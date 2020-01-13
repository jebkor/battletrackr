import Axios from 'axios'

const apiEndpoint = process.env.API_ENDPOINT


export default {
  // The state that contains the data
  state: {
    monsters: [],
  },

  // Mutations set/change the state, should ideally need actions to run
  mutations: {
    setMonsters (state, monsters) {
      state.monsters = monsters
    },

    deleteMonster (state, monster) {
      const { monsters } = state

      const index = monsters.indexOf(monster)
      monsters.splice(index, 1)
    },
  },

  // Actions call a mutation with data as a param, in order to save/change data
  // Can use ...mapActions([])
  actions: {
    getMonsters ({
      commit,
    }, command) {
      if (command.user_id && command.encounter_id) {

        Axios.get(`${apiEndpoint}/user/${command.user_id}/encounters/${command.encounter_id}`, {
          withCredentials: true,
        })
          .then((response) => {
            commit('setMonsters', response.data.encounters.monsters)
            commit('changeLoadingState', false)
          })
      }
    },

    saveMonster ({
      dispatch,
    }, payload) {
      Axios.post(`${apiEndpoint}/user/${payload.user_id}/encounters/${payload.encounter_id}`, {
        name: payload.name,
        is_boss: payload.is_boss,
        max_health: payload.max_health,
        current_health: payload.current_health,
        encounter_id: payload.encounter_id,
      }, {
          withCredentials: true,
        })
        .then(() => {
          dispatch('getMonsters', {
            user_id: payload.user_id,
            encounter_id: payload.encounter_id,
          }) // Get the encounters anew to populate the available ones
        })
    },

    deleteMonster ({
      commit,
    }, monster) {
      const userId = localStorage.getItem('user_id') || this.$route.params.userId
      const encounterId = localStorage.getItem('encounter_id') || this.$route.params.encounterId

      Axios.delete(`${apiEndpoint}/user/${userId}/encounters/${encounterId}/monsters/${monster._id}`, { withCredentials: true })
        .then(() => {
          commit('deleteMonster', monster)
        })
        .catch((err) => {
          console.error('Error: ', err)
        })
    },
  },

  // Used in the frontend to display the data
  // Can use ...mapGetters([])
  getters: {
    MONSTERS: state => state.monsters,
  },
}
