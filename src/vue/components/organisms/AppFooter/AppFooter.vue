<template>
  <v-footer class="pa-3">
    <v-container grid-list-md>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          lg3
        >
          <h2>Navigation</h2>
          <ul>
            <li>
              <router-link
                title="Go to encounters"
                :to="`/user/${userId}/encounters`"
              >
                Encounters
              </router-link>
            </li>
          </ul>
        </v-flex>

        <v-flex
          xs12
          lg3
        >
          <h2>Support</h2>
          <ul>
            <li><router-link title="Go to the FAQ" :to="'/faq'">FAQ</router-link></li>
            <li><a href="#">Help</a></li>
          </ul>
        </v-flex>

        <v-flex
          xs12
          lg3
        >
          <h2>App</h2>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="https://github.com/jebkor/battletrackr/releases" target="_blank">Releases</a></li>
            <li><a href="https://github.com/jebkor/battletrackr/projects" target="_blank">Roadmap</a></li>
            <li><a href="https://github.com/jebkor/battletrackr/issues" target="_blank">Issues</a></li>
          </ul>
        </v-flex>

        <v-flex
          xs12
          lg3
        >
          <h2>Social</h2>
          <ul>
            <li><a href="#">Patreon</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">GitHub</a></li>
          </ul>
        </v-flex>
      </v-layout>

      <v-layout
        row
        wrap
      >
        <v-spacer />
        <div>jebkor &copy; {{ new Date().getFullYear() }}</div>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
  import userAuthMixin from '../../../mixins/userAuthMixin'


  export default {
    name: 'AppFooter',

    mixins: [userAuthMixin],

    data: () => ({

    }),

    computed: {
      userId () {
        return localStorage.user_id
      },
    },
  }
</script>

<style src="./AppFooter.scss" />
