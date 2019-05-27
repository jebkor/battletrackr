<template>
	<v-flex xs12>
		<router-link to="/encounters">Back to encounters</router-link>
		<h1></h1>

		<create-monster-tracker/>

		<edit-monster-tracker />

		<!-- <p v-for="(monster, i) in stateMonsters" :key="i">{{ monster.name }} </p> -->
	</v-flex>
</template>

<script>
	import Vue from 'vue'
	import Axios from 'axios'
	import CreateMonsterTracker from '../components/CreateMonsterTracker.vue'
	import EditMonsterTracker from '../components/EditMonsterTracker.vue'

	export default {
		name: 'monsters',

		data: () => ({
			encounterMonsters: []
		}),

		beforeMount() {
			this.$store.dispatch('getMonsters', this.$route.params.id)
		},

		components: {
			CreateMonsterTracker,
			EditMonsterTracker
		},
	}
</script>

<style lang="scss" scoped>

</style>