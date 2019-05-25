import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);


let store = new Vuex.Store({
	state: {
		encounters: [],
		loading: true
	},
	getters: {
		ENCOUNTERS: state => {
			return state.encounters
		}
	},
	actions: {
		getEncounters({
			commit
		}) {
			Axios.get('http://localhost:3000/encounters')
				.then(response => {
					commit('setEncounters', response.data) //Saves the requested data to the store
					commit('changeLoadingState', false) //Changes loading state
				})
		},

		saveEncounter(context, payload) {
			Axios.post('http://localhost:3000/encounters', {
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
			Axios.delete('http://localhost:3000/encounters/' + encounter.id)
				.then(response => {
					commit('deleteEncounter', encounter)
				})
			// console.log('Delete action: ', encounter)
		},
	},
	mutations: {
		setEncounters(state, encounters) {
			state.encounters = encounters
		},
		changeLoadingState(state, loading) {
			state.loading = loading
		},
		deleteEncounter(state, encounter) {
			let encounters = state.encounters
			// encounters.splice(encounters.indexOf(encounter), 1)

			const index = encounters.indexOf(encounter);
			encounters.splice(index, 1);
		}
	},
});

export default store;