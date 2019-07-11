<template>
  <v-navigation-drawer
    v-model="internalDrawer"
    fixed
    clipped
    app
  >
    <v-list dense>
      <v-list-tile
        v-if="!loggedIn"
        :to="'/'"
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
</template>

<script>
  export default {
    name: 'AppNavigationDrawer',

    props: {
      drawer: {
        type: Boolean,
      },
      loggedIn: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      internalDrawer: false,
    }),

    watch: {
      drawer (value) {
        this.internalDrawer = value
      },
    },
  }
</script>
