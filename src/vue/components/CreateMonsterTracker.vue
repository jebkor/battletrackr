<template>
	<v-flex
		xs12
		sm6
		lg3
		class="create-encounter-tracker"
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
			}
		},
		methods: {
			addMonster() {
				let _this = this

				// setup monster creation command
				let command = {
					encounter_id: this.$route.params.id,
					name: this.monsterName,
					isbossmonster: this.isBossMonster,
					maxhitpoints: this.monsterMaxHitPoints,
					currenthitpoints: this.monsterMaxHitPoints,
					legendaryaction: this.monsterLegendaryAction,
					legendaryresistances: this.monsterLegendaryResistance
				};

				this.$store.dispatch('saveMonster', command)


				// if (this.monstername || this.monsterMaxHitPoints) {
				// 	Axios.post('http://localhost:3000/monster', command).then(success => {
				// 		console.log('success: ', success)
				// 		_this.monsterName = null;
				// 		_this.monsterMaxHitPoints = null;
				// 	}).catch(err => {
				// 		console.error('Error: ', err)
				// 	})
				// } else {
				// 	console.log("All is not filled");
				// }
			}
		}
	}
</script>