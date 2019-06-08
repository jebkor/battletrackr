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
          <form @submit.prevent="sendForm">
            <v-text-field
              id="email"
              v-model="email"
              v-validate="'required|email'"
              :error-messages="errors.collect('email')"
              name="email"
              type="email"
              label="E-mail"
              data-vv-name="email"
              required
              solo
            />

            <v-btn
              color="primary"
              block
              @click="sendForm"
            >
              Reset password
            </v-btn>

            <div class="signup__link text-xs-center">
              <p>
                Remember your password?
                <router-link :to="'/login'">
                  Login here
                </router-link>
              </p>
            </div>
          </form>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import userAuthMixin from '../mixins/userAuthMixin'

  export default {
    name: 'forgot-password',

    mixins: [userAuthMixin],

    data: () => ({
      email: null,
    }),

    methods: {
      sendForm () {
        const command = {
          email: this.email,
        }

        // Axios.post(``, command, {
        // 	withCredentials: true,
        // })
      },
    },
  }
</script>
