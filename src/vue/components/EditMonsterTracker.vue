<template>
	<v-layout
		align-start
		justify-start
		row
		wrap
	>
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
				<v-expansion-panel expand>
					<v-expansion-panel-content>
						<div slot="header">
							<p class="mb-1">
								<b>{{ monster.name }}</b>
								<font-awesome-icon
									icon="skull"
									class="fa-icon"
									v-if="monster.is_boss"
								/>
							</p>
							<p
								class="mb-0"
							>HP: {{ monster.current_health}} | {{ monster.max_health }} - {{ percentageHealth(monster) }}</p>

							<span
								class="delete-icon"
								@click="deleteThis(monster)"
							>
								<font-awesome-icon
									icon="times"
									class="fa-icon"
								/>
							</span>
						</div>

						<v-divider></v-divider>

						<v-card>
							<v-card-text>
								<health-component :data="monster" @save-health="saving" />
							</v-card-text>
						</v-card>
					</v-expansion-panel-content>

					<div
						v-if="monster.current_health == 0"
						class="dead-overlay"
					>
						<font-awesome-icon
							icon="skull-crossbones"
							class="fa-icon"
						/>

						<v-btn
							color="info"
							@click="addHitPoints(monster, 1)"
						>Ressurect?</v-btn>
					</div>
				</v-expansion-panel>
			</transition>
		</v-flex>
	</v-layout>
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

	.v-expansion-panel {
		position: relative;
	}

	&.dead {
		.v-expansion-panel .dead-overlay {
			display: flex;
			flex-direction: column;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: hsla(0, 0%, 0%, 0.5);

			.fa-icon {
				width: 75px;
				height: 75px;
				align-self: center;
				margin-top: 25px;
				path {
					fill: #fff;
				}
			}

			button.v-btn {
				align-self: center;
				max-width: 125px;
				margin-top: 50px;
			}
		}
	}
}

.delete-icon {
	position: absolute;
	right: 9px;
	top: 3px;
	z-index: 888;
}
</style>