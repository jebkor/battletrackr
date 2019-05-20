<template>
  <div class="edit-normal-monster-tracker" :class="{ 'dead': data.currenthitpoints == 0 }">
    <v-expansion-panel expand>
      <v-expansion-panel-content>
        <div slot="header">
          <p class="mb-1"><b>{{ data.name }}</b></p>
          <p class="mb-0">HP: {{ data.currenthitpoints}} | {{ data.maxhitpoints }} - {{ percentageHealth }}</p>
          
          <span class="delete-icon" @click="deleteThis(data.name)">
            <font-awesome-icon icon="times" class="fa-icon" />
          </span>
        </div>

        <v-divider></v-divider>

        <v-card>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 lg6>
                <v-btn block @click.native="addHitPoints(10)">+10</v-btn>
              </v-flex>
              <v-flex xs12 lg6>
                <v-btn block @click.native="addHitPoints(1)">+1</v-btn>
              </v-flex>
              <v-flex xs12 lg6>
                <v-btn block @click.native="subtractHitPoints(1)">-1</v-btn>
              </v-flex>
              <v-flex xs12 lg6>
                <v-btn block @click.native="subtractHitPoints(10)">-10</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!-- <div class="scrollwheel">
      <div class="scrollwheel__bg"></div>
      <div class="scrollwheel__wheel" style="background-position: center 0px;"></div>
    </div> -->
  </div>
</template>

<script>
  export default {
    name: "edit-normal-monster-tracker",
    props: ["data"],
    data() {
      return {

      }
	},
    computed: {
      percentageHealth() {
        let percentage = this.data.currenthitpoints / this.data.maxhitpoints;

        let result = Math.floor(percentage * 100);

        return result + "%";
      }
    },
    methods: {
      // add value to current HP pool
      addHitPoints(val) {
        if (this.data.currenthitpoints < this.data.maxhitpoints) {
          let maxHitpoints = parseInt(this.data.maxhitpoints);
          let hitpoints = parseInt(this.data.currenthitpoints);
          let result = hitpoints + val;

          if (result > maxHitpoints) {
            this.data.currenthitpoints = maxHitpoints;
          } else {
            this.data.currenthitpoints = result;
          }
        }
      },

      // subtract value from current HP pool
      subtractHitPoints(val) {
        if (this.data.currenthitpoints > 0) {
          let hitpoints = parseInt(this.data.currenthitpoints);
          let result = hitpoints - val;

          if (result < 0) {
            this.data.currenthitpoints = 0;
          } else {
            this.data.currenthitpoints = result;
          }
        }
      },

      deleteThis(monsterName) {
        for (let i = 0; i < this.$store.state.normalMonsters.length; i++) {
          const monster = this.$store.state.normalMonsters[i];
          if (monster.name == monsterName) this.$store.state.normalMonsters.splice(i, 1);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.edit-normal-monster-tracker {
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