<template>
	<v-layout
		row
		wrap
	>
		<v-flex
			xs12
			class="text-xs-center"
		>
			<v-layout
				row
				wrap
			>
				<!-- <create-normal-monster-tracker></create-normal-monster-tracker>
				<create-boss-monster-tracker></create-boss-monster-tracker> -->
				<create-monster-tracker/>
			</v-layout>

			<hr>
			

			<v-layout
				row
				wrap
			>
				<v-flex
					xs12
					sm6
					md4
					lg3
					v-for="(normie, i) in normalMonsters"
					:key="normie.id"
				>
					<!-- <edit-normal-monster-tracker :data="normie"/> -->
				</v-flex>

				<v-flex
					xs12
					sm6
					md4
					lg3
					v-for="(boss, j) in bossMonsters"
					:key="j"
				>
					<!-- <edit-boss-monster-tracker :data="boss"/> -->
				</v-flex>
			</v-layout>
		</v-flex>
	</v-layout>
</template>

<script>
	import Axios from 'axios'
	import CreateMonsterTracker from '../components/CreateMonsterTracker.vue'
	// import CreateNormalMonsterTracker from "../components/CreateNormalMonsterTracker.vue";
	// import CreateBossMonsterTracker from "../components/CreateBossMonsterTracker.vue";
	// import EditNormalMonsterTracker from "../components/EditNormalMonsterTracker.vue";
	// import EditBossMonsterTracker from "../components/EditBossMonsterTracker.vue";

	export default {
		data() {
			return {
				message: null,
				normalMonsters: {
					type: Array
				},
				bossMonsters: {
					type: Array
				}
			}
		},
		components: {
			CreateMonsterTracker,
			// CreateNormalMonsterTracker,
			// CreateBossMonsterTracker,
			// EditNormalMonsterTracker,
			// EditBossMonsterTracker
		},
		mounted() {
			let _this = this;

			Axios.get('http://localhost:3000/monsters/').then(result => {
				_this.normalMonsters = result.data
			}).catch(err => {
				console.log("Error: ", err)
				normies = this.$store.state.normalMonsters
			})
		},
	}
</script>