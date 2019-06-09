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
      <v-alert
        v-if="error_message"
        :value="true"
        type="error"
        dismissible
      >{{ error_message }}</v-alert>
      <v-card>
        <v-card-title>
          <form @submit.prevent>
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

            <v-text-field
              id="password"
              v-model="password"
              v-validate="'required'"
              :error-messages="errors.collect('password')"
              name="password"
              label="Password"
              type="password"
              data-vv-name="password"
              required
              solo
            />
            <span
              v-if="error_message"
              style="float:right;"
            >
              <router-link :to="'/forgot-password'">Forgot password?</router-link>
            </span>

            <v-checkbox
              v-model="rememberMe"
              label="Remember me"
            />

            <v-btn
              color="primary"
              block
              @click="sendForm"
            >
              Login
            </v-btn>

            <div class="signup__link text-xs-center">
              <p>
                Don't have an account?
                <router-link :to="'/signup'">
                  Register here
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
  import { mapActions } from 'vuex'
  import userAuthMixin from '../mixins/userAuthMixin'

  export default {
    name: 'LoginForm',

    mixins: [userAuthMixin],

    data: () => ({
      email: null,
      password: null,
      rememberMe: false,
      error_message: null,
    }),

    methods: {
      ...mapActions(['setLoadingState']),
      sendForm () {
        const that = this

        const userInfo = {
          email: this.email,
          password: this.password,
          remember_me: this.rememberMe,
        }

        this.setLoadingState(true)

        setTimeout(() => {
          that.login(userInfo).then((result) => {
            if (result.data.message !== 'Invalid login') {
              localStorage.user_id = result.data.id

              that.$router.push({ path: `/user/${result.data.id}/encounters` })
            } else {
              that.error_message = result.data.message
            }
          })
        }, 2000) // simulate waiting for request
      }
    },
  }
</script>

<style lang="scss">
form {
  width: 100%;
}

.login__form .v-text-field--solo > .v-input__control > .v-input__slot {
  background-color: hsl(0, 0%, 94%) !important;
}

.signup__link {
  margin-top: 60px;
  opacity: 0.6;

  a {
    text-decoration: none;
    color: initial;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
