<template>
  <v-layout
    row
    wrap
  >
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <h1>About</h1>

          <br>

          <p>Welcome and thank you for your interest in BattleTrackr.io - the digital encounter planner and health tracker for all things tabletop gaming.</p>
          <p>BattleTrackr.io was created from the need of having a digital tool for keeping track of enemy health in my D&D games. I was getting tired of wasting paper and doing maths at the table - I know, first world problems, much! 🤷‍</p>
          <p>I had a couple of requirements for this application: It should be <b>easy to use</b> and it should be taking up <b>as little space at the table as possible</b>.</p>
          <p>Mix that with a wish of trying to make a product that other people could enjoy as well, and I went to work - and now we're here!</p>

          <br>

          <h2>Version</h2>
          <p>Right now the application is in its early alpha stage - errors, bugs and updates are expected. On the <b>very</b> rare occasion, a database purge might happen, but not without a warning.</p>

          <br>

          <h2>Updates</h2>
          <p>To keep updated on the progress of everything, I suggest following both me and the application on twitter. Here I will post progress updates and notices if applicable. Once I'm done setting it up, things will also happen on my Patreon page so keep your eyes open for that.</p>

          <br>

          <h2>Issues</h2>
          <p>If you experience issues or have feature requests/improvements while using the application, I suggest checking out the <router-link :to="'/help'">help</router-link> page for more info. There, you will find both an email to write to, as well as a GitHub link to create new issues. This way I will be able to keep track of what to work on, when.</p>

          <br>

          <p>I think that is all I want to say for now. With time, a FAQ page will be created as well as many other things, as people start using the app, but for now, I implore you to start using the app and give feedback on your use.</p>

          <br>

          <p>Thank you for your interest and your patience while we start improving this product. I hope I will be seeing you around in the future.</p>

          <br><br>
          
          <h3>- Jebkor from the BattleTrackr.io team</h3>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'Help',
  }
</script>
