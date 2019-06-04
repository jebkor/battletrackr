import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

import monstersModule from './modules/monsters'
import encountersModule from './modules/encounters'

Vue.use(Vuex);



let store = new Vuex.Store({
	modules: {
		monsters: monstersModule,
		encounters: encountersModule
	},

	// The state that contains the data
	state: {
		loading: false,
		darkTheme: false
	},

	// Mutations set/change the state, should ideally need actions to run
	mutations: {
		setDarkTheme(state, darkTheme) {
			state.darkTheme = darkTheme
		},

		changeLoadingState(state, loading) {
			state.loading = loading
		},
	},

	// Actions call a mutation with data as a param, in order to save/change data
	// Can use ...mapActions([])
	actions: {
		setDarkTheme({
			commit,
			dispatch
		}, darkTheme) {
			commit('setDarkTheme', darkTheme)
		},

		setLoadingState({
			commit,
			dispatch
		}, loading) {
			commit('changeLoadingState', loading)
		},
	},

	// Used in the frontend to display the data
	// Can use ...mapGetters([])
	getters: {
		DARKTHEME: state => {
			return state.darkTheme
		},

		LOADING: state => {
			return state.loading
		},
	},
});

export default store;