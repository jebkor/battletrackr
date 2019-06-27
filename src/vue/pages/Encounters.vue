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
                    <v-btn
                      color="error"
                      flat
                      @click="openDeleteModal(encounter)"
                    >
                      Delete
                    </v-btn>
                  </div>
                </div>
              </v-card-title>
            </v-card>
          </transition>
        </v-flex>

        <generic-modal
          :stuff="dialog1"
          modal-title="Do you want to delete the encounter?"
          modal-text="There might still be monsters on the encounter. Both the monsters and the encounter will be deleted forever (which is a long time...)"
          agree-button-text="Delete"
          agree-button-color="error"
          decline-button-text="Cancel"
          @on-agree="deleteEncounter"
          @on-decline="dialog1 = false;"
        />
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'

  import CreateEncounter from '../components/CreateEncounter.vue'
  import GenericModal from '../components/molecules/Modal.vue'

  import userAuthMixin from '../mixins/userAuthMixin'


  export default {
    name: 'Encounters',

    components: {
      CreateEncounter,
      GenericModal,
    },

    mixins: [userAuthMixin],

    data: () => ({
      dialog1: false,
      encounterToDelete: null,
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
      this.redirectIfNotLoggedIn()
    },

    methods: {
      ...mapActions(['setLoadingState']),
      deleteEncounter () {
        const command = {
          userId: localStorage.getItem('user_id'),
          encounter: this.encounterToDelete,
        }

        this.dialog1 = false

        this.$store.dispatch('deleteEncounter', command)
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
          this.$store.dispatch('getEncounters', userId)
        } else {
          this.$router.push({ path: `/user/${userId}/encounters` })
        }
      },

      openDeleteModal (encounter) {
        this.dialog1 = true
        this.encounterToDelete = encounter
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
