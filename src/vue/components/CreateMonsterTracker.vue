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
						v-model="name"
						label="Name"
						solo
						required
					></v-text-field>

					<v-text-field
						v-model="maxHealth"
						label="Hit Points"
						type="number"
						solo
						required
					></v-text-field>

					<v-checkbox
						:label="'Boss monster?'"
						v-model="isBoss"
					></v-checkbox>

					<v-btn type="submit">Add monster</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-flex>
</template>

<script>
	import Axios from 'axios'
	import { mapActions } from 'vuex'

	export default {
		name: "create-monster-tracker",
		data() {
			return {
				valid: null,
				name: null,
				maxHealth: null,
				isBoss: false,
			}
		},
		methods: {
			...mapActions(['saveMonster']),
			addMonster() {
				let _this = this

				// Get the user_id and encounter_id
				const user_id = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : this.$route.params.id
				const encounter_id = localStorage.getItem('encounter_id') ? localStorage.getItem('encounter_id') : this.$route.params.encounterId

				// setup monster creation command
				let command = {
					name: this.name,
					is_boss: this.isBoss,
					max_health: this.maxHealth,
					current_health: this.maxHealth,
					encounter_id,
					user_id
				};

				// Execute command
				this.saveMonster(command)
			}
		}
	}
</script>