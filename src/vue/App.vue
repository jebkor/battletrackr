<template>
  <v-app
    :dark="darkTheme"
    id="inspire"
  >
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
    >
      <v-list dense>
        <v-list-tile
          v-if="!loggedIn"
          :to="'/login'"
        >
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="!loggedIn"
          :to="'/signup'"
        >
          <v-list-tile-content>
            <v-list-tile-title>Signup</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="loggedIn"
          :to="'/user/1/encounters'"
        >
          <v-list-tile-content>
            <v-list-tile-title>Encounters</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

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
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import userAuthMixin from './mixins/userAuthMixin'

  export default {
    mixins: [userAuthMixin],
    data: () => ({
      drawer: false,
      drawerMobile: false,
      message: 'stuff',
      routes: this.$router.options.routes,
      darkTheme: false,
    }),

    computed: {
      ...mapGetters(['LOADING', 'LOGIN_STATE']),
      loggedIn () {
        return this.LOGIN_STATE
      },
    },

    watch: {
      // Watch the prop for changes to apply the correct darkTheme value
      darkTheme () {
        this.darkTheme = this.loadDarkMode()
      },
    },

    created () {
      this.redirectIfLoggedIn();
    },

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
        if (darkMode == 'true') return true
        else if (darkMode == 'false') return false
      },

      handleDrawer () {
        this.drawer = !this.drawer
      },
    },
  }
</script>
