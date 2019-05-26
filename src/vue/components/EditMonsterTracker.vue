<template>
	<v-layout row wrap>
		<v-flex xs12 lg4 class="edit-boss-monster-tracker" :class="{ 'dead': monster.currenthitpoints == 0 }" v-for="(monster, i) in stateMonsters" :key="i">
			<v-expansion-panel expand>
				<v-expansion-panel-content>
					<div slot="header">
						<p class="mb-1">
							<b>{{ monster.name }}</b>
							<font-awesome-icon icon="skull" class="fa-icon" v-if="monster.isbossmonster" />
						</p>
						<p class="mb-0">HP: {{ monster.currenthitpoints}} | {{ monster.maxhitpoints }} - {{ percentageHealth(monster) }}</p>

						<span class="delete-icon" @click="deleteThis(monster)">
							<font-awesome-icon icon="times" class="fa-icon" />
						</span>
					</div>

					<v-divider></v-divider>

					<v-card>
						<v-card-text>
							<v-layout row wrap>
								<v-flex xs12 lg6>
									<v-btn block @click.native="addHitPoints(monster, 10)">+10</v-btn>
								</v-flex>
								<v-flex xs12 lg6>
									<v-btn block @click.native="addHitPoints(monster, 1)">+1</v-btn>
								</v-flex>
								<v-flex xs12 lg6>
									<v-btn block @click.native="subtractHitPoints(monster, 1)">-1</v-btn>
								</v-flex>
								<v-flex xs12 lg6>
									<v-btn block @click.native="subtractHitPoints(monster, 10)">-10</v-btn>
								</v-flex>
							</v-layout>
						</v-card-text>
					</v-card>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
		name: "edit-boss-monster-tracker",

		computed: {


			currentPath() {
				return this.$route.params.id
			},

			stateMonsters() {
				return this.$store.getters.MONSTERS
			}
		},

		beforeMount() {
			this.$store.dispatch('getMonsters', this.currentPath)
		},

		methods: {
			// add value to current HP pool
			addHitPoints(monster, val) {
				if (monster.currenthitpoints < monster.maxhitpoints) {
					let maxhitpoints = parseInt(monster.maxhitpoints);
					let hitpoints = parseInt(monster.currenthitpoints);
					let result = hitpoints + val;

					if (result > maxhitpoints) {
						monster.currenthitpoints = maxhitpoints;
					} else {
						monster.currenthitpoints = result;
					}
				}
			},

			// subtract value from current HP pool
			subtractHitPoints(monster, val) {
				if (monster.currenthitpoints > 0) {
					let hitpoints = parseInt(monster.currenthitpoints);
					let result = hitpoints - val;

					if (result < 0) {
						monster.currenthitpoints = 0;
					} else {
						monster.currenthitpoints = result;
					}
				}
			},

			percentageHealth(monster) {
				let percentage = monster.currenthitpoints / monster.maxhitpoints;

				let result = Math.floor(percentage * 100);

				return result + "%";
			},

			  deleteThis(monster) {
			    this.$store.dispatch('deleteMonster', monster)
			  },

			showChange(input) {
				console.log(input);
			}
		}
	}
</script>

<style lang="scss" scoped>
.edit-boss-monster-tracker {
	margin: 0 auto;
	position: relative;

	&.dead {
		opacity: 0.4;

		p {
			text-decoration: line-through;
		}
	}
}

.delete-icon {
	position: absolute;
	right: 9px;
	top: 3px;
}
</style>