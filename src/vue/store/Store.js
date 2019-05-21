/** 
 * From https://vuex.vuejs.org
 * Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store 
 * for all the components in an application, with rules ensuring that the state can only be mutated in a 
 * predictable fashion. It also integrates with Vue's official devtools extension to provide advanced 
 * features such as zero-config time-travel debugging and state snapshot export / import.
 */

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
					commit('setEncounters', response.data)
					commit('changeLoadingState', false)
				})
		},

		saveEncounter(context, payload) {
			Axios.post('http://localhost:3000/encounters')
				.then(response => {
					console.log(response)
					// context.commit('addEncounter', payload)
				})
		},
	},
	mutations: {
		setEncounters(state, encounters) {
			state.encounters = encounters
		},
		changeLoadingState(state, loading) {
			state.loading = loading
		},
		addEncounter: (state, payload) => {
			console.log(payload)
			state.encounters.push(payload)
		},
	},
});

export default store;