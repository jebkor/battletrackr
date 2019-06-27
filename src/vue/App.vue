<template>
  <v-app
    id="inspire"
    :dark="darkTheme"
  >
    <app-navigation-drawer :drawer="drawer" :logged-in="loggedIn" />

    <v-toolbar
      color="red"
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>BattleTrackr.io</v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <v-btn
          v-if="loggedIn"
          color="white"
          flat
          @click="logout()"
        >
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content v-cloak>
      <v-container
        fluid
        fill-height
        grid-list-lg
      >
        <transition
          name="fade-in-right"
          mode="out-in"
        >
          <router-view />
        </transition>
      </v-container>
    </v-content>

    <div
      v-if="LOADING"
      class="loader"
    >
      <font-awesome-icon
        :icon="['fal', 'dice-d20']"
        class="fa-icon rotating"
      />
    </div>
    <app-footer v-if="footerState" />
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import userAuthMixin from './mixins/userAuthMixin'
  import AppFooter from './components/organisms/AppFooter/AppFooter.vue'
  import AppNavigationDrawer from './components/organisms/AppNavigationDrawer/AppNavigationDrawer.vue'

  export default {
    components: {
      AppFooter,
      AppNavigationDrawer,
    },
    mixins: [userAuthMixin],
    data: () => ({
      drawer: false,
      drawerMobile: false,
      message: 'stuff',
      darkTheme: false,
    }),

    computed: {
      ...mapGetters(['LOADING', 'LOGIN_STATE', 'FOOTER_STATE']),
      loggedIn () {
        return this.LOGIN_STATE
      },

      footerState () {
        return this.FOOTER_STATE
      },
    },

    watch: {
      // Watch the prop for changes to apply the correct darkTheme value
      darkTheme () {
        this.darkTheme = this.loadDarkMode()
      },
    },

    // created () {
    //   this.redirectIfLoggedIn()
    // },

    mounted () {
      // Set the dark theme on mount
      this.darkTheme = this.loadDarkMode()
    },

    methods: {
      // Set the localStorage item
      setDarkMode (input) {
        window.localStorage.setItem('darkTheme', input)
      },

      // Load and return the value of the localStorage item
      loadDarkMode () {
        const darkMode = window.localStorage.getItem('darkTheme')

        // Convert the string value as a bool for use as a prop in the markup
        if (darkMode === 'true') return true

        if (darkMode === 'false') return false

        // Default return
        return false
      },

      handleDrawer () {
        this.drawer = !this.drawer
      },
    },
  }
</script>
