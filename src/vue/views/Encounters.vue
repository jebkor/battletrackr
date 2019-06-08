<template>
  <v-layout
    row
    wrap
  >
    <v-flex xs12>
      <h1>Encounters page</h1>

      <create-encounter />

      <v-layout
        row
        wrap
        class="mt-5"
      >
        <v-flex
          v-for="(encounter, i) in stateEncounters"
          :key="i"
          xs12
          lg3
          class="encounter"
        >
          <transition
            key="1"
            name="fade-in-right"
            mode="out-in"
            appear
          >
            <v-card>
              <v-card-title primary-title>
                <div>
                  <router-link
                    :to="`/user/${$route.params.id}/encounters/${encounter.id}`"
                    class="encounter__name_link"
                    @click.native="setEncounter(encounter.id)"
                  >
                    <h3 class="headline mb-0">{{ encounter.name }}</h3>
                  </router-link>

                  <div class="encounter__link">
                    <router-link
                      :to="`/user/${$route.params.id}/encounters/${encounter.id}`"
                      @click.native="setEncounter(encounter.id)"
                    >
                      <font-awesome-icon
                        :icon="['far', 'angle-right']"
                        class="fa-icon"
                        size="3x"
                      />
                    </router-link>
                  </div>
                </div>
              </v-card-title>
            </v-card>
          </transition>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'

  import CreateEncounter from '../components/CreateEncounter.vue'


  export default {
    name: 'encounters',
    components: {
      CreateEncounter,
    },

    data: () => ({
    }),

    computed: {
      stateEncounters () {
        return this.$store.getters.ENCOUNTERS
      },
    },

    watch: {
      // Look for params change, in case users try to 'hack' the system
      '$route.params.id': function () {
        this.correctUserRedirect()
      },
    },

    created () {
      this.correctUserRedirect()
    },

    methods: {
      ...mapActions(['setLoadingState']),
      deleteEncounter (input) {
        this.$store.dispatch('deleteEncounter', input)
      },

      setEncounter (encounter_id) {
        this.setLoadingState(true)

        localStorage.setItem('encounter_id', encounter_id);
      },

      // The user won't see other peoples data, this is purely for URL aesthetic reasons
      correctUserRedirect () {
        const id = this.$route.params.id
        const user_id = localStorage.getItem('user_id')

        if (id === localStorage.getItem('user_id')) {
          console.log('what')
          this.$store.dispatch('getEncounters', user_id)
        }
        else {
          this.$router.push({ path: `/user/${user_id}/encounters` })
        }
      },
    },
  }
</script>


<style lang="scss" scoped>
.encounter {
  .v-card__title {
    > div {
      width: 100%;
    }
  }

  &__name_link {
    color: initial;
    text-decoration: none;
  }

  &__link {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
