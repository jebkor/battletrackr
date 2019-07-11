<template>
  <v-layout
    row
    wrap
    align-center
    justify-center
  >
    <v-flex
      xs12
      lg4
    >
      <v-card>
        <v-card-title>
          <div v-if="confirmed">
            <h1>Your email has been confirmed!</h1>

            <p>You are now eligable to login to BattleTrackr.io. Click the button to go to the login page. We hope you will enjoy your stay.</p>

            <div style="width: 100%; margin-bottom: 30px;">
              <v-btn
                color="primary"
                :to="'/'"
              >
                Login
              </v-btn>
            </div>

            <div style="width: 100%;">
              <p>
                <b>- The BattleTrackr.io team</b>
              </p>
            </div>
          </div>

          <div v-else>
            <h1>Confirming your e-mail, please wait</h1>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import Axios from 'axios'

  export default {
    name: 'ConfirmEmail',

    data: () => ({
      confirmed: false,
    }),

    created () {
      const that = this
      const url = this.$route.params.confirmToken


      // TODO: Handle production, staging and dev environment
      Axios.post(`${process.env.API_ENDPOINT}/confirmation/${url}`, {
        withCredentials: true,
      }).then(() => {
        that.confirmed = true
      }).catch(() => {
        console.log('There was an error confirming your account')
      })
    },
  }
</script>
