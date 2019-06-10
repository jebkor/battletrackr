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

                    <v-btn @click="dialog1 = true">Delete</v-btn>

                    <Modal
                      :dialog="dialog1"
                      @on-agree="dialog2 = true"
                      @on-decline="dialog1 = false"
                      modal-title="Delete encounter?"
                      modal-text="Are you sure you want to delete the encounter?"
                      agree-button-text="Delete"
                      agree-button-color="error"
                      decline-button-text="Cancel"
                    />

                    <Modal
                      :dialog="dialog2"
                      @on-agree="dialog2 = false; dialog1 = false"
                      @on-decline="dialog2 = false; dialog1 = false"
                      modal-title="Are you REALLY sure?"
                      modal-text="There is no going back!"
                      agree-button-text="Delete"
                      agree-button-color="error"
                      decline-button-text="Cancel"
                    />
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
  import Modal from '../components/molecules/Modal.vue'


  export default {
    name: 'Encounters',
    components: {
      CreateEncounter,
      Modal
    },

    data: () => ({
      dialog1: false,
      dialog2: false
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

      setEncounter (encounterId) {
        this.setLoadingState(true)

        localStorage.setItem('encounter_id', encounterId);
      },

      // The user won't see other peoples data, this is purely for URL aesthetic reasons
      correctUserRedirect () {
        const { id } = this.$route.params
        const userId = localStorage.getItem('user_id')

        if (id === localStorage.getItem('user_id')) {
          console.log('what')
          this.$store.dispatch('getEncounters', userId)
        } else {
          this.$router.push({ path: `/user/${userId}/encounters` })
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
