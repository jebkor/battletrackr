<template>
  <div class="edit-boss-monster-tracker" :class="{ 'dead': data.monsterCurrentHitPoints == 0 }">
    <v-expansion-panel expand>
      <v-expansion-panel-content>
        <div slot="header">
          <p class="mb-1"><b>{{ data.monsterName }}</b> <font-awesome-icon icon="skull" class="fa-icon" /> </p>
          <p class="mb-0">HP: {{ data.monsterCurrentHitPoints}} | {{ data.monsterMaxHitPoints }} - {{ percentageHealth }}</p>
          
          <span class="delete-icon" @click="deleteThis(data.monsterName)">
            <font-awesome-icon icon="times" class="fa-icon" />
          </span>
        </div>

        <v-divider></v-divider>

        <v-card>
          <v-card-text>
            <v-layout row wrap v-if="data.monsterLegendaryAction">
              <v-flex xs12 class="text-xs-center">
                <v-tooltip top>
                  <h3 slot="activator">Legendary Actions</h3>
                  
                  <span>3/round: Refreshes at the start of its turn</span>
                </v-tooltip>
              </v-flex>
              <v-flex xs4 v-for="(action, i) in data.monsterLegendaryAction" :key="i">
                <v-checkbox class="ma-0"></v-checkbox>
              </v-flex>
            </v-layout>

            <v-divider></v-divider>

            <v-layout row wrap class="mt-4" v-if="data.monsterLegendaryResistance">
              <v-flex xs12 class="text-xs-center">
                <v-tooltip top>
                  <h3 slot="activator">Legendary Resistances</h3>
                  <span>3/day: Refreshes each dawn</span>
                </v-tooltip>
              </v-flex>
              <v-flex xs4 v-for="(resistance, i) in data.monsterLegendaryResistance" :key="i">
                <v-checkbox v-model="resistance.used" class="ma-0" :disabled="resistance.used"></v-checkbox>
              </v-flex>
            </v-layout>

            <v-divider></v-divider>

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
    name: "edit-boss-monster-tracker",
    props: ["data"],
    data() {
      return {
        usedResistance: false
      }
    },
    computed: {
      percentageHealth() {
        let percentage = this.data.monsterCurrentHitPoints / this.data.monsterMaxHitPoints;

        let result = Math.floor(percentage * 100);

        return result + "%";
      }
    },
    methods: {
      // add value to current HP pool
      addHitPoints(val) {
        if (this.data.monsterCurrentHitPoints < this.data.monsterMaxHitPoints) {
          let maxHitpoints = parseInt(this.data.monsterMaxHitPoints);
          let hitpoints = parseInt(this.data.monsterCurrentHitPoints);
          let result = hitpoints + val;

          if (result > maxHitpoints) {
            this.data.monsterCurrentHitPoints = maxHitpoints;
          } else {
            this.data.monsterCurrentHitPoints = result;
          }
        }
      },

      // subtract value from current HP pool
      subtractHitPoints(val) {
        if (this.data.monsterCurrentHitPoints > 0) {
          let hitpoints = parseInt(this.data.monsterCurrentHitPoints);
          let result = hitpoints - val;

          if (result < 0) {
            this.data.monsterCurrentHitPoints = 0;
          } else {
            this.data.monsterCurrentHitPoints = result;
          }
        }
      },

      deleteThis(monsterName) {
        for (let i = 0; i < this.$store.state.bossMonsters.length; i++) {
          const monster = this.$store.state.bossMonsters[i];
          if (monster.monsterName == monsterName) this.$store.state.bossMonsters.splice(i, 1);
        }
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