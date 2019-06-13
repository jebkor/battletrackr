import Axios from 'axios'

const apiEndpoint = process.env.API_ENDPOINT


export default {
  // The state that contains the data
  state: {
    encounters: [],
  },

  // Mutations set/change the state, should ideally need actions to run
  mutations: {
    setEncounters (state, encounters) {
      state.encounters = encounters
    },

    deleteEncounter (state, encounter) {
      const { encounters } = state
      const index = encounters.indexOf(encounter)

      // Axios.post(`${apiEndpoint}/encounter/`)
      encounters.splice(index, 1)
    },
  },

  // Actions call a mutation with data as a param, in order to save/change data
  // Can use ...mapActions([])
  actions: {
    // Get the current users' encounters
    getEncounters ({
      commit,
    }, userId) {
      Axios.get(`${apiEndpoint}/user/${userId}/encounters`, {
        withCredentials: true,
      })
        .then((response) => {
          commit('setEncounters', response.data.encounters.rows) // Saves the requested data to the store
          commit('changeLoadingState', false) // Changes loading state
        })
    },

    saveEncounter ({
      dispatch,
    }, payload) {
      Axios.post(`${apiEndpoint}/user/${payload.user_id}/encounters`, {
        name: payload.name,
        user_id: payload.user_id,
        created_at: payload.created_at,
      }, {
          withCredentials: true,
        })
        .then(() => {
          dispatch('getEncounters', payload.user_id) // Get the encounters anew to populate the available ones
        })
    },

    deleteEncounter ({
      commit,
    }, command) {
      Axios.delete(`${apiEndpoint}/user/${command.userId}/encounters/${command.encounter.id}`, {
        withCredentials: true,
      })
        .then(() => {
          commit('deleteEncounter', command.encounter)
        })
    },
  },

  // Used in the frontend to display the data
  // Can use ...mapGetters([])
  getters: {
    ENCOUNTERS: state => state.encounters,
  },
}
