<template>
	<div>
		<h1>Encounters page</h1>

		<create-encounter />

		<router-link
			v-for="(encounter, i) in stateEncounters"
			:key="i"
			:to="'/encounters/'+ encounter.id"
		>{{ encounter.name }}</router-link>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Axios from 'axios'
	import { mapGetters, mapActions } from 'vuex'

	import CreateEncounter from '../components/CreateEncounter.vue'


	export default {
		name: 'encounters',
		components: {
			CreateEncounter
		},
		data: () => ({
		}),
		created() {
			this.$store.dispatch('getEncounters')
		},
		computed: {
			stateEncounters() {
				return this.$store.getters.ENCOUNTERS
			}
		},
		// beforeMount() {
		// 	let _this = this

		// 	Axios.get('http://localhost:3000/encounters').then(response => {
		// 		_this.encounters = response.data
		// 	}).catch(err => {
		// 		console.error('An error occured: ', err)
		// 	})
		// }
	}
</script>

<style lang="scss" scoped>
</style>