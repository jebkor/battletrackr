<template>
	<v-layout
		row
		wrap
	>
		<v-flex xs12>
			<router-link v-on:click.native="backToEncounters()" :to="`/user/${$route.params.id}/encounters`">Back to encounters</router-link>
			<h1></h1>

			<v-layout
				row
				wrap
			>
				<create-monster-tracker/>
			</v-layout>

			<edit-monster-tracker v-for="(monster, i) in stateMonsters" :monster="monster" />
			<!-- <p v-for="(monster, i) in stateMonsters" :key="i">{{ monster.name }} </p> -->
		</v-flex>
	</v-layout>
</template>

<script>
	import Vue from 'vue'
	import Axios from 'axios'
	import { mapGetters, mapActions } from 'vuex'
	import CreateMonsterTracker from '../components/CreateMonsterTracker.vue'
	import EditMonsterTracker from '../components/EditMonsterTracker.vue'

	export default {
		name: 'monsters',

		components: {
			CreateMonsterTracker,
			EditMonsterTracker
		},

		data: () => ({
			encounterMonsters: []
		}),
		

		computed: {
			...mapGetters(['MONSTERS']),
			currentPath() {
				return this.$route.params.id
			},

			stateMonsters() {
				return this.MONSTERS
			}
		},

		created() {
			this.correctUserRedirect()
		},

		mounted() {
			console.log("fe:", this.stateMonsters)
		},

		methods: {
			...mapActions(['setLoadingState']),
			...mapActions('monsters', ['getMonsters']),
			correctUserRedirect() {
				const params_id = this.$route.params.id
				const storage_user_id = localStorage.getItem('user_id')
				const encounter_id = localStorage.getItem('encounter_id')

				if (params_id == localStorage.getItem('user_id') &&
					this.$route.params.encounterId == encounter_id) {
					console.log('true')
					this.getMonsters()
				}
				else {
					this.$router.push({ path: `/user/${storage_user_id}/encounters/${encounter_id}` })
				}
			},

			backToEncounters() {
				this.setLoadingState(true)
			},

			getMonsters() {
				console.log('second')
				console.log('params: ', this.$route.params)
				const user_id = this.$route.params.id
				const encounter_id = this.$route.params.encounterId

				const command = {
					user_id,
					encounter_id
				}
				this.$store.dispatch('getMonsters', command)
			}
		},

		watch: {
			'$route.params.id': function () {
				this.correctUserRedirect()
			},

			'$route.params.encounterId': function () {
				this.correctUserRedirect()
			}
		}


	}
</script>

<style lang="scss" scoped>
</style>