import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

import monstersModule from './modules/monsters'
import encountersModule from './modules/encounters'

Vue.use(Vuex);


const apiEndpoint = 'http://localhost:3000/'


let store = new Vuex.Store({
	modules: {
		monsters: monstersModule,
		encounters: encountersModule
	},
	state: {
		loading: false,
		darkTheme: false
	},

	getters: {
		DARKTHEME: state => {
			return state.darkTheme
		},

		LOADING: state => {
			return state.loading
		},
	},

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

	mutations: {
		setDarkTheme(state, darkTheme) {
			state.darkTheme = darkTheme
		},

		changeLoadingState(state, loading) {
			state.loading = loading
		},
	},
});

export default store;