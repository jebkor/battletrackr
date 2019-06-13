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
          />

          <v-text-field
            v-model="maxHealth"
            label="Hit Points"
            type="number"
            solo
            required
          />

          <v-checkbox
            v-model="isBoss"
            :label="'Boss monster?'"
          />

          <v-btn
            color="primary"
            type="submit"
          >
            Add monster
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'CreateMonsterTracker',
    data () {
      return {
        valid: null,
        name: null,
        maxHealth: null,
        isBoss: false,
      }
    },
    methods: {
      ...mapActions(['saveMonster']),
      addMonster () {
        // Get the user_id and encounter_id
        const userId = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : this.$route.params.id
        const encounterId = localStorage.getItem('encounter_id') ? localStorage.getItem('encounter_id') : this.$route.params.encounterId

        // setup monster creation command
        const command = {
          name: this.name,
          is_boss: this.isBoss,
          max_health: this.maxHealth,
          current_health: this.maxHealth,
          encounter_id: encounterId,
          user_id: userId,
        }

        // Execute command
        this.saveMonster(command)

        // Reset the monster
        this.name = null
        this.maxHealth = null
        this.isBoss = false
      },
    },
  }
</script>
