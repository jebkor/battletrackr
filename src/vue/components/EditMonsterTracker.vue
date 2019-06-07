<template>
	<v-flex
		xs12
		lg4
		class="edit-boss-monster-tracker"
		:class="{ 'dead': monster.current_health == 0 }"
	>
		<transition
			name="fade-in-right"
			mode="out-in"
			appear
			key="1"
		>
			<v-card>
				<v-card-title primary-title>
					<div>
						<h3 class="headline">
							{{ monster.name }}
							<font-awesome-icon
								icon="skull"
								class="fa-icon"
								v-if="monster.is_boss"
							/>
						</h3>
						<span
							class="grey--text"
						>HP: {{ monster.current_health}} | {{ monster.max_health }} - {{ percentageHealth(monster) }}</span>
					</div>

					<span
						class="delete-icon"
						@click="deleteThis(monster)"
					>
						<font-awesome-icon
							icon="times"
							class="fa-icon"
						/>
					</span>
				</v-card-title>

				<v-card-text>
					<health-component
						:data="monster"
						@save-health="saving"
					/>
				</v-card-text>
			</v-card>
		</transition>
	</v-flex>
</template>

<script>
	import Axios from 'axios'
	import { mapGetters, mapActions } from 'vuex'
	import HealthComponent from './HealthComponent'

	export default {
		name: "edit-boss-monster-tracker",

		props: ['monster'],

		components: {
			HealthComponent
		},

		methods: {
			...mapActions(['getMonsters', 'deleteMonster']),

			// add value to current HP pool
			addHitPoints(monster, val) {
				if (monster.current_health < monster.max_health) {
					let max_health = parseInt(monster.max_health);
					let hitpoints = parseInt(monster.current_health);
					let result = hitpoints + val;

					if (result > max_health) {
						monster.current_health = max_health;
					} else {
						monster.current_health = result;
					}
				}
			},

			// subtract value from current HP pool
			subtractHitPoints(monster, val) {
				if (monster.current_health > 0) {
					let hitpoints = parseInt(monster.current_health);
					let result = hitpoints - val;

					if (result < 0) {
						monster.current_health = 0;
					} else {
						monster.current_health = result;
					}
				}
			},

			percentageHealth(monster) {
				let percentage = monster.current_health / monster.max_health;

				let result = Math.floor(percentage * 100);

				return result + "%";
			},

			saving(value, type, monster) {
				if (type == 'damage') {
					this.monster.current_health -= value
					if (this.monster.current_health - value < 0) {
						this.monster.current_health = 0
					}
				} else if (type == 'heal') {
					this.monster.current_health += value
					if (this.monster.current_health + value > this.monster.max_health) {
						this.monster.current_health = this.monster.max_health
					}
				}

				Axios.put(`http://localhost:3000/monsters/${this.monster.id}`, {
					id: this.monster.id,
					current_health: this.monster.current_health
				}, {
						withCredentials: true
					})
			},

			deleteThis(monster) {
				this.deleteMonster(monster)
			}
		}
	}
</script>

<style lang="scss" scoped>
.edit-boss-monster-tracker {
	position: relative;

	&.dead {
		.v-card__title,
		.v-card__text {
			& *:not(button) {
				text-decoration: line-through;
			}
		}
	}
}

.delete-icon {
	position: absolute;
	right: 9px;
	top: 3px;
}
</style>