<template>
	<v-flex
		xs12
		sm6
		lg3
	>
		<v-card>
			<v-card-text>
				<v-form
					model="valid"
					@submit.prevent="addEncounter()"
				>
					<v-text-field
						v-model="encounterName"
						label="Name"
						solo
						required
					></v-text-field>

					<v-btn type="submit">Add encounter</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-flex>
</template>

<script>
	import Axios from 'axios'

	export default {
		name: 'create-encounter',
		data: () => ({
			encounterName: '',
		}),
		methods: {
			addEncounter() {
				let _this = this

				// setup encounter creation command
				let command = {
					name: this.encounterName
				};


				if (this.encounterName) {
					// push monster to array
					// this.$store.state.encounters.push(command);

					_this.$store.dispatch('saveEncounter', command)
					_this.encounterName = null;

					// Axios.post('http://localhost:3000/encounters', command).then(success => {

					// }).catch(err => {
					// 	console.error('An error occured: ', err)
					// })
				} else {
					console.log("All is not filled");
				}
			}
		}
	}
</script>