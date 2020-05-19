<template>
  <div id="emoji-rain" :class="{ active: kichikuing }">
    <canvas v-if="chambering" ref="rainBase" class="rain-base"></canvas>
  </div>
</template>

<script>
  import { isBrowser } from '~/environment'
  import { getFileCDNUrl } from '~/transformers/url'

  export default {
    name: 'EmojiRain',
    data() {
      return {
        chambering: false,
        kichikuing: false
      }
    },
    mounted() {
      if (isBrowser) {
        window.luanchEmojiRain = options => {
          if (!this.chambering && !this.kichikuing) {
            this.chambering = true
            this.$nextTick(() => {
              let emoji233333 = null
              const rainBase = this.$refs.rainBase
              rainBase.width = document.documentElement.clientWidth || document.body.clientWidth
              rainBase.height = document.documentElement.clientHeight || document.body.clientHeight
              emoji233333 = new window.Emoji233333({
                base: rainBase,
                scale: 0.7,
                speed: 12,
                increaseSpeed: 0.4,
                density: 5,
                staggered: true,
                emoji: getFileCDNUrl('/images/emojis/normal.png'),
                ...options,
                onStart: () => {
                  this.kichikuing = true
                },
                onEnded: () => {
                  this.kichikuing = false
                  this.chambering = false
                  this.$nextTick(() => {
                    emoji233333 = null
                  })
                }
              })
              emoji233333.launch()
            })
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #emoji-rain {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-index-underground;

    &.active {
      z-index: $z-index-top;
    }

    .rain-base {
      width: 100%;
      height: 100%;
    }
  }
</style>
