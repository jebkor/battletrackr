<template>
  <v-layout
    row
    wrap
    class="health__component"
  >
    <v-flex
      xs4
      class="health__component__inputs"
      full-height
    >
      <div class="input__wrapper">
        <label for>Heal</label>
        <input
          v-model="heal"
          type="text"
          class="input--heal"
        >
      </div>

      <div
        class="new__health-wrapper"
        :class="{ damaged: newHealth < data.current_health }"
      >
        <h3>New health</h3>
        <h3>{{ newHealth }}</h3>
      </div>

      <div class="input__wrapper mt-3">
        <input
          v-model="damage"
          type="text"
          class="input--damage"
        >
        <label for>Damage</label>
      </div>
    </v-flex>

    <v-flex
      xs4
      align-self-center
      justify-self-center
      class="health__component__notch"
    >
      <div class="scrollwheel">
        <div class="scrollwheel-bg" />
        <v-touch
          ref="health_notch"
          class="health_notch"
          :style="{ backgroundPosition: 'center ' + counter + 'px' }"
          @panup="healMonster"
          @pandown="damageMonster"
        />
      </div>
    </v-flex>

    <v-flex
      xs4
      align-self-center
      justify-self-center
      class="health__component__buttons"
    >
      <v-btn
        color="primary"
        @click="healMonster"
      >
        +
      </v-btn>
      <v-btn
        color="primary"
        @click="damageMonster"
      >
        -
      </v-btn>
    </v-flex>

    <v-flex
      v-if="healthChange"
      xs12
      justify-self-center
      class="health__component__save-buttons"
    >
      <v-btn
        color="primary"
        @click="saveHealth"
      >
        Apply
      </v-btn>

      <v-btn
        color="primary"
        outline
        @click="cancelHealthChange"
      >
        Cancel
      </v-btn>
    </v-flex>
  </v-layout>
</template>


<script>
  export default {
    name: 'health-component',

    props: ['data'],

    data: () => ({
      counter: 0,
      heal: 0,
      damage: 0,
      healthChange: false,
    }),

    computed: {
      newHealth () {
        if (this.heal > 0) {
          if ((this.data.current_health + this.heal > this.data.max_health)) {
            return this.data.max_health
          }
          return this.data.current_health + this.heal
        } else if (this.damage > 0) {
          if ((this.data.current_health - this.damage < 0)) {
            return 0
          }
          return this.data.current_health - this.damage
        }

        return this.data.current_health

      }
    },

    methods: {
      healMonster () {
        this.healthChange = true
        if (this.damage > 0) {
          this.damage--
        } else {
          this.heal++
        }
        this.counter--
      },

      damageMonster () {
        this.healthChange = true
        if (this.heal > 0) {
          this.heal--
        } else {
          this.damage++
        }
        this.counter++
      },

      saveHealth () {
        let value
        let type

        if (this.heal > 0) {
          value = this.heal
          type = 'heal'
        } else {
          value = this.damage
          type = 'damage'
        }

        this.$emit('save-health', value, type, this.data)
        this.counter = 0
        this.heal = 0
        this.damage = 0
        this.healthChange = false
      },

      cancelHealthChange () {
        this.healthChange = false
        this.heal = 0
        this.damage = 0
      },
    },
  }
</script>

<style lang="scss" scoped>
.health__component {
  .scrollwheel {
    padding: 0 10px;
    margin: 6px 0;
    position: relative;
    height: 145px;

    .scrollwheel-bg {
      width: 48px;
      height: 145px;
      margin: 0 auto;
      background: linear-gradient(180deg, #e1e9eb, #f7f9f9 49.39%, #e1e9eb);
      border: 1px solid #dee4eb;
      border-radius: 6px;
    }

    .health_notch {
      position: relative;
      background: center 0 #fff url("../../assets/images/wheel-notch.png")
        repeat-y;
      position: absolute;
      width: 36px;
      top: 4px;
      left: 50%;
      bottom: 4px;
      margin-left: -18px;
      border-bottom: none;
      border-top: none;
      border-radius: 4px;

      &:after {
        content: " ";
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        top: 0;
        background: linear-gradient(
          180deg,
          rgba(126, 137, 140, 0.9),
          rgba(153, 161, 164, 0.7) 3%,
          rgba(203, 210, 213, 0.7) 18.83%,
          rgba(247, 249, 249, 0.2) 49.39%,
          rgba(203, 210, 213, 0.7) 79.64%,
          rgba(153, 162, 164, 0.7) 98%,
          rgba(126, 137, 140, 0.9)
        );
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.13);
        border: 1px solid #8e9da8;
        border-bottom-color: #8e8d8d;
        border-radius: 4px;
      }
    }
  }

  &__inputs {
    .input__wrapper {
      position: relative;

      label {
        justify-self: center;
        position: absolute;
        top: 5px;
        left: 0;
        right: 0;
        text-align: center;
      }

      input {
        border-radius: 4px;
        padding: 20px 15px 4px;
        max-width: 100%;
        font-weight: bolder;
        text-align: center;
        font-size: 2rem;

        &.input--heal {
          border: 1px solid hsl(110, 35%, 50%);
          color: hsl(110, 35%, 50%);
        }

        &.input--damage {
          border: 1px solid hsl(0, 50%, 50%);
          color: hsl(0, 50%, 50%);
        }
      }
    }

    .new__health-wrapper {
      padding: 20px 0 15px;

      &.damaged {
        color: hsl(0, 50%, 50%);
      }

      h3 {
        text-align: center;

        & + h3 {
          font-size: 1.7rem;
        }
      }
    }
  }

  &__buttons {
    button + button {
      margin-top: 75px;
    }
  }

  &__save-buttons {
    display: flex;
    justify-content: center;
  }
}
</style>