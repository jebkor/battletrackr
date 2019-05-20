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
					@submit.prevent="addMonster()"
				>
					<v-text-field
						v-model="monsterName"
						label="Name"
						solo
						required
					></v-text-field>

					<v-text-field
						v-model="monsterMaxHitPoints"
						label="Hit Points"
						solo
						type="number"
						required
					></v-text-field>

					<v-btn type="submit">Add Normie</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-flex>
</template>

<script>
	import Axios from 'axios'


	export default {
		name: "create-normal-monster-tracker",
		data() {
			return {
				valid: null,
				monsterName: '',
				monsterMaxHitPoints: 0
			}
		},
		methods: {
			addMonster() {
				let _this = this

				// setup monster creation command
				let command = {
					name: this.monsterName,
					currenthitpoints: this.monsterMaxHitPoints,
					maxhitpoints: this.monsterMaxHitPoints
				};



				if (this.monsterName || this.monsterMaxHitPoints) {
					// push monster to array
					this.$store.state.normalMonsters.push(command);
					Axios.post('http://localhost:3000/normalMonster', command).then(success => {
						console.log('Success: ', success)
						
						// refresh inputs
						_this.monsterName = null;
						_this.monsterMaxHitPoints = null;
					}).catch(err => {
						console.error('Error: ', err)
					})
				} else {
					console.log("All is not filled");
				}
			}
		}
	}
</script>