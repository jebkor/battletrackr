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
              id="password"
              ref="password"
              v-model="password"
              v-validate="'required'"
              :error-messages="errors.collect('password')"
              name="password"
              type="password"
              data-vv-name="password"
              placeholder="Enter password"
              required
              solo
            />

            <v-text-field
              id="verify_password"
              v-model="verifyPassword"
              v-validate="'confirmed:password'"
              :error-messages="errors.collect('verify_password')"
              name="verify_password"
              placeholder="Verify password"
              type="password"
              data-vv-as="password"
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
  import Axios from 'axios'
  import userAuthMixin from '../mixins/userAuthMixin'

  export default {
    name: 'ForgotPassword',

    mixins: [userAuthMixin],

    data: () => ({
      password: null,
      verifyPassword: null,
      isLegal: false,
    }),

    methods: {
      sendForm () {
        const that = this

        const command = {
          password: this.password,
          token: this.$route.params.resetToken,
        }

        // TODO: Handle production, staging and dev environment
        Axios.post(`${process.env.API_ENDPOINT}/forgot/reset`, command, {
          withCredentials: true,
        }).then(() => {
          that.$router.push({ path: '/login' })
        })
      },
    },
  }
</script>
