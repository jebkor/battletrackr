import Axios from 'axios'
const apiEndpoint = 'http://localhost:3000/'


export default {
	// The state that contains the data
	state: {
		encounters: []
	},

	// Mutations set/change the state, should ideally need actions to run
	mutations: {
		setEncounters(state, encounters) {
			state.encounters = encounters
		},

		deleteEncounter(state, encounter) {
			let encounters = state.encounters

			const index = encounters.indexOf(encounter);
			encounters.splice(index, 1);
		},
	},

	// Actions call a mutation with data as a param, in order to save/change data
	// Can use ...mapActions([])
	actions: {
		// Get the current users' encounters
		getEncounters({
			commit
		}, user_id) {
			Axios.get(apiEndpoint + `user/${user_id}`, {
					withCredentials: true
				})
				.then(response => {
					console.log(response.data.encounters.rows)
					commit('setEncounters', response.data.encounters.rows) //Saves the requested data to the store
					commit('changeLoadingState', false) //Changes loading state
				})
		},

		saveEncounter(context, payload) {
			Axios.post(apiEndpoint + 'encounters', {
					name: payload.name,
					user_id: payload.user_id,
					created_at: payload.created_at
				}, { withCredentials: true })
				.then(response => {
					context.dispatch('getEncounters', payload.user_id) // Get the encounters anew to populate the available ones
				})
		},

		deleteEncounter({
			commit,
			dispatch
		}, encounter) {
			Axios.delete(apiEndpoint + 'encounters/' + encounter.id)
				.then(response => {
					commit('deleteEncounter', encounter)
				})
		},
	},

	// Used in the frontend to display the data
	// Can use ...mapGetters([])
	getters: {
		ENCOUNTERS: state => {
			return state.encounters
		},
	}
}