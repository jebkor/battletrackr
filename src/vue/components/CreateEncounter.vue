<template>
	<v-layout
		row wrap
	>
		<v-flex xs12 lg3>
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
	</v-layout>
</template>

<script>
	import Axios from 'axios'
	import { mapActions } from 'vuex'

	export default {
		name: 'create-encounter',
		data: () => ({
			encounterName: '',
		}),
		methods: {
			...mapActions(['saveEncounter']),
			addEncounter() {
				let _this = this

				const user_id = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : this.$route.params.id
				console.log('user_id: ', user_id)

				// setup encounter creation command
				let command = {
					name: this.encounterName,
					user_id,
					created_at: new Date()
				};


				if (this.encounterName) {
					// push monster to array
					// this.$store.state.encounters.push(command);

					this.saveEncounter(command)
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