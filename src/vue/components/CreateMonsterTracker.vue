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
						type="number"
						solo
						required
					></v-text-field>

					<v-checkbox
						:label="'Boss monster?'"
						v-model="isBossMonster"
					></v-checkbox>

					<v-checkbox
						:label="'Legendary actions?'"
						v-model="monsterLegendaryAction"
					></v-checkbox>

					<v-checkbox
						:label="'Legendary resistances?'"
						v-model="monsterLegendaryResistance"
					></v-checkbox>

					<v-btn type="submit">Add monster</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-flex>
</template>

<script>
	import Axios from 'axios'

	export default {
		name: "create-monster-tracker",
		data() {
			return {
				valid: null,
				isBossMonster: false,
				monsterName: null,
				monsterMaxHitPoints: null,
				monsterLegendaryAction: false,
				monsterLegendaryResistance: false
			}
		},
		methods: {
			addMonster() {
				let _this = this

				// setup monster creation command
				let command = {
					name: this.monsterName,
					isbossmonster: this.isBossMonster,
					maxhitpoints: this.monsterMaxHitPoints,
					currenthitpoints: this.monsterMaxHitPoints,
					legendaryaction: this.monsterLegendaryAction,
					legendaryresistances: this.monsterLegendaryResistance
				};


				// if (this.monsterLegendaryAction) {
				//   for (let i = 0; i < 3; i++) {
				//     command.monsterLegendaryAction.push({
				//       used: false
				//     });
				//   }
				// }

				// if (this.monsterLegendaryResistance) {
				//   for (let i = 0; i < 3; i++) {
				//     command.monsterLegendaryResistance.push({
				//       used: false
				//     });
				//   }
				// }


				if (this.monstername || this.monsterMaxHitPoints) {
					// push monster to array
					this.$store.state.bossMonsters.push(command);

					Axios.post('http://localhost:3000/monster', command).then(success => {
						console.log('success: ', success)
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