import Axios from 'axios'
const apiEndpoint = 'http://localhost:3000/'


export default {
	state: {
		encounters: []
	},

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
					name: payload.name
				})
				.then(response => {
					context.dispatch('getEncounters') // Get the encounters anew to populate the available ones
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

	getters: {
		ENCOUNTERS: state => {
			return state.encounters
		},
	}
}