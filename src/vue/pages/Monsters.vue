<template>
  <v-layout
    row
    wrap
  >
    <v-flex xs12>
      <router-link
        :to="`/user/${$route.params.id}/encounters`"
        @click.native="backToEncounters()"
      >
        <v-btn
          color="primary"
          flat
        >
          Back to encounters
        </v-btn>
      </router-link>

      <v-layout
        row
        wrap
      >
        <create-monster-tracker />
      </v-layout>

      <v-layout
        align-start
        justify-start
        row
        wrap
      >
        <edit-monster-tracker
          v-for="(monster, i) in stateMonsters"
          :key="i"
          :monster="monster"
        />
      </v-layout>
    </v-flex>

  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import CreateMonsterTracker from '../components/CreateMonsterTracker.vue'
  import EditMonsterTracker from '../components/EditMonsterTracker.vue'

  export default {
    name: 'Monsters',

    components: {
      CreateMonsterTracker,
      EditMonsterTracker,
    },

    data: () => ({
      encounterMonsters: [],
    }),


    computed: {
      ...mapGetters(['MONSTERS']),
      currentPath () {
        return this.$route.params.id
      },

      stateMonsters () {
        return this.MONSTERS
      },
    },

    watch: {
      '$route.params.id': function () {
        this.correctUserRedirect()
      },

      '$route.params.encounterId': function () {
        this.correctUserRedirect()
      }
    },

    created () {
      this.correctUserRedirect()
    },

    methods: {
      ...mapActions(['setLoadingState']),
      ...mapActions('monsters', ['getMonsters']),
      correctUserRedirect () {
        const { id } = this.$route.params
        const storageUserId = localStorage.getItem('user_id')
        const encounterId = localStorage.getItem('encounter_id')

        if (id === localStorage.getItem('user_id')
          && this.$route.params.encounterId === encounterId) {
          this.getMonsters()
        } else {
          this.$router.push({ path: `/user/${storageUserId}/encounters/${encounterId}` })
        }
      },

      backToEncounters () {
        this.setLoadingState(true)
      },

      getMonsters () {
        const { id, encounterId } = this.$route.params

        const command = {
          user_id: id,
          encounter_id: encounterId,
        }
        this.$store.dispatch('getMonsters', command)
      },
    },
  }
</script>
