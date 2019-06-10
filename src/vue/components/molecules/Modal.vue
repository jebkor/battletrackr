<template>
  <v-dialog
    v-model="internalDialog"
    persistent
    width="500"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        {{ modalTitle }}
      </v-card-title>

      <v-card-text>
        {{ modalText }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="declineButtonColor"
          flat
          @click="onDecline"
        >
          {{ declineButtonText }}
        </v-btn>

        <v-btn
          :color="agreeButtonColor"
          flat
          @click="onAgree"
        >
          {{ agreeButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "Modal",

    data: () => ({
      internalDialog: false
    }),

    props: {
      dialog: {
        type: Boolean,
        default: false
      },
      modalTitle: {
        type: String,
        default: "Modal title"
      },
      modalText: {
        type: String,
        default: "Modal text"
      },
      agreeButtonText: {
        type: String,
        default: "I Agree"
      },
      agreeButtonColor: {
        type: String,
        default: "primary"
      },
      declineButtonText: {
        type: String,
        default: "Cancel"
      },
      declineButtonColor: {
        type: String,
        default: "primary"
      },
    },

    methods: {
      onAgree () {
        this.$emit('on-agree')
      },

      onDecline () {
        this.$emit('on-decline')
      }
    },

    watch: {
      dialog () {
        if (this.dialog == true) this.internalDialog = true
        else this.internalDialog = false
      }
    }
  }
</script>