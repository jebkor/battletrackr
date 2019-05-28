<template>
	<v-layout
		row
		wrap
	>
		<v-flex xs12>
			<h1>Encounters page</h1>

			<create-encounter/>

			<v-layout
				row
				wrap
				class="mt-5"
			>
				<v-flex
					xs12
					lg3
					v-for="(encounter, i) in stateEncounters"
					:key="i"
				>
					<v-card>
						<v-card-title primary-title>
							<div>
								<router-link :to="'/encounters/'+ encounter.id">
									<h3 class="headline mb-0">{{ encounter.name }}</h3>
									<font-awesome-icon :icon="['fas', 'swords']" class="fa-icon" />
								</router-link>
							</div>
						</v-card-title>
					</v-card>
				</v-flex>
			</v-layout>
		</v-flex>
	</v-layout>
</template>

<script>
	import Vue from 'vue'
	import Axios from 'axios'
	import { mapGetters, mapActions } from 'vuex'

	import CreateEncounter from '../components/CreateEncounter.vue'


	export default {
		name: 'encounters',
		components: {
			CreateEncounter
		},
		data: () => ({
		}),
		created() {
			this.$store.dispatch('getEncounters')
		},
		computed: {
			stateEncounters() {
				return this.$store.getters.ENCOUNTERS
			}
		},
		methods: {
			deleteEncounter(input) {
				this.$store.dispatch('deleteEncounter', input)
			}
		}
	}
</script>