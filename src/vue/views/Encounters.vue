<template>
	<v-layout
		row
		wrap
	>
		<v-flex xs12>
			<h1>Encounters page</h1>

			<create-encounter />

			<div
				v-for="(encounter, i) in stateEncounters"
				:key="i"
			>
				<span @click="deleteEncounter(encounter)">x</span>
				<router-link :to="'/encounters/'+ encounter.id">{{ encounter.name }}</router-link>
			</div>
		</v-flex>
	</v-layout>
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
		methods: {
			deleteEncounter(input) {
				this.$store.dispatch('deleteEncounter', input)
			}
		}
	}
</script>