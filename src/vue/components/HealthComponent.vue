<template>
	<v-layout
		row
		wrap
	>
		<v-flex
			xs4
			align-self-center
			justify-self-center
		>
			<label for>Heal</label>
			<input
				type="text"
				v-model="heal"
			>
			<input
				type="text"
				v-model="damage"
				class="mt-3"
			>
			<label for>Damage</label>
		</v-flex>

		<v-flex
			xs4
			align-self-center
			justify-self-center
		>
			<v-touch
				v-on:panup="healMonster"
				v-on:pandown="damageMonster"
				style="height: 180px; width: 35px; background-color: hsl(0, 0%, 90%);"
			></v-touch>
		</v-flex>

		<v-flex
			xs4
			align-self-center
			justify-self-center
		>
			<v-btn
				color="primary"
				@click="healMonster"
			>+</v-btn>
			<v-btn
				color="error"
				@click="damageMonster"
			>-</v-btn>
		</v-flex>


		<v-flex xs12 justify-self-center v-if="healthChange">
			<v-btn color="primary">Apply changes</v-btn>
			<v-btn color="primary" outline @click="cancelHealthChange">Cancel</v-btn>
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
		name: 'health-component',

		props: ['data'],

		data: () => ({
			heal: 0,
			damage: 0,
			healthChange: false
		}),

		mounted() {
			console.log('data: ', this.data)
		},

		methods: {
			healMonster() {
				this.healthChange = true
				if (this.damage > 0) {
					this.damage--
				} else {
					this.heal++
				}
			},

			damageMonster() {
				this.healthChange = true
				if (this.heal > 0) {
					this.heal--
				} else {
					this.damage++
				}
			},

			cancelHealthChange() {
				this.healthChange = false
				this.heal = 0
				this.damage = 0
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>