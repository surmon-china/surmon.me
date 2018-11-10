<template>
  <canvas class="global-emoji-rain" 
          ref="emoji"
          :class="{ active: emoji233333 && emoji233333.kichikuing }">
  </canvas>
</template>

<script>
  import eventBus from '~/utils/event-bus'
  import { isBrowser } from '~/environment'

  export default {
    name: 'global-emoji-rain',
    computed: {
      emoji233333() {
        return eventBus.emoji233333
      }
    },
    methods: {
      buildEmojiBase() {
        if (isBrowser) {
          const emojiBase = this.$refs.emoji
          emojiBase.width = document.documentElement.clientWidth || document.body.clientWidth
          emojiBase.height = document.documentElement.clientHeight || document.body.clientHeight
          const emoji233333 = new window.Emoji233333({
            base: emojiBase,
            scale: 0.7,
            speed: 12,
            increaseSpeed: 0.4,
            density: 5,
            staggered: true
          })
          eventBus.emoji233333 = emoji233333
        }
      }
    },
    mounted() {
      this.buildEmojiBase()
    }
  }
</script>

<style lang="scss" scoped>
 
  .global-emoji-rain {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;

    &.active {
      z-index: 99999;
    }
  }
</style>
