<template>
	<div>
		<router-link to="/encounters">Back to encounters</router-link>
		<h1>Monsters page</h1>
		<p v-for="(monster, i) in encounterMonsters" :key="i">{{ monster.name }} </p>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Axios from 'axios'

	export default {
		name: 'monsters',
		data: () => ({
			encounterMonsters: []
		}),
		beforeMount() {
			let _this = this

			Axios.get('http://localhost:3000/encounters/' + _this.currentPath).then(response => {
				_this.encounterMonsters = response.data
			}).catch(err => {
				console.error('An error occured: ', err)
			})
		},
		computed: {
			currentPath() {
				return this.$route.params.id
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>