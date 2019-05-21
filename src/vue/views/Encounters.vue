<template>
	<div>
		<h1>Encounters page</h1>

		<router-link
			v-for="(encounter, i) in encounters"
			:key="i"
			:to="'/encounters/'+ encounter.id"
		>{{ encounter.name }}</router-link>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Axios from 'axios'


	export default {
		name: 'encounters',
		data: () => ({
			encounters: [],
		}),
		beforeMount() {
			let _this = this

			Axios.get('http://localhost:3000/encounters').then(response => {
				_this.encounters = response.data
			}).catch(err => {
				console.error('An error occured: ', err)
			})
		}
	}
</script>

<style lang="scss" scoped>
</style>